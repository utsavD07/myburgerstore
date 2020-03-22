import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/indexExport';

class BurgerBuilder extends Component{

    state = {
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchaseState (ingredients) {
        const sum= Object.keys(ingredients)
            .map(ingredientKey => {
                return ingredients[ingredientKey]; //el
            })
            .reduce((currSum,el) => {
                return currSum+el;
            },0);

        return sum > 0;
    }

    // addIngredientHandler = (type) => {
    //     const oldCount= this.state.ingredients[type];
    //     const updatedCount= oldCount+1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type]= updatedCount;
    //     const addedPrice= Ingredients_Price[type];
    //     const oldPrice= this.state.totalPrice;
    //     const newPrice= oldPrice + addedPrice;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount= this.state.ingredients[type];
    //     if(oldCount <= 0)
    //     {
    //         return;
    //     }
    //     const updatedCount= oldCount-1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type]= updatedCount;
    //     const removedPrice= Ingredients_Price[type];
    //     const oldPrice= this.state.totalPrice;
    //     const newPrice= oldPrice - removedPrice;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchaseHandler = () => {
        if(this.props.authenticated) {
            this.setState({purchasing: true})
        }
        else {
            this.props.onSetAuthRedirectPath("/checkout")
            this.props.history.push("/authentication")
        }
    }

    continuePurchaseHandler = () => {
        this.props.onPurchaseInit();
        this.props.history.push('/checkout');
    }

    cancelPurchaseHandler = () => {
        this.setState({purchasing: false})
    }

    render(){

        const disabledButtonInfo = {
            ...this.props.ings
        };

        for(let i in disabledButtonInfo){
            disabledButtonInfo[i] = disabledButtonInfo[i] <= 0
        }

        let orderSummary = null;

        let burger = this.props.error ? <p style={{marginTop: '55px'}}>Sorry! The ingredients cannot be loaded.</p> : <Spinner />;
        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <div>
                        <BuildControls 
                            addIngredient= {this.props.onIngredientAdded}
                            removeIngredient= {this.props.onIngredientRemoved}
                            disabled= {disabledButtonInfo}
                            price= {this.props.totalPrice}
                            purchasable= {this.updatePurchaseState(this.props.ings)}
                            ordered= {this.purchaseHandler}
                            authenticated={this.props.authenticated}
                        />
                    </div>
                </Aux>
            );
                
            orderSummary = (
                <OrderSummary 
                    ingredient={this.props.ings}
                    price={this.props.totalPrice}
                    cancelOrder={this.cancelPurchaseHandler}
                    proceedOrder={this.continuePurchaseHandler}
                />);
        }

        if(this.state.loading)
        {
            orderSummary = <Spinner />;
        }
        
        return (
            <Aux>
                <Modal show={this.state.purchasing} closeModal={this.cancelPurchaseHandler}>
                    {orderSummary}         
                </Modal>
                {burger}
            </Aux>
        );
    };
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilderReducer.ingredients,
        totalPrice: state.burgerBuilderReducer.totalPrice,
        error: state.burgerBuilderReducer.error,
        authenticated: state.authReducer.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onPurchaseInit: () => dispatch(actions.purchaseBurgerInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.onSetAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));