import app from "./app.js";
import config from "./config/config.js";

const port  = config.port || 5050;

app.listen(port,()=>{
  console.log(`Server is running on port ${port}`)
})