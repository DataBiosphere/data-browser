"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Local workspace environment config
 */
exports.default = {
    env: "local",
    https: false,
    hostURL: "localhost:3000",
    email: {
        admins: [
            "mim@clevercanary.com",
            "dave@clevercanary.com",
            "chris@clevercanary.com"
        ],
        noReply: "",
        noReplyName: ""
    },
    mongo: {
        uri: "mongodb://localhost/bw-local"
    }
};
