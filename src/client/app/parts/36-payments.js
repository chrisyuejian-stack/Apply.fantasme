  const fqPay={tab:'claimed',collect:null,collectError:null,loading:false,loadedAt:0,channel:'wechat',editor:null};
  const fqFeeLabels={draft:'草稿',sent:'待付款',claimed:'待确认收款',confirmed:'待代缴',disbursed:'已完成',cancelled:'已取消'};
  const fqFeeMoney=fen=>(Number(fen)/100).toLocaleString('zh-CN',{minimumFractionDigits:2,maximumFractionDigits:2});
  const fqFeeUrl=key=>'/api/files/'+encodeURIComponent(key);
  const fqFeeStudent=()=>ae()?.role==='student';
  const fqFeeStaff=()=>['supervisor','advisor'].includes(ae()?.role)&&!le();
  function fqFeeButton(bill,action,label,primary=false){return `<button class="btn sm ${primary?'primary':''}" data-act="fee-${action}" data-id="${a(bill.id)}">${label}</button>`;}
  function fqFeeGallery(rows=[]){return `<div class="fb-gal">${rows.map(file=>`<button type="button" class="fb-th" data-act="fee-preview" data-key="${a(file.key)}" data-type="${a(file.type)}" data-name="${a(file.name)}">${file.type.startsWith('image/')?`<img src="${fqFeeUrl(file.key)}" alt="${a(file.name)}" loading="lazy">`:'<div class="fb-file">PDF · 点击下载</div>'}<span class="fb-cap">${a(file.note||file.name)}</span></button>`).join('')}</div>`;}
  function fqFeeLoadCollect(){
    if(fqPay.loading || (fqPay.collect&&Date.now()-fqPay.loadedAt<30000) || fqPay.collectError)return;
    fqPay.loading=true;
    ge.call('GET','/fees/collect').then(result=>{fqPay.collect=result.collect;fqPay.loadedAt=Date.now();}).catch(error=>fqPay.collectError=error.message).finally(()=>{fqPay.loading=false;if(location.hash.startsWith('#/fees')||location.hash==='#/settings/collect')Vs();});
  }
  function fqFeeQR(){
    fqFeeLoadCollect();const config=fqPay.collect;
    if(!config)return `<div class="notice">${a(fqPay.collectError||'正在加载收款码…')}</div>`;
    const channel=config[fqPay.channel]?fqPay.channel:config.wechat?'wechat':'alipay',file=config[channel];
    return `<div class="fb-qr"><div class="fb-seg">${[['wechat','微信'],['alipay','支付宝']].map(([key,label])=>`<button class="btn sm ${key===channel?'primary':''}" data-act="fee-channel" data-channel="${key}" ${!config[key]?'disabled':''}>${label}</button>`).join('')}</div>${file?`${file.type.startsWith('image/')?`<img class="fb-qr-image" src="${fqFeeUrl(file.key)}" alt="${channel==='wechat'?'微信':'支付宝'}经营收款码">`:'<span>收款码为 PDF，请保存后查看</span>'}<b>收款人：${a(config.payeeName)}</b><span class="tiny muted2">手机上：点「保存收款码」，再在微信或支付宝里「扫一扫 → 相册」识别</span><a class="btn sm" href="${fqFeeUrl(file.key)}" download="${a(file.name)}">${I('download')} 保存收款码</a>`:'<span>收款码尚未配置，请联系顾问。</span>'}</div>`;
  }
  function fqFeeDetails(bill,student=false){
    return `<section class="panel fb-detail"><div class="panel-body stack"><div class="row between"><b>${a(bill.title)}</b><span class="pill ${bill.status==='sent'?'warn':bill.status==='disbursed'?'ok':''}">${fqFeeLabels[bill.status]}</span></div><div class="fb-amount"><small>¥</small>${fqFeeMoney(bill.totalFen)}</div><table class="fb-items"><tbody>${bill.items.map(item=>`<tr><td>${a(item.label)}</td><td>¥${fqFeeMoney(item.amountFen)}</td></tr>`).join('')}</tbody></table>${bill.studentNote?`<div class="small muted">顾问备注：${a(bill.studentNote)}</div>`:''}${bill.lastReject?`<div class="fb-note">顾问未确认收到：${a(bill.lastReject.reason)}</div>`:''}${bill.attachments.length?`<div class="small muted">缴费截图（${bill.attachments.length} 张，点击查看大图）</div>${fqFeeGallery(bill.attachments)}`:''}<div class="small muted">付款截止 ${a(bill.dueDate||'未设置')} · 顾问 ${a($t(bt.student(bill.studentId)?.advisorId))}</div>${student&&bill.status==='sent'?`${fqFeeQR()}<div><div class="small muted">付款时请在备注里填写：</div><button class="fb-ref" data-act="fee-copy" data-code="${a(bill.refCode)}">${a(bill.refCode)} ${I('copy')}</button></div>${fqFeeButton(bill,'claim','我已付款',true)}<div class="tiny muted2">付款截图选填。顾问核实到账后会确认，请勿重复付款。</div>`:`<div class="small">备注码 <b>${a(bill.refCode)}</b> · ${fqFeeLabels[bill.status]}</div>`}${bill.paymentProof?`<div class="small muted">付款截图</div>${fqFeeGallery([bill.paymentProof])}`:''}${bill.disburseProof?`<div class="small muted">代缴凭证</div>${fqFeeGallery([bill.disburseProof])}`:''}${!student?`<details><summary>操作历史（${bill.history.length}）</summary>${bill.history.map(event=>`<div class="tiny muted2">${a(m(event.at))} · ${a($t(event.by))} · ${a(({create:'创建',edit:'修改',send:'发送',cancel:'取消',claim:'学生已付款',confirm:'确认收到',reject:'未收到',disburse:'已代缴'})[event.action]||event.action)} ${a(event.note)}</div>`).join('')}</details>`:''}</div></section>`;
  }
  function fqFeePage(){
    if(document.body.dataset.diy==='1'||!['supervisor','advisor','student'].includes(ae()?.role))return Qe('没有费用单访问权限。');
    const rows=st.all('feeBills').slice().sort((x,y)=>$(y.updatedAt,x.updatedAt));
    const head=`<div class="page-head"><div><h2>${fqFeeStudent()?'付款':'收款'}<em>Payments</em></h2><p>${fqFeeStudent()?'需要你先付款、我们再代为缴纳的费用':'费用单：发给学生付款，确认到账后再代缴'}</p></div>${fqFeeStaff()?`<button class="btn primary" data-act="fee-new">${I('plus')} 新建费用单</button>`:''}</div>`;
    if(fqFeeStudent())return head+rows.map(bill=>fqFeeDetails(bill,true)).join('')+(rows.length?'':Me('暂无费用单','顾问发送费用单后会在这里显示。'));
    const tabs=['claimed','sent','confirmed','disbursed','cancelled','draft'];
    return head+`<div class="tabs fb-tabs">${tabs.map(status=>`<button class="tab ${status===fqPay.tab?'active':''}" data-act="fee-tab" data-status="${status}">${fqFeeLabels[status]}<span class="count ${status==='claimed'?'hot':''}">${rows.filter(bill=>bill.status===status).length}</span></button>`).join('')}</div><div class="fb-grp">${fqFeeLabels[fqPay.tab]}<span class="n">${rows.filter(bill=>bill.status===fqPay.tab).length}</span></div>`+rows.filter(bill=>bill.status===fqPay.tab).map(bill=>`<article class="fb-row" data-fee="${a(bill.id)}"><div class="fb-main"><div class="fb-title">${a(bt.student(bill.studentId)?.name||'学生')} · ${a(bill.title)}</div><div class="fb-meta"><span>备注码 <b>${a(bill.refCode)}</b></span><span>${a(bill.dueDate||'未设截止')}</span>${bill.claimedAt?`<span>${a(m(bill.claimedAt))} 学生标记已付</span>`:''}<span>顾问 ${a($t(bt.student(bill.studentId)?.advisorId))}</span></div>${bill.lastReject?`<div class="fb-note">上次被标记「未收到」：${a(bill.lastReject.reason)}</div>`:''}</div><div class="fb-money">¥${fqFeeMoney(bill.totalFen)}</div><div class="fb-actions">${fqFeeButton(bill,'view','详情')}${['draft','sent'].includes(bill.status)?fqFeeButton(bill,'edit','编辑')+fqFeeButton(bill,'cancel','取消费用单'):''}${bill.status==='draft'?fqFeeButton(bill,'send','发送给学生',true):''}${bill.status==='claimed'?fqFeeButton(bill,'reject','未收到')+fqFeeButton(bill,'confirm','确认收到',true):''}${bill.status==='confirmed'?fqFeeButton(bill,'disburse','已代缴，上传凭证'):''}</div></article>`).join('')+(rows.some(bill=>bill.status===fqPay.tab)?'':Me('暂无费用单'));
  }
  async function fqFeeAction(id,action,body={}){
    try{await ge.call('POST',`/fees/${encodeURIComponent(id)}/${action}`,{...body,_base:st.get('feeBills',id)?.updatedAt});await st.load();fqPay.collect=null;fqPay.collectError=null;Vs();Ae('费用单已更新');}
    catch(error){if(error.status===409){await st.load();Vs();}throw error;}
  }
  async function fqFeeCompress(file){
    if(!['image/jpeg','image/png','image/webp','application/pdf'].includes(file.type))throw Error('仅支持 JPG/PNG/WEBP/PDF');
    if(file.type.startsWith('image/')){
      const bitmap=await createImageBitmap(file);
      try{if(Math.max(bitmap.width,bitmap.height)>2400){
        const ratio=2400/Math.max(bitmap.width,bitmap.height),canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(bitmap.width*ratio));canvas.height=Math.max(1,Math.round(bitmap.height*ratio));const context=canvas.getContext('2d');context.fillStyle='#fff';context.fillRect(0,0,canvas.width,canvas.height);context.drawImage(bitmap,0,0,canvas.width,canvas.height);
        const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/jpeg',.85));if(!blob)throw Error('图片压缩失败');file=new File([blob],file.name.replace(/\.[^.]*$/,'')+'.jpg',{type:'image/jpeg'});
      }}finally{bitmap.close();}
    }
    if(!file.size||file.size>10*1024*1024)throw Error('文件须为非空且不超过10 MB');return file;
  }
  function fqFeeUpload(file,billId,purpose,progress=()=>{},control={}){
    return new Promise((resolve,reject)=>{
      const xhr=new XMLHttpRequest();control.xhr=xhr;xhr.open('POST','/api/files?'+new URLSearchParams({...(billId?{billId}:{}),purpose}));xhr.responseType='json';xhr.setRequestHeader('X-FQ','1');xhr.setRequestHeader('Content-Type',file.type);xhr.setRequestHeader('X-File-Name',encodeURIComponent(file.name));
      xhr.upload.onprogress=event=>progress(event.lengthComputable?Math.round(event.loaded/event.total*100):0);
      xhr.onload=()=>xhr.status===200?resolve(xhr.response.upload):reject(Error(xhr.response?.error||'上传失败，请重试'));xhr.onerror=()=>reject(Error('网络异常，请重试'));xhr.onabort=()=>reject(Error('已取消上传'));xhr.send(file);
    });
  }
  function fqFeeItemLine(item={label:'',amountFen:0}){return `<div class="fb-line"><input class="input" name="itemLabel" aria-label="费用项目" required maxlength="80" value="${a(item.label)}"><input class="input" name="itemAmount" aria-label="人民币金额" inputmode="decimal" required placeholder="0.00" value="${item.amountFen?(item.amountFen/100).toFixed(2):''}"><button type="button" class="btn sm" data-act="fee-remove-line" aria-label="删除费用行">×</button></div>`;}
  function fqFeeEditorValues(form){
    const values=_e(form),items=[...form.querySelectorAll('.fb-line')].map(line=>{
      const amount=line.querySelector('[name=itemAmount]').value.trim();if(!/^\d{1,7}(?:\.\d{1,2})?$/.test(amount))throw Error('金额需为正数，最多两位小数');
      const [whole,fraction='']=amount.split('.'),amountFen=Number(whole)*100+Number(fraction.padEnd(2,'0'));if(amountFen<1||amountFen>100000000)throw Error('单项金额需在0.01至1,000,000元之间');
      return {label:line.querySelector('[name=itemLabel]').value.trim(),amountFen};
    });
    return {studentId:values.studentId,title:values.title,items,dueDate:values.dueDate||null,studentNote:values.studentNote||''};
  }
  async function fqFeeEnsureDraft(editor){
    if(editor.bill)return editor.bill;
    if(editor.creating)return editor.creating;
    const form=document.getElementById('modalForm');if(!form)throw Error('编辑窗口已关闭');
    editor.creating=ge.call('POST','/fees',fqFeeEditorValues(form)).then(result=>{
      editor.bill=result.record;form.querySelector('[name=studentId]').disabled=true;return editor.bill;
    }).finally(()=>editor.creating=null);return editor.creating;
  }
  function fqFeeUploadList(editor){
    if(fqPay.editor!==editor||!document.getElementById('fbUploads'))return;
    document.getElementById('fbUploadedCount').textContent=`已上传 ${editor.uploads.filter(file=>file.status==='done').length} / 30`;
    document.getElementById('fbUploads').innerHTML=editor.uploads.map(file=>`<div class="fb-upc"><div class="fb-up-img">${file.preview?`<img src="${a(file.preview)}" alt="${a(file.name)}">`:a(file.name)}<button type="button" class="btn sm" data-act="fee-remove-upload" data-uid="${file.id}" aria-label="删除上传">×</button></div><div class="fb-progress"><i style="width:${file.progress||0}%"></i></div><span class="tiny">${a(file.error||({done:'上传完成',uploading:'正在上传',queued:'等待上传'}[file.status]||''))}</span>${file.status==='error'?`<button type="button" class="btn sm" data-act="fee-retry-upload" data-uid="${file.id}">重试</button>`:''}<input class="input" aria-label="截图备注" placeholder="这张是什么（选填）" maxlength="100" data-fee-note="${file.id}" value="${a(file.note)}"></div>`).join('');
  }
  function fqFeePump(editor){
    if(editor.closed)return;
    while(editor.active<3){
      const file=editor.uploads.find(row=>row.status==='queued');if(!file)break;
      editor.active++;file.status='uploading';file.error='';fqFeeUploadList(editor);
      (async()=>{
        const blob=await fqFeeCompress(file.file);const bill=await fqFeeEnsureDraft(editor);if(file.removed||editor.closed)return;
        file.upload=await fqFeeUpload(blob,bill.id,'attachment',percent=>{file.progress=percent;const index=editor.uploads.indexOf(file),bar=document.querySelectorAll('#fbUploads .fb-progress i')[index];if(bar)bar.style.width=percent+'%';},file);
        file.status='done';file.progress=100;file.preview=file.upload.type.startsWith('image/')?fqFeeUrl(file.upload.key):null;
      })().catch(error=>{file.status='error';file.error=error.message;}).finally(()=>{editor.active--;fqFeeUploadList(editor);fqFeePump(editor);});
    }
  }
  function fqFeeEditModal(bill=null){
    const students=ce.students().filter(student=>ce.manage(student.id));if(!students.length)return Ae('请先建立并分配学生档案',{error:true});
    const editor={bill,active:0,closed:false,uploads:(bill?.attachments||[]).map(file=>({id:i('up'),name:file.name,note:file.note,upload:file,status:'done',progress:100,preview:file.type.startsWith('image/')?fqFeeUrl(file.key):null}))};fqPay.editor=editor;
    Oe({title:bill?'编辑费用单':'新建费用单',sub:'发送后学生可在「付款」里看到并扫码付款',wide:true,submitLabel:'发送给学生',footExtra:'<button type="button" class="btn" data-act="fee-save-draft">保存草稿</button>',body:`<div id="fbEditor" class="stack"><div class="form-grid">${Le('studentId','学生',bill?.studentId||students[0].id,'select',{required:true,options:students.map(student=>[student.id,student.name]),attrs:bill?'disabled':''})}${Le('title','标题',bill?.title||'','text',{required:true})}</div><div><div class="label">费用明细（人民币）*</div><div id="fbItems">${(bill?.items||[{}]).map(fqFeeItemLine).join('')}</div><button type="button" class="btn sm" data-act="fee-add-line">${I('plus')} 添加一行</button><div class="fb-total">合计 <b id="fbTotal">¥${fqFeeMoney(bill?.totalFen||0)}</b></div></div><div class="form-grid">${Le('dueDate','付款截止',bill?.dueDate||'','date')}</div>${Le('studentNote','给学生的备注',bill?.studentNote||'','textarea',{full:true})}<div class="row between"><span>学校缴费截图（最多30张，每张可写备注）</span><span id="fbUploadedCount" class="tiny muted2"></span></div><div id="fbUploads" class="fb-up"></div><label class="btn">选择图片（可多选）<input type="file" data-act="fee-files" multiple accept="image/jpeg,image/png,image/webp,application/pdf" hidden></label><div class="tiny muted2">并发上传3张，单张≤10 MB；长边超过2400px的图片将自动压缩。上传时先保存草稿，关闭窗口后可在「草稿」中继续。</div></div>`,onSubmit:async(values,form)=>{
      const intent=editor.intent||'send';editor.intent=null;
      if(editor.active||editor.uploads.some(file=>file.status!=='done')){Ae('请等待上传完成；失败的文件请重试或删除',{error:true});return false;}
      const bill=await fqFeeEnsureDraft(editor),body=fqFeeEditorValues(form);body.studentId=bill.studentId;
      const result=await ge.call('PATCH','/fees/'+bill.id,{...body,_base:bill.updatedAt,attachments:editor.uploads.map(file=>({...file.upload,note:file.note}))});editor.bill=result.record;
      if(intent==='send'&&editor.bill.status==='draft')await ge.call('POST','/fees/'+bill.id+'/send',{_base:editor.bill.updatedAt});
      await st.load();fqPay.tab=intent==='send'?'sent':'draft';fqPay.collect=null;fqPay.collectError=null;Vs();Ae(intent==='send'?'费用单已发送':'草稿已保存');
    }});
    fqFeeUploadList(editor);
    const observer=new MutationObserver(()=>{if(!document.getElementById('fbEditor')){editor.closed=true;for(const file of editor.uploads){file.xhr?.abort();if(file.preview?.startsWith('blob:'))URL.revokeObjectURL(file.preview);}observer.disconnect();if(editor.bill)st.refresh();}});observer.observe(document.getElementById('modal'),{childList:true,subtree:true});
  }
  function fqFeeCollectPanel(){
    fqFeeLoadCollect();const config=fqPay.collect;
    if(!config)return `<div class="panel-body">${a(fqPay.collectError||'正在加载收款码…')}</div>`;
    return `<form id="fbCollectForm" class="panel-body stack"><div class="notice info">统一使用主管经营收款码。请核对收款人名称；仅主管可修改。</div>${Le('payeeName','收款人名称',config.payeeName,'text',{required:true})}<div class="form-grid">${[['wechat','微信'],['alipay','支付宝']].map(([channel,label])=>`<div class="stack"><b>${label}经营收款码</b>${config[channel]?fqFeeGallery([config[channel]]):'<span class="small muted">未配置</span>'}<input class="input" type="file" name="${channel}" accept="image/jpeg,image/png,image/webp"><label class="small"><input type="checkbox" name="remove-${channel}">移除此收款码</label></div>`).join('')}</div><div class="tiny muted2" id="fbCollectProgress"></div><button class="btn primary" type="submit">保存收款码</button></form>`;
  }
  ms['fee-new']=()=>fqFeeEditModal();
  ms['fee-edit']=button=>fqFeeEditModal(st.get('feeBills',button.dataset.id));
  ms['fee-tab']=button=>{fqPay.tab=button.dataset.status;Vs();};
  ms['fee-channel']=button=>{fqPay.channel=button.dataset.channel;Vs();};
  ms['fee-view']=button=>{const bill=st.get('feeBills',button.dataset.id);if(bill)Oe({title:'费用单详情',sub:bill.refCode,wide:true,body:fqFeeDetails(bill)});};
  ms['fee-preview']=button=>{
    const url=fqFeeUrl(button.dataset.key);
    Oe({title:button.dataset.name||'查看文件',wide:true,body:`${button.dataset.type?.startsWith('image/')?`<img class="fb-preview" src="${url}" alt="${a(button.dataset.name)}">`:'<p>PDF 请下载后查看。</p>'}<a class="btn" href="${url}" download>下载文件</a>`});
  };
  ms['fee-copy']=button=>{navigator.clipboard.writeText(button.dataset.code).then(()=>Ae('备注码已复制')).catch(()=>Ae('请长按备注码复制：'+button.dataset.code));};
  for(const action of ['send','cancel','confirm'])ms['fee-'+action]=button=>{
    const bill=st.get('feeBills',button.dataset.id);if(!bill)return;
    Oe({title:{send:'发送费用单',cancel:'取消费用单',confirm:'确认收到款项'}[action],sub:bill.title,body:`<p>金额 ¥${fqFeeMoney(bill.totalFen)} · 备注码 ${a(bill.refCode)}</p><p>${action==='confirm'?'请核对经营收款账户已实际到账。系统不会自动验证转账。':action==='cancel'?'取消后不能恢复，请确认学生尚未付款。':'发送后学生可查看明细与收款码。'}</p>`,submitLabel:'确认',danger:action==='cancel',onSubmit:()=>fqFeeAction(bill.id,action)});
  };
  ms['fee-reject']=button=>{const bill=st.get('feeBills',button.dataset.id);if(!bill)return;Oe({title:'未收到款项',sub:bill.title,body:Le('reason','请说明原因','','textarea',{required:true,full:true}),submitLabel:'退回待付款',onSubmit:values=>fqFeeAction(bill.id,'reject',{reason:values.reason})});};
  for(const action of ['claim','disburse'])ms['fee-'+action]=button=>{
    const bill=st.get('feeBills',button.dataset.id);if(!bill)return;
    Oe({title:action==='claim'?'我已付款':'登记已代缴',sub:bill.title,body:`<p>金额 ¥${fqFeeMoney(bill.totalFen)} · ${a(bill.refCode)}</p><label class="field full"><span class="label">${action==='claim'?'付款截图':'代缴凭证'}（选填）</span><input class="input" type="file" name="proof" accept="image/jpeg,image/png,image/webp,application/pdf"></label><div id="fbProofProgress" class="tiny muted2"></div>`,submitLabel:'确认提交',onSubmit:async(values,form)=>{
      const file=form.querySelector('[name=proof]').files[0],payload={};
      if(file){const blob=await fqFeeCompress(file),upload=await fqFeeUpload(blob,bill.id,action==='claim'?'payment':'disburse',percent=>{const target=document.getElementById('fbProofProgress');if(target)target.textContent='上传 '+percent+'%';});payload[action==='claim'?'paymentProof':'disburseProof']=upload;}
      await fqFeeAction(bill.id,action,payload);
    }});
  };
  ms['fee-add-line']=()=>{const target=document.getElementById('fbItems');if(target.children.length>=50)return Ae('最多50行',{error:true});target.insertAdjacentHTML('beforeend',fqFeeItemLine());};
  ms['fee-remove-line']=button=>{if(document.querySelectorAll('#fbItems .fb-line').length<=1)return Ae('请至少保留一行',{error:true});button.closest('.fb-line').remove();fqFeeUpdateTotal();};
  ms['fee-save-draft']=()=>{if(fqPay.editor)fqPay.editor.intent='draft';document.getElementById('modalForm')?.requestSubmit();};
  ms['fee-remove-upload']=button=>{
    const editor=fqPay.editor,file=editor?.uploads.find(file=>file.id===button.dataset.uid);if(!file)return;
    file.removed=true;file.xhr?.abort();if(file.preview?.startsWith('blob:'))URL.revokeObjectURL(file.preview);editor.uploads=editor.uploads.filter(row=>row!==file);fqFeeUploadList(editor);
  };
  ms['fee-retry-upload']=button=>{const editor=fqPay.editor,file=editor?.uploads.find(file=>file.id===button.dataset.uid);if(!file)return;file.status='queued';file.progress=0;fqFeePump(editor);};
  function fqFeeUpdateTotal(){const form=document.getElementById('modalForm'),total=document.getElementById('fbTotal');if(!total||!form)return;try{total.textContent='¥'+fqFeeMoney(fqFeeEditorValues(form).items.reduce((sum,item)=>sum+item.amountFen,0));}catch{total.textContent='请检查金额';}}
  document.addEventListener('input',event=>{
    if(event.target.closest('#fbItems'))fqFeeUpdateTotal();
    if(event.target.dataset.feeNote){const file=fqPay.editor?.uploads.find(file=>file.id===event.target.dataset.feeNote);if(file)file.note=event.target.value;}
  });
  document.addEventListener('change',event=>{
    if(event.target.dataset.act!=='fee-files')return;
    const editor=fqPay.editor;if(!editor)return;
    const files=[...event.target.files];event.target.value='';
    if(files.length+editor.uploads.length>30)return Ae('每单最多30张，请减少选择数量',{error:true});
    for(const file of files)editor.uploads.push({id:i('up'),name:file.name,note:'',file,status:'queued',progress:0,preview:null});
    fqFeePump(editor);fqFeeUploadList(editor);
  });
  document.addEventListener('submit',async event=>{
    const form=event.target;if(form.id!=='fbCollectForm')return;event.preventDefault();
    const button=form.querySelector('button[type=submit]');if(button.disabled)return;button.disabled=true;
    try{
      const body={payeeName:form.elements.payeeName.value.trim(),wechat:fqPay.collect?.wechat||null,alipay:fqPay.collect?.alipay||null};
      for(const channel of ['wechat','alipay']){
        if(form.elements['remove-'+channel].checked)body[channel]=null;
        const file=form.elements[channel].files[0];if(file)body[channel]=await fqFeeUpload(await fqFeeCompress(file),null,'collect',percent=>{document.getElementById('fbCollectProgress').textContent='上传 '+percent+'%';});
      }
      const result=await ge.call('PUT','/fees/collect',body);fqPay.collect=result.collect;fqPay.loadedAt=Date.now();fqPay.collectError=null;Vs();Ae('收款码已保存');
    }catch(error){Ae(error.message,{error:true});}finally{button.disabled=false;}
  });
  {
    const style=document.createElement('style');style.id='fq-payments-style';style.textContent=`
.fb-amount{font-size:30px;font-weight:750;color:var(--accent)}.fb-amount small{font-size:15px;margin-right:2px}.fb-items{width:100%;border-collapse:collapse;font-size:13px}.fb-items td{padding:9px 0;border-bottom:1px dashed var(--line);overflow-wrap:anywhere}.fb-items td:last-child{text-align:right;white-space:nowrap;font-weight:600;padding-left:8px}
.fb-ref{display:inline-flex;align-items:center;gap:8px;background:#FFF4E8;color:#8A3B12;border:0;border-radius:8px;padding:6px 10px;font-weight:700;font-size:15px;letter-spacing:.06em}.fb-qr{display:flex;flex-direction:column;align-items:center;gap:8px;padding:14px;background:var(--panel2);border-radius:12px;text-align:center}.fb-qr-image{width:170px;max-width:100%;height:170px;object-fit:contain;background:#fff}.fb-seg{display:flex;gap:6px;background:#fff;border:1px solid var(--line);border-radius:10px;padding:3px}
.fb-row{display:grid;grid-template-columns:minmax(0,1fr) auto auto;gap:14px;align-items:center;background:#fff;border:1px solid var(--line);border-radius:12px;padding:12px 14px;margin-bottom:10px}.fb-title{font-weight:650;font-size:14px}.fb-main{min-width:0;overflow-wrap:anywhere}.fb-meta{font-size:12px;color:var(--muted2);margin-top:4px;display:flex;gap:10px;flex-wrap:wrap}.fb-money{font-weight:700;font-size:15px;white-space:nowrap}.fb-actions{display:flex;gap:8px;flex-wrap:wrap;max-width:300px}.fb-note{font-size:12.5px;color:#8A3B12;background:#FFF4E8;border-radius:8px;padding:6px 9px;margin-top:6px;overflow-wrap:anywhere}.fb-grp{margin:16px 0 8px;font-size:12px;font-weight:700;color:var(--muted);display:flex;gap:8px}.fb-detail{margin-bottom:16px;overflow-wrap:anywhere}.fb-detail .btn.primary{justify-content:center;padding:12px}
.fb-line{display:grid;grid-template-columns:minmax(0,1fr) 130px 32px;gap:8px;align-items:center;margin-bottom:8px}.fb-line input{width:100%;min-width:0}.fb-total{text-align:right;margin-top:6px;color:var(--accent)}.fb-total b{font-size:20px}
.fb-gal{display:grid;grid-template-columns:repeat(auto-fill,minmax(96px,1fr));gap:8px}.fb-th{border:1px solid var(--line);border-radius:10px;overflow:hidden;background:#fff;padding:0;text-align:left;min-width:0}.fb-th img,.fb-file{width:100%;height:72px;object-fit:contain;background:var(--panel2)}.fb-file{display:flex;align-items:center;justify-content:center;font-size:11px}.fb-cap{display:block;font-size:11px;padding:5px 6px;color:var(--fg);overflow-wrap:anywhere}.fb-preview{max-width:100%;max-height:70vh;display:block;margin:auto}
.fb-up{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px}.fb-upc{border:1px solid var(--line);border-radius:10px;overflow:hidden;background:#fff;min-width:0}.fb-upc>input{border:0;border-top:1px solid var(--line);width:100%;min-width:0;padding:7px 8px;font-size:12px}.fb-up-img{height:74px;background:var(--panel2);position:relative;overflow:hidden}.fb-up-img img{width:100%;height:100%;object-fit:contain}.fb-up-img>button{position:absolute;right:4px;top:4px;background:#fff}.fb-upc>.tiny{display:block;padding:3px 6px;overflow-wrap:anywhere}.fb-progress{height:3px;background:#E7E2EC}.fb-progress i{display:block;height:3px;background:var(--accent)}
@media(max-width:700px){.fb-row{grid-template-columns:minmax(0,1fr) auto;gap:10px}.fb-actions{grid-column:1/-1;max-width:none}.fb-tabs{flex-wrap:wrap}.fb-tabs .tab{padding:10px 8px;font-size:12px}.fb-line{grid-template-columns:minmax(0,1fr) 90px 28px}.fb-line .btn{padding:4px}#fbEditor .form-grid{grid-template-columns:1fr}.fb-detail .panel-body{padding:14px}.fb-up{grid-template-columns:repeat(auto-fill,minmax(130px,1fr))}.fb-ref{max-width:100%;overflow-wrap:anywhere}}
`;document.head.append(style);
  }
