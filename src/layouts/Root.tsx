import {
  MantineProvider,
  createEmotionCache,
  AppShell,
  MantineTheme,
  MantineThemeOverride,
  Container
} from '@mantine/core'

import { Notifications } from '@mantine/notifications'

import rtlPlugin from 'stylis-plugin-rtl'
import { Outlet } from 'react-router-dom'

import AppHeader from '@components/AppHeader'
import { CustomFonts } from '@/CustomFonts'

const rtlCache = createEmotionCache({
  key: 'mantine-rtl',
  stylisPlugins: [rtlPlugin]
})

function Root() {
  const theme: MantineThemeOverride = {
    fontFamily: 'VazirMatn, tahoma, sans-serif',
    dir: 'rtl',
    colorScheme: 'light',
    primaryColor: 'cyan',
    headings: {
      sizes: {
        h1: { fontSize: '1.6rem' }
      }
    }
  }

  const styles = (theme: MantineTheme) => ({
    main: {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[8]
          : theme.colors.gray[0]
    }
  })

  return (
    <MantineProvider
      emotionCache={rtlCache}
      theme={theme}
      withGlobalStyles
      withNormalizeCSS
    >
      <Notifications />
      <CustomFonts />

      <AppShell header={<AppHeader />} styles={styles}>
        <Container>
          <Outlet />
        </Container>
      </AppShell>
    </MantineProvider>
  )
}

export default Root
