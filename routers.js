import express from "express";
import {
  addStudent,
  deleteStudent,
  findStudent,
  readStudentsServer,
  updateStudent,
} from "./controlers.js";
const router = express.Router();

router.route("/student").get(readStudentsServer).post(addStudent);
router
  .route("/student/:id")
  .get(findStudent)
  .put(updateStudent)
  .delete(deleteStudent);

export default router;
