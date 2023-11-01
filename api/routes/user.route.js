import express from "express";
import {deleteUser, getUser} from "../controllers/user.controller.js";
import {verifyToken} from "../middleware/jwt.js"

const router = express.Router();

//verifyToken passe à deleteUser grace à next() (dans jwt.js)
router.delete("/:id",verifyToken,deleteUser);

router.get("/:id",verifyToken, getUser);


export default router;