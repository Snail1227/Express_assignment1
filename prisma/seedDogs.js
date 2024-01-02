"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDogs = void 0;
const clearDb_1 = require("./clearDb");
const prisma_instance_1 = require("./prisma-instance");
function seedDogs() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, clearDb_1.clearDb)();
        const doomslayer = yield prisma_instance_1.prisma.dog.create({
            data: {
                name: "Doomslayer",
                breed: "Cowboy Corgi",
                description: "Half Corgi, Half Blue Heeler, he's here, and he's ready to RUMBLE!!!",
                age: 2,
            },
        });
        const zoey = yield prisma_instance_1.prisma.dog.create({
            data: {
                name: "Zoey",
                breed: "Pit / Lab",
                description: "She can be a pain in the butt sometimes but AWWWWWW is she a lil' cutie",
                age: 3,
            },
        });
        const doogie = yield prisma_instance_1.prisma.dog.create({
            data: {
                name: "Doogie",
                breed: "Terrier",
                description: "Jon's first dog, she was such a little sweetheart",
                age: 4,
            },
        });
        const matty = yield prisma_instance_1.prisma.dog.create({
            data: {
                name: "Matty",
                breed: "Mastiff",
                description: "Grumpy, yet more precious than anything in the world",
                age: 5,
            },
        });
        return {
            dogsArray: [doomslayer, zoey, doogie, matty],
            dogs: {
                doomslayer,
                zoey,
                doogie,
                matty,
            },
        };
    });
}
exports.seedDogs = seedDogs;
