import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closePopup,
  handleCardNumberChange,
  handleExpiryDateChange,
  fetchPopup,
  handlePhoneNumberChange,
} from "../../redux/slices/popupSlice";

import { AppDispatch, RootState } from "../../redux/store";

import "./deliveryPopup.scss";

import { MouseEventHandler, ChangeEvent } from "react";

const DeliveryPopup = () => {
  const { cardNumber, expiryDate, phoneNumber } = useSelector(
    (state: RootState) => state.popup
  );
  const dispatch: AppDispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState("");

  const handleCardNumberInput = (e: ChangeEvent<HTMLInputElement>) => {
    const cardNumberValue = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formattedCardNumber = cardNumberValue.match(/.{1,4}/g);
    const formattedValue = formattedCardNumber
      ? formattedCardNumber.join(" ")
      : "";
    dispatch(handleCardNumberChange(formattedValue));
  };

  const handleExpiryDateInput = (e: ChangeEvent<HTMLInputElement>) => {
    const expiryDateValue = e.target.value.replace(/\D/g, "").slice(0, 4);
    const formattedExpiryDate = expiryDateValue.match(/.{1,2}/g);
    const formattedValue = formattedExpiryDate
      ? formattedExpiryDate.join(" / ")
      : "";
    dispatch(handleExpiryDateChange(formattedValue));
  };

  const handlePhoneNumberInput = (e: ChangeEvent<HTMLInputElement>) => {
    const phoneNumberValue = e.target.value.replace(/\D/g, "").slice(0, 10);
    const formattedPhoneNumber = phoneNumberValue.replace(
      /(\d{3})(\d{3})(\d{2})(\d{2})/,
      "$1 $2 $3 $4"
    );
    dispatch(handlePhoneNumberChange(formattedPhoneNumber));
  };

  const handleFetchPopup: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    if (
      !isValidCardNumber(cardNumber) ||
      !isValidExpiryDate(expiryDate) ||
      !isValidPhoneNumber(phoneNumber)
    ) {
      setErrorMessage(
        "Пожалуйста, введите корректные данные карты, срока действия и номера телефона."
      );
      return;
    }

    setErrorMessage("");

    dispatch(fetchPopup()).then((result) => {
      if (fetchPopup.fulfilled.match(result)) {
        dispatch(handleCardNumberChange(""));
        dispatch(handleExpiryDateChange(""));
        dispatch(handlePhoneNumberChange(""));
        dispatch(closePopup());
      }
    });
  };

  const isValidCardNumber = (cardNumber: string) => {
    return cardNumber.replace(/\s/g, "").length === 16;
  };

  const isValidExpiryDate = (expiryDate: string) => {
    return expiryDate.replace(/\s/g, "").length === 5;
  };

  const isValidPhoneNumber = (phoneNumber: string) => {
    return /^\d{3} \d{3} \d{2} \d{2}$/.test(phoneNumber);
  };

  return (
    <>
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => dispatch(closePopup())}>
            &times;
          </span>
          <h2>Введите данные</h2>
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
            <label htmlFor="phoneNumber">Номер телефона:</label>
            <input
              className="delivery-input"
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              placeholder="055 555 55 55"
              onChange={handlePhoneNumberInput}
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
