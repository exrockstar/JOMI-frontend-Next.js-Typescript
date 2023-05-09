import { Language } from '@mui/icons-material'
import {
  MenuItem,
  Select,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  Link as MuiLink
} from '@mui/material'
import { ThemeProvider, useTheme } from '@mui/material/styles'
import { defaultTheme, frontPageTheme } from 'components/theme'
import Link from 'next/link'
import { useRouter } from 'next/router'

import React, { memo, useCallback, useEffect, useState } from 'react'

/**
 * *NOTE: We will uncomment other languages over time
 */
export const localeOptions = [
  { label: 'English', value: 'en' },
  { label: 'हिन्दी', value: 'hi' },
  { label: 'العربية', value: 'ar' },
  { label: '中文', value: 'zh' },
  { label: 'Nederlands', value: 'nl' },
  { label: 'Français', value: 'fr' },
  { label: 'Deutsch', value: 'de' },
  { label: 'עִבְרִית', value: 'he' },
  { label: 'Italiano', value: 'it' },
  { label: '日本語', value: 'ja' },
  { label: '한국어', value: 'ko' },
  { label: 'Português', value: 'pt' },
  { label: 'Русский', value: 'ru' },
  { label: 'Español', value: 'es' },
  { label: 'Türkçe', value: 'tr' }
]

const DEFAULT_LANGUAGE = localeOptions[0].value
type Props = {
  enabledLanguages?: string[]
}
/**
 * Language switcher for article only
 * @returns
 */
const LanguageSwitcher = ({ enabledLanguages }: Props) => {
  const languages = enabledLanguages ?? []
  const locales = localeOptions.filter((locale) => {
    return ['en', ...languages.map((l) => l.toLowerCase())].includes(
      locale.value
    )
  })
  const router = useRouter()
  const [lang, setLang] = useState(DEFAULT_LANGUAGE)
  const theme = useTheme()
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('md'))
  const params = router.query.slug

  const getUrlParams = useCallback(
    (val: string) => {
      let _params = Array.isArray(params) ? [...params] : [params]

      if (_params.length > 2) {
        _params = _params.slice(0, 2)
      }

      if (val !== DEFAULT_LANGUAGE) {
        _params.push(val)
      }
      return _params.join('/')
    },
    [params]
  )

  useEffect(() => {
    let _params = Array.isArray(params) ? params : [params]
    const _locales = locales.map((l) => l.value)

    const language = _params.find((param) => _locales.includes(param))
    setLang(language ?? DEFAULT_LANGUAGE)
  }, [params, locales])

  return (
    <ThemeProvider theme={isSmallDevice ? frontPageTheme : defaultTheme}>
      <Tooltip title="Automated Translations" arrow placement="top">
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          mt={2}
          px={2}
          justifyContent="space-between"
        >
          {!isSmallDevice ? (
            <Language />
          ) : (
            <Stack direction="row" spacing={2}>
              <Language sx={{ color: 'text.primary' }} />
              <Typography sx={{ color: 'text.primary' }}>
                Automated Translations:
              </Typography>
            </Stack>
          )}

          <Select size="small" value={lang} fullWidth={!isSmallDevice}>
            {locales.map((locale) => {
              const url = `/article/${getUrlParams(locale.value)}`
              return (
                <MenuItem key={locale.value} value={locale.value.toLowerCase()}>
                  <Link href={url} passHref prefetch={false} legacyBehavior>
                    <MuiLink underline="none" width="100%">
                      {locale.label}
                    </MuiLink>
                  </Link>
                </MenuItem>
              )
            })}
          </Select>
        </Stack>
      </Tooltip>
    </ThemeProvider>
  )
}

export default memo(LanguageSwitcher)
