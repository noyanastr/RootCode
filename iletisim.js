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
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxfvo03E-LqaK0-nXNoR1UMzAi9KsljYyjqGZ6i3eFTxQCOnqMJHtHgPH5TbnNlf7X_lA/exec"; // örn: https://script.google.com/macros/s/AKfy.../exec

document.getElementById("memberForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const status = document.getElementById("statusMessage");
  status.textContent = "Gönderiliyor...";

  const fd = new FormData();
  fd.append("ad_soyad", document.getElementById("name").value);
  fd.append("telefon", document.getElementById("phone").value);
  fd.append("email", document.getElementById("email").value);
  fd.append("ogrenci_no", document.getElementById("student").value);

  fetch(SCRIPT_URL, {
    method: "POST",
    body: fd  // <-- FormData, Content-Type tarayıcı tarafından otomatik ayarlanır
  })
  .then(response => response.text())
  .then(text => {
    // Script "OK" dönecekse:
    if (text && text.indexOf("OK") !== -1) {
      status.style.color = "green";
      status.textContent = "Başarıyla gönderildi!";
      document.getElementById("memberForm").reset();
    } else {
      status.style.color = "red";
      status.textContent = "Sunucu hatası: " + text;
    }
  })
  .catch(err => {
    console.error("Fetch error:", err);
    status.style.color = "red";
    status.textContent = "Bağlantı hatası. Konsolu kontrol et.";
  });
});





























