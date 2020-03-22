import * as actionTypes from './actionTypes';
import axios from 'axios'

export const authenticationLoading = () => {
    return {
        type: actionTypes.AUTHENTICATION_LOADING
    }
};

export const authenticationSuccess = (token,userId) => {
    return {
        type: actionTypes.AUTHENTICATION_SUCCESS,
        token: token,
        userId: userId
    }
};

export const authenticationFailed = (error) => {
    return {
        type: actionTypes.AUTHENTICATION_FAILED,
        error: error
    }
};

export const tryAuthentication = (email,password,method) => {
    return dispatch => {
        dispatch(authenticationLoading());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCscKvkHoanQBdyouGEjpNyffbBwNCRQcE';
        if(!method) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCscKvkHoanQBdyouGEjpNyffbBwNCRQcE';
        }

        axios.post(url,authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn*1000);
                localStorage.setItem('token',response.data.idToken);
                localStorage.setItem('expirationDate',expirationDate);
                localStorage.setItem('userId',response.data.localId)
                dispatch(authenticationSuccess(response.data.idToken,response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                dispatch(authenticationFailed(err.response.data.error))
            })
    }
};

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTHENTICATION_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout())
        },expirationTime*1000);
    }
}

export const onSetAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(token) {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()) {
                dispatch(authLogout());
            }
            else {
                dispatch(authenticationSuccess(token,localStorage.getItem('userId')));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
        else {
            dispatch(authLogout());
        }
    }
}