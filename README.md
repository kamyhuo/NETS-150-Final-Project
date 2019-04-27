# Philly Restaurant Recommender
## Getting Started
In order to use our service, please visit https://phillyresrec.herokuapp.com/. If you have direct access to our code repository, you can also clone it, and then run the following commands in terminal to run the app locally:
```
	cd [folder containing all of the code]
	npm install 
	npm start
```
Please note that while running the local application is possible, we highly recommend visiting the provided link instead. Also keep in mind that regardless of visiting the link or running the app locally, you must be connected to the internet in order to obtain recommendations. 

## Filling Out Preferences 
You will first be greeted with the following page:

Please read the provided directions in the yellow box to familiarize yourself with how to use the application. Then, using the two drop-down menus, select your desired cuisine and desired price range. Note that you can only select one cuisine and one price range. After doing so, click the “submit” button to submit your preferences. 

## Voting on Recommendations 
After you click the “submit” button, you will see restaurant listing presented to you. Below is an example of such listing:

Each restaurant listing provides a picture of the restaurant, the name of the restaurant, its address, phone number, Yelp rating, and link to the restaurant’s Yelp listing. You will have to vote on each restaurant by clicking either the heart emoji or the angry face emoji. The heart emoji means that you like the restaurant, while the angry emoji means that you dislike the restaurant. We will provide up to 5 restaurant listing, depending on how many restaurants in the Philadelphia area match your desired parameters. 
Please note that there are some categories that we are unable to provide recommendations for, simply because those types of restaurants are not in the Philadelphia area. If you come across this case, the following message will be displayed for more than 5 seconds: 

If this message is displayed or you ever want to restart your search at any point, please press the “Search again” button. 

## Viewing Final Recommendations 
After voting on all the given restaurants, we will now present you with your final recommendation list! In order to view all recommendations, click the “next” and “prev buttons. After you’re done viewing all of your recommendations and wish to receive more recommendations for another category, please click “Search again” and repeat the procedure outlined in this user guide. 
