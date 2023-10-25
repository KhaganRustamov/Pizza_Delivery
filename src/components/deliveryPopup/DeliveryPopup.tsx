import { useState } from "react";
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

  const [errorMessage, setErrorMessage] = useState("");

  const handleCardNumberInput = (e: any) => {
    const cardNumberValue = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formattedCardNumber = cardNumberValue.match(/.{1,4}/g).join(" - ");
    dispatch(handleCardNumberChange(formattedCardNumber));
  };

  const handleExpiryDateInput = (e: any) => {
    const expiryDateValue = e.target.value.replace(/\D/g, "").slice(0, 4);
    const formattedExpiryDate = expiryDateValue.match(/.{1,2}/g).join(" / ");
    dispatch(handleExpiryDateChange(formattedExpiryDate));
  };

  const handleFetchPopup: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    if (!isValidCardNumber(cardNumber) || !isValidExpiryDate(expiryDate)) {
      setErrorMessage(
        "Пожалуйста, введите корректные данные карты и срока действия."
      );
      return;
    }

    setErrorMessage("");

    dispatch(fetchPopup()).then((result) => {
      if (fetchPopup.fulfilled.match(result)) {
        dispatch(handleCardNumberChange(""));
        dispatch(handleExpiryDateChange(""));
        dispatch(closePopup());
      }
    });
  };

  const isValidCardNumber = (cardNumber: any) => {
    return cardNumber.replace(/\s/g, "").length === 19;
  };

  const isValidExpiryDate = (expiryDate: any) => {
    return expiryDate.replace(/\s/g, "").length === 5;
  };

  return (
    <>
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => dispatch(closePopup())}>
            &times;
          </span>
          <h2>Введите данные банковской карты</h2>
          <form>
            <label htmlFor="cardNumber">Номер карты:</label>
            <input
              className="delivery-input"
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={cardNumber}
              placeholder="Введите номер карты"
              onChange={handleCardNumberInput}
            />
            <label htmlFor="expiryDate">Срок действия:</label>
            <input
              className="delivery-input"
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={expiryDate}
              placeholder="Введите срок действия"
              onChange={handleExpiryDateInput}
            />
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
            <button className="submit" onClick={handleFetchPopup} type="submit">
              Оформить заказ
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default DeliveryPopup;
