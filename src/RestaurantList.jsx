import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactDOM from 'react-dom'
import Carousel from 'nuka-carousel';

class Cl extends React.Component {

    constructor(props) {
        super(props);
    }

  render() {
    return (
              <div style={{ width: "700px", margin: "auto" }}>
          <Carousel >
        
        {this.props.like.map(like => {
        return ( <h4>{like}</h4> )
      })} 
     
      </Carousel>
      </div>
      
    );
  }
}


class RestaurantList extends Component {

    constructor(props) {
        super(props);
        //props.state is linked with the result sending back from its child a.k.a the result we returned in SearchForm element
        this.state = {
        //leverage the state to store the information return from API to make loading faster
        results: [],
        errorState: null,
        loading: false,
        i: 0,
        yes: [],
        no: [],
        id: [],
        like: [],
        all: null
        };
    }
    
    componentDidMount () {
        this.getRestaurantsFromApi(this.props.cuisine, this.props.price);
    }

    componentDidUpdate (prevProps, prevState) {
        if(this.props.cuisine !== prevProps.cuisine) {
            this.setState({ 
                results: [], 
            }, () => this.getRestaurantsFromApi(this.props.cuisine, this.props.price))
        }

                if(this.props.price !== prevProps.price) {
            this.setState({
                results: [], 
            }, () => this.getRestaurantsFromApi(this.props.cuisine, this.props.price))
        }
    }
    //function to get information from API 
    getRestaurantsFromApi = (cuisine, price) => {
        //UI feedback to tell the user when we are retrieving infromation from the API 
        this.setState({ loading: true })

        //using a proxy server cors-anywhere to get rid of the CROS probblem 
        //SUPER HOT TIP: passing the location variable, which equals to the user's input (see below). Instead of grabbbing the entire API, it will only retrieve the restaurants that are closed to the lcoation information we entered. This makes the lodading wayyyyyyy faster.
        axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=Philadelphia`, {
        //required authorization format from API 
        headers: {
            //to get the API from the .env file use process.env.{variable name}
            Authorization: `Bearer bViYiVvQPGlIKygKlkCrFgsNcCnyNGJgUDCvTSG7dgooeyBjzEM-WzlkVhYsvItlMU-rNDno368sOtZxg2TWtpMgJXmyFIUSXgFzaK8UdwWOXQEL9sbY1yEZoCC5XHYx`
        },
        //option params passed to API call to retrieve only breakfast and lunch spots 
        params: {
            categories: cuisine,
            price: price
        }
        })
        .then((res) => {
            console.log(res.data.businesses)
            //change the state of App to reflect on the result we are given from the API
            //at the same time, setting the loading state to false 
            this.setState({ results: res.data.businesses, loading: false })
        })
        .catch((err) => {
            //fire the errorState message if there is no information return from the API
            this.setState({ errorState: `Sorry we coudln't find information related to the location you search, do you want to try something else?`, loading: false })
        })
    }

    renderEmptyState () {
        return (
            <h2 className = "heading-tertiary">Hang tight! We're working on finding your favorite restaurants in Philly!</h2>
        )
    }

    renderRestaurantInfo () {

        const RestaruantList = this.state.results.map((result) => {
            this.state.id.push(result.id);
            return (    
                <div>
                <div 
                    className = "RestaurantInfo"
                    key = {result.id}
                >
                    <img src = {result.image_url} width = "400px" alt = "" className = "RestaurantInfo__img" />
                    <h2 className = "heading-tertiary RestaurantInfo__name">{result.name}</h2>
                    
                    <p className = "RestaurantInfo__para">
                        <FontAwesomeIcon 
                        icon = "map-marker-alt" 
                        className = "RestaurantInfo__icon"
                        aria-label = "address:" />
                        {result.location.display_address[0]}, {result.location.display_address[1]}
                    </p>
                    
                    <p className = "RestaurantInfo__para">
                        <FontAwesomeIcon 
                        icon = "phone" 
                        className = "RestaurantInfo__icon"
                        aria-label = "phone number:" />
                        {result.phone}
                    </p>

                    <img 
                        src = {require(`./assets/yelp_stars/regular/${result.rating}.png`)}
                        alt = {`yelp ratings: ${result.rating}/5`}
                        className = "RestaurantInfo__rating"/>

                    <p className = "RestaurantInfo__reviewCount"> Based on {result.review_count} Reviews</p>
               
                    <a 
                        href= {result.url} 
                        className = "RestaurantInfo__website">
                            More information on Yelp
                    </a>
                    <a
                         
                    />

                </div>  
                   
                    </div>
            );
        });

        return(
        <div>
            <div className="RestuarantList__gallery">{RestaruantList[(this.state.i)]}

            <button onClick={(e) => {this.state.no.push(this.state.id[this.state.i]);  this.setState(prevState => {
       return {i: prevState.i + 1}
    })}}><img src="NO.png" height="50px" width="50px" /></button>

                <button onClick={(e) => {this.state.yes.push(this.state.id[this.state.i]);
                 this.state.like.push(<h4><div className="RestuarantList__gallery">{RestaruantList[(this.state.i)]}</div></h4>); 
                 this.setState(prevState => {
       return {i: prevState.i + 1}
    })}}><img src="YES.png" height="50px" width="50px"/></button>

    </div>
    < br />
<div>

 </div>
  <Cl like = {this.state.like} />
</div>




        )
    }


    render() {
        console.log(this.state.like);


        return (

            <section className="RestuarantList">
                {this.state.results.length ? this.renderRestaurantInfo() : this.renderEmptyState()}

                {/*conditional rendering for error state - when this.state.errorState is not true*/}
                {!!this.state.errorState &&
                    <h1>{this.state.error}</h1>
                }   
            </section>
        )}



}
export default RestaurantList