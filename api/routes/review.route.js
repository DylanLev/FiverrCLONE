import express from "express";
import {
    createReview,
    getReviews,
    deleteReview,
} from "../controllers/review.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

//verifyToken verifie si le user est logged in pour pouvoir créer une review
router.post("/", verifyToken, createReview);
router.get("/:gigId", getReviews);
router.delete("/:id", deleteReview);


export default router;