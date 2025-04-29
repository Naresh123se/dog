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
  useCompletePaymentMutation,
  useInitiatePaymentMutation,
  useGetAllDogsQuery,
} from "@/app/slices/dogApiSlice";
import PedigreeCertificate from "./PedigreeCertificate";

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
  const [initiatePayment, { isLoading: isPaymentLoading }] =
    useInitiatePaymentMutation();
  const [completePayment, { isLoading: isVerifyLoading }] =
    useCompletePaymentMutation();
  const [paymentResult, setPaymentResult] = useState(null);
  const { refetch } = useGetAllDogsQuery();

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

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pidxFromUrl = urlParams.get("pidx");

    // Add early return if no pidx or already submitted
    if (!pidxFromUrl || submitted) return;

    setPidx(pidxFromUrl);
    setIsDialogOpen(true);
    handlePaymentVerification(pidxFromUrl);

    // Clean up URL after verification starts
    window.history.replaceState({}, document.title, window.location.pathname);
  }, [submitted]); // Add submitted as dependency

  const handlePaymentVerification = async (pidx) => {
    if (!pidx || submitted) return;
    try {
      const paymentData = await completePayment({
        pidx,
        dogId: dog?.id,
      }).unwrap();
      if (paymentData.success) {
        setPaymentResult(paymentData);
        setSubmitted(true);
        setShowSuccessPopup(true);
        toast.success("Payment Verified Successfully");
      } else {
        toast.error(paymentData.message || "Payment verification failed");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Payment verification failed");
    }
  };

  const handlePayment = async (data) => {
    try {
      const paymentData = {
        ...data,
        dogId: dog?.id,
        amount: dog.price,
      };

      const res = await initiatePayment(paymentData).unwrap();
      if (res.success) {
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
    window.history.pushState({}, document.title, window.location.pathname);
    setIsDialogOpen(false);
    refetch();
  };

  // Handle dialog open state change attempts
  const handleOpenChange = (open) => {
    // If trying to close and already submitted (success state), prevent auto-closing
    if (!open && submitted) {
      return; // Don't update the state, preventing dialog from closing
    }
    // Otherwise allow the dialog state to change
    setIsDialogOpen(open);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <div className="flex gap-10">
        {user === "user" && (
          <>
            <DialogTrigger asChild className="w-full">
              <Button className="w-full">Contact & Adopt</Button>
            </DialogTrigger>
            <PedigreeCertificate dog={dog} />
          </>
        )}
      </div>

      <div className=" flex  items-center gap-10">
        {user !== "user" && user !== "breeder" && (
          <>
            <Button
              onClick={(e) => {
                e.preventDefault();
                toast.info("Please login first to adopt a pet");
              }}
            >
              Contact & Adopt
            </Button>

            <PedigreeCertificate dog={dog} />
          </>
        )}
      </div>

      {user === "breeder" && <PedigreeCertificate dog={dog} />}

      <DialogContent
        className="sm:max-w-md"
        onInteractOutside={(e) => {
          // Prevent closing when clicking outside if in success state
          if (submitted) {
            e.preventDefault();
          }
        }}
        onEscapeKeyDown={(e) => {
          // Prevent closing on Escape key if in success state
          if (submitted) {
            e.preventDefault();
          }
        }}
      >
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
                      {dog.breederName?.name}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-[#11A8C6] font-semibold text-base">
                    <span className="font-medium text-gray-700">Price:</span>{" "}
                    Rs. {dog.price}
                  </div>
                </div>

                {isVerifyLoading ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-indigo-600 mb-4" />
                    <p className="text-gray-600">Verifying your payment...</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(handlePayment)}>
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
                          type="submit"
                          disabled={isPaymentLoading}
                          className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          {isPaymentLoading ? (
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
                </ul>
              </div>
              <Button onClick={resetForm} variant="">
                Close
              </Button>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
