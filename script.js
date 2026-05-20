// Данные для портфолио
const portfolioData = {
  1: {
    title: "Гвозди в кайф",
    client: "Курс",
    date: "Октябрь 2025",
    category: "Запись на курс",
    description: "Разработан сайт для курсов с записью которая заявку кидает в телеграмм бота",
    features: [
      "Система курсов",
      "Навигация по сайту",
      "Галерея с фотографиями",
      "Видео визитка",
      "Прайс"
    ],
    technologies: ["HTML5", "CSS3", "JavaScript"],
    link: "https://freedfamily.ru/",
    images: [
       "icons/главная гв2.jpg",
        "icons/что-то гв.jpg",
        "icons/недели гв.jpg",
        "icons/основатели гв.jpg",
        "icons/прайс гв.jpg"
    ]
  },
  2: {
    title: "Гвозди в кайф Челендж",
    client: "Челлендж",
    date: "Сентябрь 2025",
    category: "Запись на Челлендж",
    description: "Создан сайт для записи на Челлендж где полностью подробно рассказано о нём и запись переносит в электронную таблицу",
    features: [
      "Таймер до начала Челленджа",
      "Подробный рассказ о Челлендже",
      "Отзывы и карусель фоток",
      "Запись на курс"
    ],
    technologies: ["HTML5", "CSS3", "JavaScript"],
    link: "https://freedfamily-challenge.ru/",
    images: [
        "icons/чл.jpg",
        "icons/отзыв чл.jpg",
        "icons/запись чл.jpg",
        "icons/что-то чл.jpg"
    ]
  },
  3: {
    title: "Стройка061",
    client: "Стройка",
    date: "Январь 2026",
    category: "Укладка тротуарной плитки",
    description: "Создан сайт для продажи тротуарной плитки, а так же для укладки тротуарной плитки",
    features: [
      "Главная",
      "Услуги",
      "Портфолио",
      "Заявка"
    ],
    technologies: ["HTML5", "CSS3", "JavaScript"],
    link: "https://stroika061.ru/",
    images: [
       "icons/Главная061.jpg",
        "icons/Заявка061.jpg",
        "icons/Портфолио061.jpg",
        "icons/услуги061.jpg"
    ]
  }
};

// Простая карусель
class PortfolioCarousel {
  constructor() {
    this.track = document.querySelector('.carousel-track');
    this.cards = [];
    this.currentIndex = 0;
    this.init();
  }

  init() {
    this.createCards();
    this.setupControls();
    this.updateCarousel();
  }

  createCards() {
    const carouselTrack = document.querySelector('.carousel-track');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    carouselTrack.innerHTML = '';
    dotsContainer.innerHTML = '';
    
    Object.keys(portfolioData).forEach((id, index) => {
      const project = portfolioData[id];
      
      const card = document.createElement('div');
      card.className = 'carousel-card';
      card.dataset.projectId = id;
      
      card.innerHTML = `
        <div class="carousel-card-date">${project.date}</div>
        <div class="carousel-card-image">
          <img src="${project.images[0]}" alt="${project.title}" loading="lazy">
          <div class="carousel-card-overlay">
            <button class="view-project-btn">
              <i class="fas fa-external-link-alt"></i>
              Смотреть проект
            </button>
          </div>
        </div>
        <div class="carousel-card-content">
          <h3>${project.title}</h3>
          <p>${project.description.substring(0, 80)}...</p>
          <div class="carousel-card-tags">
            ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
          </div>
        </div>
      `;
      
      card.addEventListener('click', (e) => {
        if (!e.target.closest('.view-project-btn')) {
          openProjectModal(id);
        }
      });
      
      this.cards.push(card);
      carouselTrack.appendChild(card);
      
      const dot = document.createElement('button');
      dot.className = `dot ${index === 0 ? 'active' : ''}`;
      dot.dataset.index = index;
      dot.addEventListener('click', () => this.goToSlide(index));
      dotsContainer.appendChild(dot);
    });
  }

  setupControls() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    prevBtn.addEventListener('click', () => this.prevSlide());
    nextBtn.addEventListener('click', () => this.nextSlide());
    
    // Touch support
    let startX = 0;
    this.track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });
    
    this.track.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          this.nextSlide();
        } else {
          this.prevSlide();
        }
      }
    });
  }

  updateCarousel() {
    const cardWidth = this.cards[0].offsetWidth + 15;
    this.track.style.transform = `translateX(-${this.currentIndex * cardWidth}px)`;
    
    document.querySelectorAll('.dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
    });
    
    const progress = ((this.currentIndex + 1) / this.cards.length) * 100;
    document.querySelector('.progress-bar').style.width = `${progress}%`;
  }

  nextSlide() {
    const slidesPerView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
    const maxIndex = this.cards.length - slidesPerView;
    
    if (this.currentIndex < maxIndex) {
      this.currentIndex++;
      this.updateCarousel();
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateCarousel();
    }
  }

  goToSlide(index) {
    const slidesPerView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
    const maxIndex = this.cards.length - slidesPerView;
    
    if (index >= 0 && index <= maxIndex) {
      this.currentIndex = index;
      this.updateCarousel();
    }
  }
}

// Модальное окно проекта
function openProjectModal(projectId) {
  const project = portfolioData[projectId];
  if (!project) return;
  
  const modal = document.getElementById('project-modal');
  const mainImg = document.getElementById('project-main-img');
  const thumbnailsContainer = document.querySelector('.image-thumbnails');
  
  document.getElementById('project-title').textContent = project.title;
  document.getElementById('project-client').textContent = project.client;
  document.getElementById('project-date').textContent = project.date;
  document.getElementById('project-category').textContent = project.category;
  document.getElementById('project-full-description').textContent = project.description;
  
  const projectLink = document.getElementById('project-link');
  projectLink.href = project.link;
  
  const featuresList = document.getElementById('project-features-list');
  featuresList.innerHTML = '';
  project.features.forEach(feature => {
    const li = document.createElement('li');
    li.textContent = feature;
    featuresList.appendChild(li);
  });
  
  const techTags = document.getElementById('project-tech-tags');
  techTags.innerHTML = '';
  project.technologies.forEach(tech => {
    const span = document.createElement('span');
    span.textContent = tech;
    techTags.appendChild(span);
  });
  
  mainImg.src = project.images[0];
  mainImg.alt = project.title;
  
  thumbnailsContainer.innerHTML = '';
  project.images.forEach((img, index) => {
    const thumbnail = document.createElement('img');
    thumbnail.src = img;
    thumbnail.alt = `${project.title} - изображение ${index + 1}`;
    thumbnail.loading = 'lazy';
    
    thumbnail.addEventListener('click', () => {
      mainImg.src = img;
      document.querySelectorAll('.image-thumbnails img').forEach(t => {
        t.classList.remove('active');
      });
      thumbnail.classList.add('active');
    });
    
    if (index === 0) {
      thumbnail.classList.add('active');
    }
    thumbnailsContainer.appendChild(thumbnail);
  });
  
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Мобильное меню
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeBtn = document.querySelector('.mobile-close');
  
  if (menuBtn && mobileMenu && closeBtn) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
    
    closeBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
    
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
      });
    });
    
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
  // Карусель
  const carousel = new PortfolioCarousel();
  
  // Мобильное меню
  initMobileMenu();
  
  // Модальное окно проекта
  const projectCloseBtn = document.querySelector('.project-close');
  const projectModal = document.getElementById('project-modal');
  
  if (projectCloseBtn) {
    projectCloseBtn.addEventListener('click', closeProjectModal);
  }
  
  if (projectModal) {
    projectModal.addEventListener('click', function(e) {
      if (e.target === this) closeProjectModal();
    });
  }
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeProjectModal();
    }
  });
  
  // Ресайз карусели
  window.addEventListener('resize', function() {
    carousel.updateCarousel();
  });
  
  // Форма
  const TOKEN = '8453522863:AAGG8lNCVUHniBBBvUUDpXRpmcs7j15He4g';
  const CHAT_ID = '-4663600702';
  const API_URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
  
  const form = document.getElementById('contactForm');
  const modal = document.getElementById('modal');
  const modalMessage = document.getElementById('modal-message');
  const closeModal = document.querySelector('.close');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = form.name.value.trim();
      const phone = form.phone.value.trim();
      const message = form.message.value.trim();
      
      if (!name || !phone || !message) {
        modalMessage.innerText = 'Пожалуйста, заполните все поля';
        modal.style.display = 'flex';
        return;
      }
      
      const text = `🛠 Новая заявка с сайта\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n💬 Сообщение: ${message}`;
      
      const submitBtn = form.querySelector('button');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Отправка...';
      submitBtn.disabled = true;
      
      fetch(API_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text
        })
      })
      .then(res => {
        if (res.ok) {
          modalMessage.innerText = '✅ Заявка успешно отправлена! Мы свяжемся с вами.';
          form.reset();
        } else {
          modalMessage.innerText = '❌ Ошибка при отправке. Попробуйте позже.';
        }
        modal.style.display = 'flex';
      })
      .catch(err => {
        console.error(err);
        modalMessage.innerText = '❌ Не удалось отправить заявку. Проверьте соединение.';
        modal.style.display = 'flex';
      })
      .finally(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      });
    });
  }
  
  if (closeModal) {
    closeModal.onclick = function() {
      modal.style.display = 'none';
    };
  }
  
  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
  
  // Плавная прокрутка
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
  
  // Частицы в герое
  function createParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;
    
    container.innerHTML = '';
    const particleCount = window.innerWidth < 768 ? 20 : 40;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 5 + 's';
      particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
      particle.style.opacity = Math.random() * 0.5 + 0.3;
      container.appendChild(particle);
    }
  }
  
  createParticles();
  window.addEventListener('resize', createParticles);
  
  // AOS анимации
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100
    });
  }
});