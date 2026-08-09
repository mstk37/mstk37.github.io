const WHATSAPP = '33764027468';
const products = [
  {id:1,name:'Avery l’Avocat',category:'kawaii',desc:'Petite figurine kawaii imprimée en 3D.',price:3,icon:'🥑',art:'art-1'},
  {id:2,name:'Buddy le Chiot',category:'kawaii',desc:'Un compagnon adorable pour le bureau ou une étagère.',price:3,icon:'🐶',art:'art-2'},
  {id:3,name:'Aldric le Griffon',category:'kawaii',desc:'Créature fantastique en version mini et attachante.',price:3,icon:'🦅',art:'art-3'},
  {id:4,name:'Bunny le Lapin',category:'kawaii',desc:'Un petit lapin décoratif plein de douceur.',price:3,icon:'🐰',art:'art-4'},
  {id:5,name:'Mini Dragon',category:'deco',desc:'Une petite créature articulée à poser partout.',price:5,icon:'🐉',art:'art-5'},
  {id:6,name:'Porte-clés personnalisé',category:'cadeau',desc:'Prénom, mot ou petit symbole selon ton idée.',price:4,icon:'🔑',art:'art-6'},
  {id:7,name:'Bon cadeau 3D',category:'cadeau',desc:'Un bon cadeau imprimé en 3D, original et durable.',price:5,icon:'🎁',art:'art-7'},
  {id:8,name:'Déco personnalisée',category:'deco',desc:'Une création décorative adaptée à ton univers.',price:8,icon:'✨',art:'art-8'}
];
let cart = JSON.parse(localStorage.getItem('mstk-cart') || '[]');
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

function euro(v){return new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR'}).format(v)}
function renderProducts(filter='all'){
  const list = filter==='all' ? products : products.filter(p=>p.category===filter);
  $('#productsGrid').innerHTML = list.map(p=>`<article class="product-card reveal visible">
    <div class="product-art ${p.art}"><span>${p.icon}</span></div>
    <div class="product-body"><span class="product-meta">${p.category}</span><h3 class="product-title">${p.name}</h3><p class="product-desc">${p.desc}</p>
    <div class="product-bottom"><span class="price">${euro(p.price)}</span><button class="add-btn" data-id="${p.id}" aria-label="Ajouter ${p.name}">+</button></div></div>
  </article>`).join('');
  $$('.add-btn').forEach(b=>b.onclick=()=>addToCart(Number(b.dataset.id)));
}
function addToCart(id){const item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({id,qty:1});saveCart();showToast('Ajouté au panier ✓')}
function saveCart(){localStorage.setItem('mstk-cart',JSON.stringify(cart));renderCart()}
function renderCart(){
  $('#cartCount').textContent=cart.reduce((s,x)=>s+x.qty,0);
  if(!cart.length){$('#cartItems').innerHTML='<div class="cart-empty">Ton panier est vide.<br>Ajoute une création pour commencer.</div>';$('#cartTotal').textContent=euro(0);return}
  $('#cartItems').innerHTML=cart.map(x=>{const p=products.find(p=>p.id===x.id);return `<div class="cart-item"><div class="cart-icon">${p.icon}</div><div><h4>${p.name}</h4><p>${x.qty} × ${euro(p.price)}</p></div><button class="remove" data-id="${p.id}" aria-label="Retirer">×</button></div>`}).join('');
  $$('.remove').forEach(b=>b.onclick=()=>{cart=cart.filter(x=>x.id!==Number(b.dataset.id));saveCart()});
  $('#cartTotal').textContent=euro(cart.reduce((sum,x)=>{const p=products.find(p=>p.id===x.id);return sum+p.price*x.qty},0));
}
function openCart(){ $('#cartDrawer').classList.add('open'); $('#overlay').classList.add('show'); $('#cartDrawer').setAttribute('aria-hidden','false') }
function closeCart(){ $('#cartDrawer').classList.remove('open'); $('#overlay').classList.remove('show'); $('#cartDrawer').setAttribute('aria-hidden','true') }
function showToast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1700)}
function sendOrder(){if(!cart.length){showToast('Ton panier est vide');return}const lines=cart.map(x=>{const p=products.find(p=>p.id===x.id);return `• ${p.name} x${x.qty} — ${euro(p.price*x.qty)}`});const total=cart.reduce((sum,x)=>{const p=products.find(p=>p.id===x.id);return sum+p.price*x.qty},0);const text=`Bonjour MSTKPRINT37 👋\nJe souhaite commander :\n\n${lines.join('\n')}\n\nTotal estimé : ${euro(total)}\n\nPouvez-vous me confirmer la disponibilité et le délai ?`;window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`,'_blank')}
function sendQuote(){const name=$('#quoteName').value.trim();const project=$('#quoteProject').value.trim();if(!project){showToast('Décris ton projet avant d’envoyer');return}const text=`Bonjour MSTKPRINT37 👋\n${name?`Je m’appelle ${name}.\n`:''}J’aimerais un devis pour ce projet :\n\n${project}`;window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`,'_blank')}

renderProducts();renderCart();$('#year').textContent=new Date().getFullYear();
$$('.filter').forEach(b=>b.onclick=()=>{$$('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderProducts(b.dataset.filter)});
$('#cartBtn').onclick=openCart;$('#closeCart').onclick=closeCart;$('#overlay').onclick=closeCart;$('#orderWhatsapp').onclick=sendOrder;$('#quoteWhatsapp').onclick=sendQuote;
$('#menuBtn').onclick=()=>{const n=$('#mainNav');n.classList.toggle('open');$('#menuBtn').setAttribute('aria-expanded',n.classList.contains('open'))};
$$('#mainNav a').forEach(a=>a.onclick=()=>$('#mainNav').classList.remove('open'));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});$$('.reveal').forEach(el=>io.observe(el));
