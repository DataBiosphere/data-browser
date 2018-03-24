"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Production Environment
 */
exports.default = {
    env: "production",
    https: true,
    hostURL: "",
    email: {
        admins: ["mim@clevercanary.com", "dave@clevercanary.com", "chris@clevercanary.com"],
        noReply: "",
        noReplyName: ""
    },
    mongo: {
        uri: "mongodb://" + process.env["MONGO_USERNAME"] + ":" + process.env["MONGO_PW"] + "@candidate.44.mongolayer.com:10949,candidate.62.mongolayer.com:11037/ucsc-bw-dev?replicaSet=set-580930228536f8e7890003ce"
    }
};
