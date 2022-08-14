const routes = require('next-routes') ();

routes
    .add('/ideas/new', '/ideas/new')
    .add('/ideas/:address', '/ideas/[viewIdea]')
    .add('/ideas/requests/:address', '/ideas/requests/[index]')
    .add('/ideas/requests/add/:address', '/ideas/requests/add/[add]')

//* using add() we define a new route mapping
//* using ':' we pass a wildcard or we can say a variable, in our case it will be the address of the created idea
//* 1st argumentt to add() will be a pattern that we want to look for orwe can say the url in this case
//* 2nd argument to the add() is, which route inside of our pages directory we want it to show whenever someone goes to the 1st argument or to the url

module.exports = routes;