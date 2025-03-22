import { Heart, Users, Dog, Bone, Stethoscope, Scissors } from "lucide-react";
import { Button } from "../ui/button";

function ServiceCard({ icon: Icon, title, description, color }) {
  return (
    <div
      className="bg-white p-8 rounded-2xl shadow-lg text-center transform transition-all duration-300 
                hover:shadow-2xl hover:-translate-y-2 border-b-4 group relative overflow-hidden"
      style={{ borderColor: color }}
    >
      {/* Decorative background circle */}
      <div
        className="absolute -right-12 -top-12 h-40 w-40 rounded-full transform transition-all duration-500 group-hover:scale-150 opacity-10"
        style={{ backgroundColor: color }}
      ></div>

      <div className="flex justify-center mb-8 relative z-10">
        <div
          className="p-4 rounded-full group-hover:scale-110 transition-transform duration-300 shadow-md"
          style={{ backgroundColor: `${color}20` }}
        >
          {Icon && (
            <Icon
              style={{ color: color }}
              size={42}
              strokeWidth={1.75}
              className="transition-all duration-300 group-hover:rotate-12"
            />
          )}
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-4 text-gray-800 transition-colors duration-300 relative z-10 group-hover:tracking-wide">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed mb-6 relative z-10">
        {description}
      </p>
      <Button className="py-2 px-6 text-sm font-medium rounded-full text-white transition-all duration-300 relative z-10 hover:shadow-lg hover:scale-105">
        Learn More
      </Button>
    </div>
  );
}

export function Services() {
  // Color palette for service cards
  const colors = {
    grooming: "#8B5CF6", // Purple
    sitting: "#EC4899", // Pink
    training: "#3B82F6", // Blue
    walking: "#10B981", // Green
    diet: "#F59E0B", // Amber
    vet: "#EF4444", // Red
  };

  return (
    <section
      id="services"
      className="py-24 bg-gradient-to-b from-blue-50 to-white relative"
    >
      {/* Decorative elements with varied colors */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-purple-200 rounded-full opacity-50"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-green-200 rounded-full opacity-50"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-200 rounded-full opacity-50"></div>
      <div className="absolute bottom-1/3 left-3/4 w-20 h-20 bg-amber-200 rounded-full opacity-50"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-20">
          <span className="bg-indigo-100 text-indigo-800 font-semibold text-sm uppercase tracking-wider px-4 py-1 rounded-full mb-3 inline-block">
            Premium Pet Care
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className=" bg-clip-text ">
              Services For Your Furry Family
            </span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            We provide exceptional care and love for your pets with our range of
            professional services
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            icon={Scissors}
            title="Pet Grooming"
            description="Professional grooming services including bath, haircut, nail trimming, and styling to keep your pet looking and feeling their best."
            color={colors.grooming}
          />
          <ServiceCard
            icon={Heart}
            title="Pet Sitting"
            description="24/7 care and attention when you're away, including walks, playtime, feeding, and lots of love in a safe environment."
            color={colors.sitting}
          />
          <ServiceCard
            icon={Users}
            title="Dog Training"
            description="Personalized training programs with certified trainers to help your dog become a well-behaved and happy companion."
            color={colors.training}
          />
          <ServiceCard
            icon={Dog}
            title="Dog Walking"
            description="Regular exercise and outdoor adventures tailored to your dog's energy level, age, and specific needs for optimal health."
            color={colors.walking}
          />
          <ServiceCard
            icon={Bone}
            title="Pet Diet Planning"
            description="Customized nutrition plans designed by pet nutrition experts for optimal health, weight management, and wellness."
            color={colors.diet}
          />
          <ServiceCard
            icon={Stethoscope}
            title="Veterinary Care"
            description="Comprehensive health check-ups, preventative care, and professional medical attention when your pets need it most."
            color={colors.vet}
          />
        </div>
      </div>
    </section>
  );
}

export default Services;
