"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var postgres_1 = require("postgres");
// import postgres = require('postgres')
var sql = (0, postgres_1.default)({ /* options */}); // will use psql environment variables
exports.default = sql;
