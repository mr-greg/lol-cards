import React from 'react';
import Card from "../components/inventory/Card";
import styled from "styled-components";

const InventoryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

function Inventory({ skins }) {
  // Vérification si skins est bien défini et est un tableau
  console.log("skins = ", skins);
  
  if (!Array.isArray(skins)) {
    return <p>Chargement des skins...</p>; // Message de chargement ou placeholder
  }

  return (
    <InventoryWrapper>
      {skins.map((skin) => (
        <Card key={skin.skin_id} data={skin} />
      ))}
    </InventoryWrapper>
  );
}

export default Inventory;
