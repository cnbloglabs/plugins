// 在随笔详情页尾部图片
import { getCurrentPage } from '../../utils/cnblog'
import { defineOptions } from '@acnb/core'

export const postBottomImageConfig = defineOptions('postBottomImage', {
  enable: false,
  img: '',
  height: '',
})

export const postBottomImage = (theme, devOptions) => {
  const { enable, img, height } = postBottomImageConfig(devOptions)

  if (!enable) return
  if (getCurrentPage() !== 'post') return
  if (img === '') return

  const ele = `<div id="custom-post-bottomimage"></div>`
  const style = {
    'background-image': `url(${img})`,
  }
  if (height !== '') style['height'] = height
  $('#cnblogs_post_body').after(ele)
  $('#custom-post-bottomimage').css(style)
}
