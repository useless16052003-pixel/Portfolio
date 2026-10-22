(()=>{'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const g=window.gsap,RM=matchMedia('(prefers-reduced-motion:reduce)').matches,ANIM=!!g,A=ANIM&&!RM;
const h=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
/* ===== YOUR CONTENT: edit the lists below (see README.md) ===== */
const T=n=>`media/tile-${n}.svg`,six=f=>Array.from({length:6},(_,i)=>f(i+1,i));
const cap=['Golden hour on the rooftop','A very serious pigeon','Rain on the window','Tea, steam and sunlight','A tiny door, big dreams','Soft light, softer day'];
const DATA={
 photo:six((n,i)=>({t:'REPLACE: '+cap[i],c:'REPLACE: one line about this photo',img:T(n)})),
 web:six((n,i)=>({t:'REPLACE: Project name '+n,tech:'HTML · CSS · JS',d:'REPLACE: one friendly sentence about what it does and why you made it.',live:'https://example.com',code:'https://example.com',img:T(n)})),
 video:six((n,i)=>({t:'REPLACE: Video title '+n,d:'REPLACE: what this video is about',img:T(n),video:''})),
 write:six((n,i)=>({t:'REPLACE: Piece title '+n,ex:'REPLACE: the first line or two of your piece, a little teaser to make people curious…',body:'REPLACE: paste the full piece here, or change this to link to it.'}))
};
/* ================================================================ */
const R={
 photo:(d,i)=>`<button class="pol" style="--r:${[-4,3,-2,4,-3,2][i]}deg" data-k="photo" data-i="${i}"><img src="${d.img}" alt="Placeholder photo: ${h(d.t)}" loading="lazy"><span>${h(d.t)}</span></button>`,
 web:d=>`<article class="win"><div class="bar"><i></i><i></i><i></i></div><img src="${d.img}" alt="" loading="lazy"><div class="b"><h3>${h(d.t)}</h3><p class="tags">${h(d.tech)}</p><p>${h(d.d)}</p><a class="btn" href="${h(d.live)}" target="_blank" rel="noopener">Live site</a> <a class="btn alt" href="${h(d.code)}" target="_blank" rel="noopener">Code</a></div></article>`,
 video:(d,i)=>`<button class="clip" data-k="video" data-i="${i}" aria-label="Play ${h(d.t)}"><img src="${d.img}" alt="" loading="lazy"><span class="play" aria-hidden="true">▶</span><b>${h(d.t)}</b></button>`,
 write:(d,i)=>`<article class="ent"><h3>${h(d.t)}</h3><p>${h(d.ex)}</p><button class="btn" data-k="write" data-i="${i}">Read</button></article>`};
Object.keys(R).forEach(k=>$(`[data-items=${k}]`).innerHTML=DATA[k].map(R[k]).join(''));
$$('.skyz').forEach(s=>{for(let i=0;i<9;i++)s.insertAdjacentHTML('beforeend',`<svg class="sp" aria-hidden="true" viewBox="0 0 20 20" style="left:${Math.random()*95}%;top:${Math.random()*90}%;animation-delay:${i*.35}s"><use href="#spark"/></svg>`)});
/* mascot */
const M=$('#mascot'),say=$('#say'),W=$('#world'),S=$('#stage'),back=$('#back'),page=$('#page'),lb=$('#lb');
const talk=(t,wave,point)=>{say.textContent=t;M.classList.toggle('wave',!!wave);M.classList.toggle('point',!!point)};
const jump=()=>{if(A)g.fromTo(M,{y:0},{y:-46,duration:.25,yoyo:true,repeat:1,ease:'power2.out'})};
talk('Hi, I’m Pip! ✿',1);
M.onclick=()=>{jump();talk(['Boop! ✿','Hehe, that tickles','Try a door ♡'][Math.random()*3|0])};
/* intro */
const nm=$('#name'),txt=nm.textContent;nm.setAttribute('aria-label',txt);nm.innerHTML=[...txt].map(c=>`<span aria-hidden="true">${c}</span>`).join('');
if(A){g.from('#name span',{y:70,opacity:0,rotate:-14,stagger:.07,duration:.7,ease:'back.out(2)',delay:.2});g.from('.tag,.hint',{opacity:0,y:20,duration:.8,delay:1.2})}
/* scroll story */
if(A&&window.ScrollTrigger){g.registerPlugin(ScrollTrigger);
 const sc={trigger:'#intro',start:'top top',end:'bottom top',scrub:true};
 g.to('#warm',{opacity:1,scrollTrigger:sc});
 g.to('.c1,.c3',{xPercent:-130,scrollTrigger:sc});g.to('.c2,.c4',{xPercent:130,scrollTrigger:sc});
 g.to('#name',{y:-50,opacity:.2,scrollTrigger:sc});
 ScrollTrigger.create({trigger:'#intro',start:'top top',end:'bottom 60%',onToggle:s=>talk(s.isActive?'Hi, I’m Pip! ✿':'Four doors! Pick one ♡',s.isActive,!s.isActive)});
 ScrollTrigger.create({trigger:'#contact',start:'top 55%',onToggle:s=>talk(s.isActive?'Bye bye, see you soon! ♡':'Four doors! Pick one ♡',s.isActive,!s.isActive)});
 const mm=g.matchMedia();
 mm.add('(min-width:801px)',()=>{g.timeline({scrollTrigger:{trigger:'#doors',start:'top top',end:'+=1200',pin:true,scrub:.6}}).from('.grid li',{x:i=>[-340,340,-340,340][i],y:-260,rotate:i=>i%2?25:-25,opacity:0,duration:1,stagger:.35})});
 mm.add('(max-width:800px)',()=>{g.from('.grid li',{y:40,opacity:0,stagger:.12,scrollTrigger:{trigger:'.grid',start:'top 85%'}})});
}
/* lightbox */
document.addEventListener('click',e=>{const b=e.target.closest('[data-k]');if(!b)return;const k=b.dataset.k,d=DATA[k][b.dataset.i];
 $('#lbBody').innerHTML=k==='write'?`<h3>${h(d.t)}</h3><p>${h(d.body)}</p>`:`${d.video?`<video controls src="${h(d.video)}" poster="${d.img}"></video>`:`<img src="${d.img}" alt="Placeholder: ${h(d.t)}">`}<p><b>${h(d.t)}</b><br>${h(d.c||d.d||'')}</p>`;
 lb.showModal();jump()});
$('#lbClose').onclick=()=>lb.close();lb.addEventListener('click',e=>{if(e.target===lb)lb.close()});
/* worlds */
const msg={photo:'Say cheese! ✿',web:'Ooh, shiny sites!',video:'Lights, camera, edit!',write:'Shh… story time ✎'};
let busy=false,cur=null;
$$('.door').forEach(b=>b.onclick=()=>open(b.dataset.w,b));
function open(k,btn){
 if(busy)return;busy=true;cur=k;page.inert=true;document.body.classList.add('lock');
 if(!A){enter(k);return}
 const ico=$('.ico',btn).cloneNode(true),veil=document.createElement('div');ico.classList.add('big');veil.className='veil';
 S.innerHTML='';S.hidden=false;
 const tl=g.timeline({onComplete:()=>enter(k)});
 if(k==='video'){const f=document.createElement('div'),p=document.createElement('div');f.className='film';p.className='head';S.append(f,p);
  tl.fromTo(f,{scaleX:0},{scaleX:1,transformOrigin:'0 50%',duration:.8,ease:'power2.out'}).fromTo(p,{x:0},{x:innerWidth-6,duration:.9,ease:'none'}).from(ico,{scale:.2,opacity:0,duration:.4,ease:'back.out(2)'})}
 S.append(ico,veil);
 if(k==='photo')tl.from(ico,{y:'-110vh',rotate:-14,duration:.9,ease:'bounce.out'});
 if(k==='web'){const l=$('.lid',ico);g.set(l,{scaleY:.06,svgOrigin:'60 62'});tl.from(ico,{scale:.3,opacity:0,duration:.4}).to(l,{scaleY:1,duration:.7,ease:'back.out(1.6)'})}
 if(k==='write'){const c=$('.cover',ico),w=$('.wr',ico),p=$('.pen',ico);g.set(w,{strokeDashoffset:1});tl.from(ico,{scale:.4,opacity:0,duration:.4}).to(c,{scaleX:-1,svgOrigin:'26 50',duration:.7,ease:'power2.inOut'}).to(w,{strokeDashoffset:0,duration:.9,ease:'none'}).to(p,{x:-46,y:6,duration:.9,ease:'none'},'<')}
 const z={photo:[16,'50% 58%'],web:[12,'50% 36%'],video:[14,'50% 50%'],write:[10,'40% 45%']}[k];
 tl.to(ico,{scale:z[0],transformOrigin:z[1],duration:1,ease:'power3.in'}).fromTo(veil,{scale:0},{scale:1,duration:.7,ease:'power2.out'},'-=.3');
}
function enter(k){
 $$('.w').forEach(w=>w.hidden=w.id!=='w-'+k);W.hidden=false;W.scrollTop=0;back.hidden=false;back.focus({preventScroll:true});talk(msg[k],1);jump();
 const fin=()=>{S.hidden=true;S.innerHTML='';busy=false};
 if(!ANIM){fin();return}
 g.fromTo(W,{opacity:0},{opacity:1,duration:A?.5:.3,onComplete:fin});
 if(A)g.from($$(`#w-${k} [data-items]>*`),{y:50,opacity:0,scale:.8,rotate:i=>i%2?6:-6,stagger:.09,duration:.6,ease:'back.out(1.7)',delay:.2});
}
back.onclick=()=>{if(busy||!cur)return;busy=true;
 const end=()=>{W.hidden=true;back.hidden=true;page.inert=false;document.body.classList.remove('lock');const b=$(`[data-w=${cur}]`);cur=null;b&&b.focus({preventScroll:true});talk('Welcome back! Pick another ♡',0,1);jump();busy=false};
 if(!ANIM){end();return}
 g.to(W,{opacity:0,scale:A?1.15:1,duration:A?.5:.3,ease:'power2.in',onComplete:()=>{g.set(W,{scale:1});end();if(A)g.fromTo('#doors .wrap',{scale:.85},{scale:1,duration:.7,ease:'back.out(1.6)'})}});
};
addEventListener('keydown',e=>{if(e.key==='Escape'&&!W.hidden&&!lb.open)back.click()});
/* soft cursor */
if(A&&matchMedia('(hover:hover) and (pointer:fine)').matches){
 const ds=Array.from({length:7},(_,i)=>{const d=document.createElement('i');d.className='ck'+(i?'':' lead');d.style.opacity=i?1-i/8:1;d.style.scale=1-i*.09;document.body.append(d);return[g.quickTo(d,'x',{duration:.12+i*.07,ease:'power3'}),g.quickTo(d,'y',{duration:.12+i*.07,ease:'power3'})]});
 addEventListener('pointermove',e=>ds.forEach(([x,y])=>{x(e.clientX);y(e.clientY)}),{passive:true});
 document.documentElement.classList.add('cur');
}
})();
