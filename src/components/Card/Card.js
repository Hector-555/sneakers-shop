import { useContext } from "react";
import AppContext from "../../context";
import "./Card.scss";

function Card({
  img,
  title,
  price,
  id,
  addToCart,
  addToFavorite
}) {
  const { isItemAdded, isItemFavorite } = useContext(AppContext);
  const obj = {title, img, price, id, parentId: id}

  const onClickPlusBtn = () => {
    addToCart(obj);
  };

  const addItemToFavorite = () => {
    addToFavorite(obj);
  };

  return (
    <div className="card">
      <div className="favorite" onClick={addItemToFavorite}>
        {addToFavorite && <img
          width={25}
          height={25}
          src={isItemFavorite(id) ? "/img/heart_red.svg" : "/img/heart_white.svg"}
          alt="в избранное"
        />}
      </div>

      <img width={133} height={85} src={img} alt="sneakers" />
      <h5>{title}</h5>
      <div className="card-bottom">
        <div className="card-bottom__price">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        {addToCart && <button className="btn" onClick={onClickPlusBtn}>
          <img
            src={isItemAdded(id) ? "/img/checkmark.svg" : "/img/add-btn.svg"}
            width={30}
            height={30}
            alt="add"
          />
        </button>}
      </div>
    </div>
  );
}

export default Card;
