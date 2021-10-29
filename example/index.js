import { createTheme } from '@acnb/core'
import { tools } from '../src/index'
import '../src/plugins/tools/index.scss'

const theme = createTheme()

theme.use(tools, { enable: true })
