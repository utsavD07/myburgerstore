import React, { Component } from 'react';
import CheckoutSummary from '../../components/Orders/CheckoutSummary/CheckoutSummary'
import { Route, Redirect } from 'react-router-dom';
import ContactDetails from '../../containers/Checkout/ContactDetails/ContactDetails'
import { connect } from 'react-redux'

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutPurchasedHandler = () => {
        this.props.history.replace("/checkout/contact-details");
    }
    render () {
        let checkoutSummary = <Redirect to="/" />;

        if(this.props.ings) {
            const purchaseBurgerRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            checkoutSummary = (
                <div>
                    {purchaseBurgerRedirect}
                    <CheckoutSummary 
                        ingredients={this.props.ings}
                        purchase={this.checkoutPurchasedHandler}
                        cancel={this.checkoutCancelledHandler}/>
                    <Route 
                        path={this.props.match.path + "/contact-details"} 
                        component={ContactDetails} />
                </div>
            )
        }

        return (
            <div>
                {checkoutSummary}
                </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilderReducer.ingredients,
        purchased: state.orderReducer.purchased
    }
}

export default connect(mapStateToProps)(Checkout);