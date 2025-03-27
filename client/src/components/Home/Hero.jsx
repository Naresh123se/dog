import { Button } from "../ui/button";

export function Hero() {
  return (
    <section className="relative h-[80vh] overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover"
        style={{ filter: "brightness(0.7)" }}
      >
        <source
          src="https://videos.pexels.com/video-files/8731059/8731059-uhd_2560_1440_25fps.mp4"
          type="video/mp4"
        />
      </video>
      <div className="relative z-10 h-full bg-black bg-opacity-50">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <p className="text-6xl"> Give Your Pet the </p>Care They Deserve
            </h1>
            <p className="text-xl mb-8">
              Your trusted partner in providing exceptional care for your
              beloved pets
            </p>
            <Button className="py-2 rounded-full  hover:bg-opacity-90 ">
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
