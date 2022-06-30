import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./OrderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
    return (
        <div className="orderSuccess">
            <CheckCircleIcon />
            <Typography>Pedido efetuado com sucesso.</Typography>
            <Link to="/order/me">Ver pedidos</Link>
        </div>
    );
};

export default OrderSuccess;