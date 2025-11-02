document.addEventListener('DOMContentLoaded', () => {
  // Menü / mobil menü
  const menuIcon = document.getElementById('menuIcon');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeBtn = document.getElementById('closeBtn');

  if (menuIcon && mobileMenu) {
    menuIcon.addEventListener('click', () => {
      mobileMenu.classList.add('active');
    });
  }

  if (closeBtn && mobileMenu) {
    closeBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
    });
  }

  // PARAGRAF ANİMASYONU: sadece bu container'lar içindeki <p> etiketleri
  const paragraphs = document.querySelectorAll('.container-1 p, .container-2 p, .container-3 p, .ust p');

  // Eğer hiç öğe yoksa işlemi sonlandır
  if (!paragraphs || paragraphs.length === 0) return;

  // Başlangıç sınıfını ekle (HTML'de zaten ekli olabilir; eklemek güvenlidir)
  paragraphs.forEach(p => p.classList.add('fade-in-paragraph'));

  // IntersectionObserver ayarları (hafif rootMargin ile daha erken tetikleme)
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -5% 0px',
    threshold: 0.12
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target); // sadece bir kere animasyon
      }
    });
  }, observerOptions);

  paragraphs.forEach(p => observer.observe(p));

  // Görüntüler için ayrı observer (resimlerde blur uygulanmıyor)
  const images = document.querySelectorAll('.fade-in-section');
  images.forEach(img => {
    // başlangıç durumu (CSS ile zaten ayarlandı ama burada double-check)
    img.classList.remove('visible');
  });

  if (images.length > 0) {
    const imgObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    images.forEach(img => imgObserver.observe(img));
  }
});
/**/
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    const content = document.getElementById('content');
    
    // Logo kayma süresi (CSS'ten 2000ms)
    const logoAnimationDuration = 2000; 
    
    // Yükleme ekranının sağa kayıp kaybolma süresi (CSS'ten 700ms)
    const hideAnimationDuration = 700; 

    setTimeout(function() {
        
        // 1. Preloader'ı kaybolma moduna geçir (Sağa kayarak yok olma animasyonu başlar)
        preloader.classList.add('preloader-hide');
        
        // 2. Ana içeriğin görünür hale gelme animasyonunu hemen başlat
        // Bu, preloader kaybolmaya başlarken içeriğin alttan gelmesini sağlar.
        content.classList.add('content-show'); 
        
        // 3. Yok olma animasyonu bittikten sonra (0.7 saniye sonra) preloader'ı tamamen kaldır
        setTimeout(function() {
            preloader.style.display = 'none';
        }, hideAnimationDuration); 
        
    }, logoAnimationDuration); // Logo animasyonu bittikten sonra
});
// Cevap kontrolü
document.getElementById("submit").addEventListener("click", function() {
  const correctAnswer = "Kolaydı değil mi? Uzun sürmeyecek merak etme :) HackerLab'e hoşgeldin."; // doğru cevap
  const userAnswer = document.getElementById("answer").value.trim();
  const result = document.getElementById("result");

  if (userAnswer === correctAnswer) {
    result.textContent = "✅ Doğru cevap tebrikler";
    result.style.color = "#00ff7f";
  } else {
    result.textContent = "Yanlış cevap tekrar deneyin";
    result.style.color = "#ff4444";
  }
});

// Dosya indirme butonu
document.getElementById("download-btn").addEventListener("click", function() {
  const link = document.createElement("a");
  link.href = "dosya.pdf"; // indirilecek dosyanın yolu
  link.download = "dosya.pdf"; // indirilecek dosyanın adı
  link.click();
});
