import { Application, Response as Res } from "express";
import * as path from "path";
import { Req } from "../boardwalk";
import { config } from "./config/config";


export default (app: Application) => {


    app.get("/health", (req, res) => {
        res.sendStatus(200);
    });

    app.get("/version", (req, res) => {
        res.send({
            version: process.env.VERSION,
            service: process.env.BW_DATA_URL
        });
    });

    //
    // Home
    //
    app.get("/", (req: Req, res: Res) => {
        res.sendFile(path.join(config.root, "dist/index.html"));
    });


};
