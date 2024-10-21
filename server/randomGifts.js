// randomGifts.js

//
const users = Array.from({ length: 500 }, (_, i) => ({
  userId: `user${i + 1}`,
  username: `user${i + 1}`,
  profilePictureUrl: "https://randomuser.me/api/portraits/men/50.jpg",
}));

const gifts = [
  {
    giftName: "Rose",
    giftPictureUrl:
      "https://p19-webcast.tiktokcdn.com/img/maliva/webcast-va/eba3a9bb85c33e017f3648eaf88d7189~tplv-obj.png",
    diamondCount: 1,
  },
  {
    giftName: "Pumpkin",
    giftPictureUrl:
      "https://p19-webcast.tiktokcdn.com/img/maliva/webcast-va/123456789abcdef~tplv-obj.png",
    diamondCount: 5,
  },
  {
    giftName: "Diamond",
    giftPictureUrl:
      "https://p19-webcast.tiktokcdn.com/img/maliva/webcast-va/diamond_image~tplv-obj.png",
    diamondCount: 10,
  },
];

export const generateRandomGift = () => {
  const randomUser = users[Math.floor(Math.random() * users.length)];
  const randomGift = gifts[Math.floor(Math.random() * gifts.length)];
  const randomGiftCount = Math.floor(Math.random() * 5) + 1;

  return {
    userId: randomUser.userId,
    username: randomUser.username,
    giftName: randomGift.giftName,
    giftCount: randomGiftCount,
    profilePictureUrl: randomUser.profilePictureUrl,
    giftPictureUrl: randomGift.giftPictureUrl,
    diamondCount: randomGift.diamondCount * randomGiftCount,
  };
};
