const scriptUrl = 'https://script.google.com/macros/s/AKfycbxpWN4v8RrUutO3brnbGv4oPlVUPQRneGRw1ozxsUNfXbTMWxBYYVqWLgS9fEUi6xtXbA/exec';

// Fungsi Quick Copy Teks Kontak
function copyText(text, label) {
    navigator.clipboard.writeText(text).then(() => {
        Swal.fire({
            title: 'BERHASIL DISALIN',
            text: `${label} (${text}) telah disalin ke clipboard!`,
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
            customClass: {
                popup: 'cyber-swal'
            }
        });
    }).catch(err => {
        console.error('Gagal menyalin: ', err);
    });
}

// 1. Cyberpunk Typewriter Effect for the Subtitle
const textToType = "Web | Android | Desktop Developer";
const typeElement = document.getElementById('typed-text');
let index = 0;

function typeWriter() {
    if (index < textToType.length) {
        typeElement.innerHTML += textToType.charAt(index);
        index++;
        setTimeout(typeWriter, 50); 
    }
}

// 2. Skill Bars Fill Animation
function animateSkillBars() {
    const bars = document.querySelectorAll('.skill-bar-fill');
    bars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        bar.style.width = targetWidth;
    });
}

// 3. Dynamic Visitor Counter (Simulated / LocalStorage based)
function updateVisitorCount() {
    let count = localStorage.getItem('cv_gabriels_views');
    if (!count) {
        count = 1337;
    } else {
        count = parseInt(count) + 1;
    }
    localStorage.setItem('cv_gabriels_views', count);
    const counterEl = document.getElementById('visitor-count');
    if (counterEl) {
        counterEl.innerText = count.toLocaleString('id-ID');
    }
}

// 4. Fetch Reviews Live from Google Spreadsheet
function loadLiveReviews() {
    const container = document.getElementById('dynamic-reviews-container');
    container.innerHTML = '<div style="color: var(--neon-cyan); font-family: \'Share Tech Mono\', monospace; margin-bottom: 15px;">> Memuat ulasan dari server...</div>';

    fetch(scriptUrl)
        .then(response => response.json())
        .then(data => {
            container.innerHTML = '';
            if (data && data.length > 0) {
                data.forEach(rev => {
                    const ratingNum = parseInt(rev.rating) || 5;
                    const stars = '★'.repeat(ratingNum) + '☆'.repeat(5 - ratingNum);
                    const box = document.createElement('div');
                    box.className = 'testimonial-box';
                    box.innerHTML = `
                        <div class="star-rating">${stars}</div>
                        <div class="testimonial-text">"${rev.message}"</div>
                        <div class="testimonial-author">- ${rev.name}</div>
                    `;
                    container.appendChild(box);
                });
            } else {
                container.innerHTML = '<div style="color: var(--text-muted); font-family: \'Share Tech Mono\', monospace; margin-bottom: 15px;">> Belum ada ulasan tersimpan.</div>';
            }
        })
        .catch(error => {
            console.error('Gagal memuat ulasan:', error);
            container.innerHTML = '<div style="color: #ff3366; font-family: \'Share Tech Mono\', monospace; margin-bottom: 15px;">> Gagal memuat ulasan dari server.</div>';
        });
}

// Form submission via Fetch (POST to GAS) + Live Sync
const reviewForm = document.getElementById('review-form');
if (reviewForm) {
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('form-name').value;
        const email = document.getElementById('form-email').value;
        const message = document.getElementById('form-message').value;
        const ratingInput = document.querySelector('input[name="rating_val"]:checked');
        const rating = ratingInput ? parseInt(ratingInput.value) : 5;

        const formData = {
            name: name,
            email: email,
            message: message,
            rating: rating
        };

        fetch(scriptUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(() => {
            Swal.fire({
                title: 'TRANSMISI BERHASIL',
                text: 'Terima kasih! Ulasan & rating Anda telah masuk ke sistem utama.',
                icon: 'success',
                customClass: {
                    popup: 'cyber-swal'
                },
                confirmButtonText: 'KEMBALI KE SISTEM >_'
            });
            reviewForm.reset();
            
            setTimeout(loadLiveReviews, 2000);
        }).catch(error => {
            console.error('Error!', error);
            Swal.fire({
                title: 'GAGAL MENGIRIM',
                text: 'Terjadi kesalahan koneksi ke server.',
                icon: 'error',
                customClass: {
                    popup: 'cyber-swal'
                }
            });
        });
    });
}

// Terminal Interactive Logic
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

if (terminalInput) {
    terminalInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const command = terminalInput.value.trim().toLowerCase();
            
            // Tampilkan input user ke terminal
            const userLine = document.createElement('p');
            userLine.innerHTML = `<span style="color: var(--neon-cyan);">guest@gabriels:~$</span> ${escapeHtml(terminalInput.value)}`;
            terminalOutput.appendChild(userLine);

            // Proses perintah
            const responseLine = document.createElement('p');
            responseLine.style.color = '#a9bada';

            switch(command) {
                case 'help':
                    responseLine.innerHTML = `Perintah yang tersedia:<br>
                    - <span class="cmd-highlight">about</span> : Ringkasan profil singkat<br>
                    - <span class="cmd-highlight">skills</span> : Daftar keahlian utama<br>
                    - <span class="cmd-highlight">projects</span> : Daftar proyek unggulan<br>
                    - <span class="cmd-highlight">contact</span> : Informasi kontak & WhatsApp<br>
                    - <span class="cmd-highlight">clear</span> : Bersihkan layar terminal`;
                    break;
                case 'about':
                    responseLine.innerText = "Software Engineer spesialis Web, Android, & Desktop asal Raas City.";
                    break;
                case 'skills':
                    responseLine.innerText = "JavaScript, React, Node.js, Kotlin, Flutter, C#, MySQL, Firebase, Apps Script.";
                    break;
                case 'projects':
                    responseLine.innerText = "1. Sistem Kasir POS & Loyalty\n2. Financial Monitoring Dashboard (ID STORE)";
                    break;
                case 'contact':
                    responseLine.innerHTML = "Email: ardiansyahfiqih47@gmail.com<br>WA: 085963090921";
                    break;
                case 'clear':
                    terminalOutput.innerHTML = '<p>Terminal dibersihkan. Ketik <span class="cmd-highlight">\'help\'</span> untuk bantuan.</p>';
                    terminalInput.value = '';
                    return;
                case '':
                    responseLine.innerText = '';
                    break;
                default:
                    responseLine.innerHTML = `Perintah tidak dikenal: "${escapeHtml(command)}". Ketik <span class="cmd-highlight">'help'</span> untuk daftar perintah.`;
            }

            terminalOutput.appendChild(responseLine);
            terminalInput.value = '';
            
            // Scroll ke bawah otomatis
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
    });
}

// Helper untuk mencegah XSS pada input terminal
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// Real-Time Clock Function
function updateRealtimeClock() {
    const now = new Date();
    const options = { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: false 
    };
    // Menggunakan format Indonesia
    const timeString = now.toLocaleDateString('id-ID', options);
    const clockEl = document.getElementById('realtime-clock');
    if (clockEl) {
        clockEl.innerText = timeString;
    }
}

// Jalankan fungsi jam setiap 1 detik (1000 ms)
setInterval(updateRealtimeClock, 1000);

// Jalankan semua fungsi saat halaman selesai dimuat dengan aman
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeWriter, 600);
    setTimeout(animateSkillBars, 400);
    updateVisitorCount();
    loadLiveReviews();
    updateRealtimeClock();
});

/* =========================================================
   CYBER CITY INTERACTION LAYER
   ========================================================= */
function initCyberCityEffects() {
    const container = document.querySelector('.container');
    const city = document.querySelector('.cyber-city-bg');

    if (container && city && window.matchMedia('(pointer:fine)').matches) {
        let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
        window.addEventListener('mousemove', (e) => {
            targetX = (e.clientX / window.innerWidth - 0.5) * 8;
            targetY = (e.clientY / window.innerHeight - 0.5) * 5;
        }, { passive: true });

        function animateParallax() {
            currentX += (targetX - currentX) * 0.045;
            currentY += (targetY - currentY) * 0.045;
            city.style.transform = `translate3d(${currentX * 0.45}px, ${currentY * 0.25}px, 0)`;
            container.style.transform = `translate3d(${currentX * 0.12}px, ${currentY * 0.08}px, 0)`;
            requestAnimationFrame(animateParallax);
        }
        animateParallax();
    }

    const huds = document.querySelectorAll('.system-hud');
    const packets = ['PACKET_OK', 'NODE_SYNC', 'FIREWALL_OK', 'TRACE_NONE', 'LIVE_LINK', 'SECURE_NODE'];
    setInterval(() => {
        huds.forEach(hud => {
            const span = hud.querySelector('span');
            if (span) span.textContent = packets[Math.floor(Math.random() * packets.length)];
        });
    }, 2200);
}
window.addEventListener('DOMContentLoaded', initCyberCityEffects);


/* =========================================================
   MOBILE CYBERCITY LIVE EFFECTS
   ========================================================= */
(function initMobileCyberEffects() {
    if (window.innerWidth > 600) return;

    const city = document.querySelector('.cyber-city-bg');
    const container = document.querySelector('.container');
    if (!city || !container) return;

    // Lightweight touch parallax.
    let lastTouchX = 0;
    let lastTouchY = 0;

    window.addEventListener('touchmove', (e) => {
        if (!e.touches || !e.touches[0]) return;

        const touch = e.touches[0];
        lastTouchX = (touch.clientX / window.innerWidth - 0.5) * 5;
        lastTouchY = (touch.clientY / window.innerHeight - 0.5) * 3;

        city.style.transform = `translate3d(${lastTouchX}px, ${lastTouchY}px, 0)`;
    }, { passive: true });

    // Small live packet text in the terminal header.
    const header = document.querySelector('.terminal-header');
    if (header) {
        const labels = ['LIVE', 'SYNC', 'SCAN', 'NODE', 'OK'];
        setInterval(() => {
            const label = labels[Math.floor(Math.random() * labels.length)];
            const live = header.querySelector('.mobile-live-label');

            if (live) {
                live.textContent = label;
            } else {
                const el = document.createElement('span');
                el.className = 'mobile-live-label';
                el.textContent = label;
                el.style.cssText =
                    'margin-left:auto;color:#00ff9d;font:7px "Share Tech Mono",monospace;letter-spacing:1px;text-shadow:0 0 8px #00ff9d;';
                header.appendChild(el);
            }
        }, 1600);
    }
})();


/* ===== RECOMMENDED FEATURE: PROJECT QUICK VIEW =====
   Reuses the existing project cards; no project content is rewritten. */
(function(){
 function init(){
  const cards=document.querySelectorAll('.project-card');
  if(!cards.length)return;
  const modal=document.createElement('div');
  modal.className='cc-project-modal';
  modal.innerHTML='<div class="cc-project-modal-card" role="dialog" aria-modal="true"><button class="cc-project-modal-close" aria-label="Close">×</button><div class="cc-project-modal-kicker">PROJECT_QUICK_VIEW</div><h3 class="cc-project-modal-title"></h3><div class="cc-project-modal-content"></div></div>';
  document.body.appendChild(modal);
  const title=modal.querySelector('.cc-project-modal-title');
  const content=modal.querySelector('.cc-project-modal-content');
  const close=()=>modal.classList.remove('is-open');
  cards.forEach(card=>{
   card.classList.add('cc-project-open');
   card.addEventListener('click',e=>{
    if(e.target.closest('a,button,input,textarea,select'))return;
    const h=card.querySelector('h3');
    title.textContent=h?h.textContent.trim():'PROJECT';
    content.innerHTML='';
    Array.from(card.children).forEach(n=>{
     if(!(n.classList&&n.classList.contains('project-id')))content.appendChild(n.cloneNode(true));
    });
    modal.classList.add('is-open');
   });
  });
  modal.querySelector('.cc-project-modal-close').addEventListener('click',close);
  modal.addEventListener('click',e=>{if(e.target===modal)close()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();

/* ===== VISUAL SECTION REVEAL ===== */
(function(){
 function init(){
  if(!('IntersectionObserver' in window))return;
  const sections=document.querySelectorAll('.section');
  sections.forEach(s=>s.classList.add('cc-reveal'));
  const io=new IntersectionObserver(entries=>{
   entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('cc-visible');io.unobserve(e.target)}});
  },{threshold:.08});
  sections.forEach(s=>io.observe(s));
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();


/* ===== CYBER COMMAND CENTER / CTRL+K SEARCH / LIVE SYSTEM MONITOR ===== */
(function(){
 function boot(){
  if(document.getElementById('cc-command-overlay')) return;
  const overlay=document.createElement('div'); overlay.id='cc-command-overlay'; overlay.innerHTML=`
   <div class="cc-command-box" role="dialog" aria-modal="true" aria-label="Cyber Command Center">
    <div class="cc-command-head"><span>CYBER_COMMAND_CENTER</span><button type="button" id="cc-command-close">×</button></div>
    <div class="cc-command-status">TYPE A COMMAND OR SEARCH THE PORTFOLIO</div>
    <input id="cc-command-input" autocomplete="off" spellcheck="false" placeholder="help / projects / reviews / contact...">
    <div id="cc-command-results"></div>
    <div class="cc-command-hints">↑ ↓ navigate · ENTER execute · ESC close</div>
   </div>`;
  document.body.appendChild(overlay);
  const input=overlay.querySelector('#cc-command-input'), results=overlay.querySelector('#cc-command-results');
  const commands={
   help:['Show available commands'],about:['Open profile'],profile:['Open profile'],projects:['Open project database'],skills:['Open skills'],reviews:['Open reviews'],contact:['Open contact'],system:['Show system monitor'],clear:['Clear search results']
  };
  function open(){overlay.classList.add('open'); input.value=''; render(''); setTimeout(()=>input.focus(),30)}
  function close(){overlay.classList.remove('open')}
  function targetWords(s){
   const q=s.toLowerCase();
   if(['about','profile'].includes(q)) return '.section:nth-of-type(1)';
   if(q==='projects') return '.project-card';
   if(q==='skills') return '.skill-grid';
   if(q==='reviews') return '.testimonial-box';
   if(q==='contact') return '.contact-grid';
   return null;
  }
  function execute(q){
   q=q.trim().toLowerCase(); if(!q)return;
   if(q==='clear'){results.innerHTML='';return}
   if(q==='system'){ close(); document.getElementById('cc-system-monitor')?.classList.add('open'); return; }
   const sel=targetWords(q);
   if(sel){close(); const el=document.querySelector(sel); if(el){el.scrollIntoView({behavior:'smooth',block:'center'}); el.classList.add('cc-command-focus'); setTimeout(()=>el.classList.remove('cc-command-focus'),1200)} return; }
   const matches=Object.entries(commands).filter(([k])=>k.includes(q)||q.includes(k));
   if(matches.length){execute(matches[0][0]);return}
   render(q);
  }
  function render(q){
   const list=Object.entries(commands).filter(([k,v])=>!q||k.includes(q)||v[0].toLowerCase().includes(q)).slice(0,8);
   results.innerHTML=list.length?list.map(([k,v])=>`<button type="button" class="cc-cmd-item" data-cmd="${k}"><b>${k}</b><span>${v[0]}</span></button>`).join(''):`<div class="cc-cmd-empty">NO COMMAND MATCH</div>`;
   results.querySelectorAll('[data-cmd]').forEach(b=>b.addEventListener('click',()=>execute(b.dataset.cmd)));
  }
  input.addEventListener('input',()=>render(input.value)); input.addEventListener('keydown',e=>{if(e.key==='Enter')execute(input.value);if(e.key==='Escape')close()});
  overlay.querySelector('#cc-command-close').addEventListener('click',close); overlay.addEventListener('click',e=>{if(e.target===overlay)close()});
  document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();open()} if(e.key==='Escape')close()});
  const button=document.createElement('button'); button.className='cc-search-fab'; button.type='button'; button.innerHTML='⌕ <span>CTRL+K</span>'; button.title='Cyber Command Center'; button.addEventListener('click',open); document.body.appendChild(button);

  const monitor=document.createElement('div'); monitor.id='cc-system-monitor'; monitor.innerHTML=`<div class="cc-monitor-card"><button class="cc-monitor-close">×</button><div class="cc-monitor-title">LIVE_SYSTEM_MONITOR</div><div class="cc-monitor-grid"><div><i></i>CORE <b>ONLINE</b></div><div><i></i>NETWORK <b>STABLE</b></div><div><i></i>REVIEW API <b>READY</b></div><div><i></i>PORTFOLIO <b>ACTIVE</b></div></div><div class="cc-monitor-clock" id="cc-monitor-clock"></div></div>`; document.body.appendChild(monitor);
  monitor.querySelector('.cc-monitor-close').addEventListener('click',()=>monitor.classList.remove('open'));
  function tick(){const d=new Date(); const el=document.getElementById('cc-monitor-clock'); if(el)el.textContent='LOCAL NODE // '+d.toLocaleTimeString();} tick(); setInterval(tick,1000);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();

/* =========================================================
   REVIEW SCROLL FALLBACK
   Detects the populated review feed without changing its data.
   ========================================================= */
(function(){
    function applyReviewScroll(){
        const candidates = [
            '#review-list',
            '.reviews-list',
            '.review-list',
            '.testimonials-list',
            '#reviews-container'
        ];

        let el = null;
        for (const selector of candidates) {
            const found = document.querySelector(selector);
            if (found) { el = found; break; }
        }

        if (!el) return;

        el.style.maxHeight = window.innerWidth <= 700 ? '340px' : '420px';
        el.style.overflowY = 'auto';
        el.style.overflowX = 'hidden';
        el.style.overscrollBehavior = 'contain';
        el.style.scrollbarWidth = 'thin';
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyReviewScroll, {once:true});
    } else {
        applyReviewScroll();
    }

    window.addEventListener('resize', applyReviewScroll, {passive:true});
})();
