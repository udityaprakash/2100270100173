const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const middleware = require('./middlewares/middleware');

//i imported dotenv for later if i will deploy this on render.com
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({'success':true, 'message':'sever is up and running!'});
});

app.get('/number/:numberId', middleware.checkNumberId ,(req, res) => {
    const numberId = req.params['numberId'];
    res.json({'success':true, 'message':'Valid input!'});
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});