import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();




//routes
import projectRouter from "./routes/project.js";
// import { autoRefreshToken } from "./middleware/authMiddleware.js";



const app = express();




//cors
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use("/api/v1/projects", projectRouter);


const port = 3001;


app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
})
