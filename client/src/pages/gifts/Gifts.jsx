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
      // Atualiza a lista de notificações de presentes
      setGifts((prevGifts) => [...prevGifts, data]);

      // Atualiza o ranking de doadores por categoria de presente
      setTopGiversByCategory((prevTopGivers) => {
        const { userId, username, giftName, giftCount } = data;

        // Se a categoria de presente ainda não existe, cria uma nova
        if (!prevTopGivers[giftName]) {
          prevTopGivers[giftName] = {};
        }

        // Verifica se o usuário já doou esse presente
        const currentGiver = prevTopGivers[giftName][userId] || {
          username: username,
          giftCount: 0, // Inicializa o contador de presentes em 0
        };

        // Soma corretamente o número de presentes doados
        currentGiver.giftCount += giftCount;

        // Atualiza o ranking da categoria
        const updatedGivers = {
          ...prevTopGivers[giftName],
          [userId]: currentGiver, // Atualiza ou adiciona o usuário
        };

        // Retorna o estado atualizado com a lista de doadores agrupada
        return {
          ...prevTopGivers,
          [giftName]: updatedGivers, // Atualiza a categoria
        };
      });
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
        <h2>Top Gift Givers</h2>
        <TopGiftGivers topGiversByCategory={topGiversByCategory} />
      </div>
    </div>
  );
}

export default Gifts;
