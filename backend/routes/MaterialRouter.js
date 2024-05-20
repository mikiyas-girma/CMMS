import express from "express";
import { protect, restrictTo } from "../Controller/authController";
import {
  getAllMaterials,
  createMaterial,
  updateMaterial,
  deleteMaterial,
  getMaterialById,
} from "../Controller/MaterialController.js";

const MaterialRouter = express.Router();

MaterialRouter.use(protect);

MaterialRouter.route("/material")
  .get(restrictTo("employee", "storeOwner"), getAllMaterials)
  .post(restrictTo("employee"), createMaterial);
MaterialRouter.use(restrictTo("employee"));
MaterialRouter.route("/material/:id")
  .patch(updateMaterial)
  .delete(deleteMaterial)
  .get(getMaterialById);

export default MaterialRouter;
