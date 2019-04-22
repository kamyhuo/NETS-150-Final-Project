'use strict';
import React, { Component } from 'react';
import Cards, { Card } from 'react-swipe-card'
import './App.css';
import RestaurantList from './RestaurantList';
import MultiSelect from "@kenshooui/react-multi-select";
import "@kenshooui/react-multi-select/dist/style.css"

import type {
    Option,
} from '../select-item.js';

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
  { value: 'vegetarian', label: 'Vegetarian' }
];

const priceOptions = [
  { value: '1', label: '$' },
  { value: '2', label: '$$' },
  { value: '3', label: '$$$' }
]

class App extends Component {
    constructor(props) {
    super(props);
    this.state = {
      cuisine: null,
      price: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);

    this.state = {
      items: [
  { id: 'african', label: 'African' },
  { id: 'newamerican', label: 'American (new)' },
  { id: 'tradamerican', label: 'American (Traditional)' },
  { id: 'bbq', label: 'Barbeque' },
  { id: 'breakfast_brunch', label: 'Breakfast/Brunch' },
  { id: 'caribbean', label: 'Caribbean' },
  { id: 'chinese', label: 'Chinese' },
  { id: 'greek', label: 'Greek' },
  { id: 'indpak', label: 'Indian' },
  { id: 'italian', label: 'Italian' },
  { id: 'japanese', label: 'Japanese' },
  { id: 'mediterranean', label: 'Mediterranean' },
  { id: 'mexican', label: 'Mexican' },
  { id: 'mideastern', label: 'Middle Eastern' },
  { id: 'pizza', label: 'Pizza' },
  { id: 'sandwiches', label: 'Sandwiches' },
  { id: 'vegetarian', label: 'Vegetarian' }
      ],
      selectedItems: []
    };
  }

   handleChange(selectedItems) {
    this.setState({ 
      cuisine: selectedItems[0]
    });
  }
    handlePriceChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: event.target.value
    });
  }
    onFormSubmit = (cuisine, price) => {
      this.setState({
        cuisine: cuisine,
        price: price
      })
    }

  render() {
    const { items, selectedItems } = this.state;
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
      <MultiSelect
        items={items}
        selectedItems={selectedItems}
        onChange={this.handleChange}
      />
      <label>
          Pick your price range:

          <select value={this.state.price} onChange={this.handlePriceChange} name = 'price'>
            // asd
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
          </select>
        </label>

      <form onSubmit={this.handleFormSubmit}>
        <input type="submit" value="Submit" />
      </form>
<RestaurantList 
          cuisine = {'mexican'} price = {this.state.price}/> 

        </header>
      </div>

    );
 

  
}
}


export default App;
