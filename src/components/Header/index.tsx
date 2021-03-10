/**
 * Reusable Header component.
 */

// Styles
import './Header.scss'

// Assets
import {ReactComponent as RedditReactLogo} from '../../assets/react-for-reddit.svg'

const Header = () => (
  <a className='Header' href='/'>
    <RedditReactLogo/>
    <div>
      <h1>React</h1>
      <h2>for Reddit</h2>
    </div>
  </a>
)

export default Header
