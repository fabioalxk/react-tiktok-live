import React, { useState, useEffect } from "react";

function GiftNotification({ gifts }) {
  const [giftList, setGiftList] = useState([]);

  useEffect(() => {
    if (gifts.length > 0) {
      setGiftList((prevGifts) => [gifts[gifts.length - 1], ...prevGifts]);
    }
  }, [gifts]);

  return (
    <div className="gift-notification">
      {giftList.slice(0, 10).map((gift, index) => (
        <div key={index} className="gift-item">
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
