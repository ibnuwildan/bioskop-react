import React, { Component } from 'react';
import Axios from 'axios';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import { connect } from 'react-redux';
import { Login } from '../redux/action';
import { Link, Redirect } from 'react-router-dom';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // data: [],
            modal: false,
            num: false,
            spec: false,
            show: false,
            abjad: false,
            char: false,
            border: false
        };

        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    regisUser = () => {
        // let { char, spec, num } = this.state
        var username = this.text.value
        var email = this.email.value
        var password = this.password.value
        var confpassword = this.confpassword.value
        if (username && email && password && confpassword) {
            if (password !== confpassword) {
                alert('Invalid Password Confirmation')
            }
            else {
                Axios.get(`http://localhost:2000/users?username=${username}`)
                    .then((res) => {
                        console.log(res.data)
                        if (res.data.length !== 0) {
                            alert('Username has been taken')
                        }
                        else {

                            Axios.post('http://localhost:2000/users', {
                                username: username,
                                password: password,
                                email: email,
                                role: 'user'
                            })
                                .then((res) => {
                                    console.log('Regis Success' + res.data)
                                    Axios.get(`http://localhost:2000/users?username=${username}&password=${password}`)//update pages dengan menambah fungsi dan mengkosongkan value pada variable penampung nilai
                                        .then((res) => {
                                            console.log(res.data)
                                            this.setState({ data: res.data })//untuk mengubah isi state data
                                            localStorage.setItem(`userlogin`, username)
                                            this.props.Login(res.data[0])///direct langsung ke login
                                        })
                                    // this.componentDidMount()//update pages dengan panggil fungsi get cara 2
                                })
                                .catch((err) => {
                                    console.log(err)
                                })

                        }

                    })
            }

        } else {
            alert('Please fill in all the forms!')
        }
    }
    //onchange, menjalankan fungsi setiap update isi
    // notif = () => {
    //     return (<Toast>
    //         <ToastHeader icon={<Spinner size="sm" color="success" />}>
    //             Registration Successfully
    //     </ToastHeader>
    //         <ToastBody>
    //             Please, login your account after this!
    //     </ToastBody>
    //     </Toast>)
    // }

    regisSubmit = () => {
        this.regisUser()
        this.toggle()
        // this.notif()
    }

    ///cek password
    handleChange = (e) => {
        let pass = e.target.value
        let abjad = /[a-z]/
        let num = /[0-9]/
        let spec = /[$#@!%^&*()]/
        this.setState({
            abjad: abjad.test(pass),
            num: num.test(pass),
            spec: spec.test(pass),
            char: pass.length > 7,
            border: (abjad.test(pass) && num.test(pass) && spec.test(pass) && (pass.length > 7))
        })
    }
    showReq = () => {
        this.setState({ show: true })
    }

    
    render() {
        if (this.props.username) {
            return (
                <Redirect to='/Home'>

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
                        <Label for="examplePassword">Email</Label>
                        <Input type="email" name="email" innerRef={(email) => this.email = email} id="exampleEmail" placeholder="email" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" name="password" innerRef={(password) => this.password = password} id="examplePassword" placeholder="password" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Confirmation Password</Label>
                        <Input type="password" name="cmfpassword" innerRef={(confpassword) => this.confpassword = confpassword} id="exampleCmfPassword" placeholder="confirmation password" />
                    </FormGroup>
                    <Button onClick={this.regisUser}>Submit</Button>
                </Form>
        </div>
        )
    }
}
const mapStatetoProps = ({ auth }) => { // fungsi yg menghubungkan file register dgn authaction dan authreducer. 
    return {
        username: auth.username
    }
}

export default connect(mapStatetoProps, { Login })(Register);
