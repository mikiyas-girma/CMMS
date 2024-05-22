import express from "express";
import { protect, restrictTo } from "../Controller/authController.js";
import {
  getAllMaterials,
  createMaterial,
  uploadMaterialPhoto,
  resizeMaterialPhoto,
  checkMaterialExists,
  // updateMaterial,
  // deleteMaterial,
  // getMaterialById,
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
// MaterialRouter.use(restrictTo("employee"));
// MaterialRouter.route("/material/:id")
//   .patch(updateMaterial)
//   .delete(deleteMaterial)
//   .get(getMaterialById);

export default MaterialRouter;
