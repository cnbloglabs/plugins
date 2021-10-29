// 音乐播放器
import { userAgent, loadScript, loadLink } from '../../utils/helpers'
import { getCurrentPage } from '../../utils/cnblog'
import { defineOptions } from '@acnb/core'

const musicPlayerConfig = defineOptions('musicPlayer', {
  enable: true,
  page: 'all',
  agent: 'pc',
  autoplay: false,
  volume: 0.4,
  lrc: {
    enable: false, // 启用歌词
    type: 1, // 1 -> 字符串歌词 3 -> url 歌词
    color: '', // 颜色
  },
  audio: [
    {
      name: '404 not found',
      artist: 'REOL',
      url: 'https://guangzan.gitee.io/imagehost/awescnb/music/demo4.mp3',
      cover: 'https://guangzan.gitee.io/imagehost/awescnb/music/demo.jpg',
      lrc: ``,
    },
  ],
})

const aplayerjs =
  'https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.js'
const aplayercss =
  'https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.css'

/**
 * 构建音乐播放器
 * @param {*} autoplay
 * @param {*} audio
 * @param {*} volume
 * @param {*} lrc
 */
function buildPlayer(autoplay, audio, volume, lrc) {
  $('body').append('<div id="player" class="aplayer music-APlayer"></div>')

  const ap = new APlayer({
    container: document.getElementById('player'),
    fixed: true,
    preload: 'auto',
    autoplay,
    volume,
    lrcType: lrc.enable ? lrc.type : null,
    audio,
  })

  window.onbeforeunload = () => {
    const audioTime = ap.audio.currentTime
    localStorage.audioTime = audioTime
  }

  window.onload = () => {
    ap.seek(localStorage.audioTime ? Number(localStorage.audioTime) : 0)
  }

  if (autoplay) {
    $('.aplayer-lrc').show()
  }

  if (localStorage.playerState === 'on') {
    ap.play()
  }

  ap.on('play', () => {
    localStorage.playerState = 'on'
    if (lrc.enable) {
      $('.aplayer-lrc').show()
    }
  })

  ap.on('pause', () => {
    localStorage.playerState = 'off'
    if (lrc.enable) {
      $('.aplayer-lrc').hide()
    }
  })

  if (lrc.enable && lrc.color !== '') {
    $('.aplayer-lrc').css('color', lrc.color)
  }
}

export const musicPlayer = (theme, devOptions) => {
  const { enable, page, agent, autoplay, audio, volume, lrc } =
    musicPlayerConfig(devOptions)

  if (!enable) return
  if (page !== getCurrentPage() && page !== 'all') return
  if (agent !== userAgent() && agent !== 'all') return
  loadLink(aplayercss)
  loadScript(aplayerjs, () => {
    buildPlayer(autoplay, audio, volume, lrc)
  })
}
