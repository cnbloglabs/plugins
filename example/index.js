import { createTheme } from '@acnb/core'
import { notice } from '../src/index'
import '../src/plugins/notice/index.scss'

const theme = createTheme()

theme.use(notice, { enable: true })
