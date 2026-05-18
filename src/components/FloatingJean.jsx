import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const stitchShadow = '0 0 8px rgba(212,175,55,0.24), 0 1px 0 rgba(0,0,0,0.35)';

function StitchLine({ className = "", style = {} }) {
  return (
    <div
      className={`absolute border-raw-yellow/70 ${className}`}
      style={{ boxShadow: stitchShadow, ...style }}
    />
  );
}

function Rivet({ className = "" }) {
  return (
    <span className={`absolute h-1.5 w-1.5 rounded-full bg-raw-yellow shadow-[inset_0_1px_1px_rgba(255,255,255,0.55),0_0_10px_rgba(212,175,55,0.45)] ${className}`} />
  );
}

function FabricGrain() {
  return (
    <>
      <div className="absolute inset-0 opacity-45 mix-blend-screen bg-[repeating-linear-gradient(92deg,rgba(255,255,255,0.075)_0px,rgba(255,255,255,0.075)_1px,transparent_1px,transparent_4px)]"></div>
      <div className="absolute inset-0 opacity-30 mix-blend-multiply bg-[repeating-linear-gradient(2deg,rgba(0,0,0,0.16)_0px,rgba(0,0,0,0.16)_1px,transparent_1px,transparent_5px)]"></div>
      <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_22%_20%,rgba(255,255,255,0.16),transparent_17%),radial-gradient(circle_at_55%_48%,rgba(255,255,255,0.08),transparent_15%),radial-gradient(circle_at_45%_72%,rgba(0,0,0,0.28),transparent_21%)]"></div>
    </>
  );
}

function Fold({ className = "" }) {
  return (
    <div className={`absolute rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.18),rgba(0,0,0,0.24),transparent)] blur-[1px] ${className}`} />
  );
}

function SeamDepth({ className = "" }) {
  return (
    <div className={`absolute bg-[linear-gradient(90deg,rgba(0,0,0,0.42),rgba(255,255,255,0.13),rgba(0,0,0,0.18))] blur-[1px] ${className}`} />
  );
}

export default function FloatingJean({ className = "" }) {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(media.matches);

    const handleChange = () => setPrefersReduced(media.matches);
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className={`pointer-events-none absolute ${className}`} aria-hidden="true">
      <motion.div
        className="h-full w-full"
        animate={prefersReduced ? { y: 0, rotateY: -8, rotateZ: -2 } : { y: [0, -10, 0], rotateY: [-10, -2, -10], rotateZ: [-2, 0.5, -2] }}
        transition={prefersReduced ? { duration: 0 } : {
          y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
          rotateY: { duration: 9, repeat: Infinity, ease: "easeInOut" },
          rotateZ: { duration: 9, repeat: Infinity, ease: "easeInOut" }
        }}
        whileHover={{ scale: 1.025, rotateY: 4, rotateZ: 0 }}
        style={{ transformPerspective: 900, transformStyle: "preserve-3d" }}
      >
        <div className="relative h-full w-full drop-shadow-[0_42px_45px_rgba(0,0,0,0.45)]">
          <div className="absolute -inset-8 rounded-full bg-raw-yellow/10 blur-3xl"></div>
          <div className="absolute -inset-4 rounded-full bg-white/10 blur-2xl"></div>

          <div className="absolute left-[15%] right-[11%] top-[3%] h-[7%] overflow-hidden rounded-t-[32%] border border-white/15 bg-neutral-700 shadow-[inset_12px_0_26px_rgba(255,255,255,0.14),inset_-18px_0_34px_rgba(0,0,0,0.34),0_8px_18px_rgba(0,0,0,0.22)] dark:bg-neutral-600">
            <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(255,255,255,0.16),transparent_38%,rgba(0,0,0,0.32)_75%),radial-gradient(circle_at_25%_35%,rgba(255,255,255,0.28),transparent_22%),radial-gradient(circle_at_72%_45%,rgba(0,0,0,0.25),transparent_26%)]"></div>
            <FabricGrain />
            <StitchLine className="bottom-1 left-2 right-2 border-b" />
            <StitchLine className="left-[39%] top-0 h-full border-l" />
            <StitchLine className="left-[58%] top-0 h-full border-l" />
            <div className="absolute right-[28%] top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border border-neutral-900 bg-neutral-200 shadow-[0_0_14px_rgba(255,255,255,0.22)]">
              <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-700"></span>
            </div>
            <div className="absolute left-[27%] top-[34%] bg-raw-yellow px-1.5 py-0.5 text-[6px] font-bold uppercase tracking-widest text-black shadow-[0_0_12px_rgba(212,175,55,0.35)]">
              RAW
            </div>
          </div>

          {[20, 48, 76].map((left) => (
            <div
              key={left}
              className="absolute top-[1%] h-[11%] w-[6%] overflow-hidden rounded-sm border border-white/15 bg-neutral-700 shadow-[inset_4px_0_8px_rgba(255,255,255,0.1),inset_-4px_0_8px_rgba(0,0,0,0.35),0_4px_10px_rgba(0,0,0,0.2)] dark:bg-neutral-600"
              style={{ left: `${left}%` }}
            >
              <FabricGrain />
              <StitchLine className="left-1 top-1 h-[80%] border-l" />
              <StitchLine className="right-1 top-1 h-[80%] border-l" />
            </div>
          ))}

          <div
            className="absolute left-[10%] top-[9%] h-[87%] w-[43%] overflow-hidden rounded-b-[24%] bg-neutral-700 shadow-[inset_26px_0_36px_rgba(255,255,255,0.19),inset_-22px_0_36px_rgba(0,0,0,0.42),inset_0_-22px_28px_rgba(0,0,0,0.28),0_10px_24px_rgba(0,0,0,0.2)] dark:bg-neutral-600"
            style={{ clipPath: 'polygon(8% 0%, 98% 0%, 88% 100%, 20% 100%, 0% 30%)' }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(98deg,rgba(255,255,255,0.16),transparent_24%,rgba(0,0,0,0.34)_58%,rgba(255,255,255,0.14)_88%),radial-gradient(circle_at_44%_45%,rgba(255,255,255,0.22),transparent_19%),radial-gradient(circle_at_46%_78%,rgba(0,0,0,0.42),transparent_20%)]"></div>
            <FabricGrain />
            <SeamDepth className="left-[10%] top-[8%] h-[86%] w-3" />
            <SeamDepth className="right-[8%] top-[2%] h-[92%] w-3" />
            <StitchLine className="left-[12%] top-[9%] h-[84%] border-l" />
            <StitchLine className="right-[10%] top-[2%] h-[92%] border-l" />
            <StitchLine className="bottom-[4%] left-[15%] right-[10%] border-b" />
            <StitchLine className="bottom-[6%] left-[16%] right-[12%] border-b border-raw-yellow/35" />
            <div className="absolute left-[11%] top-[10%] h-[15%] w-[44%] rounded-br-[100%] border-b border-r border-raw-yellow/70"></div>
            <div className="absolute left-[15%] top-[13%] h-[8%] w-[24%] rounded-br-[100%] border-b border-r border-raw-yellow/60"></div>
            <Rivet className="left-[12%] top-[10%]" />
            <Rivet className="left-[44%] top-[12%]" />
            <div className="absolute left-[4%] top-[31%] h-9 w-3 rounded-sm bg-raw-yellow shadow-[0_0_14px_rgba(212,175,55,0.35)]"></div>
            <Fold className="left-[12%] top-[38%] h-5 w-[66%] rotate-[-16deg]" />
            <Fold className="left-[20%] top-[62%] h-6 w-[58%] rotate-[12deg]" />
            <Fold className="left-[8%] top-[77%] h-7 w-[76%] rotate-[-8deg]" />
            <div className="absolute left-[18%] top-[28%] h-[46%] w-[9%] rounded-full bg-white/10 blur-[7px]"></div>
            <div className="absolute right-[12%] top-[22%] h-[54%] w-[11%] rounded-full bg-black/22 blur-[8px]"></div>
            <div className="absolute bottom-[13%] left-[8%] h-[18%] w-[76%] rounded-[45%] bg-white/10 blur-[10px]"></div>
            <div className="absolute bottom-[5%] left-[12%] h-[8%] w-[78%] rounded-[45%] bg-black/30 blur-[8px]"></div>
          </div>

          <div
            className="absolute right-[8%] top-[9%] h-[87%] w-[44%] overflow-hidden rounded-b-[24%] bg-neutral-700 shadow-[inset_20px_0_34px_rgba(255,255,255,0.13),inset_-28px_0_42px_rgba(0,0,0,0.46),inset_0_-22px_28px_rgba(0,0,0,0.3),0_10px_24px_rgba(0,0,0,0.22)] dark:bg-neutral-600"
            style={{ clipPath: 'polygon(3% 0%, 92% 0%, 100% 32%, 82% 100%, 14% 100%)' }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(96deg,rgba(0,0,0,0.28),transparent_31%,rgba(255,255,255,0.18)_62%,rgba(0,0,0,0.38)_92%),radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.2),transparent_18%),radial-gradient(circle_at_50%_80%,rgba(0,0,0,0.44),transparent_18%)]"></div>
            <FabricGrain />
            <SeamDepth className="left-[11%] top-[2%] h-[92%] w-3" />
            <SeamDepth className="right-[12%] top-[9%] h-[84%] w-3" />
            <StitchLine className="left-[13%] top-[2%] h-[92%] border-l" />
            <StitchLine className="right-[14%] top-[9%] h-[84%] border-l" />
            <StitchLine className="bottom-[4%] left-[11%] right-[14%] border-b" />
            <StitchLine className="bottom-[6%] left-[12%] right-[16%] border-b border-raw-yellow/35" />
            <div className="absolute right-[11%] top-[10%] h-[15%] w-[42%] rounded-bl-[100%] border-b border-l border-raw-yellow/70"></div>
            <Rivet className="right-[12%] top-[10%]" />
            <div className="absolute left-[14%] top-[3%] h-[28%] w-[20%] rounded-b-full border-l border-r border-b border-raw-yellow/60"></div>
            <StitchLine className="left-[24%] top-[4%] h-[28%] border-l" />
            <Fold className="right-[14%] top-[36%] h-5 w-[62%] rotate-[14deg]" />
            <Fold className="right-[16%] top-[61%] h-6 w-[58%] rotate-[-12deg]" />
            <Fold className="right-[9%] top-[78%] h-7 w-[76%] rotate-[7deg]" />
            <div className="absolute left-[20%] top-[24%] h-[52%] w-[9%] rounded-full bg-black/20 blur-[8px]"></div>
            <div className="absolute right-[18%] top-[30%] h-[45%] w-[10%] rounded-full bg-white/10 blur-[7px]"></div>
            <div className="absolute bottom-[14%] right-[8%] h-[18%] w-[76%] rounded-[45%] bg-white/10 blur-[10px]"></div>
            <div className="absolute bottom-[5%] right-[12%] h-[8%] w-[76%] rounded-[45%] bg-black/32 blur-[8px]"></div>
          </div>

          <div className="absolute left-[40%] top-[10%] h-[83%] w-[20%] bg-[linear-gradient(90deg,transparent,rgba(0,0,0,0.5),transparent)] blur-[3px]"></div>
          <StitchLine className="left-[48.5%] top-[13%] h-[78%] border-l border-raw-yellow/55" />
          <div className="absolute left-[31%] top-[13%] h-[16%] w-[34%] rounded-b-full border-b border-raw-yellow/40 shadow-[inset_0_-10px_12px_rgba(0,0,0,0.24)]"></div>
          <div className="absolute left-[26%] right-[20%] bottom-[1%] h-8 rounded-[50%] bg-black/35 blur-[12px]"></div>
          <div className="absolute left-[24%] right-[18%] bottom-[-2%] h-5 rounded-[50%] bg-raw-yellow/10 blur-[16px]"></div>
        </div>
      </motion.div>
    </div>
  );
}
