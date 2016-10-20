/**
 * Stage environment config
 */
export default {
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
