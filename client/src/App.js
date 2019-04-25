'use strict';
import React, { Component } from 'react';
import Cards, { Card } from 'react-swipe-card'
import './App.css';
import RestaurantList from './RestaurantList';
import ReactDOM from 'react-dom'
import Carousel from './RestaurantList';


class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      cuisine: '', 
    price: '1',
    showing: false};

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: event.target.value
    });

  }

  handleFormSubmit(event) {
    event.preventDefault();
    this.props.onFormSubmit(this.state.cuisine, this.state.price, this.state.showing)
  } 



  render() {
    return (
      <form onSubmit={(e) => this.handleFormSubmit(e)}>
      <h3> <u> START HERE: </u></h3>
        <label>
         <h5> Choose your cuisine:   &nbsp;
          <select value={this.state.cuisine} onChange={this.handleChange} name = 'cuisine'>
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
          </select></h5> 
           <label>
      <h5>    Pick your price range: &nbsp;

          <select value={this.state.price} onChange={this.handleChange} name = 'price'>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
          </select></h5>
        </label>
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class App extends Component {
    constructor(props) {
    super(props);
    this.state = {
      cuisine: null,
      price: null,
      showing: false,
      done: true
    };
  }
    onFormSubmit = (cuisine, price, showing) => {
    this.setState({
      cuisine: cuisine,
      price: price,
      showing: true,
      done: false
    })
  }

  restartGame(event) {
  this.setState({ done: true, showing: false });
}

state = {
  response: '',
  post: '',
  responseToPost: '',
};
componentDidMount() {
  this.callApi()
    .then(res => this.setState({ response: res.express }))
    .catch(err => console.log(err));
}
callApi = async () => {
  const response = await fetch('/api/hello');
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  return body;
};
handleSubmit = async e => {
  e.preventDefault();
  const response = await fetch('/api/world', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ post: this.state.post }),
  });
  const body = await response.text();
  this.setState({ responseToPost: body });
};

  render() {
    const { showing } = this.state;
    return (
      <div className="App">
        <header className="App-header">

      {<img src={require("./donut.png")} className="App-logo" alt = ""/>}
      <h1> <b> Welcome! </b></h1>
          <h6>
            Your personalized Philly Restaurant recommender: bringing you the best Philly restaurants!
            <br />
            <br />
            <div class="boxed">
            <br />
            <h2> How it works: </h2>
            <br />
            1. Select your cuisine type
            <br />
            2. Select your price range
            <br />
            3. You will be presented with the top 5 highest rated restaurants matching your preferences. <br />
            Click HEART if you are interested in the restaurant, and ANGRY FACE if you are not.<br />
             <br />
            At the end, you will be presented with all of your interested restaurants and<br />
            a STAR restaurant recommendation similar to ALL the restaurants you are interested in!<br />
            <br />
            </div>
          </h6>
      {this.state.done && <InputForm onFormSubmit = {this.onFormSubmit} />}

{ showing && ( <div><RestaurantList 
          cuisine = {this.state.cuisine} price = {this.state.price}/></div>)}
<br />
         { showing && <button type="button" onClick={ this.restartGame.bind(this) }>
  <span>Search again</span>
</button> }
                    
        </header>

        <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p>
      </div>

    );
  
}
}



export default App;