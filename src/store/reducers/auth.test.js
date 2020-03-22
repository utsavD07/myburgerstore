import reducer from './authenticationReducer'
import * as actionTypes from '../actions/actionTypes'

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined,{})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: "/"
        })
    })

    it('should store the token when logged-in', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: "/"
        },{
            type: actionTypes.AUTHENTICATION_SUCCESS,
            token: 'some token',
            userId: 'some userId'
          })).toEqual({
            token: 'some token',
            userId: 'some userId',
            error: null,
            loading: false,
            authRedirectPath: "/"
        })
    })
})