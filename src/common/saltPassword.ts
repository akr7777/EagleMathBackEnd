/*const INDEXES = [1, 3, 4];
const SALT = ["ncsD*", '894FY', '!hR8']
export const saltPassword = (pass: string): string => {
    const passSALT = pass.slice(0, INDEXES[0]) + SALT[0] + pass.slice(INDEXES[0], INDEXES[1]) + SALT[1] +
        pass.slice(INDEXES[1], INDEXES[2]) + SALT[2] + pass.slice(INDEXES[2], pass.length);
    return pass;
}*/

export const hashedStr = (pass: string): string => {
    // get crypto module
    const crypto = require("crypto");

    // secret or salt to be hashed with
    const secret = "Th!snv*23";

    // create a md5 hasher
    const md5Hasher = crypto.createHmac("md5", secret);

    // hash the string and set the output format
    const hash = md5Hasher.update(pass).digest("hex");
    return hash
}