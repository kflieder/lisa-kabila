"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { db } from "../firebase.config.js";
import { collection, setDoc, doc, getDoc, getDocs, deleteDoc, onSnapshot } from "firebase/firestore";

type Product = {
  id: string;
  name: string;
  imageUrls: string[];
  description: string;
  price: number;
};
type CartContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
  reservedProducts: string[];
  removeFromCart: (productId: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [reservedProducts, setReservedProducts] = useState<string[]>([]);

  useEffect(() => {
    async function fetchReservedProducts() {
      try {
        const reservedProductsRef = collection(db, "reservedProducts");
        const snapshot = await getDocs(reservedProductsRef);
        const now = Date.now();
        const validReservedIds: string[] = [];
        const expiredIds: string[] = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.reservedAt && now - data.reservedAt < 1000) {
            validReservedIds.push(doc.id);
          } else {
            expiredIds.push(doc.id);
          }
        });

        if (expiredIds.length > 0) {
          const newCart = cart.filter((item) => !expiredIds.includes(item.id));
          setCart(newCart);

          const newReservedProducts = reservedProducts.filter(
            (id) => !expiredIds.includes(id)
          );
          setReservedProducts(newReservedProducts);

          const sessionId = localStorage.getItem("sessionId");
          if (sessionId && sessionId !== "undefined") {
            const cartRef = doc(db, "cart", sessionId);
            await setDoc(cartRef, { items: newCart }, { merge: true });

            for (const id of expiredIds) {
              const reservedProductRef = doc(db, "reservedProducts", id);
              await deleteDoc(reservedProductRef);
            }
          }
        } else {
          setReservedProducts(validReservedIds);
        }
      } catch (error) {
        console.error("Error fetching reserved products: ", error);
      }
    }
    fetchReservedProducts();
  }, []);

  useEffect(() => {
    async function fetchCart() {
      try {
        const sessionId = localStorage.getItem("sessionId");
        if (sessionId && sessionId !== "undefined") {
          const cartRef = doc(db, "cart", sessionId);
          const cartSnap = await getDoc(cartRef);
          if (cartSnap.exists()) {
            const data = cartSnap.data();
            if (data.items) {
              setCart(data.items);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching cart: ", error);
      }
    }
    fetchCart();
  }, []);

  useEffect(() => {
  const sessionId = localStorage.getItem("sessionId");
  if (!sessionId || sessionId === "undefined") return;

  const cartRef = doc(db, "cart", sessionId);

  // Firestore realtime listener
  const unsubscribe = onSnapshot(cartRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.data();
      if (data.items) {
        setCart(data.items);
      }
    }
  });

  // Cleanup listener when component unmounts
  return () => unsubscribe();
}, []);


  async function addToCart(product: Product) {
    try {
      let sessionId = localStorage.getItem("sessionId");
      if (!sessionId || sessionId === "undefined") {
        sessionId = crypto.randomUUID();
        localStorage.setItem("sessionId", sessionId);
      }

      const reservedProductsRef = collection(db, "reservedProducts");
      const reservedProductRef = doc(reservedProductsRef, product.id);

      const inReservedProductsRef = await getDoc(reservedProductRef);

      if (inReservedProductsRef.exists()) {
        console.log(
          "Product is already reserved:",
          inReservedProductsRef.data()
        );
        return;
      } else {
        console.log("Product is not reserved yet. Reserving now.");
        const cartRef = doc(db, "cart", sessionId);

        await setDoc(
          reservedProductRef,
          { product, reservedAt: Date.now() },
          { merge: true }
        );
        const newCart = [...cart, product];
        setReservedProducts((prev) => [...prev, product.id]);
        setCart(newCart);
        await setDoc(cartRef, { items: newCart }, { merge: true });
        console.log("Cart updated successfully in Firestore");
      }
    } catch (error) {
      console.error("Error adding to cart: ", error);
    }
  }

  async function removeFromCart(productId: string) {
    try {
      const newCart = cart.filter((item) => item.id !== productId);
      setCart(newCart);
      const sessionId = localStorage.getItem("sessionId");

      const newReservedProducts = reservedProducts.filter(
        (id) => id !== productId
      );
      setReservedProducts(newReservedProducts);

      if (sessionId && sessionId !== "undefined") {
        const cartRef = doc(db, "cart", sessionId);
        await setDoc(cartRef, { items: newCart }, { merge: true });

        const reservedProductRef = doc(db, "reservedProducts", productId);
        await deleteDoc(reservedProductRef);
        setReservedProducts((prev) => prev.filter((id) => id !== productId));
      }
    } catch (error) {
      console.error("Error removing from cart: ", error);
    }
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, reservedProducts, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
export default CartContext;
