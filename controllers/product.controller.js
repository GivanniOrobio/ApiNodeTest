import Products from "../models/product.model.js"
import { uploadImage, deleteImage } from "../utils/cludinary.js"
import fs from "fs-extra"

//crear producto
export const postProducts = async (req, res) => { 
  
  try{
    
    const { name , description, price } = req.body
    
    const product = new Products({
    name, 
    description, 
    price      
    })    
    
    if(req.files?.image){      
      const result = await uploadImage(req.files.image.tempFilePath)
      product.image ={
        public_id: result.public_id,
        secure_url: result.secure_url
      }
      await fs.unlink(req.files.image.tempFilePath)
    }
    await product.save()
    
    res.json(product)  
    
  }catch(error){
    
    return res.status(500).json({message: error.message})
    
  }
  
}

//obtener todos los productos
export const getProducts = async (req, res) => { 
  
  try{  
  
    const products = await Products.find()
    res.json(products) 
  
  }catch(error){
  
    return res.status(500).json({message: error.message})
  
  }
}

//obtener producto por id
export const getProductsId = async (req, res) => { 
  
  try{
    
    const { id } = req.params
    const product = await Products.findById(id)        
       
    if(!product) return res.status(404).json({message: "Producto no encontrado"})
        
    res.json(product)
    
  }catch(error){
    
    return res.status(500).json({message: error.message})
    
  }
  
}

//actualizar producto
export const updateProducts = async (req, res) => { 

  try{
    
      const { id } = req.params
      const { name, description, price } = req.body
      const product = await Products.findByIdAndUpdate(id, { name, description, price }, { new: true })   
      res.json(product)  
    
  }catch(error){
    
    return res.status(500).json({message: error.message})
    
  }
  
}

//borrar producto
export const deleteProducts = async (req, res) => { 
  
  try{    
    const { id } = req.params
    const product = await Products.findByIdAndDelete(id)
  
    if(!product) return res.status(404).json({message: "Producto no encontrado"})

    if(product.image?.public_id){
        await deleteImage(product.image.public_id)
    }  
    
    res.json("producto eliminado correctamente", result)
    
  }catch(error){
    
    return res.status(500).json({message: error.message})
    
  }

}
