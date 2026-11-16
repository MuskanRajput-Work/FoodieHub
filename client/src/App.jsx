import { Routes, Route } from 'react-router-dom'
import Login from './components/Login/Login.jsx'
import SignUp from './components/Signup/Signup.jsx'
import Home from './components/Home/Home.jsx'
import Restaurants from './components/Restaurants/Restaurants.jsx'
import RestaurantsMenu from './components/Restaurants/RestaurantsMenu.jsx'
import Protected from './components/Protected/Protected.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import './components/Navbar/Food.css'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={
            <Protected>
              <Home />
            </Protected>
          }
        />
        <Route
          path="/restaurants"
          element={
            <Protected>
              <Restaurants />
            </Protected>
          }
        />
        <Route
          path="/restaurants/:id"
          element={
            <Protected>
              <RestaurantsMenu />
            </Protected>
          }
        />
        <Route
          path="/protected"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
      </Routes>
    </div>
  )
}

export default App