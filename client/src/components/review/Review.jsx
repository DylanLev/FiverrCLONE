import React from 'react'
import "./Review.scss"
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest.js';

const Review = ({review}) => {
  const { isLoading, error, data} = useQuery({ //useQuery: effectuer des requêtes à un serveur
    queryKey: [review.userId], //DOIT ETRE UNIQUE clé de la requête pour identifier la requête & la mémoriser dans le cache de React Query. 
    queryFn: () => 
      newRequest.get(`/users/${review.userId}`).then((res)=>{
        return res.data;
      }),
  });
  return (
    <div className="review">
    {isLoading 
    ? (
      "Loading" 
      ) : error ? (
     "Something went wrong" 
    ) : (
    <div className="user">
      <img
        className="pp"
        src = {data.img || "/img/noavatar.jpg"} 
        alt=""
      />
      <div className="info">
        <span>{data.username}</span>
        <div className="country">
          <span>{data.country}</span>
        </div>
      </div>
    </div>)}
    <div className="stars">
      {Array(review.star).fill().map((item,i) => (
        <img src="/img/star.png" alt="" key={i}/>
      ))}
      
      
      <span>{review.star}</span>
    </div>
    <p>
      {review.desc}
    </p>
    <div className="helpful">
      <span>Helpful?</span>
      <img src="/img/like.png" alt="" />
      <span>Yes</span>
      <img src="/img/dislike.png" alt="" />
      <span>No</span>
    </div>
  </div>
  )
}

export default Review;