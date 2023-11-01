import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const deleteUser = async (req,res,next)=>{

    //utilise le modèle User pour rechercher un utilisateur dans la base de données
    //en utilisant l'ID fourni dans les paramètres de la requête (req.params.id)
    const user = await User.findById(req.params.id);

    //on rajoute toString() car sinon son type c'est un objetId
    if(req.userId !== user._id.toString()){
        return next(createError(403,"You can delete only your account."));
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("Deleted.");
    
}

export const getUser = async (req,res,next)=>{
    const user = await User.findById(req.params.id);

    res.status(200).send(user);
    
}