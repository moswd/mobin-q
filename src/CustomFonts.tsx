import { Global } from '@mantine/core'

import thinVazir from '@assets/Vazirmatn-Thin.woff2'
import extraLightVazir from '@assets/Vazirmatn-ExtraLight.woff2'
import lightVazir from '@assets/Vazirmatn-Light.woff2'
import regularVazir from '@assets/Vazirmatn-Regular.woff2'
import mediumVazir from '@assets/Vazirmatn-Medium.woff2'
import semiBoldVazir from '@assets/Vazirmatn-SemiBold.woff2'
import boldVazir from '@assets/Vazirmatn-Bold.woff2'
import extraBoldVazir from '@assets/Vazirmatn-ExtraBold.woff2'
import blackVazir from '@assets/Vazirmatn-Black.woff2'

export function CustomFonts() {
  return (
    <Global
      styles={[
        {
          '@font-face': {
            fontFamily: 'VazirMatn',
            src: `url('${thinVazir}') format("woff2")`,
            fontWeight: 100,
            fontStyle: 'normal'
          }
        },

        {
          '@font-face': {
            fontFamily: 'VazirMatn',
            src: `url('${extraLightVazir}') format("woff2")`,
            fontWeight: 200,
            fontStyle: 'normal'
          }
        },

        {
          '@font-face': {
            fontFamily: 'VazirMatn',
            src: `url('${lightVazir}') format("woff2")`,
            fontWeight: 300,
            fontStyle: 'normal'
          }
        },

        {
          '@font-face': {
            fontFamily: 'VazirMatn',
            src: `url('${regularVazir}') format("woff2")`,
            fontWeight: 400,
            fontStyle: 'normal'
          }
        },

        {
          '@font-face': {
            fontFamily: 'VazirMatn',
            src: `url('${mediumVazir}') format("woff2")`,
            fontWeight: 500,
            fontStyle: 'normal'
          }
        },

        {
          '@font-face': {
            fontFamily: 'VazirMatn',
            src: `url('${semiBoldVazir}') format("woff2")`,
            fontWeight: 600,
            fontStyle: 'normal'
          }
        },

        {
          '@font-face': {
            fontFamily: 'VazirMatn',
            src: `url('${boldVazir}') format("woff2")`,
            fontWeight: 700,
            fontStyle: 'normal'
          }
        },

        {
          '@font-face': {
            fontFamily: 'VazirMatn',
            src: `url('${extraBoldVazir}') format("woff2")`,
            fontWeight: 800,
            fontStyle: 'normal'
          }
        },

        {
          '@font-face': {
            fontFamily: 'VazirMatn',
            src: `url('${blackVazir}') format("woff2")`,
            fontWeight: 900,
            fontStyle: 'normal'
          }
        }
      ]}
    />
  )
}
