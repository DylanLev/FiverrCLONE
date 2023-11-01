import Order from "../models/order.model.js";
import Gig from "../models/gig.model.js";

export const createOrder = async (req, res, next)=>{
    try {
        const gig = await Gig.findById(req.params.gigId);
        //On recupere les infos grace au Gig Model

        const newOrder = new Order({
            gigId: gig._id,
            img: gig.cover,
            title: gig.title,
            buyerId: req.userId,
            sellerId: gig.userId,
            price: gig.price,
            payment_intent: "temporary",
        });
        
        await newOrder.save();
        res.status(200).send("Successful");
    } catch (err) {
        next(err);
    }
    
};

export const getOrders = async (req, res, next)=>{
    //Only fetch orders using userId
    try {
        const orders = await Order.find({
            //Si l'user de la requete est seller, alors le sellerID = userId, sinon le buyerID = userID
            ...(req.isSeller ? {sellerId : req.userId} : {buyerId : req.userId}),
            isCompleted: true, //Affiche que les orders "completed"
            //BOUTON VERT "CONTINUE" A DROITE (complété une fois que l'user a rentré ses infos bancaires etc...)
        });
        res.status(200).send(orders);
    } catch (err) {
        next(err);
    }
    
};