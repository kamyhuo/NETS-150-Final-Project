'use strict';
import React, { Component } from 'react';
import Select from 'react-select';
import Cards, { Card } from 'react-swipe-card'
import './App.css';
import RestaurantList from './RestaurantList';

class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      cuisine: '', 
    price: '1'};

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
    this.props.onFormSubmit(this.state.cuisine, this.state.price)
  } 

}

const cuisineOptions = [
  { value: 'african', label: 'African' },
  { value: 'newamerican', label: 'American (new)' },
  { value: 'tradamerican', label: 'American (Traditional)' },
  { value: 'bbq', label: 'Barbeque' },
  { value: 'breakfast_brunch', label: 'Breakfast/Brunch' },
  { value: 'caribbean', label: 'Caribbean' },
  { value: 'chinese', label: 'Chinese' },
  { value: 'greek', label: 'Greek' },
  { value: 'indpak', label: 'Indian' },
  { value: 'italian', label: 'Italian' },
  { value: 'japanese', label: 'Japanese' },
  { value: 'mediterranean', label: 'Mediterranean' },
  { value: 'mexican', label: 'Mexican' },
  { value: 'mideastern', label: 'Middle Eastern' },
  { value: 'pizza', label: 'Pizza' },
  { value: 'sandwiches', label: 'Sandwiches' },
  { value: 'vegetarian', label: 'Vegetarian' },
];

const priceOptions = [
  { value: '1', label: '$' },
  { value: '2', label: '$$' },
  { value: '3', label: '$$$' },
]

class App extends Component {
    constructor(props) {
    super(props);
    this.state = {
      cuisine: null,
      price: null
    };
  }
  handleCuisineChange = (cuisine) => {
    this.setState( state => {
      return {
        multiValue: cuisineOptions
      };
    });
    console.log(`Cuisine selected:`, cuisine);
  }

  handlePriceChange = (price) => {
    this.setState( state => {
      return {
        multiValue: priceOptions
      };
    });
    console.log(`Price selected:`, price);
  }
    onFormSubmit = (cuisine, price) => {
    this.setState({
      cuisine: cuisine,
      price: price
    })
  }

  render() {
    const { cuisine } = this.state;
    const { price } = this.state;
    return (
      <div className="App">
        <header className="App-header">

      <h1> Welcome! </h1>
          <h6>
            Your personalized Philly Restaurant recommender: bringing you the best Philly restaurants!
            <br />
            
          </h6>
      <Select
        name="Cuisine"
        placeholder="Cuisine"
        value={cuisine}
        onChange={this.handleCuisinehange}
        options={cuisineOptions}
      />
      <Select
        name="Price"
        placeholder="Price"
        value={price}
        onChange={this.handlePriceChange}
        options={priceOptions}
      />
<RestaurantList 
          cuisine = {this.state.cuisine} price = {this.state.price}/> 

        </header>
      </div>

    );
 

  
}
}


export default App;
