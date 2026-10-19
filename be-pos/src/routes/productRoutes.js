import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getOneProduct, updateProduct } from "../controllers/productController.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getOneProduct);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
