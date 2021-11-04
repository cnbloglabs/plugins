import { createTheme } from '@acnb/core'
import { catalog } from '../src/index'
import '../src/plugins/catalog/index.scss'

const theme = createTheme()

theme.use(catalog, { enable: true }, { mountedNode: '#top_nav', fn: 'after' })
