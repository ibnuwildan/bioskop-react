import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Home from './page/home';
import Navbar from './component/navbar';
import Footer from './component/footer'
import LoginPage from './page/login';
import Register from './page/register';
import MovieDetail from './page/movieDetail'
import EditMovie from './page/editMovie';
import BookingSeet from './page/bookingSeet';
import AdminPage from './page/admin';
import UserPage from './page/UserPage';
import Axios from 'axios';
import {Login} from './redux/action';
import { connect } from 'react-redux';

class App extends Component {
  
  componentDidMount(){
    var username = localStorage.getItem('username')
    if (username) {
      console.log(username)
  Axios.get(`http://localhost:2000/users?username=${username}`)
            .then((res) => {
                if (res.data.length === 0) {
                    alert('Invalid Username or Password')
                } else {
                    console.log(res.data)
                    this.props.Login(res.data[0])
                    localStorage.setItem('username', res.data[0].username)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
  } 
  render() {
    return (
      <div>
        <Navbar></Navbar>
        <Route path='/Home' component = {Home} exact></Route>
        <Route path='/LoginPage' component={LoginPage}></Route>
        <Route path='/RegisterPage' component={Register}></Route>
        <Route path='/MovieDetail' component={MovieDetail}></Route>
        <Route path='/EditMovie' component={EditMovie}></Route>
        <Route path='/BookingSeet' component={BookingSeet}></Route>
        <Route path='/AdminPage' component={AdminPage}></Route>
        <Route path='/USerPage' component={UserPage}></Route>
        <Footer></Footer>
      </div>
    )
  }
}

export default connect(null, { Login })(App)
