const initialState = {
  queue: [
    {
      name: "Song 1",
      url: "https://res.cloudinary.com/dz5nspe7f/video/upload/v1632147267/music-uploads/bensound-creativeminds_vjqm2b.mp3",
      duration: 140,
      genreId: "6149ae63d6569644c8daed1c",
      userId: "6149ae63d6569644c8daed14",
      albums: ["6149ae63d6569644c8daed28"],
      likedBy: [],
    },
    {
      name: "Song 2",
      url: "https://res.cloudinary.com/dz5nspe7f/video/upload/v1632147266/music-uploads/bensound-happyrock_bg3hh6.mp3",
      duration: 180,
      genreId: "6149ae63d6569644c8daed1c",
      userId: "6149ae63d6569644c8daed14",
      albums: ["6149ae63d6569644c8daed28"],
      likedBy: ["6149ae63d6569644c8daed14"],
    },
  ],
};

export default initialState;
