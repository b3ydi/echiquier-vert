(function(){
const E=ENGINE();
const $=id=>document.getElementById(id);

/* ---------- pieces (cburnett set) ---------- */
const ST='stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"';
const PAWN='M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03C15.41 27.09 11 31.58 11 39.5h23c0-7.92-4.41-12.41-7.41-13.47C28.06 24.84 29 23.03 29 21c0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z';
const KN1='M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21';
const KN2='M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.042-.94 1.41-3.04 0-3-1 0 .19 1.23-1 2-1 0-4.003 1-4-4 0-2 6-12 6-12s1.89-1.9 2-3.5c-.73-.994-.5-2-.5-3 1-1 3 2.5 3 2.5h2s.78-1.992 2.5-3c1 0 1 3 1 3';
const BIS1='M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.354.49-2.323.47-3-.5 1.354-1.94 3-2 3-2z';
const BIS2='M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z';
const BIS3='M25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z';
const QBASE='M9 26c8.5-1.5 21-1.5 27 0l2.5-12.5L31 25l-.3-14.1-5.2 13.6-3-14.5-3 14.5-5.2-13.6L14 25 6.5 13.5 9 26z';
const QSKIRT='M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1.5 2.5-1.5 2.5-1.5 1.5.5 2.5.5 2.5 6.5 1 16.5 1 23 0 0 0 1.5-1 0-2.5 0 0 .5-1.5-1-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z';
const KBODY='M12.5 37c5.5 3.5 14.5 3.5 20 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V27v-3.5c-2.5-7.5-12-10.5-16-4-3 6 6 10.5 6 10.5v7';
const KTOP='M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5';
const SVG={
 wP:`<path d="${PAWN}" fill="#fff" ${ST}/>`,
 bP:`<path d="${PAWN}" fill="#000" ${ST}/>`,
 wN:`<g ${ST} fill="none"><path d="${KN1}" fill="#fff"/><path d="${KN2}" fill="#fff"/><path d="M9.5 25.5a.5.5 0 1 1-1 0 .5.5 0 1 1 1 0z" fill="#000"/><path d="M15 15.5a.5 1.5 0 1 1-1 0 .5 1.5 0 1 1 1 0z" transform="matrix(.866 .5 -.5 .866 9.693 -5.173)" fill="#000"/></g>`,
 bN:`<g ${ST} fill="none"><path d="${KN1}" fill="#000"/><path d="${KN2}" fill="#000"/><path d="M9.5 25.5a.5.5 0 1 1-1 0 .5.5 0 1 1 1 0z" fill="#fff" stroke="#fff"/><path d="M15 15.5a.5 1.5 0 1 1-1 0 .5 1.5 0 1 1 1 0z" transform="matrix(.866 .5 -.5 .866 9.693 -5.173)" fill="#fff" stroke="#fff"/><path d="M24.55 10.4l-.45 1.45.5.15c3.15 1 5.65 2.49 7.9 6.75S35.75 29.06 35.25 39l-.05.5h2.25l.05-.5c.5-10.06-.88-16.85-3.25-21.34-2.37-4.49-5.79-6.64-9.19-7.16l-.51-.1z" fill="#fff" stroke="none"/></g>`,
 wB:`<g ${ST} fill="none"><g fill="#fff" stroke-linecap="butt"><path d="${BIS1}"/><path d="${BIS2}"/><path d="${BIS3}"/></g><path d="M17.5 26h10M15 30h15m-7.5-14.5v5M20 18h5" stroke-linejoin="miter"/></g>`,
 bB:`<g ${ST} fill="none"><g fill="#000" stroke-linecap="butt"><path d="${BIS1}"/><path d="${BIS2}"/><path d="${BIS3}"/></g><path d="M17.5 26h10M15 30h15m-7.5-14.5v5M20 18h5" stroke="#fff" stroke-linejoin="miter"/></g>`,
 wR:`<g ${ST} fill="#fff"><path d="M9 39h27v-3H9v3zM12 36v-4h21v4H12zM11 14V9h4v2h5V9h5v2h5V9h4v5" stroke-linecap="butt"/><path d="M34 14l-3 3H14l-3-3"/><path d="M31 17v12.5H14V17" stroke-linecap="butt" stroke-linejoin="miter"/><path d="M31 29.5l1.5 2.5h-20l1.5-2.5"/><path d="M11 14h23" fill="none" stroke-linejoin="miter"/></g>`,
 bR:`<g ${ST} fill="#000"><path d="M9 39h27v-3H9v3zM12.5 32l1.5-2.5h17l1.5 2.5h-20zM12 36v-4h21v4H12z" stroke-linecap="butt"/><path d="M14 29.5v-13h17v13H14z" stroke-linecap="butt" stroke-linejoin="miter"/><path d="M14 16.5L11 14h23l-3 2.5H14zM11 14V9h4v2h5V9h5v2h5V9h4v5H11z" stroke-linecap="butt"/><path d="M12 35.5h21M13 31.5h19M14 29.5h17M14 16.5h17M11 14h23" fill="none" stroke="#fff" stroke-width="1" stroke-linejoin="miter"/></g>`,
 wQ:`<g ${ST} fill="#fff"><path d="${QBASE}"/><path d="${QSKIRT}"/><path d="M11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0" fill="none"/><circle cx="6" cy="12" r="2"/><circle cx="14" cy="9" r="2"/><circle cx="22.5" cy="8" r="2"/><circle cx="31" cy="9" r="2"/><circle cx="39" cy="12" r="2"/></g>`,
 bQ:`<g ${ST} fill="#000"><g stroke="none"><circle cx="6" cy="12" r="2.75"/><circle cx="14" cy="9" r="2.75"/><circle cx="22.5" cy="8" r="2.75"/><circle cx="31" cy="9" r="2.75"/><circle cx="39" cy="12" r="2.75"/></g><path d="${QBASE}" stroke-linecap="butt"/><path d="${QSKIRT}" stroke-linecap="butt"/><path d="M11 38.5a35 35 1 0 0 23 0" fill="none" stroke-linecap="butt"/><path d="M11 29a35 35 1 0 1 23 0M12.5 31.5h20M11.5 34.5a35 35 1 0 0 22 0M10.5 37.5a35 35 1 0 0 24 0" fill="none" stroke="#fff"/></g>`,
 wK:`<g ${ST} fill="none"><path d="M22.5 11.63V6M20 8h5" stroke-linejoin="miter"/><path d="${KTOP}" fill="#fff" stroke-linecap="butt" stroke-linejoin="miter"/><path d="${KBODY}" fill="#fff"/><path d="M12.5 30c5.5-3 14.5-3 20 0m-20 3.5c5.5-3 14.5-3 20 0m-20 3.5c5.5-3 14.5-3 20 0"/></g>`,
 bK:`<g ${ST} fill="none"><path d="M22.5 11.63V6" stroke-linejoin="miter"/><path d="${KTOP}" fill="#000" stroke-linecap="butt" stroke-linejoin="miter"/><path d="${KBODY}" fill="#000"/><path d="M20 8h5" stroke-linejoin="miter"/><path d="M32 29.5s8.5-4 6.03-9.65C34.15 14 25 18 22.5 24.5v2.1-2.1C20 18 10.85 14 6.97 19.85 4.5 25.5 13 29.5 13 29.5" stroke="#fff"/><path d="M12.5 30c5.5-3 14.5-3 20 0m-20 3.5c5.5-3 14.5-3 20 0m-20 3.5c5.5-3 14.5-3 20 0" stroke="#fff"/></g>`
};
const pieceUrl={};
(function(){
  let css='';
  for(const k in SVG){
    const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45">${SVG[k]}</svg>`;
    pieceUrl[k]=`url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
    css+=`.p-${k}{background-image:${pieceUrl[k]}}`;
    let gs=SVG[k];
    if(k[0]==='w') gs=gs.split('fill="#fff"').join('fill="#f6efdf"');
    else {
      gs=gs.split('fill="#000"').join('fill="#1b0e2c"').split('stroke="#fff"').join('stroke="#c8a2ff"').split('fill="#fff"').join('fill="#c8a2ff"');
      if(k==='bN') gs=gs.replace('fill="#c8a2ff" stroke="#c8a2ff"','fill="#ff2847" stroke="#ff2847"');
    }
    const gsvg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45">${gs}</svg>`;
    css+=`:root[data-skin="geass"] .p-${k}{background-image:url("data:image/svg+xml,${encodeURIComponent(gsvg)}")}`;
  }
  const st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);
})();
const pcode=p=>(p===p.toUpperCase()?'w':'b')+p.toUpperCase();

/* ---------- options ---------- */
const LEVELS=[
  {name:'Débutant',hint:'Apprendre',opts:{depth:1,noise:240}},
  {name:'Facile',hint:'Loisir',opts:{depth:2,noise:90}},
  {name:'Moyen',hint:'Club',opts:{depth:3,noise:25,time:1500}},
  {name:'Difficile',hint:'Solide',opts:{time:1600,noise:6}},
  {name:'Expert',hint:'Coriace',opts:{time:3800}}
];
const TCS=[
  {label:'Sans limite',base:0,inc:0},{label:'1 min',base:60,inc:0},{label:'3 min',base:180,inc:0},
  {label:'3 | 2',base:180,inc:2},{label:'5 min',base:300,inc:0},{label:'10 min',base:600,inc:0},{label:'15 | 10',base:900,inc:10}
];
const THEMES=[['green','#ebecd0','#739552','Vert'],['brown','#f0d9b5','#b58863','Bois'],['blue','#dee3e6','#8ca2ad','Glace'],['purple','#efeff5','#8877b7','Lavande'],['geass','#d9cfe6','#4b2b6f','Geass']];
const REASONS={checkmate:'par échec et mat',stalemate:'par pat',fifty:'par la règle des 50 coups',repetition:'par triple répétition',material:'par manque de matériel',time:'au temps',resign:'par abandon'};
const VALS={p:1,n:3,b:3,r:5,q:9};

let settings={mode:'ai',level:2,color:'w',tc:0,theme:'green',sound:true};
let G=null, hintMove=null, hintReq=0, sel=null, legalCache=null, hoverSq=-1, drag=null, promoOpen=false, thinking=false, aiReq=0, aiMinAt=0, lastTick=Date.now();
const marks=new Set(); let arrows=[]; let rightFrom=-1;

/* ---------- storage ---------- */
const KEY='echiquier-vert.v1';
function save(){ try{ localStorage.setItem(KEY,JSON.stringify(serialize())); }catch(e){} }
function serialize(){ return G?{settings,cfg:G.cfg,ucis:G.history.map(h=>uci(h.m)),clocks:G.clocks,over:G.over,orient:G.orient,geass:G.geass}:{settings}; }
const uci=m=>E.sqName(m.from)+E.sqName(m.to)+(m.promo?m.promo.toLowerCase():'');

/* ---------- board scaffolding ---------- */
const board=$('board'), squaresEl=$('squares'), piecesEl=$('pieces'), arrowsEl=$('arrows');
const sqEls=[];
for(let i=0;i<64;i++){
  const d=document.createElement('div');
  d.innerHTML='<span class="co rk"></span><span class="co fl"></span>';
  squaresEl.appendChild(d); sqEls.push(d);
}
let pcEls={};

function layout(){
  const W=window.innerWidth, H=window.innerHeight, wide=W>=900;
  let sz= wide ? Math.min(H-2*46-16-32, W-32-340-24-8) : Math.min(W-32, 640, Math.max(300,H-2*46-16-24));
  sz=Math.max(232,Math.floor(sz/8)*8);
  document.documentElement.style.setProperty('--sz',sz+'px');
}

/* ---------- game lifecycle ---------- */
function newGame(cfg,ucis){
  aiReq++; thinking=false;
  const human=cfg.color==='r'?(Math.random()<.5?'w':'b'):cfg.color;
  const tc=TCS[cfg.tc]||TCS[0];
  G={game:new E.Game(),history:[],fens:[E.START],view:0,cfg:{...cfg,color:human},tc,human,
     mode:cfg.mode,level:cfg.level,aiColor:cfg.mode==='ai'?(human==='w'?'b':'w'):null,
     clocks:{w:tc.base*1000,b:tc.base*1000},over:null,orient:cfg.mode==='ai'?human:'w',date:new Date(),
     story:cfg.story!=null&&STORY.chapters[cfg.story]?cfg.story:null,geass:1};
  hintMove=null; hintReq++;
  sel=null; legalCache=null; marks.clear(); arrows=[];
  if(ucis) for(const u of ucis){ const m=G.game.moves().find(x=>uci(x)===u); if(!m) break; commit(m,null,true); }
  G.view=G.history.length; lastTick=Date.now();
  closeModal(); closePromo();
  applySkin();
  renderAll();
}
function startFromSettings(){
  newGame({mode:settings.mode,level:settings.level,color:settings.color,tc:settings.tc});
  setTab('game'); save(); maybeAI();
}
function legal(){ if(!legalCache) legalCache=G.game.moves(); return legalCache; }
function isLive(){ return G.view===G.history.length; }
function humanTurn(){ return !G.over && (G.mode==='pvp' || G.game.turn===G.human); }
function canInteract(){ return isLive() && humanTurn() && !promoOpen; }

function commit(m,anim,silent){
  const mover=G.game.turn, san=G.game.san(m,legal());
  G.game.play(m);
  if(G.tc.base) G.clocks[mover]+=G.tc.inc*1000;
  G.history.push({m,san}); G.fens.push(G.game.fen());
  G.view=G.history.length; legalCache=null; sel=null; lastTick=Date.now(); hintMove=null; hintReq++;
  const st=G.game.status();
  if(silent){ if(st.over) G.over=st; return; }
  marks.clear(); arrows=[];
  if(!$('tabPlay').hidden) setTab('game');
  sound(st.over?'end':G.game.inCheck()?'check':(m.flag==='k'||m.flag==='q')?'castle':m.promo?'promote':m.captured?'capture':'move');
  renderAll(anim?m:null);
  if(st.over) endGame(st); else maybeAI();
  save();
}
function endGame(st){ G.over=st; storyResult(st); thinking=false; aiReq++; renderAll(); save(); setTimeout(showModal,350); }

function takeback(){
  if(!G.history.length||G.story!=null) return;
  aiReq++; thinking=false;
  let n=1;
  if(G.mode==='ai' && G.game.turn===G.human) n=2;
  n=Math.min(n,G.history.length);
  for(let i=0;i<n;i++){ G.game.takeback(); G.history.pop(); G.fens.pop(); }
  G.over=null; G.view=G.history.length; legalCache=null; sel=null; lastTick=Date.now();
  closeModal(); closePromo(); renderAll(); save(); maybeAI();
}
let resignArm=0;
function resign(){
  if(G.over||!G.history.length) return;
  const btn=$('btnResign');
  if(Date.now()-resignArm>3000){ resignArm=Date.now(); btn.classList.add('warn'); btn.querySelector('span').textContent='Confirmer ?'; setTimeout(()=>{btn.classList.remove('warn');btn.querySelector('span').textContent='Abandon';},3000); return; }
  resignArm=0; btn.classList.remove('warn'); btn.querySelector('span').textContent='Abandon';
  const loser=G.mode==='ai'?G.human:G.game.turn;
  sound('end'); endGame({over:true,result:loser==='w'?'0-1':'1-0',reason:'resign'});
}

/* ---------- computer ---------- */
const workerSrc=`const E=(${ENGINE.toString()})();onmessage=e=>{let r=null;try{r=E.search(e.data.fen,e.data.opts);}catch(err){}postMessage({id:e.data.id,kind:e.data.kind,r});};`;
let worker=null;
try{
  worker=new Worker(URL.createObjectURL(new Blob([workerSrc],{type:'text/javascript'})));
  worker.onmessage=e=>e.data.kind==='hint'?onHint(e.data.id,e.data.r):onAI(e.data.id,e.data.r);
  worker.onerror=()=>{ worker=null; if(thinking){ thinking=false; maybeAI(); } };
}catch(e){ worker=null; }
function maybeAI(){
  if(!G||G.mode!=='ai'||G.over||G.game.turn!==G.aiColor) return;
  const id=++aiReq, fen=G.game.fen(), opts=LEVELS[G.level].opts;
  thinking=true; aiMinAt=Date.now()+(G.history.length<2?500:350); renderStatus();
  if(worker) worker.postMessage({id,fen,opts});
  else setTimeout(()=>{ if(id===aiReq) onAI(id,E.search(fen,opts)); },60);
}
function onAI(id,r){
  if(id!==aiReq) return;
  setTimeout(()=>{
    if(id!==aiReq) return;
    thinking=false;
    if(!r){ renderStatus(); return; }
    const m=legal().find(x=>x.from===r.from&&x.to===r.to&&(x.promo||'')===(r.promo||''));
    if(!m){ renderStatus(); return; }
    G.view=G.history.length;
    commit(m,true);
  },Math.max(0,aiMinAt-Date.now()));
}

/* Geass: once per story match, the engine reveals the best move for Lelouch. */
const HINT_OPTS={time:1200};
function useGeass(){
  if(!G||G.story==null||!G.geass||!canInteract()||thinking) return;
  G.geass=0; save();
  const id=++hintReq, fen=G.game.fen();
  board.classList.remove('geass-flash'); board.getBoundingClientRect(); board.classList.add('geass-flash');
  renderNav(); toast('Geass : Lelouch lit le meilleur coup…');
  if(worker) worker.postMessage({id,kind:'hint',fen,opts:HINT_OPTS});
  else setTimeout(()=>{ if(id===hintReq) onHint(id,E.search(fen,HINT_OPTS)); },60);
}
function onHint(id,r){
  if(id!==hintReq||!r) return;
  hintMove=[r.from,r.to]; drawArrows();
}

/* ---------- clocks ---------- */
function clockRunning(){ return G&&G.tc.base&&!G.over&&G.history.length>=1; }
setInterval(()=>{
  const now=Date.now();
  if(clockRunning()){
    const t=G.game.turn; G.clocks[t]-=now-lastTick;
    if(G.clocks[t]<=0){ G.clocks[t]=0; lastTick=now; sound('end'); endGame({over:true,result:t==='w'?'0-1':'1-0',reason:'time'}); return; }
    renderClocks();
  }
  lastTick=now;
},100);
function fmt(ms){
  ms=Math.max(0,ms);
  if(ms<20000){ const s=Math.floor(ms/1000), d=Math.floor(ms%1000/100); return `0:${String(s).padStart(2,'0')}.${d}`; }
  const s=Math.ceil(ms/1000); return `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;
}

/* ---------- rendering ---------- */
function viewGame(){ return isLive()?G.game:new E.Game(G.fens[G.view]); }
function xy(sq){ let r=sq>>3,c=sq&7; if(G.orient==='b'){ r=7-r; c=7-c; } return [c,r]; }
function targetsFor(s){ return legal().filter(m=>m.from===s); }

function renderBoard(anim){
  const g=viewGame(), live=isLive();
  const last=G.view>0?G.history[G.view-1].m:null;
  const chk=g.inCheck()?g.kingSq(g.turn):-1;
  const tg=new Map(); if(live&&sel!==null) for(const m of targetsFor(sel)) tg.set(m.to,m);
  for(let i=0;i<64;i++){
    const el=sqEls[i], [x,y]=xy(i);
    let c='sq '+(((i>>3)+(i&7))%2?'d':'l');
    if(marks.has(i)) c+=' mark';
    else if((last&&(i===last.from||i===last.to))||(live&&sel===i)) c+=' hl';
    if(i===chk) c+=' chk';
    if(tg.has(i)) c+=(g.b[i]||tg.get(i).flag==='e')?' cap':' hint';
    if(drag&&drag.moved&&hoverSq===i) c+=' hover';
    el.className=c; el.style.gridColumn=x+1; el.style.gridRow=y+1;
    el.children[0].textContent=x===0?String(8-(i>>3)):'';
    el.children[1].textContent=y===7?'abcdefgh'[i&7]:'';
  }
  piecesEl.textContent=''; pcEls={};
  for(let i=0;i<64;i++){
    const p=g.b[i]; if(!p) continue;
    const d=document.createElement('div'), [x,y]=xy(i);
    d.className='pc p-'+pcode(p); d.style.transform=`translate(${x*100}%,${y*100}%)`;
    piecesEl.appendChild(d); pcEls[i]=d;
  }
  if(anim) animate(anim);
  drawArrows();
}
function slide(el,from,to){
  if(!el) return;
  const [fx,fy]=xy(from), [tx,ty]=xy(to);
  el.style.transform=`translate(${fx*100}%,${fy*100}%)`;
  el.getBoundingClientRect();
  el.classList.add('anim');
  el.style.transform=`translate(${tx*100}%,${ty*100}%)`;
  el.addEventListener('transitionend',()=>el.classList.remove('anim'),{once:true});
}
function animate(m){
  slide(pcEls[m.to],m.from,m.to);
  const o=m.from&~7;
  if(m.flag==='k') slide(pcEls[o+5],o+7,o+5);
  if(m.flag==='q') slide(pcEls[o+3],o,o+3);
}
function drawArrows(){
  let s='<defs><marker id="ah" viewBox="0 0 10 10" refX="3" refY="5" markerWidth="2.6" markerHeight="2.6" orient="auto"><path d="M0 0L10 5L0 10z" fill="rgba(255,170,0,.85)"/></marker></defs>';
  const list=arrows.map(a=>[...a,'rgba(255,170,0,.85)','ah']);
  if(hintMove&&isLive()){ list.push([...hintMove,'rgba(226,24,64,.9)','ahg']); s+='<defs><marker id="ahg" viewBox="0 0 10 10" refX="3" refY="5" markerWidth="2.6" markerHeight="2.6" orient="auto"><path d="M0 0L10 5L0 10z" fill="rgba(226,24,64,.9)"/></marker></defs>'; }
  for(const [a,b,col,mk] of list){
    const [ax,ay]=xy(a),[bx,by]=xy(b);
    const x1=ax+.5,y1=ay+.5,x2=bx+.5,y2=by+.5, len=Math.hypot(x2-x1,y2-y1);
    const ex=x2-(x2-x1)/len*.38, ey=y2-(y2-y1)/len*.38;
    const sx=x1+(x2-x1)/len*.2, sy=y1+(y2-y1)/len*.2;
    s+=`<line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" stroke="${col}" stroke-width=".17" marker-end="url(#${mk})"/>`;
  }
  arrowsEl.innerHTML=s;
}

function playerBar(color){
  const g=viewGame();
  const count={w:{p:0,n:0,b:0,r:0,q:0},b:{p:0,n:0,b:0,r:0,q:0}};
  let mat=0;
  for(const p of g.b){ if(!p) continue; const t=p.toLowerCase(); if(t==='k') continue; const c=p===t?'b':'w'; count[c][t]++; mat+=(c==='w'?1:-1)*VALS[t]; }
  const start={p:8,n:2,b:2,r:2,q:1}, opp=color==='w'?'b':'w';
  let caps='';
  for(const t of ['p','n','b','r','q']){
    const n=Math.max(0,start[t]-count[opp][t]);
    for(let i=0;i<n;i++) caps+=`<i class="p-${opp}${t.toUpperCase()}${i===n-1?' gap':''}"></i>`;
  }
  const adv=color==='w'?mat:-mat;
  if(adv>0) caps+=`<b>+${adv}</b>`;
  let name, tag='';
  const ch=storyChapter();
  if(ch){ if(color===G.human){ name='Lelouch'; } else { name=ch.name; tag=ch.title; } }
  else if(G.mode==='ai'){ if(color===G.human){ name='Vous'; } else { name='Ordinateur'; tag=LEVELS[G.level].name; } }
  else name=color==='w'?'Blancs':'Noirs';
  const on=!G.over&&G.game.turn===color&&G.history.length>=1;
  const clock=G.tc.base?`<div class="clock ${color}${on?' on':''}${G.clocks[color]<20000?' low':''}" data-c="${color}">${fmt(G.clocks[color])}</div>`:'';
  const av=ch?(color===G.human?'K':ch.piece):(G.mode==='ai'&&color!==G.human?'Q':'K');
  return `<div class="avatar p-${color+av}"></div>
    <div class="pinfo"><div class="pname">${name}${tag?`<small>${tag}</small>`:''}</div><div class="caps">${caps}</div></div>${clock}`;
}
function renderPlayers(){
  const top=G.orient==='w'?'b':'w', bot=G.orient;
  $('pTop').innerHTML=playerBar(top); $('pBot').innerHTML=playerBar(bot);
}
function renderClocks(){
  for(const el of document.querySelectorAll('.clock')){
    const c=el.dataset.c; el.textContent=fmt(G.clocks[c]);
    el.classList.toggle('on',!G.over&&G.game.turn===c&&G.history.length>=1);
    el.classList.toggle('low',G.clocks[c]<20000);
  }
}
function resultTitle(st){
  if(st.result==='1/2-1/2') return 'Partie nulle';
  const win=st.result==='1-0'?'w':'b';
  if(storyChapter()) return win===G.human?'Victoire !':storyChapter().name+' gagne';
  if(G.mode==='ai') return win===G.human?'Vous avez gagné !':"L'ordinateur gagne";
  return win==='w'?'Les Blancs gagnent':'Les Noirs gagnent';
}
function renderStatus(){
  const el=$('status'); const t=G.game.turn;
  let dot=t==='w'?'#fff':'#1a1a1a', txt;
  if(G.over){ txt=resultTitle(G.over)+' '+REASONS[G.over.reason]; dot='#81b64c'; }
  else if(G.mode==='ai') txt=t===G.human?(G.game.inCheck()?'Échec ! À vous de jouer':'À vous de jouer'):(storyChapter()?storyChapter().name:"L'ordinateur")+' réfléchit';
  else txt=(t==='w'?'Aux Blancs':'Aux Noirs')+(G.game.inCheck()?' · échec !':' de jouer');
  el.innerHTML=`<span class="dot" style="background:${dot}"></span><span>${txt}</span>${thinking?'<span class="think"><i></i><i></i><i></i></span>':''}`;
}
function renderMoves(){
  const el=$('moves'), h=G.history;
  if(!h.length){ el.innerHTML='<div class="empty">Aucun coup pour l\'instant. Glissez une pièce ou cliquez-la, puis cliquez la case d\'arrivée. Clic droit pour annoter : une case ou une flèche.</div>'; return; }
  let s='';
  for(let i=0;i<h.length;i+=2){
    s+=`<div class="row"><span class="n">${i/2+1}.</span><button class="mv${G.view===i+1?' cur':''}" data-v="${i+1}">${h[i].san}</button>${h[i+1]?`<button class="mv${G.view===i+2?' cur':''}" data-v="${i+2}">${h[i+1].san}</button>`:'<span></span>'}</div>`;
  }
  if(G.over) s+=`<div class="res">${G.over.result.replace('1/2','½').replace('1/2','½')}</div>`;
  el.innerHTML=s;
  const cur=el.querySelector('.cur');
  if(isLive()) el.scrollTop=el.scrollHeight; else if(cur) cur.scrollIntoView({block:'nearest'});
}
function renderNav(){
  $('navFirst').disabled=$('navPrev').disabled=G.view===0;
  $('navNext').disabled=$('navLast').disabled=isLive();
  $('btnUndo').disabled=!G.history.length||G.story!=null;
  $('geassRow').hidden=G.story==null;
  $('btnGeass').disabled=!G.geass||!!G.over;
  $('btnGeass').querySelector('span').textContent=G.geass?'Geass (1)':'Geass utilisé';
  $('btnResign').disabled=!!G.over||!G.history.length;
}
function renderAll(anim){ renderBoard(anim); renderPlayers(); renderStatus(); renderMoves(); renderNav(); }

function setView(v){
  v=Math.max(0,Math.min(G.history.length,v));
  if(v===G.view) return;
  const fwd=v===G.view+1; G.view=v; sel=null; closePromo();
  const m=fwd?G.history[v-1].m:null;
  if(m) sound(m.captured?'capture':'move');
  renderAll(m);
}

/* ---------- modal & promotion ---------- */
function showModal(){
  if(!G.over) return;
  closeModal();
  if(G.story!=null) return showStoryEnd();
  const st=G.over, win=st.result==='1-0'?'w':st.result==='0-1'?'b':null;
  const cls=!win?'draw':(G.mode==='ai'&&win!==G.human)?'lose':'';
  const d=document.createElement('div'); d.className='modal'; d.id='modal';
  d.innerHTML=`<div class="card" role="dialog" aria-label="Fin de partie"><header class="${cls}"><h2>${resultTitle(st)}</h2><p>${REASONS[st.reason]}</p></header>
    <div class="acts"><button class="btn-play" id="mAgain">Rejouer</button><button class="btn-sec" id="mClose">Revoir la partie</button></div></div>`;
  board.appendChild(d);
  $('mAgain').onclick=()=>{ newGame({...G.cfg,color:G.cfg.mode==='ai'&&settings.color==='r'?'r':G.cfg.color}); save(); maybeAI(); };
  $('mClose').onclick=closeModal;
  d.addEventListener('pointerdown',e=>{ if(e.target===d) closeModal(); e.stopPropagation(); });
  $('mAgain').focus();
}
function closeModal(){ const m=$('modal'); if(m) m.remove(); }
function closePromo(){ const p=$('promo'); if(p) p.remove(); promoOpen=false; }
function askPromo(from,to,options){
  promoOpen=true;
  const color=G.game.turn, [x,y]=xy(to), down=y===0;
  const d=document.createElement('div'); d.className='promo'; d.id='promo';
  const col=document.createElement('div'); col.className='promo-col';
  col.style.left=(x*12.5)+'%'; if(down) col.style.top='0'; else col.style.bottom='0';
  const order=['Q','N','R','B'];
  const btns=order.map(t=>`<button data-t="${t}" aria-label="${{Q:'Dame',N:'Cavalier',R:'Tour',B:'Fou'}[t]}"><i class="pp p-${color}${t}"></i></button>`);
  const x_='<button class="x" data-t="x" aria-label="Annuler">×</button>';
  col.innerHTML=down?btns.join('')+x_:x_+btns.reverse().join('');
  d.appendChild(col); board.appendChild(d);
  d.addEventListener('pointerdown',e=>{
    e.stopPropagation();
    const bt=e.target.closest&&e.target.closest('[data-t]'), t=bt&&bt.dataset.t;
    closePromo();
    if(!t||t==='x'){ sel=null; renderBoard(); return; }
    const m=options.find(o=>o.promo.toUpperCase()===t);
    if(m) commit(m,false);
  });
}
function tryMove(from,to,anim){
  const opts=legal().filter(m=>m.from===from&&m.to===to);
  if(!opts.length) return false;
  if(opts.length>1){ // promotion
    if(drag&&pcEls[from]){ const [x,y]=xy(to); pcEls[from].style.transform=`translate(${x*100}%,${y*100}%)`; }
    askPromo(from,to,opts); return true;
  }
  commit(opts[0],anim); return true;
}

/* ---------- input ---------- */
function sqAt(e){
  const r=board.getBoundingClientRect();
  let c=Math.floor((e.clientX-r.left)/r.width*8), y=Math.floor((e.clientY-r.top)/r.height*8);
  if(c<0||c>7||y<0||y>7) return -1;
  if(G.orient==='b'){ c=7-c; y=7-y; }
  return y*8+c;
}
board.addEventListener('contextmenu',e=>e.preventDefault());
board.addEventListener('pointerdown',e=>{
  ensureAudio();
  if(promoOpen||$('modal')) return;
  const s=sqAt(e); if(s<0) return;
  if(e.button===2){ rightFrom=s; return; }
  if(e.button!==0) return;
  if(marks.size||arrows.length){ marks.clear(); arrows=[]; }
  if(!isLive()){ setView(G.history.length); return; }
  if(!canInteract()){ renderBoard(); return; }
  const p=G.game.b[s];
  if(sel!==null&&sel!==s&&legal().some(m=>m.from===sel&&m.to===s)){ tryMove(sel,s,true); return; }
  if(p&&E.colorOf(p)===G.game.turn){
    const was=sel===s; sel=s;
    const r=board.getBoundingClientRect();
    drag={from:s,was,moved:false,x0:e.clientX,y0:e.clientY,r,id:e.pointerId};
    board.setPointerCapture(e.pointerId);
    renderBoard();
    if(pcEls[s]) pcEls[s].classList.add('drag');
  } else { sel=null; renderBoard(); }
});
board.addEventListener('pointermove',e=>{
  if(!drag||e.pointerId!==drag.id) return;
  if(!drag.moved&&Math.hypot(e.clientX-drag.x0,e.clientY-drag.y0)<4) return;
  drag.moved=true;
  const el=pcEls[drag.from]; if(!el) return;
  const r=drag.r, sq=r.width/8;
  el.style.transform=`translate(${e.clientX-r.left-sq/2}px,${e.clientY-r.top-sq/2}px)`;
  const h=sqAt(e);
  if(h!==hoverSq){
    if(hoverSq>=0) sqEls[hoverSq].classList.remove('hover');
    hoverSq=h; if(h>=0) sqEls[h].classList.add('hover');
  }
});
function endDrag(e){
  if(!drag||e.pointerId!==drag.id) return;
  const d=drag; const to=sqAt(e);
  if(hoverSq>=0) sqEls[hoverSq].classList.remove('hover'); hoverSq=-1;
  if(d.moved){
    if(to>=0&&to!==d.from&&tryMove(d.from,to,false)){ drag=null; return; }
    drag=null; renderBoard(); return;
  }
  drag=null;
  if(d.was&&to===d.from) sel=null;
  renderBoard();
}
board.addEventListener('pointerup',e=>{
  if(e.button===2&&rightFrom>=0){
    const s=sqAt(e);
    if(s>=0){
      if(s===rightFrom){ marks.has(s)?marks.delete(s):marks.add(s); }
      else { const i=arrows.findIndex(([a,b])=>a===rightFrom&&b===s); if(i>=0) arrows.splice(i,1); else arrows.push([rightFrom,s]); }
      renderBoard();
    }
    rightFrom=-1; return;
  }
  endDrag(e);
});
board.addEventListener('pointercancel',e=>{ if(drag&&e.pointerId===drag.id){ drag=null; hoverSq=-1; renderBoard(); } });

document.addEventListener('keydown',e=>{
  if(!G||$('vn')||e.target.closest('input,textarea,select')) return;
  if(e.key==='ArrowLeft'){ setView(G.view-1); e.preventDefault(); }
  else if(e.key==='ArrowRight'){ setView(G.view+1); e.preventDefault(); }
  else if(e.key==='ArrowUp'||e.key==='Home'){ setView(0); e.preventDefault(); }
  else if(e.key==='ArrowDown'||e.key==='End'){ setView(G.history.length); e.preventDefault(); }
  else if(e.key==='f'&&!e.metaKey&&!e.ctrlKey){ flip(); }
});

$('moves').addEventListener('click',e=>{ const b=e.target.closest('.mv'); if(b) setView(+b.dataset.v); });
$('navFirst').onclick=()=>setView(0);
$('navPrev').onclick=()=>setView(G.view-1);
$('navNext').onclick=()=>setView(G.view+1);
$('navLast').onclick=()=>setView(G.history.length);
function flip(){ G.orient=G.orient==='w'?'b':'w'; renderBoard(); renderPlayers(); save(); }
$('btnFlip').onclick=flip;
$('btnUndo').onclick=takeback;
$('btnResign').onclick=resign;
$('btnGeass').onclick=useGeass;
$('btnNew').onclick=()=>setTab('play');
$('btnPgn').onclick=async()=>{
  const pgn=toPgn();
  try{ await navigator.clipboard.writeText(pgn); toast('Partie copiée au format PGN'); }
  catch(e){ toast('Copie refusée par le navigateur'); }
};
function toPgn(){
  const d=G.date, ds=`${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`;
  const ch=storyChapter();
  const nm=c=>ch?(c===G.human?'Lelouch':ch.name+' ('+ch.title+')'):G.mode==='ai'?(c===G.human?'Vous':'Ordinateur ('+LEVELS[G.level].name+')'):(c==='w'?'Blancs':'Noirs');
  const res=G.over?G.over.result:'*';
  let mv=''; G.history.forEach((h,i)=>{ if(i%2===0) mv+=(i/2+1)+'. '; mv+=h.san+' '; });
  return `[Event "${ch?STORY.title+' · chapitre '+(G.story+1):'Partie amicale'}"]\n[Date "${ds}"]\n[White "${nm('w')}"]\n[Black "${nm('b')}"]\n[Result "${res}"]\n\n${mv}${res}\n`;
}
let toastT=0;
function toast(msg){
  let t=document.querySelector('.toast'); if(!t){ t=document.createElement('div'); t.className='toast'; t.setAttribute('role','status'); document.body.appendChild(t); }
  t.textContent=msg; t.hidden=false; clearTimeout(toastT); toastT=setTimeout(()=>{t.hidden=true;},1800);
}

function applySkin(){
  const theme=G&&G.story!=null?'geass':settings.theme;
  board.dataset.themeB=theme;
  if(theme==='geass') document.documentElement.dataset.skin='geass';
  else document.documentElement.removeAttribute('data-skin');
}

/* ---------- tabs & setup ---------- */
function setTab(t){
  for(const k of ['Play','Story','Game']){ $('tab'+k).hidden=t!==k.toLowerCase(); $('tab'+k+'Btn').setAttribute('aria-selected',t===k.toLowerCase()); }
  if(t==='story') renderStory();
}
$('tabPlayBtn').onclick=()=>setTab('play');
$('tabGameBtn').onclick=()=>setTab('game');
$('tabStoryBtn').onclick=()=>setTab('story');

$('optLevel').innerHTML=LEVELS.map((l,i)=>`<button class="opt" data-v="${i}"><span>${l.name}</span><span class="dots">${[0,1,2,3,4].map(k=>`<i class="${k<=i?'on':''}"></i>`).join('')}</span></button>`).join('');
$('optTc').innerHTML=TCS.map((t,i)=>`<button class="opt" data-v="${i}">${t.label}</button>`).join('');
$('optTheme').innerHTML=THEMES.map(([k,l,d,n])=>`<button class="swatch" data-v="${k}" title="${n}" aria-label="${n}"><i style="background:${l}"></i><i style="background:${d}"></i><i style="background:${d}"></i><i style="background:${l}"></i></button>`).join('');
function renderSetup(){
  const mark=(id,v)=>{ for(const b of $(id).querySelectorAll('[data-v]')) b.setAttribute('aria-pressed',String(b.dataset.v===String(v))); };
  mark('optMode',settings.mode); mark('optLevel',settings.level); mark('optColor',settings.color); mark('optTc',settings.tc); mark('optTheme',settings.theme);
  $('fLevel').hidden=$('fColor').hidden=settings.mode!=='ai';
  $('btnSound').innerHTML=settings.sound
    ?'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11"/></svg>Son activé'
    :'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M16 9.5l5 5M21 9.5l-5 5"/></svg>Son coupé';
}
function bindOpt(id,key,num){
  $(id).addEventListener('click',e=>{
    const b=e.target.closest('[data-v]'); if(!b) return;
    settings[key]=num?+b.dataset.v:b.dataset.v; renderSetup();
    if(key==='theme'){ applySkin(); }
    save();
  });
}
bindOpt('optMode','mode'); bindOpt('optLevel','level',true); bindOpt('optColor','color'); bindOpt('optTc','tc',true); bindOpt('optTheme','theme');
$('btnStart').onclick=()=>{ ensureAudio(); startFromSettings(); };
$('btnSound').onclick=()=>{ settings.sound=!settings.sound; renderSetup(); save(); if(settings.sound){ ensureAudio(); sound('move'); } };

/* ---------- story mode ---------- */
const STORY_KEY='echiquier-vert.story';
let progress={cleared:0,seen:false};
try{ progress={...progress,...JSON.parse(localStorage.getItem(STORY_KEY)||'{}')}; }catch(e){}
function saveProgress(){ try{ localStorage.setItem(STORY_KEY,JSON.stringify(progress)); }catch(e){} }
function storyChapter(){ return G&&G.story!=null?STORY.chapters[G.story]:null; }
const esc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function humanWon(st){ return st.result===(G.human==='w'?'1-0':'0-1'); }
function storyResult(st){
  if(G.story==null||!humanWon(st)) return;
  if(G.story+1>progress.cleared){ progress.cleared=G.story+1; saveProgress(); }
}

let vnClose=null;
function dialogue(lines,caption,done){
  if(vnClose) vnClose(true);
  let i=0, typing=null;
  const d=document.createElement('div'); d.className='vn'; d.id='vn';
  d.setAttribute('role','dialog'); d.setAttribute('aria-modal','true'); d.setAttribute('aria-label','Dialogue');
  d.innerHTML=`<div class="vn-box" tabindex="-1">${caption?`<div class="vn-cap">${esc(caption)}</div>`:''}<div class="vn-who"></div><p class="vn-text" aria-live="polite"></p><div class="vn-foot"><span class="vn-count"></span><button type="button" class="vn-skip">Passer</button><button type="button" class="vn-next"></button></div></div>`;
  document.body.appendChild(d);
  const who=d.querySelector('.vn-who'), txt=d.querySelector('.vn-text'), nextBtn=d.querySelector('.vn-next');
  const reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  function show(){
    const l=lines[i];
    who.textContent=l.who; who.hidden=!l.who; d.classList.toggle('narr',!l.who);
    d.querySelector('.vn-count').textContent=`${i+1} / ${lines.length}`;
    nextBtn.textContent=i===lines.length-1?'Continuer ▸':'Suivant ▸';
    clearInterval(typing); typing=null;
    if(reduce){ txt.textContent=l.text; return; }
    let n=0; txt.textContent='';
    typing=setInterval(()=>{ n+=2; txt.textContent=l.text.slice(0,n); if(n>=l.text.length){ clearInterval(typing); typing=null; } },16);
  }
  function next(){
    if(typing){ clearInterval(typing); typing=null; txt.textContent=lines[i].text; return; }
    if(++i>=lines.length) finish(); else show();
  }
  function finish(silent){
    clearInterval(typing); d.remove(); document.removeEventListener('keydown',key,true); vnClose=null;
    if(!silent&&done) done();
  }
  function key(e){
    if(e.target.closest&&e.target.closest('.vn-skip')) return;
    if(e.key==='Enter'||e.key===' '||e.key==='ArrowRight'){ e.preventDefault(); e.stopPropagation(); next(); }
    else if(e.key==='Escape'){ e.preventDefault(); e.stopPropagation(); finish(); }
  }
  d.addEventListener('click',e=>{ if(e.target.closest('.vn-skip')) finish(); else next(); });
  document.addEventListener('keydown',key,true);
  vnClose=finish;
  show(); d.querySelector('.vn-box').focus();
}

function startStory(i,retry){
  const ch=STORY.chapters[i]; if(!ch||i>progress.cleared) return;
  ensureAudio();
  newGame({mode:'ai',level:ch.level,color:ch.color,tc:ch.tc,story:i});
  setTab('game'); save();
  if(retry) return maybeAI();
  const intro=()=>dialogue(ch.intro,`Chapitre ${i+1} · ${ch.place}`,()=>{ if(G&&G.story===i) maybeAI(); });
  if(progress.seen) return intro();
  progress.seen=true; saveProgress();
  dialogue(STORY.prologue,STORY.title,intro);
}
function showStoryEnd(){
  const st=G.over, i=G.story, ch=STORY.chapters[i], won=humanWon(st), last=i===STORY.chapters.length-1;
  const lines=won?ch.win:st.result==='1/2-1/2'?[{who:ch.short,text:"Une nulle ? Le Cercle ne libère que les vainqueurs. Recommence."}]:ch.lose;
  dialogue(lines,'',()=>{
    if(won&&last) dialogue(STORY.epilogue,'Épilogue',()=>storyCard(true,true));
    else storyCard(won,false);
  });
}
function storyCard(won,final){
  if(!G||!G.over) return;
  closeModal();
  const st=G.over, i=G.story, ch=STORY.chapters[i];
  let h,p,a;
  if(final){ h='Liberté retrouvée'; p='Le Cercle du Roi Noir est tombé.'; a='Chapitres'; }
  else if(won){ h=`Chapitre ${i+1} remporté`; p=`${ch.name}, ${ch.title}, s'incline.`; a='Chapitre suivant'; }
  else { h=resultTitle(st); p=st.result==='1/2-1/2'?"Le Cercle n'accepte que la victoire.":REASONS[st.reason]; a='Réessayer'; }
  const d=document.createElement('div'); d.className='modal'; d.id='modal';
  d.innerHTML=`<div class="card" role="dialog" aria-label="Fin du chapitre"><header class="${won?'':'lose'}"><h2>${esc(h)}</h2><p>${esc(p)}</p></header>
    <div class="acts"><button class="btn-play" id="mAgain">${a}</button><button class="btn-sec" id="mClose">Revoir la partie</button></div></div>`;
  board.appendChild(d);
  $('mAgain').onclick=()=>{ closeModal(); if(final) setTab('story'); else if(won) startStory(i+1); else startStory(i,true); };
  $('mClose').onclick=closeModal;
  d.addEventListener('pointerdown',e=>{ if(e.target===d) closeModal(); e.stopPropagation(); });
  $('mAgain').focus();
}
function renderStory(){
  const n=STORY.chapters.length, done=progress.cleared>=n;
  let s=`<div class="story-head"><h3>${esc(STORY.title)}</h3><p>Piégé dans un cercle de jeu clandestin, Lelouch doit battre ses six maîtres pour regagner sa liberté et retrouver sa vie de lycéen.</p>
    <div class="story-prog"><i style="width:${Math.round(Math.min(progress.cleared,n)/n*100)}%"></i></div><small>${Math.min(progress.cleared,n)} / ${n} adversaires vaincus</small></div><ol class="chaps">`;
  STORY.chapters.forEach((ch,i)=>{
    const beaten=i<progress.cleared, open=i<=progress.cleared, cur=G&&G.story===i&&!G.over;
    s+=`<li><button class="chap${beaten?' beaten':''}${cur?' cur':''}" data-i="${i}" ${open?'':'disabled'}>
      <i class="pi p-${ch.color==='w'?'b':'w'}${ch.piece}"></i>
      <span class="ci"><b>${open?esc(ch.name):'???'}</b><small>Chapitre ${i+1} · ${open?esc(ch.title)+' · '+LEVELS[ch.level].name:'verrouillé'}</small></span>
      <span class="badge">${beaten?'✓':cur?'En cours':open?'Jouer':'🔒'}</span></button></li>`;
  });
  s+=`</ol><div class="story-acts"><button class="btn-sec" id="stPrologue">Revoir le prologue</button>${done?'<button class="btn-sec" id="stEpilogue">Revoir l\'épilogue</button>':''}</div>`;
  $('story').innerHTML=s;
}
$('story').addEventListener('click',e=>{
  const b=e.target.closest('.chap');
  if(b&&!b.disabled){ const i=+b.dataset.i; if(G&&G.story===i&&!G.over) setTab('game'); else startStory(i); return; }
  if(e.target.closest('#stPrologue')) dialogue(STORY.prologue,STORY.title,()=>{ progress.seen=true; saveProgress(); });
  if(e.target.closest('#stEpilogue')) dialogue(STORY.epilogue,'Épilogue');
});

/* ---------- sound (synthesized wood clicks) ---------- */
let ac=null;
function ensureAudio(){ if(!ac){ try{ ac=new (window.AudioContext||window.webkitAudioContext)(); }catch(e){ ac=null; } } if(ac&&ac.state==='suspended') ac.resume().catch(()=>{}); }
function knock(t,freq,gain,dur){
  const n=Math.floor(ac.sampleRate*dur), buf=ac.createBuffer(1,n,ac.sampleRate), d=buf.getChannelData(0);
  for(let i=0;i<n;i++) d[i]=(Math.random()*2-1)*Math.pow(1-i/n,5);
  const src=ac.createBufferSource(); src.buffer=buf;
  const f=ac.createBiquadFilter(); f.type='bandpass'; f.frequency.value=freq; f.Q.value=1.4;
  const g=ac.createGain(); g.gain.value=gain;
  src.connect(f); f.connect(g); g.connect(ac.destination); src.start(t);
  const o=ac.createOscillator(), og=ac.createGain();
  o.type='sine'; o.frequency.setValueAtTime(freq/5,t); o.frequency.exponentialRampToValueAtTime(freq/10,t+dur*1.5);
  og.gain.setValueAtTime(gain*.5,t); og.gain.exponentialRampToValueAtTime(.001,t+dur*1.5);
  o.connect(og); og.connect(ac.destination); o.start(t); o.stop(t+dur*1.6);
}
function tone(t,freq,dur,gain){
  const o=ac.createOscillator(), g=ac.createGain(); o.type='triangle'; o.frequency.value=freq;
  g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(gain,t+.01); g.gain.exponentialRampToValueAtTime(.001,t+dur);
  o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t+dur+.02);
}
function sound(kind){
  if(!settings.sound||!ac||ac.state!=='running') return;
  const t=ac.currentTime+.005;
  if(kind==='move') knock(t,1500,1.1,.07);
  else if(kind==='capture'){ knock(t,1100,1.4,.09); knock(t+.035,2300,.7,.05); }
  else if(kind==='castle'){ knock(t,1500,1,.06); knock(t+.11,1300,1,.06); }
  else if(kind==='promote'){ knock(t,1500,1,.06); tone(t+.05,880,.18,.12); tone(t+.12,1320,.22,.1); }
  else if(kind==='check'){ knock(t,1500,1,.06); tone(t+.02,740,.16,.14); tone(t+.1,988,.2,.12); }
  else if(kind==='end'){ knock(t,1300,1,.07); tone(t+.08,523,.4,.12); tone(t+.2,659,.4,.11); tone(t+.32,784,.6,.12); }
}

/* ---------- Spotify player ---------- */
const MUSIC_KEY='echiquier-vert.music';
const DEFAULT_MUSIC='https://open.spotify.com/playlist/4XbBB2XdXXgtuMsgV8muR9';
function spotifyEmbed(url){
  const m=String(url||'').trim().match(/open\.spotify\.com\/(?:intl-[a-z]+\/)?(?:embed\/)?(playlist|album|track|artist|episode|show)\/([A-Za-z0-9]{10,})/);
  return m?`https://open.spotify.com/embed/${m[1]}/${m[2]}?utm_source=generator&theme=0`:null;
}
let music={url:DEFAULT_MUSIC,hidden:false};
try{ music={...music,...JSON.parse(localStorage.getItem(MUSIC_KEY)||'{}')}; }catch(e){}
function saveMusic(){ try{ localStorage.setItem(MUSIC_KEY,JSON.stringify(music)); }catch(e){} }
function renderMusic(){
  const f=$('musicFrame'), src=spotifyEmbed(music.url)||spotifyEmbed(DEFAULT_MUSIC);
  if(!music.hidden&&f.getAttribute('src')!==src) f.setAttribute('src',src);
  f.hidden=music.hidden;
  $('musicToggle').textContent=music.hidden?'Afficher':'Masquer';
}
$('musicToggle').onclick=()=>{ music.hidden=!music.hidden; saveMusic(); renderMusic(); };
$('musicEdit').onclick=()=>{ const f=$('musicForm'); f.hidden=!f.hidden; if(!f.hidden){ $('musicUrl').value=music.url; $('musicUrl').select(); } $('musicErr').hidden=true; };
$('musicForm').addEventListener('submit',e=>{
  e.preventDefault();
  const u=$('musicUrl').value;
  if(!spotifyEmbed(u)){ $('musicErr').hidden=false; return; }
  music.url=u.trim(); music.hidden=false; saveMusic();
  $('musicForm').hidden=true; $('musicErr').hidden=true; renderMusic();
});
renderMusic();

/* ---------- boot ---------- */
window.addEventListener('resize',()=>{ layout(); });
layout();
function start(data){
  let saved=data&&data.cfg?data:null;
  if(!saved){ try{ saved=JSON.parse(localStorage.getItem(KEY)||'null'); }catch(e){ saved=null; } }
  if(saved&&saved.settings) settings={...settings,...saved.settings};
  renderSetup();
  if(saved&&saved.cfg){
    newGame(saved.cfg,saved.ucis||[]);
    if(saved.clocks) G.clocks=saved.clocks;
    if(saved.over&&!G.over) G.over=saved.over;
    if(saved.orient) G.orient=saved.orient;
    if(saved.geass!==undefined) G.geass=saved.geass;
    renderAll();
    setTab(G.history.length&&!G.over?'game':'play');
    maybeAI();
  } else {
    newGame({mode:settings.mode,level:settings.level,color:settings.color==='r'?'w':settings.color,tc:settings.tc});
    setTab('play');
  }
}
start();
})();
