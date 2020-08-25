import { heroScript } from './module/hero';
import { featureScript } from './module/feature';
import { videoBnrScript } from './module/video-bnr';
import { videoBnrYouTubeScript } from './module/video-bnr-youtube';

(function() {
  // ヒーローセクション
  heroScript();
  // 特徴セクション
  featureScript();
  // ビデオバナー：通常
  videoBnrScript();
  // ビデオバナー：YouTube
  videoBnrYouTubeScript();
})();
