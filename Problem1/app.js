const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();
const middleware = require('./middlewares/middleware');
const helper = require('./middlewares/helpers');
const WINDOW_SIZE = 12;
let currentWindow = [];
let uniqueNumbers = new Set();
var auth = {
    token: null,
    expirationTime: null
}

//i imported dotenv for later if i will deploy this on render.com
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({'success':true, 'message':'sever is up and running!'});
});

app.get('/number/:numberId', middleware.checkNumberId ,async (req, res) => {
    const numberId = req.params['numberId'];
    if(!auth.expirationTime || !helper.isTokenValid(auth.expirationTime)){
        const data =await helper.testServerAuth();
        console.log("api called");
        if(data){
            auth.token = data.access_token;
            auth.expirationTime = data.expires_in;
        }        
    }
    const response =await helper.getNumFromTestServer(auth, helper.mapNumberIdToType(numberId));
    console.log(response.numbers);

    const updatedRes = helper.updateTheWindow(response.numbers, WINDOW_SIZE,uniqueNumbers,currentWindow);

    uniqueNumbers = updatedRes.uniqueNumbers;
    currentWindow = updatedRes.currentWindow;   
    res.json(
        {
            numbers:response.numbers,
            windowPrevState:updatedRes.windowPrevState,
            windowCurrentState:updatedRes.windowCurrState,
            average:response.average
        });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});