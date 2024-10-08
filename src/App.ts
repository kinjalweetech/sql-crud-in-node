import express, { Response, Request } from "express";
import AppDataSource from "./DatabaseConnection/Connection"; // Correct import path
import { Student } from "./Entity/StudentTable";
import { error } from "console";

const app = express();
const port = process.env.SERVER_PORT || 7000;

app.use(express.json());

// Initialize the database connection
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized");

    // Route to create a student record in the SQL table
    app.post("/student", async (req: Request, res: Response): Promise<void> => {
      const { name, address } = req.body;

      const student = new Student();
      student.name = name;
      student.address = address;

      try {
        // Save the student record to the database
        await AppDataSource.manager.save(student);
        res.send(`Student ${student.name} created successfully`);
      } catch (error) {
        console.error(error);
        res.status(500).send("Failed to create student");
      }
    });

    //Read Student Detail by Student from id
    app.get(
      "/student/:id",
      async (req: Request, res: Response): Promise<void> => {
        try {
          const { id } = req.params;

          const studentRepositary = AppDataSource.getRepository(Student);
          const student = await studentRepositary.findOneBy({
            id: parseInt(id),
          });
          if (!student) {
            res.status(404).json({ message: "student not found" });
          }
          res.json(student);
        } catch (error) {
          console.error(error);
          res.status(500).send(`faild fetch to student id`);
        }
      }
    );

    //update the student detail
    app.put("/student/:id", async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const { name, address } = req.body;
        const studentRepositary = AppDataSource.getRepository(Student);

        const student = await studentRepositary.findOneBy({ id: parseInt(id) });
        if (!student) {
          res.status(404).json({ message: "student not found" });
        }
        student.name = name || student.name;
        student.address = address || student.address;
        await studentRepositary.save(student);

        res.json({ message: "student detail updated successfully!", student });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "failed updated student detail " });
      }
    });

    app.delete(
      "/student/:id",
      async (req: Request, res: Response): Promise<void> => {
        try {
          const { id } = req.params;

          const studentRepository = AppDataSource.getRepository(Student);

          const student = await studentRepository.findOneBy({
            id: parseInt(id),
          });

          if (!student) {
            res.status(404).json({ message: "Student not found" });
            return;
          }

          await studentRepository.remove(student);

          res.json({ message: "Student deleted successfully" });
          return;
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Error deleting student details" });
          return;
        }
      }
    );

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error: unknown) => {
    console.error("Error during Data Source initialization:", error);
  });

export default app;

// app.get("/", async (req: Request, res: Response): Promise<void> => {
//   let tableName = "Student_Table";

//   // Query to create table
//   let query = `CREATE TABLE IF NOT EXISTS ${tableName}
//         (id INT AUTO_INCREMENT PRIMARY KEY,
//         name VARCHAR(255),
//         address VARCHAR(255))`;

//   try {
//     // Use query as a promise
//     await AppDataSource.query(query);
//     res.send(`Successfully Created Table - ${tableName}`);
//     return;
//   } catch (err) {
//     res.status(500).send("Table Creation Failed");
//     return;
//   }
// });
////////simple rite aavi rite pan vina entity e pan table create kari shakay
