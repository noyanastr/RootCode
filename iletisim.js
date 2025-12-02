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

    const data = {
        ad_soyad: document.getElementById("name").value,
        telefon: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        ogrenci_no: document.getElementById("student").value
    };

    fetch("https://script.google.com/macros/s/AKfycbw89zLqxNVijt6yPBqykCzMe7vZVDqdnP6NDcG1ifc7vV2x1GnzHz6oRnO9B2Dpfk_3pg/exec", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data)
})
.then(r => r.text())
.then(txt => console.log("Response:", txt))
.catch(err => console.error("Fetch error:", err));

});












