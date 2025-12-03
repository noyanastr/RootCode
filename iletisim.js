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
document.getElementById("memberForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const ad_soyad = document.getElementById("name").value;
    const telefon = document.getElementById("phone").value;
    const ogrenci_no = document.getElementById("student").value;
    const email = document.getElementById("email").value;

    const status = document.getElementById("statusMessage");

    const url = "https://script.google.com/macros/s/AKfycbxbUjRTN2rnbVKB237ucv3DyULblK6OGDnO-6Ig9KPkr5NzZjGaioUV02PeOqErrxS20/exec";

    status.textContent = "Gönderiliyor...";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ad_soyad,
                telefon,
                email,
                ogrenci_no
            })
        });

        const result = await response.json();

        if (result.status === "OK") {
            status.textContent = "Başvuru başarılı! Bilgiler kaydedildi.";
            document.getElementById("memberForm").reset();
        } else {
            status.textContent = "Bir hata oluştu.";
        }

    } catch (error) {
        status.textContent = "Bağlantı hatası. Lütfen tekrar deneyin.";
        console.error(error);
    }
});


























