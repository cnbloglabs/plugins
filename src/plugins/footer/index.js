import { defineOptions } from '@acnb/core'

export const footerConfig = defineOptions('footer', {
  enable: true,
  links: [],
})

/**
 * 构建 copyright
 */
function buildCopyright() {
  const nickName = $('#profile_block a:first').text().trim()

  const el = `<div id='copyright'>
                    <span>Copyright © ${new Date().getFullYear()} ${nickName}</span>
                    <span> Powered by you 🌊 Theme in ${'awescnb'.link(
                      '#'
                    )}</span>
                </div>`

  $('#footer').empty().append(el)
}

/**
 * 构建自定义链接
 */
function buildCustomLinks(devOptions) {
  const config = footerConfig(devOptions)

  if (config.links.length) {
    let $links = $('<ul id="links"></ul>')
    for (let { name, link } of config.links) {
      $links.append(`<li><a href='${link}'>${name}</a></li>`)
    }
    $('#footer').prepend($links.prop('outerHTML'))
  }
}

export const footer = (theme, devOptions) => {
  buildCopyright()
  buildCustomLinks(devOptions)
}
