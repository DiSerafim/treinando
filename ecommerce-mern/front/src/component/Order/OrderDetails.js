import React, { Fragment, useEffect } from "react";
import "./OrderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const OrderDetails = ({ match }) => {
    const { order, error, loading } = useSelector((state) => state.orderDetails);

    const dispatch = useDispatch();
    const alert = useAlert();

    useEffect (() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getOrderDetails(match.params.id));
    }, [dispatch, alert, error, match.params.id]);

    return <Fragment>
        {loading
            ? <Loader />
            : <Fragment>
                <MetaData title="Detalhes das compras" />

                <div className="orderDetailsPage">
                    <div className="orderDetailsContainer">
                        <Typography component="h1">
                            Pedido #{order && order._id}
                        </Typography>
                        <Typography>Informações de envio</Typography>
                        <div className="orderDetailsContainerBox">
                            <div>
                                <p>Nome:</p>
                                <span>{order.user && order.user.name}</span>
                            </div>
                            <div>
                                <p>Telefone:</p>
                                <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
                            </div>
                            <div>
                                <p>Endereço</p>
                                <span>
                                    {order.shippingInfo &&
                                        `${order.shippingInfo.address},
                                        ${order.shippingInfo.city},
                                        ${order.shippingInfo.state},
                                        ${order.shippingInfo.pinCode},
                                        ${orde.shippingInfo.phoneNo}`}
                                </span>
                            </div>
                        </div>
                        <Typography>Pagamento</Typography>
                        <div className="orderDetailsContainerBox">
                            <div>
                                <p
                                    className={
                                        order.paymentInfo &&
                                        order.paymentInfo.status === "succeeded"
                                            ? "greenColor"
                                            : "redColor"
                                    }
                                >
                                    {order.paymentInfo &&
                                    order.paymentInfo.status === "succeeded"
                                        ? "Pago"
                                        : "Não Pago"}
                                </p>
                            </div>
                            <div>
                                <p>Total:</p>
                                <span>{order.totalPrice && order.totalPrice}</span>
                            </div>
                        </div>
                        <Typography>Status dos pedidos</Typography>
                        <div className="orderDetailsContainerBox">
                            <div>
                                <p
                                    className={
                                        order.orderStatus && order.orderStatus === "Entregue"
                                            ? "greenColor"
                                            : "redColor"
                                    }
                                >
                                    {order.orderStatus && order.orderStatus}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="orderDetailsCartItems">
                        <Typography>Itens no Carrinho</Typography>
                        <div className="orderDetailsCartItemsContainer">
                            {order.orderItems &&
                                order.orderItems.map((item) => (
                                    <div key={item.product}>
                                        <img src={item.image} alt="product" />
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>{" "}
                                        <span>
                                            {item.quantity} X R${item.price} ={" "}
                                            <b>R${item.price * item.quantity}</b>
                                        </span>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </Fragment>
        }
    </Fragment>;
}

export default OrderDetails;