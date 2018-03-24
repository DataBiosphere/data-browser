"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Environment configs
 */
var local_1 = require("./local");
var stage_1 = require("./stage");
var production_1 = require("./production");
var test_1 = require("./test");
exports.default = {
    "production": production_1.default,
    "stage": stage_1.default,
    "local": local_1.default,
    "test": test_1.default
};
