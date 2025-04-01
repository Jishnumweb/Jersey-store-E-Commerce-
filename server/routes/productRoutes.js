const { create, listProducts, productDetails, updateProduct, deleteProduct } = require('../controllers/productController')

const productRouter = require('express').Router()

productRouter.post("/create",create)
productRouter.get("/list-products",listProducts)
productRouter.post("/productDetails/:productId",productDetails)
productRouter.put("/updateProduct/:productId",updateProduct)
productRouter.delete("/deleteProduct/:productId",deleteProduct)

module.exports = productRouter
