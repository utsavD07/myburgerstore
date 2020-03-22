import * as actionTypes from '../actions/actionTypes'

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: "/"
}

const authLoading = (state) => {
    return {
        ...state,
        error: null,
        loading: true
    }
}

const authSuccess = (state,action) => {
    return {
        ...state,
        token: action.token,
        userId: action.userId,
        error: null,
        loading: false
    }
}

const authFailed = (state,action) => {
    return {
        ...state,
        error: action.error,
        loading: false
    }
}

const authRedirectPath = (state,action) => {
    return {
        ...state,
        authRedirectPath: action.path
    }
}

const authLogout = (state,action) => {
    return {
        ...state,
        token: null,
        userId: null,
        loading: false
    }
}

const authReducer = (state = initialState , action) => {
    switch (action.type) {
        case (actionTypes.AUTHENTICATION_LOADING):
            return authLoading(state);

        case (actionTypes.AUTHENTICATION_SUCCESS):
            return authSuccess(state,action);

        case (actionTypes.AUTHENTICATION_FAILED):
            return authFailed(state,action);
        
        case (actionTypes.AUTHENTICATION_LOGOUT):
            return authLogout(state,action);

        case (actionTypes.SET_AUTH_REDIRECT_PATH):
            return authRedirectPath(state,action);
            
        default:
            return state;
    }
}

export default authReducer;