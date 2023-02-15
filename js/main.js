// 검색창 만들기
const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');
searchEl.addEventListener('click', function(){
  searchInputEl.focus();
});
// addEventListener(focus), HTML요소에 포커스가 갔을때 발생한다.
searchInputEl.addEventListener('focus', function(){
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색');
});
// addEventListener(blur), HTML요소가 포커스에서 벗어났을때 발생한다.
searchInputEl.addEventListener('blur', function(){
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
  if(searchInputEl.value) searchInputEl.value = '';
});

// gsap  -  애니메이션 효과, throttle : 함수를 최대한 적게 사용하기위해 사용
const badgeEl = document.querySelector('header .badges');
window.addEventListener('scroll', _.throttle(function() {
  if(window.scrollY > 500){
    //배지 숨기기 (gasp 라이브러리 사용)
    gsap.to(badgeEl, 0.6, {
      opacity : 0,
      display:'none'
    }); // gsap.to(요소, 지속시간, 옵션)
    //버튼 보이기
    gsap.to('#to-top', 0.2, {
      x: 0
    });
  }else {
    //배지 보이기
    gsap.to(badgeEl, 0.6, {
      opacity : 1,
      display:'block'
    });
    //버튼 숨기기
    gsap.to('#to-top', 0.2, {
      x: 100
    });
  }
}, 300)); //_.throttle(함수, 시간)

const toTopEl = document.querySelector('#to-top');
toTopEl.addEventListener('click', function(){
  gsap.to(window, 0.7, {
    scrollTo : 0 // scrollTo로 위치 최상단으로 옮기기 (ScrollToPlugin 라이브러리 사용 시 가능)
  })
});

const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach((fadeEl, i) => {
  gsap.to(fadeEl, 1, {
    delay: 0.7 * (i + 1),
    opacity : 1
  });
});


// swiper  -  슬라이드 효과
//new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper',{
  direction : 'vertical',
  autoplay : true, //자동 재생
  loop : true //반복
});

new Swiper('.promotion .swiper',{
  slidesPerView : 3, //한번에 보여줄 슬라이드 개수
  spaceBetween : 10, //슬라이드 사이 여백
  centeredSlides : true, //1번 슬라이드가 가운데 보이기
  loop : true,
  autoplay : {
    delay: 5000
  },
  pagination: {
    el: '.promotion .swiper-pagination',
    clickable: true
  },
  navigation: {
    nextEl: '.promotion .swiper-button-next',
    prevEl: '.promotion .swiper-button-prev',
  },
});

new Swiper('.awards .swiper', {
  slidesPerView: 5,
  spaceBetween: 30,
  autoplay : true, //자동 재생
  loop : true, //반복
  navigation: {
    nextEl: '.awards .swiper-button-next',
    prevEl: '.awards .swiper-button-prev',
  }
});



// 토글 만들기
const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;
promotionToggleBtn.addEventListener('click', function(){
  isHidePromotion = !isHidePromotion;
  if(isHidePromotion){
    promotionEl.classList.add('hide');
  }else{
    promotionEl.classList.remove('hide');
  }
});



// 이미지 둥둥 떠다니는 효과
function floatingObject(selector, delay, size){
  gsap.to(
    selector, // 선택자
    random(1.5, 2.5), // 애니메이션 동작 시간 
    { // 옵션
      y: size,
      repeat: -1, // 반복 처리
      yoyo: true, // 다시 올라가도록
      ease: Power1.easeInOut, // easing 처리
      delay: random(0, delay)
    }
  );
}

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);

// ScrollMagic
const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function(spyEl,index){
  new ScrollMagic
  .Scene({
    triggerElement: spyEl, //보여짐 여부를 감시할 요소르 지정
    triggerHook: .8
  })
  .setClassToggle(spyEl, 'show')
  .addTo(new ScrollMagic.Controller());
});


// footer에 년도 넣기
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear(); // 2023

