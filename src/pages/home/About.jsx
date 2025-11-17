import { useRef, forwardRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustommButton from "../../components/custom/Button";
import { useGSAP } from "@gsap/react";
import { HOME } from "../../data";

gsap.registerPlugin(ScrollTrigger);

const About = forwardRef((props, ref) => {
  const sectionRef = ref || useRef(null); // use forwarded ref if provided
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonRef = useRef(null);


  useGSAP(() => {
    const sectionEl = sectionRef.current;

    // Content animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionEl,
        start: "top 80%",// fire when ABOUT is really at center
        toggleActions: "restart none none none",
      },
    });

    tl.fromTo(
      headingRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
      .fromTo(
        paragraphRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.7"
      )
      .fromTo(
        buttonRef.current,
        { y: 20, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
        "-=0.5"
      );

    return () => {
      tl.scrollTrigger && tl.scrollTrigger.kill();
      tl.kill();
    };
  }, [sectionRef]);

  return (
    <section
      ref={sectionRef}
      id="hm-about"
      className="relative py-20 px-8 md:px-20 bg-[rgba(0,0,0,0.5)] text-white flex flex-col items-center justify-end text-center rounded-xl shadow-lg"
    >
      <h2
        ref={headingRef}
        className="text-4xl md:text-5xl font-extrabold mb-6 tracking-wide"
      >
        About Me
      </h2>
      <p
        ref={paragraphRef}
        className="text-gray-300 text-lg md:text-xl max-w-3xl leading-relaxed mb-10"
      >
        {HOME.about}
      </p>

      <div ref={buttonRef}>
        <CustommButton to="/about" liftOnHover={false}>
          View More
        </CustommButton>
      </div>
    </section>
  );
});

export default About;
