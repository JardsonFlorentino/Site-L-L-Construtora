// script.js - Completo e atualizado para LL Construtora

// Menu mobile responsivo
const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav-toggle');

toggle?.addEventListener('click', () => {
  nav.classList.toggle('open');
});

// Fechar menu ao clicar em link
nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

// Scroll suave para âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// WhatsApp flutuante com mensagem inteligente
const whatsButtons = document.querySelectorAll('.whatsapp-button');
const WHATS_NUMBER = '5571999999999'; // Seu número

whatsButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    
    const action = btn.dataset.whatsAction || 'geral';
    let msg = 'Olá! ';
    
    // Mensagem dinâmica
    if (action === 'geral') {
      msg += 'Gostaria de mais informações sobre seus serviços.';
    } else {
      const nome = document.getElementById('nome')?.value || 'Cliente';
      msg += `Sou ${nome} e gostaria de orçamento para ${action}.`;
    }
    
    const encodedMsg = encodeURIComponent(msg);
    window.open(`https://wa.me/${WHATS_NUMBER}?text=${encodedMsg}`, '_blank');
  });
});


// Formulário envia direto pro WhatsApp - LL Construtora
const form = document.getElementById('contactForm');

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const data = new FormData(form);
  const nome = data.get('nome')?.trim();
  const telefone = data.get('telefone')?.trim();
  const tipo = data.get('tipo')?.trim();
  const metragem = data.get('metragem')?.trim();
  const mensagem = data.get('mensagem')?.trim() || 'Sem mensagem adicional';
  
  if (!nome || !telefone || !tipo) {
    alert('Nome, telefone e tipo de obra são obrigatórios!');
    return;
  }
  
  // SEU NÚMERO AQUI (sem espaços, com DDD)
  const numeroWhats = '5571999999999';
  
  // Mensagem PROFISSIONAL formatada
  const msgWhats = `🏗️ *ORÇAMENTO LL CONSTRUTORA*

👤 *Cliente:* ${nome}
📱 *Telefone:* ${telefone}
🏠 *Tipo:* ${tipo}${metragem ? `\n📏 *Metragem:* ${metragem} m²` : ''}
💬 *Mensagem:* ${mensagem}

---
*CNPJ: 14.456.876/0001-51 | CRT03: 14456876000151*`;

  const urlWhats = `https://wa.me/${numeroWhats}?text=${encodeURIComponent(msgWhats)}`;
  
  // Abre WhatsApp AUTOMATICAMENTE
  window.open(urlWhats, '_blank');
  
  // Feedback visual
  const btn = form.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  btn.innerHTML = '✅ Aberto no WhatsApp!';
  btn.disabled = true;
  
  // Salva dados (mantém funcionalidade)
  localStorage.setItem('ll_orcamento', JSON.stringify({nome, telefone, tipo, metragem, mensagem}));
  
  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.disabled = false;
    form.reset();
  }, 2500);
});

// Carregar dados salvos (mantém igual)
window.addEventListener('load', () => {
  const saved = localStorage.getItem('ll_orcamento');
  if (saved) {
    try {
      const data = JSON.parse(saved);
      document.getElementById('nome').value = data.nome || '';
      document.getElementById('telefone').value = data.telefone || '';
      document.getElementById('tipo').value = data.tipo || '';
      document.getElementById('metragem').value = data.metragem || '';
    } catch (e) {}
  }
});


// Animações de scroll (Intersection Observer)
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

// Observar cards para animação
document.querySelectorAll('.project-card, .testimonial, .steps li').forEach(el => {
  observer.observe(el);
});

// Header shrink no scroll
let lastScrollY = 0;
window.addEventListener('scroll', () => {
  const header = document.querySelector('.site-header');
  if (window.scrollY > 50) {
    header.style.background = 'rgba(247, 244, 237, 0.98)';
    header.style.backdropFilter = 'blur(24px)';
  } else {
    header.style.background = 'rgba(247, 244, 237, 0.96)';
    header.style.backdropFilter = 'blur(18px)';
  }
  
  // Hide/show header on scroll direction
  if (window.scrollY > lastScrollY && window.scrollY > 100) {
    header.style.transform = 'translateY(-100%)';
  } else {
    header.style.transform = 'translateY(0)';
  }
  lastScrollY = window.scrollY;
});

// Máscara de telefone (opcional - só se quiser)
document.getElementById('telefone')?.addEventListener('input', (e) => {
  let value = e.target.value.replace(/\D/g, '');
  value = value.replace(/(\d{2})(\d)/, '($1) $2');
  value = value.replace(/(\d)(\d{4})$/, '$1-$2');
  e.target.value = value;
});

// Analytics básico (opcional)
document.addEventListener('click', (e) => {
  if (e.target.matches('.btn-primary, .nav-cta, .project-link')) {
    // Aqui você pode mandar evento para Google Analytics ou similar
    console.log('CTA clicado:', e.target.textContent);
  }
});
