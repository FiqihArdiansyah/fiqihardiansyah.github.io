const scriptUrl = 'https://script.google.com/macros/s/AKfycbxpWN4v8RrUutO3brnbGv4oPlVUPQRneGRw1ozxsUNfXbTMWxBYYVqWLgS9fEUi6xtXbA/exec';

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
            
            // Refresh ulasan setelah beberapa detik agar masuk ke spreadsheet & tampil
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

// Jalankan semua fungsi saat halaman selesai dimuat dengan aman
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeWriter, 600);
    setTimeout(animateSkillBars, 400);
    updateVisitorCount();
    loadLiveReviews();
});
