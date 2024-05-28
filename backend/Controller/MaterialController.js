import asyncHandler from "express-async-handler";
import { AppError } from "../utils/AppError.js";
import Material from "../Models/MaterialModel.js";
import multer from "multer";
import sharp from "sharp";

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("not an image Please upload only image", 400), false);
  }
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

export const uploadMaterialPhoto = upload.single("image");

export const resizeMaterialPhoto = async (req, res, next) => {
  // console.log(req.file);
  if (!req.file) return next();
  req.file.filename = `material-${req.body.name}-${req.user.username}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(700, 900)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/materials/${req.file.filename}`);
  next();
};
export const checkMaterialExists = asyncHandler(async (req, res, next) => {
  const material = await Material.findOne({ name: req.body.name });
  // console.log("Material", req);

  if (material) {
    return next(new AppError("Material with this name already exists.", 400));
  }

  next();
});

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
  req.body.user = req.user._id;
  if (req.file) req.body.image = req.file.filename;
  const material = await Material.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      material,
    },
  });
});
export const updateMaterial = asyncHandler(async (req, res, next) => {
  if (req.file) req.body.image = req.file.filename;
  const material = await Material.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!material) {
    return next(new AppError("No material found with that ID", 404));
  }

  res.status(200).json({
    status: "updated successfully",
    data: {
      material,
    },
  });
});
