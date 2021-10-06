import { createTheme } from '@acnb/core'
import { background, clickEffects } from '../packages/index'
import '../packages/tools/index.scss'

const theme = createTheme()

theme.use(background, { enable: true, value: 'red' }).use(clickEffects, {
  enable: true,
})
