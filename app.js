const API = location.origin;
let mothers = [];
async function loadMothers(){
  const box=document.getElementById('mothers');
  if(!box) return;
  try{
    const r=await fetch(API+'/api/mothers'); mothers=await r.json();
    box.innerHTML=mothers.map(m=>`
      <div class="card">
        <h2>👩‍🍳 ${m.name}</h2>
        <p>${m.kitchen} · ${m.area||''}</p>
        <p>⭐ ${m.rating} (${m.reviews} reviews)</p>
        <span class="badge">${m.remaining??0} tiffins remaining</span>
        <p>🕐 Collection: ${m.collection_time||'Not set'}</p>
        <button class="btn" onclick="viewMother(${m.id})">View Menu</button>
      </div>`).join('');
  }catch(e){box.innerHTML='<div class="card">Server not connected.</div>'}
}
async function viewMother(id){
  const r=await fetch(API+'/api/mothers/'+id); const d=await r.json();
  document.getElementById('details').innerHTML=`
    <div class="card"><h2>🍱 ${d.mother.name}</h2>
    <p>⭐ ${d.mother.rating} · ${d.mother.reviews} reviews</p>
    <h3>Today's Menu</h3>
    ${d.menu.map(x=>`<p><b>${x.food_name}</b> — ₹${x.price} <button class="btn" onclick="book(${d.mother.id},${x.id})">Book</button></p>`).join('')}
    <p>Available: <b>${d.daily?.total-(d.daily?.booked||0)||0}</b> · Collection: ${d.daily?.collection_time||'-'}</p></div>`;
  scrollTo({top:document.getElementById('details').offsetTop,behavior:'smooth'});
}
async function book(mid,menu){
  const name=prompt('Customer name'); if(!name)return;
  const mobile=prompt('Mobile number'); if(!mobile)return;
  const qty=parseInt(prompt('Number of tiffins','1')||'1'); if(!qty)return;
  const r=await fetch(API+'/api/book',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({customer_name:name,customer_mobile:mobile,mother_id:mid,menu_id:menu,quantity:qty})});
  const d=await r.json(); alert(r.ok?`Booking created: #${d.order_id}. Amount ₹${d.amount}. Payment integration comes next.`:d.detail);
  loadMothers();
}
function connectLive(){
  try{
    const ws=new WebSocket((location.protocol==='https:'?'wss://':'ws://')+location.host+'/ws');
    ws.onmessage=()=>loadMothers(); ws.onclose=()=>setTimeout(connectLive,3000);
    ws.onopen=()=>ws.send('live');
  }catch(e){}
}
loadMothers(); connectLive();
