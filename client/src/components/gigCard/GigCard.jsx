import React from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
//CETTE PAGE EST AFFICHEE POUR PAR EX: http://localhost:5173/gigs?cat=design
const GigCard = ({ item }) => {
  const { isLoading, error, data} = useQuery({
    queryKey: ["gigUser"],
    //à la place de gigUser il faudrait donner: ${item.userId}

    queryFn: () => //on utilise `` car on ecrit du Javascript dedans
      newRequest.get(
        `/users/${item.userId}`
        )
        .then(res=>{
        return res.data;
      }),
  })
  return (
    <Link to={`/gig/${item._id}`} className="link">
      <div className="gigCard">
        <img src={item.cover} alt="" />
        <div className="info">
          {isLoading ? (
            "loading" 
          ): error ? (
            "Something went wrong" 
          ) : (
        <div className="user">
            <img src={data.img || "/img/noavatar.jpg"} alt="" />
            <span>{data.username}</span>
          </div>
          )}
          <p>{item.desc}</p>
          <div className="star">
            <img src="./img/star.png" alt="" />
            <span>
              {!isNaN(item.totalStars / item.starNumber) && 
                Math.round(item.totalStars / item.starNumber)}
            </span>
          </div>
        </div>
        <hr />
        <div className="detail">
          <img src="./img/heart.png" alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>
              $ {item.price}
              
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
