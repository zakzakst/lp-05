import { gsap } from "gsap";

class PageLoaderClass {
  constructor() {
    // loading属性が「lazy」の画像は読込を監視しない
    this.imgEl = document.querySelectorAll('img:not([loading="lazy"])');
    this.videoEl = document.getElementsByTagName('video');
    this.loadElNum = this.imgEl.length + this.videoEl.length;
    this.loadedElNum = 0;
    this.loadedPercent = 0;
    this.pageLoaderEl = document.getElementById('js-page-loader');
    this.pageLoaderTextEL = document.getElementById('js-page-loader-text');
    this.pageLoaderProgressEL = document.getElementById('js-page-loader-progress');
  }
  init() {
    this.loadHandler();
  }
  updateLoader() {
    this.pageLoaderTextEL.textContent = this.percent;
    this.pageLoaderProgressEL.style.width = `${this.percent}%`;
  }
  loadHandler() {
    // 画像のロードイベント
    [...this.imgEl].forEach(el => {
      el.addEventListener('load', () => {
        this.elLoadDone();
      });
    });
    // 動画のロードイベント
    [...this.videoEl].forEach(el => {
      el.addEventListener('loadeddata', () => {
        this.elLoadDone();
      });
    });
    // ロード完了時のイベント
    window.onload = () => {
      this.loadedElNum = this.loadElNum;
      this.percent = 100;
      this.updateLoader();
      setTimeout(() => {
        this.hidePageLoader();
      }, 500);
    };
  }
  elLoadDone() {
    this.loadedElNum += 1;
    // 画像・動画以外の読込を考慮し、90%までの進捗表示にする
    this.percent = Math.floor(this.loadedElNum / this.loadElNum * 90);
    this.updateLoader();
  }
  hidePageLoader() {
    const tl = gsap.timeline();
    tl.to(this.pageLoaderEl, {
      duration: .3,
      autoAlpha: 0
    }).set(this.pageLoaderEl, {
      display: 'none'
    });
  }
}

export function pageLoaderScript() {
  const pageLoader = new PageLoaderClass();
  pageLoader.init();
}
