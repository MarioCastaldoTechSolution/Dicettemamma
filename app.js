'use strict';

const PRODUCTS = [
  { id:'cappellino', category:'SEGNAPOSTO O PORTACHIAVI', tag:'2 usi in 1', title:'Cappellino segnaposto / portachiavi', description:'Un cappellino, due modi di usarlo: segnaposto per la tavola oppure portachiavi da portare sempre con te. Personalizza il nome o la scritta e scegli i colori che preferisci.', price:3.90, defaultText:"O' PAZZ", maxLength:16, label:'Che ci scriviamo sopra?', placeholder:"Es. O' PAZZ", base:'#d94b4b', ink:'#1e1e1e', image:'cappellino-personalizzato.png', usage:'Segnaposto e/o portachiavi' },
  { id:'quadretto', category:'DAL POST ALLA PARETE', tag:'La frase del cuore', title:'Mini quadretto', description:'Quella frase di Mammà che vorresti incorniciare? Mo se po’! Scegli la scritta e falla diventare il pezzo forte della stanza.', price:7.90, defaultText:'MAMMÀ TENE SEMPE RAGIONE', maxLength:46, label:'Quale frase incorniciamo?', placeholder:'Es. Mammà tene sempe ragione', base:'#c7745c', ink:'#283c57', usage:'Mini quadretto personalizzato' },
  { id:'portachiavi', category:'NAPOLI DA PORTARE', tag:'Sempre con te', title:'Portachiavi 3D', description:'Le battute che condividi su @dicettemamma ora vengono in tasca con te. Un nome o la tua frase preferita: scegli tu.', price:4.90, defaultText:"NUN SI BUON MANC SOTT'UOGLIO", maxLength:30, label:'Quale frase porti in giro?', placeholder:"Es. NUN SI BUON MANC SOTT'UOGLIO", base:'#e13a3a', ink:'#fff9ee', image:'portachiavi-rosso-con-scritta-bianca.png', usage:'Portachiavi personalizzato' }
];
// Palette del marchio neutra e utilizzabile tutto l'anno.
const PALETTE = [
  {name:'Terracotta',hex:'#c7745c'},
  {name:'Blu notte',hex:'#283c57'},
  {name:'Avorio',hex:'#fff9ee'},
  {name:'Oro sabbia',hex:'#caa366'},
  {name:'Rosa antico',hex:'#d7928b'}
];
// Solo il cappellino utilizza la selezione a tema natalizio.
const CHRISTMAS_PALETTE = [
  {name:'Rosso',hex:'#d94b4b'},
  {name:'Bianco',hex:'#fffaf2'},
  {name:'Azzurro',hex:'#8ec7ff'},
  {name:'Nero',hex:'#1e1e1e'},
  {name:'Lilla',hex:'#b79adf'},
  {name:'Grigio',hex:'#9da3af'}
];
const CONFIG = window.DICETTE_CONFIG || {};
const money = value => new Intl.NumberFormat('it-IT',{style:'currency',currency:'EUR'}).format(value);
const byId = id => document.getElementById(id);
const safe = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let artSerial = 0;
let currentProduct = PRODUCTS[0];
let cart = loadCart();
let toastTimeout;

function svgTextLines(text, options={}) {
  const {limit=13, maxLines=3, x=260, y=270, size=30, lineHeight=39, fill='#283c57', weight=800} = options;
  const words=String(text || 'IL TUO NOME').trim().split(/\s+/).filter(Boolean);
  const lines=[];
  for(const word of words){
    if(!lines.length) lines.push(word);
    else if((lines[lines.length-1]+' '+word).length <= limit) lines[lines.length-1] += ' '+word;
    else lines.push(word);
  }
  // Non tagliare mai silenziosamente l'anteprima: adatta il carattere se il testo è lungo.
  const shown=lines.slice(0,maxLines);
  if(lines.length > maxLines){ shown[maxLines-1] = lines.slice(maxLines-1).join(' '); }
  const maxLen=Math.max(...shown.map(x=>x.length),1);
  const font=Math.max(15,Math.min(size,size*(limit/maxLen)));
  const start=y - (shown.length-1)*lineHeight/2;
  return `<text fill="${safe(fill)}" font-family="'DM Sans',Arial,sans-serif" font-weight="${weight}" text-anchor="middle" font-size="${font}" letter-spacing=".3">${shown.map((t,i)=>`<tspan x="${x}" y="${start+i*lineHeight}">${safe(t.toUpperCase())}</tspan>`).join('')}</text>`;
}

function artSvg(type,text,base,ink,mode='card') {
  const id='a'+(++artSerial);
  const bg = mode==='hero' ? '' : `<rect width="520" height="520" fill="${type==='cappellino'?'#f3e2db':type==='quadretto'?'#f0e5d8':'#e8ebf1'}"/><circle cx="438" cy="75" r="125" fill="#fff" opacity=".20"/><circle cx="73" cy="458" r="155" fill="#fff" opacity=".19"/>`;
  const defs=`<defs><filter id="shadow-${id}" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="3" dy="16" stdDeviation="13" flood-color="#182920" flood-opacity=".22"/></filter><linearGradient id="shine-${id}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff" stop-opacity=".24"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".1"/></linearGradient></defs>`;
  let content='';
  if(type==='cappellino'){
    const caption = svgTextLines(text,{x:250,y:363,limit:13,maxLines:1,size:31,fill:ink});
    content=`<g transform="rotate(-8 260 260)" filter="url(#shadow-${id})"><ellipse cx="253" cy="415" rx="188" ry="18" fill="#78644d" opacity=".1"/><path d="M260 108c-14 0-17 12-17 22 0 6 4 12 11 14l14 0c6-3 10-9 10-16 0-10-5-20-18-20Z" fill="none" stroke="#cfaf78" stroke-width="10"/><path d="M115 316c41-103 92-176 141-187 47 14 91 82 141 183-30 48-223 67-282 4Z" fill="${safe(base)}" stroke="#ad9a7c" stroke-opacity=".5" stroke-width="2"/><path d="M115 316c41-103 92-176 141-187 47 14 91 82 141 183-30 48-223 67-282 4Z" fill="url(#shine-${id})"/><path d="M256 132c17 49 45 104 111 130" fill="none" stroke="#fff" opacity=".13" stroke-width="12" stroke-linecap="round"/><circle cx="402" cy="313" r="37" fill="#fff9ea" stroke="#e8dfcf" stroke-width="3"/><path d="M385 291c15 17 21 33 18 55" fill="none" stroke="#d6c8b5" stroke-width="3" opacity=".75"/><path d="M93 321c86-23 226-22 313 0l-5 63c-87 12-219 12-305-2l-3-61Z" fill="#fff8eb" stroke="#e7d9c6" stroke-width="4"/><path d="M115 329c75-14 194-14 267-1" stroke="#fff" stroke-width="7" fill="none" opacity=".8"/>${caption}</g>`;
  } else if(type==='quadretto'){
    const caption=svgTextLines(text,{x:260,y:275,limit:16,maxLines:3,size:28,lineHeight:37,fill:ink});
    content=`<g filter="url(#shadow-${id})" transform="rotate(-5 260 260)"><rect x="93" y="106" width="334" height="314" rx="13" fill="#6c4b39" opacity=".4"/><rect x="85" y="96" width="342" height="313" rx="13" fill="${safe(base)}"/><rect x="85" y="96" width="342" height="313" rx="13" fill="url(#shine-${id})"/><rect x="109" y="121" width="295" height="262" rx="4" fill="#fffaf0" stroke="#cfbfa9" stroke-width="4"/><rect x="125" y="136" width="263" height="232" rx="2" fill="#faf5e9"/><path d="M112 127h291M110 380h294" stroke="#5b3730" stroke-width="2" opacity=".23"/><path d="M140 156c8-11 21-13 29-14M378 353c-6 8-16 12-27 13" fill="none" stroke="#c8aa76" stroke-width="2" opacity=".6"/>${caption}<circle cx="260" cy="173" r="3" fill="#bc9b65"/><path d="M218 332c26-6 60-6 85 0" stroke="#d0b47f" stroke-width="1.5" fill="none"/></g>`;
  } else {
    const caption=svgTextLines(text,{x:281,y:286,limit:15,maxLines:2,size:28,lineHeight:36,fill:ink});
    content=`<g filter="url(#shadow-${id})" transform="rotate(-10 260 260)"><circle cx="116" cy="186" r="53" stroke="#b4b9ae" stroke-width="13" fill="none"/><circle cx="116" cy="186" r="44" stroke="#f6faf5" stroke-width="3" fill="none"/><path d="M155 213 202 241" stroke="#a6b3aa" stroke-width="15" stroke-linecap="round"/><path d="M155 211 202 239" stroke="#f0f5ee" stroke-width="3" stroke-linecap="round"/><rect x="158" y="208" rx="42" width="302" height="157" fill="#17332b" opacity=".26"/><rect x="149" y="197" rx="42" width="302" height="157" fill="${safe(base)}" stroke="#ffffff" stroke-opacity=".6" stroke-width="4"/><rect x="149" y="197" rx="42" width="302" height="157" fill="url(#shine-${id})"/>${caption}<circle cx="179" cy="274" r="8" stroke="#fffbf3" stroke-opacity=".75" stroke-width="3" fill="#d2d7c9" opacity=".8"/><path d="M208 215h182" stroke="#fff" opacity=".18" stroke-width="4" stroke-linecap="round"/></g>`;
  }
  return `<svg viewBox="0 0 520 520" xmlns="http://www.w3.org/2000/svg" role="presentation" focusable="false" aria-hidden="true">${defs}${bg}${content}</svg>`;
}


function livePreviewMarkup(product,text,baseColor,inkColor){
  if(product.image){
    const baseLabel = product.id==='cappellino' ? 'Colore cappellino' : product.id==='portachiavi' ? 'Colore base' : 'Colore cornice';
    return `<div class="real-preview-card"><div class="real-preview-label">Anteprima prodotto</div><img class="real-preview-photo" src="${safe(product.image)}" alt="${safe(product.title)}"><div class="real-preview-summary"><div><strong>Scritta:</strong> ${safe(text.toUpperCase())}</div><div><strong>${safe(baseLabel)}:</strong> ${safe(colorName(baseColor))}</div><div><strong>Colore scritta:</strong> ${safe(colorName(inkColor))}</div>${product.usage?`<div><strong>Uso:</strong> ${safe(product.usage)}</div>`:''}</div><p>Anteprima illustrativa: la scritta e i colori scelti vengono riportati nella tua richiesta.</p></div></div>`;
  }
  return artSvg(product.id,text,baseColor,inkColor);
}

function renderCards(){
  byId('heroArt').innerHTML=artSvg('quadretto','MAMMÀ TENE SEMPE RAGIONE', '#c7745c','#283c57','hero');
  byId('productsGrid').innerHTML=PRODUCTS.map(product=>`<article class="product-card" data-product="${product.id}"><div class="product-visual" role="img" aria-label="Anteprima di ${safe(product.title)}">${product.image ? `<img class="product-photo-real" src="${safe(product.image)}" alt="${safe(product.title)}" loading="lazy">` : artSvg(product.id,product.defaultText,product.base,product.ink)}<span class="product-chip">${safe(product.tag)}</span></div><div class="product-body"><span class="product-category">${safe(product.category)}</span><h3>${safe(product.title)}</h3><p>${safe(product.description)}</p><div class="product-action-row"><div class="product-price"><small>Da</small>${money(product.price)}</div><button class="product-open" type="button" data-open="${product.id}" aria-label="Personalizza ${safe(product.title)}">Scegli la frase ↗</button></div></div></article>`).join('');
  document.querySelectorAll('[data-open]').forEach(button=>button.addEventListener('click',()=>openProduct(button.dataset.open)));
}
function swatchOptions(group,selected){
 const colors = currentProduct.id==='cappellino' ? CHRISTMAS_PALETTE : PALETTE;
 return colors.map((color,index)=>`<label class="swatch-label"><input type="radio" name="${group}" value="${color.hex}" ${color.hex===selected?'checked':''} aria-label="${color.name}"><span class="swatch-dot" style="--swatch:${color.hex}" aria-hidden="true"></span><span>${color.name}</span></label>`).join('');
}
function openProduct(id){
  currentProduct=PRODUCTS.find(p=>p.id===id)||PRODUCTS[0];
  byId('customTitle').textContent=currentProduct.title;
  byId('customDescription').textContent=currentProduct.description;
  byId('customTextLabel').textContent=currentProduct.label;
  byId('customText').placeholder=currentProduct.placeholder;
  byId('customText').maxLength=currentProduct.maxLength;
  byId('customText').value=currentProduct.defaultText;
  byId('customQuantity').value='1';byId('customNote').value='';
  byId('baseSwatches').innerHTML=swatchOptions('base',currentProduct.base);
  byId('inkSwatches').innerHTML=swatchOptions('ink',currentProduct.ink);
  updatePreview();
  byId('customizeDialog').showModal();
  byId('customText').focus();
  analytics('view_item',{items:[{item_id:id,item_name:currentProduct.title,price:currentProduct.price}]});
}
function updatePreview(){
  const f=byId('customForm');
  const base=f.elements.base?.value||currentProduct.base;
  const ink=f.elements.ink?.value||currentProduct.ink;
  const text=byId('customText').value||'LA TUA FRASE';
  byId('customPreview').innerHTML=livePreviewMarkup(currentProduct,text,base,ink);
  byId('customPrice').textContent=money(currentProduct.price*getQuantity());
  byId('textCounter').textContent=`${byId('customText').value.length}/${currentProduct.maxLength} caratteri · questa è un’anteprima`;
}
function getQuantity(){const n=Number(byId('customQuantity').value);return Number.isFinite(n)?Math.min(50,Math.max(1,Math.round(n))):1;}
function addItem(event){
  event.preventDefault();
  const form=byId('customForm');
  if(!form.reportValidity())return;
  const text=byId('customText').value.trim();
  if(!text){byId('customText').focus();return;}
  const base=form.elements.base.value, ink=form.elements.ink.value, note=byId('customNote').value.trim();
  const qty=getQuantity();
  const key=[currentProduct.id,text,base,ink,note].join('|');
  const match=cart.find(item=>item.key===key);
  if(match)match.qty=Math.min(50,match.qty+qty);
  else cart.push({key,id:currentProduct.id,text,base,ink,note,qty});
  saveCart();
  byId('customizeDialog').close();
  toast('Messo nel carrello! Mo scegli pure il prossimo.');
  analytics('add_to_cart',{currency:'EUR',value:currentProduct.price*qty,items:[{item_id:currentProduct.id,item_name:currentProduct.title,quantity:qty,price:currentProduct.price}]});
  openCart();
}
function loadCart(){try{const items=JSON.parse(localStorage.getItem('dicette_cart_v2')||'[]');if(!Array.isArray(items))return [];return items.filter(i=>PRODUCTS.some(p=>p.id===i.id)&&Number.isInteger(i.qty)&&i.qty>0&&i.qty<=50&&typeof i.text==='string'&&i.text.length<=46&&typeof i.key==='string').slice(0,50);}catch{return [];}}
function saveCart(){try{localStorage.setItem('dicette_cart_v2',JSON.stringify(cart));}catch{}updateCart();}
function updateCart(){
 const count=cart.reduce((s,i)=>s+i.qty,0);
 byId('cartCount').textContent=String(count);
 byId('cartOpen').setAttribute('aria-label',`Apri carrello, ${count} articoli`);
 const total=cart.reduce((s,i)=>s+(PRODUCTS.find(p=>p.id===i.id)?.price||0)*i.qty,0);
 byId('cartTotal').textContent=money(total);
 byId('sendRequestButton').disabled=count===0;
 if(!count){byId('cartContents').innerHTML='<div class="cart-empty"><span aria-hidden="true">♡</span><strong>Qua nun ce sta ancora niente!</strong><p>Scegli una creazione e mettici la tua frase preferita.</p></div>';return;}
 byId('cartContents').innerHTML=cart.map((item,i)=>{
 const product=PRODUCTS.find(p=>p.id===item.id);
 return `<article class="cart-item"><div class="cart-item-art">${product.image ? `<img class=\"cart-item-photo\" src=\"${safe(product.image)}\" alt=\"${safe(product.title)}\">` : artSvg(product.id,item.text,item.base,item.ink)}</div><div><div class="cart-item-name">${safe(product.title)}</div><div class="cart-item-detail">${safe(item.text)}</div><div class="cart-item-detail">Base: ${safe(colorName(item.base))} · Testo: ${safe(colorName(item.ink))}</div>${item.note?`<div class="cart-item-detail">Nota: ${safe(item.note)}</div>`:''}${product.usage?`<div class="cart-item-detail">Uso: ${safe(product.usage)}</div>`:``}<div class="cart-item-footer"><strong>${money(product.price*item.qty)}</strong><div class="qty-tools"><button type="button" data-index="${i}" data-action="minus" aria-label="Riduci quantità ${safe(product.title)}">−</button><span aria-label="Quantità">${item.qty}</span><button type="button" data-index="${i}" data-action="plus" aria-label="Aumenta quantità ${safe(product.title)}">+</button></div></div><button type="button" class="cart-remove" data-index="${i}" data-action="remove">Rimuovi</button></div></article>`;
 }).join('');
}
function colorName(hex){return [...PALETTE,...CHRISTMAS_PALETTE].find(c=>c.hex===hex)?.name||hex;}
function openCart(){updateCart();byId('cartDialog').showModal();}
function cartAction(event){const btn=event.target.closest('button[data-action]');if(!btn)return;const index=Number(btn.dataset.index),item=cart[index];if(!item)return;const action=btn.dataset.action;if(action==='remove')cart.splice(index,1);else if(action==='minus'){item.qty--;if(item.qty<=0)cart.splice(index,1);}else if(action==='plus')item.qty=Math.min(50,item.qty+1);saveCart();}
function sendRequest(){
 if(!cart.length)return;
 const num=String(CONFIG.whatsappNumber||'').replace(/\D/g,'');
 if(!num){toast('Configura il numero WhatsApp in config.js');return;}
 const total=cart.reduce((s,item)=>s+PRODUCTS.find(p=>p.id===item.id).price*item.qty,0);
 const lines=['Ciao Dicette Mammà! Ho scelto queste creazioni dal sito e vorrei conoscerne disponibilità e dettagli:',''];
 cart.forEach((item,i)=>{
  const p=PRODUCTS.find(p=>p.id===item.id);
  lines.push(`${i+1}) ${p.title}`,`   Testo: ${item.text}`,`   Colore base: ${colorName(item.base)}`,`   Colore scritta: ${colorName(item.ink)}`,`   Quantità: ${item.qty}`,`   Prezzo indicativo: ${money(p.price*item.qty)}`);
  if(item.note)lines.push(`   Note: ${item.note}`);lines.push('');
 });
 lines.push(`Totale prodotti indicativo: ${money(total)}`,'Spedizione e disponibilità da confermare.','Questa è solo una richiesta non vincolante: nessun pagamento e nessun ordine confermato.');
 const href=`https://wa.me/${num}?text=${encodeURIComponent(lines.join('\n'))}`;
 analytics('request_via_whatsapp',{currency:'EUR',value:total,items:cart.map(i=>({item_id:i.id,quantity:i.qty}))});
 const win=window.open(href,'_blank','noopener,noreferrer');
 if(!win)window.location.href=href;
}
function toast(message){const el=byId('toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>el.classList.remove('show'),2600);}
function setupAnalytics(){
 const id=CONFIG.ga4MeasurementId;
 if(!/^G-[A-Z0-9]+$/i.test(id||''))return;
 // GA4 non viene caricato senza scelta esplicita: integrare privacy/cookie policy completa prima della messa online.
 const notice=document.createElement('div');notice.className='consent-note';notice.setAttribute('role','dialog');notice.setAttribute('aria-label','Preferenze statistiche');notice.innerHTML='<p>Vuoi consentire le statistiche di utilizzo del sito? Puoi rifiutare e continuare comunque.</p><button type="button" data-consent="no">Rifiuta</button><button type="button" data-consent="yes">Consenti</button>';
 const saved=localStorage.getItem('dicette_analytics_consent');
 if(saved==='yes'){loadAnalytics(id);return;}if(saved==='no')return;
 // Informativa e base giuridica devono essere adattate prima della pubblicazione.
 document.body.appendChild(notice);
 notice.querySelectorAll('[data-consent]').forEach(btn=>btn.addEventListener('click',()=>{const consent=btn.dataset.consent;localStorage.setItem('dicette_analytics_consent',consent);notice.remove();if(consent==='yes')loadAnalytics(id);}));
}
function loadAnalytics(id){const script=document.createElement('script');script.async=true;script.src=`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;document.head.append(script);window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments);};window.gtag('js',new Date());window.gtag('config',id,{anonymize_ip:true});}
function analytics(name,params={}){if(typeof window.gtag==='function')window.gtag('event',name,params);}
function init(){
 renderCards();updateCart();setupAnalytics();
 const menuButton=byId('mobileMenuButton'),nav=byId('mobileNav');
 menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')==='true';menuButton.setAttribute('aria-expanded',String(!open));menuButton.setAttribute('aria-label',open?'Apri il menu':'Chiudi il menu');nav.hidden=open;});
 nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Apri il menu');}));
 byId('cartOpen').addEventListener('click',openCart);
 byId('customForm').addEventListener('submit',addItem);
 for(const evt of ['input','change'])byId('customForm').addEventListener(evt,updatePreview);
 byId('cartContents').addEventListener('click',cartAction);
 byId('sendRequestButton').addEventListener('click',sendRequest);
 byId('continueShopping').addEventListener('click',()=>byId('cartDialog').close());
 document.querySelectorAll('[data-close-custom]').forEach(b=>b.addEventListener('click',()=>byId('customizeDialog').close()));
 document.querySelectorAll('[data-close-cart]').forEach(b=>b.addEventListener('click',()=>byId('cartDialog').close()));
 for(const d of [byId('customizeDialog'),byId('cartDialog')])d.addEventListener('click',e=>{if(e.target===d)d.close();});
}
document.addEventListener('DOMContentLoaded',init);
