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
import { getSubscriptionPlanByIdDBCall } from "@/lib/data-access-layer/subscriptions";

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

const getCartFromCookies = (): ShoppingCartCheckout => {
  try {
    // cookies() is synchronous in Next.js App Router
    const cookieStore = cookies();
    const cartCookie = cookieStore.get("shopping_cart");

    console.log("Raw cookie value:", cartCookie?.value);

    if (cartCookie?.value) {
      const parsedCart = JSON.parse(cartCookie.value);
      console.log("Parsed cart:", parsedCart);

      // Ensure the cart has the required structure
      return {
        items: parsedCart.items || [],
        total: parsedCart.total || 0,
        type: parsedCart.type || "NONE",
        itemCount: parsedCart.itemCount || parsedCart.items?.length || 0,
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
  console.log("searchParams result:", searchParams);
  // Get cart data from cookies (no await needed)
  const cartData = getCartFromCookies();
  const plan = await getSubscriptionPlanByIdDBCall(cartData?.items[0]?.planId);
  console.log("plan result:", plan);

  // Debug: Log cart data
  console.log("Final cart data:", cartData);
  console.log("Cart has items:", cartData.items.length > 0);
  console.log("Cart type:", cartData.type);

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

  // Temporary: Show debug info instead of components to test
  if (cartData.type === "SUBSCRIPTION") {
    return (
      <div className="app-container py-20 text-center">
        <h2 className="text-2xl font-bold mb-4 text-green-600">
          ✅ Subscription Cart Found!
        </h2>
        <div className="max-w-2xl mx-auto bg-gray-100 p-6 rounded-lg">
          <h3 className="font-bold mb-4">Cart Data: {plan?.name} </h3>
          <pre className="text-left text-sm overflow-auto whitespace-pre-wrap">
            {JSON.stringify(cartData, null, 2)}
          </pre>
          <div className="mt-4 pt-4 border-t">
            <h3 className="font-bold mb-2">Search Params:</h3>
            <pre className="text-left text-sm">
              {JSON.stringify(searchParams, null, 2)}
            </pre>
          </div>
        </div>
        <SubscriptionCheckout
          cartData={cartData}
          plan={plan}
          errorMessage={errorMessage}
          isPaymentSuccessful={isPaymentSuccessful}
          transactionId={transactionId}
          amount={amount}
        />
        <p className="mt-4 text-blue-600">
          SubscriptionCheckout component temporarily disabled for debugging
        </p>
        <p className="text-sm text-gray-600 mt-2">
          If you see this page, the main logic is working. The issue is likely
          in the SubscriptionCheckout component.
        </p>
      </div>
    );
  }

  if (cartData.type === "COURSE") {
    return (
      <div className="app-container py-20 text-center">
        <h2 className="text-2xl font-bold mb-4 text-green-600">
          ✅ Course Cart Found!
        </h2>
        <div className="max-w-2xl mx-auto bg-gray-100 p-6 rounded-lg">
          <pre className="text-left text-sm overflow-auto">
            {JSON.stringify(cartData, null, 2)}
          </pre>
        </div>
        <p className="mt-4 text-blue-600">
          CourseCheckout component temporarily disabled for debugging
        </p>
      </div>
    );
  }

  // Fallback for unknown cart type
  return (
    <div className="app-container py-20 text-center">
      <h2 className="text-2xl font-bold mb-4 text-red-600">
        ❌ Unknown Cart Type
      </h2>
      <p className="mb-4">কার্ট টাইপ: {cartData.type}</p>
      <div className="max-w-2xl mx-auto bg-gray-100 p-6 rounded-lg mb-4">
        <pre className="text-left text-sm overflow-auto">
          {JSON.stringify(cartData, null, 2)}
        </pre>
      </div>
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
