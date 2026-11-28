const IMG={1:"assets/img1.jpg",2:"assets/img2.jpg",3:"assets/img3.jpg",4:"assets/img4.jpg",5:"assets/img5.jpg",6:"assets/img6.jpg",7:"assets/img7.jpg",8:"assets/img8.jpg",9:"assets/img9.jpg",10:"assets/img10.jpg",11:"assets/img11.jpg",12:"assets/img12.jpg"};
const P=[
{id:1,n:"Clover Pearl Necklace",p:499,i:[1,2]},
{id:2,n:"Dewdrop Studs",p:999,i:[3,4]},
{id:3,n:"Clover Five Bracelet",p:1499,i:[5,6]},
{id:4,n:"Little Ribbon Necklace",p:499,i:[7,8]},
{id:5,n:"Petal Rectangle Watch",p:1999,i:[9,10]},
{id:6,n:"Crescent Gold Hoops",p:999,i:[11,12]}];
const fmt=n=>"Rs. "+n.toLocaleString("en-US");
const $=s=>document.querySelector(s);
const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
// marquee
const words=["Free delivery over Rs. 2,000","Stainless steel, gold-tone finish","Gift-ready packaging","Cash on delivery"];
$("#mq").innerHTML=[...words,...words,...words,...words].map(w=>`<span>${w}</span><i>✦</i>`).join("");
// shop: cards are in the HTML for SEO; JS filters + reveals
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("v");io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".card,.rv").forEach((c,k)=>{c.style.transitionDelay=(k%3)*90+"ms";io.observe(c)});
function setCat(c){document.querySelectorAll("#tabs button").forEach(b=>b.classList.toggle("on",b.dataset.c===c));document.querySelectorAll(".card").forEach(k=>{k.hidden=!(c=="All"||k.dataset.c==c);if(!k.hidden)k.classList.add("v")})}
$("#tabs").onclick=e=>{const c=e.target.dataset.c;if(c)setCat(c)};
// cart
let cart={};
function draw(){const ids=Object.keys(cart);let t=0,n=0;
$("#items").innerHTML=ids.length?ids.map(id=>{const x=P.find(p=>p.id==id),q=cart[id];t+=x.p*q;n+=q;return `<div class="it"><img src="${IMG[x.i[0]]}" alt="${x.n}"><div><b>${x.n}</b>${q} × ${fmt(x.p)}</div><button data-rm="${id}" aria-label="Remove">✕</button></div>`}).join(""):`<p class="empty">Your bag is empty.<br>Pick something pretty.</p>`;
$("#tot").textContent=fmt(t);$("#cnt").textContent=n}
function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("o");clearTimeout(toast.h);toast.h=setTimeout(()=>t.classList.remove("o"),2200)}
document.addEventListener("click",e=>{const a=e.target.closest(".add"),r=e.target.closest("[data-rm]");
if(a){const id=a.dataset.id;cart[id]=(cart[id]||0)+1;draw();toast("Added to your bag ✦")}
if(r){delete cart[r.dataset.rm];draw()}});
$("#bag").onclick=()=>$("#dr").classList.add("o");$("#x").onclick=()=>$("#dr").classList.remove("o");
$("#co").onclick=()=>toast(Object.keys(cart).length?"Checkout is coming soon":"Add a piece first");
$("#f").onsubmit=e=>{e.preventDefault();e.target.reset();toast("Welcome to the club ✦")};
draw();
// side menu (mobile)
const menu=$("#menu"),ov=$("#ov"),bur=$("#burger");
function mtoggle(o){menu.classList.toggle("o",o);ov.classList.toggle("o",o);bur.setAttribute("aria-expanded",o);document.body.style.overflow=o?"hidden":""}
bur.onclick=()=>mtoggle(true);$("#mclose").onclick=ov.onclick=()=>mtoggle(false);
menu.addEventListener("click",e=>{if(e.target.closest("a"))mtoggle(false);const b=e.target.closest("[data-cat]");if(b){setCat(b.dataset.cat);mtoggle(false);$("#shop").scrollIntoView({behavior:"smooth"})}});
addEventListener("keydown",e=>{if(e.key==="Escape"){mtoggle(false);$("#dr").classList.remove("o")}});
addEventListener("resize",()=>{if(innerWidth>900)mtoggle(false)});
// scroll-driven hero: 4 stages + petal burst
const st=$("#top"),imgs=[...st.querySelectorAll(".arch2 img")],pcs=[...st.querySelectorAll(".pc")],caps=[...st.querySelectorAll(".cap span")],stp=[...st.querySelectorAll(".steps li")],hint=$(".hint"),cv=$("#fx"),ctx=cv.getContext("2d");
let cur=-1,W=0,H=0,parts=[],raf=0;
function size(){const d=Math.min(devicePixelRatio||1,2),r=cv.getBoundingClientRect();W=r.width;H=r.height;cv.width=W*d;cv.height=H*d;ctx.setTransform(d,0,0,d,0,0)}
function burst(){if(reduce)return;for(let i=0;i<36;i++){const a=Math.random()*6.283,s=1.5+Math.random()*4.5;parts.push({x:W/2,y:H/2,vx:Math.cos(a)*s*(1+Math.random()),vy:Math.sin(a)*s-2.2,r:Math.random()*6.283,vr:(Math.random()-.5)*.14,s:5+Math.random()*7,l:1,d:.004+Math.random()*.005,k:i%4==0})}if(!raf)raf=requestAnimationFrame(tick)}
function tick(){ctx.clearRect(0,0,W,H);parts=parts.filter(p=>p.l>0);for(const p of parts){p.x+=p.vx;p.y+=p.vy;p.vy+=.09;p.vx*=.985;p.r+=p.vr;p.l-=p.d;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.r);ctx.globalAlpha=Math.max(p.l,0);if(p.k){ctx.fillStyle="#d9b46a";ctx.beginPath();ctx.moveTo(0,-p.s);ctx.quadraticCurveTo(0,0,p.s,0);ctx.quadraticCurveTo(0,0,0,p.s);ctx.quadraticCurveTo(0,0,-p.s,0);ctx.quadraticCurveTo(0,0,0,-p.s);ctx.fill()}else{ctx.fillStyle="#efb3bd";ctx.beginPath();ctx.ellipse(0,0,p.s*.6,p.s,0,0,6.283);ctx.fill()}ctx.restore()}
raf=parts.length?requestAnimationFrame(tick):0;if(!raf)ctx.clearRect(0,0,W,H)}
function setStage(i,first){if(i===cur)return;cur=i;[imgs,pcs,caps,stp].forEach(a=>a.forEach((e,k)=>e.classList.toggle("on",k===i)));if(!first)burst()}
// darkening headings + drifting wall
const rises=[...document.querySelectorAll(".rise")],wall=$("#look"),wv=$("#wv"),track=$("#track"),wcs=[...track.children];
const base=[0,56,12,70,24,62,6,48],spd=[34,-24,46,-34,28,-44,38,-26];
if(!reduce)wall.classList.add("js");
function frame(){
if(!reduce){const r=st.getBoundingClientRect(),tot=st.offsetHeight-innerHeight,p=Math.min(1,Math.max(0,-r.top/tot));st.style.setProperty("--p",p.toFixed(4));setStage(Math.min(3,Math.floor(p*4)));hint.style.opacity=p>.02?0:.6;
rises.forEach(h=>{const q=h.getBoundingClientRect(),t=Math.min(1,Math.max(0,(innerHeight*.92-q.top)/(innerHeight*.42)));h.style.setProperty("--t",t.toFixed(3))});
const w=wall.getBoundingClientRect(),p2=Math.min(1,Math.max(0,(innerHeight-w.top)/(innerHeight+w.height))),max=Math.max(0,track.offsetWidth-wv.clientWidth+2*parseFloat(getComputedStyle(wv).paddingLeft));
track.style.transform=`translateX(${-p2*max}px)`;wcs.forEach((c,i)=>c.style.transform=`translateY(${base[i]+(p2-.5)*spd[i]}px)`)}}
let tk=0;addEventListener("scroll",()=>{if(!tk)tk=requestAnimationFrame(()=>{tk=0;frame()})},{passive:true});
addEventListener("resize",()=>{size();frame()});
size();setStage(0,true);
if(!reduce){imgs[0].classList.remove("on");setTimeout(()=>{imgs[0].classList.add("on");burst()},350)}
frame();