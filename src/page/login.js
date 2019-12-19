import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Login } from '../redux/action';
import { connect } from 'react-redux';
import Axios from 'axios';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';


class LoginPage extends Component {
    state = {
        error: false
    }
    onBtnLogIn = () => {
        
        let username = this.text.value;
        let password = this.password.value;
        Axios.get(`http://localhost:2000/users?username=${username}&password=${password}`)
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
    render() {
        console.log(this.props.username)
        if (this.props.username) {
            return (
                <Redirect to='/'>

                </Redirect>
            )
        }

        return (
            <div style={{width:'30%', margin:'auto', textAlign:'center'}}>
                <Form>
                    <FormGroup>
                        <Label for="exampleEmail">Username</Label>
                        <Input type="username" name="username" innerRef={(text) => this.text = text} id="exampleusername" placeholder="Username" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" name="password" innerRef={(password) => this.password = password} id="examplePassword" placeholder="password" />
                    </FormGroup>
                    <Button onClick={this.onBtnLogIn}>Submit</Button>
                </Form>
            </div>

        )
    }
}

const mapStatetoProps = ({ auth }) => { // fungsi yg menghubungkan file login dgn authaction dan authreducer. 
    return {
        username: auth.username
    }
}

export default connect(mapStatetoProps, { Login })(LoginPage);
