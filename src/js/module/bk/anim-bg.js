import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

class AnimBg {
  constructor() {
    this.bgItem1 = document.getElementById('js-anim-bg-item-1');
    this.bgItem2 = document.getElementById('js-anim-bg-item-2');
    this.bgItem3 = document.getElementById('js-anim-bg-item-3');
    this.bgItem4 = document.getElementById('js-anim-bg-item-4');
  }
  init() {
    this.animBg1();
    this.animBg2();
    this.animBg3();
    this.animBg4();
  }
  animBg1() {
    const tl = gsap.timeline();
    tl.to(this.bgItem1, {
      skewY: '20deg',
    }).to(this.bgItem1, {
      top: '40%',
    }).to(this.bgItem1, {
      skewY: '50deg',
    });
    this.setScrollTrigger(tl);
  }
  animBg2() {
    const tl = gsap.timeline();
    tl.to(this.bgItem2, {
      skewY: '20deg',
    }).to(this.bgItem2, {
      top: '10%',
      skewY: '10deg',
    }).to(this.bgItem2, {
      skewY: '40deg',
    });
    this.setScrollTrigger(tl);
  }
  animBg3() {
    const tl = gsap.timeline();
    tl.to(this.bgItem3, {
      skewY: '10deg',
    }).to(this.bgItem3, {
      height: 60,
    }).to(this.bgItem3, {
      top: '10%',
      skewY: '30deg',
    }).to(this.bgItem3, {
      skewY: '20deg',
    });
    this.setScrollTrigger(tl);
  }
  animBg4() {
    const tl = gsap.timeline();
    tl.to(this.bgItem4, {
      left: '40%',
      skewX: '30deg',
    }).to(this.bgItem4, {
      skewX: '5deg',
    }).to(this.bgItem4, {
      left: '10%',
      skewX: '20deg',
    });
    this.setScrollTrigger(tl);
  }
  setScrollTrigger(tl) {
    const st = ScrollTrigger.create({
      trigger: ".spacer__wrapper",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      markers: true,
      animation: tl
    });
  }
}

export function animBgScript() {
  console.log('anim bg');
  const animBg = new AnimBg();
  animBg.init();
}
