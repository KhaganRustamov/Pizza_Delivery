const CartItem = ({ id, title, price, imageUrl, count, type }) => {
  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>{type}, 26 см.</p>
      </div>
      <div className="cart__item-count">
        <div className="button button--outline button--circle cart__item-count-minus">
          <span>-</span>
        </div>
        <b>{count}</b>
        <div className="button button--outline button--circle cart__item-count-plus">
          <span>+</span>
        </div>
      </div>
      <div className="cart__item-price">
        <b>{price * count} ₽</b>
      </div>
      <div className="cart__item-remove">
        <div className="button button--outline button--circle">
          <span>x</span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
