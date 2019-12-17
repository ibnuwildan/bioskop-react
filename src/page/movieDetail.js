import React, { Component } from 'react';
import { Button } from 'reactstrap'
// import { connect } from 'react-redux'
import Axios from 'axios'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class MoviesDetail extends Component {
    state = {
        data: [
            {

            }
        ]
    }
    componentDidMount() {
        let id = this.props.location.search.split('=')[1]
        console.log(id)
        Axios.get(`http://localhost:2000/movies?id=${id}`)
            .then((res) => { //apa yg dilakukan di data yg benar
                this.setState({ data: res.data })
                console.log(res.data)
            })
            .catch((err) => {
                // apa yg dilakukan pd data yg salah
                console.log(err)
            })
    }

    renderGenre = () => {
        let { genre } = this.state.data[0]
        console.log(genre)
        if (genre) {
            return genre.map((val, index) => {
                return <Button color="warning" key={index} style={{ margin: 3 }}>{val}</Button>
            })
        }
    }
    renderCasts = () => {
        let { casts } = this.state.data[0]
        console.log(casts)
        if (casts) {
            return <p className="h4">Casts : {casts.join(', ')}</p>
        }
    }


    render() {
        let { data } = this.state;
        console.log(data)
        return (
            <div className="container-fluid">
                {data.map((val, index) =>
                    <div className="row">
                        <div className="col-3" style={{ width: "325px" }}>
                            <img src={val.image} class="moviedetail-img-top" alt=""></img>
                        </div>
                        <div className="col" style={{ margin: "auto" }}>

                            <h5>{val.name} </h5>
                            <h5>{val.genre}</h5>
                            <h5>{val.director}</h5>
                            <h5>{val.synopsis}</h5>
                            {this.props.username
                                ? this.props.role==='admin'
                                    ?
                                    <Button color="primary" disabled>primary</Button>

                                    :
                                        <Link to='/BookingSeet'>
                                            <Button color="primaryn ">primary</Button>
                                        </Link>
                                :
                                <div>
                                    <Button color="primary" disabled>primary</Button>
                                </div>
                            }

                        </div>
                    </div>
                )
                }
            </div>
        );
        // }
    }
}
const mapStatetoProps = ({auth}) => { // fungsi yg menghubungkan file login dgn authaction dan authreducer. 
    return {
                    username: auth.username,
                    role: auth.role
}
}
export default connect(mapStatetoProps)(MoviesDetail) 