import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authActions'
import store from './store'
import './App.css';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing'
import Register from './components/auth/Register';
import Login from './components/auth/Login';


//check for token
if(localStorage.jwtToken) {
  //set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  //set current user and is authenticated
  store.dispatch(setCurrentUser(decoded))
}
class App extends Component {
  render(){
    return (
      
      <div className="App">
      <Provider store={ store }>
        <Router>
          <Navbar />
            <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={ Register} />
            <Route exact path="/login" component={ Login} />
          </div>
          <Footer />
       </Router>    

      </Provider>
      
      </div>
      
     
      );
  }
  
}

export default App;
