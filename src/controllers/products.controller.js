
import Product from '../models/product.model.js'

export const getProducts = async (req, res) => {
  try {
    const { limit = 10, page = 1, query, sort } = req.query

    let filter = {}
    let sortOption = {}

    if (query) {
      if (query === "true" || query === "false") {
        filter.status = query === "true"
      } else {
        filter.category = query
      }
    }

    if (sort) sortOption.price = sort === "asc" ? 1 : -1

    const result = await Product.paginate(filter, {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sortOption,
      lean: true
    })

    res.json({
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? `?page=${result.prevPage}` : null,
      nextLink: result.hasNextPage ? `?page=${result.nextPage}` : null
    })
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message })
  }
}

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.pid).lean()
  res.json(product)
}
