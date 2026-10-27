import Image from "next/image";
import Link from "next/link";
import { RevealGroup } from "@/components/reveal-group";
import flowerBath from "@/assets/images/about/flower-bath.webp";
import labTeam from "@/assets/images/about/lab-team.png";

const aboutCopy =
  "Daily Bath is currently at an early brand-development stage. The brand name has been established, while its product portfolio, brand positioning, visual direction, and communication strategy are still being explored";

const partnerLogos = [
  { name: "UMRA", src: "/logos/umra.svg", width: 181, height: 44 },
  { name: "EPA", src: "/logos/epa.svg", width: 121, height: 48 },
  { name: "ARISE", src: "/logos/arise.svg", width: 111, height: 44 },
];

function PartnerLogos() {
  return (
    <ul
      aria-label="Partners and certifications"
      className="flex flex-wrap items-center justify-center gap-x-[18.8px] gap-y-3 md:justify-start md:gap-x-[25px] lg:justify-end min-[1800px]:gap-x-[37.6px]"
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

export function AboutSection() {
  return (
    <section aria-labelledby="about-heading" className="mt-12 overflow-x-clip px-3 md:mt-18 md:px-4 lg:mt-22 lg:px-6">
      <RevealGroup className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        {/* Photo with the overlapping brand card. */}
        <div data-reveal="left" className="relative aspect-[369/238] w-full md:aspect-[736/511] lg:aspect-[1038/736] lg:w-[55.45%]">
          <div className="absolute inset-y-0 left-0 w-[64.5%] md:w-[69.43%] lg:w-[70.9%]">
            <Image
              src={flowerBath}
              alt="Woman relaxing in a bath filled with fresh flowers"
              fill
              sizes="(min-width: 1024px) 40vw, (min-width: 768px) 70vw, 65vw"
              className="object-cover"
            />
          </div>

          <div
            style={{ transitionDelay: "150ms" }}
            data-reveal="left"
            className="absolute top-[16%] left-[29%] w-[71%] md:top-[27%] md:left-[43.07%] md:w-[52.72%] lg:top-[27.7%] lg:left-[41.7%] lg:w-[58.3%]"
          >
            <div className="group bg-secondary-500 p-3 text-white shadow-[0_7px_8px_rgba(145,145,145,0.1),0_29px_14.5px_rgba(145,145,145,0.09),0_66px_19.5px_rgba(145,145,145,0.05)] transition-[translate,box-shadow] duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_12px_16px_rgba(10,22,138,0.18),0_40px_40px_rgba(10,22,138,0.16),0_80px_60px_rgba(145,145,145,0.08)] focus-within:-translate-y-2 md:p-5 xl:p-6 min-[1600px]:p-8">
              <div className="flex flex-col items-start gap-4 md:gap-5 xl:gap-6 min-[1600px]:gap-8">
                <div className="flex flex-col gap-2 md:gap-3 xl:gap-4 min-[1600px]:gap-6">
                  <h2
                    id="about-heading"
                    className="font-display text-xl leading-7 font-bold md:text-2xl md:leading-8 xl:text-[32px] xl:leading-10 min-[1600px]:text-5xl min-[1600px]:leading-16"
                  >
                    About Us
                  </h2>
                  <p className="line-clamp-3 text-xs leading-[18px] md:line-clamp-none md:text-sm md:leading-5 xl:text-base xl:leading-6">
                    {aboutCopy}
                  </p>
                </div>
                <Link
                  href="/brand-story"
                  className="flex h-8 items-center justify-center rounded-full bg-white px-4 text-sm leading-5 font-semibold text-secondary-500 transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:text-base md:leading-6 xl:h-12 xl:px-8 xl:text-lg xl:leading-7"
                >
                  Learn More<span className="sr-only"> about Daily Bath</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Partner copy, logos and team photo. */}
        <div className="flex flex-col items-end gap-6 md:flex-row md:items-end md:justify-between lg:w-[26%] lg:flex-col lg:self-stretch lg:pt-12 min-[1600px]:pt-22">
          <div
            data-reveal="right"
            className="flex w-full flex-col items-center gap-3 text-center md:w-[379px] md:items-start md:gap-4 md:text-left lg:w-full lg:items-end lg:gap-6 lg:text-right"
          >
            <p className="text-xs leading-[18px] md:text-sm md:leading-5 lg:w-[89%] min-[1600px]:text-base min-[1600px]:leading-6">{aboutCopy}</p>
            <PartnerLogos />
          </div>

          <div data-reveal="right" style={{ transitionDelay: "150ms" }} className="relative size-[225px] shrink-0 lg:size-auto lg:aspect-square lg:w-[75.6%]">
            <Image
              src={labTeam}
              alt="Daily Bath team members holding flasks in a laboratory"
              fill
              sizes="(min-width: 1024px) 20vw, 225px"
              className="object-cover"
            />
          </div>
        </div>
      </RevealGroup>
    </section>
  );
}
