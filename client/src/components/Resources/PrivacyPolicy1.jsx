import { Lock, Bone, PawPrint, Dog } from "lucide-react";
import { Footer, Nav } from "../";

export default function PrivacyPolicy1() {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto p-6 mt-20">
        <div className="flex items-center gap-3 mb-8">
          <Lock className="w-8 h-8 text-[#4338CA]" />
          <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <p className="text-gray-600 mb-6">
            Effective Date: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              1. Information We Collect
            </h2>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start gap-3">
                <Bone className="w-5 h-5 mt-0.5 text-[#4338CA] flex-shrink-0" />
                <p>
                  <strong>Pet Information:</strong> Details about your dog(s)
                  including breed, age, and health information.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <PawPrint className="w-5 h-5 mt-0.5 text-[#4338CA] flex-shrink-0" />
                <p>
                  <strong>Purchase Data:</strong> Dog food, toys, and supplies
                  you order through our platform.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Dog className="w-5 h-5 mt-0.5 text-[#4338CA] flex-shrink-0" />
                <p>
                  <strong>Account Information:</strong> Your contact details and
                  preferences when you register.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                To provide personalized product recommendations for your dog
              </li>
              <li>
                To schedule and manage veterinary appointments (if applicable)
              </li>
              <li>To process orders for dog supplies and food</li>
              <li>
                To communicate with you about your account and pet care tips
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. Data Security</h2>
            <p className="text-gray-700">
              We implement strong security measures to protect your pet's
              information. All data is encrypted and stored securely.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              4. Third-Party Services
            </h2>
            <p className="text-gray-700">
              We may work with veterinary services, pet food suppliers, and
              groomers that may process your data. These services have their own
              privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. Your Rights</h2>
            <p className="text-gray-700">
              You can request access to or deletion of your pet's information at
              any time by contacting our support team.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
