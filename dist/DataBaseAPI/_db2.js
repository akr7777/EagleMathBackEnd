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
let pg = require("pg");
let connectionString = "pg://postgres:postgres@localhost:5432/students";
let client = new pg.Client(connectionString);
client.connect();
module.exports = {
    query1: (text) => __awaiter(void 0, void 0, void 0, function* () {
        //const client = await new Client(config);
        console.log('Trying to connect...', client);
        yield client.connect();
        console.log('connected');
        const res = yield client.query(text);
        console.log('res', res);
    })
};
