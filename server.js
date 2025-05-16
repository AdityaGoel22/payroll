import express from 'express';
import { checkConnection } from './Config/Db.js';
import { createAllTable } from './Utils/dbUtils.js';
import authRoute from './Routes/authRoute.js';
import ticketRoute from './Routes/ticketRoute.js';
import salaryRoute from './Routes/salaryRoute.js';
import feedbackRoute from './Routes/feedbackRoute.js';
import cors from 'cors';

const app =express();
app.use(cors());

app.use(express.json());
app.use('/api/auth', authRoute)
app.use('/api/ticket', ticketRoute)
app.use('/api/salary', salaryRoute)
app.use('/api/feedback', feedbackRoute)

app.get("/",(req,res)=>{
    res.send("This is Get /");
})
app.listen(4000, async()=>{
    console.log("Server is running on port 4000");
    try{
        await checkConnection();
        await createAllTable();
    }
    catch(error){
        console.log('failed', error);
        
    }
})