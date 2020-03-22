import React, { Component } from 'react';
import classes from './Order.css'
import Button from '../UI/Button/Button'
import Modal from '../UI/Modal/Modal'
import * as actions from '../../store/actions/indexExport'
import { connect } from 'react-redux'
class Order extends Component {
    state = {
        deletion: false
    }
    deleteOrderHandler = () => {
        this.setState({deletion: !this.state.deletion})
    }

    cancelDeleteHandler = () => {
        this.setState({deletion: false})
    }

    confirmDeleteOrderHandler = (id) => {
        this.props.confirmDeleteOrder(id);
    }

    render () {
        const outputOrders = []
        for (let ing in this.props.ingredients) {
            outputOrders.push({
                name: ing,
                quantity: this.props.ingredients[ing]
            });
        }
        const output = outputOrders.map(out => {
            return (
                <span
                    style={{
                        textTransform: 'capitalize',
                        display: 'inline-block',
                        margin: '0 8px',
                        border: '1px solid grey',
                        padding: '2px'
                    }}
                    key={out.name}>
                        {out.name} {out.quantity}
                </span>
            );
        });
            
        return (
            <div className={classes.Order}>
                <Modal show={this.state.deletion} closeModal={this.cancelDeleteHandler}>
                    <p>Are you sure you want to delete this order ?</p>
                    <Button btnType="Success" clicked={this.cancelDeleteHandler}>Cancel</Button>
                    <Button btnType="Danger" clicked={() => this.confirmDeleteOrderHandler(this.props.id)}>Delete Order</Button>
                </Modal>
                <p>Ingredients: {output}</p>
                <p>Price= <strong>Rs. {this.props.price}</strong></p>
                <Button btnType="Danger" clicked={this.deleteOrderHandler}>Delete Order</Button>
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        orders: state.orderReducer.orders
    }
}

const mapDispatchToProps = dispatch => {
    return {
        confirmDeleteOrder: (id) => dispatch(actions.tryDeleteOrder(id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Order);