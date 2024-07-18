require("express-async-errors");
const cors = require("cors");
const express =require("express");
const AppError=require("./utils/AppError");


const app = express();
app.use(cors())
app.use(express.json());

const routes=require("./routes");
app.use(routes);

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


const PORT = 3333;

app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
});