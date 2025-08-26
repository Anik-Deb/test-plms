import { cookies } from "next/headers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users } from "lucide-react";
import { getCourseDBCall } from "@/lib/data-access-layer/course";
import { getSubscriptionDBCall } from "@/lib/data-access-layer/subscriptions";
import { convertNumberToBangla } from "@/lib/convertNumberToBangla";
import CourseCheckoutForm from "./course-checkout-form";
import Image from "next/image";
import { getUserSubscription } from "@/lib/getUserSubscription";
import { getServerUserSession } from "@/lib/getServerUserSession";
import { PurchaseType } from "@prisma/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PaymentMessage from "./payment-message";

const CourseCheckout = async ({
  cartData,
  errorMessage,
  isPaymentSuccessful,
  transactionId,
  amount,
}: any) => {
  try {
    // Add null checks for cartData
    if (!cartData || !cartData.items || cartData.items.length === 0) {
      return (
        <div className="bg-[#F3F9F9] flex justify-center items-center p-6">
          <Card className="app-container mx-auto bg-white p-6 border-0">
            <h1 className="text-2xl font-bold text-red-600">Error</h1>
            <p>Cart data is missing or invalid</p>
            <Link href="/courses">
              <Button className="mt-4">Back to Courses</Button>
            </Link>
          </Card>
        </div>
      );
    }

    const { courseSlug, checkoutType } = cartData.items[0];

    // Add validation for courseSlug
    if (!courseSlug) {
      return (
        <div className="bg-[#F3F9F9] flex justify-center items-center p-6">
          <Card className="app-container mx-auto bg-white p-6 border-0">
            <h1 className="text-2xl font-bold text-red-600">Error</h1>
            <p>Course information is missing</p>
            <Link href="/courses">
              <Button className="mt-4">Back to Courses</Button>
            </Link>
          </Card>
        </div>
      );
    }

    // Wrap database calls in try-catch with proper error handling
    const [course, allSubscriptionPlans, userSession, userSubscription] =
      await Promise.allSettled([
        getCourseDBCall(courseSlug),
        getSubscriptionDBCall(),
        getServerUserSession(),
        getUserSubscription(),
      ]);

    // Handle course fetch failure
    if (course.status === "rejected" || !course.value) {
      console.error(
        "Failed to fetch course:",
        course.status === "rejected" ? course.reason : "Course not found"
      );
      return (
        <div className="bg-[#F3F9F9] flex justify-center items-center p-6">
          <Card className="app-container mx-auto bg-white p-6 border-0">
            <h1 className="text-2xl font-bold text-red-600">
              Course Not Found
            </h1>
            <p>
              The requested course could not be found or there was a database
              error.
            </p>
            <Link href="/courses">
              <Button className="mt-4">Back to Courses</Button>
            </Link>
          </Card>
        </div>
      );
    }

    // Handle subscription plans fetch failure
    const subscriptionPlans =
      allSubscriptionPlans.status === "fulfilled"
        ? allSubscriptionPlans.value
        : [];

    // Handle user session failure
    const userId =
      userSession.status === "fulfilled" ? userSession.value?.userId : null;

    // Handle user subscription failure
    const userSub =
      userSubscription.status === "fulfilled" ? userSubscription.value : null;

    const cookieStore = cookies();
    const savedPriceType = checkoutType || PurchaseType.SINGLE_COURSE;
    const savedSelectedPlan =
      cookieStore.get("checkout_selected_plan")?.value || "";

    // Check if user has active subscription
    const hasActiveSubscription = userSub && userSub.status === "ACTIVE";

    // Get the first price for regular pricing with null checks
    const regularPrice = course.value.prices?.[0];
    const regularAmount = regularPrice?.regularAmount || 0;
    const discountedAmount = regularPrice?.discountedAmount;
    const hasDiscount = discountedAmount && discountedAmount < regularAmount;

    // Filter and sort subscription plans with proper error handling
    const availableSubscriptionPlans = subscriptionPlans
      .filter((plan) => plan && plan.name && plan.regularPrice)
      .sort((a, b) => {
        const aDuration =
          a.durationInYears ||
          (a.durationInMonths ? a.durationInMonths / 12 : 1);
        const bDuration =
          b.durationInYears ||
          (b.durationInMonths ? b.durationInMonths / 12 : 1);
        return aDuration - bDuration;
      });

    // Set default selected plan to the first available plan
    const defaultSelectedPlan =
      savedSelectedPlan || availableSubscriptionPlans[0]?.id || "";

    return (
      <div className="bg-[#F3F9F9] flex justify-center items-center p-6 xl:p-14 border-b">
        <Card className="app-container mx-auto bg-white p-6 md:p-10 border-0">
          {/* title and description */}
          <div>
            <h1 className="md:text-4xl text-3xl font-bold">চেকআউট </h1>
            <p className="sm:text-base text-sm font-normal text-gray-600">
              সব তথ্য যাচাই করুন এবং নিশ্চিন্তে পেমেন্ট করুন।
            </p>
          </div>
          {/* divider */}
          <hr className="my-4 border-gray-200" />
          {/* message for success or failed */}
          <PaymentMessage
            errorMessage={errorMessage}
            isPaymentSuccessful={isPaymentSuccessful}
            transactionId={transactionId}
            amount={amount}
          />
          <div className="flex lg:flex-row flex-col justify-between gap-10 pt-2">
            {/* Left Side - Course Details */}
            <div className="lg:w-[45%] w-full">
              <Card className="relative p-6">
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={course.value.imageUrl || "/placeholder.svg"}
                    alt={course.value.title || "Course"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="mb-0 pb-6 px-0">
                  <CardTitle className="sm:text-2xl text-xl font-semibold ">
                    {course.value.title || "Course Title"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-base text-gray-700 space-y-1 px-0">
                  <div>
                    ইন্সট্রাক্টর{" "}
                    {course.value.teacherProfile?.user?.name || "Unknown"}
                  </div>

                  <div className="flex items-center gap-4 my-2">
                    <div className="flex items-center space-x-[6px]">
                      <Image
                        src={"/icon/book-gray.svg"}
                        alt="user-icon"
                        width={16}
                        height={16}
                        className="w-4 h-4 object-contain"
                      />
                      <p className="text-base text-fontcolor-description">
                        {convertNumberToBangla(
                          course.value?.lessons?.length || 0
                        )}{" "}
                        টি লেসন
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {convertNumberToBangla(
                        course.value.enrolledStudents?.length || 0
                      )}{" "}
                      শিক্ষার্থী
                    </div>
                  </div>

                  <div>
                    <div className="">
                      <span className="text-sm text-gray-600 mr-1">
                        রেগুলার প্রাইস:
                      </span>
                      <span className="text-lg font-semibold">
                        ৳{convertNumberToBangla(regularAmount)}
                      </span>
                    </div>
                    {hasDiscount && (
                      <div className="">
                        <span className="text-sm text-brand font-medium">
                          Discounted Price:
                        </span>
                        <span className="text-xl font-bold text-brand">
                          ৳{convertNumberToBangla(discountedAmount)}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              {/* desktop screen */}
              <div className="w-fit hidden lg:block">
                <Link href="/prime">
                  <Button
                    variant="link"
                    className="flex flex-row gap-1 text-brand pt-8 hover:no-underline px-0 font-normal"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    সাবস্ক্রিপশন পেজে ফিরে যান
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Side - Checkout Form */}
            <div className="lg:w-[55%] w-full">
              <CourseCheckoutForm
                availableSubscriptionPlans={availableSubscriptionPlans}
                course={course.value}
                savedPriceType={savedPriceType}
                hasDiscount={hasDiscount}
                discountedAmount={discountedAmount}
                regularAmount={regularAmount}
                defaultSelectedPlan={defaultSelectedPlan}
                isSignedIn={!!userId}
                userSubscription={userSub}
                isPaymentSuccessful={isPaymentSuccessful}
              />
            </div>
            {/* MOBILE screen */}
            <div className="w-fit lg:hidden block">
              <Link href="/prime">
                <Button
                  variant="link"
                  className="flex flex-row gap-1 text-brand hover:no-underline px-0 font-normal"
                >
                  <ArrowLeft className="w-4 h-4" />
                  সাবস্ক্রিপশন পেজে ফিরে যান
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    );
  } catch (error) {
    console.error("CourseCheckout error:", error);
    return (
      <div className="bg-[#F3F9F9] flex justify-center items-center p-6">
        <Card className="app-container mx-auto bg-white p-6 border-0">
          <h1 className="text-2xl font-bold text-red-600">
            Something went wrong
          </h1>
          <p>There was an error loading the checkout page. Please try again.</p>
          <Link href="/courses">
            <Button className="mt-4">Back to Courses</Button>
          </Link>
        </Card>
      </div>
    );
  }
};

export default CourseCheckout;
