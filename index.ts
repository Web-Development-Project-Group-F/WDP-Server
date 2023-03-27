import express, {Express, Request, Response} from 'express'
import cors from 'cors'
import { Pool, QueryResult } from 'pg'
import fileUpload from 'express-fileupload'



const app: Express = express()
app.use(cors())
app.use(express.static('../Images'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(fileUpload())

const port = 3001

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
app.get('/', (req: Request, res: Response) => {
    const pool = openDb()
    //res.status(200).json({message: 'Hello World!'})
    pool.query('select * from posts',(error, result) =>{
        if(error){
            res.status(500).json({error: error.message})
        }
        res.status(200).json(result.rows)
    })
})

//for uploading the image
app.post("/upload", (req: Request, res: Response) => {
    if(!req.files){
        res.statusMessage = "No file uploaded"
        res.sendStatus(400)
        return
    }

    const title = req.body.title
    //const file = req.files.file as fileUpload.UploadedFile
    const file = req.files.image as fileUpload.UploadedFile
    const name = file.name
    file.mv(`../Images/post/${name}`, (error) => {
        if(error){
            res.statusMessage = "Error while saving file"
            res.sendStatus(500)
            return
        }
    })
    const pool = openDb()
    //res.status(200).json({message: 'Hello World!'})
    pool.query('insert into posts (title, name)values($1,$2) returning *',[title, name],(error : Error, result : QueryResult) =>{
        if(error){
            res.status(500).json({error: error.message})
            return
        }
        res.status(200).json({id: result.rows[0].id, title: title, name: name})
        
    })
/*     res.statusMessage = "File uploaded successfully"
    res.sendStatus(200)   */
   
})
//to open the connection of the database
const openDb = ():Pool => {
    const pool = new Pool({
        user: 'postgres',
        host:'localhost',
        database: 'mycircledemo',
        password: '12345',
        port: 5432
    })
    return pool
}
app.listen(port)