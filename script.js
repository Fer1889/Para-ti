(function () {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  /*dimensiones para la pagina*/
  const maxW   = Math.min(vw * 0.82, 320);
  const envW   = Math.round(maxW);
  const envH   = Math.round(envW * 0.655);
  const halfW  = Math.round(envW / 2);
  const flapH  = Math.round(envH * 0.565);
  const sideH  = Math.round(envH / 2);
  const botH   = Math.round(envH * 0.555);
  const paperUp = -(envH * 0.78);

  const root = document.documentElement;
  root.style.setProperty('--env-w',   envW  + 'px');
  root.style.setProperty('--env-h',   envH  + 'px');
  root.style.setProperty('--half-w',  halfW + 'px');
  root.style.setProperty('--flap-h',  flapH + 'px');
  root.style.setProperty('--side-h',  sideH + 'px');
  root.style.setProperty('--bot-h',   botH  + 'px');
  root.style.setProperty('--paper-up', paperUp + 'px');

 
  document.getElementById('seal').style.top = flapH + 'px';


  // escala para el corazón de flores

  const available = Math.min(vw, vh);
  const SCALE = available * 0.38;  

  const sparklesEl = document.getElementById('sparkles');
  const count = vw < 400 ? 35 : 55;
  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.className = 'sparkle';
    const sz = 1 + Math.random() * 2.5;
    s.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;` +
      `--d:${2+Math.random()*4}s;--delay:${Math.random()*5}s;` +
      `--op:${0.25+Math.random()*0.5};width:${sz}px;height:${sz}px;`;
    sparklesEl.appendChild(s);
  }

 //funcion para armar el corazón con flores
  function heartXY(t) {
    const x =  16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5*Math.cos(2*t) - 2*Math.cos(3*t) - Math.cos(4*t));
    return { x: x * SCALE / 16, y: y * SCALE / 16 };
  }

  
  const pw = Math.max(12, Math.round(SCALE * 0.078));
  const ph = Math.max(36, Math.round(SCALE * 0.225));
  const cw = Math.max(16, Math.round(pw * 1.2));

  const palettes = [
    { petal:'#f07090', center:'#f9c74f' },
    { petal:'#e85575', center:'#f8b739' },
    { petal:'#f4849a', center:'#fcd34d' },
    { petal:'#d94060', center:'#f59e0b' },
    { petal:'#f9a8b8', center:'#fbbf24' },
  ];

  const HC = document.getElementById('heartContainer');
  const COUNT = vw < 360 ? 18 : 22;

  for (let i = 0; i < COUNT; i++) {
    const t = (i / COUNT) * 2 * Math.PI;
    const { x, y } = heartXY(t);
    const pal = palettes[i % palettes.length];

    const fl = document.createElement('div');
    fl.className = 'flower';
    fl.style.cssText = `left:${x}px;top:${y}px;animation-delay:${i*0.065}s;`;

    let html = '';
    const angles = [0,30,60,90,120,150,180,210,240,270,300,330];
    for (const a of angles) {
      html += `<div class="petal" style="
        background:${pal.petal};
        width:${pw}px;height:${ph}px;
        left:${-pw/2}px;top:${-ph}px;
        transform:rotate(${a}deg);
      "></div>`;
    }
    html += `<div class="petal center" style="
      background:${pal.center};
      width:${cw}px;height:${cw}px;
      left:${-cw/2}px;top:${-cw/2}px;
    "></div>`;
    fl.innerHTML = html;
    HC.appendChild(fl);
  }

  //funcionalidad para abrir la carta 
  const scene = document.getElementById('letterScene');
  const hint  = document.getElementById('hint');

  scene.addEventListener('click', () => {
    if (scene.classList.contains('open')) return;
    scene.classList.add('open');
    HC.classList.add('show');
    hint.classList.add('gone');
  });
})();