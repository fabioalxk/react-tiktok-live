import React, { useState, useEffect } from "react";
import "./TopGiftGivers.scss";

function TopGiftGivers({ gifts }) {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    const donorMap = {};

    gifts?.forEach((gift) => {
      const { username, profilePictureUrl, diamondCount } = gift;

      if (!donorMap[username]) {
        donorMap[username] = {
          username,
          profilePictureUrl: profilePictureUrl || "default-profile.png",
          diamondCount: diamondCount,
        };
      } else {
        donorMap[username].diamondCount += diamondCount;
      }
    });

    const sortedDonors = Object.values(donorMap).sort(
      (a, b) => b.diamondCount - a.diamondCount
    );

    setDonors(sortedDonors.slice(0, 10));
  }, [gifts]);

  return (
    <div>
      <h3>Top Doadores</h3>
      <table>
        <thead>
          <tr>
            <th>Usuário</th>
            <th>Total de Diamantes</th>
          </tr>
        </thead>
        <tbody>
          {donors.map((donor, index) => (
            <tr
              key={index}
              className={
                index === 0
                  ? "first-place"
                  : index === 1
                  ? "second-place"
                  : index === 2
                  ? "third-place"
                  : ""
              }
            >
              <td>
                <div className="donor-info">
                  <img
                    src={donor?.profilePictureUrl}
                    alt="profile"
                    className="profile-picture"
                  />
                  <span>{donor?.username}</span>
                </div>
              </td>
              <td>{donor?.diamondCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TopGiftGivers;
