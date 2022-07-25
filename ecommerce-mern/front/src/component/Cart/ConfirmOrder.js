import React, { Fragment } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

const ConfirmOrder = ({ history }) => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    history.push("/process/payment");
  };

  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={ 1 } />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Informações para o envio do produto</Typography>
            <div className="confirmshippingAreaBox">
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

          <div className="confirmCartItems">
            <Typography>Itens no carrinho:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X {item.price},00 = {" "}
                      <b>{item.price * item.quantity},00</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Resumo do pedido</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>R$ {subtotal},00</span>
              </div>
              <div>
                <p>Custos de envio:</p>
                <span>R$ {shippingCharges},00</span>
              </div>
              <div>
                <p>GST:</p>
                <span>R$ {tax},00</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>R$ {totalPrice},00</span>
            </div>

            <button onClick={proceedToPayment}>Finalizar compra</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;