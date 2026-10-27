"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { RevealGroup } from "@/components/reveal-group";
import mirrorShape from "@/assets/images/brand-story/philosophy-mirror.png";

// TODO(owner): each point uses the design's placeholder copy; replace with final descriptions.
const placeholderCopy =
  "Daily Bath is currently at an early brand-development stage. The brand name has been established, while its product portfolio, brand positioning, visual direction, and communication strategy are still being explored";

const principles = [
  { title: "Safe Ingredients", description: placeholderCopy },
  { title: "Effective Formulas", description: placeholderCopy },
  { title: "Ritual Based Skincare", description: placeholderCopy },
  { title: "Derma Experties", description: placeholderCopy },
];

export function PhilosophySection() {
  // The design shows the third point open by default.
  const [openIndex, setOpenIndex] = useState<number | null>(2);
  const baseId = useId();

  return (
    <section aria-labelledby="philosophy-heading" className="mt-11 overflow-x-clip px-3 md:mt-18 md:px-4 lg:mt-22 lg:px-10 min-[1600px]:px-20">
      <RevealGroup className="flex flex-col items-center gap-8 md:gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="flex w-full flex-col gap-6 md:gap-8 lg:w-[50.4%] lg:gap-16">
          <div className="flex flex-col gap-1 md:gap-2">
            <p className="text-xs leading-[18px] font-semibold text-primary-800 md:text-base md:leading-6 2xl:font-display 2xl:text-2xl 2xl:leading-8">
              Our Philosophy
            </p>
            <h2
              id="philosophy-heading"
              className="font-display text-xl leading-7 font-bold text-neutral-900 md:text-[40px] md:leading-12 lg:text-5xl lg:leading-14 2xl:text-7xl 2xl:leading-[88px]"
            >
              Freshness you Want Every Day
            </h2>
          </div>

          <ul className="flex flex-col gap-4 px-3 md:gap-8 md:px-8 lg:w-[90.4%]">
            {principles.map((item, index) => {
              const open = openIndex === index;
              const buttonId = `${baseId}-button-${index}`;
              const panelId = `${baseId}-panel-${index}`;
              return (
                <li
                  key={item.title}
                  className={`border-b pb-4 transition-colors duration-300 md:pb-6 2xl:pb-8 ${open ? "border-neutral-900" : "border-neutral-300"}`}
                >
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(open ? null : index)}
                      className="group flex w-full cursor-pointer items-start gap-2 rounded-sm text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 md:gap-5"
                    >
                      <span className="w-6 shrink-0 text-base leading-6 font-medium text-neutral-900 md:pt-0.5 md:font-display md:text-xl md:leading-7 lg:pt-1.5 2xl:pt-2.5">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`text-base leading-6 font-semibold decoration-primary-500 decoration-2 underline-offset-[6px] transition-colors duration-200 group-hover:text-primary-800 group-hover:underline group-focus-visible:text-primary-800 md:font-display md:text-2xl md:leading-8 md:font-bold lg:text-[32px] lg:leading-10 2xl:text-[40px] 2xl:leading-12 ${
                          open ? "text-neutral-900" : "text-neutral-600"
                        }`}
                      >
                        {item.title}
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    inert={!open}
                    className={`grid transition-[grid-template-rows,opacity] duration-400 ease-out ${
                      open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pt-2 pl-8 text-xs leading-[18px] text-neutral-600 md:max-w-[480px] md:pt-4 md:pl-11 md:text-base md:leading-6">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div data-reveal="enter-right" className="w-full md:w-[71%] lg:w-[45.5%]">
          <Image
            src={mirrorShape}
            alt="Woman in a towel turban blowing a kiss at her reflection"
            sizes="(min-width: 1024px) 45vw, (min-width: 768px) 71vw, 100vw"
            className="h-auto w-full"
          />
        </div>
      </RevealGroup>
    </section>
  );
}
