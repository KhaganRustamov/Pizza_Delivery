import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Search from "../search/Search";

import "./header.scss";

import logo from "../../assets/img/pizza-logo.svg";
import cart from "../../assets/img/cart.svg";

const Header = () => {
  const { items, totalPrice } = useSelector((state) => state.cart);
  const totalCount = items.reduce((acc, item) => acc + item.count, 0);

  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img width="38" src={logo} alt="Pizza logo" />
            <div>
              <h1>pizza delivery</h1>
            </div>
          </div>
        </Link>
        <Search />
        <div className="header__cart">
          <Link to="/cart" className="button button--cart">
            <span>{totalPrice} ₽</span>
            <div className="button__delimiter"></div>
            <img className="cart" src={cart} alt="Cart" />
            <span>{totalCount}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
