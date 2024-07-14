import express from 'express';
import 'dotenv/config';
import { dbConnection } from "./database/db.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get("/healthy", (req, res) => {
  res.json({
    success: true,
    message: "Server is healthy!",
  });
});

//app.use("/api/v1", router);

dbConnection()
  .then(() => {
    console.log("Database connection established!");
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error establishing connection with the database:", error);
  });
