import React from "react";
import AppContext from "../context";

export const useCart = () => {
    const {cartGoods, setCartGoods} = React.useContext(AppContext)
    const totalPrice = cartGoods.reduce((sum, obj) => +obj.price + sum, 0)

    return { cartGoods, setCartGoods, totalPrice }
}