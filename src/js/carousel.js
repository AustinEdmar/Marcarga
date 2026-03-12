  /* Animations */
  gsap.registerPlugin(ScrollTrigger);
  document.querySelectorAll('.fade-up').forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  var fadeObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.style.opacity='1'; e.target.style.transform='none'; }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(function(el) { fadeObs.observe(el); });

  document.querySelectorAll('.stat-num').forEach(function(el) {
    var final = parseInt(el.textContent);
    ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: function() {
      var n=0, step=Math.ceil(final/55);
      var t=setInterval(function(){
        n=Math.min(n+step,final);
        el.innerHTML=n+'<span class="text-gold">+</span>';
        if(n>=final) clearInterval(t);
      },18);
    }});
  });
  gsap.from('h1',{y:40,opacity:0,duration:.9,ease:'power3.out'});

  /* ── Generic Carousel Factory ── */
  function makeCarousel(cfg) {
    var trackEl  = document.getElementById(cfg.trackId);
    var innerEl  = document.getElementById(cfg.innerId);
    var prevBtn  = document.getElementById(cfg.prevId);
    var nextBtn  = document.getElementById(cfg.nextId);
    var dotsWrap = document.getElementById(cfg.dotsId);
    var slides   = innerEl.querySelectorAll('.'+cfg.slideClass);
    var total    = slides.length;
    var current  = 0;
    var GAP      = 3;

    function visCount() {
      var w = window.innerWidth;
      if (cfg.slideClass === 'team-slide') return w < 640 ? 1 : w < 1024 ? 2 : 4;
      return w < 640 ? 1 : w < 1024 ? 2 : 3;
    }

    function setSizes() {
      var vis = visCount();
      var slideW = (trackEl.offsetWidth - GAP*(vis-1)) / vis;
      slides.forEach(function(s){ s.style.width = slideW+'px'; });
    }

    function maxIdx() { return Math.max(0, total - visCount()); }

    function buildDots() {
      dotsWrap.innerHTML = '';
      var pages = maxIdx()+1;
      for (var i=0; i<pages; i++) {
        (function(idx){
          var btn = document.createElement('button');
          btn.style.cssText = 'height:8px;border-radius:99px;border:none;cursor:pointer;transition:all .3s;';
          btn.addEventListener('click', function(){ goTo(idx); });
          dotsWrap.appendChild(btn);
        })(i);
      }
    }

    function goTo(idx) {
      current = Math.max(0, Math.min(idx, maxIdx()));
      var slideW = slides[0].offsetWidth;
      innerEl.style.transform = 'translateX(-'+(current*(slideW+GAP))+'px)';
      dotsWrap.querySelectorAll('button').forEach(function(d,i){
        d.style.width      = i===current ? '24px' : '8px';
        d.style.background = i===current ? cfg.activeColor : cfg.inactiveColor;
      });
    }

    setSizes(); buildDots(); goTo(0);

    prevBtn.addEventListener('click', function(){ goTo(current-1); });
    nextBtn.addEventListener('click', function(){ goTo(current+1); });

    /* swipe */
    var startX=0;
    innerEl.addEventListener('touchstart',function(e){ startX=e.touches[0].clientX; },{passive:true});
    innerEl.addEventListener('touchend',function(e){
      var diff=startX-e.changedTouches[0].clientX;
      if(Math.abs(diff)>40) goTo(current+(diff>0?1:-1));
    });

    window.addEventListener('resize',function(){ setSizes(); buildDots(); goTo(Math.min(current,maxIdx())); });
  }

  makeCarousel({
    trackId:'serv-track', innerId:'serv-inner', prevId:'serv-prev', nextId:'serv-next', dotsId:'serv-dots',
    slideClass:'serv-slide', activeColor:'#1a1a6e', inactiveColor:'rgba(26,26,110,0.2)'
  });

  makeCarousel({
    trackId:'team-track', innerId:'team-inner', prevId:'team-prev', nextId:'team-next', dotsId:'team-dots',
    slideClass:'team-slide', activeColor:'#F5C518', inactiveColor:'rgba(255,255,255,0.25)'
  });