import React, { useState, useEffect } from "react";
import { Users, Sprout, HeartHandshake, Briefcase, Heart, BookOpen, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { BrandConfig } from "../types";

interface ImpactProps {
  brandConfig: BrandConfig;
  onDonateClick: (cause: string) => void;
}

export default function Impact({ brandConfig, onDonateClick }: ImpactProps) {
  const [stats, setStats] = useState({
    beneficiaries: 0,
    trees: 0,
    volunteers: 0,
    interns: 0,
    animals: 0,
  });

  useEffect(() => {
    // Simulate count tick
    const timer = setTimeout(() => {
      setStats({
        beneficiaries: 52430,
        trees: 16820,
        volunteers: 5120,
        interns: 2450,
        animals: 12390,
      });
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const [calculatorMultiplier, setCalculatorMultiplier] = useState(1500); // Default ₹1500
  const [calculatorCause, setCalculatorCause] = useState<"Bachpanshala" | "Prakriti" | "Jeev" | "Udaan">("Bachpanshala");

  const getImpactDetails = () => {
    const value = calculatorMultiplier;
    switch (calculatorCause) {
      case "Bachpanshala":
        return {
          metric: Math.floor(value / 1500),
          action: "Underprivileged Child's primary education, school kit, uniforms, and digital tutorials supported for exactly 1 school year.",
          label: "Children Educated"
        };
      case "Prakriti":
        return {
          metric: Math.floor(value / 150),
          action: "Eco-saplings planted with structural compost, moisture-protect geo-tags, and continuous volunteer weeding care for 1 year.",
          label: "Trees Planted"
        };
      case "Jeev":
        return {
          metric: Math.floor(value / 80),
          action: "Freshly cooked warm rice, meat/broth feed packages, emergency basic bandage dressing, and community anti-rabies defense vaccine doses.",
          label: "Street Animals Fed"
        };
      case "Udaan":
        return {
          metric: Math.floor(value / 500),
          action: "Comprehensive sanitary hygiene kit supply sets, vocational machine sewing certification material grids, and health screening camps.",
          label: "Women Empowered"
        };
    }
  };

  const impactValue = getImpactDetails();

  return (
    <div className="pt-24 min-h-screen bg-dark-blue text-white relative overflow-hidden">
      {/* Decorative backdrop */}
      <div className="absolute -bottom-40 -right-20 w-96 h-96 bg-brand-blue/10 rounded-full filter blur-[120px]" />
      <div className="absolute top-1/2 left-10 w-80 h-80 bg-brand-green/10 rounded-full filter blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-green font-extrabold text-sm uppercase tracking-wider">Quantifiable Change</span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-white tracking-tight mt-1 mb-4">
            Our Measured Social Impact
          </h1>
          <div className="w-16 h-1.5 bg-brand-green mx-auto rounded-full mb-4" />
          <p className="text-sm sm:text-base text-slate-350">
            Every coordinate. Every sapling planted. Every single meal count logged is a result of structural dedication.
          </p>
        </div>

        {/* High Energy Statistic Grid Card */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 mb-20">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center transform hover:scale-105 hover:bg-white/10 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-brand-green/10 mx-auto flex items-center justify-center mb-4 text-brand-green">
              <Users className="w-6 h-6" />
            </div>
            <p className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
              {stats.beneficiaries ? stats.beneficiaries.toLocaleString() + "+" : "50,000+"}
            </p>
            <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wide mt-1">Beneficiaries Helped</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center transform hover:scale-105 hover:bg-white/10 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-brand-green/10 mx-auto flex items-center justify-center mb-4 text-brand-green">
              <Sprout className="w-6 h-6" />
            </div>
            <p className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
              {stats.trees ? stats.trees.toLocaleString() + "+" : "15,000+"}
            </p>
            <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wide mt-1">Trees Planted</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center transform hover:scale-105 hover:bg-white/10 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-brand-green/10 mx-auto flex items-center justify-center mb-4 text-brand-green">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <p className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
              {stats.volunteers ? stats.volunteers.toLocaleString() + "+" : "5,000+"}
            </p>
            <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wide mt-1">Active Volunteers</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center transform hover:scale-105 hover:bg-white/10 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-brand-green/10 mx-auto flex items-center justify-center mb-4 text-brand-green">
              <Briefcase className="w-6 h-6" />
            </div>
            <p className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
              {stats.interns ? stats.interns.toLocaleString() + "+" : "2,500+"}
            </p>
            <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wide mt-1">Interns Trained</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center transform hover:scale-105 hover:bg-white/10 transition-all duration-300 col-span-2 md:col-span-1">
            <div className="w-12 h-12 rounded-full bg-brand-green/10 mx-auto flex items-center justify-center mb-4 text-brand-green">
              <Heart className="w-6 h-6 animate-pulse" />
            </div>
            <p className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
              {stats.animals ? stats.animals.toLocaleString() + "+" : "10,000+"}
            </p>
            <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wide mt-1">Animals Fed</p>
          </div>
        </div>

        {/* Interactive Impact Estimator Slider widget */}
        <div className="bg-brand-blue/30 border border-brand-blue/40 rounded-3xl p-6 sm:p-10 max-w-4xl mx-auto relative overflow-hidden mb-16" id="impact-estimator">
          <div className="absolute top-0 right-0 py-1.5 px-4 bg-brand-green text-white rounded-bl-2xl text-[10px] sm:text-xs font-bold uppercase tracking-wider">
            Interactive Estimator
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-heading font-bold text-xl sm:text-2xl mb-2 text-brand-green">See Your Impact Live</h3>
              <p className="text-slate-350 text-xs leading-relaxed mb-6">
                Pick an ongoing campaign underneath and drag the donation slider. Let's see how capital budget inputs are converted directly into physical goods.
              </p>

              {/* Choose target */}
              <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">1. Choose a target cause</span>
              <div className="grid grid-cols-2 gap-2 mb-6">
                {[
                  { key: "Bachpanshala", title: "Primary Education" },
                  { key: "Prakriti", title: "Tree Afforestation" },
                  { key: "Jeev", title: "Stray Animal Care" },
                  { key: "Udaan", title: "Women Tailoring" }
                ].map((cause) => (
                  <button
                    key={cause.key}
                    onClick={() => setCalculatorCause(cause.key as any)}
                    className={`text-slate-200 text-xs py-2.5 px-3 border rounded-xl text-center transition-all cursor-pointer ${
                      calculatorCause === cause.key
                        ? "bg-slate-900 border-brand-green text-brand-green font-bold"
                        : "border-white/15 hover:border-white/35 bg-white/5"
                    }`}
                  >
                    {cause.title}
                  </button>
                ))}
              </div>

              {/* Slider */}
              <div className="flex justify-between items-center text-xs text-slate-400 font-bold mb-1">
                <span>2. Slip your donor value</span>
                <span className="text-brand-green text-lg font-bold">₹{Number(calculatorMultiplier).toLocaleString("en-IN")} INR</span>
              </div>
              <input
                type="range"
                min="500"
                max="20000"
                step="500"
                value={calculatorMultiplier}
                onChange={(e) => setCalculatorMultiplier(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-green mb-2"
              />
              <div className="flex justify-between text-[9px] text-slate-500 font-bold">
                <span>₹500 Original</span>
                <span>₹20,000 Support Cap</span>
              </div>
            </div>

            {/* Live Output Banner card */}
            <div className="bg-slate-950/65 border border-slate-800 p-6 rounded-2xl flex flex-col items-center text-center justify-center relative min-h-[220px]">
              <div className="absolute top-3 left-4 text-[9.5px] uppercase font-bold text-slate-500 tracking-wider">
                Audited Redistribution Estimate
              </div>

              <div className="w-16 h-16 rounded-full bg-brand-green/10 flex items-center justify-center mb-3 text-brand-green">
                {calculatorCause === "Bachpanshala" && <BookOpen className="w-8 h-8" />}
                {calculatorCause === "Prakriti" && <Sprout className="w-8 h-8" />}
                {calculatorCause === "Jeev" && <Heart className="w-8 h-8" />}
                {calculatorCause === "Udaan" && <Sparkles className="w-8 h-8" />}
              </div>

              <div className="animate-bounce">
                <p className="text-4xl sm:text-5xl font-extrabold text-brand-green font-heading">
                  {impactValue?.metric}
                </p>
                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-1 mb-3">
                  {impactValue?.label}
                </p>
              </div>

              <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
                {impactValue?.action}
              </p>

              <button
                onClick={() => onDonateClick(calculatorCause === "Bachpanshala" ? "Project Bachpanshala" : calculatorCause === "Prakriti" ? "Project Prakriti" : calculatorCause === "Jeev" ? "Project Jeev" : "Project Udaan")}
                className="mt-5 bg-brand-green hover:bg-[#228f3b] text-white font-extrabold text-xs py-2.5 px-6 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-brand-green/20"
              >
                Execute This Donation <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Accountability Details Grid */}
        <section className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-10 mb-8">
          <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-center text-brand-green mb-8">How We Guarantee Audited Security</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-slate-900/40 p-5 rounded-2xl border border-white/5">
              <ShieldCheck className="w-8 h-8 text-brand-green mb-3" />
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Geolocation Tracking</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Each native sapling is mapped using standard geo-moisture protocols, letting volunteers report tree survival rates directly back to the database map.</p>
            </div>
            <div className="bg-slate-900/40 p-5 rounded-2xl border border-white/5">
              <ShieldCheck className="w-8 h-8 text-brand-green mb-3" />
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Audit Distribution Logs</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Purchasing receipts of raw dog-rice supplies, school supplies and uniforms are uploaded, categorized, and sent directly to quarterly inbox newsletter subscribers.</p>
            </div>
            <div className="bg-slate-900/40 p-5 rounded-2xl border border-white/5">
              <ShieldCheck className="w-8 h-8 text-brand-green mb-3" />
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Collegiate Volunteers Validation</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Our verified students act as physical trust inspectors on site, physically checking that textbooks and hot packaging rice packs reach correct baseline pupils.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
