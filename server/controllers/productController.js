const productModel = require("../models/productModel")
const uploadToCloudinary = require("../utilities/imageUpload")


const create = async (req, res) => {
    try {

        const { title, description, category, price } = req.body        

        if (!title || !description || !category  || !price) {
            return res.status(400).json("Some fields are missing")
        }
        if (!req.file) {
            return res.status(400).json({ error: 'image not found' })
        }
        const cloudinaryRes = await uploadToCloudinary(req.file.path)
        const newProduct = new productModel({ title, description, category, image:cloudinaryRes, price })
        const saved = await newProduct.save()

        res.status(201).json({ message: "Product added successfully", saved })

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "internal server error" })
    }

}

const listProducts = async (req,res)=>{
    try {
        const products = await productModel.find()
        res.status(200).json(products)
        
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "internal server error" })
    }
}

const productDetails = async (req,res)=>{
    try {
        const {productId} = req.params
        
        const item = await productModel.findById(productId)
        if(!item){
            return res.status(400).json("No product")
        }
        res.status(200).json(item)
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "internal server error" })
    }

}

const updateProduct = async (req,res)=>{
    try {
        const {productId} = req.params
        const {title,description,category,price} = req.body
        let imageUrl;

        const productExist = await productModel.findById(productId)
        if(!productExist){
            return res.status(400).json("product does not exist")
        }
        if (req.file) {
            const cloudinaryRes = await uploadToCloudinary(req.file.path)
            imageUrl = cloudinaryRes
        }
        const updateProduct = await productModel.findByIdAndUpdate(productId,{title,description,category,image: imageUrl,price},{new:true})
        res.status(200).json({message:"Product updated",updateProduct})
        
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "internal server error" })
    }

}

const deleteProduct = async (req,res)=>{
    try {
        const {productId}= req.params
        const deleteProduct = await productModel.findByIdAndDelete(productId)
        if(!deleteProduct){
            return res.status(400).json("No product found")
        }
        res.status(200).json("Product deleted")
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "internal server error" })
    }
}

module.exports = {
    create,
    listProducts,
    productDetails,
    updateProduct,
    deleteProduct
    
}