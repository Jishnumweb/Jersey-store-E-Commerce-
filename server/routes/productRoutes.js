const { create, listProducts, productDetails, updateProduct, deleteProduct, sellerProducts } = require('../controllers/productController')
const authMiddleware = require('../middleware/authMiddleware')
const upload = require('../middleware/multer')

const productRouter = require('express').Router()

productRouter.post("/create",upload.single("image"),authMiddleware,create)
productRouter.get("/list-products",authMiddleware,listProducts)
productRouter.get("/seller-products",authMiddleware,sellerProducts)
productRouter.get("/product-details/:productId",productDetails)
productRouter.put("/update-product/:productId",upload.single("image"),updateProduct)
productRouter.delete("/delete-product/:productId",deleteProduct)

module.exports = productRouter
