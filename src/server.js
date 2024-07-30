require("express-async-errors");
require("dotenv/config");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const AppError = require("./utils/AppError");
const uploadConfig = require("./config/upload");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: ['https://foodexplorerocketseat.netlify.app', 'http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.options('*', cors({
  origin: ['https://foodexplorerocketseat.netlify.app', 'http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

const routes = require("./routes");
app.use(routes);

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use((error, request, response, next) => {
  console.log(error);
  if (error instanceof AppError) {
      return response.status(error.statusCode).json({
          status: "error",
          message: error.message
      });
  }

  return response.status(500).json({
      status: "error",
      message: "internal server error"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
