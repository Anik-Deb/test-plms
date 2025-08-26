// "use server";

// import { cookies } from "next/headers";

// type ShoppingCartCheckout = {
//   items: any[]; // Change `any[]` to your specific item type if available
//   total?: number;
//   type: "SUBSCRIPTION" | "COURSE" | "NONE"; // Extend with more plan types if needed
//   itemCount?: number;
//   currency?: "BDT"; // Extend with more currencies if needed
//   lastUpdated?: string; // ISO date string
// };

// export const getServerCart = async (): Promise<ShoppingCartCheckout> => {
//   const cookieStore = cookies();
//   const cartCookie = cookieStore.get("shopping_cart");

//   if (!cartCookie || !cartCookie.value || cartCookie.value.trim() === "") {
//     return {
//       items: [],
//       total: 0,
//       type: "NONE",
//       itemCount: 0,
//       currency: "BDT",
//       lastUpdated: new Date().toISOString(),
//     };
//   }

//   try {
//     return JSON.parse(cartCookie.value);
//   } catch (error) {
//     console.error("Error parsing server cart:", error);
//     return {
//       items: [],
//       type: "NONE",
//       total: 0,
//       itemCount: 0,
//       currency: "BDT",
//       lastUpdated: new Date().toISOString(),
//     };
//   }
// };

// export async function setServerCart(cartData: ShoppingCartCheckout) {
//   const cookieStore = cookies();

//   try {
//     cookieStore.set({
//       name: "shopping_cart",
//       value: JSON.stringify(cartData),
//       maxAge: 7 * 24 * 60 * 60, // 7 days
//       path: "/",
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       httpOnly: false, // Must be false for client access
//     });
//     return true;
//   } catch (error) {
//     console.error("Error setting server cart:", error);
//     return false;
//   }
// }

// export async function clearServerCart() {
//   const cookieStore = cookies();
//   cookieStore.delete("shopping_cart");
//   return true;
// }

"use server";

import { cookies } from "next/headers";

type ShoppingCartCheckout = {
  items: any[]; // Change `any[]` to your specific item type if available
  total?: number;
  type: "SUBSCRIPTION" | "COURSE" | "NONE"; // Extend with more plan types if needed
  itemCount?: number;
  currency?: "BDT"; // Extend with more currencies if needed
  lastUpdated?: string; // ISO date string
};

/**
 * Get cart data from server cookies (Server Action approach)
 * Use this when you need to call from client components or forms
 */
export const getServerCart = async (): Promise<ShoppingCartCheckout> => {
  const cookieStore = cookies();
  const cartCookie = cookieStore.get("shopping_cart");

  if (!cartCookie || !cartCookie.value || cartCookie.value.trim() === "") {
    return {
      items: [],
      total: 0,
      type: "NONE",
      itemCount: 0,
      currency: "BDT",
      lastUpdated: new Date().toISOString(),
    };
  }

  try {
    const parsedCart = JSON.parse(cartCookie.value);
    console.log("getServerCart - Cart data retrieved:", parsedCart);
    return parsedCart;
  } catch (error) {
    console.error("Error parsing server cart:", error);
    return {
      items: [],
      type: "NONE",
      total: 0,
      itemCount: 0,
      currency: "BDT",
      lastUpdated: new Date().toISOString(),
    };
  }
};

/**
 * Set cart data to server cookies
 */
export async function setServerCart(
  cartData: ShoppingCartCheckout
): Promise<boolean> {
  const cookieStore = cookies();

  try {
    // Add timestamp when setting cart
    const cartWithTimestamp = {
      ...cartData,
      lastUpdated: new Date().toISOString(),
    };

    cookieStore.set({
      name: "shopping_cart",
      value: JSON.stringify(cartWithTimestamp),
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      httpOnly: false, // Must be false for client access
    });

    console.log("setServerCart - Cart data saved:", cartWithTimestamp);
    return true;
  } catch (error) {
    console.error("Error setting server cart:", error);
    return false;
  }
}

/**
 * Clear cart from server cookies
 */
export async function clearServerCart(): Promise<boolean> {
  const cookieStore = cookies();

  try {
    cookieStore.delete("shopping_cart");
    console.log("clearServerCart - Cart cleared successfully");
    return true;
  } catch (error) {
    console.error("Error clearing server cart:", error);
    return false;
  }
}

/**
 * Add item to cart (Server Action)
 */
export async function addToServerCart(item: any): Promise<boolean> {
  try {
    const currentCart = await getServerCart();

    // Check if item already exists
    const existingItemIndex = currentCart.items.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex >= 0) {
      // Update existing item quantity if applicable
      currentCart.items[existingItemIndex] = {
        ...currentCart.items[existingItemIndex],
        ...item,
      };
    } else {
      // Add new item
      currentCart.items.push(item);
    }

    // Recalculate totals
    currentCart.itemCount = currentCart.items.length;
    currentCart.total = currentCart.items.reduce((sum, cartItem) => {
      return sum + (cartItem.price || 0) * (cartItem.quantity || 1);
    }, 0);

    return await setServerCart(currentCart);
  } catch (error) {
    console.error("Error adding to server cart:", error);
    return false;
  }
}

/**
 * Remove item from cart (Server Action)
 */
export async function removeFromServerCart(itemId: string): Promise<boolean> {
  try {
    const currentCart = await getServerCart();

    // Filter out the item
    currentCart.items = currentCart.items.filter((item) => item.id !== itemId);

    // Recalculate totals
    currentCart.itemCount = currentCart.items.length;
    currentCart.total = currentCart.items.reduce((sum, cartItem) => {
      return sum + (cartItem.price || 0) * (cartItem.quantity || 1);
    }, 0);

    // If no items left, set type to NONE
    if (currentCart.items.length === 0) {
      currentCart.type = "NONE";
    }

    return await setServerCart(currentCart);
  } catch (error) {
    console.error("Error removing from server cart:", error);
    return false;
  }
}

/**
 * Update cart type (useful when switching between subscription/course modes)
 */
export async function updateCartType(
  type: "SUBSCRIPTION" | "COURSE" | "NONE"
): Promise<boolean> {
  try {
    const currentCart = await getServerCart();
    currentCart.type = type;
    return await setServerCart(currentCart);
  } catch (error) {
    console.error("Error updating cart type:", error);
    return false;
  }
}

/**
 * Get cart summary (for quick checks)
 */
export async function getCartSummary(): Promise<{
  itemCount: number;
  total: number;
  type: string;
  hasItems: boolean;
}> {
  try {
    const cart = await getServerCart();
    return {
      itemCount: cart.itemCount || 0,
      total: cart.total || 0,
      type: cart.type,
      hasItems: cart.items.length > 0,
    };
  } catch (error) {
    console.error("Error getting cart summary:", error);
    return {
      itemCount: 0,
      total: 0,
      type: "NONE",
      hasItems: false,
    };
  }
}
