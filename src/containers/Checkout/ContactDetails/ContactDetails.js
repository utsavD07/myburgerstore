import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactDetails.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Forms/Input/Input'
import { connect } from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as orderActions from '../../../store/actions/indexExport'
import { checkValidity } from '../../../shared/utility'

class ContactDetails extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Full Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },

            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },

            phone: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Your mobile'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            
            building: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your building'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },

            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },

            pincode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your pincode'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 6
                },
                valid: false,
                touched: false
            },

            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your city'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },

            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        entireFormIsValid: false
    };

    placeOrderHandler = (event) => {
        event.preventDefault(); //to stop the default behaviour of reloading the page when the form submits
        const formData = {}
        for (let el in this.state.orderForm) {
            formData[el] = this.state.orderForm[el].value
        }
        const finalOrder = {
            ingredients: this.props.ings,
            price: this.props.totalPrice, //calculate the price on the server in the real project
            formData: formData,
            userId: this.props.userId
        }

        this.props.onOrderPlaced(finalOrder,this.props.token);

        //DONE USING REDUX
         //this url gets appended to the base url and it creates an 'order' node and stores all the orders beneath that node
        //.json is the endpoint you need to target for firebase to function correctly
        // axios.post('/orders.json', finalOrder)
        //     .then(response => {
        //         console.log(response);
        //         this.setState({loading: false}); //loading should be finished once the data has been posted
        //         this.props.history.push('/'); //redirect to the home page after placing order
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         this.setState({loading: true}); //loading spinner should not be shown even if an error occurs
        //     }); 
    }

    inputChangedHandler = (event,identifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        
        const updatedOrderElement = {
            ...updatedOrderForm[identifier]
        }

        updatedOrderElement.value = event.target.value;
        updatedOrderElement.touched= true; //an input box has been touched once any value is entered
        updatedOrderElement.valid = checkValidity(updatedOrderElement.value,updatedOrderElement.validation)
        updatedOrderForm[identifier] = updatedOrderElement;

        let entireFormIsValid = true;
        for (let el in updatedOrderForm) {
            entireFormIsValid = updatedOrderForm[el].valid && entireFormIsValid;
        }

        this.setState({orderForm: updatedOrderForm, entireFormIsValid: entireFormIsValid});
    }

    render() {
        let orderFormElements = [];
        for (let key in this.state.orderForm) {
            orderFormElements.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let newForm = (
                    <form onSubmit={this.placeOrderHandler}>
                        {orderFormElements.map(formElement => (
                            <Input 
                                key= {formElement.id}
                                elementType={formElement.config.elementType} 
                                value={formElement.config.value} 
                                elementConfig={formElement.config.elementConfig}
                                invalid={!formElement.config.valid}
                                shouldValidate={formElement.config.validation}
                                touched={formElement.config.touched}
                                changed={(event) => this.inputChangedHandler(event,formElement.id)} />
                        ))}
                        <Button disabled={!this.state.entireFormIsValid} btnType="Success">Place Order</Button>
                    </form>
                    );

        if(this.props.loading) {
            newForm = <Spinner />;
        }

        return (
            <div className={classes.ContactDetails}>
                {newForm}
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilderReducer.ingredients, 
        totalPrice: state.burgerBuilderReducer.totalPrice,
        loading: state.orderReducer.loading,
        token: state.authReducer.token,
        userId: state.authReducer.userId
    }
} 

const mapDispatchToProps = dispatch => {
    return {
        onOrderPlaced: (finalOrder,token) => dispatch(orderActions.tryPurchaseBurger(finalOrder,token))
    } 
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactDetails , axios));