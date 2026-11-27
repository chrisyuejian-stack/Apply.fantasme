  // Supervisor reminders use dedicated atomic endpoints; never the generic store PUT.
  const fqReminderState={tab:'application',assignee:'',status:''};
  function fqReminderEligible(){return !le() && ['advisor','supervisor'].includes(ae()?.role);}
  function fqReminderRows(){
    if(!fqReminderEligible()) return [];
    return st.all('boardTasks').filter(row=>row.status!=='cancelled' && (st.features?.boardV12 || row.visibility!=='board'));
  }
  function fqReminderCount(){return fqReminderRows().filter(row=>['open','blocked'].includes(row.status)).length;}
  function fqReminderTabs(){
    const rows=fqReminderRows(),blocked=rows.filter(row=>row.status==='blocked').length;
    const count=de()&&blocked?blocked+' 遇阻':fqReminderCount();
    return `<div class="tabs rm-tabs" role="tablist" aria-label="任务类别"><button class="tab ${fqReminderState.tab==='application'?'active':''}" role="tab" aria-selected="${fqReminderState.tab==='application'}" data-act="rm-tab" data-tab="application">申请任务<span class="count">${st.all('tasks').filter(Kt).length}</span></button><button class="tab ${fqReminderState.tab==='board'?'active':''}" role="tab" aria-selected="${fqReminderState.tab==='board'}" data-act="rm-tab" data-tab="board">${I('alert')} 主管提醒<span class="count hot">${count}</span></button></div>`;
  }
  function fqReminderDay(date){return date?Math.round((Date.parse(date+'T00:00:00Z')-Date.parse(l()+'T00:00:00Z'))/86400000):null;}
  function fqReminderWho(row){return row.assigneeId?$t(row.assigneeId):'未认领';}
  function fqReminderButton(row,action,label,primary=false){return `<button class="btn sm ${primary?'primary':''}" data-act="rm-${action}" data-id="${a(row.id)}">${label}</button>`;}
  function fqReminderCard(row){
    const publicTask=row.visibility==='board'&&!row.claimedBy,own=row.assigneeId===ae().id;
    const days=fqReminderDay(row.due),due=row.status==='done'?(row.due?.slice(5).replace('-','/')||'未设截止日期'):days===null?'未设截止日期':days<0?`已逾期 ${-days} 天 · ${row.due.slice(5).replace('-','/')}`:days===0?'今天截止':row.due.slice(5).replace('-','/')+' 截止';
    let buttons='';
    if(publicTask) buttons=fqReminderButton(row,'claim','认领',true);
    else if(own && ['open','blocked'].includes(row.status)) {
      if(row.status==='open') buttons+=fqReminderButton(row,'block',I('alert')+' 遇阻');
      buttons+=fqReminderButton(row,'done',I('check')+' 完成',true);
      if(st.features?.boardV12 && row.visibility==='board' && row.status==='open') buttons+=fqReminderButton(row,'release','释放');
    }
    const status=publicTask?'公开 · 待认领':row.status==='done'?'已完成':row.status==='blocked'?'遇阻':'待办';
    if(de() || row.status==='done') buttons=`<span class="pill ${row.status==='done'?'ok':row.status==='blocked'?'warn':''}">${status}</span>`+buttons;
    if(de() && ['open','blocked'].includes(row.status)) buttons+=`<details class="menu-wrap"><summary class="btn sm" aria-label="管理提醒">⋯</summary><div class="menu"><button data-act="rm-reassign" data-id="${a(row.id)}">${st.features?.boardV12?'改派 / 释放':'改派'}</button><button data-act="rm-delete" data-id="${a(row.id)}">删除</button></div></details>`;
    return `<article class="rm-card ${row.status==='done'?'done':''}" data-reminder="${a(row.id)}"><div class="rm-bar ${['high','normal','low'].includes(row.importance)?row.importance:'normal'}"></div><div class="rm-main"><div class="rm-title">${a(row.title)}</div>${row.note?`<div class="rm-note">${a(row.note)}</div>`:''}${row.blockedReason?`<div class="rm-block">${I('alert')} 遇阻：${a(row.blockedReason)}</div>`:''}<div class="rm-meta"><span class="${row.status==='done'?'':days!==null&&days<0?'due-late':days===0?'due-today':''}">${a(due)}</span><span>${{high:'重要',normal:'普通',low:'低'}[row.importance]||'普通'}</span>${de()?`<span>负责：${a(fqReminderWho(row))}</span>`:''}${row.visibility==='board'&&row.claimedBy?`<span>已被${a(fqReminderWho(row))}认领</span>`:''}<span>来自主管 · ${a(row.createdAt?.slice(5,10).replace('-','/')||'')}</span>${['blocked','done'].includes(row.status)?`<span class="rm-sync">${row.status==='done'?'已完成':'已报遇阻'} · 已同步给主管</span>`:''}</div></div><div class="rm-acts">${buttons}</div></article>`;
  }
  function fqReminderPage(){
    let rows=fqReminderRows().filter(row=>row.status!=='done' || Date.parse(row.doneAt||row.updatedAt)>=Date.now()-(de()?7:30)*86400000);
    if(de()) rows=rows.filter(row=>(!fqReminderState.status||row.status===fqReminderState.status)&&(!fqReminderState.assignee||(fqReminderState.assignee==='public'?row.visibility==='board'&&!row.claimedBy:row.assigneeId===fqReminderState.assignee)));
    rows.sort((x,y)=>$(x.due,y.due)||$(x.createdAt,y.createdAt));
    const publicRows=rows.filter(row=>row.visibility==='board'&&!row.claimedBy),owned=rows.filter(row=>!publicRows.includes(row));
    const group=(name,list)=>list.length?`<h3 class="rm-group">${name}<span class="n">${list.length}</span></h3>${list.map(fqReminderCard).join('')}`:'';
    const groups=de()?[
      ['遇阻',row=>row.status==='blocked'],['逾期',row=>row.status==='open'&&fqReminderDay(row.due)!==null&&fqReminderDay(row.due)<0],['进行中',row=>row.status==='open'&&(fqReminderDay(row.due)===null||fqReminderDay(row.due)>=0)],['近 7 天已完成',row=>row.status==='done']
    ]:[['逾期',row=>row.status!=='done'&&fqReminderDay(row.due)!==null&&fqReminderDay(row.due)<0],['今天',row=>row.status!=='done'&&fqReminderDay(row.due)===0],['本周',row=>row.status!=='done'&&fqReminderDay(row.due)>0&&fqReminderDay(row.due)<=(7-new Date().getDay())%7],['之后',row=>row.status!=='done'&&(fqReminderDay(row.due)===null||fqReminderDay(row.due)>(7-new Date().getDay())%7)],['已完成',row=>row.status==='done']];
    const options=st.all('users').filter(user=>user.active&&['advisor','supervisor'].includes(user.role));
    const filters=de()?`<div class="rm-filter"><select class="select" aria-label="负责顾问" data-act="rm-filter" data-key="assignee"><option value="">全部顾问</option>${st.features?.boardV12?`<option value="public" ${fqReminderState.assignee==='public'?'selected':''}>未认领公开任务</option>`:''}${options.map(user=>`<option value="${a(user.id)}" ${fqReminderState.assignee===user.id?'selected':''}>${a(user.name)}</option>`).join('')}</select><select class="select" aria-label="提醒状态" data-act="rm-filter" data-key="status">${[['','全部状态'],['open','待办'],['blocked','遇阻'],['done','已完成']].map(([value,label])=>`<option value="${value}" ${fqReminderState.status===value?'selected':''}>${label}</option>`).join('')}</select><span class="small muted2">提醒只能从助理推送；完成与遇阻会自动回到你的待办</span></div>`:`<div class="notice info rm-notice"><div>主管经助理推送的提醒。点「完成」或「遇阻」后会自动同步给主管。</div></div>`;
    return `<div class="page-head"><div><h2>${de()?'任务':'我的任务'}<em>Tasks</em></h2><p>${de()?'全部顾问的申请任务与主管提醒':'申请任务与主管交办的提醒'}</p></div></div>${fqReminderTabs()}${filters}${st.features?.boardV12?group('公开任务板',publicRows):''}${groups.map(([name,predicate])=>group(name,owned.filter(predicate))).join('')}${rows.length?'':Me('暂无主管提醒','提醒由助理推送，收到后将在这里显示。')}`;
  }
  async function fqReminderSubmit(id,action,body={}){
    try {
      await ge.call('POST',`/board/tasks/${encodeURIComponent(id)}/${action}`,body);
      await st.load();Vs();
      Ae({claim:'已认领',release:'已放回公开任务板',block:'已报告遇阻，已同步给主管',done:'已完成，已同步给主管',reassign:'已改派',delete:'已删除'}[action]);
    } catch(error){
      if(error.status===409){await st.load();Vs();}
      throw error;
    }
  }
  ms['rm-tab']=button=>{fqReminderState.tab=button.dataset.tab;Vs();};
  for(const what of ['claim','done']) ms['rm-'+what]=button=>{
    button.disabled=true;fqReminderSubmit(button.dataset.id,what).catch(error=>Ae(error.message,{error:true})).finally(()=>button.disabled=false);
  };
  ms['rm-block']=button=>{
    const row=st.get('boardTasks',button.dataset.id);if(!row) return;
    Oe({title:'报告遇阻',sub:row.title,submitLabel:'提交遇阻',body:`<label class="field full"><span class="label">卡在哪里 / 需要什么帮助 <b class="rm-required">*</b></span><textarea class="textarea" name="blockedReason" required data-label="遇阻原因" maxlength="500" rows="4"></textarea></label><div class="tiny muted2 rm-help">提交后会同步给主管。请说明需要什么帮助；提交后原因不可修改，之后仍可点「完成」。</div>`,onSubmit:async values=>{
      if([...values.blockedReason].length>500) {Ae('遇阻原因不能超过500字',{error:true});return false;}
      await fqReminderSubmit(row.id,'block',{blockedReason:values.blockedReason});
    }});
  };
  for(const what of ['release','delete']) ms['rm-'+what]=button=>{
    const row=st.get('boardTasks',button.dataset.id);if(!row)return;
    Oe({title:what==='delete'?'删除提醒':'释放任务',sub:row.title,submitLabel:'确认',danger:what==='delete',body:`<p>${what==='delete'?'删除后助理会收到取消通知。':'任务将放回公开任务板，供顾问重新认领。'}${row.status==='blocked'?'该任务已遇阻，释放后将重置为待办并清空遇阻信息。':''}</p>`,onSubmit:()=>fqReminderSubmit(row.id,what)});
  };
  ms['rm-reassign']=button=>{
    const row=st.get('boardTasks',button.dataset.id);if(!row)return;
    const users=st.all('users').filter(user=>user.active&&['advisor','supervisor'].includes(user.role));
    Oe({title:'改派 / 释放',sub:row.title,submitLabel:'确认',body:`${Le('assigneeId','负责人',row.assigneeId||'','select',{full:true,options:[...(st.features?.boardV12?[['','放回公开任务板']]:[]),...users.map(user=>[user.id,user.name])]})}<p class="small muted2">${row.status==='blocked'?'该任务已遇阻：改派或释放会重置为待办，并清空遇阻信息。':'改派将更新负责人；释放后其他顾问可以认领。'}</p>`,onSubmit:values=>fqReminderSubmit(row.id,values.assigneeId?'reassign':'release',values.assigneeId?{assigneeId:values.assigneeId}:{})});
  };
  document.addEventListener('change',event=>{
    const target=event.target;
    if(target.dataset.act==='rm-filter'&&['assignee','status'].includes(target.dataset.key)){fqReminderState[target.dataset.key]=target.value;Vs();}
  });
  {
    const style=document.createElement('style');style.id='fq-reminder-styles';style.textContent=`
.rm-tabs{margin-bottom:14px}.rm-group{margin:18px 0 8px;font-size:12px;font-weight:700;color:var(--muted);display:flex;gap:8px}.rm-group .n{color:var(--muted2)}
.rm-card{display:grid;grid-template-columns:4px minmax(0,1fr) auto;gap:0 14px;background:#fff;border:1px solid var(--line);border-radius:12px;padding:12px 14px 12px 0;margin-bottom:10px;align-items:center}
.rm-bar{align-self:stretch;border-radius:0 4px 4px 0}.rm-bar.high{background:#C0392B}.rm-bar.normal{background:#D98E2B}.rm-bar.low{background:#B9B3C2}
.rm-title{font-weight:650;font-size:14px;color:var(--fg)}.rm-main{min-width:0;overflow-wrap:anywhere}.rm-note{font-size:12.5px;color:var(--muted);margin-top:3px;line-height:1.55;white-space:pre-wrap}
.rm-meta{display:flex;gap:10px;flex-wrap:wrap;margin-top:6px;font-size:12px;color:var(--muted2)}.rm-meta .due-late{color:#B3261E;font-weight:650}.rm-meta .due-today{color:#B26A00;font-weight:650}
.rm-acts{display:flex;gap:8px;align-items:center;flex-wrap:wrap;max-width:260px}.rm-card.done{opacity:.62}.rm-card.done .rm-title{text-decoration:line-through}.rm-block{margin-top:6px;font-size:12.5px;color:#8A3B12;background:#FFF4E8;border-radius:8px;padding:6px 9px;white-space:pre-wrap}
.rm-sync{font-size:11.5px;color:var(--muted2)}.rm-filter{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:14px 0}.rm-filter select{width:160px;max-width:100%}.rm-filter>span{margin-left:auto}.rm-notice{margin-top:14px}.rm-required{color:#B3261E}.rm-help{margin-top:12px}
@media(max-width:700px){.rm-card{grid-template-columns:4px minmax(0,1fr);gap:0 10px;padding-right:12px}.rm-bar{grid-row:1/3}.rm-acts{grid-column:2;margin-top:12px;max-width:none}.rm-tabs .tab{padding:12px 8px;font-size:12px}.rm-tabs{flex-wrap:wrap}.rm-filter>span{margin-left:0;width:100%}.rm-filter select{flex:1;min-width:0}.rm-acts .menu{right:0;left:auto}}
`;document.head.append(style);
  }
