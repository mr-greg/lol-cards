/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Inventory from "./pages/Inventory";
import { StyledHome } from "./StyledHome";
import { useParams } from "react-router-dom";
import { createClient } from "@libsql/client";

function Home() {

  const turso = createClient({
    url: import.meta.env.VITE_TURSO_DB_URL,
    authToken: import.meta.env.VITE_TURSO_AUTH_TOKEN
  })

  const { userId } = useParams();
  const [skins, setSkins] = useState([]);
  const [visibleCount, setVisibleCount] = useState(25);
  const [username, setUsername] = useState('name');
  const [sortCriteria, setSortCriteria] = useState("skin_name"); // Critère de tri par défaut
  const [sortOrder, setSortOrder] = useState("asc"); // Ordre de tri par défaut (ascendant)

  const fetchUserSkins = async () => {
    try {
      const response = await turso.execute({
        sql: `
          SELECT SKINS.skin_id, SKINS.skin_name, SKINS.champion_name, SKINS.title, SKINS.cost, SKINS.rarity, SKINS.positions, SKINS.roles, SKINS.faction, SKINS.blueEssence, SKINS.release_date, SKINS.loadScreenSplashPath, SKINS.fullSplashPath, UserSkins.quantity 
          FROM SKINS 
          JOIN UserSkins ON SKINS.skin_id = UserSkins.skin_id 
          WHERE UserSkins.user_id = ?
        `,
        args: [userId]
      });
      
        const nameResponse = await turso.execute({
          sql: "SELECT name FROM Users WHERE userId = ?",
          args: [userId]

        })

        setUsername(nameResponse.rows[0].name)     
        setSkins(response.rows);
        
        
    } catch (error) {
        console.error("Erreur lors de la récupération des skins :", error);
    }
  };

  // Fonction pour trier les skins en fonction du critère sélectionné et de l'ordre
  const sortSkins = (skinsList, criteria, order) => {
    return skinsList.sort((a, b) => {
      const valA = a[criteria];
      const valB = b[criteria];

      if (typeof valA === "string") {
        return order === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
      } else if (typeof valA === "number") {
        return order === "asc" ? valA - valB : valB - valA;
      } else if (criteria === "release_date") {
        return order === "asc" ? new Date(valA) - new Date(valB) : new Date(valB) - new Date(valA);
      }
      return 0;
    });
  };

  useEffect(() => {
    fetchUserSkins();
  }, [userId]);

  useEffect(() => {
    // Tri les skins chaque fois que le critère de tri ou l'ordre changent
    setSkins((prevSkins) => sortSkins([...prevSkins], sortCriteria, sortOrder));
  }, [sortCriteria, sortOrder]);

  const loadMoreCards = () => {
    setVisibleCount(prevCount => prevCount + 25);
  };

  return (
    <StyledHome>
      <h1>Hi, {username}</h1>
      <p className="intro">Here are all the cards you collected so far</p>

      {/* Menu de tri */}
      <div className="sorting">
        <div className="criteria">
          <label>Sort by:</label>
          <select onChange={(e) => setSortCriteria(e.target.value)} value={sortCriteria}>
            <option value="skin_name">Skin Name</option>
            <option value="champion_name">Champion Name</option>
            <option value="cost">Cost</option>
            <option value="rarity">Rarity</option>
            <option value="positions">Positions</option>
            <option value="faction">Faction</option>
            <option value="blueEssence">Blue Essence</option>
            <option value="release_date">Release Date</option>
            <option value="quantity">Quantity</option>
          </select>
        </div>
        <div className="order">
          <label className="order">Order:</label>
          <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <Inventory skins={skins.slice(0, visibleCount)} />
      {visibleCount < skins.length && (
        <div className="btn-container">
          <button className="loadmore" onClick={loadMoreCards}>Load more</button>
        </div>
      )}
    </StyledHome>
  );
}

export default Home;
