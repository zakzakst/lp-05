import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

class FeatureClass {
  init() {
    this.showImage();
  }
  showImage() {
    const featureItemEl = document.querySelectorAll('.feature__item');
    [...featureItemEl].forEach(el => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 70%",
        onEnter: self => {
          el.classList.add('is-animated');
          self.kill();
        }
      });
    });
  }
}

export function featureScript() {
  const feature = new FeatureClass();
  feature.init();
}
