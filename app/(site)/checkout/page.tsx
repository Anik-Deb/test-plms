export const dynamic = "force-dynamic";
import { getServerCart } from "@/lib/actions/cart-cookie";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import SubscriptionCheckout from "./_components/subscription-checkout";
import CourseCheckout from "./_components/course-checkout";

interface CheckOutPageProps {
  searchParams: {
    error?: string;
    success?: string;
    trxID?: string;
    amount?: string;
  };
}

const CheckOutPage = async ({ searchParams }: CheckOutPageProps) => {
  try {
    // Add logging for Vercel
    console.log("CheckOutPage: Starting to get cart data");

    // get data from cookies
    const cartData = await getServerCart();

    console.log("CheckOutPage: Cart data received:", {
      itemsLength: cartData?.items?.length || 0,
      cartType: cartData?.type,
      hasItems: cartData?.items && cartData.items.length > 0,
    });

    if (!cartData || !cartData.items || cartData.items.length === 0) {
      console.log("CheckOutPage: Cart is empty, showing empty cart message");
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

    const isPaymentSuccessful = transactionId && amount;

    console.log(
      "CheckOutPage: About to render component for type:",
      cartData.type
    );

    if (cartData?.type === "SUBSCRIPTION") {
      console.log("CheckOutPage: Rendering SubscriptionCheckout");
      return (
        <div>
          <SubscriptionCheckout
            cartData={cartData}
            errorMessage={errorMessage}
            isPaymentSuccessful={isPaymentSuccessful}
            transactionId={transactionId}
            amount={amount}
          />
        </div>
      );
    }

    if (cartData?.type === "COURSE") {
      console.log("CheckOutPage: Rendering CourseCheckout");
      console.log("CheckOutPage: Course item data:", {
        courseSlug: cartData.items[0]?.courseSlug,
        checkoutType: cartData.items[0]?.checkoutType,
        itemKeys: Object.keys(cartData.items[0] || {}),
      });

      return (
        <div>
          <CourseCheckout
            cartData={cartData}
            errorMessage={errorMessage}
            isPaymentSuccessful={isPaymentSuccessful}
            transactionId={transactionId}
            amount={amount}
          />
        </div>
      );
    }

    console.log(
      "CheckOutPage: No matching cart type, cart type is:",
      cartData.type
    );
    return (
      <div className="app-container py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Invalid Cart Type</h2>
        <p>Cart type: {cartData.type}</p>
        <Link href="/courses">
          <Button className="mt-4">Back to Courses</Button>
        </Link>
      </div>
    );
  } catch (error) {
    console.error("CheckOutPage: Error in main component:", error);
    return (
      <div className="app-container py-20 text-center">
        <h2 className="text-2xl font-bold mb-4 text-red-600">
          Error Loading Checkout
        </h2>
        <p className="mb-4">There was an error loading the checkout page.</p>
        <pre className="text-xs text-gray-600 mb-4">
          {error instanceof Error ? error.message : "Unknown error"}
        </pre>
        <Link href="/courses">
          <Button>Back to Courses</Button>
        </Link>
      </div>
    );
  }
};

export default CheckOutPage;
