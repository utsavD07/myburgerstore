import React from 'react';
import burgerLogo from '../../assets/images/burgerLogo.png'
import classes from './Logo.css'

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="MyBurgerLogo" />
    </div>
);

export default logo;