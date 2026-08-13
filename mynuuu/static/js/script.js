/* ============================================================
   BIRTHDAY SURPRISE — script.js  (Fixed version)
   Password: "she is my wife"
   ============================================================ */
/* Helpers*/
var heartPages = ['welcome','birthdayBlast', 'cakeSection','loveMessage',
  'passwordSection','memories','questionSection','heartExplosion',
  'bubuLove', 'warningSection','kissSection'];
var continuousHeartsInterval =null;
function startContinuousHearts() {
  if(continuousHeartsInterval)  return;
  continuousHeartsInterval = setInterval(function() {
    spawnSideHearts();
  }, 800);
}
function spawnSideHearts(){
  var container= document.getElementById('hearts');
  var emojis =['❤️','💕','💗','💖','💓','💞','💝','🌹'];

  var L =document.createElement('div');
  L.classList.add('heart');
  L.textContent=emojis[Math.floor(Math.random()*emojis.length)];
  L.style.left=(Math.random()*12)+'%';
  L.style.fontSize=(18+Math.random()*22)+'px';
  var durL =3+Math.random()*3;
  L.style.animationDuration= durL+'s';
  L.style.animationDelay= (Math.random()*0.5)+'s';
  container.appendChild(L);
  setTimeout(function(){ if(L.parentNode) L.parentNode.removeChild(L); }, (durL+1)*1000);
  
  var R =document.createElement('div');
  R.classList.add('heart');
  R.textContent=emojis[Math.floor(Math.random()*emojis.length)];
  R.style.left=(88+Math.random()*11)+'%';
  R.style.fontSize=(18+Math.random()*22)+'px';
  var durR =3+Math.random()*3;
  R.style.animationDuration= durR+'s';
  R.style.animationDelay= (Math.random()*0.5)+'s';
  container.appendChild(R);
  setTimeout(function(){ if(R.parentNode) R.parentNode.removeChild(R); }, (durR+1)*1000);
}
function stopContinuousHearts(){
  clearInterval(continuousHeartsInterval);
  continuousHeartsInterval=null;
}
function show(id) {
  var el=document.getElementById(id);
  el.classList.remove('hidden');
  void el.offsetWidth;
  el.classList.add('fadeIn');
  if(heartPages.indexOf(id)!== -1) {
    startContinuousHearts();
    if(id === 'questionSection') {
      spawnSideHearts();
      spawnSideHearts();
      spawnSideHearts();
    }
  } else{
    stopContinuousHearts();
  }
}
function hide(id) {
  document.getElementById(id).classList.add('hidden');
}
function goTo(from, to, delay) {
  delay= delay || 0;
  setTimeout(function () {
    hide(from);
    show(to);
  }, delay);
}
/*var bgMusic =document.getElementById('bgMusic');
document.addEventListener('click', function() {
  if(bgMusic.paused) bgMusic.play().catch(function() {});
}, {once: true}); */

function tryPlayMusic(){
  if(bgMusic.paused){
    bgMusic.volume = 0.6;
    bgMusic.play().catch(function(){});
  }
}
// Try on first click anywhere
document.addEventListener('click', tryPlayMusic, { once: true });
// Also try when start button clicked
document.getElementById('startBtn').addEventListener('click', tryPlayMusic);
/*bgMusic.onplay = function () {
    console.log("Music started!");
};*/
/* Page1- Welcome*/
spawnHearts(50);
document.getElementById('startBtn').addEventListener('click',function(){
  bgMusic.play().catch(function() {} );
  goTo('welcome', 'countdownSection');
  startCountdown();
});
/* Page2 -Countdown */
function startCountdown() {
  var num=document.getElementById('countNumber');
  var count =3;
  num.textContent =count;
  var iv= setInterval(function() {
    count--;
    if(count> 0) {
      num.textContent =count;
      num.style.animation= 'none';
      void num.offsetWidth;
      num.style.animation= 'pulse 1s infinite';
    } else {
      clearInterval(iv);
      num.textContent ='🎉';
      setTimeout(function() {
        hide('countdownSection');
        show('birthdayBlast');
        startBirthdayBlast();
      }, 800);
    }
  }, 1000);
}

/* Page 3: Birthday Blast */
function startBirthdayBlast() {
  launchFireworks();
  spawnConfetti(70);
  spawnBalloons(14);
  spawnHearts(25);
}
document.getElementById('cakeBtn').addEventListener('click',function(){
  stopFireworks();
  goTo('birthdayBlast', 'cakeSection');
});

/* Page 4: Cake */
var cakeCut = false;
var touchStartX =0;
var touchStartY =0;
var cakeEl =document.querySelector('.cake');
cakeEl.addEventListener('touchstart', function(e) {
  touchStartX =e.touches[0].clientX;
  touchStartY= e.touches[0].clientY;
}, {passive:true});
cakeEl.addEventListener('touchend', function(e) {
  var diffX =e.changedTouches[0].clientX -touchStartX;
  var diffY = e.changedTouches[0].clientY - touchStartY;
  if(Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
    doCutCake();
  }
});
var mouseStartX =0;
var mouseDown =false;
cakeEl.style.cursor ='grab';

cakeEl.addEventListener('mousedown', function(e) {
  mouseDown=true;
  mouseStartX = e.clientX;
  cakeEl.style.cursor ='grabbing';
});
cakeEl.addEventListener('mouseup', function(e) {
  if(!mouseDown) return;
  mouseDown =false;
  cakeEl.style.cursor='grab';
  var diffX= e.clientX - mouseStartX;
  if(Math.abs(diffX) > 50) doCutCake();
});

document.getElementById('cutCakeBtn').style.display ='none';
var hint =document.createElement('p');
hint.textContent ='👆 Swipe the cake to cut it!';
hint.style.cssText= 'color:#fff; font-size:20px; margin-top:20px;animation: floatUpDown 1.5s ease-in-out infinite alternate; text-shadow:0 0 10px hotpink;';
document.querySelector('.cakeContainer').appendChild(hint);

function doCutCake() {
  if(cakeCut) return;
  cakeCut=true;
  hint.style.display ='none';
  var candles = document.querySelectorAll('.candle');
  var cakeTop= document.querySelector('.cake-top');
  var cakeBot = document.querySelector('.cake-bottom');
  var candlesRow = document.querySelector('.candles-row');

  candles.forEach(function(c) {
    c.style.transition = 'opacity .4s';
    c.style.opacity ='0';
  }) ;

  cakeEl.style.animation= 'none';
  cakeEl.style.transition = 'transform .15s  ease';
  cakeEl.style.transform ='scale(1.04)';

  setTimeout(function(){
    cakeEl.style.transform ='scale(1)';
  }, 150 );

  setTimeout(function(){
    cakeTop.style.transition = 'transform .5s cubic-bezier(.4,0,.2,1), opacity .5s';
    cakeBot.style.transition = 'transform .5s cubic-bezier(.4,0,.2,1), opacity .5s';
    candlesRow.style.transition = 'transform .5s ease, opacity .5s';
    cakeTop.style.transform ='translateX(-120px) translateY(-30px) rotate(-18deg)';
    cakeBot.style.transform = 'translateX(120px) translateY(20px) rotate(12deg)';
    candlesRow.style.transform = 'translateX(-100px) translateY(-50px) rotate(-20deg)';
    spawnHearts(30);
    spawnConfetti(25);
  }, 300);

  setTimeout(function() {
    cakeTop.style.opacity ='0';
    cakeBot.style.opacity ='0';
    candlesRow.style.opacity ='0';
  }, 2000);

  setTimeout(function() {
    goTo('cakeSection', 'loveMessage');
  }, 2600);
}

/* Page : 25 Years */
document.getElementById('chatBtn').addEventListener('click', function() {
  goTo('loveMessage', 'passwordSection');
});
/* Page 6 : Password */
var CORRECT_PASSWORD = 'she is my wife';
document.getElementById('unlockBtn').addEventListener('click', checkPassword);
document.getElementById('passwordInput').addEventListener('keydown', function(e) {
  if(e.key === 'Enter') checkPassword();
});

function checkPassword() {
  var val = document.getElementById('passwordInput').value.trim().toLowerCase();
  var msg= document.getElementById('wrongPassword');
  var input = document.getElementById('passwordInput');
  if(val === CORRECT_PASSWORD) {
    msg.style.color ='#00ee66';
    msg.textContent= '✅ Unlocked! Opening Memories...';
    input.style.border = '3px solid #00ee66';
    initMemories();
    setTimeout(function() { goTo('passwordSection', 'memories'); }, 1100);
  } else {
    msg.style.color ='#ff4466';
    msg.textContent= '❌ Not My Dear ❤️ Try Again! ';
    input.style.border= '3px solid #ff4466';
    input.value='';
    setTimeout(function() {
      input.style.border ='none';
      msg.textContent='';
    }, 2000);
  }
}
/* Page 7: Memories */
var memories = [
  {
    src: '/static/images/memory1.jpeg',
    text: 'Our first cute romantic proposal💝 and our first 😘, first hug on the same day and then our journey started'
  },
  { 
    src: '/static/images/memory2.jpg',
    text: 'The Candy u bought for me and the word BE MINE💞 makes me to be always as your love My Dear🥰 '
  },
  { 
    src: '/static/images/memory3.jpeg',
    text: 'Our first outing date with Beautiful second proposal with rose bouquets after 8 years on June 5th and the day we again became one🫂 A+N=AN 🫣'
  },
  { 
    src: '/static/images/memory4.jpg',
    text: 'The flower and my eargerly waiting little moment of that sound I Love You will always responds u as Love u toooooo My Man ♾️'
  },
  { 
    src: '/static/images/memory5.jpeg',
    text: 'Very Veryyy special and first gifts in our relationship🥰, will be more n moreeee precious for me and all other gifts from u should be mine only '
  }
];
var memIndex =0;
function initMemories() {
  memIndex =0;
  setMemory(0);
  document.getElementById('nextMemoryBtn').textContent = 'Next Memory ➜';
}
function setMemory(i) {
  var img =document.getElementById('memoryImage');
  var text = document.getElementById('memoryText');
  img.style.opacity ='0';
  text.style.opacity='0';
  setTimeout(function () {
    img.src= memories[i].src;
    img.onload =function() {
      img.style.transition = 'opacity 0.8s';
      text.style.transition = 'opacity 0.8s';
      img.style.opacity ='1';
      text.style.opacity = '1';
    };
    img.onerror= function() {
      img.style.opacity='1';
      text.style.opacity='1';
    }
    text.textContent = memories[i].text;
  }, 300);
}
document.getElementById('nextMemoryBtn').addEventListener('click', function() {
  memIndex++;
  if(memIndex < memories.length) {
    setMemory(memIndex);
    if(memIndex === memories.length-1) {
      document.getElementById('nextMemoryBtn').textContent = 'Continue ➜';
    }
  } else {
    goTo('memories', 'questionSection');
  }
});

/* Page 8: Forever */
var noBtn = document.getElementById('noBtn');
var noClickCount =0;
function runNoAway() {
  noClickCount++;
  var vw =window.innerWidth;
  var vh= window.innerHeight;
  var bw= noBtn.offsetWidth;
  var bh= noBtn.offsetHeight;
  var margin =20;
  var rx= margin +Math.random() * (vw- bw -margin *2);
  var ry =margin + Math.random() * (vh-bh- margin *2);
  noBtn.style.position ='fixed';
  noBtn.style.left =rx +'px';
  noBtn.style.top =ry + 'px';
  noBtn.style.zIndex ='9999';
  noBtn.style.transform= 'translateX(0)';

  var scale= Math.max(0.5, 1- noClickCount *0.05);
  noBtn.style.transform ='scale(' + scale + ')';
  var msgs =[' U will get tired Baby', 'Nooooo', 'Try to Catch', 'U Can\'t catch me! 😂', 'No way 😂','Nice Try! 🙈', 'Run run run', 'Try more my Dear', 'Abbaaa 🏃', 'No Bangaram 😝 '];
  if(noClickCount % 2===0) {
    noBtn.textContent= msgs[Math.floor(Math.random() *msgs.length)];
  }
}
noBtn.addEventListener('mouseover', runNoAway);
noBtn.addEventListener('touchstart', function(e) { e.preventDefault(); runNoAway();}, { passive: false});
noBtn.addEventListener('click', runNoAway);

document.getElementById('yesBtn').addEventListener('click', function() { 
  noBtn.style.position= '';
  noBtn.style.left='';
  noBtn.style.top= '';
  noBtn.style.transform= '';
  noBtn.style.zIndex='';
  noClickCount=0;
  goTo('questionSection', 'heartExplosion');
  bigHeartExplosion();
});

/* Page 9: Heart Explosion */
function bigHeartExplosion() {
  spawnHearts(90);
  spawnConfetti(50);
  launchFireworks();
  setTimeout(stopFireworks, 4000);
}
document.getElementById('continueBtn').addEventListener('click', function() {
  goTo('heartExplosion', 'bubuLove');
});
/* Page 10 : Bubu Love  */
document.getElementById('loveNextBtn').addEventListener('click', function() {
  goTo('bubuLove', 'warningSection');
});
/* Page 11 : Warning */
document.getElementById('readyBtn').addEventListener('click', function() {
  goTo('warningSection', 'kissSection');
});
/* Page 12 : Kiss */
document.getElementById('openLetterBtn').addEventListener('click', function() {
  goTo('kissSection', 'letterSection');
  setTimeout(openLetter, 700);
});
/* Page 13: Letter  */
var LETTER_TEXT =
'U r the best bestest ever one in this world to treat their partner with lots of love, hidden care, giving priority, little pampering and making me feel like the only girl who exists in your World.\n\n' +
'U still choose me and loves me even more despite all my mistakes and imperfections.\n\n' +
'U never let go of my hand, even when i did and still make efforts for making me happy ☺️\n\n' +
'U may not express it directly but I can feel them in every little thing u do 🥰\n\n'+
'I want to be with u forever 🫂, always standing by ur side through every high and low, accepting as how u are and want see the best version of u 💝\n\n' +
'My only dream is to see you successful, at the top, living together a happy life with me 🥹\n\n' +
'I promise ill always make efforts to keep u happy and give u the best version of myself\n\n' +
'I hope in next 5 years, we will be together 😘 and celebrating ur birthday like a festival 🎉 with all the love and happiness\n\n' +
'I Love uhhh forever n ever and ever... ♾️💞';

function openLetter() {
  var env= document.getElementById('envelope');
  env.classList.add('open');
  setTimeout(function() {
    typewriter('letterText', LETTER_TEXT, 28);
  }, 900);
}
function typewriter(elId, text, speed) {
  var el= document.getElementById(elId);
  el.textContent='';
  var i=0;
  var letterBox =el.closest('.letter');
  var iv = setInterval(function() {
    el.textContent+= text[i];
    i++;
    if(letterBox) letterBox.scrollTop= letterBox.scrollHeight;
    if(i>= text.length) clearInterval(iv);
  }, speed);
}
document.getElementById('giftBtn').addEventListener('click', function() {
  goTo('letterSection','giftSection');
  setTimeout(openGiftBox, 700);
  startFinalPage();
});

/* Page 14: Final Gift */
function openGiftBox() {
  document.getElementById('giftBox').classList.add('open');
}
function startFinalPage() {
  launchFireworks();
  spawnHearts(70);
  spawnConfetti(60);
  spawnBalloons(12);
}
document.getElementById('replayBtn').addEventListener('click', function () {
  stopFireworks();
  cakeCut=false;
  memIndex=0;
  noClickCount=0;
  document.querySelectorAll('.candle').forEach(function (c) {
    c.style.opacity='1';
    c.classList.remove('blown');
  });
  var ct= document.querySelector('.cake-top');
  var cb =document.querySelector('.cake-bottom');
  if(ct) { ct.style.transform =''; ct.style.transition=''; }
  if(cb) {  cb.style.transform =''; cb.style.transition=''; }
  var cutBtn= document.getElementById('cutCakeBtn');
  cutBtn.textContent= '🔪 Cut The Cake ';
  cutBtn.disabled=false;

  document.getElementById('envelope').classList.remove('open');
  document.getElementById('letterText').textContent='';
  document.getElementById('giftBox').classList.remove('open');
  document.getElementById('passwordInput').value= '';
  document.getElementById('wrongPassword').textContent='';
  noBtn.style.cssText='';
  noBtn.textContent='NO 😅';
  document.getElementById('hearts').innerHTML='';
  document.getElementById('confetti').innerHTML='';
  document.getElementById('balloons').innerHTML='';
  ['countdownSection', 'birthdayBlast', 'cakeSection', 'loveMessage',
    'passwordSection', 'memories', 'questionSection', 'heartExplosion',
    'bubuLove', 'warningSection', 'kissSection', 'letterSection', 'giftSection'
  ].forEach(hide);
  show('welcome');
  spawnHearts(14);
});

/* Fireworks */
var canvas=document.createElement('canvas');
canvas.style.cssText= 'position: fixed; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:998;';
document.body.appendChild(canvas);
var ctx =canvas.getContext('2d');
function resizeCanvas() {
  canvas.width= window.innerWidth;
  canvas.height=window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

var particles=[];
var fwInterval= null;
var rafId=null;
function launchFireworks() {
  if(fwInterval) return;
  fwInterval= setInterval(createBurst, 550);
  rafId= requestAnimationFrame(drawFW);
}

function stopFireworks() {
  clearInterval(fwInterval);
  fwInterval=null;
  particles=[];
  ctx.clearRect(0,0,canvas.width, canvas.height);
}

function createBurst() {
  var x= 80+Math.random() * (canvas.width-160);
  var y= 60+Math.random() * (canvas.height * 0.55);
  var colors =['#ff2d75', '#ff6ec7', '#fff','#ffd700', 'hotpink', '#c84fff', '#00d4ff', '#ff4fa0', '#ffaa00'];
  var col= colors[Math.floor(Math.random() * colors.length)];
  for (var i=0;i< 55 ;i++) {
    var angle= (Math.PI * 2/55) *i;
    var spd= 2+ Math.random() *5.5;
    particles.push( {
      x: x, y: y,
      vx: Math.cos(angle) * spd,
      vy: Math.sin(angle) * spd,
      alpha: 1, color:col,
      size:1.5 +Math.random() *3
    });
  }
}

function drawFW() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  particles= particles.filter(function (p) { return p.alpha > 0.03; });
  particles.forEach(function (p) {
    p.x += p.vx;
    p.y +=p.vy;
    p.vy +=0.055;
    p.alpha -=0.017;
    ctx.globalAlpha =p.alpha;
    ctx.fillStyle =p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI *2);
    ctx.fill();
  });
  ctx.globalAlpha =1;
  rafId =requestAnimationFrame(drawFW);
}

/* Floating HEarts */
function spawnHearts(count) {
  var container= document.getElementById('hearts');
  var emojis= ['❤️','💕','💗','💖','💓','💞','🌹','💝','😍','🥰','💋', '💫'];
  for(var i=0; i<count;  i++) {
    (function (delay) {
      setTimeout(function()  {
        var h= document.createElement('div');
        h.classList.add('heart');
        h.textContent=  emojis[Math.floor(Math.random() * emojis.length)];
        h.style.left=Math.random() * 100 + '%';
        h.style.fontSize = (18+ Math.random() *28) + 'px';
        var dur =3.5 +Math.random() *4;
        h.style.animationDuration = dur +'s';
        h.style.animationDelay= (Math.random() *1.2 ) +'s';
        container.appendChild(h);
        setTimeout(function() { if(h.parentElement) h.parentNode.removeChild(h); }, (dur +2.5) *1000);
      }, delay );
    })(i * 70);
  }
}

/* Confetti */
function spawnConfetti(count) {
  var container= document.getElementById('confetti');
  var colors= ['#ff2d75', '#ffd700', '#00cfff', '#ff6ec7', '#7bff6e', 'hotpink', '#fff','#ff9900'];
  for(var i=0; i<count;i++) {
    (function (delay) {
      setTimeout(function() {
        var c=document.createElement('div');
        c.classList.add('confetti');
        c.style.left=Math.random() *100 +'%';
        c.style.top= '-20px';
        c.style.background= colors[Math.floor(Math.random() * colors.length)];
        c.style.borderRadius= Math.random() > 0.5? '50%' : '2px';
        c.style.width =( 8+Math.random() * 10 ) + 'px';
        c.style.height= ( 8+Math.random() * 14 )+ 'px';
        var dur =3+ Math.random() *3.5;
        c.style.animationDuration= dur + 's';
        c.style.animationDelay= (Math.random() * 2) +'s';
        container.appendChild(c);
        setTimeout(function () { if (c.parentNode) c.parentNode.removeChild(c); }, (dur +3) *1000);
      }, delay);
    })(i * 55);
  }
}

/* BAlloons */
function spawnBalloons(count) {
  var container= document.getElementById('balloons');
  var emojis= ['🎈','🎀','🎊','🎉'];
  for( var i=0; i< count; i++) {
    (function (delay) {
      setTimeout(function() {
        var b= document.createElement('div');
        b.classList.add('balloon');
        b.textContent= emojis[Math.floor(Math.random() * emojis.length)];
        b.style.left =Math.random() * 100 +'%';
        var dur =5+ Math.random() *5;
        b.style.animationDuration= dur +'s';
        b.style.animationDelay= (Math.random() *2) +'s';
        container.appendChild(b);
        setTimeout(function() { if(b.parentNode) b.parentNode.removeChild(b);}, (dur +3) *1000);
      }, delay);
    })(i*180);
  }
}