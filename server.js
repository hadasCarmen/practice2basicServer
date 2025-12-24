import express from "express"
import fs from "fs/promises"
import dotenv from "dotenv"
import {readStudents} from "./data/students.json"
import router from "./routers"
dotenv.config()
const app = express();
app.use('/',router)
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));