document.addEventListener('DOMContentLoaded', () => {

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

  
  const paragraphs = document.querySelectorAll('.container-1 p, .container-2 p, .container-3 p, .ust p');

  
  if (!paragraphs || paragraphs.length === 0) return;

 
  paragraphs.forEach(p => p.classList.add('fade-in-paragraph'));

  
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -5% 0px',
    threshold: 0.12
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target); 
      }
    });
  }, observerOptions);

  paragraphs.forEach(p => observer.observe(p));

  
  const images = document.querySelectorAll('.fade-in-section');
  images.forEach(img => {
    
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
document.getElementById("memberForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const ad_soyad = document.getElementById("name").value;
    const telefon = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const ogrenci_no = document.getElementById("student").value;

    const url = "https://script.google.com/macros/s/AKfycbzHDE1EAb48SGaz9Z_MQTR4Ca2FCDOJe_4wuK9xYUHgGgTXpsLQLjGMBraZSoGE5-1vFA/exec";

    const params = new URLSearchParams({
        ad_soyad: ad_soyad,
        telefon: telefon,
        email: email,
        ogrenci_no: ogrenci_no
    });

    fetch(`${url}?${params.toString()}`)
        .then(r => r.text())
        .then(txt => {
            console.log("Response:", txt);
            alert("Başarılı! Form verileri Google Sheets'e kaydedildi.");
            document.getElementById("memberForm").reset();
        })
        .catch(err => {
            console.error("Fetch error:", err);
            alert("Bir hata oluştu. Lütfen tekrar deneyin.");
        });

});



















