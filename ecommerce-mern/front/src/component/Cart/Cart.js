import React, { Fragment } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";

const Cart = () => {
    return <Fragment>
        <div className="cartPage">
            <div className="cartHeader">
                <p>Produto</p>
                <p>Quantidade</p>
                <p>Subtotal</p>
            </div>
        </div>
    </Fragment>
};

export default Cart;