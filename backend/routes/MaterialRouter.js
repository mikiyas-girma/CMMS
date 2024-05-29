import express from "express";
import { protect, restrictTo } from "../Controller/authController.js";
import {
  getAllMaterials,
  createMaterial,
  uploadMaterialPhoto,
  resizeMaterialPhoto,
  checkMaterialExists,
  updateMaterial,
  deleteMaterial,
  getMaterialById,
  insertAndUpdateQuantities,
} from "../Controller/MaterialController.js";

const MaterialRouter = express.Router();

MaterialRouter.use(protect);

MaterialRouter.route("/")
  .get(restrictTo("employee", "storeOwner"), getAllMaterials)
  .post(
    restrictTo("employee"),
    uploadMaterialPhoto,
    checkMaterialExists,
    resizeMaterialPhoto,
    createMaterial
  );
MaterialRouter.use(restrictTo("employee"));

MaterialRouter.route("/addmaterial").post(insertAndUpdateQuantities);
MaterialRouter.route("/withdrawmaterial").post();

MaterialRouter.route("/material/:id")
  .patch(
    uploadMaterialPhoto,
    checkMaterialExists,
    resizeMaterialPhoto,
    updateMaterial
  )
  .delete(deleteMaterial)
  .get(getMaterialById);

export default MaterialRouter;
