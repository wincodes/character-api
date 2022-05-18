import "reflect-metadata";
const { } = require("dotenv/config");
import { createConnection } from "typeorm";
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as cors from "cors";
import routes from "./routes"

createConnection().then(async () => {
    console.log("Postgress Db Connected")

    const app = express();
    app.use(cors());

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.options("*", cors());

    app.use('/api/v1/', routes);

    // start the server
    app.listen(5050, () => console.log(`server started at port 5050`));


}).catch(error => console.log(error));
