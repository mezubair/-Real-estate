const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./database/db");
const userRouter = require("./routes/user.routes");
const propertyRouter = require("./routes/property.routes");
const sellerRouter = require("./routes/admin.routes");
const AppError = require("./utils/appError");
const bookingRouter = require("./routes/booking.routes");
const globalErrorHandler = require("./controllers/error.controller");
require("./controllers/seeding");

dotenv.config({ path: "./.env" });

connectDB();
const app = express();

// Middlewares
app.use(express.json());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/properties", propertyRouter);
app.use("/api/v1/user", bookingRouter);
app.use("/api/v1/seller", sellerRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server is listening on port ${port}...`);
});
