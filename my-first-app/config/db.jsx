import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Ashish@1232005",
  database: "hospital_db",
});


try {

  const connection = await pool.getConnection();
  console.log("Connected to the database!");
  connection.release();
  
} catch (error) {
  console.error("Error connecting to the database:", error);
  process.exit(1); // Exit the process with an error code
}

export default pool;