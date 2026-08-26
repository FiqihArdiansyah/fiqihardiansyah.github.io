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
});
