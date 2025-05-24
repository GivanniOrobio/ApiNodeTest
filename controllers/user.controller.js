import Users from "../models/user.model.js"
import { uploadImage, deleteImage } from "../utils/cludinary.js"
import fs from "fs-extra"

//crear producto
export const postUser = async (req, res) => { 
  
  try{
    
    const { name , direccion, phone, password, email  } = req.body
    
    const user = new Users({
    name, 
    direccion, 
    phone,
    password,
    email  
    })    
    
    if(req.files?.image){      
      const result = await uploadImage(req.files.image.tempFilePath)
      user.image ={
        public_id: result.public_id,
        secure_url: result.secure_url
      }
      await fs.unlink(req.files.image.tempFilePath)
    }
    await user.save()
    
    res.json(user)  
    
  }catch(error){
    
    return res.status(500).json({message: error.message})
    
  }
  
}

//obtener todos los productos
export const getUsers = async (req, res) => { 
  
  try{  
  
    const users = await Users.find()
    res.json(users) 
  
  }catch(error){
  
    return res.status(500).json({message: error.message})
  
  }
}

//obtener producto por id
export const getUserId = async (req, res) => { 
  
  try{
    
    const { id } = req.params
    const user = await Users.findById(id)        
       
    if(!user) return res.status(404).json({message: "usuario no encontrado"})
        
    res.json(user)
    
  }catch(error){
    
    return res.status(500).json({message: error.message})
    
  }
  
}

//actualizar producto
export const updateUser = async (req, res) => { 

  try{
    
      const { id } = req.params
      const { name , direccion, phone, password, email } = req.body
      const user= await Users.findByIdAndUpdate(id, { name , direccion, phone, password, email }, { new: true })   
      res.json(user)  
    
  }catch(error){
    
    return res.status(500).json({message: error.message})
    
  }
  
}

//borrar producto
export const deleteUser = async (req, res) => { 
  
  try{    
    const { id } = req.params
    const user = await Users.findByIdAndDelete(id)
  
    if(!user) return res.status(404).json({message: "usuario no encontrado"})

    if(user.image?.public_id){
      await deleteImage(user.image.public_id)
    }  
    
    res.json("producto eliminado correctamente")
    
  }catch(error){
    
    return res.status(500).json({message: error.message})
    
  }

}
