
export  const readStudents=( async(req,res)=>{
    try {
        const students = await fs.readFile("./data/students.json", "utf8");
        const goodStudents = JSON.parse(students);
        res.send( goodStudents)
    } catch (error) {
        res.send([])
    }
})
