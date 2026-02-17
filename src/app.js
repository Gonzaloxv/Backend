
<<<<<<< HEAD
import express from 'express'
import mongoose from 'mongoose'
import { engine } from 'express-handlebars'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './src/views')

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/', viewsRouter)

app.listen(8080, () => console.log('Server running on port 8080'))
=======
import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import viewsRouter from "./routes/views.router.js";
import { products, addProduct, deleteProduct } from "./products.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src/public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "src/views");

app.use("/", viewsRouter);

const httpServer = app.listen(PORT, () => {
  console.log(`Servidor escuchando en ${PORT}`);
});

const io = new Server(httpServer);

io.on("connection", socket => {
  socket.emit("updateProducts", products);

  socket.on("addProduct", product => {
    const newProduct = { id: products.length + 1, ...product };
    addProduct(newProduct);
    io.emit("updateProducts", products);
  });

  socket.on("deleteProduct", id => {
    deleteProduct(Number(id));
    io.emit("updateProducts", products);
  });
});
>>>>>>> a8a46ca6cd209526d9d5dd8758d36ffcd32597a8
