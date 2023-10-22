import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { CartItems, addItem } from "../../redux/slices/cartSlice";
import { PizzaItems } from "../../redux/slices/pizzaSlice";
import { RootState } from "../../redux/store";

import "./pizza-block.scss";

const PizzaBlock: React.FC<PizzaItems> = ({
  imageUrl,
  title,
  types,
  sizes,
  price,
  id,
}) => {
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const dispatch = useDispatch();

  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find(
      (obj) =>
        obj.id === id &&
        obj.type === types[activeType] &&
        obj.size === sizes[activeSize]
    )
  );

  const addCount = cartItem ? cartItem.count : 0;

  const coefficients = [
    [1.0, 1.2, 1.5],
    [1.3, 1.6, 1.8],
  ];

  const calculatedPrice = Math.round(
    price * coefficients[activeType][activeSize]
  );

  const onClickAdd = () => {
    const item: CartItems = {
      id,
      title,
      imageUrl,
      price: calculatedPrice,
      type: types[activeType],
      size: sizes[activeSize],
      count: 0,
    };
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((type, i) => (
              <li
                key={i}
                onClick={() => setActiveType(i)}
                className={activeType === i ? "active" : ""}
              >
                {type}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, i) => (
              <li
                key={i}
                onClick={() => setActiveSize(i)}
                className={activeSize === i ? "active" : ""}
              >
                {size} cm.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">{calculatedPrice} $</div>
          <button
            onClick={onClickAdd}
            className="button button--outline button--add"
          >
            <span>Add</span>
            {addCount > 0 && <i>{addCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
