import React from 'react';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Aux/Aux'

const sideDrawer = (props) => {
    let attachedClasses= [classes.SideDrawer, classes.Close];
    if(props.show)
    {
        attachedClasses= [classes.SideDrawer, classes.Open];
    }
    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.closeSideDrawer}/>
            <div className={attachedClasses.join(' ')} onClick={props.closeSideDrawer}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems authenticated={props.authenticated}/>
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;