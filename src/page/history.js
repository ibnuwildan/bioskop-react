import React, { Component } from 'react'
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter, Toast,
    ToastHeader
} from 'reactstrap'
import Axios from 'axios'
import { Link, Redirect } from 'react-router-dom';
import classnames from 'classnames';
// import { Link } from 'react-router-dom'


class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            booked: [[0, 0], [0, 1]],
            totalPrice: 0,
            modal: false,
            selectedId: null
        };

        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    componentDidMount() {
        let userlogincart = localStorage.getItem('username')
        Axios.get(`http://localhost:2000/UserHistory?username=${userlogincart}`)
            .then((res) => {
                //apa yang dilakukan pada data yang benar
                this.setState({ data: res.data })
                console.log(this.state.data)
            })
            .catch((err) => {
                //apa yang dilakukan pada data yang salah
                console.log(err)
            })
    }

    renderHistoryUser = () => {
        return this.state.data.map((val, index) => {
            console.log(val.moviesImage)
            return (
                <tr key={val.id}>
                    <td style={{ verticalAlign: 'middle' }}>{index + 1}</td>
                    <td id={val.id} style={{ verticalAlign: 'middle'}} >{val.time}</td>
                    <td id={val.id} style={{ verticalAlign: 'middle', textAlign: "center" }} ><img src={val.moviesImage} alt='imagePoster' style={{ width: 200 }}></img></td>
                    <td id={val.id} style={{ verticalAlign: 'middle' }}>{val.moviesTitle}</td>
                    <td id={val.id} style={{ verticalAlign: 'middle' }}>Location</td>
                    <td id={val.id} style={{ verticalAlign: 'middle' }}>Time</td>
                    <td id={val.id} style={{ verticalAlign: 'middle' }}>{val.seat.length}</td>
                    <td id={val.id} style={{ verticalAlign: 'middle' }}>{val.seat.map((val, ind) =>
                        < Toast key={ind}>
                            <ToastHeader icon="warning">
                                {(val[0] + 10).toString(36).toUpperCase() + (val[1] + 1)}
                            </ToastHeader>
                        </Toast>
                    )}
                    </td>
                    <td id={val.id} style={{ verticalAlign: 'middle' }}>IDR. {val.price.toLocaleString()}</td>
                    <td id={val.id} style={{ verticalAlign: 'middle' }}>{val.status}</td>
                    {/* {localStorage.setItem("status", val.status)} */}
                    {/* <td id={val.id} style={{ verticalAlign: 'middle' }}><button className="btn btn-danger btn-sm" onClick={() => this.deleteData(val.id)}>Delete</button></td> */}
                    {/* Jika memanggil function dengan parameter butuh callback '()=>' */}
                </tr >
            )
        })
    }

    totalCart = () => {
        var total = 0
        this.state.data.map((val) => {
            total += val.price
        })
        return total
    }

    render() {
        var status = localStorage.getItem('status')
        console.log(status)
        return (
            <div  style={{width:'70%', margin:'auto'}}>
                <p className="h2"> HISTORY</p>
                <table className="table">
                    <thead>
                        <tr style={{ textAlign: "center" }}>
                            <td>#</td>
                            <td>Date</td>
                            <td >Image</td>
                            <td >Title</td>
                            <td >Location</td>
                            <td >Time</td>
                            <td >Amount</td>
                            <td >Seat</td>
                            <td >Price</td>
                            <td >Status</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderHistoryUser()}
                    </tbody>
                </table>

            </div>
        )
    }
}

export default History