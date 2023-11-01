import createError from "../utils/createError.js";
import jwt from "jsonwebtoken";

//Utiliser ce middleware pour faire la plupart des operations d'un user connecté dans le site

export const verifyToken = (req,res,next)=>{
    //récupère le token JWT à partir des cookies de la requête HTTP
    const token = req.cookies.accessToken;
    if(!token) return next(createError(401,"You are not authenticated"));
    
    //JWT_KEY utilisée pour stocker la clé secrète nécessaire à la création & vérification des JSON Web Tokens (JWT).
    jwt.verify(token, process.env.JWT_KEY, async (err,payload)=>{
        if(err) return next(createError(403,"Token is not valid!"));
        req.userId = payload.id;
        req.isSeller = payload.isSeller;
        next();
    });
}