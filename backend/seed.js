const mongoose = require("mongoose");
const Product = require("./models/product");

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const products = [
  // Madhubani Paintings
  {
    name: "Madhubani Peacock Painting",
    artist: "Sunita Mehta",
    artForm: "Madhubani Painting",
    price: 1800,
    image: "https://i.pinimg.com/736x/45/12/85/4512852cccb6a9ecb0e99d1ad5bdbef2.jpg",
  },
  {
    name: "Madhubani Folk Scene",
    artist: "Ravi Kumar",
    artForm: "Madhubani Painting",
    price: 1500,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtWLyinWfDwQ7-B4Kohjuezwtwkag4BgXS4w&s",
  },

  // Warli Paintings
  {
    name: "Warli Tribal Dance",
    artist: "Anjali Sharma",
    artForm: "Warli Painting",
    price: 1700,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0edplswuFEUryTtuw1i1X554m2HdOobv59w&s",
  },
  {
    name: "Warli Village Life",
    artist: "Suresh Patil",
    artForm: "Warli Painting",
    price: 1600,
    image: "https://www.memeraki.com/cdn/shop/files/A-Glimpse-of-Village-Life-Warli-by-Dilip-Bahotha-2_800x.png?v=1726333100",
  },

  // Rajasthani Miniature Paintings
  {
    name: "Rajasthani Miniature Royal Scene",
    artist: "Pooja Reddy",
    artForm: "Rajasthani Miniature",
    price: 2500,
    image: "https://cdn11.bigcommerce.com/s-x49po/images/stencil/1500x1500/products/48089/281050/1580039246158_20200102_164842__71624.1687415167.jpg?c=2",
  },
  {
    name: "Rajasthani Miniature Festival Scene",
    artist: "Vikram Singh",
    artForm: "Rajasthani Miniature",
    price: 2400,
    image: "https://cdn11.bigcommerce.com/s-x49po/images/stencil/1500x1500/products/48089/281050/1580039246158_20200102_164842__71624.1687415167.jpg?c=2",
  },

  // Pattachitra Paintings
  {
    name: "Pattachitra Krishna Scene",
    artist: "Sunil Choudhury",
    artForm: "Pattachitra",
    price: 2000,
    image: "https://cdn.exoticindia.com/images/products/original/paintings-11-2024/ddn778.jpg",
  },
  {
    name: "Pattachitra Folk Tale",
    artist: "Meera Das",
    artForm: "Pattachitra",
    price: 1900,
    image: "https://cdn.exoticindia.com/images/products/original/paintings-11-2024/ddn778.jpg",
  },

  // Handwoven Rugs
  {
    name: "Madhubani Handwoven Rug",
    artist: "Sunita Mehta",
    artForm: "Handwoven Rug",
    price: 3200,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQLIajbADEwv6zTzfmXmCiuqskrGDHCnV2wQ&s",
  },
  {
    name: "Warli Tribal Rug",
    artist: "Suresh Patil",
    artForm: "Handwoven Rug",
    price: 3100,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQLIajbADEwv6zTzfmXmCiuqskrGDHCnV2wQ&s",
  },

  // Terracotta Pottery
  {
    name: "Terracotta Peacock Pot",
    artist: "Ravi Kumar",
    artForm: "Terracotta Pottery",
    price: 800,
    image: "https://mittify.in/wp-content/uploads/2025/06/reojzwsmtqevghfsnwbe-scaled.webp",
  },
  {
    name: "Terracotta Folk Pot",
    artist: "Anjali Sharma",
    artForm: "Terracotta Pottery",
    price: 700,
    image: "https://mittify.in/wp-content/uploads/2025/06/reojzwsmtqevghfsnwbe-scaled.webp",
  }
];

async function seedDB() {
  try {
    await Product.deleteMany(); // clear old data
    await Product.insertMany(products);
    console.log("✅ Database seeded successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error seeding DB:", err);
  }
}

seedDB();
