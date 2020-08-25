import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

class MovieGalleryClass {
  init() {
    console.log('movie gallery');
    this.showItems();
  }
  showItems() {
    const itemList = document.getElementById('js-video-modal-list');
    const items = itemList.querySelectorAll('.js-video-modal-item');
    gsap.to(items, {
      opacity: 1,
      stagger: 0.1,
      scrollTrigger: {
        trigger: itemList,
        start: 'top center',
      }
    });
  }
}

export function movieGalleryScript() {
  const movieGallery = new MovieGalleryClass();
  movieGallery.init();
}
