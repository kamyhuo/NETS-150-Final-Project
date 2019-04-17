import React, { Component } from 'react';

import './App.css';

class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {cuisine: '', price: 'single'};

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
    alert('cuisine: ' + this.state.cuisine + ', price: ' + this.state.price);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>

        <label>
          Cuisine (Asian, Mediterranean, etc.):    
          <select value={this.state.price} onChange={this.handleChange} name = 'price'>
            <option value="african">African</option>
            <option value="newamerican">American (new)</option>
            <option value="tradamerican">American (Traditional)</option>
            <option value="bbq">Barbeque</option>
            <option value="breakfast_brunch">Breakfast/Brunch</option>
            <option value="caribbean">Caribbean</option>
            <option value="chinese">Chinese</option>
            <option value="greek">Greek</option>
            <option value="indpak">Indian</option>
            <option value="italian">Italian</option>
            <option value="japanese">Japanese</option>
            <option value="mediterranean">Mediterranean</option>
            <option value="mexican">Mexican</option>
            <option value="mideastern">Middle Eastern</option>
            <option value="pizza">Pizza</option>
            <option value="sandwiches">Sandwiches</option>
            <option value="vegetarian">Vegetarian</option>
          </select>
<br />
           <label>
          Pick your price range:

          <select value={this.state.price} onChange={this.handleChange} name = 'price'>
            // asd
            <option value="single">$</option>
            <option value="double">$$</option>
            <option value="triple">$$$</option>
          </select>
        </label>
        </label>
        <br />
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

      { /* <img src={require("./philadelphia.jpg")} className="App-logo" alt = ""/> */}
      <h1> Welcome! </h1>
          <h6>
            Your personalized Philly Restaurant recommender: bringing you the best Philly restaurants!
            <br />
            
          </h6>
      < InputForm />
        </header>
      </div>
    );
  }
}



export default App;
