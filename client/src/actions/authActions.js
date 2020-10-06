import { GET_ERRORS } from './types'
import axios from 'axios';


//Register user
//redux thunk allows us to use dispatch in an ajax call
export const registerUser = (userData) => dispatch =>{
            axios.post('/api/users/register', userData)
                .then(res => console.log(res.data))
                .catch(err => dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
                )
}

        // axios.post('/api/users/register', newUser)
        //   .then(res => console.log(res.data))
        //   .catch(err => this.setState({errors: err.response.data}))
