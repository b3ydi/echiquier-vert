function ENGINE(){
  const KN=[[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]];
  const KG=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
  const BD=[[-1,-1],[-1,1],[1,-1],[1,1]], RD=[[-1,0],[1,0],[0,-1],[0,1]];
  const FILES='abcdefgh';
  const START='rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  const colorOf=p=>p?(p===p.toUpperCase()?'w':'b'):null;
  const sqName=s=>FILES[s&7]+(8-(s>>3));
  const sqIdx=n=>(8-(+n[1]))*8+FILES.indexOf(n[0]);

  class Game{
    constructor(fen){this.load(fen||START)}
    load(fen){
      const [pos,turn,cas,ep,half,full]=fen.trim().split(/\s+/);
      this.b=new Array(64).fill('');
      let s=0;
      for(const ch of pos){ if(ch==='/')continue; if(ch>='1'&&ch<='8') s+=+ch; else this.b[s++]=ch; }
      this.turn=turn||'w';
      this.cas={K:false,Q:false,k:false,q:false};
      if(cas&&cas!=='-') for(const c of cas) this.cas[c]=true;
      this.ep=ep&&ep!=='-'?sqIdx(ep):-1;
      this.half=+half||0; this.full=+full||1;
      this.stack=[]; this.keys=[this.key()];
    }
    fen(){
      let out='';
      for(let r=0;r<8;r++){
        let e=0;
        for(let c=0;c<8;c++){ const p=this.b[r*8+c]; if(!p){e++;continue;} if(e){out+=e;e=0;} out+=p; }
        if(e) out+=e; if(r<7) out+='/';
      }
      const cas=(this.cas.K?'K':'')+(this.cas.Q?'Q':'')+(this.cas.k?'k':'')+(this.cas.q?'q':'')||'-';
      return `${out} ${this.turn} ${cas} ${this.ep>=0?sqName(this.ep):'-'} ${this.half} ${this.full}`;
    }
    key(){
      let ep='-';
      if(this.ep>=0){
        // the en passant square only matters if a pawn can actually take
        const r=this.ep>>3, c=this.ep&7, pr=this.turn==='w'?r+1:r-1, pp=this.turn==='w'?'P':'p';
        if((c>0&&this.b[pr*8+c-1]===pp)||(c<7&&this.b[pr*8+c+1]===pp)) ep=this.ep;
      }
      return this.b.map(p=>p||'.').join('')+this.turn+(this.cas.K?1:0)+(this.cas.Q?1:0)+(this.cas.k?1:0)+(this.cas.q?1:0)+ep;
    }
    kingSq(color){ return this.b.indexOf(color==='w'?'K':'k'); }
    attacked(sq,by){
      const b=this.b, r=sq>>3, c=sq&7, w=by==='w';
      const pr=w?r+1:r-1, pp=w?'P':'p';
      if(pr>=0&&pr<8){ if(c>0&&b[pr*8+c-1]===pp) return true; if(c<7&&b[pr*8+c+1]===pp) return true; }
      const n=w?'N':'n', k=w?'K':'k', bb=w?'B':'b', rr=w?'R':'r', q=w?'Q':'q';
      for(const [dr,dc] of KN){ const R=r+dr,C=c+dc; if(R>=0&&R<8&&C>=0&&C<8&&b[R*8+C]===n) return true; }
      for(const [dr,dc] of KG){ const R=r+dr,C=c+dc; if(R>=0&&R<8&&C>=0&&C<8&&b[R*8+C]===k) return true; }
      for(const [dr,dc] of BD){ let R=r+dr,C=c+dc; while(R>=0&&R<8&&C>=0&&C<8){ const p=b[R*8+C]; if(p){ if(p===bb||p===q) return true; break; } R+=dr;C+=dc; } }
      for(const [dr,dc] of RD){ let R=r+dr,C=c+dc; while(R>=0&&R<8&&C>=0&&C<8){ const p=b[R*8+C]; if(p){ if(p===rr||p===q) return true; break; } R+=dr;C+=dc; } }
      return false;
    }
    inCheck(color){ color=color||this.turn; return this.attacked(this.kingSq(color), color==='w'?'b':'w'); }
    pseudo(){
      const b=this.b, us=this.turn, them=us==='w'?'b':'w', out=[];
      const add=(f,t,flag,promo)=>{
        const cap= flag==='e' ? (us==='w'?'p':'P') : b[t];
        out.push({from:f,to:t,piece:b[f],captured:cap||'',flag:flag||(cap?'c':'n'),promo:promo||''});
      };
      for(let s=0;s<64;s++){
        const p=b[s]; if(!p||colorOf(p)!==us) continue;
        const r=s>>3, c=s&7, t=p.toLowerCase();
        if(t==='p'){
          const dir=us==='w'?-1:1, start=us==='w'?6:1, last=us==='w'?0:7, r1=r+dir;
          const pushP=(to,flag)=>{ if(r1===last){ for(const pr of 'qrbn') add(s,to,flag,us==='w'?pr.toUpperCase():pr); } else add(s,to,flag); };
          if(!b[r1*8+c]){ pushP(r1*8+c); if(r===start&&!b[(r+2*dir)*8+c]) add(s,(r+2*dir)*8+c,'b'); }
          for(const dc of [-1,1]){
            const C=c+dc; if(C<0||C>7) continue; const to=r1*8+C, q=b[to];
            if(q&&colorOf(q)===them) pushP(to); else if(to===this.ep) add(s,to,'e');
          }
        } else if(t==='n'||t==='k'){
          for(const [dr,dc] of (t==='n'?KN:KG)){
            const R=r+dr,C=c+dc; if(R<0||R>7||C<0||C>7) continue;
            const q=b[R*8+C]; if(!q||colorOf(q)===them) add(s,R*8+C);
          }
          if(t==='k'){
            const o=us==='w'?56:0, en=us==='w'?'b':'w', rk=us==='w'?'R':'r';
            if(s===o+4){
              if(this.cas[us==='w'?'K':'k']&&!b[o+5]&&!b[o+6]&&b[o+7]===rk&&!this.attacked(o+4,en)&&!this.attacked(o+5,en)&&!this.attacked(o+6,en)) add(s,o+6,'k');
              if(this.cas[us==='w'?'Q':'q']&&!b[o+3]&&!b[o+2]&&!b[o+1]&&b[o]===rk&&!this.attacked(o+4,en)&&!this.attacked(o+3,en)&&!this.attacked(o+2,en)) add(s,o+2,'q');
            }
          }
        } else {
          const dirs=t==='b'?BD:t==='r'?RD:BD.concat(RD);
          for(const [dr,dc] of dirs){
            let R=r+dr,C=c+dc;
            while(R>=0&&R<8&&C>=0&&C<8){
              const q=b[R*8+C];
              if(!q) add(s,R*8+C); else { if(colorOf(q)===them) add(s,R*8+C); break; }
              R+=dr;C+=dc;
            }
          }
        }
      }
      return out;
    }
    make(m){
      const b=this.b, us=this.turn;
      this.stack.push({m,cas:{K:this.cas.K,Q:this.cas.Q,k:this.cas.k,q:this.cas.q},ep:this.ep,half:this.half,full:this.full});
      b[m.to]=m.promo||m.piece; b[m.from]='';
      if(m.flag==='e') b[(m.from&~7)|(m.to&7)]='';
      else if(m.flag==='k'){ const o=m.from&~7; b[o+5]=b[o+7]; b[o+7]=''; }
      else if(m.flag==='q'){ const o=m.from&~7; b[o+3]=b[o]; b[o]=''; }
      if(m.piece==='K'){this.cas.K=this.cas.Q=false;} else if(m.piece==='k'){this.cas.k=this.cas.q=false;}
      if(m.from===63||m.to===63) this.cas.K=false;
      if(m.from===56||m.to===56) this.cas.Q=false;
      if(m.from===7||m.to===7) this.cas.k=false;
      if(m.from===0||m.to===0) this.cas.q=false;
      this.ep=m.flag==='b'?(m.from+m.to)/2:-1;
      this.half=(m.piece==='P'||m.piece==='p'||m.captured)?0:this.half+1;
      if(us==='b') this.full++;
      this.turn=us==='w'?'b':'w';
    }
    undo(){
      const u=this.stack.pop(); if(!u) return null;
      const m=u.m, b=this.b;
      b[m.from]=m.piece;
      if(m.flag==='e'){ b[m.to]=''; b[(m.from&~7)|(m.to&7)]=m.captured; }
      else b[m.to]=m.captured||'';
      if(m.flag==='k'){ const o=m.from&~7; b[o+7]=b[o+5]; b[o+5]=''; }
      else if(m.flag==='q'){ const o=m.from&~7; b[o]=b[o+3]; b[o+3]=''; }
      this.cas=u.cas; this.ep=u.ep; this.half=u.half; this.full=u.full;
      this.turn=this.turn==='w'?'b':'w';
      return m;
    }
    moves(){
      const us=this.turn, out=[];
      for(const m of this.pseudo()){ this.make(m); if(!this.attacked(this.kingSq(us),this.turn)) out.push(m); this.undo(); }
      return out;
    }
    play(m){ this.make(m); this.keys.push(this.key()); }
    takeback(){ this.keys.pop(); return this.undo(); }
    san(m,legal){
      legal=legal||this.moves();
      let s;
      if(m.flag==='k') s='O-O';
      else if(m.flag==='q') s='O-O-O';
      else {
        const t=m.piece.toUpperCase();
        if(t==='P'){
          s=(m.captured?FILES[m.from&7]+'x':'')+sqName(m.to);
          if(m.promo) s+='='+m.promo.toUpperCase();
        } else {
          s=t;
          const amb=legal.filter(o=>o.piece===m.piece&&o.to===m.to&&o.from!==m.from);
          if(amb.length){
            const sameFile=amb.some(o=>(o.from&7)===(m.from&7)), sameRank=amb.some(o=>(o.from>>3)===(m.from>>3));
            if(!sameFile) s+=FILES[m.from&7]; else if(!sameRank) s+=(8-(m.from>>3)); else s+=sqName(m.from);
          }
          if(m.captured) s+='x';
          s+=sqName(m.to);
        }
      }
      this.make(m);
      if(this.inCheck()) s+=this.moves().length?'+':'#';
      this.undo();
      return s;
    }
    insufficient(){
      const pcs=[];
      for(let s=0;s<64;s++){ const p=this.b[s]; if(p&&p.toLowerCase()!=='k') pcs.push([p.toLowerCase(),s]); }
      if(!pcs.length) return true;
      if(pcs.length===1&&(pcs[0][0]==='b'||pcs[0][0]==='n')) return true;
      if(pcs.every(([t])=>t==='b')){ const col=pcs.map(([,s])=>((s>>3)+(s&7))%2); if(col.every(x=>x===col[0])) return true; }
      return false;
    }
    status(){
      const legal=this.moves();
      if(!legal.length){
        if(this.inCheck()) return {over:true,result:this.turn==='w'?'0-1':'1-0',reason:'checkmate'};
        return {over:true,result:'1/2-1/2',reason:'stalemate'};
      }
      if(this.insufficient()) return {over:true,result:'1/2-1/2',reason:'material'};
      if(this.half>=100) return {over:true,result:'1/2-1/2',reason:'fifty'};
      const k=this.keys[this.keys.length-1];
      if(this.keys.filter(x=>x===k).length>=3) return {over:true,result:'1/2-1/2',reason:'repetition'};
      return {over:false};
    }
  }

  // ---------- Computer opponent ----------
  const VAL={p:100,n:320,b:330,r:500,q:900,k:0};
  const PST={
    p:[0,0,0,0,0,0,0,0,50,50,50,50,50,50,50,50,10,10,20,30,30,20,10,10,5,5,10,25,25,10,5,5,0,0,0,20,20,0,0,0,5,-5,-10,0,0,-10,-5,5,5,10,10,-20,-20,10,10,5,0,0,0,0,0,0,0,0],
    n:[-50,-40,-30,-30,-30,-30,-40,-50,-40,-20,0,0,0,0,-20,-40,-30,0,10,15,15,10,0,-30,-30,5,15,20,20,15,5,-30,-30,0,15,20,20,15,0,-30,-30,5,10,15,15,10,5,-30,-40,-20,0,5,5,0,-20,-40,-50,-40,-30,-30,-30,-30,-40,-50],
    b:[-20,-10,-10,-10,-10,-10,-10,-20,-10,0,0,0,0,0,0,-10,-10,0,5,10,10,5,0,-10,-10,5,5,10,10,5,5,-10,-10,0,10,10,10,10,0,-10,-10,10,10,10,10,10,10,-10,-10,5,0,0,0,0,5,-10,-20,-10,-10,-10,-10,-10,-10,-20],
    r:[0,0,0,0,0,0,0,0,5,10,10,10,10,10,10,5,-5,0,0,0,0,0,0,-5,-5,0,0,0,0,0,0,-5,-5,0,0,0,0,0,0,-5,-5,0,0,0,0,0,0,-5,-5,0,0,0,0,0,0,-5,0,0,0,5,5,0,0,0],
    q:[-20,-10,-10,-5,-5,-10,-10,-20,-10,0,0,0,0,0,0,-10,-10,0,5,5,5,5,0,-10,-5,0,5,5,5,5,0,-5,0,0,5,5,5,5,0,-5,-10,5,5,5,5,5,0,-10,-10,0,5,0,0,0,0,-10,-20,-10,-10,-5,-5,-10,-10,-20],
    km:[-30,-40,-40,-50,-50,-40,-40,-30,-30,-40,-40,-50,-50,-40,-40,-30,-30,-40,-40,-50,-50,-40,-40,-30,-30,-40,-40,-50,-50,-40,-40,-30,-20,-30,-30,-40,-40,-30,-30,-20,-10,-20,-20,-20,-20,-20,-20,-10,20,20,0,0,0,0,20,20,20,30,10,0,0,10,30,20],
    ke:[-50,-40,-30,-20,-20,-30,-40,-50,-30,-20,-10,0,0,-10,-20,-30,-30,-10,20,30,30,20,-10,-30,-30,-10,30,40,40,30,-10,-30,-30,-10,30,40,40,30,-10,-30,-30,-10,20,30,30,20,-10,-30,-30,-30,0,0,0,0,-30,-30,-50,-30,-30,-30,-30,-30,-30,-50]
  };
  const mir=s=>((7-(s>>3))<<3)|(s&7);
  function evaluate(g){
    const b=g.b; let s=0, npm=0, wk=-1, bk=-1, wb=0, bbn=0;
    for(let i=0;i<64;i++){
      const p=b[i]; if(!p) continue;
      const t=p.toLowerCase(), w=p!==t;
      if(t==='k'){ if(w) wk=i; else bk=i; continue; }
      if(t!=='p') npm+=VAL[t];
      if(t==='b'){ if(w) wb++; else bbn++; }
      const v=VAL[t]+PST[t][w?i:mir(i)];
      s+=w?v:-v;
    }
    const kt=npm<=1400?PST.ke:PST.km;
    if(wk>=0) s+=kt[wk]; if(bk>=0) s-=kt[mir(bk)];
    if(wb>=2) s+=30; if(bbn>=2) s-=30;
    return g.turn==='w'?s:-s;
  }
  function order(ms){
    for(const m of ms){
      let sc=0;
      if(m.captured) sc=10000+10*VAL[m.captured.toLowerCase()]-VAL[m.piece.toLowerCase()]/10;
      if(m.promo) sc+=8000+VAL[m.promo.toLowerCase()];
      m.s=sc;
    }
    return ms.sort((a,b)=>b.s-a.s);
  }
  function search(fen,opts){
    opts=opts||{};
    const g=new Game(fen), root=g.moves();
    if(!root.length) return null;
    const INF=1e9, MATE=100000, noise=opts.noise||0, maxD=opts.depth||64;
    const deadline=Date.now()+(opts.time||60000);
    let nodes=0, stop=false;
    const tick=()=>{ if((++nodes&1023)===0&&Date.now()>deadline) stop=true; return stop; };
    function qs(alpha,beta){
      if(tick()) return 0;
      const stand=evaluate(g);
      if(stand>=beta) return beta;
      if(stand>alpha) alpha=stand;
      const us=g.turn;
      for(const m of order(g.pseudo().filter(m=>m.captured||m.promo))){
        g.make(m);
        if(g.attacked(g.kingSq(us),g.turn)){ g.undo(); continue; }
        const sc=-qs(-beta,-alpha);
        g.undo();
        if(stop) return 0;
        if(sc>=beta) return beta;
        if(sc>alpha) alpha=sc;
      }
      return alpha;
    }
    function ab(depth,alpha,beta,ply){
      if(tick()) return 0;
      if(g.half>=100) return 0;
      const us=g.turn, chk=g.inCheck();
      if(chk&&ply<10) depth++;
      if(depth<=0) return qs(alpha,beta);
      let legal=0;
      for(const m of order(g.pseudo())){
        g.make(m);
        if(g.attacked(g.kingSq(us),g.turn)){ g.undo(); continue; }
        legal++;
        const sc=-ab(depth-1,-beta,-alpha,ply+1);
        g.undo();
        if(stop) return 0;
        if(sc>=beta) return beta;
        if(sc>alpha) alpha=sc;
      }
      if(!legal) return chk?-MATE+ply:0;
      return alpha;
    }
    order(root);
    let best=root[0], bestScore=-INF;
    for(let d=1;d<=maxD;d++){
      let alpha=-INF, cur=null, curScore=-INF;
      for(const m of root){
        g.make(m);
        let sc=noise?-ab(d-1,-INF,INF,1):-ab(d-1,-INF,-alpha,1);
        g.undo();
        if(stop) break;
        if(noise) sc+=(Math.random()*2-1)*noise;
        if(sc>curScore){ curScore=sc; cur=m; }
        if(sc>alpha) alpha=sc;
      }
      if(stop&&d>1) break;
      if(cur){ best=cur; bestScore=curScore; root.splice(root.indexOf(cur),1); root.unshift(cur); }
      if(stop||Math.abs(bestScore)>MATE-1000||Date.now()>deadline) break;
    }
    return {from:best.from,to:best.to,promo:best.promo||'',score:bestScore,nodes};
  }

  return {Game,search,START,sqName,sqIdx,colorOf};
}
if(typeof module!=='undefined') module.exports=ENGINE;
