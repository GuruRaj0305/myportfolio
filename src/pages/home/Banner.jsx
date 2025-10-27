import { useRef } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/dist/TextPlugin";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Button from "../../components/custom/Button";
import { HOME } from "../../data";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(TextPlugin, ScrollTrigger);

function Banner() {
  const bannerRef = useRef(null);
  const pRef = useRef(null);
  const buttonRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const BannerContainerRef = useRef(null);

useGSAP(() => {
  if (!pRef.current) return;

  const ctx = gsap.context(() => {
    const text = pRef.current.innerText;
    gsap.set(pRef.current, { text: "" });

    // 1️⃣ Scroll-trigger timeline (exists first, but doesn't overwrite)
    const scrollTL = gsap.timeline({
      scrollTrigger: {
        trigger: BannerContainerRef.current,
        start: "top top",
        end: "top+=600px",
        scrub: true,
        pin: true,
        pinSpacing: true,
      },
    });

    scrollTL.fromTo(
      [imageRef.current, contentRef.current],
      { x: 0, scale: 1, opacity: 1 }, // starting values
      { x: -100, scale: 1, opacity: 0, immediateRender: false } // prevent overwriting
    );

    // 2️⃣ Initial animation on top
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl
    .from(imageRef.current, { x: 100, opacity: 0, duration: 0.3 })
    .from("h1", { x: -50, opacity: 0, duration: 1 })
      .to(pRef.current, {
        duration: 2,
        text: { value: text, delimiter: "" },
        ease: "none",
        delay: 0.3,
      })
      .from(buttonRef.current, { y: -50, opacity: 0, duration: 0.8, ease: "bounce.out" })
      
  }, bannerRef);

  return () => ctx.revert();
}, []);


  return (
    <div>
      <section ref={bannerRef} className=" h-screen lg:min-h-[600px] flex justify-center align-bottom ">
        {/* <div className="min-h-[152px]"></div>  */}

        <div
          ref={BannerContainerRef}
          className="flex-1 flex flex-row-reverse max-h-[100%] items-end justify-center px-10 pt-[152px]"
        >
          <div
            ref={contentRef}
            className="flex-1 text-left max-w-[500px] w-full min-h-full flex items-center align-middle"
          >
            <div >
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
                Hi, I’m <span className="text-blue-400">Gururaj</span>
              </h1>
              <p ref={pRef} className="text-lg md:text-xl text-gray-300 mb-6">
                {HOME.banner.tagline}
              </p>

              <div ref={buttonRef}>
                <Button animation="filled" arrow="right" to="/projects">
                  View Projects
                </Button>
              </div>
            </div>
          </div>

          <div
            ref={imageRef}
            className="mt-10 md:mt-0 flex justify-center max-lg:hidden pr-10 max-h-[100%]"
          >
            <img
              src="/my-image.webp"
              alt="My Portrait"
              className="max-w-sm md:max-w-md lg:max-w-lg w-full max-h-auto object-contain drop-shadow-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Banner;
