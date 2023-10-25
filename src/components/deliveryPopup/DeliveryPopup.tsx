import { useDispatch, useSelector } from "react-redux";
import {
  closePopup,
  handleCardNumberChange,
  handleExpiryDateChange,
  fetchPopup,
} from "../../redux/slices/popupSlice";

import { AppDispatch, RootState } from "../../redux/store";

import "./deliveryPopup.scss";

import { MouseEventHandler } from "react";

const DeliveryPopup = () => {
  const { cardNumber, expiryDate } = useSelector(
    (state: RootState) => state.popup
  );
  const dispatch: AppDispatch = useDispatch();

  const handleFetchPopup: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    dispatch(fetchPopup()).then((result) => {
      if (fetchPopup.fulfilled.match(result)) {
        dispatch(handleCardNumberChange(""));
        dispatch(handleExpiryDateChange(""));
        dispatch(closePopup());
      }
    });
  };

  return (
    <div>
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => dispatch(closePopup())}>
            &times;
          </span>
          <h2>Введите данные банковской карты</h2>
          <form>
            <label htmlFor="cardNumber">Номер карты:</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={cardNumber}
              onChange={(e) => dispatch(handleCardNumberChange(e.target.value))}
            />
            <label htmlFor="expiryDate">Срок действия:</label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={expiryDate}
              onChange={(e) => dispatch(handleExpiryDateChange(e.target.value))}
            />
            <button onClick={handleFetchPopup} type="submit">
              Оформить заказ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPopup;
