import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import Layout from '../hoc/Aux/Aux'
import BurgerBuilder from './BurgerBuilder/BurgerBuilder'
import Toolbar from '../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../components/Navigation/SideDrawer/SideDrawer'
import { connect } from 'react-redux'
import Logout from './Authentication/Logout/Logout';
import * as actions from '../store/actions/indexExport'
import asyncComponent from '../hoc/asyncComponent/asyncComponent'

const asyncCheckout = asyncComponent(() => {
  return import('../containers/Checkout/Checkout')
})

const asyncAuth = asyncComponent(() => {
  return import('../containers/Authentication/Authentication')
})

const asyncOrders = asyncComponent(() => {
  return import('../containers/Orders/Orders')
})

class App extends Component {
  state = {
    showSideDrawer: false
  }

  componentDidMount() {
	this.props.onCheckAuthState();
  }

  sideDrawerClosedHandler = () => {
      this.setState({showSideDrawer: false});
  }

  sideDrawerOpenedHandler = () => {
      this.setState((prevState) => {
          return {showSideDrawer: !prevState.showSideDrawer}
      });
  }
  render() {
	  let routes = (
			<Switch>
				<Route path="/authentication" component={asyncAuth} />
				<Route path="/" exact component={BurgerBuilder} />
				<Redirect to="/" />
			</Switch>
	  );

	  if(this.props.authenticated) {
		  routes = (
			<Switch>
				<Route path="/Checkout" component={asyncCheckout} />
				<Route path="/logout" component={Logout} />
				<Route path="/orders" component={asyncOrders} />
        <Route path="/authentication" component={asyncAuth} />
				<Route path="/" exact component={BurgerBuilder} />
				<Redirect to="/" />
          </Switch>
		  );
	  }
    return (
      <div>
        <Layout>
          <Toolbar show={this.state.showSideDrawer} openSideDrawer={this.sideDrawerOpenedHandler} authenticated={this.props.authenticated}/>
          <SideDrawer show={this.state.showSideDrawer} closeSideDrawer={this.sideDrawerClosedHandler} authenticated={this.props.authenticated}/>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.authReducer.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuthState: () => dispatch(actions.checkAuthState())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
