import React, { useEffect, useState } from "react";
import Inventory from "./pages/Inventory";
import { StyledHome } from "./StyledHome";
import { Database } from "@sqlitecloud/drivers";
import { useParams } from "react-router-dom";

function Home() {  
  const { userId } = useParams();
  const [skins, setSkins] = useState([]);
  const [visibleCount, setVisibleCount] = useState(25);
  const db = new Database(import.meta.env.VITE_DB_TOKEN);
  const [username, setUsername] = useState('name');
  const [sortCriteria, setSortCriteria] = useState("skin_name"); // Critère de tri par défaut
  const [sortOrder, setSortOrder] = useState("asc"); // Ordre de tri par défaut (ascendant)

  const fetchUserSkins = async () => {
    try {
        const response = await db.sql`
            SELECT s.skin_id, s.skin_name, s.champion_name, s.title, s.cost, s.rarity, 
                   s.positions, s.roles, s.faction, s.blueEssence, s.release_date, 
                   s.loadScreenSplashPath, s.fullSplashPath, us.quantity
            FROM SKINS s
            JOIN UserSkins us ON s.skin_id = us.skin_id
            WHERE us.userId = ${userId}
        `;
        console.log("response = ", response);

        const nameResponse = await db.sql`
          SELECT name
          FROM Users u
          WHERE u.userId = ${userId}
        `;
        console.log(nameResponse);

        setUsername(nameResponse[0]?.name)
        setSkins(response);
        
        
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
