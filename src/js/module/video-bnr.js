class VideoBnrClass {
  constructor(el) {
    this.el = el;
    this.videoEl = this.el.querySelector('.video-bnr__video');
    this.overlayEl = this.el.querySelector('.video-bnr__overlay');
    this.btnEl = this.el.querySelector('.video-bnr__btn');
  }
  init() {
    this.startVideoHandler();
  }
  startVideo() {
    this.overlayEl.style.display = 'none';
    this.videoEl.play();
  }
  startVideoHandler() {
    this.btnEl.addEventListener('click', e => {
      e.preventDefault();
      this.startVideo();
    });
  }
}

export function videoBnrScript() {
  const videoBnrItems = document.querySelectorAll('.js-video-bnr');
  [...videoBnrItems].forEach(el => {
    const videoBnr = new VideoBnrClass(el);
    videoBnr.init();
  });
}
