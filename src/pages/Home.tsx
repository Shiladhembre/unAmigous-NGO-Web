import React from "react";
import { motion } from "motion/react";
import { Heart, ArrowRight, ShieldCheck, Award, HeartHandshake } from "lucide-react";
import { BrandConfig } from "../types";

interface HomeProps {
  brandConfig: BrandConfig;
  onDonateClick: (cause: string) => void;
  onVolunteerClick: (project: string) => void;
  onNavigate: (page: string) => void;
}

export default function Home({ brandConfig, onDonateClick, onVolunteerClick, onNavigate }: HomeProps) {
  const { customName, customSubtitle, customHeroImage } = brandConfig;

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center bg-gradient-to-br from-indigo-950 via-brand-blue to-dark-blue overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Background photo overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={customHeroImage}
            alt="NGO volunteers and underprivileged children smiling happy"
            className="w-full h-full object-cover object-center opacity-35 transform scale-105 animate-pulse-slow"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-blue via-brand-blue/70 to-indigo-950/60" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-16">
          <div className="lg:col-span-8 text-left">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-green/20 border border-brand-green/30 text-emerald-400 font-extrabold text-[10px] sm:text-xs tracking-wider uppercase mb-6"
            >
              <Heart className="w-3.5 h-3.5" /> Registered Non-Profit Foundation
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-heading font-extrabold text-4xl sm:text-6.5xl md:text-7xl tracking-tight mb-6 text-white leading-tight"
            >
              {customName} {customSubtitle}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-sans text-sm sm:text-base md:text-lg text-slate-200 max-w-2xl leading-relaxed mb-10 font-medium"
            >
              Bridging opportunities for underserved baseline children, carrying forward active afforestation, stray dog medical treatments, and women tailors' vocational livelihoods.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-start items-center"
            >
              <button
                id="hero-donate-trigger"
                onClick={() => onDonateClick("General Fund")}
                className="w-full sm:w-auto bg-brand-green hover:bg-[#228f3b] text-white font-extrabold text-xs sm:text-sm py-3 px-8 rounded-full shadow-lg shadow-brand-green/30 transition-all flex items-center justify-center gap-2 cursor-pointer scale-100 active:scale-95"
              >
                Support Our Work Now <ArrowRight className="w-4 h-4" />
              </button>
              <button
                id="hero-explore-projects"
                onClick={() => onNavigate("projects")}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs sm:text-sm py-3 px-8 rounded-full transition-all text-center cursor-pointer"
              >
                Explore Active Campaigns
              </button>
            </motion.div>
          </div>

          <div className="lg:col-span-4 hidden lg:block">
            {/* Action Mini Panel */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white/10 backdrop-blur-md border border-white/15 p-6 rounded-3xl text-white shadow-2xl space-y-5"
            >
              <h3 className="font-heading font-extrabold text-lg text-emerald-400">Make an Instant Impact</h3>
              <p className="text-[11px] text-slate-200 leading-normal">
                Join our decentralized collegiate grid in standard, easy remote or physical actions.
              </p>
              
              <div className="space-y-3">
                <div className="flex gap-3 bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 font-bold self-start">₹</div>
                  <div>
                    <h4 className="text-xs font-bold">100% Direct Redistribution</h4>
                    <p className="text-[10px] text-slate-300">Audited seedballs, textbooks, feed, and medical vests.</p>
                  </div>
                </div>

                <div className="flex gap-3 bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                  <HeartHandshake className="w-5 h-5 text-emerald-400 shrink-0 self-start mt-1" />
                  <div>
                    <h4 className="text-xs font-bold">Earn Certification</h4>
                    <p className="text-[10px] text-slate-300">Formally registered field internship & volunteer records.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate("volunteer")}
                  className="w-full bg-white text-brand-blue font-bold text-xs py-3 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  Apply to Volunteer
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Welcome & Mission Statement Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-12 h-12 bg-emerald-50 text-brand-green rounded-2xl flex items-center justify-center mx-auto mb-6 border border-emerald-100 shadow-sm"
          >
            <ShieldCheck className="w-6 h-6" />
          </motion.div>
          
          <h2 className="font-heading font-extrabold text-3xl sm:text-4.5xl text-brand-blue tracking-tight mb-6">
            Welcome to {customName}
          </h2>
          
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-semibold max-w-3xl mx-auto mb-10">
            We believe that local, incremental drives powered by enthusiastic, dedicated college volunteers are the true spark for community-level revolution. We run transparent campaigns across multiple sectors, focused purely on practical action and 100% auditing transparency.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mt-16">
            <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl">
              <span className="text-2xl font-black text-brand-green">01.</span>
              <h3 className="font-heading font-bold text-brand-blue text-sm uppercase tracking-wider mt-2 mb-1.5">Foundational Primary</h3>
              <p className="text-xs text-slate-400 leading-normal">
                Setting up robust, playful, non-formal study classrooms directly inside slums and remote grids.
              </p>
            </div>
            <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl">
              <span className="text-2xl font-black text-brand-green">02.</span>
              <h3 className="font-heading font-bold text-brand-blue text-sm uppercase tracking-wider mt-2 mb-1.5">Action Greening</h3>
              <p className="text-xs text-slate-400 leading-normal">
                Deploying geolocated seedballs and intensive seedling monitoring to combat urban forest degradation.
              </p>
            </div>
            <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl">
              <span className="text-2xl font-black text-brand-green">03.</span>
              <h3 className="font-heading font-bold text-brand-blue text-sm uppercase tracking-wider mt-2 mb-1.5">Stray Animal Security</h3>
              <p className="text-xs text-slate-400 leading-normal">
                Executing anti-rabies defense camps, stray animal first aid grids, and high-visibility safety collars.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple CTA banner */}
      <section className="py-20 bg-slate-50 border-t border-b border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-green/5 rounded-full filter blur-[80px]" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Award className="w-12 h-12 text-brand-green mx-auto mb-4" />
          <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-blue mb-3">Our Platform Has Split Into Dynamic Separate Pages!</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto mb-8 leading-relaxed">
            We have refined our interface with distinct chapters. Meet our core team on the <span className="text-brand-green font-bold cursor-pointer" onClick={() => onNavigate("about")}>About Us</span> page, or study active donation funding targets on the <span className="text-brand-green font-bold cursor-pointer" onClick={() => onNavigate("projects")}>Projects</span> center.
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => onNavigate("projects")}
              className="bg-brand-blue hover:bg-brand-blue/90 text-white font-bold text-xs py-2.5 px-6 rounded-lg transition-colors cursor-pointer"
            >
              Browse Projects
            </button>
            <button
              onClick={() => onNavigate("volunteer")}
              className="bg-brand-green hover:bg-[#228f3b] text-white font-bold text-xs py-2.5 px-6 rounded-lg transition-colors cursor-pointer"
            >
              Become a Volunteer
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
