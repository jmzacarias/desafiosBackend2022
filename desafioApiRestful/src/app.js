import express from 'express';
import Contenedor from './contenedores/contenedor.js'
import __dirname from './utils.js';
import bp from 'body-parser';



const objectService = new Contenedor;
const app = express();
const PORT = 8080;
const server = app.listen(PORT,()=>{
    console.log('Listening on PORT '+PORT )
})

// app.use(express.json());
app.use(bp.json());
// app.use(express.urlencoded({extended: true}));

app.use(bp.urlencoded({ extended: true }))

app.get('/api/productos',async(req,res)=>{
    let objects = await objectService.getAll()
    console.log(objects);
    res.send(objects)
}) 

app.get('/api/productos/:id',async(req,res)=>{
    let id = req.params.id
    console.log(id);
    if(isNaN(id)) return res.status(400).send({error:"Debe ingresar un número"});
    let object = await objectService.getById(parseInt(id)); 
    console.log(object)
    if(!object) {
        return res.status(404).send("Ningún producto tiene ese ID")
    }else{
        return res.send(object)
    } 
}) 

app.post('/api/productos', async(req,res)=>{
    console.log(`Req.body: ${req.body}`);
    let clientProduct = req.body;
    
    if(isNaN(clientProduct.precio)) return res.status(400).send({error: 'El precio debe ser un valor numérico'});
    if(!clientProduct.producto || !clientProduct.precio || !clientProduct.thumbnail) return res.status(400).send({error: 'Complete todos los campos'});
   
    let newObject = await objectService.save(clientProduct);
    res.send({status: 'succes', message: `producto ${clientProduct.producto} añadido`})
});

// app.put('/api/productos/:id'), async(req,res)=>{
//     let id = req.params.id;
//     if(isNaN(id)) return res.status(400).send({error:"Debe ingresar un número"});
//     let object = await objectService.getByID(id);
//     if(object) {

//     }
// }