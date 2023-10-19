import { useDispatch } from "react-redux";

import { addItem, removeItem, minusItem } from "../../redux/slices/cartSlice";

interface CartProps {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  count: number;
  type: string;
  size: number;
}

const CartItem: React.FC<CartProps> = ({
  id,
  title,
  price,
  imageUrl,
  count,
  type,
  size,
}) => {
  const dispatch = useDispatch();

  const values = { id, size, type };

  const onClickPlus = () => {
    dispatch(addItem(values));
  };

  const onClickMinus = () => {
    dispatch(minusItem(values));
  };

  const onClickRemove = () => {
    dispatch(removeItem(values));
  };

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>
          {type}, {size} см.
        </p>
      </div>
      <div className="cart__item-count">
        <button
          onClick={onClickMinus}
          className="button button--outline button--circle"
        >
          <span>-</span>
        </button>
        <b>{count}</b>
        <button
          onClick={onClickPlus}
          className="button button--outline button--circle"
        >
          <span>+</span>
        </button>
      </div>
      <div className="cart__item-price">
        <b>{price * count} ₽</b>
      </div>
      <div className="cart__item-remove">
        <button
          onClick={onClickRemove}
          className="button button--outline button--circle"
        >
          <span>x</span>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
