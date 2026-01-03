import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import contactRouter from './routes/ContactRouter.js';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL,{
            dbName : "newClone",
        })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

app.use('/api', contactRouter);


app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.use((req, res) => {
  res.sendFile(
    path.join(__dirname, "frontend", "dist", "index.html")
  );
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});