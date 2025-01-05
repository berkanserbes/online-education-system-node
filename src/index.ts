import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { errorHandler } from "./middlewares/error.middleware";
import { sequelize } from "./configs/postgre.config";

// Import Models
import "./models/user.model";
import "./models/student.model";
import "./models/instructor.model";
import "./models/course.model";
import "./models/category.model";
import "./models/review.model";
import "./models/certificate.model";
import "./models/payment.model";
import { logger } from "./middlewares/logger.middleware";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(logger);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(errorHandler);

const PORT = 3000;
sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
