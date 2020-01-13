import React, { Component } from 'react';
import Axios from 'axios';
// import { API_URL } from '../support/API_URL';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { addToCart } from '../redux/action';

class BookingSeet extends Component {
    state = {
        data: [],
        booked: [[0, 0], [0, 1]],
        chosen: [],
        price: 0,
        count: 0
    };

    componentDidMount() {
        // var id = window.location.pathname
        // id = id.replace('/BookingSeat/','')
        var id = this.props.location.search.split('=')[1];
        Axios.get(`http://localhost:2000/movies/${id}`)
            .then((res) => {
                this.setState({ booked: res.data.booked })
                this.setState({ data: res.data })
                // console.log(this.state.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    onBtnSeatClick = (arr) => {
        // console.log(arr)
        let { chosen, price, count } = this.state;
        // if(chosen.length >= 5){
        //     return null
        // }else{
        chosen.push(arr);
        this.setState({
            chosen,
            price: price + 50000,
            count: count + 1
        })
        // console.log(chosen)
        // }
    }

    onBtnCancelSeat = (arr) => {
        let { chosen, price, count } = this.state;
        let output = chosen.filter((val) => {
            return val.join('') !== arr.join('')
        })
        this.setState({
            chosen: output,
            price: price - 50000,
            count: count - 1
        })
    }

    renderSeat = () => {
        let seats = 100;
        let { chosen, booked } = this.state;
        console.log(booked)
        // let { booked } = this.props.location.state;
        let arr = [];

        for (let i = 0; i < seats / 20; i++) {
            arr.push([])
            for (let j = 0; j < seats / (seats / 20); j++) {
                arr[i].push(1)
            }
        }
        //  console.log(arr)
        for (let k = 0; k < booked.length; k++) {
            arr[booked[k][0]][booked[k][1]] = 2
        }
        for (let l = 0; l < chosen.length; l++) {
            arr[chosen[l][0]][chosen[l][1]] = 3
        }



        // let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        return arr.map((val, index) => {
            return (
                <div className='d-flex justify-content-center ' key={index}>
                    {
                        val.map((val1, i) => {
                            if (val1 === 2) {
                                return (
                                    <EventSeatIcon
                                        key={val.id}
                                        color={"secondary"}
                                        disabled
                                        fontSize={"large"}
                                    />
                                )
                            }
                            if (val1 === 3) {
                                return (
                                    <EventSeatIcon
                                        key={val.id}
                                        color={"primary"}
                                        onClick={() => this.onBtnCancelSeat([index, i])}
                                        fontSize={"large"}
                                    />
                                )
                            }
                            return (
                                <EventSeatIcon
                                    key={val.id}
                                    onClick={() => this.onBtnSeatClick([index, i])}
                                    fontSize={"large"}
                                />
                            )
                        })
                    }
                </div>
            )
        })
    }

    addToCart = () => {
        let { data } = this.state;
        let a = new Date()
        var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'friday', 'saturday'];

        Axios.get(`http://localhost:2000/userTransaction?username=${localStorage.getItem('username')}&moviesTitle=${data.name}`)
            .then((res) => {
                console.log(this.state.chosen.map((val) => {
                    console.log(val)
                }))
                if (res.data.length > 0 && res.data[0].moviesTitle === data.name) {
                    Axios.patch(`http://localhost:2000/userTransaction/${res.data[0].id}`, {
                        ticket_amount: (parseInt(res.data[0].ticket_amount) + parseInt(this.state.count)),
                        price: (res.data[0].price + this.state.price),
                        seat: res.data[0].seat.concat(this.state.chosen)
                    })
                }
                else {
                    Axios.post(`http://localhost:2000/userTransaction`, {
                        username: this.props.username,
                        time: `${days[a.getDay()]},${a.getDate()}/${a.getMonth()}/${a.getFullYear()} ${a.getHours()}: ${a.getMinutes()}`,
                        moviesImage: this.state.data.image,
                        moviesTitle: this.state.data.name,
                        ticket_amount: this.state.count,
                        price: this.state.price,
                        seat: this.state.chosen,
                        IDfilm: this.state.data.id,
                        status: 'Unpaid'
                    })
                    this.setState({
                        chosen: [],
                        price: 0,
                        count: 0
                    })
                }
            })


        alert('Booking Succesfull')
        this.setState({ redirect: true })
    }

    render() {
        return (
            <div>

                <div className='container full-height'>
                    <center><img src={this.state.data.image} style={{ height: 300 }}></img></center>
                    <div className='d-flex justify-content-center'>
                        <h1>Choosing Seats for {this.state.data.name}</h1>
                    </div>
                    {this.renderSeat()}
                    <div style={{ textAlign: 'right' }}>
                        <h3>
                            Rp. {this.state.price.toLocaleString()}
                        </h3>
                        <h3>
                            {this.state.count} Seats
                        </h3>
                        <Button color='danger' onClick={this.addToCart}>
                            Add To Cart
                    </Button>
                    </div>
                    {/* <div style={{ float: 'right' }}>
                    </div> */}
                </div>
            </div>
        );
    }
}

const mapStatetoProps = ({ auth }) => {
    return {
        idUser: auth.id,
        username: auth.username,
        role: auth.role
    }
}

export default connect(mapStatetoProps, { addToCart })(BookingSeet);