"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const pg_1 = require("pg");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.static('../Images'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_fileupload_1.default)());
const port = 3001;
/* app.get('/', (req: Request, res: Response) => {
    const pool = openDb()
    //res.status(200).json({message: 'Hello World!'})
    pool.query('select * from users inner join posts on users.id = posts.user_id',(error, result) =>{
        if(error){
            res.status(500).json({error: error.message})
        }
        res.status(200).json(result.rows)
    })
}) */
//for fetching the data from the database
app.get('/', (req, res) => {
    const pool = openDb();
    //res.status(200).json({message: 'Hello World!'})
    pool.query('select * from posts', (error, result) => {
        if (error) {
            res.status(500).json({ error: error.message });
        }
        res.status(200).json(result.rows);
    });
});
//for uploading the image
app.post("/upload", (req, res) => {
    if (!req.files) {
        res.statusMessage = "No file uploaded";
        res.sendStatus(400);
        return;
    }
    const title = req.body.title;
    //const file = req.files.file as fileUpload.UploadedFile
    const file = req.files.image;
    const name = file.name;
    file.mv(`../Images/post/${name}`, (error) => {
        if (error) {
            res.statusMessage = "Error while saving file";
            res.sendStatus(500);
            return;
        }
    });
    const pool = openDb();
    //res.status(200).json({message: 'Hello World!'})
    pool.query('insert into posts (title, name)values($1,$2) returning *', [title, name], (error, result) => {
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.status(200).json({ id: result.rows[0].id, title: title, name: name });
    });
    /*     res.statusMessage = "File uploaded successfully"
        res.sendStatus(200)   */
});
//to open the connection of the database
const openDb = () => {
    const pool = new pg_1.Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'mycircledemo',
        password: '12345',
        port: 5432
    });
    return pool;
};
app.listen(port);
