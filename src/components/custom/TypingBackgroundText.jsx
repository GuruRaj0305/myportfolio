import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const TypingBackgroundText = ({ children }) => {
  const containerRef = useRef(null);
  const overAllContainerRef = useRef(null);
  const [displayText, setDisplayText] = useState("");

  const codeBlock = `
// memsnap.cpp  — dummy memory snapshot tool (harmless mock)
#include <iostream>
#include <vector>
#include <random>
#include <iomanip>
#include <chrono>
#include <thread>

struct Region {
    std::string name;
    uintptr_t start;
    size_t size;
    int rss_kb;
};

static std::mt19937 rng((unsigned)std::chrono::high_resolution_clock::now().time_since_epoch().count());

std::vector<Region> scanMockRegions() {
    std::uniform_int_distribution<int> small(4, 128);
    std::uniform_int_distribution<int> big(512, 8192);
    return {
        {".text", 0x400000, 0x1A000, small(rng)},
        {".data", 0x41A000, 0x03000, small(rng)},
        {"heap",  0x600000, big(rng) * 1024, big(rng)},
        {"stack", 0x7ffd0000, 0x8000, 32}
    };
}

void printHexDump(const std::vector<uint8_t>& buf, size_t cols = 16) {
    for (size_t i = 0; i < buf.size(); i += cols) {
        std::cout << std::hex << std::setw(8) << std::setfill('0') << i << "  ";
        for (size_t j = 0; j < cols; ++j) {
            if (i + j < buf.size()) std::cout << std::setw(2) << (int)buf[i + j] << ' ';
            else std::cout << "   ";
        }
        std::cout << " ";
        for (size_t j = 0; j < cols && i + j < buf.size(); ++j) {
            char c = (char)buf[i + j];
            std::cout << (isprint(c) ? c : '.');
        }
        std::cout << "\n";
    }
    std::cout << std::dec;
}

int main(int argc, char** argv) {
    std::cout << "memsnap v0.9.3 — Memory snapshot & hexdump (mock)\n";
    std::cout << "Scanning process memory regions...\n\n";

    auto regions = scanMockRegions();
    for (auto &r : regions) {
        std::cout << std::left << std::setw(10) << r.name
                  << " start=0x" << std::hex << r.start
                  << " size=" << std::dec << (r.size/1024) << "KB"
                  << " rss=" << r.rss_kb << "KB\n";
        std::this_thread::sleep_for(std::chrono::milliseconds(250));
    }

    std::cout << "\nPicking a random region and dumping 128 bytes...\n\n";
    std::vector<uint8_t> sample(128);
    for (auto &b : sample) b = (uint8_t)(rng() & 0xFF);

    printHexDump(sample);

    std::cout << "\nSnapshot complete. Use --export to save mock snapshot (not implemented).\n";
    return 0;
}

`;

  useGSAP(() => {
    const el = overAllContainerRef.current;
    if (!el) return;

    const letters = codeBlock.split("");
    const totalLetters = letters.length;

    setDisplayText("");

    const tween = gsap.to({}, {
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
      onUpdate() {
        // use "this" to access scrollTrigger safely
        const progress = this.scrollTrigger?.progress ?? 0;
        const letterCount = Math.floor(progress * totalLetters);
        setDisplayText(letters.slice(0, letterCount).join(""));
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [codeBlock, overAllContainerRef]);

  return (
    <div ref={overAllContainerRef} className="relative min-h-screen typing">
      <pre
        ref={containerRef}
        className="fixed top-0 left-0 w-full h-full text-left text-white/15 font-mono select-none whitespace-pre-wrap overflow-hidden z-0 pointer-events-none"
      >
        <div className="p-3 text-[9px] sm:text-[10px] md:text-[11px] lg:text-[11px]">{displayText}</div>
      </pre>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default TypingBackgroundText;
