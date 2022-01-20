const express = require('express');
const mongoose = require('mongoose');
const morgan = require("morgan");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
require('dotenv').config();

//import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

//app
const app = express();



//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

//routes middleware  ALWAYS PUT AFTER MIDDLEWARE
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);

//db
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true
}).then(() => console.log('DB Connected'))
.catch(function(err) {
  console.log('error: ', err);
});
   
  mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
  });

const port = process.env.PORT || 8000

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
})

