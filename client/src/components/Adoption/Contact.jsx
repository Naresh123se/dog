import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  User,
  Mail,
  Phone,
  MessageCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { PawPrint } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useCompletePaymentQuery,
  useInitiatePaymentMutation,
} from "@/app/slices/dogApiSlice";

export default function Contact({ dogData }) {
  const dog = dogData || {
    id: "12345",
    name: "Max",
    breed: "Golden Retriever",
    age: "2 years",
    price: 1200,
    breederName: "Sarah Johnson",
  };
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const user = useSelector((state) => state.auth?.user?.role);
  const [submitted, setSubmitted] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [pidx, setPidx] = useState(null);
  const [initiatePayment, { isLoading }] = useInitiatePaymentMutation();
  const [paymentResult, setPaymentResult] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  // Check for pidx in URL on page load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pidxFromUrl = urlParams.get("pidx");
    if (pidxFromUrl) {
      setPidx(pidxFromUrl);
      setIsDialogOpen(true); // Open dialog when returning from payment
    }
  }, []);

  const {
    data: paymentData,
    isLoading: verifyLoading,
    error: verifyError,
  } = useCompletePaymentQuery(pidx, {
    skip: !pidx,
  });

  useEffect(() => {
    if (paymentData) {
      setPaymentResult(paymentData);
      if (paymentData.success) {
        setSubmitted(true);
        setShowSuccessPopup(true);
        toast.success("Payment Verified Successfully");
      } else {
        toast.error(paymentData.message || "Payment Verification Failed");
      }
    }
    if (verifyError) {
      setPaymentResult({
        success: false,
        message: verifyError?.data?.message || "Verification failed",
      });
      toast.error(verifyError?.data?.message || "Verification failed");
    }
  }, [paymentData, verifyError]);

  const handlePayment = async (data) => {
    try {
      // Add dog information to the payment data
      const paymentData = {
        ...data,
        dogId: dog.id,
        amount: dog.price,
      };

      const res = await initiatePayment(paymentData).unwrap();
      if (res.success) {
        // Redirect to Khalti payment page
        window.location.href = res?.payment_url;
      } else {
        toast.error(res?.message || "Could not initiate payment");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Payment Initiation Failed");
      console.error("Payment error:", error);
    }
  };

  const resetForm = () => {
    setPaymentResult(null);
    setPidx(null);
    setSubmitted(false);
    setShowSuccessPopup(false);
    reset();
    // Remove pidx from URL
    window.history.pushState({}, document.title, window.location.pathname);
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      {user === "user" ? (
        <DialogTrigger asChild>
          <Button
            onClick={(e) => {
              // No need to prevent default when using DialogTrigger
              // The DialogTrigger component handles opening the dialog
            }}
            className="w-full"
          >
            Contact & Adopt
          </Button>
        </DialogTrigger>
      ) : (
        <Button
          onClick={(e) => {
            e.preventDefault();
            toast.info("Please login first to adopt a pet");
          }}
          className="w-full"
        >
          Contact & Adopt
        </Button>
      )}
      <DialogContent className="sm:max-w-md">
        <ScrollArea className="max-h-[calc(100vh-8rem)]">
          {!submitted ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">Contact</DialogTitle>
                <DialogDescription>
                  Interested in adopting {dog.name}? Fill out this form to
                  contact the breeder.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-2">
                <div className="bg-white shadow-md rounded-2xl p-5 mb-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <PawPrint className="h-5 w-5 text-[#11A8C6]" />
                    Dog Details
                  </h3>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <p>
                      <span className="font-medium">Name:</span> {dog.name}
                    </p>
                    <p>
                      <span className="font-medium">Age:</span> {dog.age}
                    </p>
                    <p>
                      <span className="font-medium">Breed:</span> {dog.breed}
                    </p>
                    <p>
                      <span className="font-medium">Breeder:</span>{" "}
                      {dog.breederName}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-[#11A8C6] font-semibold text-base">
                    <span className="font-medium text-gray-700">Price:</span>{" "}
                    Rs. {dog.price}
                  </div>
                </div>

                {verifyLoading ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-indigo-600 mb-4" />
                    <p className="text-gray-600">Verifying your payment...</p>
                  </div>
                ) : (
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="name"
                          className="flex items-center gap-2"
                        >
                          <User size={16} /> Your Name
                        </Label>
                        <Input
                          id="name"
                          {...register("name", {
                            required: "Name is required",
                          })}
                          placeholder="Enter your full name"
                        />
                        {errors.name && (
                          <p className="text-sm text-red-500">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="flex items-center gap-2"
                        >
                          <Mail size={16} /> Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address",
                            },
                          })}
                          placeholder="Enter your email"
                        />
                        {errors.email && (
                          <p className="text-sm text-red-500">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="phone"
                          className="flex items-center gap-2"
                        >
                          <Phone size={16} /> Phone Number
                        </Label>
                        <Input
                          id="phone"
                          {...register("phone", {
                            required: "Phone number is required",
                            pattern: {
                              value: /^[0-9]{10,15}$/,
                              message: "Invalid phone number",
                            },
                          })}
                          placeholder="Enter your phone number"
                        />
                        {errors.phone && (
                          <p className="text-sm text-red-500">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="message"
                          className="flex items-center gap-2"
                        >
                          <MessageCircle size={16} /> Message
                        </Label>
                        <Textarea
                          id="message"
                          {...register("message")}
                          placeholder="Tell the breeder why you're interested in this dog and ask any questions you may have."
                          className="min-h-24"
                        />
                      </div>
                      <DialogFooter className="pt-4">
                        <Button
                          type="button"
                          // type="submit"
                          onClick={handleSubmit(handlePayment)}
                          disabled={isLoading}
                          className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            "Pay with Khalti"
                          )}
                        </Button>
                      </DialogFooter>
                    </div>
                  </form>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="inline-flex rounded-full bg-green-100 p-4 mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
              <p className="text-gray-600 mb-6">
                Your payment for {dog.name} has been processed. The breeder will
                be notified and will contact you shortly with next steps.
              </p>
              <div className="bg-blue-50 p-4 rounded-md text-left mb-6">
                <h3 className="font-medium text-blue-800 mb-1">
                  What happens next?
                </h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>The breeder will receive your contact information</li>
                  <li>They will reach out to arrange a meeting or delivery</li>
                  <li>You'll receive a confirmation email with all details</li>
                </ul>
              </div>
              <Button onClick={resetForm} variant="outline">
                Close
              </Button>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
