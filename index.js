import app from "./app.js";
import { connectToDB } from "./utils/mongoose.js";
import { PORT } from "./config.js";

async function main(){
  await connectToDB()
  app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
  });
}

main()