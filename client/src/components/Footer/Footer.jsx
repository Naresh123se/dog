import { Mail, MapPin, Phone, Dog } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-900 text-white pt-16 pb-8 px-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Link to="/" className="flex items-center mb-6 text-[#018F98]">
                <Dog className="w-8 h-8" />
                <span className="ml-2 text-xl font-bold">PETS</span>
              </Link>
              <p className="text-gray-400">
                Your trusted companion in pet care, providing everything you
                need for your furry friends.
              </p>
            </div>
            <div className="lg:ml-10">
              <h3 className="text-lg font-semibold mb-2 ">Quick Link</h3>

              <div className=" flex flex-col  items-start space-y-2">
                <Link to="/" className="text-gray-400 hover:text-gray-100">
                  Home
                </Link>
                <Link to="/breed" className="text-gray-400 hover:text-gray-100">
                  Breeds
                </Link>
                <Link to="/blog" className="text-gray-400 hover:text-gray-100">
                  Blog
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 ">Resources</h3>
              <div className=" flex flex-col  items-start space-y-2">
                <Link to="/terms" className="text-gray-400 hover:text-gray-100">
                  Terms of Service
                </Link>
                <Link
                  to="/privacy"
                  className="text-gray-400 hover:text-gray-100"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/support"
                  className="text-gray-400 hover:text-gray-100"
                >
                  Support
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 ">Quick Link</h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Nepal, Kathmandu
                </li>
                <li className="flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  +1 (555) 987-6543
                </li>
                <li className="flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  support@pets.com
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 PETS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
