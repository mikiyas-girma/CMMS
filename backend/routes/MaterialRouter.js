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
  withdrawAndUpdateQuantities,
  GetReportOfHowManyMaterialsAdded,
  GetReportOfHowManyMaterialsRemoved,
  GetReportOfMaterialSale,
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
MaterialRouter.route("/getsalereport").get(
  restrictTo("employee", "storeOwner"),
  GetReportOfMaterialSale
);

MaterialRouter.route("/addedmaterialreport").post(
  restrictTo("employee", "storeOwner"),
  GetReportOfHowManyMaterialsAdded
);
MaterialRouter.route("/removedmaterialreport").post(
  restrictTo("employee", "storeOwner"),
  GetReportOfHowManyMaterialsRemoved
);
MaterialRouter.use(restrictTo("employee"));

MaterialRouter.route("/addmaterial").post(insertAndUpdateQuantities);
MaterialRouter.route("/withdrawmaterial").post(withdrawAndUpdateQuantities);

MaterialRouter.route("/material/:id")
  .patch(
    restrictTo("employee", "storeOwner"),
    uploadMaterialPhoto,
    resizeMaterialPhoto,
    updateMaterial
  )
  .delete(deleteMaterial)
  .get(getMaterialById);

export default MaterialRouter;
