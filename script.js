const $ = id => document.getElementById(id);
const n1=$('n1'), n2=$('n2'), err=$('error'), msg=$('msg'), num=$('num'),
      level=$('level'), heart=$('heart'), btn=$('go'), ring=$('ring');

const tiers = [
  {max:20, c1:'#b9b9c6', c2:'#d9d9e0', t:"Cold as stone... but even gray skies turn pink."},
  {max:40, c1:'#cdb3c0', c2:'#e6d3dc', t:"A slow start. Maybe be friends first?"},
  {max:60, c1:'#f0b3cc', c2:'#f9d5e3', t:"There's a spark here. Give it time!"},
  {max:80, c1:'#f49bbd', c2:'#fbc9dd', t:"Sweet chemistry! You two really click."},
  {max:101,c1:'#ee7fa8', c2:'#fbc2d8', t:"Perfect match! Made for each other."}
];
const esc = s => s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function check(a,b){
  n1.classList.remove('bad'); n2.classList.remove('bad');
  void n1.offsetWidth;
  if(!a||!b){ if(!a)n1.classList.add('bad'); if(!b)n2.classList.add('bad'); return 'Please enter both names.'; }
  if(a.toLowerCase()===b.toLowerCase()){ n1.classList.add('bad'); n2.classList.add('bad'); return "A name can't match itself. Enter two different names!"; }
  return '';
}

function burst(n){
  const cols=['#f9c6da','#ee8fb3','#cfcfd6','#fbd9e6'];
  for(let i=0;i<n;i++){
    const s=document.createElement('span'); s.className='fl'; s.textContent='♥';
    s.style.left=Math.random()*100+'vw';
    s.style.fontSize=(14+Math.random()*26)+'px';
    s.style.color=cols[i%cols.length];
    s.style.animationDuration=(2.6+Math.random()*2.6)+'s';
    s.style.animationDelay=(Math.random()*.7)+'s';
    document.body.appendChild(s); setTimeout(()=>s.remove(),6500);
  }
}

function setLevel(v){ const vis=10+90*v/100; level.setAttribute('transform',`translate(0 ${86-84*vis/100})`); }

function run(){
  const a=n1.value.trim(), b=n2.value.trim();
  const p=check(a,b); err.textContent=p;
  if(p){ msg.innerHTML=''; return; }

  const score=Math.floor(Math.random()*101);
  const tier=tiers.find(t=>score<t.max);
  $('s1').setAttribute('stop-color',tier.c1); $('s2').setAttribute('stop-color',tier.c2);
  btn.disabled=true; heart.classList.remove('beat'); msg.innerHTML='';
  ring.classList.remove('go'); void ring.offsetWidth; ring.classList.add('go');

  const t0=performance.now(), dur=1900;
  (function step(t){
    const k=Math.min(1,(t-t0)/dur), e=1-Math.pow(1-k,3), v=score*e;
    setLevel(v); num.textContent=Math.round(v)+'%';
    if(k<1) return requestAnimationFrame(step);
    heart.classList.add('beat'); btn.disabled=false;
    msg.innerHTML=`<div class="in"><div class="names">${esc(a)}<i>♥</i>${esc(b)}</div><p class="text">${tier.t}</p></div>`;
    if(score>=50) burst(score>=80?26:14);
  })(t0);
}

btn.addEventListener('click',run);
[n1,n2].forEach(el=>el.addEventListener('keydown',e=>{if(e.key==='Enter')run();}));
