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
              Give Your Pet the Care They Deserve
            </h1>
            <p className="text-xl mb-8">
              Your trusted partner in providing exceptional care for your
              beloved pets
            </p>
            <button className="bg-primary px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition duration-300">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
