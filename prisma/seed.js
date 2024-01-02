"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const seedDogs_1 = require("./seedDogs");
(0, seedDogs_1.seedDogs)()
    .then(() => {
    console.log("seeded 🌱");
})
    .catch((e) => {
    console.error("error seeding 🌱");
    console.error(e);
});
