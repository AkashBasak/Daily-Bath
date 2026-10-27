import Image from "next/image";

const partnerLogos = [
  { name: "UMRA", src: "/logos/umra.svg", width: 181, height: 44 },
  { name: "EPA", src: "/logos/epa.svg", width: 121, height: 48 },
  { name: "ARISE", src: "/logos/arise.svg", width: 111, height: 44 },
];

// Callers set the alignment (justify-*) for each breakpoint.
export function PartnerLogos({ className = "" }: { className?: string }) {
  return (
    <ul
      aria-label="Partners and certifications"
      className={`flex flex-wrap items-center gap-x-[18.8px] gap-y-3 md:gap-x-[25px] min-[1800px]:gap-x-[37.6px] ${className}`}
    >
      {partnerLogos.map((logo) => (
        <li key={logo.name}>
          <Image
            src={logo.src}
            alt={logo.name}
            width={logo.width}
            height={logo.height}
            className="h-[22px] w-auto md:h-[29px] min-[1800px]:h-11"
          />
        </li>
      ))}
    </ul>
  );
}
