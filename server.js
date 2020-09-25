const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 1996;
const middleware = require('./server/middleware/middleware');

const urlRouter = require('./server/routes/urls');

// Connect MongoDB at default port 27017.  
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});


app.use(helmet());
app.use(morgan('common'));
app.use(cors());
app.use(express.json());

app.use('/api/url', urlRouter);

app.use(middleware.NotFound);
app.use(middleware.ErrorHandler);

app.listen(port, () => {
    console.log(process.env.URL);
});