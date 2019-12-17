import React, { Component } from 'react';
import Carousel from '../component/carousel';
import CardMovie from '../component/card';
import Footer from '../component/footer';
import EditMovie from './editMovie';

class Home extends Component {
    render() {
        return (
            <div>
                <div style={{ margin: "auto" }}>
                    <Carousel></Carousel>
                </div>
                <div className="container-fluid">
                    <CardMovie></CardMovie>
                </div>

            </div>
        )
    }
}
export default Home