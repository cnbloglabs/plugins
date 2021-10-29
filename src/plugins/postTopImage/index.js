// 在随笔详情页顶部随笔生成一个文章头图
import { usePostTopimageOptions } from '@acnb/options'
import { randomImgurl, randomArrayElements } from '../../utils/helpers'
import { isPostDetailsPage } from '../../utils/cnblog'

export const postTopImage = (theme, devOptions) => {
  const { enable, imgs, fixed } = usePostTopimageOptions(devOptions)

  if (!enable) return
  if (!isPostDetailsPage()) return

  const url =
    imgs.length === 0 ? randomImgurl() : randomArrayElements(imgs, 1)[0]
  const ele = `<a  href="${url}" target="blank"><div id="custom-post-topimage"></div></a>`
  const style = {
    'background-image': `url(${url})`,
  }

  if (fixed) style['background-attachment'] = 'fixed'
  $('.post>.postTitle').before(ele)
  $('#custom-post-topimage').css(style)
}
