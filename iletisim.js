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

    fetch("https://script.google.com/macros/s/AKfycbxyPQlVcKZUN17tCdhN2YItqgHjXXUlnOn7HQUh5q8WzTM1Gb6-ZE9DJpSm7k0q6x9IxQ/exec", {
        method: "POST",
        body: JSON.stringify(data)
    })
    .then(res => res.text())
    .then(result => {
        if (result === "OK") {
            document.getElementById("statusMessage").textContent = "Başarılı!";
            document.getElementById("statusMessage").style.color = "lime";
            document.getElementById("memberForm").reset();
        } else {
            document.getElementById("statusMessage").textContent = "Bir hata oluştu: " + result;
            document.getElementById("statusMessage").style.color = "red";
        }
    })
    .catch(err => {
        document.getElementById("statusMessage").textContent = "Bağlantı hatası!";
        document.getElementById("statusMessage").style.color = "red";
    });
});










