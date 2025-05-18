import { Router } from "express"

const router = Router()

router.get("/", (req, res) => {
  res.send("Hello World 3!");
})

export default router