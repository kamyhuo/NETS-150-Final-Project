import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
        this.state = {
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
        this.setState({ loading: true })
        axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=Philadelphia`, {
        headers: {
            // Kamy's API key
            Authorization: `Bearer bViYiVvQPGlIKygKlkCrFgsNcCnyNGJgUDCvTSG7dgooeyBjzEM-WzlkVhYsvItlMU-rNDno368sOtZxg2TWtpMgJXmyFIUSXgFzaK8UdwWOXQEL9sbY1yEZoCC5XHYx`
        },
        // Feed in user's cuisine and price preference
        params: {
            categories: cuisine,
            price: price
        }
        })
        .then((res) => {
            console.log(res.data.businesses)
            this.setState({ results: res.data.businesses, loading: false })
        })
        .catch((err) => {
            // Error message (won't be reached)
            this.setState({ errorState: `No matches found!`, loading: false })
        })
    }

    renderEmptyState () {
        return (
            <h2 className = "heading-tertiary">Hang tight! We're working on finding your favorite restaurants in Philly! If you continue to see this message, please search within a different category. </h2>
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
                    <img src = {result.image_url} height = "320px" alt = "" className = "RestaurantInfo__img" />
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
                        className = "RestaurantInfo__website"  target="_blank">
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
        {    (this.state.i < 5 && !(this.state.i == RestaruantList.length)) ?     
            <div className="RestuarantList__gallery">{RestaruantList[(this.state.i)]}
           <h5> Press your choice! </h5>
            
            <button onClick={(e) => {this.state.no.push(this.state.id[this.state.i]);  this.setState(prevState => {
       return {i: prevState.i + 1}
    })}}><img src="NO.png" height="50px" width="50px" /></button>

                <button onClick={(e) => {this.state.yes.push(this.state.id[this.state.i]);
                 this.state.like.push(<h4><div className="RestuarantList__gallery">{RestaruantList[(this.state.i)]}</div></h4>); 
                 this.setState(prevState => {
       return {i: prevState.i + 1}
    })}}><img src="YES.png" height="50px" width="50px"/></button></div> : null
}
 {    (this.state.i == 5 || (this.state.i == RestaruantList.length)) ?    <Cl like = {this.state.like} />   : null  }



</div>

        )}
    render() {
        console.log(this.state.like);
        return (

            <section className="RestuarantList">
                {this.state.results.length ? this.renderRestaurantInfo() : this.renderEmptyState()}
                {!!this.state.errorState &&
                    <h1>{this.state.error}</h1>
                }   
            </section>
        )}
}
export default RestaurantList