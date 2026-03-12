1 - npm install


















teste
<!-- /* ── Mobile menu ── */
  function toggleMenu() {
    const m = document.getElementById('mob-menu');
    m.classList.toggle('hidden');
    m.classList.toggle('flex');
  }


  /* ── GSAP ── */
  gsap.registerPlugin(ScrollTrigger);

  /* ── Set initial hidden states ONLY via gsap.set ── */
  gsap.set('#htitle1, #htitle2', { y: 80, opacity: 0 });
  gsap.set('#play-btn', { scale: 0, opacity: 0 });
  gsap.set('#saiba-wrap', { y: 30, opacity: 0 });
  gsap.set('#p-title', { y: 40, opacity: 0 });
  gsap.set('.p-logo', { y: 50, opacity: 0 });
  gsap.set('#cta-l', { x: -70, opacity: 0 });
  gsap.set('#cta-r', { x: 70, opacity: 0 });
  gsap.set('#footer-sec', { y: 40, opacity: 0 });

  /* Hero entrance — plays immediately on load */
  const heroTl = gsap.timeline({ delay: 0.15 });
  heroTl
    .to('#htitle1',   { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out' })
    .to('#htitle2',   { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out' }, '-=0.6')
    .to('#play-btn',  { scale: 1, opacity: 1, duration: 0.55, ease: 'back.out(2)' }, '-=0.5')
    .to('#saiba-wrap',{ y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' }, '-=0.35');

  /* Hero parallax bg */
  gsap.to('#hero-bg', {
    yPercent: 28, ease: 'none',
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true }
  });

  /* Partners title */
  gsap.to('#p-title', {
    y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
    scrollTrigger: { trigger: '#parceiros', start: 'top 85%', once: true }
  });

  /* Partner logos stagger */
  gsap.to('.p-logo', {
    y: 0, opacity: 1, duration: 0.65, stagger: 0.13, ease: 'power2.out',
    scrollTrigger: { trigger: '#parceiros', start: 'top 82%', once: true }
  });

  /* CTA left */
  gsap.to('#cta-l', {
    x: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
    scrollTrigger: { trigger: '#cta-sec', start: 'top 80%', once: true }
  });

  /* CTA right */
  gsap.to('#cta-r', {
    x: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
    scrollTrigger: { trigger: '#cta-sec', start: 'top 80%', once: true }
  });

  /* Footer */
  gsap.to('#footer-sec', {
    y: 0, opacity: 1, duration: 0.75, ease: 'power2.out',
    scrollTrigger: { trigger: '#footer-sec', start: 'top 92%', once: true }
  }); -->