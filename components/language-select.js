import Link from 'next-translate/Link'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import i18nConfig from '../i18n.json'
const {allLanguages} = i18nConfig

export const LanguageSelect = ({pathname = '/'}) => {
  const {t, lang} = useTranslation()

  return allLanguages.map(lng => {
    if (lng === lang) return null

    return (
      <Link href={pathname} lang={lng} key={lng}>
        {t(`common:language-name-${lng}`)}
      </Link>
    )
  })
}
