import express from "express";
import {
    createGig,
    deleteGig,
    getGig,
    getGigs
} from "../controllers/gig.controller.js";
import { verifyToken }  from "../middleware/jwt.js";

const router = express.Router();

//la fin des routes (le debut est dans server.js)
//verifyToken et deleteGig/createGig/getGig... : 
//Ce sont des fonctions middleware qui seront exécutées avant que la logique de la route ne soit exécutée.

//verifyToken indique qu'il faut etre logged in pour pouvoir créer un Gig ou delete un Gig
router.post("/", verifyToken, createGig);
router.delete("/:id", verifyToken, deleteGig);
router.get("/single/:id", getGig);
router.get("/", getGigs);

export default router;