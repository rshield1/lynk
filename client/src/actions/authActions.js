import { GET_ERRORS, SET_CURRENT_USER } from './types'
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode'


//Register user
//redux thunk allows us to use dispatch in an ajax call
export const registerUser = (userData, history) => dispatch =>{
            axios.post('/api/users/register', userData)
                .then(res => history.push('/login'))
                .catch(err => dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
                )
}
// Login and get user token

export const loginUser = (userData) => dispatch => {
    axios.post('/api/users/login', userData)
    .then(res => {
        //save to local storage
        const { token } = res.data
        //set token to local storage
        localStorage.setItem('jwtToken', token);
        // Set token to Auth header
        setAuthToken(token);
        // We have to decode and extract the user from  the token
        const decoded = jwt_decode(token);
        //set current user
        dispatch(setCurrentUser(decoded))
    })
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))

}

//SEt login user

export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

//log user out

export const logoutUser = () => dispatch => {
    //remove token from localStorage
    localStorage.removeItem('jwtToken');
    // remove auth header for future requests
    setAuthToken(false);
    // current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
}