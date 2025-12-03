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
document.getElementById("memberForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const url = "https://script.google.com/macros/s/AKfycbxcyBNx-OgTJPvX4DT59mzCTq7cFA1o692t-9P1ktwm_6PvwfA9_-_btIiQAI8mCNazAg/exec";

    const formData = new FormData();
    formData.append("ad_soyad", document.getElementById("name").value);
    formData.append("telefon", document.getElementById("phone").value);
    formData.append("ogrenci_no", document.getElementById("student").value);
    formData.append("email", document.getElementById("email").value);

    fetch(url, {
        method: "POST",
        body: formData
    })
    .then(res => res.text())
    .then(res => {
        document.getElementById("statusMessage").innerText = "Başvurunuz başarıyla iletildi.";
    })
     .catch(err => {
        document.getElementById("statusMessage").innerText = "Başvurunuz başarıyla iletildi.";
    });
});
// deneme001


































