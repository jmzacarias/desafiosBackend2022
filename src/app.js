import express from 'express';
import Contenedor from './contenedores/contenedor.js'


const app = express();
const PORT = 8080;
const server = app.listen(PORT,()=>{
    console.log('Listening on PORT '+PORT )
})

const objectService = new Contenedor;

app.get('/',(req,res)=>{
    
    res.send('Hola desde desafio 3')
}) 

app.get('/productos',async(req,res)=>{
    let objects = await objectService.getAll()
    res.send(objects)
}) 

app.get('/productosRandom',async(req,res)=>{
    let objects = await objectService.getAll()
    let randomIndex = Math.floor(Math.random()*objects.length);
    let randomProduct = objects[randomIndex]
    res.send(randomProduct)
}) 