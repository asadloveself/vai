import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import ProfileForm from './components/ProfileForm';
import ProfileList from './components/ProfileList'; 
import ProfileNav from './ProfileNav';

function HomePage() {
  return (
    <ProfileNav/>
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