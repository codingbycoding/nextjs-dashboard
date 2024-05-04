"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_1 = require("bcrypt");
var db_js_1 = require("./db.js");
var placeholder_data_mobile_js_1 = require("../src/app/lib/placeholder-data.mobile.js");
function seedUsers() {
    return __awaiter(this, void 0, void 0, function () {
        var createTable, alterTable, insertedUsers, error_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, (0, db_js_1.default)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      CREATE TABLE IF NOT EXISTS users (\n        id SERIAL PRIMARY KEY,\n        name VARCHAR(255) NOT NULL,\n        mobile NUMERIC(11) NOT NULL UNIQUE,\n        password TEXT NOT NULL,\n        create_time TIMESTAMP NOT NULL,\n        delete_time TIMESTAMP,\n        modify_time TIMESTAMP\n      )\n    "], ["\n      CREATE TABLE IF NOT EXISTS users (\n        id SERIAL PRIMARY KEY,\n        name VARCHAR(255) NOT NULL,\n        mobile NUMERIC(11) NOT NULL UNIQUE,\n        password TEXT NOT NULL,\n        create_time TIMESTAMP NOT NULL,\n        delete_time TIMESTAMP,\n        modify_time TIMESTAMP\n      )\n    "])))];
                case 1:
                    createTable = _a.sent();
                    console.log('Created "users" table');
                    return [4 /*yield*/, (0, db_js_1.default)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["ALTER SEQUENCE users_id_seq RESTART WITH 10000"], ["ALTER SEQUENCE users_id_seq RESTART WITH 10000"
                            // Insert data into the "users" table
                        ])))];
                case 2:
                    alterTable = _a.sent();
                    return [4 /*yield*/, Promise.all(placeholder_data_mobile_js_1.users.map(function (user) { return __awaiter(_this, void 0, void 0, function () {
                            var hashedPassword;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, bcrypt_1.default.hash(user.password, 10)];
                                    case 1:
                                        hashedPassword = _a.sent();
                                        return [2 /*return*/, (0, db_js_1.default)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n        INSERT INTO users (name, mobile, password, create_time)\n        VALUES (", ", ", ", ", ", now())\n      "], ["\n        INSERT INTO users (name, mobile, password, create_time)\n        VALUES (", ", ", ", ", ", now())\n      "])), user.name, user.mobile, hashedPassword)];
                                }
                            });
                        }); }))];
                case 3:
                    insertedUsers = _a.sent();
                    console.log("Seeded ".concat(insertedUsers.length, " users"));
                    return [2 /*return*/, {
                            createTable: createTable,
                            alterTable: alterTable,
                            users: insertedUsers,
                        }];
                case 4:
                    error_1 = _a.sent();
                    console.error('Error seeding users:', error_1);
                    throw error_1;
                case 5: return [2 /*return*/];
            }
        });
    });
}
function seedFormats() {
    return __awaiter(this, void 0, void 0, function () {
        var createTable, insertedFormats, alterTable, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, (0, db_js_1.default)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    CREATE TABLE IF NOT EXISTS formats (\n    id BIGSERIAL PRIMARY KEY,\n    user_id INT NOT NULL,\n    name VARCHAR(255) NOT NULL,\n    create_time TIMESTAMP NOT NULL,\n    delete_time TIMESTAMP\n  )\n"], ["\n    CREATE TABLE IF NOT EXISTS formats (\n    id BIGSERIAL PRIMARY KEY,\n    user_id INT NOT NULL,\n    name VARCHAR(255) NOT NULL,\n    create_time TIMESTAMP NOT NULL,\n    delete_time TIMESTAMP\n  )\n"])))];
                case 1:
                    createTable = _a.sent();
                    console.log('Created "formats" table');
                    return [4 /*yield*/, Promise.all(placeholder_data_mobile_js_1.formats.map(function (format) { return (0, db_js_1.default)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n        INSERT INTO formats (user_id, name, create_time)\n        VALUES (", ", ", ", ", ")\n      "], ["\n        INSERT INTO formats (user_id, name, create_time)\n        VALUES (", ", ", ", ", ")\n      "])), format.userID, format.name, format.createTime); }))];
                case 2:
                    insertedFormats = _a.sent();
                    console.log("Seeded ".concat(insertedFormats.length, " formats"));
                    return [4 /*yield*/, (0, db_js_1.default)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["ALTER SEQUENCE formats_id_seq RESTART WITH 10000"], ["ALTER SEQUENCE formats_id_seq RESTART WITH 10000"])))];
                case 3:
                    alterTable = _a.sent();
                    return [2 /*return*/, {
                            createTable: createTable,
                            alterTable: alterTable,
                            formats: insertedFormats,
                        }];
                case 4:
                    error_2 = _a.sent();
                    console.error('Error seeding formats:', error_2);
                    throw error_2;
                case 5: return [2 /*return*/];
            }
        });
    });
}
function seedOrders() {
    return __awaiter(this, void 0, void 0, function () {
        var createTable, alterTable, insertedOrders, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, (0, db_js_1.default)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n    CREATE TABLE IF NOT EXISTS orders (\n    id BIGSERIAL PRIMARY KEY,\n    user_id INT NOT NULL,\n    format_id BIGINT NOT NULL,\n\n    note VARCHAR(255) NOT NULL,\n    width NUMERIC(5, 1) NOT NULL,\n    height NUMERIC(5, 1) NOT NULL,\n    shang_xia_gui NUMERIC(5,1) NOT NULL,\n    shang_xia_fang NUMERIC(5,1) NOT NULL,\n    guang_qi NUMERIC(5,1) NOT NULL,\n    gou_qi NUMERIC(5,1) NOT NULL,\n    bian_feng NUMERIC(5,1) NOT NULL,\n    glass_width NUMERIC(5,1) NOT NULL,\n    glass_height NUMERIC(5,1) NOT NULL,\n\n    create_time TIMESTAMP NOT NULL,\n    delete_time TIMESTAMP,\n  )\n"], ["\n    CREATE TABLE IF NOT EXISTS orders (\n    id BIGSERIAL PRIMARY KEY,\n    user_id INT NOT NULL,\n    format_id BIGINT NOT NULL,\n\n    note VARCHAR(255) NOT NULL,\n    width NUMERIC(5, 1) NOT NULL,\n    height NUMERIC(5, 1) NOT NULL,\n    shang_xia_gui NUMERIC(5,1) NOT NULL,\n    shang_xia_fang NUMERIC(5,1) NOT NULL,\n    guang_qi NUMERIC(5,1) NOT NULL,\n    gou_qi NUMERIC(5,1) NOT NULL,\n    bian_feng NUMERIC(5,1) NOT NULL,\n    glass_width NUMERIC(5,1) NOT NULL,\n    glass_height NUMERIC(5,1) NOT NULL,\n\n    create_time TIMESTAMP NOT NULL,\n    delete_time TIMESTAMP,\n  )\n"])))];
                case 1:
                    createTable = _a.sent();
                    console.log('Created "orders" table');
                    return [4 /*yield*/, (0, db_js_1.default)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["ALTER SEQUENCE orders_id_seq RESTART WITH 10000"], ["ALTER SEQUENCE orders_id_seq RESTART WITH 10000"
                            // Insert data into the "orders" table
                        ])))];
                case 2:
                    alterTable = _a.sent();
                    return [4 /*yield*/, Promise.all(placeholder_data_mobile_js_1.orders.map(function (order) { return (0, db_js_1.default)(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n        INSERT INTO orders (user_id, format_id, note, width, height, shang_xia_gui, shang_xia_fang, guang_qi, gou_qi, bian_feng, glass_width, glass_height, create_time)\n        VALUES (", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ")\n      "], ["\n        INSERT INTO orders (user_id, format_id, note, width, height, shang_xia_gui, shang_xia_fang, guang_qi, gou_qi, bian_feng, glass_width, glass_height, create_time)\n        VALUES (", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ")\n      "])), order.userID, order.formatID, order.note, order.width, order.height, order.shangXiaGui, order.shangXiaFang, order.guangQi, order.gouQi, order.bianFeng, order.glassWidth, order.glassHeight, order.createTime); }))];
                case 3:
                    insertedOrders = _a.sent();
                    console.log("Seeded ".concat(insertedOrders.length, " orders"));
                    return [2 /*return*/, {
                            createTable: createTable,
                            alterTable: alterTable,
                            orders: insertedOrders,
                        }];
                case 4:
                    error_3 = _a.sent();
                    console.error('Error seeding orders:', error_3);
                    throw error_3;
                case 5: return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, seedUsers()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, seedFormats()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, seedOrders()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main().catch(function (err) {
    console.error('An error occurred while attempting to seed the database:', err);
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
