import React, { Component } from 'react';
import Axios from 'axios'
import { Link } from 'react-router-dom';


class CardMovie extends Component {
    // untuk menampung data global yg di gunakan pd lokal project
    constructor(props) {
        super(props);
        this.state = {
            data: []

        }
    }
    componentDidMount() {
        Axios.get('http://localhost:2000/movies')
            .then((res) => { //apa yg dilakukan di data yg benar
                this.setState({ data: res.data })
                console.log(this.state.data)
            })
            .catch((err) => {
                // apa yg dilakukan pd data yg salah
                console.log(err)
            })
    }
    render() {

        return (

            <div className="row">
                {this.state.data.map((val, index) =>
                    <Link to={`/MovieDetail?id=${val.id}`}>
                        <div className="card" style={{ width: "325px", cursor: "pointer" }}>
                            <img src={val.image} class="card-img-top" alt=""></img>
                            <div className="card-body">
                                <h5 className="card-title">{val.name}</h5>
                                <p className="card-text">Director : {val.director}</p>
                                <p className="card-text">Casts : {val.casts}</p>
                                <p className="card-text">Duration : {val.duration}</p>
                                <p className="card-text">Genre : {val.genre}</p>
                            </div>
                        </div>
                    </Link>
                )}
            </div>

        )
    }
}


export default CardMovie