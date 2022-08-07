import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./OrderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
    return (
        <div className="orderSuccess">
            <CheckCircleIcon />
            <Typography>Pagamento enviado para aprovação.</Typography>
            <Link to="/orders">Voltar as compras</Link>
        </div>
    );
};

export default OrderSuccess;