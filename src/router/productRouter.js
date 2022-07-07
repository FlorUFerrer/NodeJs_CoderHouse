import { Router } from 'express';
import { productNotFound, productWasDeleted } from "../consts/index.js";
import {Container} from '../api/Container.js'


const productRouter = Router()
const productApi =  new Container()


/******************************/
productRouter.get('/' , (req, res)=>{

    const response = productApi.getAll();

    if (!response) res.send({ error: productNotFound });
  
    res.render("productos", { productos: response });
})
/******************************/

productRouter.post('/' , (req, res)=>{

    const {title,price,photo } = req.body;

    productApi.save({title,price,photo})
    
    res.redirect('/productos');
})
/******************************/




export {productRouter}