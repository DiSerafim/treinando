import {
    CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    MY_ORDERS_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    ORDERS_DETAILS_FAIL,
    ORDERS_DETAILS_REQUEST,
    ORDERS_DETAILS_SUCCESS,
    CLEAR_ERRORS,
} from "../constants/orderConstants";
import axios from "axios";

// Criar pedido
export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post("/api/v1/order/new", order, config);
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Meus pedidos
export const myOrders = () => async (dispatch) => {
    try {
        dispatch({ type: MY_ORDERS_REQUEST });
        const { data } = await axios.get("/api/v1/orders/me");
        dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });
    } catch (error) {
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// detalhes do pedido(compra)
export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ORDERS_DETAILS_REQUEST });
        const { data } = await axios.get(`/api/v1/order/${id}`);
        dispatch({ type: ORDERS_DETAILS_SUCCESS.at, payload: data.order });
    } catch (error) {
        dispatch({
            type: ORDERS_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};


// Limpando erros
export const clearErros = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};