import React, { Component } from 'react';
import Axios from 'axios';
import { Table, Input, Button, Alert, Card, CardBody, Collapse } from 'reactstrap';
import { connect } from 'react-redux';
class EditProfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            collapse: false,
            num: false,
            spec: false,
            show: false,
            abjad: false,
            char: false,
            border: false
        }
        this.toggle = this.toggle.bind(this)
    }

    toggle = () => {
        this.setState({
            collapse: !this.state.collapse
        })
    }

    componentDidMount() {
        Axios.get(`http://localhost:2000/users?username=${localStorage.getItem('username')}`)
            .then((res) => {
                this.setState({ data: res.data })
                console.log(this.state.data)
            })
            .catch((err) => {
                console.log(err)
            })
        }
        
        submit = () => {
            // var username = this.text.value
            // var email = this.email.value
            // var oldpassword = this.oldpassword.value
            var newpassword = this.newpass.value
            
            // if (oldpassword === this.props.password) {
                if( newpassword.length>8){
                    Axios.patch(`http://localhost:2000/users/${this.state.data[0].id}`, {
                        // username: username,
                        password: newpassword
                        // email: email
                    })
                    
                    .then((res) => {
                        console.log(res.data)
                        Axios.get(`http://localhost:2000/users`)
                        .then((res) => {
                            this.setState({ data: res.data })
                            alert( 'Successful!')
                            
                        })
                        })    
                    
                }
                else{
                    alert('chek your new password')
                }
                    // }
                }
                
                hendleChange = (e) => {
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
                
                editSubmit=()=>{
                    this.submit()
        this.toggle()
    }

    passwordAlert = () => {
        if (this.state.char) {
            if (this.state.abjad && this.state.num && this.state.spec) {
                return <Alert color="success"> Strongest</Alert>
            }
            if ((this.state.abjad && this.state.num) || (this.state.abjad && this.state.spec) || (this.state.num && this.state.spec)) {
                return <Alert color="success">Strong</Alert>
            }
            else {
                return <Alert color="warning">Weak</Alert>
            }
        }
        else {
            return <Alert color="danger" value="100">Min. 8 Password </Alert>
        }
    }
    render() {
        return (
            <div className="container" style={{ width: '600px', margin: 'auto' }}>
        
        
                <Table className="border ">
                    <tbody>
                        <tr>
                            <td>Username</td>
                            <td><Input defaultValue={this.props.username}></Input></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td><Input defaultValue={this.props.email}></Input></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td ><Input type="password" defaultValue={this.props.password}></Input></td>
                            <td ><Button onClick={this.toggle}>Edit</Button></td>
                        </tr>
                    </tbody>
                </Table>
                <Collapse
                    isOpen={this.state.collapse}
                >
                    <tr>
                        <td>New Password</td>
                        <td ><Input type="password"  name="newpassword" innerRef={(newpass)=> this.newpass= newpass} onChange={this.hendleChange} onFocus={this.showReq}placeholder="min 8 character" minLength="8"/></td>
                        <td></td>
                    </tr>
                    {
                        this.state.show
                        ?
                        this.passwordAlert()
                        :
                        null
                    }
                    <tr>
                        <td>Confirmation Password</td>
                        <td ><Input type="password" name="confpassword" innerRef={(confpass)=> this.confpass = confpass} placeholder ="confirmation password"/></td>
                        <td></td>
                    </tr>
                    <Button color = "primary" onClick={this.editSubmit}>submit</Button>
                    <Button color = "secondary" onClick={this.toggle}>cancel</Button>
                </Collapse>
                
            </div>
        )
    }
}

const mapStatetoProps = ({ auth }) => { // fungsi yg menghubungkan file login dgn authaction dan authreducer. 
    return {
        username: auth.username,
        email: auth.email,
        password: auth.password,
        role: auth.role
    }
}

export default connect(mapStatetoProps)(EditProfil)