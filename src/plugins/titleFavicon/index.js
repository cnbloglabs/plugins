// 设置网站图标和标题
import { defineOptions } from '@acnb/core'

export const themeConfig = defineOptions('theme', {
  title: '',
  favicon: '',
})

/**
 * 构建网页标题
 * @param {*} title
 */
function setTitle(title) {
  if (title === '') return
  document.title = title
}

/**
 * 构建网页 favicon
 * @param {*} favicon
 */
function setFavicon(favicon) {
  if (favicon === '') return
  const el = document.getElementById('favicon')
  if (el === null) {
    $('title').after(
      `<link id="favicon" rel="shortcut icon" href="${favicon}" type="image/svg+xml">`
    )
  } else {
    el.href = favicon
  }
}

export const titleFavicon = (theme, devOptions) => {
  const { enable, title, favicon } = themeConfig(devOptions)
  if (!enable) return
  setTitle(title)
  setFavicon(favicon)
}
