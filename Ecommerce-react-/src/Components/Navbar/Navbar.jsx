import React, { useContext } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import cart_icon from '../Assets/cart_icon.png'
import { ShopContext } from '../../Context/ShopContext'

const Navbar = () => {
    const { GetTotalCartItems } = useContext(ShopContext);
    const [menu, setMenu] = React.useState("Home");

    return (
        <div className='navbar'>
            <div className="nav-logo">
                <p>COMPLETE</p>
            </div>
            <ul className="nav-menu">
                <li onClick={() => { setMenu("Home") }}><Link style={{ textDecoration: 'none' }} to='/'>HOME</Link>{menu === "Home" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("Contact") }}><Link style={{ textDecoration: 'none' }} to='/contact'>CONTACT</Link>{menu === "Contact" ? <hr /> : <></>}</li>
            </ul>
            <div className="nav-login-cart">
                <Link to='/login'><button>Login</button></Link>
                <Link to='/cart'><img src={cart_icon} alt="" /></Link>
                <div className="nav-cart-count">{GetTotalCartItems()}</div>
            </div>
        </div>
    );
}

export default Navbar;
