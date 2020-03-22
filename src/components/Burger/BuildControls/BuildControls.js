import React from 'react';
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
    {label: 'Bacon', type: 'bacon'}
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: Rs {props.price}</p>
        {controls.map(control => (
            <BuildControl 
                key= {control.label} 
                ingredientLabel={control.label}
                added={() => props.addIngredient(control.type)}
                removed={() => props.removeIngredient(control.type)}
                disabled= {props.disabled[control.type]}
            />
        ))}
        <button 
            className={classes.OrderButton}
            disabled= {!props.purchasable}
            onClick= {props.ordered}>
                {props.authenticated ? "ORDER NOW" : "SIGN UP TO ORDER"}
        </button>
    </div>
);

export default buildControls;