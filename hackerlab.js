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
  const paragraphs = document.querySelectorAll('p'); 
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
const scriptURL = "https://docs.google.com/spreadsheets/d/1J4L8f82fD49TH6_3hkl1M35uLG2ytPCdiIT0WkxQS2s/edit?gid=0#gid=0"; 
const form = document.getElementById("memberForm");
const statusMsg = document.getElementById("statusMessage");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        student: document.getElementById("student").value,
        email: document.getElementById("email").value,
    };
    statusMsg.textContent = "Gönderiliyor...";
    try {
        const res = await fetch(scriptURL, {
            method: "POST",
            body: JSON.stringify(data),
        });
        if (res.ok) {
            statusMsg.textContent = "Başvuru alındı";
            form.reset();
        } else {
            statusMsg.textContent = "Hata oluştu, lütfen tekrar deneyin!";
        }
    } catch (err) {
        statusMsg.textContent = "Bağlantı hatası, internet bağlantınızı kontrol edin!";
    }   
});
