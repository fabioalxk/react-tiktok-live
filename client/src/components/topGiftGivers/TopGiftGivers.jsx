import React from "react";

function TopGiftGivers({ topGiversByCategory }) {
  return (
    <div className="top-gift-givers">
      <h3>Top Presentes por Categoria</h3>
      {Object.entries(topGiversByCategory).map(([giftName, givers]) => (
        <div key={giftName} className="gift-category">
          <h4>{giftName}</h4>
          <table>
            <thead>
              <tr>
                <th>Usuário</th>
                <th>Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(givers).map((giver, index) => (
                <tr key={index}>
                  <td>{giver.username}</td>
                  <td>{giver.giftCount || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default TopGiftGivers;
