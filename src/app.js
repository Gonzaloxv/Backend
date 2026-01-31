
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
