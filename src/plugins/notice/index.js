import toast from '../toast'
import { defineOptions } from '@acnb/core'

export const noticeConfig = defineOptions('notice', {
  enable: false,
  text: [],
})

function shoot(textList) {
  const length = textList.length
  for (let i = 0; i < length; i++) {
    toast(textList[i], 'info')
  }
}

export const notice = (theme, devOptions) => {
  const { enable, text } = noticeConfig(devOptions)
  if (!enable && text.length) return
  shoot(text)
}
