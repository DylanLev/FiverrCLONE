import React from "react";
import { Link } from "react-router-dom";
import "./Orders.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const { isLoading, error, data } = useQuery({ //useQuery: effectuer des requêtes à un serveur
    queryKey: ['orders'], //'orders': clé de la requête pour identifier la requête & la mémoriser dans le cache de React Query. 
    queryFn: () => //on utilise `` car on ecrit du Javascript dedans:
      newRequest
      .get(
        `/orders`
        )
        .then((res)=>{
        return res.data;
      }),
  });

  return (
    <div className="orders">
      {isLoading ? (
        "Loading" 
        ) : error ? (
          "Something went wrong" 
        ) : (
        <div className="container">
        <div className="title">
          <h1>Orders</h1>
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Contact</th>
          </tr>
          {
            data.map((order) => (
            <tr key={order._id}>
            <td>
              <img
                className="image"
                src={order.img}
                alt=""
              />
            </td>
            <td>{order.title}</td>
            <td>{order.price}</td>
            <td>
              <img className="message" src="./img/message.png" alt="" />
            </td>
          </tr>))}
          
        </table>
      </div>)}
    </div>
  );
};

export default Orders;
