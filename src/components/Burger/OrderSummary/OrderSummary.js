import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {

    render() {
        const ingredientSummary= Object.keys(this.props.ingredient)
        .map(ingredientKey => {
            return <li key={ingredientKey}>
                <span style={{ textTransform: 'capitalize' }}>
                    {ingredientKey}
                </span>: {this.props.ingredient[ingredientKey]}
                </li>
        });

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>Your delicious burger is ready to be ordered with the following fillings:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Continue to checkout ?</p>
                <p>Total Bill: Rs. {this.props.price}</p>
                <Button btnType="Danger" clicked={this.props.cancelOrder}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.proceedOrder}>CONTINUE</Button>
            </Aux>
        );
    };
}

export default OrderSummary;