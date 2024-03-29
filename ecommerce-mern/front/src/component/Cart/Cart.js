import React, { Fragment } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";


// 10:35:45


const Cart = ({ history }) => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    }

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (1 >= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    }

    const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id));
    };

    const checkoutHandler = () => {
        history.push("/login?redirect=shipping");
    }

    return (
        <Fragment>
            {cartItems.length === 0 ? (
                <div className="emptyCart">
                    <RemoveShoppingCartIcon />
                    <Typography>Carrinho Vazio</Typography>
                    <Link to="/products">Ver Produtos</Link>
                </div>
                ) : (
                <Fragment>
                    <div className="cartPage">
                        <div className="cartHeader">
                            <p>Produto</p>
                            <p>Quantidade</p>
                            <p>Subtotal</p>
                        </div>

                        {cartItems && cartItems.map((item) => (
                            <div className="cartContainer" key={item.product}>
                                <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                                <div className="cartIput">
                                <button onClick={() => decreaseQuantity(item.product, item.quantity)}>-</button>
                                <input type="number" value={item.quantity} readOnly />
                                <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>+</button>
                            </div>
                                <p className="cartSubtotal">{`R$${item.price * item.quantity}`}</p>
                            </div>
                        ))}

                        <div className="cartGrossTotal">
                            <div></div>
                            <div className="cartGrossTotalBox">
                                <p>Total</p>
                                <p>{`R$${cartItems.reduce(
                                    (acc, item) => acc + item.quantity * item.price, 0
                                )}`}</p>
                            </div>
                            <div></div>
                            <div className="checkOutBtn">
                                <button onClick={checkoutHandler}>Verificação de saída</button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Cart;