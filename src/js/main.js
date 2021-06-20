/* App styles */
import "@/scss/main.scss";

/* Development stats */
import Development from './development.js';

if (process.env.NODE_ENV === "development") {Development.addWindowStatsElement();}




//SHARE

const share = Ya.share2('share', {
  content: {
    title: 'Dada Agency',
    description: 'Как тебе такое, Илон Маск!?',
    image: location.origin + location.pathname + '/assets/images/share3-default.png',
    url: location.origin + location.pathname,   
  },
  theme: {
    services: 'vkontakte,facebook,telegram,whatsapp',
    lang: 'ru',
    limit: 0,
    size: 'l',
    bare: false,
    popupDirection: 'top',
    popupPosition: 'inner',
    copy: 'hidden',
  }
});

// window.share = share;




import fullpage from "./fullpage.js";
import anime from 'animejs/lib/anime.es.js';

const moreBtn = document.querySelector('.js-again-btn');

const header = document.querySelector('.js-header');

const screen2Link = document.querySelector('.js-screen2-link');

if (window.innerWidth >= 1280) {

  let isScrolled = false;

  let myFullpage = new fullpage('main', {
    lockAnchors: true,
    anchors: ['screen1', 'screen2', 'screen3'],
    fitToSection: false,
    scrollBar: true,
    sectionSelector: '.screen',
    onLeave: (origin, destination, direction) => {
      header.classList.remove('header--transparent');
      if (!isScrolled && origin.index == 0 && direction == 'down') {
        console.log("action");
        line2animation();
        isScrolled = true;
      }
      if (origin.index == 0 && direction == 'down') {
        fullpage_api.setAllowScrolling(false, 'down');
      }
      if (origin.index == 1 && direction == 'up') {
        fullpage_api.setAllowScrolling(true, 'down');
      }
      if (destination.isLast) {
        fullpage_api.setAllowScrolling(false);
      }
    },
    afterLoad: () => {
      header.classList.add('header--transparent');
    }
  });


  const smoothLinks = document.querySelectorAll('.js-smooth-link');
  smoothLinks.forEach( item => item.addEventListener('click', e => {
    e.preventDefault();
    fullpage_api.moveSectionDown();
  }) );

  
  screen2Link.addEventListener('click', (e) => {
    // moreBtnClickHandler();
    setTimeout(() => {moreBtnClickHandler();}, 1000);
  });

  const homeLink = document.querySelector('.js-home-link');
  homeLink.addEventListener('click', e => {
    e.preventDefault();
    fullpage_api.moveTo('screen1', 0);
    setTimeout(() => {location.reload();}, 1000);
  });



  // //-----------------------------



  let arrow = document.querySelector(".anim__arrow");
  const arrow2 = document.querySelector("#arrow2");
  let baseHeight = 938;
  let currentHeight = document.documentElement.clientHeight;
  arrow.style.transform = `scale(${currentHeight / baseHeight})`;
  let dontHide = false;

  let path = anime.path('#line1');

  let myTimeline = anime.timeline({});

  myTimeline.add({
    targets: ['#face', '#arrow', '#line1'],
    opacity: 1,
    duration: 1000,
    loop: false,
    easing: 'linear'
  }, 0);

  myTimeline.add({
    targets: '#arrow',
    translateX: path('x'),
    translateY: path('y'),
    rotate: path('angle'),
    duration: 3000,
    loop: false,
    easing: 'easeInOutQuad',
    complete: () => {console.log('arrow anim'); if (!dontHide) {arrow.classList.add('fade')}; arrow2.classList.add('arrow-scale');}
  }, 0);

  myTimeline.add({
    targets: '#line1',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutQuad',
    duration: 3000,
    direction: 'alternate',
    loop: false,
  }, 0);

  myTimeline.add({
    targets: '#link1',
    easing: 'linear',
    opacity: 1,
    duration: 200,
    loop: false,
  }, 2500);

  function line2animation() {
    dontHide = true;
    let myTimeline2 = anime.timeline({});

    let path2 = anime.path('#line2');

    const line1Height = document.querySelector('.anim__line1').clientHeight;

    myTimeline2.add({
      targets: '#line2',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutQuad',
      duration: 4000,
      direction: 'alternate',
      loop: false,
    }, 0);

    myTimeline2.add({
      targets: '#line2',
      opacity: 1,
      duration: 1000,
      loop: false,
      easing: 'linear',
    }, 0);

    myTimeline2.add({
      targets: '#arrow',
      translateX: path2('x'),
      translateY: path2('y'),
      rotate: path2('angle'),
      duration: 4000,
      loop: false,
      easing: 'easeInOutQuad',
      begin: () => {console.log('arrow2 stop'); arrow.classList.remove('fade'); arrow2.classList.remove('arrow-scale');}
    }, 0);

    myTimeline2.add({
      targets: '#arrow',
      bottom: -line1Height * (938/document.documentElement.clientHeight) + 'px',
      duration: 0,
      loop: false,
      easing: 'linear',
    }, 0);
  }
}


const screen3 = document.querySelector('.js-screen3');

if (window.innerWidth < 1280) {

  // window.scrollTo(0,0);
  let myFullpage = new fullpage('main', {
    lockAnchors: true,
    anchors: ['screen1', 'screen2', 'screen3'],
    fitToSection: false,
    scrollBar: true,
    sectionSelector: '.screen',
    onLeave: (origin, destination, direction) => {
      // header.classList.remove('header--transparent');

      if (origin.index == 0 && direction == 'down') {
        fullpage_api.setAllowScrolling(false, 'down');
      }
      if (origin.index == 1 && direction == 'up') {
        fullpage_api.setAllowScrolling(true, 'down');
      }
      if (destination.isLast) {
        fullpage_api.setAllowScrolling(false);
      }
    },
    afterLoad: () => {
      // header.classList.add('header--transparent');
    }
  });

  const smoothLinks = document.querySelectorAll('.js-smooth-link');
  smoothLinks.forEach( item => item.addEventListener('click', e => {
    e.preventDefault();
    fullpage_api.moveSectionDown();
  }) )

  const homeLink = document.querySelector('.js-home-link');
  homeLink.addEventListener('click', e => {
    e.preventDefault();
    fullpage_api.moveTo('screen1', 0);
    setTimeout(() => {location.reload();}, 1000);
  });

  // window.addEventListener('load', () => {/*fullpage_api.silentMoveTo('screen1', 0);*//*window.scrollTo(0,0);*/ console.log('load');});
 //скролл в начало при обновлении страницы на мобильных
  history.scrollRestoration = "manual";
  window.addEventListener('beforeunload', () => {
    window.scrollTo(0,0);
  });
  
  // console.log("reset scroll");
  // setTimeout(() => {window.scrollTo(0,0);}, 50);
  
  header.classList.remove('header--transparent');
  // screen3.classList.add('screen3--hide');

  screen2Link.addEventListener('click', (e) => {
    // screen3.classList.remove('screen3--hide');
    setTimeout(() => {moreBtnClickHandler();}, 1000);
  });
}






































// GENERATOR 2
const stickers = document.querySelectorAll('.js-generator-image');
console.log(stickers, stickers.length);
function revealSticker() {
  const rnd = Math.floor(Math.random() * stickers.length);
  console.log(rnd);
  hideAllStickers();
  stickers[rnd].classList.remove('fade');
}

function hideAllStickers() {
  stickers.forEach( item => {
    item.classList.add('fade');
  });
}

const col0 = document.querySelector('.js-col-0');
const col1 = document.querySelector('.js-col-1');
const col2 = document.querySelector('.js-col-2');

let blank = document.createElement('div');
blank.classList.add('generator__value');

const generatorHeight = document.querySelector('.js-generator').clientHeight;
const valueHeight = generatorHeight / 5;

let oldRandomValue0 = 0;
let oldRandomValue1 = 0;
let oldRandomValue2 = 0;

const initialTranslate1 = -valueHeight * WORDS[0].length + valueHeight * 2;
const initialTranslate2 = -valueHeight * WORDS[1].length + valueHeight * 2;
const initialTranslate3 = -valueHeight * WORDS[2].length + valueHeight * 2;

col0.style.transform = `translateY(${initialTranslate1}px)`;
col1.style.transform = `translateY(${initialTranslate2}px)`;
col2.style.transform = `translateY(${initialTranslate3}px)`;


for (let i = 0; i < SETTINGS.cycles0; i++) {
  WORDS[0].forEach( (item, i) => {
    let copy = blank.cloneNode();
    copy.innerHTML = item;
    copy.style.height = `${valueHeight}px`;
    col0.append(copy);
  } );
}

for (let i = 0; i < SETTINGS.cycles1; i++) {
  WORDS[1].forEach( (item, i) => {
    let copy = blank.cloneNode();
    copy.innerHTML = item;
    copy.style.height = `${valueHeight}px`;
    col1.append(copy);
  } );
}

for (let i = 0; i < SETTINGS.cycles2; i++) {
  WORDS[2].forEach( (item, i) => {
    let copy = blank.cloneNode();
    copy.innerHTML = item;
    copy.style.height = `${valueHeight}px`;
    col2.append(copy);
  } );
}

const gen = document.querySelector('.js-generator');

const values0 = document.querySelectorAll('.js-col-0 .generator__value');
const values1 = document.querySelectorAll('.js-col-1 .generator__value');
const values2 = document.querySelectorAll('.js-col-2 .generator__value');

const firstValue = document.querySelector('.generator__value');
const valueFontSize = parseInt(window.getComputedStyle(firstValue)['font-size']);
console.log(valueFontSize);
const fontSizeMultiplier = 1.636;
const magnifiedFontSize = Math.round(valueFontSize * fontSizeMultiplier);
console.log(magnifiedFontSize);

const shareWord0 = document.querySelector('.js-share-word0');
const shareWord1 = document.querySelector('.js-share-word1');
const shareWord2 = document.querySelector('.js-share-word2');
const $share = document.querySelector('.js-share');

import html2canvas from 'html2canvas';
// window.a = html2canvas;
// window.share = $share;
valuesAnimationAll();

moreBtn.addEventListener('click', moreBtnClickHandler);

let screenshot = null;
function moreBtnClickHandler(e) {
  hideAllStickers();
  moreBtn.disabled = true;
  const randomValue0 = Math.floor(Math.random() * (WORDS[0].length));
  const randomValue1 = Math.floor(Math.random() * (WORDS[1].length));
  const randomValue2 = Math.floor(Math.random() * (WORDS[2].length));

  shareWord0.innerHTML = WORDS[0][randomValue0];
  shareWord1.innerHTML = WORDS[1][randomValue1];
  shareWord2.innerHTML = WORDS[2][randomValue2];

  // HTML2CANVAS
  // html2canvas(shareWord0).then( (canvas) => {document.body.append(canvas)} );

  html2canvas($share, {
    scrollX:0,
    scrollY:0,
  }).then( (canvas) => {
    const data = canvas.toDataURL('image/png').replace(/data:image\/png;base64,/, '');
    console.log(data);
    const body = {data: data};
    console.log(body);
    
    fetch(SETTINGS.saveImageUrl, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      // mode: 'no-cors',
      body: JSON.stringify(body),
    })
    .then( res => {console.log("0", res); return res.json();} )
    .then( res => {
      console.log("1", res);
      if (res.data) {
        //обновить данные для шаринга
        share.updateContent({
          image: res.data,
          url: location.origin + location.pathname + '?link=' + res.data,
        });
      }
    } )
    .catch( err => {console.log(err);} );
  } );

  // setTimeout(() => {
    // html2canvas(document.querySelector('.js-share'), {logging: true}).then( (canvas) => {
    //   const data = canvas.toDataURL('image/png').replace(/data:image\/png;base64,/, '');
    //   console.log(data);
    // } );
  // },1000);


  console.log(randomValue0, randomValue1, randomValue2);
  col0.style.transform = `translateY(${-valueHeight * WORDS[0].length * (SETTINGS.cycles0 - 2) + valueHeight * 2 - (valueHeight * oldRandomValue0)}px)`;
  col1.style.transform = `translateY(${-valueHeight * WORDS[1].length * (SETTINGS.cycles1 - 2) + valueHeight * 2 - (valueHeight * oldRandomValue1)}px)`;
  col2.style.transform = `translateY(${-valueHeight * WORDS[2].length * (SETTINGS.cycles0 - 2) + valueHeight * 2 - (valueHeight * oldRandomValue2)}px)`;
  valuesAnimationAll();

  oldRandomValue0 = randomValue0;
  oldRandomValue1 = randomValue1;
  oldRandomValue2 = randomValue2;
  
  const currentTranslate0 = -valueHeight * WORDS[0].length + valueHeight * 2 - (valueHeight * randomValue0);
  const currentTranslate1 = -valueHeight * WORDS[1].length + valueHeight * 2 - (valueHeight * randomValue1);
  const currentTranslate2 = -valueHeight * WORDS[2].length + valueHeight * 2 - (valueHeight * randomValue2);

  console.log(currentTranslate0, currentTranslate1, currentTranslate2);

  const animation0 = anime({
    targets: col0,
    translateY: currentTranslate0,
    easing: 'easeInOutSine',
    duration: SETTINGS.oneCycleTime * SETTINGS.cycles0,
  });

  const animation1 = anime({
    targets: col1,
    translateY: currentTranslate1,
    easing: 'easeInOutSine',
    duration: SETTINGS.oneCycleTime * SETTINGS.cycles1,
  });
  const animation2 = anime({
    targets: col2,
    translateY: currentTranslate2,
    easing: 'easeInOutSine',
    duration: SETTINGS.oneCycleTime * SETTINGS.cycles2,
    complete: () => {moreBtn.disabled = false; revealSticker();}
  });

  requestAnimationFrame(animate);

  function animate(time) {
    if (animation0.progress < 100) {
      valuesAnimation(values0);
    }
    if (animation1.progress < 100) {
      valuesAnimation(values1);
    }
    if (animation2.progress < 100) {
      valuesAnimation(values2);
    }
    if (animation0.progress < 100 || animation1.progress < 100 || animation2.progress < 100 ) {
      requestAnimationFrame(animate);
    }
  }
}

function valuesAnimationAll() {
  valuesAnimation(values0);
  valuesAnimation(values1);
  valuesAnimation(values2);
}

function valuesAnimation(values) {
  values.forEach( (item, i) => {
    const elemPos = item.getBoundingClientRect().y + item.clientHeight / 2 - gen.getBoundingClientRect().y;
    let relativePos;
    if (elemPos >= 0 && elemPos < generatorHeight) {
      relativePos = elemPos / generatorHeight;
      if (relativePos < 0.5) {
        // item.style.filter = `blur(${(4 - relativePos * 8).toFixed(1)}px)`;
        item.style.opacity = `${relativePos * 2}`;
        item.style.fontSize = `${(valueFontSize + relativePos * (magnifiedFontSize - valueFontSize) * 2/*28*/).toFixed(1)}px`;
      } else {
        item.style.opacity = `${(1 - relativePos) * 2}`;
        // item.style.filter = `blur(${((relativePos - 0.5) * 8).toFixed(1)}px)`;
        item.style.fontSize = `${(magnifiedFontSize - (relativePos-0.5) * (magnifiedFontSize - valueFontSize) * 2/*28*/).toFixed(1)}px`;
      }
    } else {
      // item.style.filter = `blur(4px)`;
      item.style.opacity = `0`;
      item.style.fontSize = `${valueFontSize}px`;
    };
  });
}











// HTML2CANVAS

// window.z = function() {
//   html2canvas(document.querySelector('.js-share'), {
//     scrollX: 0,
//     scrollY:0,
//   }).then( (canvas) => {
//     const data = canvas.toDataURL('image/png').replace(/data:image\/png;base64,/, '');
//     console.log(data);
//   } );
// }


// z();




// import domtoimage from 'dom-to-image';

// domtoimage.toPng(screen3).then( (res) => {
//   console.log(res);
//   const img = new Image();
//   img.src = res;
//   document.body.appendChild(img);
// } ).catch(err => console.log(err));

// domtoimage.toPng($share).then( blob => {let link = document.createElement('a');
// link.download = 'my-image-name.png';
// link.href = blob;
// link.click(); 
// }
// );


// setTimeout(() => {
//   var canvas = document.querySelector('canvas');
//                 //получаем картинку в base64
//                 var data = canvas.toDataURL('image/png').replace(/data:image\/png;base64,/, '');
//                 console.log(data);
// }, 2000);
// import html2canvas from 'html2canvas';

// // html2canvas(document.body).then( (canvas) => {document.body.append(canvas)} );

// const screenshot2 = html2canvas(screen3).then( canvas => document.body.append(canvas) );


//   // document.body.append(screenshot);




//100VH mobile fix
// window.addEventListener('resize', resizer100vh);

// resizer100vh();

// function resizer100vh() {
//   let vh = window.innerHeight * 0.01;
//   document.documentElement.style.setProperty('--vh', `${vh}px`);
// }






//RELOAD ON RESIZE FOR DESKTOP
const initialWidth = window.innerWidth;

const delay = 200;
let resizeTimeout = null;
window.addEventListener("resize", onWindowResizeHandler);

function onWindowResizeHandler() {
  // if (window.innerWidth <= initialWidth && window.innerWidth <= 1279) { return false; }

  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(resizeAction, delay);
}

function resizeAction() {
  location.reload();
}
