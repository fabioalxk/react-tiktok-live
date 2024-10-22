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

const giftsMockInput = [
  {
    userId: "7415486066536334341",
    username: "im.luca.p",
    giftName: "Pumpkin",
    giftCount: 1,
    profilePictureUrl:
      "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/610f159ece8c42c2cb08e7e6e56f7e1d~c5_100x100.webp?lk3s=a5d48078&nonce=57238&refresh_token=fcf98c3b4648474874d8c12d6532f70a&x-expires=1729713600&x-signature=CdbSKo5Jo1XG47uRlJzy6niI8VY%3D&shp=a5d48078&shcp=fdd36af4",
    giftPictureUrl:
      "https://p19-webcast.tiktokcdn.com/img/maliva/webcast-va/resource/c9734b74f0e4e79bdfa2ef07c393d8ee.png~tplv-obj.png",
    diamondCount: 1,
  },
  {
    userId: "7415486066536334341",
    username: "im.luca.p",
    giftName: "Pumpkin",
    giftCount: 1,
    profilePictureUrl:
      "https://p77-sign-va.tiktokcdn.com/tos-maliva-avt-0068/610f159ece8c42c2cb08e7e6e56f7e1d~c5_100x100.webp?lk3s=a5d48078&nonce=31904&refresh_token=4f62fb6620eeba9908045342b2df2c2b&x-expires=1729713600&x-signature=2eBtNTYe%2B%2BvcDlK%2BNLD6cQ06Xyk%3D&shp=a5d48078&shcp=fdd36af4",
    giftPictureUrl:
      "https://p19-webcast.tiktokcdn.com/img/maliva/webcast-va/resource/c9734b74f0e4e79bdfa2ef07c393d8ee.png~tplv-obj.png",
    diamondCount: 1,
  },
  {
    userId: "7358530747261879302",
    username: "vitorlo42",
    giftName: "Rose",
    giftCount: 1,
    profilePictureUrl:
      "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/51ae949b855bd8390f72ef7b838c66b6~c5_100x100.webp?lk3s=a5d48078&nonce=54582&refresh_token=8d25706b84f2af5eb2097299d02e7f4f&x-expires=1729713600&x-signature=vAR4YPZg5ZGu7vLvQYKddRNNApw%3D&shp=a5d48078&shcp=fdd36af4",
    giftPictureUrl:
      "https://p19-webcast.tiktokcdn.com/img/maliva/webcast-va/eba3a9bb85c33e017f3648eaf88d7189~tplv-obj.png",
    diamondCount: 1,
  },
  {
    userId: "7358530747261879302",
    username: "vitorlo42",
    giftName: "Rose",
    giftCount: 1,
    profilePictureUrl:
      "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/51ae949b855bd8390f72ef7b838c66b6~c5_100x100.webp?lk3s=a5d48078&nonce=4884&refresh_token=636b807b25d3ac600ec2088eba9e9964&x-expires=1729713600&x-signature=vAR4YPZg5ZGu7vLvQYKddRNNApw%3D&shp=a5d48078&shcp=fdd36af4",
    giftPictureUrl:
      "https://p19-webcast.tiktokcdn.com/img/maliva/webcast-va/eba3a9bb85c33e017f3648eaf88d7189~tplv-obj.png",
    diamondCount: 1,
  },
  {
    userId: "7174032912320840710",
    username: "manuela573890",
    giftName: "Pumpkin",
    giftCount: 1,
    profilePictureUrl:
      "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/0a28b474b66339ebf2c2821a80881ee3~c5_100x100.webp?lk3s=a5d48078&nonce=66386&refresh_token=da8d478b22259c95b79df04a2dc072ee&x-expires=1729713600&x-signature=0RkagwMmSeDi2VaLeNZOq%2BzALJ8%3D&shp=a5d48078&shcp=fdd36af4",
    giftPictureUrl:
      "https://p19-webcast.tiktokcdn.com/img/maliva/webcast-va/resource/c9734b74f0e4e79bdfa2ef07c393d8ee.png~tplv-obj.png",
    diamondCount: 1,
  },
  {
    userId: "7174032912320840710",
    username: "manuela573890",
    giftName: "Pumpkin",
    giftCount: 1,
    profilePictureUrl:
      "https://p77-sign-va.tiktokcdn.com/tos-maliva-avt-0068/0a28b474b66339ebf2c2821a80881ee3~c5_100x100.webp?lk3s=a5d48078&nonce=58733&refresh_token=a7d8ae7f497c5646c648b8da91552beb&x-expires=1729713600&x-signature=75DwUUQip6nNpOhtqZg7oEvCw%2Bk%3D&shp=a5d48078&shcp=fdd36af4",
    giftPictureUrl:
      "https://p19-webcast.tiktokcdn.com/img/maliva/webcast-va/resource/c9734b74f0e4e79bdfa2ef07c393d8ee.png~tplv-obj.png",
    diamondCount: 1,
  },
  {
    userId: "7174032912320840710",
    username: "manuela573890",
    giftName: "Ice Cream Cone",
    giftCount: 1,
    profilePictureUrl:
      "https://p77-sign-va.tiktokcdn.com/tos-maliva-avt-0068/0a28b474b66339ebf2c2821a80881ee3~c5_100x100.webp?lk3s=a5d48078&nonce=53483&refresh_token=9c524f35ac1db240c221bec141ff02aa&x-expires=1729713600&x-signature=75DwUUQip6nNpOhtqZg7oEvCw%2Bk%3D&shp=a5d48078&shcp=fdd36af4",
    giftPictureUrl:
      "https://p19-webcast.tiktokcdn.com/img/maliva/webcast-va/968820bc85e274713c795a6aef3f7c67~tplv-obj.png",
    diamondCount: 1,
  },
  {
    userId: "7174032912320840710",
    username: "manuela573890",
    giftName: "Ice Cream Cone",
    giftCount: 1,
    profilePictureUrl:
      "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/0a28b474b66339ebf2c2821a80881ee3~c5_100x100.webp?lk3s=a5d48078&nonce=16933&refresh_token=7a42cdd525ca7b7a28895446e8a809b5&x-expires=1729713600&x-signature=0RkagwMmSeDi2VaLeNZOq%2BzALJ8%3D&shp=a5d48078&shcp=fdd36af4",
    giftPictureUrl:
      "https://p19-webcast.tiktokcdn.com/img/maliva/webcast-va/968820bc85e274713c795a6aef3f7c67~tplv-obj.png",
    diamondCount: 1,
  },
  {
    userId: "7174032912320840710",
    username: "manuela573890",
    giftName: "Rose",
    giftCount: 1,
    profilePictureUrl:
      "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/0a28b474b66339ebf2c2821a80881ee3~c5_100x100.webp?lk3s=a5d48078&nonce=71058&refresh_token=4d00c67f83faed1d908aa534b646c549&x-expires=1729713600&x-signature=0RkagwMmSeDi2VaLeNZOq%2BzALJ8%3D&shp=a5d48078&shcp=fdd36af4",
    giftPictureUrl:
      "https://p19-webcast.tiktokcdn.com/img/maliva/webcast-va/eba3a9bb85c33e017f3648eaf88d7189~tplv-obj.png",
    diamondCount: 1,
  },
  {
    userId: "7174032912320840710",
    username: "manuela573890",
    giftName: "Rose",
    giftCount: 1,
    profilePictureUrl:
      "https://p77-sign-va.tiktokcdn.com/tos-maliva-avt-0068/0a28b474b66339ebf2c2821a80881ee3~c5_100x100.webp?lk3s=a5d48078&nonce=51164&refresh_token=22ef9d35d68bfc9130b8eb4cee172e68&x-expires=1729713600&x-signature=75DwUUQip6nNpOhtqZg7oEvCw%2Bk%3D&shp=a5d48078&shcp=fdd36af4",
    giftPictureUrl:
      "https://p19-webcast.tiktokcdn.com/img/maliva/webcast-va/eba3a9bb85c33e017f3648eaf88d7189~tplv-obj.png",
    diamondCount: 1,
  },
  {
    userId: "6939232530131338246",
    username: "mariwx0p",
    giftName: "Rose",
    giftCount: 1,
    profilePictureUrl:
      "https://p77-sign-va.tiktokcdn.com/tos-maliva-avt-0068/9dbedbc0092a230f524798bf312a650b~c5_100x100.webp?lk3s=a5d48078&nonce=84786&refresh_token=f9d19ad4003d4e692ee3fc278d17809f&x-expires=1729713600&x-signature=ag7ExlS%2Feh5XvZT4Zh3Eq91B0l8%3D&shp=a5d48078&shcp=fdd36af4",
    giftPictureUrl:
      "https://p19-webcast.tiktokcdn.com/img/maliva/webcast-va/eba3a9bb85c33e017f3648eaf88d7189~tplv-obj.png",
    diamondCount: 1,
  },
  {
    userId: "6939232530131338246",
    username: "mariwx0p",
    giftName: "Rose",
    giftCount: 1,
    profilePictureUrl:
      "https://p77-sign-va.tiktokcdn.com/tos-maliva-avt-0068/9dbedbc0092a230f524798bf312a650b~c5_100x100.webp?lk3s=a5d48078&nonce=15824&refresh_token=475d162be38019e03e695b74c9311472&x-expires=1729713600&x-signature=ag7ExlS%2Feh5XvZT4Zh3Eq91B0l8%3D&shp=a5d48078&shcp=fdd36af4",
    giftPictureUrl:
      "https://p19-webcast.tiktokcdn.com/img/maliva/webcast-va/eba3a9bb85c33e017f3648eaf88d7189~tplv-obj.png",
    diamondCount: 1,
  },
  {
    giftId: 9139,
    repeatCount: 1,
    groupId: "1729543468354",
    userId: "7153767816674444293",
    secUid:
      "MS4wLjABAAAANkgUZ6DVVMNJeLFJwO81c7_IWZr5PZSXjWtACTybychU_-jcaxK1TG09zspjpiFl",
    uniqueId: "fandaluluhfc",
    nickname: "L u h !",
    profilePictureUrl:
      "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/b9c3c34f5184b92d10bd47fa56033141~c5_100x100.webp?lk3s=a5d48078&nonce=65895&refresh_token=4c05e519792be95d60a2762a8022f0b8&x-expires=1729713600&x-signature=hP5q9ODOGXFdjeG5zOdRC%2BJEBW8%3D&shp=a5d48078&shcp=fdd36af4",
    followRole: 3,
    userBadges: [
      {
        type: "privilege",
        privilegeId: "7196929090442513157",
        level: 1,
        badgeSceneType: 10,
      },
      {
        type: "privilege",
        privilegeId: "7138381176787506980",
        level: 5,
        badgeSceneType: 8,
      },
      {
        type: "image",
        badgeSceneType: 6,
        displayType: 1,
        url: "https://p19-webcast.tiktokcdn.com/webcast-sg/new_top_gifter_version_2.png~tplv-obj.image",
      },
    ],
    userSceneTypes: [10, 8, 6, 6],
    userDetails: {
      createTime: "0",
      bioDescription: "",
      profilePictureUrls: [
        "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/b9c3c34f5184b92d10bd47fa56033141~c5_100x100.webp?lk3s=a5d48078&nonce=65895&refresh_token=4c05e519792be95d60a2762a8022f0b8&x-expires=1729713600&x-signature=hP5q9ODOGXFdjeG5zOdRC%2BJEBW8%3D&shp=a5d48078&shcp=fdd36af4",
        "https://p77-sign-va.tiktokcdn.com/tos-maliva-avt-0068/b9c3c34f5184b92d10bd47fa56033141~c5_100x100.webp?lk3s=a5d48078&nonce=21617&refresh_token=9bf8e82b26a123a2dc3fca196628b81a&x-expires=1729713600&x-signature=sl22sSvgGxQ9h2h%2Bz6fUFt7mvYI%3D&shp=a5d48078&shcp=fdd36af4",
        "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/b9c3c34f5184b92d10bd47fa56033141~c5_100x100.jpeg?lk3s=a5d48078&nonce=1411&refresh_token=d2435a4f18e156ffb321e03769d80731&x-expires=1729713600&x-signature=UIijMKOqujEoXS42zaDRftvx1SE%3D&shp=a5d48078&shcp=fdd36af4",
      ],
    },
    followInfo: {
      followingCount: 1728,
      followerCount: 754,
      followStatus: 3,
      pushStatus: 0,
    },
    isModerator: false,
    isNewGifter: false,
    isSubscriber: false,
    topGifterRank: null,
    gifterLevel: 5,
    teamMemberLevel: 1,
    msgId: "7428332405228505861",
    createTime: "1729543468596",
    displayType: "webcast_aweme_gift_send_message",
    label: "{0:user} sent {1:gift} {2:string}",
    repeatEnd: false,
    gift: {
      gift_id: 9139,
      repeat_count: 1,
      repeat_end: 0,
      gift_type: 1,
    },
    describe: "Sent Team Bracelet",
    giftType: 1,
    diamondCount: 2,
    giftName: "Team Bracelet",
    giftPictureUrl:
      "https://p19-webcast.tiktokcdn.com/img/maliva/webcast-va/resource/54cb1eeca369e5bea1b97707ca05d189.png~tplv-obj.png",
    timestamp: 1729543468598,
    receiverUserId: "6930244766361781254",
  },
];

export const generateRandomGift = () => {
  const randomUser = users[Math.floor(Math.random() * users.length)];
  const randomGift =
    giftsMockInput[Math.floor(Math.random() * giftsMockInput.length)];
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
