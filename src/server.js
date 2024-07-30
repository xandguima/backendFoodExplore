const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const AppError = require("./utils/AppError");
const uploadConfig = require("./config/upload");

require("express-async-errors");
require("dotenv/config");

const app = express();

// Middleware global para CORS
app.use(cors({
  origin: 'https://foodexplorerocketseat.netlify.app',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());


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
