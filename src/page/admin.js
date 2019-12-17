import React, { Component } from 'react';
import { Table } from 'reactstrap';
//import { API_URL } from '../support/API_URL';
import Axios from 'axios';

class AdminPage extends Component {
  state = {
    data: [],
    openModal: false,
    selectedId: null
  }

  componentDidMount() {
    Axios.get('http://localhost:2000/movies')
      .then((res) => {
        this.setState({ data: res.data })
        console.log(this.state.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  renderSynopsis = (text) => {
    const arrSyn = text.split(' ')
    var output = []
    for (var i = 0; i < 5; i++) {
      output.push(arrSyn[i])
    }
    return output.join(' ') + '...'
  }

  render() {
    return (
      <div style={{ margin: "auto" }}>
        <Table bordered>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Director</th>
              <th>Image</th>
              <th>Genre</th>
              <th>Duration</th>
              <th>Synopsis</th>
              <th>Casts</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td> </td>
              <td>Otto</td>
              <td>@mdo</td>
            
            </tr>
            
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </div>
    )
  }
}
export default AdminPage