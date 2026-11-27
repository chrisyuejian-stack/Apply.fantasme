// 本地合成数据浏览器验证；先运行 npm test，不连接云端资源。
// 运行：NODE_PATH=$(npm root -g) node tests/e2e/issue-67.browser.mjs
// 前置：安装 Node 版 playwright（npm install -g playwright），并准备 Chromium。
// NODE_PATH 指向 npm 全局模块目录；已有其他模块路径时可保留为 NODE_PATH="$(npm root -g):$NODE_PATH"。
// LOCAL_BOARD_FLAG=0 测关闭场景；M3_EVIDENCE_DIR 指定截图目录；CHROMIUM_EXECUTABLE 指定浏览器路径。
import {fileURLToPath} from 'node:url';
import {readFile,writeFile,mkdtemp,mkdir,rm} from 'node:fs/promises';
import {spawn} from 'node:child_process';
import {createHmac,createHash} from 'node:crypto';
import {createRequire} from 'node:module';
const require=createRequire(new URL('../../package.json',import.meta.url));const {chromium}=require('playwright');
const root=fileURLToPath(new URL('../../',import.meta.url)).replace(/\/$/,''),dir=await mkdtemp('/tmp/gpt-m3-browser-'),shots=process.env.M3_EVIDENCE_DIR||'/tmp/gpt-m3-evidence',v12=process.env.LOCAL_BOARD_FLAG!=='0';await mkdir(shots,{recursive:true});
const key='SyntheticSetup2026',secret='SyntheticBridgeOnlyForLocalBrowser2026';
let dev=await readFile(root+'/scripts/dev.mjs','utf8');
dev=dev.replace("from './local-d1.mjs'",`from '${root}/scripts/local-d1.mjs'`).replace("from './local-r2.mjs'",`from '${root}/scripts/local-r2.mjs'`).replace("from '../dist/_worker.js'",`from '${root}/dist/_worker.js'`).replace("const root = resolve(import.meta.dirname, '..');",`const root = '${root}';`).replace('  APPLY_DB: db,',`  APPLY_DB: db, BOARD_V12_ENABLED:process.env.LOCAL_BOARD_FLAG||'1', ASSISTANT_BRIDGE_SECRET:'${secret}',`);
const serverFile=dir+'/server.mjs';await writeFile(serverFile,dev);
const srv=spawn('node',[serverFile],{cwd:root,env:{...process.env,PORT:'0',LOCAL_DATA_DIR:dir,APPLY_SETUP_KEY:key,PBKDF2_ITERATIONS:'10000'},stdio:['ignore','pipe','pipe']});let log='';srv.stderr.on('data',d=>log+=d);const url=await new Promise((res,rej)=>{srv.stdout.on('data',d=>{log+=d;const m=log.match(/https:\/\/localhost:\d+/);if(m)res(m[0]);});srv.on('exit',c=>rej(Error(log)));setTimeout(()=>rej(Error(log)),15000).unref();});
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_EXECUTABLE||'/usr/bin/chromium',args:['--no-sandbox']});
let errors=[];const c=await browser.newContext({ignoreHTTPSErrors:true,viewport:{width:1280,height:860}});const page=await c.newPage();page.on('pageerror',e=>errors.push(e.message));
const call=async(method,path,body)=>{const r=await c.request.fetch(url+'/api'+path,{method,headers:{'X-FQ':'1','Content-Type':'application/json'},data:body===undefined?undefined:JSON.stringify(body)});const data=await r.json();if(!r.ok())throw Error(r.status()+':'+JSON.stringify(data));return data;};
async function push(body){const raw=JSON.stringify(body),path='/api/integrations/assistant/tasks',ts=String(Math.floor(Date.now()/1000));const sig=createHmac('sha256',secret).update(ts+'\nPOST\n'+path+'\n'+createHash('sha256').update(raw).digest('hex')).digest('hex');const r=await c.request.post(url+path,{headers:{'Content-Type':'application/json','X-FQ-Timestamp':ts,'X-FQ-Signature':sig},data:raw});if(!r.ok())throw Error(await r.text());return r.json();}
try{
 await call('POST','/setup',{setupKey:key,name:'主管',username:'sup',password:'SupPassword2026',demo:false});
 const advisor=await call('POST','/users',{name:'李顾问',username:'li.advisor',role:'advisor'});const other=await call('POST','/users',{name:'周顾问',username:'zhou',role:'advisor'});
 const date=offset=>{const d=new Date();d.setDate(d.getDate()+offset);return d.toISOString().slice(0,10);};
 const rows=[['late','给林同学补交 IU Jacobs 成绩单公证件','学校邮件说必须收到纸质件，确认是否已寄出。','high',-2],['today','确认 RNCM 面试时间并告知学生','','normal',0],['blocked','整理王同学三封推荐信状态','Curtis 截止前要齐，缺哪封列出来。','normal',2],['done','把陈同学的作品集链接发给 Juilliard','','low',-3]];
 for(const [externalId,title,note,importance,day] of rows)await push({externalId,title,note,importance,due:date(day),assignee:'li.advisor'});
 const pub=v12?await push({externalId:'public',title:'核对新一轮面试安排',note:'供可接手的顾问认领',importance:'normal'}):null;
 await call('POST','/logout');await call('POST','/login',{username:'li.advisor',password:advisor.password});await call('POST','/password',{old:advisor.password,new:'AdvisorPassword2026'});
 let boot=await call('GET','/bootstrap');const get=id=>boot.data.boardTasks.find(x=>x.externalId===id);
 await call('POST','/board/tasks/'+get('blocked').id+'/block',{blockedReason:'第二推荐人李老师出国，邮件未回，已改约电话。'});await call('POST','/board/tasks/'+get('done').id+'/done',{});
 await page.goto(url+'/#/tasks');await page.getByRole('tab',{name:/主管提醒/}).click();await page.locator('.rm-card').first().waitFor();
 await page.screenshot({path:shots+'/m3-advisor.png',fullPage:true});
 await page.locator('[data-reminder="'+get('late').id+'"] [data-act="rm-block"]').click();await page.locator('#modalForm textarea').fill('公证处要求学生本人到场，需要主管决定是否改用电子件先行提交。');await page.screenshot({path:shots+'/m3-blocked-dialog.png',fullPage:true});
 await page.setViewportSize({width:375,height:812});await page.waitForTimeout(500);if((await page.evaluate(()=>document.documentElement.scrollWidth))>375)throw Error('modal overflow');await page.screenshot({path:shots+'/m3-blocked-dialog-375.png',fullPage:true});await page.setViewportSize({width:1280,height:860});
 await page.locator('#modalForm [data-act="modal-close"]').last().click();
 // Exercise real claim/release, completion and immutable block through the rendered UI.
 if(v12){
 await page.locator('[data-reminder="'+pub.id+'"] [data-act="rm-claim"]').click();await page.locator('[data-reminder="'+pub.id+'"] [data-act="rm-release"]').waitFor();
 await page.locator('[data-reminder="'+pub.id+'"] [data-act="rm-release"]').click();await page.locator('#modalForm button[type="submit"]').click();await page.locator('[data-reminder="'+pub.id+'"] [data-act="rm-claim"]').waitFor();
 }else if(await page.locator('[data-act=rm-claim],[data-act=rm-release]').count())throw Error('flag off exposes claims');
 await page.locator('[data-reminder="'+get('today').id+'"] [data-act="rm-done"]').click();await page.locator('[data-reminder="'+get('today').id+'"].done').waitFor();
 await page.locator('[data-reminder="'+get('late').id+'"] [data-act="rm-block"]').click();await page.locator('#modalForm button[type="submit"]').click();if(await page.locator('#modalForm').count()!==1)throw Error('empty reason accepted');
 await page.locator('#modalForm textarea').fill('测试遇阻');await page.locator('#modalForm button[type="submit"]').click();await page.locator('[data-reminder="'+get('late').id+'"] .rm-block').waitFor();
 await page.setViewportSize({width:375,height:812});await page.waitForTimeout(4500);await page.screenshot({path:shots+'/m3-advisor-375.png',fullPage:true});
 const widths=[];const check=async label=>{const value=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));widths.push({label,...value});if(value.scroll>value.width)throw Error('overflow '+label+JSON.stringify(value));};await check('advisor');
 await call('POST','/logout');await call('POST','/login',{username:'sup',password:'SupPassword2026'});await page.setViewportSize({width:1280,height:860});await page.reload();await page.getByRole('tab',{name:/主管提醒/}).click();
 await page.screenshot({path:shots+'/m3-supervisor.png',fullPage:true});
 if(v12){
 await page.getByLabel('负责顾问',{exact:true}).selectOption('public');if(await page.locator('.rm-card').count()!==1)throw Error('public filter');await page.getByLabel('负责顾问',{exact:true}).selectOption('');
 }
 await page.setViewportSize({width:375,height:812});await page.waitForTimeout(1000);await check('supervisor');await page.screenshot({path:shots+'/m3-supervisor-375.png',fullPage:true});
 if(v12){
 await page.locator('[data-reminder="'+pub.id+'"] summary').click();await page.locator('[data-reminder="'+pub.id+'"] [data-act="rm-reassign"]').click();await page.locator('#modalForm select').selectOption(other.user.id);await page.locator('#modalForm button[type="submit"]').click();await page.locator('#modalForm').waitFor({state:'detached'});
 await page.locator('[data-reminder="'+pub.id+'"] summary').click();await page.locator('[data-reminder="'+pub.id+'"] [data-act="rm-delete"]').click();await page.locator('#modalForm button[type="submit"]').click();await page.locator('[data-reminder="'+pub.id+'"]').waitFor({state:'detached'});
 }
 await page.getByRole('tab',{name:/申请任务/}).click();if(!await page.locator('[data-act=task-new]').count())throw Error('application tasks changed');await page.goto(url+'/#/home');await page.locator('.stats').waitFor();
 if(errors.length)throw Error(JSON.stringify(errors));console.log(JSON.stringify({pass:true,widths,errors,shots}));
}finally{await browser.close();srv.kill();await rm(dir,{recursive:true,force:true});}
