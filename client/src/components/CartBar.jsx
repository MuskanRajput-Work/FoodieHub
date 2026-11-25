import { Link } from 'react-router-dom';
import { useCart } from './CartContext.jsx';

export default function CartBar() {
  const { cart, count, total } = useCart();
  if (count === 0) return null;

  return (
    <Link to="/cart" className="cart-bar">
      <span>
        {count} item{count > 1 ? 's' : ''} · {cart.restaurant.name}
      </span>
      <strong>View cart · ₹{total}</strong>
    </Link>
  );
}