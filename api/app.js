import 'dotenv/config';
import express, { json } from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import session from 'express-session';




//routes
import authRoute from './routes/authRoute.js';
import flowRoute from './routes/flowRoute.js'
import dbConnect from './config/dbConnect.js';



const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret:"secret",
    resave:false,
    saveUninitialized:false,
    cookie:{
        secure:false,
        maxAge: 1000 * 60 * 60 * 24
    }
}));
app.use(express.urlencoded({extended:true}));
// app.use(cors())
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
}));


app.use('/api/auth',authRoute);
app.use('/api/flow',flowRoute);




app.listen(5000,()=>{
    dbConnect();
    console.log('Server is running on port 5000');
    
})