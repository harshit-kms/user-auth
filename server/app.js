import express from 'express';
import cors from 'cors';
import connectToMongoDB from './database/connect.js';
import staticRoute from './routes/staticRouter.js';
import userRoute from './routes/user.js'; 

const app = express();
app.use(express.json());
const PORT = 7000;
app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true, 
  }));

connectToMongoDB("mongodb://localhost:27017/infloso")
.then(() => {
    app.listen(PORT, () => {
        console.log("server started on ", PORT);
    });
})
.catch((err) => {
    console.error("Failed to connect to MongoDB: ", err)
});


app.use('/user', userRoute);
app.use('/', staticRoute); 



