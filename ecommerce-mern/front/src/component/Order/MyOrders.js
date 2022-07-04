import React, { Fragment, useEffect } from "react";
import "./MyOrders.css";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { clearErros, myOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Typography } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";

const MyOrders = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    
    const { loading, error, orders } = useSelector((state) => state.myOrders);
    const { user } = useSelector((state) => state.user);

    const columns = [
        {
            field: "id",
            headerName: "Order ID",
            minWidth: 300,
            flex: 1,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Entregue"
                ? "greenColor"
                : "redColor";
            },
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
        },
        {
            field: "itemsQty",
            headerName: "Itens Qty",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },
        {
            field: "amount",
            headerName: "Total",
            type: "number",
            minWidth: 270,
            flex: 0.5,
        },
        {
            field: "actions",
            headerName: "Ação",
            minWidth: 150,
            flex: 0.3,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Link to={`/order/$(params.getValue(params.id, "id"))`}>
                        <LaunchIcon />
                    </Link>
                );
            }
        },
    ];

    const rows = [];

    orders &&
        orders,forEach((item, index) => {
            rows.push({
                itemsQty: item.orderItems.length,
                id: item._id,
                status: item.orderStatus,
                amount: item.totalPrice,
            });
        });

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErros());
        }
        dispatch(myOrders());
    }, [dispatch, alert, error]);

    return <Fragment>
        <MetaData title={`${user.name} - Compras`} />

        {loading 
            ? (<Loader />)
            : (<div className="myOrdersPage">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className="myOrdersTable"
                    autoHeight
                />
                <Typography id="myOrdersHeading">{user.name}, Minhas Compras</Typography>
            </div>)
        }
    </Fragment>;
}

export default MyOrders;
