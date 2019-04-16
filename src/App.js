import React, { Component } from 'react';

import './App.css';

class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {cuisine: '', price: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    alert('A cuisine was submitted: ' + this.state.cuisine + ' with price: ' + this.state.price);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Cuisine     
          <input type="text" value={this.state.cuisine} onChange={this.handleChange} name='cuisine'/>

           <label>
          Pick your price range:

          <select value={this.state.price} onChange={this.handleChange} type='price' name = 'price'>
            <option value="single">'$'</option>
            <option value="double">'$$'</option>
            <option value="triple">'$$$'</option>
          </select>
        </label>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">

      {   /* <img src={require("./cheesesteak.jpeg")} className="App-logo" alt = ""/> */ }

          <p>
            Welcome to your personalized Philly Restaurant recommender!
          </p>
      < InputForm />
        </header>
      </div>
    );
  }
}



export default App;
