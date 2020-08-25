import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

class CampaignClass {
  init() {
    console.log('campaign');
    this.pinImage();
    this.scaleImage();
    this.scaleBackImage();
  }
  pinImage() {
    ScrollTrigger.create({
      trigger: '.main',
      start: 'top top',
      end: 'bottom bottom',
      pin: '.campaign-img__wrapper'
    });
  }
  scaleImage() {
    gsap.to('.campaign-img', {
      scrollTrigger: {
        trigger: '.next-space',
        start: 'top bottom',
        // end: 'bottom bottom',
        end: '+=500',
        scrub: .5,
      },
      x: '-30%',
      scale: 4,
      rotateY: '0deg',
    });
  }
  scaleBackImage() {
    gsap.to('.campaign-img', {
      scrollTrigger: {
        trigger: '.next-back-space',
        start: 'top bottom',
        // end: 'bottom bottom',
        end: '+=500',
        scrub: .5,
      },
      x: 0,
      scale: 1,
      rotateY: '-40deg',
    });
  }
}

export function campaignScript() {
  const campaign = new CampaignClass();
  campaign.init();
}
