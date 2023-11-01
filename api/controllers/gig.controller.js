import Gig from "../models/gig.model.js";
import createError from "../utils/createError.js";

export const createGig = async (req,res,next) => {
    if(!req.isSeller) return next(createError(403,"Only sellers can create a gig."));
    const newGig = new Gig({
        userId: req.userId,
        ...req.body,
    });
    try {
        const savedGig = await newGig.save();
        res.status(201).json(savedGig);
        
    } catch (err) {
        next(err);
    }

};
export const deleteGig = async (req,res,next) => {
    try {
        //req.params = VIENT DE L'URL
        const gig = await Gig.findById(req.params.id);
        //Par exemple: pour l'url /api/gigs/:id, alors req.params.id contiendra la valeur de "id"
        //"gig" recupere les attributs du gig identifié dans l'url
        if(gig.userId !== req.userId) return next(createError(403,"You can only delete your own gigs"));
        //gig.userId: on recupere l'id de l'user de l'objet gig
        //req.userId: l'id de l'user qui a effectué la requête, provenant de verifyToken (cookie) voir gig.route.js


        await Gig.findByIdAndDelete(req.params.id);
        res.status(200).send("Gig has been successfully deleted");
    } catch (err) {
        new(err);
    }
};
export const getGig = async (req,res,next) => {
    try {
        const gig = await Gig.findById(req.params.id);
        if(!gig) return next(createError(404,"Gig not found"));
        res.status(200).send(gig);
    } catch (err) {
        next(err);
        
    }
};
export const getGigs = async (req,res,next) => {
    //MongoDB Filter (req.query)
    const q = req.query;

    //filtre pour obtenir les gigs en fct de leur catégorie
    //ex: URL: gigs?cat=design
    const filters = {
        ...(q.userId && {userId: q.userId}),
        ...(q.cat && {cat: q.cat}),
        //verifie si il y a la condition "prix minimum" OU "prix maximum" (q.min || q.max)
        //Si c'est le cas, aller apres le '&&', et en fct, le price est soit gt (greater than) q.min ou lt: q.max (less than)
        ...((q.min || q.max) && { price: {...(q.min && {$gt: q.min}), ...(q.max && {$lt: q.max}) }
        }),
        //$options: "i" pour pas que ça soit case sensitive
        ...(q.search && {title: {$regex: q.search, $options: "i"}})

    };
    try{
        //Montre les derniers items: createdAt: -1 ou price: -1 (ordre decroissant).
        //q.sort recupere dans l'url le parametre sort
        const gigs = await Gig.find(filters).sort({ [q.sort]: -1 });
        res.status(200).send(gigs);

    }catch(err){
        next(err);
    }
};