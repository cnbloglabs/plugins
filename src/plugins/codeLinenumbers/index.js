// 构建代码行号
import { isPostDetailsPage, isMd } from '../../utils/cnblog'
import { defineOptions } from '@acnb/core'

export const linenumbersConfig = defineOptions('codeLinenumbers', {
  enable: true,
})

/**
 * 构建代码行号
 */
function buildLinenumbers() {
  $('pre code').each(function () {
    const linenumberContainer = $('<ul/>').addClass('awes-linenumber')
    const lines = $(this).text().split('\n').length - 1

    for (let i = 1; i <= lines; i++) {
      linenumberContainer.append($('<li/>').text(i))
    }

    $(this).before(linenumberContainer)
  })
}

export const codeLinenumbers = (theme, devOptions) => {
  const { enable } = linenumbersConfig(devOptions)
  if (!isPostDetailsPage) return
  if (!enable) return
  if (!isMd()) return
  buildLinenumbers()
}
