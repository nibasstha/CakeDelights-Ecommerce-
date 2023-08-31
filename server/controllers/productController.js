const router = require("express").Router();
const cloudinary = require("cloudinary");
const productModel = require("../models/productModel");
const authGuard = require("../auth/authGuard");
const Order = require("../models/orderModel");
const userModel = require("../models/userModel");

//create a add product route
router.post("/add", authGuard, async (req, res) => {
  console.log(req.body);

  //destructuring
  const { productName, productPrice, productCategory, productDescription } =
    req.body;
  const { productImage } = req.files;

  //validation
  if (
    !productName ||
    !productPrice ||
    !productCategory ||
    !productDescription ||
    !productImage
  ) {
    return res.status(422).json({ error: "Please enter all fields" });
  }

//   try {

//     if (productImage) {
//       const uploadedImage = await cloudinary.v2.uploader.upload(
//         productImage.path,
//         {
//           folder: "onlinebazzar",
//           crop: "scale",
//         }
//       );
//       const newProduct = new productModel({
//         name: productName,
//         price: productPrice,
//         category: productCategory,
//         description: productDescription,
//         image: uploadedImage.secure_url,
//       });
//       await newProduct.save();
//       res.status(201).json({ message: "Product added successfully" });
//     } else {
//       const uploadedImage = await cloudinary.v2.uploader.upload(
//         productImage.path,
//         {
//           folder: "onlinebazzar",
//           crop: "scale",
//         }
//       );
//       const newProduct = new productModel({
//         name: productName,
//         price: productPrice,
//         category: productCategory,
//         description: productDescription,
//       });
//       await newProduct.save();
//       res.status(201).json({ message: "Product added successfully" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

const uploadedImage = await cloudinary.v2.uploader.upload(
  productImage.path,
  {
      folder: "onlinebazar",
      crop: "scale"
  },
);

try {

  const newProduct = new productModel({
      name: productName,
      price: productPrice,
      category: productCategory,
      description: productDescription,
      image: uploadedImage.secure_url,
  });

  await newProduct.save();

  res.status(201).json({ message: "Product added successfully" });

} catch (error) {
  console.log(error);
  res.status(500).json({ error: "Internal Server Error" });
}

});

//get all products
router.get("/get_products", async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get single product
router.get("/get_product/:id", async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server Error" });
  }
});

//updating product
router.put("/update_product/:id", authGuard, async (req, res) => {
  console.log(req.body);

  //destructuring
  const { productName, productPrice, productCategory, productDescription } =
    req.body;
  const { productImage } = req.files;

  //validation
  if (
    !productName ||
    !productPrice ||
    !productCategory ||
    !productDescription ||
    !productImage
  ) {
    return res.status(422).json({ msg: "Please add all the field" });
  }

  const uploadedImage = await cloudinary.v2.uploader.upload(productImage.path, {
    folder: "onlinebazzar",
    crop: "scale",
  });
  try {
    const product = await productModel.findById(req.params.id);
    (product.name = productName),
      (product.price = productPrice),
      (product.category = productCategory),
      (product.description = productDescription),
      (product.image = uploadedImage.secure_url);

    await product.save();
    res.status(201).json({ message: "Product added sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//delete product
router.delete("/delete_product/:id", authGuard, async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    await product.deleteOne();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server Error" });
  }
});

//search product
router.get("/search_product/:name", async (req, res) => {
  try {
    const products = await productModel.find({
      name: {
        $regex: req.params.name,
        $options: "i",
      },
    });
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server Error" });
  }
});

// count products, pending orders, delivered orders, users
router.get("/count", async (req, res) => {
  try {
      const productCount = await productModel.countDocuments({});
      const pendingOrders = await Order.countDocuments({ status: "Pending" });
      const deliveredOrders = await Order.countDocuments({ status: "Delivered" });
      const userCount = await userModel.countDocuments({});
      res.status(200).json({ productCount, pendingOrders, deliveredOrders, userCount });
      
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
