
import Cart from '../models/cart.model.js'

export const getCart = async (req, res) => {
  const cart = await Cart.findById(req.params.cid)
    .populate('products.product')
    .lean()
  res.json(cart)
}

export const deleteProductFromCart = async (req, res) => {
  const { cid, pid } = req.params
  await Cart.findByIdAndUpdate(cid, {
    $pull: { products: { product: pid } }
  })
  res.json({ status: "success" })
}

export const updateCart = async (req, res) => {
  const { cid } = req.params
  await Cart.findByIdAndUpdate(cid, { products: req.body })
  res.json({ status: "success" })
}

export const updateProductQuantity = async (req, res) => {
  const { cid, pid } = req.params
  const { quantity } = req.body

  await Cart.updateOne(
    { _id: cid, "products.product": pid },
    { $set: { "products.$.quantity": quantity } }
  )

  res.json({ status: "success" })
}

export const clearCart = async (req, res) => {
  await Cart.findByIdAndUpdate(req.params.cid, { products: [] })
  res.json({ status: "success" })
}
