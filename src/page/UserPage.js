import React, { Component } from 'react'
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter, Toast,
    ToastHeader
} from 'reactstrap'
import Axios from 'axios'
import classnames from 'classnames';
// import { Link } from 'react-router-dom'

class UserPage extends Component {
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
        Axios.get(`http://localhost:2000/userTransaction?username=${userlogincart}`)
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

    renderDataUser = () => {
        return this.state.data.map((val, index) => {
            return (
                <tr key={val.id}>
                    <td style={{ verticalAlign: 'middle' }}>{index + 1}</td>
                    <td id={val.id} style={{ verticalAlign: 'middle' }}><img src={val.moviesImage} alt='imagePoster' style={{ width: 200 }}></img></td>
                    <td id={val.id} style={{ verticalAlign: 'middle' }}>{val.moviesTitle}</td>
                    <td id={val.id} style={{ verticalAlign: 'middle' }}>Location</td>
                    <td id={val.id} style={{ verticalAlign: 'middle' }}>Time</td>
                    <td id={val.id} style={{ verticalAlign: 'middle' }}>{val.seat.length}</td>
                    <td id={val.id} style={{ verticalAlign: 'middle' }}>{val.seat.map((val,ind) =>
                        < Toast key={ind}>
                            <ToastHeader icon="warning">
                                {(val[0] + 10).toString(36).toUpperCase() + (val[1] + 1)}
                            </ToastHeader>
                        </Toast>
                    )}
                    </td>
                    <td id={val.id} style={{ verticalAlign: 'middle' }}>IDR. {val.price.toLocaleString()}</td>
                    <td id={val.id} style={{ verticalAlign: 'middle' }}>{val.status}</td>
                    {localStorage.setItem("status", val.status)}
                    <td id={val.id} style={{ verticalAlign: 'middle' }}><button className="btn btn-danger btn-sm" onClick={() => this.deleteData(val.id)}>Delete</button></td>
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

    checkout = () => {
        return (
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader>Total Paid :</ModalHeader>
                <ModalBody >
                    <h2>IDR. {this.totalCart().toLocaleString()}</h2>
                </ModalBody>
                <ModalFooter >
                    {/* <Link to='/'> */}
                    <Button color="success" onClick={this.okCheckout}>Ok</Button>
                    {/* </Link> */}
                </ModalFooter>
            </Modal>
        )
    }
    okCheckout = () => {
        this.clearCart()
        this.toggle()
    }

    clearCart = () => {
        let userlogincart = localStorage.getItem('username')
        Axios.get(`http://localhost:2000/userTransaction?username=${userlogincart}`)
            .then((res) => {
                const dataSelect = res.data;
                this.setState({ dataSelect })
                console.log(dataSelect)
                dataSelect.forEach(val => {//fungsi untuk menghapus satu persatu
                    Axios.get(`http://localhost:2000/movies/${val.IDfilm}`)
                        .then((res) => {
                            this.setState({ booked: res.data.booked })
                            if (res.data.name === val.moviesTitle) {
                                var book = res.data.booked;
                                console.log(book)
                                for (var i = 0; i < val.seat.length; i++) {
                                    book.push(val.seat[i])
                                    console.log(book)
                                }
                                Axios.patch(`http://localhost:2000/movies/${val.IDfilm}`, {
                                    booked: book
                                })
                                    .then((res) => {
                                        console.log(res.data.booked)
                                        Axios.post(`http://localhost:2000/userHistory`, {
                                            username: val.username,
                                            moviesImage: val.moviesImage,
                                            moviesTitle: val.moviesTitle,
                                            ticket_amount: val.ticket_amount,
                                            price: val.price,
                                            seat: val.seat,
                                            IDfilm: val.IDfilm,
                                            status: 'Paid'
                                        })
                                            .then((res) => {
                                                Axios.delete(`http://localhost:2000/userTransaction/${val.id}`)
                                                    .then((res) => {
                                                        console.log(res.data)
                                                        Axios.get(`http://localhost:2000/userTransaction?username=${userlogincart}`)//update pages dengan menambah fungsi dan mengkosongkan value pada variable penampung nilai
                                                            .then((res) => {
                                                                this.setState({ data: res.data })//untuk mengubah isi state data
                                                            })
                                                        Axios.get(`http://localhost:2000/userHistory?username=${userlogincart}`)//update pages dengan menambah fungsi dan mengkosongkan value pada variable penampung nilai
                                                            .then((res) => {
                                                                this.setState({ dataHistory: res.data })//untuk mengubah isi state data
                                                            })
                                                    })
                                            })
                                        console.log(res.data)

                                    })
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    deleteData = (id) => {
        let userlogincart = localStorage.getItem('username')
        Axios.delete(`http://localhost:2000/userTransaction/${id}`)
            .then((res) => {
                const dataSelect = res.data;
                // console.log(dataSelect)
                this.setState({ dataSelect });
                console.log(dataSelect)
                Axios.get(`http://localhost:2000/userTransaction?username=${userlogincart}`)//update pages dengan menambah fungsi dan mengkosongkan value pada variable penampung nilai
                    .then((res) => {
                        this.setState({ data: res.data })//untuk mengubah isi state data
                    })
                // this.componentDidMount()//update pages dengan panggil fungsi get cara 2
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        var status = localStorage.getItem('status')
        console.log(status)
        return (
            <div  style={{width:'70%', margin:'auto'}}>
                <p className="h2">User Cart Product</p>
                        <table className="table">
                            <thead>
                                <tr style={{ textAlign: "center" }}>
                                    <td>#</td>
                                    <td style={{ width: 70 }}>Image</td>
                                    <td style={{ width: 150 }}>Title</td>
                                    <td style={{ width: 150 }}>Location</td>
                                    <td style={{ width: 150 }}>Time</td>
                                    <td style={{ width: 150 }}>Amount</td>
                                    <td style={{ width: 150 }}>Seat</td>
                                    <td style={{ width: 150 }}>Price</td>
                                    <td style={{ width: 150 }}>Status</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderDataUser()}
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>Total Cart</td>
                                    <td>IDR. {this.totalCart().toLocaleString()}</td>
                                    <td>
                                        <Button onClick={this.toggle}>Checkout</Button>
                                        {this.checkout()}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    
            </div>
        )
    }
}

export default UserPage