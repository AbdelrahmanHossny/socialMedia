"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareHash = exports.genrateHash = void 0;
const bcrypt_1 = require("bcrypt");
const genrateHash = async (plaintext, salt = Number(process.env.SALT)) => {
    return await (0, bcrypt_1.hash)(plaintext, salt);
};
exports.genrateHash = genrateHash;
const compareHash = async (plaintext, hash) => {
    return await (0, bcrypt_1.compare)(plaintext, hash);
};
exports.compareHash = compareHash;
