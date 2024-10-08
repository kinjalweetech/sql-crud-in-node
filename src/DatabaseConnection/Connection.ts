

// // AppDataSource.initialize()
// //   .then(() => {
// //     console.log("Database connection established successfully");
// //   })
// //   .catch((error: unknown) => {
// //     console.error("Error establishing database connection:", error);
// //   });

import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Student } from "../Entity/StudentTable";

dotenv.config();

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "", // Ensure no quotes around password
  database: process.env.DB_DATABASE || "practice", // Database name
  entities: [Student], // Register your entities here
  synchronize: true, // Automatically sync schema (avoid in production)
  logging: true, // Enable logging for debugging
});

// Export the initialized data source
export default AppDataSource;
