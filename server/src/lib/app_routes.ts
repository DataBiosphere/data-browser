import { Application, Response as Res } from "express";
import { Req } from "../boardwalk";


export default (app: Application) => {

    //
    // Logout
    //
    app.get("/logout", (req: Req, res: Res) => {
        req.logout();
        res.redirect("/");
    });

    //
    // Home
    //
    app.get("/app", (req: Req, res: Res) => {
        res.render("app", { layout: "index" });
    });
};
