"use strict";
/**
 * Config
 */
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var path = require("path");
var all_1 = require("./env/all");
var root = path.normalize(__dirname + "../../../../../");
var ENV = process.env["NODE_ENV"] || "local";
var environmentConfig = all_1.default[ENV];
var shared = {
    root: root,
    port: process.env["PORT"] || 3000,
    mongo: {
        options: {
            db: {
                safe: true,
                w: 1,
                j: true
            }
        }
    }
};
exports.config = _.merge(shared, environmentConfig || {});
