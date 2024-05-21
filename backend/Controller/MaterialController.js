import asyncHandler from "express-async-handler";
import { AppError } from "../utils/AppError.js";
import Material from "../Models/MaterialModel.js";

export const getAllMaterials = asyncHandler(async (req, res) => {
  const materials = await Material.find();
  res.status(200).json({
    status: "success",
    results: materials.length,
    data: {
      materials,
    },
  });
});

export const createMaterial = asyncHandler(async (req, res) => {
  //   errq.body.user = req.user._id;
  const material = await Material.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      material,
    },
  });
});
