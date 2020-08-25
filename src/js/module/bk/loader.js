import { gsap } from "gsap";
import { heroAnim } from './hero';
import { featureAnim } from './feature';

export function loaderAnim() {
  initSet();
  window.onload = () => {
    splitTextBySpan();
    showWords();
  };
}

function initSet() {
  // ウインドウのスクロール禁止
  const scrollBarWidth = window.innerWidth - document.body.clientWidth;
  document.body.style.paddingRight = `${scrollBarWidth}px`;
  document.documentElement.style.overflow = 'hidden';
}

function splitTextBySpan() {
  const heroWords = document.querySelectorAll('.hero__text-word.is-loader');
  [...heroWords].forEach(wordEl => {
    wordEl.innerHTML = wordEl.textContent.replace(/(.)/g, '<span>$1</span>');
  });
}

function showWords() {
  // タイムラインを定義
  const tl = gsap.timeline({
    onComplete: () => {
      // アニメーション完了後にタイトル位置にスライドさせる
      slideWord();
    }
  });
  // 文字要素を表示
  tl
    .to('.hero__loader', {
      duration: .5,
      opacity: 0,
    })
    .set('.hero__loader', {
      display: 'none',
    })
    .set('.hero__text', {
      display: 'block',
    });
  // 各文字のアニメーションを設定
  const letters = document.querySelectorAll('.hero__text-word.is-loader > span');
  [...letters].forEach((letter, index) => {
    const thisTl = gsap.timeline();
    thisTl
      .to(letter, {
        duration: .5,
        opacity: 1,
        transform: 'rotateY(-90deg)'
      })
      .set(letter, {
        color: '#000',
      })
      .to(letter, {
        duration: .5,
        transform: 'rotateY(0)'
      });
    tl.add(thisTl, .1 * index);
  });
}

function slideWord() {
  // スクロール位置をページトップに移動（ページ再読み込み時の対策、このタイミングでないと上手く挙動しなかった）
  window.scrollTo(0, 0);
  // ローディングの文字とヒーローの文字の位置を取得
  const loaderWords = document.querySelector('#js-page-loader .hero__text');
  const heroWords = document.querySelector('.section-hero .hero__text');
  const loaderPos = getPosition(loaderWords);
  const heroPos = getPosition(heroWords);

  // アニメーションを設定
  const loaderEl = document.getElementById('js-page-loader');
  const tl = gsap.timeline({
    onComplete: () => {
      startPage();
    }
  });
  tl
    .to(loaderWords, {
      duration: 1,
      x: heroPos.x - loaderPos.x,
      y: heroPos.y - loaderPos.y,
      ease: 'Power1.out'
    })
    .to(loaderEl, {
      delay: .2,
      duration: .7,
      opacity: 0,
    });
}

function startPage() {
  // ローディング文字の要素を削除
  const loaderEl = document.getElementById('js-page-loader');
  loaderEl.parentNode.removeChild(loaderEl);
  // ウインドウのスクロール禁止を解除
  document.body.style.paddingRight = null;
  document.documentElement.style.overflow = null;
  // スライダーを開始
  heroAnim();
  // 特徴セクションのスクロールアニメーションを設定（ここで発火しないと上手く挙動しなかった）
  featureAnim();
}

function getPosition(el) {
  const rect = el.getBoundingClientRect();
  const result = {
    x: window.pageXOffset + rect.right,
    y: window.pageYOffset + rect.top
  };
  return result;
}
