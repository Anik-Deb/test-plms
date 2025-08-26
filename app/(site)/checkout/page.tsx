// export const dynamic = "force-dynamic";
// import SubscriptionCheckout from "./_components/subscription-checkout";
// import { getServerCart } from "@/lib/actions/cart-cookie";
// import CourseCheckout from "./_components/course-checkout";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { ArrowLeft } from "lucide-react";

// import { cookies } from "next/headers";

// interface CheckOutPageProps {
//   searchParams: {
//     error?: string;
//     success?: string;
//     trxID?: string;
//     amount?: string;
//   };
// }

// const CheckOutPage = async ({ searchParams }: CheckOutPageProps) => {
//   // get data from cookies
//   const cartData = await getServerCart();

//   // if (cartData.items.length === 0) {
//   //   redirect("/");
//   // }
//   if (cartData.items.length === 0) {
//     return (
//       <div className="app-container py-20 text-center min-h-[60vh] flex items-center justify-center">
//         <div className="max-w-3xl border border-dashed border-gray-300 mx-auto p-4 md:p-16 rounded-lg">
//           <h2 className="text-2xl font-bold mb-4">আপনার কার্ট খালি</h2>
//           <p className="mb-4">
//             আপনার কার্টে কোন আইটেম নেই। অনুগ্রহ করে কিছু যোগ করুন।
//           </p>
//           <div className="mt-6 flex justify-center md:flex-row flex-col items-center gap-3">
//             <Link href="/prime">
//               <Button variant="primary" className="flex flex-wrap flex-row">
//                 <ArrowLeft className="mr-2 w-4 h-4" />
//                 প্রাইম প্ল্যান দেখুন
//               </Button>
//             </Link>
//             <Link href="/courses">
//               <Button variant="outline" className="flex flex-wrap flex-row">
//                 <ArrowLeft className="mr-2 w-4 h-4" />
//                 কোর্স সমূহ দেখুন
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Extract error and success messages from URL parameters
//   const errorMessage = searchParams.error;
//   const transactionId = searchParams.trxID;
//   const amount = searchParams.amount;

//   const isPaymentSuccessful = transactionId && amount;

//   if (cartData?.type === "SUBSCRIPTION") {
//     return (
//       <div>
//         <SubscriptionCheckout
//           cartData={cartData}
//           errorMessage={errorMessage}
//           isPaymentSuccessful={isPaymentSuccessful}
//           transactionId={transactionId}
//           amount={amount}
//         />
//       </div>
//     );
//   }

//   if (cartData?.type === "COURSE") {
//     return (
//       <div>
//         <CourseCheckout
//           cartData={cartData}
//           errorMessage={errorMessage}
//           isPaymentSuccessful={isPaymentSuccessful}
//           transactionId={transactionId}
//           amount={amount}
//         />
//       </div>
//     );
//   }
// };

// export default CheckOutPage;

// import { Suspense } from "react";
// import { getServerCart } from "@/lib/actions/cart-cookie";
// import CourseCheckout from "./_components/course-checkout";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { ArrowLeft } from "lucide-react";
// import SubscriptionCheckout from "./_components/subscription-checkout";

// interface CheckOutPageProps {
//   searchParams: {
//     error?: string;
//     success?: string;
//     trxID?: string;
//     amount?: string;
//   };
// }

// const CheckOutPage = async ({ searchParams }: CheckOutPageProps) => {
//   const cartData = await getServerCart();

//   if (cartData.items.length === 0) {
//     return (
//       <div className="app-container py-20 text-center min-h-[60vh] flex items-center justify-center">
//         <div className="max-w-3xl border border-dashed border-gray-300 mx-auto p-4 md:p-16 rounded-lg">
//           <h2 className="text-2xl font-bold mb-4">আপনার কার্ট খালি</h2>
//           <p className="mb-4">
//             আপনার কার্টে কোন আইটেম নেই। অনুগ্রহ করে কিছু যোগ করুন।
//           </p>
//           <div className="mt-6 flex justify-center md:flex-row flex-col items-center gap-3">
//             <Link href="/prime">
//               <Button variant="primary" className="flex flex-wrap flex-row">
//                 <ArrowLeft className="mr-2 w-4 h-4" />
//                 প্রাইম প্ল্যান দেখুন
//               </Button>
//             </Link>
//             <Link href="/courses">
//               <Button variant="outline" className="flex flex-wrap flex-row">
//                 <ArrowLeft className="mr-2 w-4 h-4" />
//                 কোর্স সমূহ দেখুন
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const errorMessage = searchParams.error;
//   const transactionId = searchParams.trxID;
//   const amount = searchParams.amount;
//   const isPaymentSuccessful = transactionId && amount;

//   if (cartData?.type === "SUBSCRIPTION") {
//     return (
//       <SubscriptionCheckout
//         cartData={cartData}
//         errorMessage={errorMessage}
//         isPaymentSuccessful={isPaymentSuccessful}
//         transactionId={transactionId}
//         amount={amount}
//       />
//     );
//   }

//   if (cartData?.type === "COURSE") {
//     return (
//       <CourseCheckout
//         cartData={cartData}
//         errorMessage={errorMessage}
//         isPaymentSuccessful={isPaymentSuccessful}
//         transactionId={transactionId}
//         amount={amount}
//       />
//     );
//   }

//   return (
//     <div className="app-container py-20 text-center">
//       <h2>Invalid cart type</h2>
//     </div>
//   );
// };

// // Wrap with Suspense for better error handling on Vercel
// const CheckOutWrapper = (props: CheckOutPageProps) => {
//   return (
//     <Suspense
//       fallback={
//         <div className="app-container py-20 text-center">
//           Loading checkout...
//         </div>
//       }
//     >
//       <CheckOutPage {...props} />
//     </Suspense>
//   );
// };

// export default CheckOutWrapper;

// ----------------working code below this line----------------
// interface CheckOutPageProps {
//   searchParams: {
//     error?: string;
//     success?: string;
//     trxID?: string;
//     amount?: string;
//   };
// }
// const CheckOutPage = async ({ searchParams }: CheckOutPageProps) => {
//   const cookieStore = cookies();
//   const allCookies = cookieStore.getAll();

//   // Temporary debug display
//   return (
//     <div className="p-8">
//       <h1>Debug Info</h1>
//       <h2>All Cookies:</h2>
//       <pre>{JSON.stringify(allCookies, null, 2)}</pre>
//       <h2>Shopping Cart Cookie:</h2>
//       <pre>{cookieStore.get("shopping_cart")?.value || "Not found"}</pre>
//     </div>
//   );
// };

// export default CheckOutPage;

import { cookies } from "next/headers";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import SubscriptionCheckout from "./_components/subscription-checkout";
import CourseCheckout from "./_components/course-checkout";

type ShoppingCartCheckout = {
  items: any[];
  total?: number;
  type: "SUBSCRIPTION" | "COURSE" | "NONE";
  itemCount?: number;
  currency?: "BDT";
  lastUpdated?: string;
};

interface CheckOutPageProps {
  searchParams: {
    error?: string;
    success?: string;
    trxID?: string;
    amount?: string;
  };
}

const getCartFromCookies = async (): Promise<ShoppingCartCheckout> => {
  try {
    const cookieStore = await cookies();
    const cartCookie = cookieStore.get("shopping_cart");

    if (cartCookie?.value) {
      const parsedCart = JSON.parse(cartCookie.value);
      // Ensure the cart has the required structure
      return {
        items: parsedCart.items || [],
        total: parsedCart.total || 0,
        type: parsedCart.type || "NONE",
        itemCount: parsedCart.itemCount || 0,
        currency: parsedCart.currency || "BDT",
        lastUpdated: parsedCart.lastUpdated || new Date().toISOString(),
      };
    }

    return {
      items: [],
      total: 0,
      type: "NONE",
      itemCount: 0,
      currency: "BDT",
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error parsing cart from cookies:", error);
    return {
      items: [],
      total: 0,
      type: "NONE",
      itemCount: 0,
      currency: "BDT",
      lastUpdated: new Date().toISOString(),
    };
  }
};

const CheckOutPage = async ({ searchParams }: CheckOutPageProps) => {
  // Get cart data from cookies (await the promise)
  const cartData = await getCartFromCookies();

  // Debug: Log cart data (remove in production)
  console.log("Cart data:", cartData);

  if (!cartData || cartData.items.length === 0) {
    return (
      <div className="app-container py-20 text-center min-h-[60vh] flex items-center justify-center">
        <div className="max-w-3xl border border-dashed border-gray-300 mx-auto p-4 md:p-16 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">আপনার কার্ট খালি</h2>
          <p className="mb-4">
            আপনার কার্টে কোন আইটেম নেই। অনুগ্রহ করে কিছু যোগ করুন।
          </p>
          <div className="mt-6 flex justify-center md:flex-row flex-col items-center gap-3">
            <Link href="/prime">
              <Button variant="primary" className="flex flex-wrap flex-row">
                <ArrowLeft className="mr-2 w-4 h-4" />
                প্রাইম প্ল্যান দেখুন
              </Button>
            </Link>
            <Link href="/courses">
              <Button variant="outline" className="flex flex-wrap flex-row">
                <ArrowLeft className="mr-2 w-4 h-4" />
                কোর্স সমূহ দেখুন
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Extract error and success messages from URL parameters
  const errorMessage = searchParams.error;
  const transactionId = searchParams.trxID;
  const amount = searchParams.amount;
  const isPaymentSuccessful = !!(transactionId && amount);

  if (cartData.type === "SUBSCRIPTION") {
    return (
      <SubscriptionCheckout
        cartData={cartData}
        errorMessage={errorMessage}
        isPaymentSuccessful={isPaymentSuccessful}
        transactionId={transactionId}
        amount={amount}
      />
    );
  }

  if (cartData.type === "COURSE") {
    return (
      <CourseCheckout
        cartData={cartData}
        errorMessage={errorMessage}
        isPaymentSuccessful={isPaymentSuccessful}
        transactionId={transactionId}
        amount={amount}
      />
    );
  }

  // Fallback for unknown cart type
  return (
    <div className="app-container py-20 text-center">
      <h2 className="text-2xl font-bold mb-4">অজানা কার্ট টাইপ</h2>
      <p className="mb-4">কার্ট টাইপ: {cartData.type}</p>
      <Link href="/prime">
        <Button variant="primary">
          <ArrowLeft className="mr-2 w-4 h-4" />
          ফিরে যান
        </Button>
      </Link>
    </div>
  );
};

export default CheckOutPage;
