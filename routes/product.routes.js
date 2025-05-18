import { Router } from "express"

import { 
  postProducts, 
  getProducts, 
  getProductsId, 
  updateProducts, 
  deleteProducts 
} from "../controllers/product.controller.js";

const router = Router()
import fileUpload from "express-fileupload"

router.post("/products",            
  //permite subir imagenes y archivos al servidor
  fileUpload({ useTempFiles: true, tempFileDir: "./upload"}),postProducts)
router.get("/products", getProducts)

router.get("/products/:id", getProductsId)

router.put("/products/:id", updateProducts)

router.delete("/products/:id", deleteProducts)

export default router