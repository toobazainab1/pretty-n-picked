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
// falling petals over the hero video
for(let k=0;k<(innerWidth<700?7:14);k++){const s=document.createElement("i");s.className="petal";s.style.cssText=`left:${Math.random()*100}%;--dx:${(Math.random()*160-80)}px;--r:${360+Math.random()*540}deg;animation-duration:${9+Math.random()*9}s;animation-delay:${-Math.random()*14}s;transform:scale(${.6+Math.random()*.9})`;$(".hero").appendChild(s)}
// darkening headings + drifting wall
const rises=[...document.querySelectorAll(".rise")],wall=$("#look"),wv=$("#wv"),track=$("#track"),wcs=[...track.children];
const base=[0,56,12,70,24,62,6,48],spd=[34,-24,46,-34,28,-44,38,-26];
if(!reduce)wall.classList.add("js");
function frame(){
if(!reduce){rises.forEach(h=>{const q=h.getBoundingClientRect(),t=Math.min(1,Math.max(0,(innerHeight*.92-q.top)/(innerHeight*.42)));h.style.setProperty("--t",t.toFixed(3))});
const w=wall.getBoundingClientRect(),p2=Math.min(1,Math.max(0,(innerHeight-w.top)/(innerHeight+w.height))),max=Math.max(0,track.offsetWidth-wv.clientWidth+2*parseFloat(getComputedStyle(wv).paddingLeft));
track.style.transform=`translateX(${-p2*max}px)`;wcs.forEach((c,i)=>c.style.transform=`translateY(${base[i]+(p2-.5)*spd[i]}px)`)}}
let tk=0;addEventListener("scroll",()=>{if(!tk)tk=requestAnimationFrame(()=>{tk=0;frame()})},{passive:true});
addEventListener("resize",frame);
frame();