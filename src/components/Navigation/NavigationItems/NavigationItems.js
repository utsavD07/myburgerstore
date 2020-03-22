import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.css'

const navigationItems = (props) => {
    return (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>
                Burger Builder
        </NavigationItem>
        
        {props.authenticated
            ? <NavigationItem link="/orders">My Orders</NavigationItem>
            : null}

        {props.authenticated 
            ? <NavigationItem link="/logout">Log Out</NavigationItem>
            : <NavigationItem link="/authentication">Sign Up</NavigationItem>}
    </ul>
    );
}

export default navigationItems;