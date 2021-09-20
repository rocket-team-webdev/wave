function getSeedUsers() {
  return [
    {
      firstName: "Mathias",
      lastName: "Fortuna",
      username: "MathiasFortuna",
      email: "mathias@teamrocket.es",
      firebaseId: "idFirebase",
      birthDate: "1993-12-18",
      country: "Argentina",
    },
    {
      firstName: "Nacho",
      lastName: "Montoya",
      username: "nachomon",
      email: "nacho@teamrocket.es",
      firebaseId: "idFirebase",
      birthDate: "1993-12-18",
      country: "Spain",
    },
    {
      firstName: "Ricard",
      lastName: "Garcia",
      username: "derivation",
      email: "rick@teamrocket.es",
      firebaseId: "idFirebase",
      birthDate: "1993-12-18",
      country: "Catalonia",
    },
  ];
}

module.exports = { getSeedUsers };
