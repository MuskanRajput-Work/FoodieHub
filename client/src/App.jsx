import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login/Login.jsx'
import SignUp from './components/Signup/Signup.jsx'
import Home from './components/Home/Home.jsx'
import RestaurantMenu from './components/Restaurants/RestaurantMenu.jsx'
import Protected from './components/Protected.jsx'
import Info from './components/Info.jsx'
import Cart from './components/Cart.jsx';
import Orders from './components/Orders.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Protected><Home /></Protected>} />
      <Route path="/restaurants" element={<Protected><Home /></Protected>} />
      <Route path="/restaurants/:id" element={<Protected><RestaurantMenu /></Protected>} />
      <Route path="/info/:topic" element={<Info />} />
      <Route path="/cart" element={<Protected><Cart /></Protected>} />
<Route path="/orders" element={<Protected><Orders /></Protected>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}