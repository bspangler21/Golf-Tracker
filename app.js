import express from "express";
import Lowdb from "lowdb";
import lodashId from "lodash-id";
import FileSync from "lowdb/adapters/FileSync";
import golfers from "./src/routes/golfers.ts";

const adapter = new FileSync("db.json");
const db = Lowdb(adapter);
db._.mixin(lodashId);
db.defaults({golfers: []});

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

let golfersRouter = golfers;
app.use(golfersRouter);