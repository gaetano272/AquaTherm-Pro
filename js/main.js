document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('[data-header]');
  const nav = document.querySelector('[data-nav]');
  const navToggle = document.querySelector('[data-nav-toggle]');
  const revealElements = document.querySelectorAll('.reveal');
  const faqList = document.querySelector('[data-faq-list]');

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if (nav && navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.classList.toggle('no-scroll', isOpen);
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
      });
    });
  }

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });

    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add('is-visible'));
  }

  if (faqList) {
    faqList.querySelectorAll('.faq-item button').forEach((button) => {
      button.addEventListener('click', () => {
        const item = button.closest('.faq-item');
        const isOpen = item.classList.contains('is-open');

        faqList.querySelectorAll('.faq-item').forEach((faqItem) => {
          faqItem.classList.remove('is-open');
          const icon = faqItem.querySelector('button span');
          if (icon) icon.textContent = '+';
        });

        if (!isOpen) {
          item.classList.add('is-open');
          const icon = item.querySelector('button span');
          if (icon) icon.textContent = '−';
        }
      });
    });
  }

  const forms = document.querySelectorAll('form');
  forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const submitButton = form.querySelector('button[type="submit"]');
      if (!submitButton) return;

      const originalText = submitButton.textContent;
      submitButton.textContent = 'Demande prête à être envoyée';
      submitButton.disabled = true;

      setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        form.reset();
      }, 2200);
    });
  });
});
