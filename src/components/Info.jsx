import React from "react";

function Info({ onCloseCart, isBackAvaible }) {
  const goBackHandler = () => {
    onCloseCart();
    window.location.reload();
  };

  return (
    <div className="cart-empty__wrapper">
      <h2>
        {isBackAvaible ? "Ваш заказ оформлен!" : "Оформляем Ваш заказ..."}
      </h2>
      <p className="info-text">
        {isBackAvaible
          ? "Благодарим за заказ! Ждем Вас снова!"
          : "Это займет пару секунд..."}
      </p>
      <img
        src={isBackAvaible ? "/img/smile.png" : "/img/ordering.png"}
        alt="cart"
        className="info-img"
      />
      <button
        type="button"
        className="cart-btn"
        disabled={isBackAvaible ? false : true}
        onClick={goBackHandler}
      >
        Вернуться назад
      </button>
    </div>
  );
}

export default Info;
