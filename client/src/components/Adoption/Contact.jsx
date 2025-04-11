import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  User,
  Mail,
  Phone,
  MessageCircle,
  CreditCard,
  CheckCircle,
  Calendar,
  Shield,
} from "lucide-react";
import { PawPrint } from "lucide-react";
import { useSelector } from "react-redux";

export default function Contact({ dogData }) {
  // This would be passed from parent component
  const dog = dogData || {
    id: "12345",
    name: "Max",
    breed: "Golden Retriever",
    age: "2 years",
    price: 1200,
    breederName: "Sarah Johnson",
  };

  const user = useSelector((state) => state.auth?.user?.role);

  const [formStep, setFormStep] = useState("contact");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    agreeToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleCheckboxChange = (checked) => {
    setFormData({
      ...formData,
      agreeToTerms: checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the form submission and payment here
    setSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      agreeToTerms: false,
    });
    setFormStep("contact");
    setSubmitted(false);
  };

  return (
    <Dialog>
      {user === "user" && (
        <DialogTrigger asChild>
          <Button className=" w-full">Contact & Adopt</Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-md">
        {!submitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                {formStep === "contact"
                  ? "Contact Breeder"
                  : "Complete Adoption Payment"}
              </DialogTitle>
              <DialogDescription>
                {formStep === "contact"
                  ? `Interested in adopting ${dog.name}? Fill out this form to contact the breeder.`
                  : `Complete your payment to adopt ${dog.name}.`}
              </DialogDescription>
            </DialogHeader>

            {formStep === "contact" ? (
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
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User size={16} /> Your Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail size={16} /> Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone size={16} /> Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="flex items-center gap-2">
                    <MessageCircle size={16} /> Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell the breeder why you're interested in this dog and ask any questions you may have."
                    className="min-h-24"
                  />
                </div>
                <DialogFooter className="pt-4">
                  <Button
                    className="bg-green-600 hover:bg-green-700 w-full"
                    onClick={() => setFormStep("payment")}
                  >
                    Proceed to Payment
                  </Button>
                </DialogFooter>
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Payment Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="cardName"
                      className="flex items-center gap-2"
                    >
                      <User size={16} /> Name on Card
                    </Label>
                    <Input
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      placeholder="Enter name on card"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="cardNumber"
                      className="flex items-center gap-2"
                    >
                      <CreditCard size={16} /> Card Number
                    </Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <div className="relative">
                        <Input
                          id="expiryDate"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleChange}
                          placeholder="MM/YY"
                          required
                        />
                        <Calendar className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={handleCheckboxChange}
                    />
                    <label
                      htmlFor="agreeToTerms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the adoption terms and conditions
                    </label>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-md mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Adoption Fee for {dog.name}</span>
                      <span>${dog.price}.00</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Processing Fee</span>
                      <span>$25.00</span>
                    </div>
                    <div className="border-t pt-1 mt-1">
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>${dog.price + 25}.00</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-2">
                    <Shield size={16} /> Secure payment processing
                  </div>
                </CardContent>

                <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between px-6 pb-6">
                  <Button
                    variant="outline"
                    onClick={() => setFormStep("contact")}
                    className="sm:w-auto w-full"
                  >
                    Back
                  </Button>
                  <Button
                    className="bg-green-600 hover:bg-green-700 sm:w-auto w-full"
                    onClick={handleSubmit}
                    disabled={!formData.agreeToTerms}
                  >
                    Complete Purchase
                  </Button>
                </DialogFooter>
              </Card>
            )}
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
      </DialogContent>
    </Dialog>
  );
}
