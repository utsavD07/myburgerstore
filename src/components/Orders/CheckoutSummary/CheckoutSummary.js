import React from 'react';
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.css'

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary} style={{marginTop: '60px'}}>
            <h1>Hope you like the burger!</h1>
            <div style={{margin: 'auto', width: '100%'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Success" clicked={props.purchase}>Order</Button>
            <Button btnType="Danger" clicked={props.cancel}>Cancel</Button>
        </div>
    )
};

export default checkoutSummary;