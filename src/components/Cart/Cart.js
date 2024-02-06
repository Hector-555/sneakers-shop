import { useState } from "react";
import axios from "axios";
import CartEmpty from "../CartEmpty";
import Info from "../Info";
import { useCart } from "../../hooks/useCart";
import './Cart.scss'

function Cart({ onCloseCart, onRemoveItem, goods = [], opened }) {
  const { cartGoods, totalPrice } = useCart();
  const [makeOrder, setMakeOrder] = useState(false);
  const [isBackAvaible, setIsBackAvaible] = useState(false);

  const makeOrderHandler = async () => {
    setMakeOrder(true);

    for (let i = 0; i < cartGoods.length; i++) {
      const item = cartGoods[i];
      await axios.delete(
        "https://65aa4254081bd82e1d9679c4.mockapi.io/cart/" + item.id
      );
    }

    setTimeout(() => {
      setIsBackAvaible(true);
    }, 3000);
  };

  return (
    <div className={opened ? 'overlay overlay-visible' : 'overlay'}>
      {!makeOrder ? (
        <div className="drawer">
          <h2>
            Корзина
            <button className="remove-btn" onClick={onCloseCart}>
              <img width={20} height={20} src="/img/cross.svg" alt="удалить" />
            </button>
          </h2>
          <div className="cart-items">
            {goods.length === 0 ? (
              <CartEmpty />
            ) : (
              goods.map((obj) => (
                <div className="cart-item" key={obj.id}>
                  <img width={70} height={45} src={obj.img} alt="sneakers" />
                  <div className="cart-item__descr">
                    <p>{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => onRemoveItem(obj.id)}
                  >
                    <img
                      width={20}
                      height={20}
                      src="/img/cross.svg"
                      alt="удалить"
                    />
                  </button>
                </div>
              ))
            )}
          </div>

          {goods.length !== 0 && (
            <>
              <ul className="cart-items-footer">
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб.</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{totalPrice * 0.05} руб.</b>
                </li>
              </ul>
              <button className="cart-btn" onClick={makeOrderHandler}>
                Оформить заказ <img src="/img/arrow.svg" alt="arrow" />
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="drawer">
          <Info onCloseCart={onCloseCart} isBackAvaible={isBackAvaible} />
        </div>
      )}
    </div>
  );
}

export default Cart;
