import express from "express"
import {readStudents} from "./controlers.js"
const router=express.Router()

router.route("/student").get(readStudents)
















export default router