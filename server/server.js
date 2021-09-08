import express from "express";
import { readdirSync } from "fs";
import cors from "cors";
import mongoose from "mongoose";
require("dotenv").config();
const morgan = require("morgan");

const app = express();

//db connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DataBase Connected"))
  .catch((err) => console.log("DB Connection Error:", err));
//morgan is use here to show routes in console. it should only be used in development
//Remeber to remove it from here once development is done.
//Regards Rohan
//middleware
//cors is used to run frontend and backend simultaneously otherwise their linking can cause error
app.use(cors());
app.use(morgan("dev"));
//to see console logs having json data such as res.body in registeration
app.use(express.json());
//route middleware
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
