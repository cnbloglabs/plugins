import { useDonationOptions } from '@acnb/options'
import { getCurrentPage } from '../../utils/cnblog'

/**
 * 二维码展开收起操作
 */
function qrcodeToggle() {
  $('#custom-donation-btn').click(function () {
    $('#custom-donation-qrcode').toggle('swing')
  })
  $('#custom-donation-qrcode div').click(function () {
    $(this).parent().toggle('linear')
  })
}

export const donation = (theme, devOptions) => {
  const { enable, qrcodes } = useDonationOptions(devOptions)

  if (!enable) return
  if (getCurrentPage() !== 'post') return
  if (!qrcodes.length) return

  const btn = `<a id="custom-donation-btn">打赏</a>`
  const qrcode = $(`<div id="custom-donation-qrcode"></div>`)

  qrcodes.forEach((item) => {
    qrcode.append(`<div style="background-image: url(${item})"></div>`)
  })

  $('#green_channel_favorite').after(btn)
  $('#blog_post_info').before(qrcode)

  qrcodeToggle()
}
