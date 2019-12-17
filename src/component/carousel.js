import React, { Component } from 'react';
import { UncontrolledCarousel } from 'reactstrap';

const items = [
  {
    src: 'http://www.metropolitan.id/wp-content/uploads/Jangkrik_Boss..jpg',
    altText: 'Slide 1',
    caption: '',
    header: '',
    key: '1'
  },
  {
    src: 'https://www.warkopdki.org/wp-content/uploads/2018/02/Poster-Film-Warkop-Gengsi-Dong-630x380.jpg',
    altText: 'Slide 2',
    caption: '',
    header: '',
    key: '2'
  },
  {
    src: 'https://cdn2.tstatic.net/tribunnews/foto/bank/images/nonton-bareng-sueb.jpg',
    altText: 'Slide 3',
    caption: '',
    header: '',
    key: '3'
  }
];

class Carousel extends Component {
    render() {
        return (
            <div style={{width:'60%', margin:'auto'}}>
              <UncontrolledCarousel items={items} />;
            </div>
        )
    }
}

export default Carousel