import React, { Component } from 'react';
import Order from '../../components/Orders/Order'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/indexExport'
import { connect } from 'react-redux'

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchedOrders(this.props.token)
    }
    render () {
        let order = <Spinner />;
        if(this.props.orders.length <= 0) {
            order = <h3>No Active Orders</h3>
        } else if(!this.props.loading) {
            order = this.props.orders.map(order => (
                <Order
                    key={order.id}
                    id={order.id}
                    ingredients={order.ingredients}
                    price={order.price}/>
            ));
        }
        return (
            <div style={{"marginTop": "50px"}}>
                {order}
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        orders: state.orderReducer.orders,
        loading: state.orderReducer.loading,
        token: state.authReducer.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchedOrders: (token) => dispatch(actions.tryFetchOrders(token,localStorage.getItem('userId')))
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(withErrorHandler(Orders,axios));