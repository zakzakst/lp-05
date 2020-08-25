import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

class CampaignClass {
  constructor() {
    this.imgWrapper = document.getElementById('js-campaign-img-wrapper');
  }
  init() {
    console.log('campaign');
    this.pinImage();
    this.scaleImage();
    this.showContentImage();
  }
  pinImage() {
    const campaignSection = document.getElementById('js-campaign-section');
    ScrollTrigger.create({
      trigger: this.imgWrapper,
      start: 'center center',
      endTrigger: campaignSection,
      end: 'bottom bottom',
      pin: this.imgWrapper,
      pinSpacing: false,
      // markers: true,
    });
  }
  scaleImage() {
    const imgEl = document.getElementById('js-campaign-img');
    const imgDisplay = document.getElementById('js-campaign-img-display');
    const tl = gsap.timeline();
    tl.to(imgEl, {
      scale: 2,
    }, 0).to(imgDisplay, {
      opacity: 0,
    }, 0);
    ScrollTrigger.create({
      trigger: this.imgWrapper,
      start: 'center center',
      end: '+=300',
      scrub: .5,
      animation: tl
    });
  }
  showContentImage() {
    const els = document.querySelectorAll('.campaign-content__img');
    [...els].forEach(el => {
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

export function campaignScript() {
  const campaign = new CampaignClass();
  campaign.init();
}
