import * as actionTypes from '../actions/actionTypes'

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.PURCHASE_BURGER_INIT):
            return {
                ...state,
                purchased: false
            }

        case (actionTypes.PURCHASE_BURGER_LOADING):
            return{
                ...state,
                loading: true
            }

        case (actionTypes.PURCHASE_BURGER_SUCCESS):
            const newOrder = {
                ...action.orderData,
                id: action.id,
            }
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder)
            }

        case (actionTypes.PURCHASE_BURGER_FAILED):
            return {
                ...state,
                loading: false,
            }

        case (actionTypes.FETCH_ORDERS_SUCCESS):
            return {
                ...state,
                orders: action.orders,
                loading: false
            }

        case (actionTypes.FETCH_ORDERS_FAILED):
            return {
                ...state,
                loading: false
            }

        case (actionTypes.FETCH_ORDERS_LOADING):
            return {
                ...state,
                loading: true
            }

        case (actionTypes.DELETE_ORDER_SUCCESS):
            return {
                ...state,
                orders: state.orders.filter((order) => order.id !== action.id)
            }

        case (actionTypes.DELETE_ORDER_FAILED):
            return {
                ...state
            }

        default:
            return state;
    }
}

export default orderReducer;