// 评论输入表情
import { defineOptions } from '@acnb/core'
import { isPostDetailsPage } from '../../utils/cnblog'
import { isUrl } from '../../utils/helpers'

const emojiList = [
  {
    value: '🤣',
    label: '笑哭',
  },
  {
    value: '😃',
    label: '大笑',
  },
  {
    value: '😅',
    label: '苦笑',
  },
  {
    value: '😆',
    label: '斜眼笑',
  },
  {
    value: '😏',
    label: '得意',
  },
  {
    value: '😊',
    label: '微笑',
  },
  {
    value: '😎',
    label: '酷！',
  },
  {
    value: '😍',
    label: '花痴',
  },
  {
    value: '🙂',
    label: '呵呵',
  },
  {
    value: '🤩',
    label: '好崇拜哦',
  },
  {
    value: '🤔',
    label: '思考',
  },
  {
    value: '🙄',
    label: '白眼',
  },
  {
    value: '😜',
    label: '略略略',
  },
  {
    value: '😲',
    label: '呆住',
  },
  {
    value: '😭',
    label: '大哭',
  },
  {
    value: '🤯',
    label: '头炸了',
  },
  {
    value: '😰',
    label: '冷汗',
  },
  {
    value: '😱',
    label: '吓死了',
  },
  {
    value: '🤪',
    label: '略略略',
  },
  {
    value: '😵',
    label: '晕',
  },
  {
    value: '😡',
    label: '愤怒',
  },
  {
    value: '🥳',
    label: '祝贺',
  },
  {
    value: '🤡',
    label: '小丑竟是我',
  },
  {
    value: '🤫',
    label: '嘘~',
  },
  {
    value: '🐒',
    label: '猴',
  },
  {
    value: '🤭',
    label: '笑笑不说话',
  },
  {
    value: '🐂',
    label: '牛',
  },
  {
    value: '🍺',
    label: '啤酒',
  },
  {
    value: '(=・ω・=)',
    label: '',
  },
  {
    value: '(｡･ω･｡)',
    label: '',
  },
]

export const emojiConfig = defineOptions('emoji', {
  enable: true,
  buttonIcon: '🍺',
  emojiList,
})

/**
 * 创建按钮
 * @returns {HTMLElement}
 */
function createEmojiButton(buttonIcon) {
  return `<span class="qaq-btn" title="表情">${buttonIcon}</span>`
}

/**
 * 创建表情项
 * @param {Object} itemData
 * @returns
 */
function createEmojiItem(itemData) {
  const { value, label } = itemData
  const el = $('<div>').addClass('emoji-item')

  if (isUrl(value)) {
    const emoji = $('<img />').addClass('emoji emoji-img').attr('src', value)
    el.append(emoji)
  } else {
    el.append(`<div class="emoji emoji-text">${value}</div>`)
  }

  if (typeof label === 'string') {
    el.attr('title', label)
  }

  return el
}

/**
 * 创建表情列表
 * @param {Array} emojiList
 * @returns {JQuery Object}
 */
function createEmojiList(emojiList) {
  const $emoji = $(`<div class="emoji-list"></div>`)

  emojiList.forEach(item => {
    const emojiItem = createEmojiItem(item)
    $emoji.append(emojiItem)
  })

  return $emoji
}

/**
 * 创建表情面板容器
 * @returns {JQuery Object}
 */
function createEmojiContainer() {
  return $(`<div>`).addClass('qaq-wrap anim-scale-in')
}

/**
 * 创建表情面板蒙层
 * @returns @returns {JQuery Object}
 */
function createMask() {
  return $(`<div>`).addClass('qaq-mask')
}

/**
 * 打开或关闭表情面板
 */
function qaqToggle() {
  $('.qaq-wrap').toggle()
}

/**
 * 选择表情
 */
function selectEmoji() {
  $('.emoji-item').click(function () {
    const $emoji = $(this).find('.emoji')
    let emojiValue

    const isImgEmoji = $emoji.hasClass('emoji-img')

    if (isImgEmoji) {
      const url = $emoji.attr('src')
      emojiValue = `![](${url})`
    } else {
      const textEmoji = $emoji.html()
      emojiValue = textEmoji
    }

    document.querySelector('#tbCommentBody').value += emojiValue
    qaqToggle()
  })
}

/**
 * 创建表情插件
 * @param {Array} emojiData
 */
function createEmoji(emojiData, buttonIcon) {
  const button = createEmojiButton(buttonIcon)
  const emojiContainer = createEmojiContainer()
  const mask = createMask()
  const emojiList = createEmojiList(emojiData)

  emojiContainer.append(emojiList).append(mask)

  $('.commentbox_title_right').prepend(button).css('position', 'relative')

  $('.qaq-btn')
    .after(emojiContainer)
    .click(() => qaqToggle())

  $('.qaq-mask').click(() => qaqToggle())

  selectEmoji()
}

export const donation = (_theme, devOptions) => {
  const { enable, emojiList, buttonIcon } = emojiConfig(devOptions)

  if (!enable) return
  if (!isPostDetailsPage()) return

  const builder = () => {
    if ($('.qaq-btn').length) return
    if (!$('.commentbox_title_right').length) return
    createEmoji(emojiList, buttonIcon)
  }

  builder()
  window.buildEmojis = builder
}
