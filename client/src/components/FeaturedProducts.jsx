// // ✅ FeaturedProducts.jsx (updated)
// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import ProductCard from "./ProductCard";
// import { WishlistContext } from "../context/WishlistContext";

// const FeaturedProducts = () => {
//   const [products, setProducts] = useState([]);
//   const { wishlistItems, addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get("/api/products/featured");
//         setProducts(res.data);
//       } catch (err) {
//         console.error("Failed to fetch featured products:", err);
//       }
//     };
//     fetchProducts();
//   }, []);

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//       {products.map((product) => (
//         <ProductCard
//           key={product.id}
//           product={product}
//           isWishlisted={isInWishlist(product.id)}
//           onWishlistToggle={() =>
//             isInWishlist(product.id)
//               ? removeFromWishlist(product.id)
//               : addToWishlist(product.id)
//           }
//         />
//       ))}
//     </div>
//   );
// };

// export default FeaturedProducts;


import React from 'react'

const FeaturedProducts = () => {
  return (
    <div>
      comin soon
    </div>
  )
}

export default FeaturedProducts
