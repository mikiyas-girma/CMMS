import express from "express";
import { protect } from "../Controller/authController";
import {
  getAllMaterials,
  createMaterial,
  updateMaterial,
  deleteMaterial,
  getMaterialById,
} from "../Controller/materialController.js";

const MaterialRouter = express.Router();

MaterialRouter.use(protect);

MaterialRouter.route("/material").get(getAllMaterials).post(createMaterial);

MaterialRouter.route("/material/:id")
  .patch(updateMaterial)
  .delete(deleteMaterial)
  .get(getMaterialById);

export default MaterialRouter;
