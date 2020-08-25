// TODO: poster画像の作成（動画読み込み前のCSS背景表示も併せて対応）
// REVIEW: 切り替えアニメーション中に、再度切り替えアニメーションが発火してもエラーが起きないか確認
// REVIEW: ページ内のどこで再読み込みしてもエラーが起きないか確認

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

class HeroClass {
  constructor() {
    // 背景動画固定関連の変数
    this.kvVideoEl = document.getElementById('js-hero-kv-video');
    this.kvVideoWrapper = document.getElementById('js-hero-kv-video-wrapper');
    this.kvVideoAspectRatio = 1.78; // 1280 / 720
    this.kvVideoPlayBackRate = 0.5;
    // ヒーロー切り替え関連の変数
    this.heroFixClass = 'is-hero-fix';
    this.heroEl = document.getElementById('js-hero');
    this.kvOverlayEl = document.getElementById('js-hero-kv-overlay');
    this.kvToggleDuration = .5;
    this.contentEl = document.getElementById('js-hero-content');
    this.contentToggleDuration = .7;
    this.contentTransformY = 30;
  }
  init() {
    // ヒーロー関連スクリプトを初期化
    this.kvFix();
    this.setKvVideoPos();
    this.videoInitStart();
    this.resizeHandler();
    // ページ途中で再読み込みした場合の挙動対策で、スクロール時の処理の初期化を遅らせた（※ページ読み込みアニメーションを付ける場合は不要かもしれない）
    setTimeout(() => {
      this.createScrollTrigger();
    }, 200);
  }
  showContent() {
    // 背景動画を停止
    this.kvVideoEl.pause();
    // コンテンツを表示
    const tl = gsap.timeline({
      onComplete: () => {
        this.kvFixClear();
      }
    });
    tl.set(this.contentEl, {
        y: this.contentTransformY,
      })
      .addLabel('kvHide')
      .to(this.kvOverlayEl, {
        duration: this.kvToggleDuration,
        y: 0
      }, 'kvHide')
      .to(this.heroEl, {
        duration: this.kvToggleDuration,
        autoAlpha: 0
      }, 'kvHide')
      .to(this.contentEl, {
        duration: this.contentToggleDuration,
        y: 0,
        autoAlpha: 1,
      });
  }
  hideContent() {
    // 背景動画を再生
    this.kvVideoEl.play();
    // コンテンツを非表示
    const tl = gsap.timeline({
      onComplete: () => {
        this.kvFix();
      }
    });
    tl.to(this.contentEl, {
        duration: this.contentToggleDuration,
        y: this.contentTransformY,
        autoAlpha: 0
      })
      .addLabel('kvShow')
      .to(this.heroEl, {
        duration: this.kvToggleDuration,
        autoAlpha: 1
      }, 'kvShow')
      .to(this.kvOverlayEl, {
        duration: this.kvToggleDuration,
        y: '100%'
      }, 'kvShow');
  }
  kvFix() {
    // キービジュアル固定用のスタイルを付与
    document.documentElement.classList.add(this.heroFixClass);
  }
  kvFixClear() {
    // キービジュアル固定用のスタイルを削除
    document.documentElement.classList.remove(this.heroFixClass);
  }
  setKvVideoPos() {
    // 動画背景をウインドウ中央に配置
    const windowW = window.innerWidth;
    const windowH = window.innerHeight;
    if(windowW / windowH < this.kvVideoAspectRatio) {
      // ビデオの横幅が大きくなる場合
      const posLeft = (windowH * this.kvVideoAspectRatio - windowW) / 2;
      this.kvVideoWrapper.style.width = `${windowH * this.kvVideoAspectRatio}px`;
      this.kvVideoWrapper.style.top = null;
      this.kvVideoWrapper.style.left = `-${posLeft}px`;
    } else if(windowW / windowH > this.kvVideoAspectRatio) {
      // ビデオの縦幅が大きくなる場合
      const posTop = (windowW / this.kvVideoAspectRatio - windowH) / 2;
      this.kvVideoWrapper.style.top = `-${posTop}px`;
      this.kvVideoWrapper.style.left = null;
    }
  }
  videoInitStart() {
    // 最初の背景動画再生
    this.kvVideoEl.playbackRate = this.kvVideoPlayBackRate;
    if(this.kvVideoEl.buffered === 1) {
      // 動画ファイルの読み込みが完了している場合
      this.kvVideoEl.play();
    } else {
      // 動画ファイルの読み込みが完了しているない場合
      this.kvVideoEl.addEventListener('loadeddata', () => {
        this.kvVideoEl.play();
      });
    }
  }
  resizeHandler() {
    // 画面がリサイズされた場合、動画背景を再配置
    window.onresize = () => {
      this.setKvVideoPos();
    }
  }
  createScrollTrigger() {
    // ページトップに移動
    window.scrollTo(0, 0);
    // スクロール連動処理の設定
    ScrollTrigger.create({
      trigger: this.contentEl,
      start: 'top top',
      onEnter: () => {
        this.showContent();
      },
      onLeaveBack: () => {
        this.hideContent();
      }
    });
  }
}

export function heroScript() {
  const hero = new HeroClass();
  hero.init();
}
