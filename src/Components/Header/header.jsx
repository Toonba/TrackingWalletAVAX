import fentigazo from '../../Assets/fentigazo.png'
import faucheuse from '../../Assets/faucheuse.png'
import skull from '../../Assets/skull.png'
import '../../Styles/header.css'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header>
      <nav>
        <Link to="/tracking-wallet">Wallet Tracking</Link>
        <Link to="/redacted">[REDACTED]</Link>
        <Link to="/redacted">[REDACTED]</Link>
        <Link to="/redacted">[REDACTED]</Link>
      </nav>
    </header>
  )
}

export default Header
