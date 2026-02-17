
<<<<<<< HEAD
import { Router } from 'express'
import Product from '../models/product.model.js'
import Cart from '../models/cart.model.js'

const router = Router()

router.get('/products', async (req, res) => {
  const { page = 1 } = req.query

  const result = await Product.paginate({}, {
    page: parseInt(page),
    limit: 10,
    lean: true
  })

  res.render('index', {
    products: result.docs,
    hasPrevPage: result.hasPrevPage,
    hasNextPage: result.hasNextPage,
    prevPage: result.prevPage,
    nextPage: result.nextPage
  })
})

router.get('/products/:pid', async (req, res) => {
  const product = await Product.findById(req.params.pid).lean()
  res.render('productDetail', { product })
})

router.get('/carts/:cid', async (req, res) => {
  const cart = await Cart.findById(req.params.cid)
    .populate('products.product')
    .lean()
  res.render('cart', { cart })
})

export default router
=======
import { Router } from "express";
import { products } from "../products.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("home", { products });
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", { products });
});

export default router;
>>>>>>> a8a46ca6cd209526d9d5dd8758d36ffcd32597a8
