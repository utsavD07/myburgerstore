import React, { Component } from 'react';
import Input from '../../components/UI/Forms/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Authentication.css'
import * as actions from '../../store/actions/indexExport'
import { connect } from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router-dom'
import { checkValidity } from '../../shared/utility'

class Authentication extends Component {
    state = {
        controlForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },

            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true
    }

    componentDidMount() {
        if(!this.props.building && this.props.authRedirectPath !== "/") {
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangedHandler = (event,identifier) => {
        const updatedControlForm = {
            ...this.state.controlForm
        }
        
        const updatedControlElement = {
            ...updatedControlForm[identifier]
        }

        updatedControlElement.value = event.target.value;
        updatedControlElement.touched= true; //an input box has been touched once any value is entered
        updatedControlElement.valid = checkValidity(updatedControlElement.value,updatedControlElement.validation)
        updatedControlElement.touched = true;
        updatedControlForm[identifier] = updatedControlElement;

        this.setState({controlForm: updatedControlForm});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onTryAuthentication(this.state.controlForm.email.value,this.state.controlForm.password.value,this.state.isSignUp)
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp}
        })
    }

    render () {
        let controlFormElements = [];
        for (let key in this.state.controlForm) {
            controlFormElements.push({
                id: key,
                config: this.state.controlForm[key]
            })
        }

        let newForm = (
            <form onSubmit={this.submitHandler}>
                {controlFormElements.map(formElement => (
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
                <Button btnType="Success">SUBMIT</Button>
            </form>
        )

        if(this.props.loading) {
            newForm = <Spinner />;
        }

        let errorMessage = null;
        if(this.props.error) {
            errorMessage = <p>{this.props.error.message}</p>
        }

        let authRedirect = null;
        if(this.props.authenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />;
        }

        return (
            <div className={classes.Authentication} style={{marginTop: '60px'}}>
                {errorMessage}
                {authRedirect}
                {newForm}
                <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
                    {this.state.isSignUp ? "Already have an account? Sign In." : "Don't have an account? Sign Up"}
                </Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.authReducer.loading,
        error: state.authReducer.error,
        authenticated: state.authReducer.token,
        building: state.burgerBuilderReducer.building,
        authRedirectPath: state.authReducer.authRedirectPath     
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAuthentication: (email,password,method) => dispatch(actions.tryAuthentication(email,password,method)),
        onSetAuthRedirectPath: () => dispatch(actions.onSetAuthRedirectPath("/"))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Authentication);