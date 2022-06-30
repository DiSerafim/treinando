import React, { Fragment } from "react";
import "./ConfirmOrder.css";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";


// 11:09:10


const ConfirmOrder = ({ history }) => {
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price, 0
    );
    const shippingCharges = subtotal > 1000 ? 0 : 200;
    const tax = subtotal * 0.18;
    const totalPrice = subtotal + tax + shippingCharges;
    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

    const procceedToPayment = () => {
        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice,
        };

        sessionStorage.setItem("orderInfo", JSON.stringify(data));
        history.push("/process/payment");
    };

    return <Fragment>
        <MetaData title="Confirmar pedido" />
        <CheckoutSteps activeStep={1} />

        <div className="confirmOrderPage">
            <div>
                <div className="confirmShippingArea">
                    <Typography>Informações de Envio</Typography>
                    <div className="confirmShippingAreaBox">
                        <div>
                            <p>Nome:</p>
                            <span>{user.name}</span>
                        </div>
                        <div>
                            <p>Telefone:</p>
                            <span>{shippingInfo.phoneNo}</span>
                        </div>
                        <div>
                            <p>Endereço:</p>
                            <span>{address}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="confirmCartItems">
                <Typography>Suas compras:</Typography>
                <div className="confirmCartItemsContainer">
                    {cartItems &&
                        cartItems.map((item) => (
                            <div key={item.product}>
                                <img src={item.image} alt="Procuct" />
                                <Link to={`/product/${item.product}`}>
                                    {item.name}
                                </Link>{" "}
                                <span>
                                    {item.quantity} X R${item.price} = {" "}
                                    <b>R${item.price * item.quantity}</b>
                                </span>
                            </div>
                        ))}
                </div>
            </div>
            {/*  */}
            <div>
                <div className="orderSummary">
                    <Typography>Resumo do pedido</Typography>
                    <div>
                        <div>
                            <p>Subtotal:</p>
                            <span>R${subtotal}</span>
                        </div>
                        <div>
                            <p>Custos de envio:</p>
                            <span>R${shippingCharges}</span>
                        </div>
                        <div>
                            <p>GST:</p>
                            <span>R${tax}</span>
                        </div>
                    </div>

                    <div className="orderSummaryTotal">
                        <p>
                            <b>Total:</b>
                        </p>
                        <span>R${totalPrice}</span>
                    </div>

                    <button onClick={procceedToPayment}>Processar Pagamento</button>
                </div>
            </div>
        </div>
    </Fragment>;
}

export default ConfirmOrder;