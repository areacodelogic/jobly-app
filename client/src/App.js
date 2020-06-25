import React, {Component} from 'react';
import JoblyApi from './JoblyApi';


import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      companies: []
    }
  }

  async componentDidMount(){

    let companies = await JoblyApi.getJob(3);
    console.log(companies)
    this.setState({companies})

  }



  render(){
    return(
      <div>App</div>
    )
  }

}
  


export default App;
