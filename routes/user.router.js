import { Router } from "express"

import { 
  postUser, 
  getUsers, 
  getUserId, 
  updateUser, 
  deleteUser 
} from "../controllers/user.controller.js";

const router = Router()
import fileUpload from "express-fileupload"

router.post("/user",            
  //permite subir imagenes y archivos al servidor
  fileUpload({ useTempFiles: true, tempFileDir: "./upload"}),postUser)
router.get("/users", getUsers)

router.get("/user/:id", getUserId)

router.put("/user/:id", updateUser)

router.delete("/user/:id", deleteUser)

export default router