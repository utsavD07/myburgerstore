import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Aux/Aux'

const withErrorHandler = (WrappedComponent,axios) => {
    return class extends Component {
        state = {
            error: null
        }
        componentDidMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null}); //clear the error when making a new request
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(res => {
                return res;
            },error => {
                this.setState({error: error}); //update the error state with the error message received from the axios so that it can be displayed on the Modal
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
            //done in order to clean up the interceptors whenever any component using the withErrorHandler component is not needed
        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }


        render() {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        closeModal={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null /*display the error message. 'message' property is provided by firebase*/}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux> //return the WrappedComponent received with all its props, don't wanna lose any of the props
            );
        };
    };
};
export default withErrorHandler