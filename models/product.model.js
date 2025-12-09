const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    name: "Xiaomi Redmi Pad Pro 8GB 128GB",
    brand: "Xiaomi",
    category: "Tablet",
    price: 6990000,
    discount: 4,
    stock: 50,
    thumbnail: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-xiaomi-poco-f6_23_.png",
    images: [
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-xiaomi-poco-f6_22_.png",
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-xiaomi-poco-f6_29_.png",
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-xiaomi-poco-f6_30_.png",
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-xiaomi-poco-f6_25_.png",
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-xiaomi-poco-f6_27_.png",
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-xiaomi-poco-f6_26_.png",
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-xiaomi-poco-f6_31_.png"
    ],
    specs: {
        screen: "IPS LCD 12.1 inches, 2.5K (1600 x 2560 pixels), 120Hz, Gorilla Glass 3",
        chip: "Snapdragon 7s Gen 2",
        ram: "8GB",
        storage: "128GB",
        battery: "10000mAh, sạc nhanh 33W",
        camera: "Sau: 8MP | Trước: 8MP",
        weight: "571g"
    },
    description: "Xiaomi Redmi Pad Pro mang đến trải nghiệm giải trí đỉnh cao với màn hình lớn 12.1 inch 2.5K 120Hz. Chip Snapdragon 7s Gen 2 mạnh mẽ, pin khủng 10000mAh và hỗ trợ bút cảm ứng.",
    status: "active",
    deleted: Boolean
});
const product = mongoose.model('product', productSchema, "products");

module.exports = product;