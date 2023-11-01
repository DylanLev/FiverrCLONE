import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const register = async (req,res,next)=>{
    try {
        const hash = bcrypt.hashSync(req.body.password, 5); //Hash le password grace à la librairie bcrypt
        console.log(req.body); // Vérifiez ce qui est reçu dans la console
        const newUser = new User({
            ...req.body,
            password: hash,
            
        });
        await newUser.save();
        res.status(201).send("User has been successfully created!");

    } catch (err){
        next(err)
    }
}

export const login = async (req,res,next)=>{
    try {   
        //console.log(req.body); Vérifiez ce qui est reçu dans la console

        const user = await User.findOne({username: req.body.username});
        const err = new Error();
        err.status = 404;
        err.message = "User not found.";
        if(!user) return next(createError(404, "User not found!"));

        //compare les hash du password de la database et le password de la requete
        const isCorrect = bcrypt.compareSync(req.body.password, user.password);
        if(!isCorrect) return next(createError(400, "Wrong password or username"));

        //json Web token
        //L'id de l'user correspondant à celui de la database
        const token = jwt.sign(
        {
            id: user._id,
            isSeller: user.isSeller,
            //On doit avoir l'info isSeller car: par ex, on autorise pas les seller à ecrire des reviews par exemple,
            //Seulement les users normaux peuvent créer des orders et des reviews
        },
        process.env.JWT_KEY
        //JWT_KEY généréé en tapant dans le terminal:
        //date | Set-Content -Path temp.txt ; CertUtil -hashfile temp.txt MD5 ; Remove-Item temp.txt
        );

        //Si le mot de passe est correct
        //Séparer le password du reste des infos pour pas l'afficher, d'ou les ...
        //sur postman, le champs ._doc qui contient les données d'un user s'affiche, on le rajoute à (user)._doc
        const {password, ...info} = user._doc;
        res.cookie("accessToken", token, {
            httpOnly: true,
        }).status(200).send(info);

    } catch (err) {
        next(err);

    }
}

export const logout = async (req,res)=>{
    res.clearCookie('accessToken', {
        //sameSite none car le site et le serveur ne sont pas sur le même url
        sameSite: "none",
        secure: true,
    }).status(200).send("User has been logged out.");

    
};