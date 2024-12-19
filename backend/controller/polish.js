const express = require("express");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Polish = require("../model/polish");
const Order = require("../model/order");
const Shop = require("../model/shop");
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/ErrorHandler");

// create poslish
router.post(
  "/create-polish",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid!", 400));
      } else {
        let images = [];

        if (typeof req.body.images === "string") {
          images.push(req.body.images);
        } else {
          images = req.body.images;
        }
      
        const imagesLinks = [];
      
        for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "polishes",
          });
      
          imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }
      
        const polishData = req.body;
        polishData.images = imagesLinks;
        polishData.shop = shop;

        const polish = await Polish.create(polishData);

        res.status(201).json({
          success: true,
          polish,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all polishes of a shop
router.get(
  "/get-all-polishes-shop/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const polishes = await Polish.find({ shopId: req.params.id });

      res.status(201).json({
        success: true,
        polishes,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete polish of a shop
router.delete(
  "/delete-shop-polish/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      console.log("req.params.id",req.params.id);
      
      const polish = await Polish.findById(req.params.id);

      if (!polish) {
        return next(new ErrorHandler("Polish is not found with this id", 404));
      }    

      for (let i = 0; 1 < polish.images.length; i++) {
        const result = await cloudinary.v2.uploader.destroy(
          polish.images[i].public_id
        );
      }
      
      await polish.remove();

      res.status(201).json({
        success: true,
        message: "Polish Deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all polishes
router.get(
  "/get-all-polishes",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const polishes = await Polish.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        polishes,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// review for a polish
router.put(
  "/create-new-review",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { user, rating, comment, productId, orderId } = req.body;

      const polish = await Polish.findById(productId);

      const review = {
        user,
        rating,
        comment,
        productId,
      };

      const isReviewed = polish.reviews.find(
        (rev) => rev.user._id === req.user._id
      );

      if (isReviewed) {
        polish.reviews.forEach((rev) => {
          if (rev.user._id === req.user._id) {
            (rev.rating = rating), (rev.comment = comment), (rev.user = user);
          }
        });
      } else {
        polish.reviews.push(review);
      }

      let avg = 0;

      polish.reviews.forEach((rev) => {
        avg += rev.rating;
      });

      polish.ratings = avg / polish.reviews.length;

      await polish.save({ validateBeforeSave: false });

      await Order.findByIdAndUpdate(
        orderId,
        { $set: { "cart.$[elem].isReviewed": true } },
        { arrayFilters: [{ "elem._id": productId }], new: true }
      );

      res.status(200).json({
        success: true,
        message: "Reviwed succesfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// all polishes --- for admin
router.get(
  "/admin-all-polishes",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const polishes = await Polish.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        polishes,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
module.exports = router;
