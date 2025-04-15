import './ProfileNav.scss'
import { NavLink } from 'react-router-dom'
import logo from './assets/logo.svg'

export default function ProfileNav(){
    return(
        <nav className="profile"> {/* Ensure class name matches SCSS */}
        <img src={logo} alt="" height={100} />
        <ul>
          <li>
            {/* Use NavLink instead of Link */}
            <NavLink to="/user/join">Join</NavLink>
          </li>
          <li>
            <NavLink to="/user/profiles">All Members</NavLink>
          </li>
        </ul>
        <h1>
      Vai Group: Join Now. 
    </h1>
      </nav>
    )
}