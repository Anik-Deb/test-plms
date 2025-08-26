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

// --------------------------------------
import { Suspense } from "react";
import { cookies } from "next/headers";
import SubscriptionCheckout from "./_components/subscription-checkout";
import CourseCheckout from "./_components/course-checkout";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

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

// Function to get cart data directly from cookies
const getCartFromCookies = (): ShoppingCartCheckout => {
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
    return JSON.parse(cartCookie.value);
  } catch (error) {
    console.error("Error parsing cart cookie:", error);
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

const CheckOutPage = async ({ searchParams }: CheckOutPageProps) => {
  // Get cart data directly from cookies
  const cartData = getCartFromCookies();

  // Debug logging (remove in production)
  console.log("Cart data:", cartData);
  console.log("Cart items length:", cartData?.items?.length);
  console.log("Cart type:", cartData?.type);

  // Handle empty cart
  if (!cartData.items || cartData.items.length === 0) {
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

  // Extract search params
  const errorMessage = searchParams.error;
  const transactionId = searchParams.trxID;
  const amount = searchParams.amount;
  const isPaymentSuccessful = transactionId && amount;

  // Handle subscription checkout
  if (cartData?.type === "SUBSCRIPTION") {
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

  // Handle course checkout
  if (cartData?.type === "COURSE") {
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

  // Handle invalid cart type
  return (
    <div className="app-container py-20 text-center min-h-[60vh] flex items-center justify-center">
      <div className="max-w-3xl border border-dashed border-red-300 mx-auto p-4 md:p-16 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-red-600">
          Invalid Cart Type
        </h2>
        <p className="mb-4">Cart type "{cartData?.type}" is not supported.</p>
        <div className="mt-6 flex justify-center">
          <Link href="/">
            <Button variant="primary" className="flex flex-wrap flex-row">
              <ArrowLeft className="mr-2 w-4 h-4" />
              হোমে ফিরে যান
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
