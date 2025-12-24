import fs from "fs/promises";
const readStudents = async () => {
  try {
    const students = await fs.readFile("./data/students.json", "utf8");
    const goodStudents = JSON.parse(students);
    return goodStudents;
  } catch (error) {
    return [];
  }
};
const writeStudents = async (student) => {
  try {
    const goodStudents = await readStudents();
    goodStudents.push(student);
    const jsonStudents = JSON.stringify(goodStudents, null, 2);
    await fs.writeFile("./data/students.json", jsonStudents);
  } catch (error) {
    console.log(error);
  }
};

const readCourses = async () => {
  try {
    const courses = await fs.readFile("./data/courses.json", "utf8");
    const goodCourses = JSON.parse(courses);
    return goodCourses;
  } catch (error) {
    return [];
  }
};
const writeCourses = async (course) => {
  try {
    const goodCourses = await readCourses();
    goodCourses.push(course);
    const jsonCourses = JSON.stringify(goodCourses, null, 2);
    await fs.writeFile("./data/courses.json", jsonCourses);
  } catch (error) {
    console.log(error);
  }
};

export const readStudentsServer = async (req, res) => {
  const readStudents2 = await readStudents();
  if (readStudents2.length === 0) {
    res.status(400).send("empty");
  } else {
    res.status(200).json(readStudents2);
  }
};

export const findStudent = async (req, res) => {
  const { id } = req.params;
  const readStudents2 = await readStudents();
  if (readStudents2.length === 0) {
    res.status(400).send("empty");
  } else {
    const student = readStudents2.find((student) => student.id === +id);
    if (student) {
      res.status(200).send(student);
    } else {
      res.status(404).send("not found");
    }
  }
};

// export const addStudent = async (req, res) => {
//   const student = await fs.readFile("./student.json", "utf8");
//   const jsStudent = JSON.parse(student);
//   const maxId =
//     jsStudent.length > 0 ? Math.max(...jsStudent.map((u) => u.id)) : 0;
//   const newUser = {
//     id: maxId + 1,
//     ...req.body,
//   };
//   jsStudent.push(newUser);
//   const jsonStudent = JSON.stringify(jsStudent, null, 2);
//   await fs.writeFile("./student.json", jsonStudent);
//   res.status(201).send("create user");
// };
export const addStudent = async (req, res) => {
  try {
    const jsStudent = await readStudents();
    const maxId =
      jsStudent.length > 0 ? Math.max(...jsStudent.map((u) => u.id)) : 0;
    const newStudent = {
      id: maxId + 1,
      ...req.body,
    };
    await writeStudents(newStudent);
    res.send("add student");
  } catch (error) {
    res.status(400).send(error);
  }
};

export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const students = await readStudents();
  const student = students.findIndex((student) => student.id === Number(id));
  if (student === -1) {
    res.status(404).send("not found student");
  } else {
    students[student] = { ...students[student], ...body };
    const jsonstudents = JSON.stringify(students, null, 2);
    await fs.writeFile("./data/students.json", jsonstudents);
    res.status(201).send("update student");
  }
};

export const deleteStudent = async (req, res) => {
  const { id } = req.params;
  const students = await readStudents()
  const user = students.findIndex((user) => user.id === Number(id));
  if (user === -1) {
    res.status(404).send("not found user");
  } else {
    students.splice(user, 1);
    const jsonstudents = JSON.stringify(students, null, 2);
    await fs.writeFile("./data/students.json", jsonstudents);
    res.status(201).send("delete user");
  }
};
