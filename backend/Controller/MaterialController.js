import asyncHandler from "express-async-handler";
import { AppError } from "../utils/AppError.js";
import Material from "../Models/MaterialModel.js";
import multer from "multer";
import sharp from "sharp";
import QuantityChange from "../Models/QuantityChangesModel.js";
// import { createNotification } from "./NotificationController.js";
import { User } from "../Models/UserModel.js";
import Notification from "../Models/NotificationModel.js";
import { io, getUserSocketId } from "../server.js";
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  // console.log("File being uploaded:", file);

  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("not an image Please upload only image", 400), false);
  }
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

export const uploadMaterialPhoto = upload.single("image");

export const resizeMaterialPhoto = async (req, res, next) => {
  // console.log("req", req);
  if (!req.file) return next();
  req.file.filename = `material-${req.body.name}-${req.user.Fname}${req.user.Lname}-${Date.now()}.jpeg`;

  // req.file.filename = `material-${req.body.name}-${req.user.Fname + req.user.Lname}-${Date.now()}.jpeg`;
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
      // console.log(
      //   new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
      // );
      materials,
    },
  });
});

export const createMaterial = asyncHandler(async (req, res) => {
  console.log("file", req.file);
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
  // console.log("file", req.file);

  if (req.file) req.body.image = req.file.filename;
  const material = await Material.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!material) {
    return next(new AppError("No material found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      material,
    },
  });
});
export const deleteMaterial = asyncHandler(async (req, res, next) => {
  const material = await Material.findByIdAndDelete(req.params.id);

  if (!material) {
    return next(new AppError("No material found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
export const getMaterialById = asyncHandler(async (req, res, next) => {
  const material = await Material.findById(req.params.id);

  if (!material) {
    return next(new AppError("No material found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      material,
    },
  });
});

export const insertAndUpdateQuantities = asyncHandler(async (req, res) => {
  console.log(req.body);
  const changes = req.body;
  for (const change of changes) {
    change.user = req.user._id;

    change.changeType = "add";
  }

  const insertedChanges = await QuantityChange.insertMany(changes);

  const bulkOps = insertedChanges.map((change) => {
    const update = { $inc: { totalQuantity: change.quantity } };

    return {
      updateOne: {
        filter: { _id: change.material },
        update: update,
      },
    };
  });

  await Material.bulkWrite(bulkOps);

  res.status(200).json({
    status: "success",
    message: "Sample data inserted and total quantities updated successfully",
  });
});

export const withdrawAndUpdateQuantities = asyncHandler(
  async (req, res, next) => {
    console.log(req.body);
    const changes = req.body;

    // Update changes array with user and changeType
    changes.forEach((change) => {
      change.user = req.user._id;
      change.changeType = "withdraw";
    });

    // Validate each change
    for (const change of changes) {
      const material = await Material.findById(change.material);

      if (!material) {
        return next(
          new AppError(`Material with ID ${change.material} not found`, 404)
        );
      }

      if (material.totalQuantity < change.quantity) {
        return next(
          new AppError(
            `Cannot withdraw ${change.quantity} units from Material ${material.name}`,
            400
          )
        );
      }
    }

    // Insert quantity changes into database
    const insertedChanges = await QuantityChange.insertMany(changes);

    // Bulk update material quantities
    const bulkOps = insertedChanges.map((change) => ({
      updateOne: {
        filter: { _id: change.material },
        update: { $inc: { totalQuantity: -change.quantity } },
      },
    }));
    await Material.bulkWrite(bulkOps);

    // Notify users if material quantity falls below threshold
    for (const change of changes) {
      const material = await Material.findById(change.material);

      if (material.totalQuantity < material.minthreshold) {
        try {
          // Find users who should receive notifications
          const receiverIds = await User.find({
            $or: [{ role: "employee" }, { role: "storeOwner" }],
          }).select("_id");

          // Prepare notification data
          const notificationData = {
            receiverIds: receiverIds.map((user) => user._id),
            from: "System",
            text: `Material ${material.name} is below min threshold, please reorder`,
          };

          // Create notification
          // const notification = await createNotification(
          //   { body: notificationData },
          //   res,
          //   next
          // );
          const notification = await Notification.create(notificationData);
          // console.log("socket ");

          // Check if notification object is valid
          if (notification && notification.receiverIds) {
            // Emit notification to relevant sockets
            // console.log("socket 2");

            notification.receiverIds.forEach((receiverId) => {
              const socketId = getUserSocketId(receiverId.toString());
              // console.log("socketId", socketId);

              if (socketId) {
                io.to(socketId).emit("newNotification", {
                  notificationId: notification._id,
                  createdAt: notification.createdAt,
                  from: notification.from,
                  text: notification.text,
                });
                // console.log("socket notification sent successfully");
              }
            });
          }
        } catch (error) {
          console.error("Error sending notification:", error);
        }
      }
    }

    // Send success response
    res.status(200).json({
      status: "success",
      message: "Sample data removed and total quantities updated successfully",
    });
  }
);

export const GetReportOfHowManyMaterialsAdded = asyncHandler(
  async (req, res) => {
    const { start, upto } = req.body;
    const report = await QuantityChange.aggregate([
      {
        $match: {
          date: { $gte: new Date(start), $lte: new Date(upto) },
          changeType: "add",
        },
      },
      {
        $group: {
          _id: "$material",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "materials",
          localField: "_id",
          foreignField: "_id",
          as: "materialDetails",
        },
      },
      {
        $unwind: "$materialDetails",
      },
      {
        $project: {
          _id: 0,
          material: "$_id",
          totalQuantity: 1,
          name: "$materialDetails.name",
          image: "$materialDetails.image",
          category: "$materialDetails.category",
        },
      },
      {
        $sort: {
          totalQuantity: -1,
        },
      },
    ]);
    console.log("reports", report);
    res.status(200).json({
      status: "success",
      data: {
        report,
      },
    });
  }
);
export const GetReportOfHowManyMaterialsRemoved = asyncHandler(
  async (req, res) => {
    const { start, upto } = req.body;

    const report = await QuantityChange.aggregate([
      {
        $match: {
          date: { $gte: new Date(start), $lte: new Date(upto) },
          changeType: "withdraw",
        },
      },
      {
        $group: {
          _id: "$material",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "materials",
          localField: "_id",
          foreignField: "_id",
          as: "materialDetails",
        },
      },
      {
        $unwind: "$materialDetails",
      },
      {
        $project: {
          _id: 0,
          material: "$_id",
          totalQuantity: 1,
          name: "$materialDetails.name",
          image: "$materialDetails.image",
          category: "$materialDetails.category",
        },
      },
      {
        $sort: {
          totalQuantity: -1,
        },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: {
        report,
      },
    });
  }
);

export const GetReportOfMaterialSale = asyncHandler(async (req, res) => {
  const startDate = new Date("2024-01-01"); // Adjust this to the earliest date in your dataset
  const currentDate = new Date();
  const monthNames = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const report = await QuantityChange.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate, $lte: currentDate },
        changeType: "withdraw",
      },
    },
    {
      $lookup: {
        from: "materials",
        localField: "material",
        foreignField: "_id",
        as: "materialDetails",
      },
    },
    {
      $unwind: "$materialDetails",
    },
    {
      $group: {
        _id: {
          category: "$materialDetails.category",
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        totalQuantity: { $sum: "$quantity" },
      },
    },
    {
      $project: {
        _id: 0,
        category: "$_id.category",
        month: { $arrayElemAt: [monthNames, "$_id.month"] },
        year: "$_id.year",
        totalQuantity: 1,
      },
    },
    {
      $sort: {
        category: 1,
        year: 1,
        month: 1,
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      report,
    },
  });
});
export const GetReportOfMaterialAdedAndRemoved = asyncHandler(
  async (req, res) => {
    const startDate = new Date("2024-01-01"); // Adjust this to the earliest date in your dataset
    const currentDate = new Date();
    const monthNames = [
      "",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const report = await QuantityChange.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: currentDate },
        },
      },
      {
        $lookup: {
          from: "materials",
          localField: "material",
          foreignField: "_id",
          as: "materialDetails",
        },
      },
      {
        $unwind: "$materialDetails",
      },
      {
        $group: {
          _id: {
            changeType: "$changeType",

            month: { $month: "$createdAt" },
          },
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $project: {
          _id: 0,
          changeType: "$_id.changeType",

          month: { $arrayElemAt: [monthNames, "$_id.month"] },
          year: "$_id.year",
          totalQuantity: 1,
        },
      },
      {
        $sort: {
          category: 1,
          year: 1,
          month: 1,
        },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: {
        report,
      },
    });
  }
);
