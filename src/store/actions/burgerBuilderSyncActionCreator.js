import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'

export const addIngredient = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
    }
};

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
    }
};

export const setIngredientsSuccess = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS_SUCCESS,
        ingredients: ingredients
    }
}

export const setIngredientsFailed = () => {
    return {
        type: actionTypes.SET_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => { //do an async task here
        axios.get('https://react-myburger-07.firebaseio.com/ingredients.json')
            .then(responseIngredients => {
                dispatch(setIngredientsSuccess(responseIngredients.data)) //dispatch a function as soon as the async task has been done i.e. the ingredients have been initialised
            })
            .catch(err => {
                dispatch(setIngredientsFailed())
            });
    }
}