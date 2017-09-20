import { Application, Response as Res } from "express";
import * as path from "path";
import { Req } from "../boardwalk";
import { config } from "./config/config";


export default (app: Application) => {


    //
    // Home
    //
    app.get("/", (req: Req, res: Res) => {
        res.sendFile(path.join(config.root, "dist/index.html"));
    });

    //
    // Files
    //
    app.get("/boardwalk", (req: Req, res: Res) => {
        res.sendFile(path.join(config.root, "dist/index.html"));
    });
};
