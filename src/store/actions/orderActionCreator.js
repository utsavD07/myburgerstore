import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        id: id,
        orderData: orderData
    }
}

export const purchaseBurgerFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error
    }
}

export const purchaseBurgerLoading = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_LOADING
    }
}

export const tryPurchaseBurger = (orderData,token) => {
    return dispatch => {
        dispatch(purchaseBurgerLoading());
        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
                alert("Order Placed");
            })
            .catch(error => {
                dispatch(purchaseBurgerFailed(error.response));
                alert("Order could not be placed. Please try again!")
            });
    }
}

export const purchaseBurgerInit = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_INIT
    }
}

export const fetchOrdersLoading = () => {
    return {
        type: actionTypes.FETCH_ORDERS_LOADING
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error
    }
}

export const tryFetchOrders = (token,userId) => {
    return dispatch => {
        dispatch(fetchOrdersLoading());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get("/orders.json" + queryParams)
            .then(response => {
                const fetchedOrders = []
                for (let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key});
                }
                dispatch(fetchOrdersSuccess(fetchedOrders))
            })
            .catch(err => {
                dispatch(fetchOrdersFailed(err))
            })
    }
}

export const tryDeleteOrder = (id) => {
    return dispatch => {
        axios.delete(`https://react-myburger-07.firebaseio.com/orders/${id}.json?auth=` + localStorage.getItem('token'))
            .then(response => {
                dispatch(deleteOrderSuccess(id))
                alert("Order Deleted");
            })
            .catch(error => {
                dispatch(deleteOrderFailed(error))
                alert("Order could not be deleted. Please try again!");
            })
    }
    
}

export const deleteOrderSuccess = (id) => {
    return {
        type: actionTypes.DELETE_ORDER_SUCCESS,
        id: id
    }
}

export const deleteOrderFailed = (error) => {
    return {
        type: actionTypes.DELETE_ORDER_FAILED,
        error: error
    }
}