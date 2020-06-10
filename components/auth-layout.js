import {IconWaveUp, IconLogo, IconWaveDown} from './index'

export const AuthLayout = ({children}) => (
  <div className="layout -fill">
    <IconWaveUp className="layout__wave -up" />

    <IconLogo />

    <h1 className="logo__title">kindrednotes</h1>

    {children}

    <IconWaveDown className="layout__wave -down" />
  </div>
)
