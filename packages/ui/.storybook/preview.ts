import { themeCreator } from '../theme/base'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { withThemeFromJSXProvider } from '@storybook/addon-themes'

//TODO: Add themes into a separated project
const pureLight = themeCreator('PureLightTheme')
const purpleFlowTheme = themeCreator('PurpleFlowTheme')
const nebulaFightherTheme = themeCreator('NebulaFighterTheme')
// Load Material UI fonts
import '@fontsource/material-icons'

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    withThemeFromJSXProvider({
      themes: {
        pureLight: pureLight,
        purpleFlow: purpleFlowTheme,
        nebulaFighter: nebulaFightherTheme,
      },
      defaultTheme: 'pureLight',
      Provider: ThemeProvider,
      GlobalStyles: CssBaseline,
    }),
  ],
}
export default preview
