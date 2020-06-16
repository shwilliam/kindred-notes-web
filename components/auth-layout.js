import {IconLogo, IconWaveDown, IconWaveUp} from './index'

export const AuthLayout = ({open = true, children}) => (
  <main className="layout -fill">
    <IconWaveUp className={`wave -up ${open ? '' : '-closed'}`} />

    <IconLogo className="logo" />

    <h1 className="logo__title">kindrednotes</h1>

    <div className={`wave__content ${open ? '' : '-closed'}`}>{children}</div>

    <IconWaveDown className={`wave -down ${open ? '' : '-closed'}`} />
  </main>
)
