import './App.css';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import ProfileForm from './components/ProfileForm';
import ProfileList from './components/ProfileList';
import './ProfileNav.scss'
import cover from "./assets/cover.jpg"

function HomePage() {
  return (

    <>  
    
      <nav className="profile"> {/* Ensure class name matches SCSS */}
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
      


      </>

  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/profiles" element={<ProfileList />} />
        <Route path="/user/join" element={<ProfileForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
export { HomePage };