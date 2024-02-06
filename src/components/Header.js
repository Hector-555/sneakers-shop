import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

function Header(props) {
  const { totalPrice } = useCart();

  return (
    <header className="header">
      <Link to="/">
        <div className="header-left">
          <img src="/img/logo.png" width={40} height={40} alt="logo" />
          <div className="header-info">
            <h3>Sneakers</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>

      <ul className="header-right">
        <li onClick={props.onClickCart}>
          <img src="/img/cart.svg" width={18} height={18} alt="logo" />
          <span>{totalPrice} руб.</span>
        </li>
        <li>
          <Link to="/favorites">
            <img src="/img/heart_white.svg" width={18} height={18} alt="fav" />
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <img src="/img/user.svg" width={18} height={18} alt="logo" />
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
