const nav = document.querySelector('#navigation');
const menu = document.querySelector('.menu-toggle');
menu.addEventListener('click', () => {const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
let mode='color', currentCard;
const artDialog=document.querySelector('#art-dialog');
function updateArt(){artDialog.querySelector('h3').textContent=currentCard.dataset.title;const img=artDialog.querySelector('img');img.src=`${currentCard.dataset[mode]}.webp`;img.alt=currentCard.dataset.title+(mode==='line'?' — незакрашенная страница':' — цветной пример');document.querySelector('#dialog-switch').textContent=mode==='color'?'Посмотреть без цвета':'Посмотреть в цвете'}
function openDialog(dialog){dialog.showModal();document.body.classList.add('modal-open')}
function setMode(view){mode=view;document.querySelectorAll('[data-view]').forEach(b=>{const active=b.dataset.view===view;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});document.querySelectorAll('.art-card').forEach(card=>{const img=card.querySelector('img');img.src=`${card.dataset[view]}.webp`;img.alt=card.dataset.title+(view==='line'?' — незакрашенная страница':' — цветной пример')})}
document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.view)));
document.querySelectorAll('.art-card').forEach(card=>card.addEventListener('click',()=>{currentCard=card;updateArt();openDialog(artDialog)}));
document.querySelector('#dialog-switch').addEventListener('click',()=>{setMode(mode==='color'?'line':'color');updateArt()});
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelector('.close').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}})});
document.querySelector('#reserve-button').addEventListener('click',()=>openDialog(document.querySelector('#reserve-dialog')));
document.querySelector('#copy').addEventListener('click',async()=>{const message=document.querySelector('#message');const status=document.querySelector('.status');try{if(!navigator.clipboard)throw Error();await navigator.clipboard.writeText(message.value);status.textContent='Сообщение скопировано. Теперь отправь его в Telegram 🤍'}catch{message.focus();message.select();status.textContent='Текст выделен. Скопируй его вручную и отправь в Telegram.'}});
