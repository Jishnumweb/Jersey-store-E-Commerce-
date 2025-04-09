const { create, listProducts, productDetails, updateProduct, deleteProduct } = require('../controllers/productController')
const authUser = require('../middleware/authMiddleware')
const upload = require('../middleware/multer')

const productRouter = require('express').Router()

productRouter.post("/create",upload.single("image"),create)
productRouter.get("/list-products",authUser,listProducts)
productRouter.get("/product-details/:productId",productDetails)
productRouter.put("/update-product/:productId",upload.single("image"),updateProduct)
productRouter.delete("/delete-product/:productId",deleteProduct)

module.exports = productRouter
