import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { clearItems } from "../redux/slices/cartSlice";
import { RootState } from "../redux/store";

import CartItem from "../components/cartItem/CartItem";
import CartEmpty from "../components/cartEmpty/CartEmpty";

import cart from "../assets/img/cart.png";
import trash from "../assets/img/trash.png";

const Cart: React.FC = () => {
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);
  const count = items.reduce((acc, item) => acc + item.count, 0);

  const dispatch = useDispatch();

  const deleteItems = () => {
    dispatch(clearItems());
  };

  if (!count) {
    return <CartEmpty />;
  }

  return (
    <div className="container container--cart">
      <div className="cart">
        <div className="cart__top">
          <h2 className="content__title">
            <img src={cart}></img>
            Cart
          </h2>
          <div onClick={deleteItems} className="cart__clear">
            <img src={trash} width="20" height="20"></img>
            <span>Clear cart</span>
          </div>
        </div>
        <div className="content__items">
          {items.map(
            (item) =>
              item.count > 0 && (
                <CartItem key={item.id + item.size + item.type} {...item} />
              )
          )}
        </div>
        <div className="cart__bottom">
          <div className="cart__bottom-details">
            <span>
              {" "}
              Total pizzas: <b>{count}</b>{" "}
            </span>
            <span>
              {" "}
              Total price: <b>{totalPrice} $</b>{" "}
            </span>
          </div>
          <div className="cart__bottom-buttons">
            <Link
              to="/"
              className="button button--outline button--add go-back-btn"
            >
              <span>Back</span>
            </Link>
            <div className="button pay-btn">
              <span>Buy now</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
