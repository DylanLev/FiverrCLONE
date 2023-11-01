import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router";

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();

  //on utilise uselocation pour recuperer les infos dans l'url: ex: pathname:"/gigs" search: "?cat=design"
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('cat');

//isLoading: indicateur booléen qui indique si la requête est en cours de traitement
//data: l'objet qui contient les données renvoyées par la requête.
//refetch: fonction qui permet de déclencher manuellement une nouvelle exécution de la requête
  const { isLoading, error, data, refetch } = useQuery({ //useQuery: effectuer des requêtes à un serveur
    queryKey: ['gigs'], //'gigs': clé de la requête pour identifier la requête & la mémoriser dans le cache de React Query. 
    queryFn: () => //on utilise `` car on ecrit du Javascript dedans:
      newRequest.get(`/gigs${location.search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`).then(res=>{
        return res.data;
      }),
  })

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };
  
  //sur la page /gigs?cat=design par ex, à droite: Sort by: Newest/Best Selling
  useEffect(() => {
    refetch();
  }, [sort]);


  const apply = ()=>{
    //refetch(): fonction fournie par useQuery
    refetch();
  }

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">Liverr > Graphics & Design ></span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Liverr's AI artists
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                  )}
                  <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {isLoading 
          ? "loading" 
          : error 
          ? "Something went wrong." 
          : data.map((gig) => <GigCard key={gig._id} item={gig} /> )}
        </div>
      </div>
    </div>
  );
}

export default Gigs;
