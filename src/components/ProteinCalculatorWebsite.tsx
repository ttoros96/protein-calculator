"use client";

import { useMemo, useState } from "react";

export default function ProteinCalculatorWebsite() {
  const [unit, setUnit] = useState<"kg" | "lb">("kg");
  const [weight, setWeight] = useState<string>("80");
  const [meals, setMeals] = useState<string>("4");
  const [bodyFat, setBodyFat] = useState<string>("25");

  const leanMass = useMemo(() => {
    const parsedWeight = Number(weight);
    const parsedBodyFat = Number(bodyFat);
    if (!parsedWeight || parsedWeight <= 0) return 0;
    if (parsedBodyFat < 0 || parsedBodyFat >= 100) return parsedWeight;
    return Math.round(parsedWeight * (1 - parsedBodyFat / 100));
  }, [weight, bodyFat]);

  const dailyProtein = useMemo(() => {
    if (!leanMass || leanMass <= 0) return 0;
    const multiplier = unit === "kg" ? 2 : 1;
    return Math.round(leanMass * multiplier);
  }, [leanMass, unit]);

  const proteinPerMeal = useMemo(() => {
    const parsedMeals = Number(meals);
    if (!parsedMeals || parsedMeals <= 0) return 0;
    return Math.round(dailyProtein / parsedMeals);
  }, [dailyProtein, meals]);

  const nextStepTip =
    "Protein matters, but fat loss also depends on calories, training, daily movement, recovery, and consistency over time.";

  const bodyFatGuide = [
    { label: "10–14%", note: "Lean", image: "/images/bodyfat/10-14.png" },
    { label: "15–19%", note: "Moderately lean", image: "/images/bodyfat/15-19.png" },
    { label: "20–24%", note: "Average", image: "/images/bodyfat/20-24.png" },
    { label: "25–29%", note: "Higher body fat", image: "/images/bodyfat/25-29.png" },
    { label: "30–34%", note: "Obese", image: "/images/bodyfat/30-34.png" },
    { label: "40%+", note: "Morbidly obese", image: "/images/bodyfat/40.png" },
  ];

  const selectBodyFat = (label: string) => {
    const firstNumber = parseInt(label.match(/\d+/)?.[0] || "0", 10);
    if (firstNumber > 0) setBodyFat(String(firstNumber));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-md px-4 py-4 sm:max-w-2xl sm:px-6 sm:py-8 lg:max-w-5xl lg:py-10">
        <div className="space-y-4 sm:space-y-6">
          <div className="space-y-3 text-center sm:text-left">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-[#2c2c2e] px-3 py-1 text-xs font-medium text-[#ff9f0a] shadow-sm sm:text-sm">
              Free Daily Protein Calculator
            </div>
            <h1 className="text-2xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Calculate your daily protein target.
            </h1>
            <p className="mx-auto max-w-2xl text-sm leading-6 text-[#8e8e93] sm:mx-0 sm:text-base sm:leading-7">
              Enter your weight, estimate your body fat, and get a lean-mass-based protein target in seconds.
            </p>
          </div>

          <div className="rounded-[2rem] bg-[#1c1c1e] p-4 shadow-2xl ring-1 ring-white/10 sm:p-6 md:p-8">
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-8">
              <div>
                <h2 className="text-xl font-semibold sm:text-2xl">Protein Calculator</h2>
                <p className="mt-2 text-sm leading-6 text-[#8e8e93]">
                  Use lean body mass to estimate your daily protein target and how much that is per meal.
                </p>

                <div className="mt-5 grid gap-4 sm:gap-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white">Weight</label>
                    <div className="grid grid-cols-[1fr_92px] gap-2">
                      <input
                        type="number"
                        min="1"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="w-full rounded-[1.25rem] border border-white/10 bg-[#2c2c2e] px-4 py-3 text-base text-white outline-none transition placeholder:text-[#8e8e93] focus:border-[#ff9f0a] focus:ring-2 focus:ring-[#ff9f0a]/20"
                        placeholder="Enter your weight"
                      />
                      <select
                        value={unit}
                        onChange={(e) => setUnit(e.target.value as "kg" | "lb")}
                        className="rounded-[1.25rem] border border-white/10 bg-[#2c2c2e] px-4 py-3 text-base text-white outline-none transition focus:border-[#ff9f0a] focus:ring-2 focus:ring-[#ff9f0a]/20"
                      >
                        <option value="kg">kg</option>
                        <option value="lb">lb</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <label className="block text-sm font-medium text-white">Body fat %</label>
                        <a
                          href="#body-fat-reference"
                          className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/10 bg-[#3a3a3c] text-[11px] font-bold text-[#ff9f0a] transition hover:border-[#ff9f0a]"
                          aria-label="Jump to body fat reference"
                          title="See body fat reference"
                        >
                          ?
                        </a>
                      </div>
                      <span className="text-xs text-[#8e8e93]">Use the reference cards</span>
                    </div>
                    <input
                      type="number"
                      min="0"
                      max="99"
                      value={bodyFat}
                      onChange={(e) => setBodyFat(e.target.value)}
                      className="w-full rounded-[1.25rem] border border-white/10 bg-[#2c2c2e] px-4 py-3 text-base text-white outline-none transition placeholder:text-[#8e8e93] focus:border-[#ff9f0a] focus:ring-2 focus:ring-[#ff9f0a]/20"
                      placeholder="Enter your body fat %"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-white">Meals per day</label>
                    <input
                      type="number"
                      min="1"
                      max="8"
                      value={meals}
                      onChange={(e) => setMeals(e.target.value)}
                      className="w-full rounded-[1.25rem] border border-white/10 bg-[#2c2c2e] px-4 py-3 text-base text-white outline-none transition placeholder:text-[#8e8e93] focus:border-[#ff9f0a] focus:ring-2 focus:ring-[#ff9f0a]/20"
                    />
                  </div>
                </div>

                <div className="mt-6 rounded-[1.75rem] bg-[#2c2c2e] p-4 text-white sm:p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#aeaeb2]">Your result</p>
                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                    <div className="rounded-[1.25rem] bg-white/5 p-3 sm:bg-transparent sm:p-0">
                      <p className="text-sm text-[#aeaeb2]">Estimated lean mass</p>
                      <p className="mt-1 text-3xl font-bold sm:text-4xl">{leanMass}{unit}</p>
                    </div>
                    <div className="rounded-[1.25rem] bg-white/5 p-3 sm:bg-transparent sm:p-0">
                      <p className="text-sm text-[#aeaeb2]">Daily protein target</p>
                      <p className="mt-1 text-3xl font-bold sm:text-4xl">{dailyProtein}g</p>
                    </div>
                    <div className="rounded-[1.25rem] bg-white/5 p-3 sm:col-span-2 sm:bg-transparent sm:p-0">
                      <p className="text-sm text-[#aeaeb2]">Protein per meal</p>
                      <p className="mt-1 text-3xl font-bold sm:text-4xl">{proteinPerMeal}g</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-[#aeaeb2]">
                    Based on your estimated lean mass after subtracting <span className="font-semibold text-[#ff9f0a]">{bodyFat}% body fat</span>, split over <span className="font-semibold text-[#ff9f0a]">{meals} meals per day</span>.
                  </p>
                </div>
              </div>

              <div id="body-fat-reference">
                <div className="mb-3 flex items-end justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold sm:text-xl">Body fat reference</h3>
                    <p className="mt-1 text-sm leading-6 text-[#8e8e93]">
                      Tap the closest visual match to auto-fill your body fat estimate.
                    </p>
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-white/10 bg-[#111113] p-3 sm:p-4">
                  <div className="grid grid-cols-2 gap-3">
                    {bodyFatGuide.map((item) => {
                      const isSelected = Number(bodyFat) >= parseInt(item.label) && Number(bodyFat) < parseInt(item.label) + 5;

                      return (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() => selectBodyFat(item.label)}
                          className={`overflow-hidden rounded-[1.25rem] border bg-[#2c2c2e] text-left transition ${
                            isSelected
                              ? "border-[#ff9f0a] ring-2 ring-[#ff9f0a]/30"
                              : "border-white/10 hover:border-white/25"
                          }`}
                        >
                          <div className="flex items-center justify-center bg-[#3a3a3c] p-3 text-center">
                            <img src={item.image} alt={item.label} className="w-full object-contain" />
                          </div>
                          <div className="border-t border-white/10 px-3 py-3 sm:px-4">
                            <p className="text-base font-bold text-[#ff9f0a] sm:text-lg">{item.label}</p>
                            <p className="mt-1 text-xs text-[#aeaeb2] sm:text-sm">{item.note}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-md px-4 pb-10 sm:max-w-2xl sm:px-6 sm:pb-16 lg:max-w-6xl">
        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8">
          <div className="space-y-5 lg:max-w-xl">
            <div className="rounded-[1.75rem] bg-[#1c1c1e] p-4 shadow-sm ring-1 ring-white/10 sm:p-6 md:p-8">
              <h3 className="text-xl font-semibold sm:text-2xl">What to do next</h3>
              <p className="mt-4 max-w-[42rem] text-[15px] leading-8 text-[#8e8e93] sm:mt-5 sm:text-base sm:leading-9">
                {nextStepTip}
              </p>
            </div>

            <div className="rounded-[1.75rem] bg-[#ff9f0a] p-4 text-black shadow-sm sm:p-6 md:p-8">
              <h3 className="text-xl font-semibold sm:text-2xl">Apply for 1 on 1 coaching</h3>
              <p className="mt-3 text-sm leading-7 text-black/80">
                If you want help losing fat, building better habits, and following a plan tailored to your body, DM me <span className="font-semibold text-black">&quot;FATLOSS&quot;</span> on Instagram.
              </p>
              <a
                href="https://www.instagram.com/haig_maz?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-[1.25rem] bg-black px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 sm:w-auto"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0"
                  fill="currentColor"
                >
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5Zm8.9 1.75a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 6.5A5.5 5.5 0 1 1 6.5 12 5.5 5.5 0 0 1 12 6.5Zm0 1.5A4 4 0 1 0 16 12a4 4 0 0 0-4-4Z" />
                </svg>
                <span>Apply for coaching</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
