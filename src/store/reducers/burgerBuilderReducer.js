import * as actionTypes from '../actions/actionTypes'

const Ingredients_Price = {
    salad: 49,
    cheese: 29,
    meat: 99,
    bacon: 69
};

const initialState = {
    ingredients: null,
    totalPrice: 50,
    error: false,
    building: false
}

const addIngredient = (state,action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] + 1
            //salad: 0 + 1 (increment the old count of an ingredient by 1)
        },
        totalPrice: state.totalPrice + Ingredients_Price[action.ingredientName],
        building: true
    }
}

const removeIngredient = (state,action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - Ingredients_Price[action.ingredientName],
        building: true
    }
}

const setIngredientSuccess = (state,action) => {
    return {
        ...state,
        ingredients: action.ingredients,
        error: false,
        totalPrice: 50,
        building: false
    }
}

const setIngredientsFailed = (state,action) => {
    return {
        ...state,
        error: true
    }
}

const burgerBuilderReducer = (state=initialState , action) => {
    switch (action.type) {
        case (actionTypes.ADD_INGREDIENT):
            return addIngredient(state,action);

        case (actionTypes.REMOVE_INGREDIENT):
            return removeIngredient(state,action);

        case (actionTypes.SET_INGREDIENTS_SUCCESS):
            return setIngredientSuccess(state,action);

        case (actionTypes.SET_INGREDIENTS_FAILED):
            return setIngredientsFailed(state,action);

        default:
            return state;
    }
}

export default burgerBuilderReducer;