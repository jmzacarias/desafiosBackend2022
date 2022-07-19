import express from 'express';
import Contenedor from './contenedores/contenedor.js'

const objectService = new Contenedor;
const app = express();
const PORT = 8080;
const server = app.listen(PORT,()=>{
    console.log('Listening on PORT '+PORT )
})



app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/api/productos',async(req,res)=>{
    let objects = await objectService.getAll()
    res.send(objects)
}) 

app.get('/api/productos/:id',async(req,res)=>{
    let id = req.params.id
    console.log(id);
    if(isNaN(id)) return res.status(400).send({error:"Debe ingresar un número"});
    let object = await objectService.getByID(id); 
    if(object) {
        return res.status(404).send("Ningún producto tiene ese ID")
    }else{
        return res.send(object)
    } 
}) 