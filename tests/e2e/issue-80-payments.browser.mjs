// Local synthetic-data E2E only. Run npm test first.
// NODE_PATH=$(npm root -g) node tests/e2e/issue-80-payments.browser.mjs
// Requires Node playwright and Chromium; CHROMIUM_EXECUTABLE can override /usr/bin/chromium.
import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
import {createRequire} from 'node:module';
import {startHttpsServer} from '../regression/helpers.mjs';
const require=createRequire(new URL('../../package.json',import.meta.url)),{chromium}=require('playwright');
const screenshots=process.env.M4_EVIDENCE_DIR||'/tmp/gpt-m4-evidence';await mkdir(screenshots,{recursive:true});
const server=await startHttpsServer({setupKey:'SyntheticFeeBrowser2026'}),base='https://localhost:'+server.port;
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_EXECUTABLE||'/usr/bin/chromium',args:['--no-sandbox']});
const staff=await browser.newContext({ignoreHTTPSErrors:true,viewport:{width:1280,height:900}}),student=await browser.newContext({ignoreHTTPSErrors:true,viewport:{width:375,height:812}});
const errors=[];for(const context of [staff,student])context.on('page',page=>{page.on('pageerror',error=>errors.push(error.message));page.on('console',message=>{if(message.type()==='error'&&/content security policy/i.test(message.text()))errors.push(message.text());});});
const page=await staff.newPage(),studentPage=await student.newPage();
async function api(context,method,path,body){const response=await context.request.fetch(base+'/api'+path,{method,headers:{'Content-Type':'application/json','X-FQ':'1'},data:body===undefined?undefined:JSON.stringify(body)});const data=await response.json();assert.ok(response.ok(),JSON.stringify({path,status:response.status(),data}));return data;}
async function change(context,username,password){await api(context,'POST','/login',{username,password});await api(context,'POST','/password',{old:password,new:'BrowserPassword2026'});}
async function noOverflow(target,label){await target.waitForTimeout(350);const metrics=await target.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));assert.equal(metrics.scroll,metrics.width,label);return metrics;}
try{
 await api(staff,'POST','/setup',{setupKey:'SyntheticFeeBrowser2026',name:'主管',username:'sup',password:'Supervisor2026',demo:false});
 const advisor=await api(staff,'POST','/users',{username:'advisor.fees',name:'李顾问',role:'advisor'});
 await api(staff,'PUT','/t/students/student-one',{id:'student-one',name:'林同学',advisorId:advisor.user.id,status:'active',writerIds:[]});
 const user=await api(staff,'POST','/users',{username:'student.fees',name:'林同学',role:'student',studentId:'student-one'});
 await page.goto(base+'/#/settings/collect');await page.locator('#fbCollectForm').waitFor();
 const png=Buffer.from(await page.evaluate(()=>{const c=document.createElement('canvas');c.width=256;c.height=256;const ctx=c.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,256,256);ctx.fillStyle='#3B2A5E';for(let i=0;i<256;i+=16)for(let j=0;j<256;j+=16)if((i+j)%48===0)ctx.fillRect(i,j,14,14);return c.toDataURL('image/png').split(',')[1];}),'base64');
 await page.locator('#fbCollectForm [name=payeeName]').fill('主管（测试收款人）');
 for(const name of ['wechat','alipay'])await page.locator('#fbCollectForm [name='+name+']').setInputFiles({name:name+'.png',mimeType:'image/png',buffer:png});
 await page.locator('#fbCollectForm button[type=submit]').click();await page.locator('#fbCollectForm .fb-th').first().waitFor();
 await api(staff,'POST','/logout');await change(staff,'advisor.fees',advisor.password);
 await page.goto(base+'/#/fees');await page.reload();await page.locator('[data-act=fee-new]').click();
 await page.locator('#modalForm [name=title]').fill('12 月第一批申请费用');await page.locator('#modalForm [name=itemLabel]').fill('IU Jacobs 申请费');await page.locator('#modalForm [name=itemAmount]').fill('545.00');
 await page.locator('[data-act=fee-add-line]').click();await page.locator('#modalForm [name=itemLabel]').nth(1).fill('WES 成绩单认证费');await page.locator('#modalForm [name=itemAmount]').nth(1).fill('621.00');
 await page.locator('[data-act=fee-add-line]').click();await page.locator('#modalForm [name=itemLabel]').nth(2).fill('成绩单翻译（2份）');await page.locator('#modalForm [name=itemAmount]').nth(2).fill('160.00');
 await page.locator('#modalForm [name=studentNote]').fill('请在截止日期前付款，收到后当天代缴。');
 let active=0,maxActive=0,failed=false;
 await page.route('**/api/files?*',async route=>{
  active++;maxActive=Math.max(maxActive,active);
  try{await new Promise(resolve=>setTimeout(resolve,200));if(!failed&&decodeURIComponent(route.request().headers()['x-file-name']||'')==='retry.png'){failed=true;await route.fulfill({status:503,contentType:'application/json',body:JSON.stringify({error:'测试重试'})});}else await route.continue();}finally{active--;}
 });
 const large=Buffer.from(await page.evaluate(()=>{const c=document.createElement('canvas');c.width=3200;c.height=1600;const ctx=c.getContext('2d');ctx.fillStyle='#eee';ctx.fillRect(0,0,c.width,c.height);return c.toDataURL('image/png').split(',')[1];}),'base64');
 const files=Array.from({length:6},(_,index)=>({name:index===0?'retry.png':index===1?'large.png':'fee-'+index+'.png',mimeType:'image/png',buffer:index===1?large:png}));
 await page.locator('[data-act=fee-files]').setInputFiles(files);
 await page.locator('[data-act=fee-retry-upload]').waitFor();await page.locator('[data-act=fee-retry-upload]').click();
 await page.getByText('已上传 6 / 30',{exact:true}).waitFor();assert.ok(maxActive<=3);assert.ok(maxActive>=2);
 await page.locator('[data-fee-note]').first().fill('IU Jacobs 缴费页');
 await page.waitForFunction(()=>[...document.querySelectorAll('#fbUploads img')].every(image=>image.complete&&image.naturalWidth>0));await page.screenshot({path:screenshots+'/m4-create-dialog.png'});await page.setViewportSize({width:375,height:812});await noOverflow(page,'create dialog');await page.screenshot({path:screenshots+'/m4-create-dialog-mobile.png',fullPage:true});await page.setViewportSize({width:1280,height:900});
 await page.locator('#modalForm button[type=submit]').click();await page.locator('#fbEditor').waitFor({state:'detached'});
 let boot=await api(staff,'GET','/bootstrap'),bill=boot.data.feeBills[0];assert.equal(bill.status,'sent');assert.equal(bill.totalFen,132600);assert.equal(bill.attachments.length,6);assert.equal(bill.attachments[0].note,'IU Jacobs 缴费页');assert.equal(bill.attachments[1].type,'image/jpeg');
 const dimensions=await page.evaluate(async key=>{const image=await createImageBitmap(await (await fetch('/api/files/'+encodeURIComponent(key))).blob());const size=[image.width,image.height];image.close();return size;},bill.attachments[1].key);assert.deepEqual(dimensions,[2400,1200]);
 await change(student,'student.fees',user.password);await studentPage.goto(base+'/#/fees');await studentPage.locator('.nav-btn[data-href="#/fees"]').waitFor();
 await studentPage.locator('.fb-qr-image').waitFor();await studentPage.waitForFunction(()=>document.querySelector('.fb-qr-image')?.naturalWidth>0);
 await noOverflow(studentPage,'student');await studentPage.screenshot({path:screenshots+'/m4-student-mobile.png',fullPage:true});
 await studentPage.locator('[data-act=fee-channel][data-channel=alipay]').click();await studentPage.waitForFunction(()=>document.querySelector('.fb-qr-image')?.alt.includes('支付宝'));
 await studentPage.locator('.fb-th').first().click();await studentPage.locator('.fb-preview').waitFor();await studentPage.locator('#modalForm [data-act=modal-close]').last().click();
 const download=studentPage.waitForEvent('download');await studentPage.getByText('保存收款码',{exact:true}).click();assert.ok((await download).suggestedFilename().endsWith('.png'));
 await studentPage.locator('[data-act=fee-claim]').click();await studentPage.locator('#modalForm [name=proof]').setInputFiles({name:'payment.png',mimeType:'image/png',buffer:png});await studentPage.locator('#modalForm button[type=submit]').click();await studentPage.locator('#modalForm').waitFor({state:'detached'});
 boot=await api(student,'GET','/bootstrap');assert.equal(boot.data.feeBills[0].status,'claimed');assert.ok(boot.data.feeBills[0].paymentProof.key);
 await page.reload();await page.locator('[data-act=fee-tab][data-status=claimed]').click();await page.screenshot({path:screenshots+'/m4-staff-list.png',fullPage:true});
 await page.setViewportSize({width:375,height:812});await noOverflow(page,'staff');await page.screenshot({path:screenshots+'/m4-staff-mobile.png',fullPage:true});
 await page.locator('[data-act=fee-reject]').click();await page.locator('#modalForm button[type=submit]').click();assert.equal(await page.locator('#modalForm').count(),1);await page.locator('#modalForm [name=reason]').fill('测试：暂未找到转账');await page.locator('#modalForm button[type=submit]').click();await page.locator('#modalForm').waitFor({state:'detached'});
 await studentPage.reload();await studentPage.getByText('顾问未确认收到：测试：暂未找到转账',{exact:true}).waitFor();await studentPage.locator('[data-act=fee-claim]').click();await studentPage.locator('#modalForm button[type=submit]').click();await studentPage.locator('#modalForm').waitFor({state:'detached'});
 await page.reload();await page.locator('[data-act=fee-confirm]').click();await page.locator('#modalForm button[type=submit]').click();await page.locator('#modalForm').waitFor({state:'detached'});await page.locator('[data-act=fee-tab][data-status=confirmed]').click();
 await page.locator('[data-act=fee-disburse]').click();await page.locator('#modalForm [name=proof]').setInputFiles({name:'disburse.png',mimeType:'image/png',buffer:png});await page.locator('#modalForm button[type=submit]').click();await page.locator('#modalForm').waitFor({state:'detached'});
 boot=await api(staff,'GET','/bootstrap');assert.equal(boot.data.feeBills[0].status,'disbursed');assert.ok(boot.data.feeBills[0].disburseProof);
 await page.locator('[data-act=fee-new]').click();await page.locator('#modalForm [name=title]').fill('保存草稿测试');await page.locator('#modalForm [name=itemLabel]').fill('测试项目');await page.locator('#modalForm [name=itemAmount]').fill('1.23');
 await page.locator('[data-act=fee-save-draft]').click();await page.locator('#fbEditor').waitFor({state:'detached'});
 assert.equal((await api(staff,'GET','/bootstrap')).data.feeBills.filter(b=>b.status==='draft').length,1);
 await page.locator('[data-act=fee-edit]').click();await page.locator('#modalForm [name=title]').fill('修改后的草稿');await page.locator('#modalForm button[type=submit]').click();await page.locator('#fbEditor').waitFor({state:'detached'});
 assert.ok((await api(staff,'GET','/bootstrap')).data.feeBills.some(b=>b.status==='sent'&&b.title==='修改后的草稿'));
 assert.deepEqual(errors,[]);console.log(JSON.stringify({pass:true,maxActive,compressed:true,errors,screenshots}));
}catch(error){console.error(error);throw error;}finally{await browser.close();await server.cleanup();}
