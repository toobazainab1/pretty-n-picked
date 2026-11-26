const IMG={1:"assets/img1.jpg",2:"assets/img2.jpg",3:"assets/img3.jpg",4:"assets/img4.jpg",5:"assets/img5.jpg",6:"assets/img6.jpg",7:"assets/img7.jpg",8:"assets/img8.jpg",9:"assets/img9.jpg",10:"assets/img10.jpg",11:"assets/img11.jpg",12:"assets/img12.jpg"};
const P=[
{id:1,n:"Clover Pearl Necklace",c:"Necklaces",d:"Mother-of-pearl clover, beaded gold edge",p:3800,i:[1,2],t:"Bestseller"},
{id:2,n:"Dewdrop Studs",c:"Earrings",d:"Bold polished gold teardrops",p:2400,i:[3,4],t:"New"},
{id:3,n:"Clover Five Bracelet",c:"Bracelets",d:"Five pearl clovers on a fine chain",p:4500,i:[5,6]},
{id:4,n:"Little Ribbon Necklace",c:"Necklaces",d:"Dainty bow on a box chain",p:2900,i:[7,8],t:"Gift pick"},
{id:5,n:"Petal Rectangle Watch",c:"Watches",d:"Pearl dial, crystal bezel, gold link strap",p:8900,i:[9,10]},
{id:6,n:"Crescent Gold Hoops",c:"Earrings",d:"Chunky, light and easy to wear",p:2200,i:[11,12]}];
const fmt=n=>"Rs. "+n.toLocaleString("en-US");
const $=s=>document.querySelector(s);
// petals
for(let k=0;k<14;k++){const s=document.createElement("i");s.className="petal";s.style.cssText=`left:${Math.random()*100}%;--dx:${(Math.random()*160-80)}px;--r:${360+Math.random()*540}deg;animation-duration:${9+Math.random()*9}s;animation-delay:${-Math.random()*14}s;transform:scale(${.6+Math.random()*.9})`;$(".hero").appendChild(s)}
// marquee
const words=["Free delivery over Rs. 5,000","Gold-tone, skin-friendly","Gift-ready packaging","Cash on delivery"];
$("#mq").innerHTML=[...words,...words,...words,...words].map(w=>`<span>${w}</span><i>✦</i>`).join("");
// shop (cards are in the HTML for SEO; JS only filters + reveals)
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("v");io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".card").forEach((c,k)=>{c.style.transitionDelay=(k%3)*90+"ms";io.observe(c)});
$("#tabs").onclick=e=>{const c=e.target.dataset.c;if(!c)return;document.querySelectorAll("#tabs button").forEach(b=>b.classList.toggle("on",b===e.target));document.querySelectorAll(".card").forEach(k=>{k.hidden=!(c=="All"||k.dataset.c==c);if(!k.hidden)k.classList.add("v")})};
// lookbook
$("#rail").innerHTML=[4,1,12,8,5,9,3,10,6].map(k=>`<img src="${IMG[k]}" alt="Pretty N Picked gold jewellery styled with rose petals and silk" width="320" height="427" loading="lazy">`).join("");
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
