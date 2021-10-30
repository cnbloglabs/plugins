import { createTheme } from '@acnb/core'
import { codeCopy } from '../src/index'
import '../src/plugins/codeCopy/index.scss'

const theme = createTheme()

theme.use(codeCopy, { enable: true })
