/**
 * Config
 */

import * as _ from "lodash";
import * as path from "path";
import all from "./env/all";

export interface Config {
    env: string;
    https: boolean;
    hostURL: string;
    email: {
        admins: string[];
        noReply: string;
        noReplyName: string;
    };
    root: string;
    port: number;
    mongo: {
        uri: string;
        options: {
            db: any;
            mongos?: any
        },
    };
    googleAnalytics?: any;
    aws: {
        accessKey: string;
        secretAccessKey: string;
        bucket: string;
    };
}


const root = path.normalize(__dirname + "../../../../../");
const ENV = process.env["NODE_ENV"] || "local";
const environmentConfig = all[ENV];

const shared = {
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

export const config = _.merge(shared, environmentConfig || {}) as Config;
