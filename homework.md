create a repository
Initialize the repository
node_mdules, package.json, package.lock.json
install express
create a server
Listen to port 7777
write request handlers for /test, /hello
Install nodemon and update scrips inside package.json
what are dependencies
what is the use of "-g" while npm install
diffrence between caret and tilde (^ vs ~)

Initialize Git
.gitignore
Create a remote repo on github
Push all code to remote origin
Play with routes and route extensions ex. /hello, /, hello/2, /xyz
order of the routes matter
Install Postman app and make workspace collection
Write logic to handle GET, POST, PATCH, DELETE API Calls and test them on Postman,
/user?name='vikas req.query used for fetch data
/user/:userId  req.params used for fetch dynamic value in url

-Explor routing and use of ?, +, (), * in the routes
 use of regex in routes /a/
 reading query params in the routes
 reading the dynamic routes

 Multiple route handlers - play with the code
 next()
 next function and errors along with res.send()
 app.use("/use", rh, [rH2, rH3], rH4, rH5);
what is middleware? why do we need it?
how express Js basically handles requests behind the scenes
app.use vs app.all find the exact diffrence
write a dummy auth middleware for admin
write a dummy auth middleware for user except user/login
Error handling using app.use

install mongoose
connect application to DB / devtinder
call the connectdb function and connect to db before  starting the applcation on 3000
create a user schema & user model
create / signup documents  using API calls.
Error handling using try and catch

Js object vs JSON diff
add the express.json middleware to your app
Make your signup API dynamic to recive data from the end user
User.findOne with duplicate email ids which object returned
API - GET user by email
API - Feed API - GET / feed - get all the users from the database
API - GET user by ID 
create a delete user API
Diffrence between Put abd Patch API

- Explore schematype options from the documentations
- put all appropriat validation on your schema
- add timestamps to schema