import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Sprout, Heart, Sparkles, Award, Briefcase, ChevronRight, HelpCircle } from "lucide-react";
import { BrandConfig, Project } from "../types";

interface ProjectsProps {
  brandConfig: BrandConfig;
  ongoingProjects: Project[];
  onDonateClick: (cause: string) => void;
  onProjectDetailsClick: (project: Project) => void;
}

export default function Projects({ brandConfig, ongoingProjects, onDonateClick, onProjectDetailsClick }: ProjectsProps) {
  const [projectFilter, setProjectFilter] = useState("All");

  const filteredProjects = projectFilter === "All" 
    ? ongoingProjects 
    : ongoingProjects.filter(p => p.category === projectFilter || (projectFilter === "Welfare & Relief" && (p.category === "Relief" || p.category === "Animal Welfare")));

  return (
    <div className="pt-24 min-h-screen bg-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-green font-extrabold text-sm uppercase tracking-wider">Our Core Work</span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-brand-blue mt-2 mb-4">
            Campaigns & Projects
          </h1>
          <div className="w-16 h-1.5 bg-brand-green mx-auto rounded-full mb-6" />
          <p className="text-sm sm:text-base text-slate-500">
            Explore our specialized social projects. Each campaign represents an ongoing commitment supported actively by our decentralized collegiate grid chapters.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {["All", "Education", "Environment", "Animal Welfare", "Empowerment", "Relief", "Skill Development"].map((cat) => (
            <button
              key={cat}
              onClick={() => setProjectFilter(cat)}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 hover:scale-105 cursor-pointer ${
                projectFilter === cat
                  ? "bg-brand-blue text-white shadow-md shadow-brand-blue/15"
                  : "bg-white text-slate-600 hover:bg-slate-200 border border-slate-200/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p) => {
              const percentage = Math.round((p.fundsRaised / p.fundingGoal) * 100);
              return (
                <motion.article
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-slate-200 flex flex-col group h-full"
                  id={`project-card-${p.id}`}
                >
                  {/* Project Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/80 via-transparent to-transparent" />
                    
                    {/* Category Tag */}
                    <span className="absolute top-4 left-4 bg-brand-green text-white text-[10px] font-extrabold uppercase py-1 px-3 rounded-full tracking-wider shadow-md">
                      {p.category}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-1.5 rounded-lg bg-soft-green text-soft-green-text">
                        {p.icon}
                      </div>
                      <h3 className="font-heading font-extrabold text-lg sm:text-xl text-brand-blue group-hover:text-brand-green transition-colors leading-tight">
                        {p.title}
                      </h3>
                    </div>
                    
                    <p className="text-subtext text-xs sm:text-sm italic font-medium mb-3">
                      "{p.tagline}"
                    </p>
                    
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 flex-grow">
                      {p.description}
                    </p>

                    {/* Funding Target progress bar */}
                    <div className="border-t border-slate-100 pt-4 mt-auto">
                      <div className="flex justify-between text-[11px] font-bold text-slate-400 mb-1.5">
                        <span>Fund setup progress</span>
                        <span className="text-brand-blue">{percentage}% Complete</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-4">
                        <div
                          className="h-full bg-brand-green rounded-full transition-all duration-1000"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>

                      {/* Raised Metrics info */}
                      <div className="flex justify-between items-center text-xs mb-4 text-slate-500 font-semibold bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <div>
                          <p className="text-[10px] text-slate-400 block uppercase">Raised</p>
                          <p className="font-extrabold text-brand-blue">₹{p.fundsRaised.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-slate-400 block uppercase">Target Goal</p>
                          <p className="font-extrabold text-slate-700 font-mono">₹{p.fundingGoal.toLocaleString()}</p>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onProjectDetailsClick(p)}
                          className="flex-1 bg-slate-100 hover:bg-slate-200 text-brand-blue text-xs font-extrabold py-2.5 rounded-xl transition-colors text-center cursor-pointer"
                        >
                          Details & Roles
                        </button>
                        <button
                          onClick={() => onDonateClick(p.title)}
                          className="flex-1 bg-brand-green hover:bg-[#228f3b] text-white text-xs font-extrabold py-2.5 rounded-xl transition-colors text-center cursor-pointer shadow-md shadow-brand-green/10"
                        >
                          Pledge Support
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
