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
