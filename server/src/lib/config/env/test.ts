/**
 * Test environment config
 */
export default {
    env: "test",
    https: false,
    hostURL: "localhost:3000",
    email: {
        admins: ["mim@clevercanary.com", "dave@clevercanary.com", "chris@clevercanary.com"],
        noReply: "",
        noReplyName: ""
    },
    mongo: {
        uri: "mongodb://localhost/bw-test"
    }
};
