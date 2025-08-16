
// Smooth scroll for navbar links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); }
  });
});

// Personalize guest name from ?to=
(function(){
  const p = new URLSearchParams(location.search);
  const name = p.get('to');
  if(name){
    document.querySelectorAll('[data-guest]').forEach(el=> el.textContent = name.replace(/\+/g,' '));
  }
})();

// Countdown to Akad
(function(){
  const target = new Date('2025-07-01T08:00:00+07:00').getTime();
  const parts = {
    d: document.querySelector('#cd-days .num'),
    h: document.querySelector('#cd-hours .num'),
    m: document.querySelector('#cd-mins .num'),
    s: document.querySelector('#cd-secs .num'),
  };
  function tick(){
    const now = Date.now();
    let diff = Math.max(0, target - now);
    const d = Math.floor(diff/86400000); diff -= d*86400000;
    const h = Math.floor(diff/3600000); diff -= h*3600000;
    const m = Math.floor(diff/60000); diff -= m*60000;
    const s = Math.floor(diff/1000);
    parts.d.textContent = String(d).padStart(2,'0');
    parts.h.textContent = String(h).padStart(2,'0');
    parts.m.textContent = String(m).padStart(2,'0');
    parts.s.textContent = String(s).padStart(2,'0');
  }
  tick();
  setInterval(tick, 1000);
})();

// RSVP (local only)
document.getElementById('rsvp-form').addEventListener('submit', function(e){
  e.preventDefault();
  const data = Object.fromEntries(new FormData(this).entries());
  const list = JSON.parse(localStorage.getItem('rsvp_list')||'[]');
  list.push({...data, ts: new Date().toISOString()});
  localStorage.setItem('rsvp_list', JSON.stringify(list));
  alert('Terima kasih! RSVP kamu tersimpan di perangkat ini untuk demo.');
  this.reset();
});

// Play/Pause music
const audio = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-toggle');
if(audio && musicBtn){
  function safePlay(){ audio.play().catch(()=>{}); }
  document.addEventListener('click', safePlay, { once:true });
  musicBtn.addEventListener('click', ()=>{
    if(audio.paused){ audio.play(); musicBtn.textContent='⏸️ Pause Music'; }
    else { audio.pause(); musicBtn.textContent='▶️ Play Music'; }
  });
}
