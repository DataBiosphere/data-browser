import { Application, Response as Res } from "express";
import * as path from "path";
import { Req } from "../boardwalk";
import { config } from "./config/config";


export default (app: Application) => {


    //
    // Home
    //
    app.get("/", (req: Req, res: Res) => {
        console.log("stuff");
        res.sendFile(path.join(config.root, "views/home.html"));
    });

    //
    // Files
    //
    app.get("/files", (req: Req, res: Res) => {
        res.sendFile(path.join(config.root, "dist/index.html"));
    });



};
