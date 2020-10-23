import * as express from "express";
import * as path from "path";
import * as cookieParser from "cookie-parser";
import * as logger from "morgan";

const app: express.Application = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(__dirname + "/../node_modules/@bitlink/frontend/build"));

app.get(["/api/analytics"], (req, res, next) => {
    res.json({
        logrocket: {
            appID: process.env.LOGROCKET,
        },
    });
});

app.all(["/", "/join", "/join/*", "/create"], (req, res, next) => {
    res.sendFile(path.resolve(__dirname + "/../node_modules/@bitlink/frontend/build/index.html"));
});

export default app;
