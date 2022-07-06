// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app=express();
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors=require('cors');
app.use(cors());

// Initialize the main project folder
// points the server code to the folder "dist"
app.use(express.static('dist')); 


// POST route
app.post('/all', async(req,res) =>{
    projectData['temp'] = req.body.temp;
    projectData['date'] = req.body.date;
    projectData['content'] = req.body.content;
    res.send(projectData);
})

//Respond with JS object when a GET request is made to the homepage
app.get('/all', async (req, res)=>{
    if (projectData) {
        res.send(projectData);
    }
}) 

// Setup Server
const port = 8000;
const server = app.listen(port, listening);
function listening(){
    console.log("server running");
    console.log(`running on locations: ${port}`);
};
