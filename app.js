import express from "express";
import morgan from "morgan";
import cors from "cors";
import indexRoutes from "./routes/index.routes.js";
import productRoutes from "./routes/product.routes.js";


const app = express();

app.use(cors())//permite que se puedan hacer peticiones desde otros dominios
app.use(morgan("dev"));//idica como se van a ver los logs en la consola
app.use(express.json())

app.use(indexRoutes)
app.use(productRoutes)

export default app