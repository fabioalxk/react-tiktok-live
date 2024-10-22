import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./Gifts.scss";
import GiftNotification from "../../components/giftNotification/GiftNotification";
import TopGiftGivers from "../../components/topGiftGivers/TopGiftGivers";

function Gifts() {
  const [gifts, setGifts] = useState([]);
  const [topGiversByCategory, setTopGiversByCategory] = useState({});

  useEffect(() => {
    const newSocket = io("http://localhost:3000", {
      transports: ["websocket"],
    });

    newSocket.on("gift", (data) => {
      setGifts((prevGifts) => [...prevGifts, data]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <div className="gifts-container">
      <div className="gifts-notifications">
        <h2>Notifications of Gifts</h2>
        <GiftNotification gifts={gifts} />
      </div>
      <div className="top-gift-givers">
        <TopGiftGivers gifts={gifts} />
      </div>
    </div>
  );
}

export default Gifts;
