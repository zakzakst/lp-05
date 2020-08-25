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
    this.kvVideoAspectRatio = 1.77 // 1280 / 720;
    // ヒーロー切り替え関連の変数
    this.kvFixClass = 'is-kv-fix';
    this.kvEl = document.getElementById('js-hero-kv');
    this.kvOverlayEl = document.getElementById('js-hero-kv-overlay');
    this.contentEl = document.getElementById('js-hero-content');
    this.kvToggleDuration = .5;
    this.contentToggleDuration = .5;
    this.contentTransformY = 30;
  }
  init() {
    // ヒーロー関連スクリプトを初期化
    this.kvFix();
    this.setKvVideoPos();
    this.kvVideoEl.play();
    this.createScrollTrigger();
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
      .to(this.kvEl, {
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
      .to(this.kvEl, {
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
    document.documentElement.classList.add(this.kvFixClass);
  }
  kvFixClear() {
    // キービジュアル固定用のスタイルを削除
    document.documentElement.classList.remove(this.kvFixClass);
  }
  setKvVideoPos() {
    // 動画背景をウインドウ中央に配置
    const windowW = window.innerWidth;
    const windowH = window.innerHeight;

    if(windowW / windowH < this.kvVideoAspectRatio) {
      console.log('ビデオの横幅が大きくなる');
      // ビデオの横幅が大きくなる場合
      // min-height: 100vhが上手く効かないため、widthに「this.kvVideoAspectRatio」をかけてから配置
      // 動画自体のclientWidthで対応しようとすると、動画の読込が完了していない場合にレイアウト崩れが起きるため、windowHを利用
      // 「this.kvVideoAspectRatio」が1以下の場合は「windowH / this.kvVideoAspectRatio」に変更
      const posLeft = (windowH * this.kvVideoAspectRatio - windowW) / 2;
      // this.kvVideoEl.style.width = `${100 * this.kvVideoAspectRatio}vw`;
      this.kvVideoEl.style.left = `-${posLeft}px`;
    } else if(windowW / windowH > this.kvVideoAspectRatio) {
      console.log('ビデオの縦幅が大きくなる');
      // ビデオの縦幅が大きくなる場合
      // 動画自体のclientHeightで対応しようとすると、動画の読込が完了していない場合にレイアウト崩れが起きるため、windowWを利用
      // 「this.kvVideoAspectRatio」が1以下の場合は「windowW * this.kvVideoAspectRatio」に変更
      const posTop = (windowW / this.kvVideoAspectRatio - windowH) / 2;
      this.kvVideoEl.style.top = `-${posTop}px`;
    }
  }
  createScrollTrigger() {
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
