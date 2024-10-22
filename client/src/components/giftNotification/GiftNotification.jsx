import React, { useState, useEffect } from "react";
import "./GiftNotification.scss";

function GiftNotification({ gifts }) {
  const [giftList, setGiftList] = useState([]);

  useEffect(() => {
    const now = Date.now();

    const newGifts = gifts.map((gift) => ({
      ...gift,
      receivedAt: now,
    }));

    setGiftList((prevGifts) => {
      const updatedGiftList = [...prevGifts];

      newGifts.forEach((newGift) => {
        const isDuplicate = updatedGiftList.some(
          (gift) =>
            gift.userId === newGift.userId && gift.giftName === newGift.giftName
        );

        if (!isDuplicate) {
          updatedGiftList.push(newGift);
        }
      });

      return updatedGiftList;
    });
  }, [gifts]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setGiftList((prevGiftList) =>
        prevGiftList.map((gift) => {
          if (now - gift.receivedAt > 30000) {
            return { ...gift, expired: true };
          }
          return gift;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="gift-notification">
      {giftList
        .slice()
        .reverse()
        .slice(0, 10)
        .map((gift, index) => (
          <div
            key={index}
            className={`gift-item ${gift.expired ? "expired" : ""}`}
          >
            <img src={gift.profilePictureUrl} alt="profile" />
            <span>
              {gift.username} enviou {gift.giftCount}x {gift.giftName}!
            </span>
            <img
              className="gift-icon"
              src={gift.giftPictureUrl}
              alt={gift.giftName}
            />
          </div>
        ))}
    </div>
  );
}

export default GiftNotification;
