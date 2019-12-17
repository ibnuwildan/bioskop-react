import React, { Component } from 'react';
import { Link,Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Logout } from '../redux/action';
import { Button } from 'reactstrap';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';

class NavbarHead extends Component {

    BtnLogout = () => {
        this.props.Logout()
        localStorage.clear();

    }
    render() {
        console.log(this.props.username)
        if (localStorage.getItem(null)) {
            return (
                <Redirect to='/Home'>

                </Redirect>
            )
        }
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to='/Home' className="navbar-brand">
                        <img src="http://2.bp.blogspot.com/-66rTPz3I0jc/VCzFkh0GyKI/AAAAAAAAAvU/7E9UyGdCeJc/s1600/Layar%2BTancap%2Blogo.png" width="30" height="30" alt=""></img>
                    </Link>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav row">
                            <li class="nav-item active">
                                <a class="nav-link" href="#">MOVIE <span class="sr-only">(current)</span></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">CINEMAS</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">PROMOTION</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">MEMBERSHIP</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">CONCESSION</a>
                            </li>
                            <li class="nav-item">
                                {this.props.role === 'admin'
                                    ?
                                    <Link to='/EditMovie'>
                                        <a class="nav-link">EDIT MOVIE</a>
                                    </Link>
                                    :
                                    <div>

                                    </div>
                                }
                            </li>
                        </ul>
                    </div>
                    <form className="form-inline  my-2 my-lg-0">

                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>

                            </DropdownToggle>
                            <DropdownMenu right>
                                {this.props.username
                                    ?
                                    <div>
                                        {this.props.username === 'admin'
                                            ?
                                            <DropdownItem>
                                                <Link to='/AdminPage'>
                                                    Admin Page
                                        </Link>
                                            </DropdownItem>
                                            :
                                            <DropdownItem>
                                                <Link to='/USerPage'>
                                                    User Page
                                                </Link>
                                            </DropdownItem>
                                        }
                                        <DropdownItem onClick={this.BtnLogout}>
                                            Logout
                                    </DropdownItem>
                                    </div>
                                    :
                                    <div>
                                        <DropdownItem>
                                            <Link to='/LoginPage'>
                                                Login
                                    </Link>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Link to='/RegisterPage'>
                                                Registration
                                    </Link>
                                        </DropdownItem>
                                    </div>
                                }
                                <DropdownItem divider />
                            </DropdownMenu>
                        </UncontrolledDropdown>


                    </form>
                </nav>

            </div>
        )
    }
}
const mapStatetoProps = ({ auth }) => { // fungsi yg menghubungkan file login dgn authaction dan authreducer. 
    return {
        username: auth.username,
        role: auth.role
    }
}
export default connect(mapStatetoProps, { Logout })(NavbarHead);


