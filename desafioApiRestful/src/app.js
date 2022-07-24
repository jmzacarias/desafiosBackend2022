import express from 'express';
import Contenedor from './contenedores/contenedor.js'
import __dirname from './utils.js';
import fs from 'fs';


const path = (__dirname+'/files/objetos.json')

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
    let id = req.params.id;
    console.log(id);
    if(isNaN(id)) return res.status(400).send({error:"Debe ingresar un número"});
    let object = await objectService.getById(parseInt(id));
    if(!object) {
        return res.status(404).send("Ningún producto tiene ese ID")
    }else{
        return res.send(object)
    } 
}) 

app.post('/api/productos', async(req,res)=>{
    let clientProduct = req.body;
    
    if(isNaN(clientProduct.precio)) return res.status(400).send({error: 'El precio debe ser un valor numérico'});
    if(!clientProduct.producto || !clientProduct.precio || !clientProduct.thumbnail) return res.status(400).send({error: 'Complete todos los campos'});
   
    await objectService.save(clientProduct);
    res.send({status: 'succes', message: `producto ${clientProduct.producto} añadido`})
});

app.put('/api/productos/:id'), async(req,res)=>{
    let id = parseInt(req.params.id) ;
    if(isNaN(id)) return res.status(400).send({status: 'error', error:`${id} no es un número`});
    let objectToReplace = await objectService.getByID(id);
    if(!objectToReplace) {return res.send({status: 'error', error: `No existe producto con el id ${id}`})};
    let objects = await objectService.getAll();
    let index = objects.indexOf(objectToReplace);
    console.log(index);
    let newProduct = req.body;
    if(isNaN(newProduct.precio)) return res.status(400).send({error: 'El precio debe ser un valor numérico'});
    if(!newProduct.producto || !newProduct.precio || !newProduct.thumbnail) return res.status(400).send({error: 'Complete todos los campos'});
    newProduct.id = id
    objects[index] = newProduct;
    await fs.promises.writeFile(path,JSON.stringify(objects,null,'\t'));
    res.send({status:'producto actualizado', productoAnterior: objectToReplace, nuevoProducto: newProduct });
}


app.delete('/api/productos/:id'), async(req,res)=>{
    let id = parseInt(req.params.id) ;
    if(isNaN(id)) return res.status(400).send({status: 'error', error:`${id} no es un número`});
    await objectService.deleteById(id);
    res.send({status: 'producto borrado'});
}