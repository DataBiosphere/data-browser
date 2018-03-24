"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Stage environment config
 */
exports.default = {
    env: "stage",
    https: true,
    hostURL: "",
    email: {
        admins: ["mim@clevercanary.com", "dave@clevercanary.com", "chris@clevercanary.com"],
        noReply: "",
        noReplyName: ""
    },
    mongo: {
        uri: "",
    }
};
