import React from "react";
import { Heart, Sprout, Check, Award, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";
import { BrandConfig, Testimonial } from "../types";

interface AboutProps {
  brandConfig: BrandConfig;
  testimonials: Testimonial[];
  onVolunteerClick: () => void;
}

export default function About({ brandConfig, testimonials, onVolunteerClick }: AboutProps) {
  const { customName, customSubtitle, customAboutImage } = brandConfig;

  return (
    <div className="pt-24 min-h-screen bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Page Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-green font-extrabold text-sm uppercase tracking-wider">Get to Know Us</span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-brand-blue mt-2 mb-4">
            About {customName}
          </h1>
          <div className="w-16 h-1.5 bg-brand-green mx-auto rounded-full mb-6" />
          <p className="text-sm sm:text-base text-slate-500">
            A deep-dive into our core mission, foundational values, and the youthful spirit coordinating physical on-ground welfare.
          </p>
        </div>

        {/* Brand Mission & Image Grid Section */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 shadow-md border border-slate-100 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Image with details overlay */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-4 bg-brand-green/10 rounded-[2.5rem] transform -rotate-1.5 -z-10" />
              <div className="absolute inset-0 bg-brand-blue/5 rounded-[2.5rem] transform rotate-1 -z-10" />
              
              <img
                src="1747514074417.jpg"
                alt="Volunteers smiling as a team"
                className="w-full h-[380px] sm:h-[450px] object-cover rounded-[2rem] shadow-xl relative z-10"
                referrerPolicy="no-referrer"
              />

              {/* Float Badge */}
              <div className="absolute -bottom-6 -right-4 bg-[#002244] border border-blue-900/40 p-5 rounded-2xl z-20 text-white shadow-xl max-w-[200px]">
                <p className="text-3xl font-extrabold text-brand-green font-heading">5+ Years</p>
                <p className="text-slate-300 text-[10px] mt-1 leading-snug">
                  Of continuous grass-root social rehabilitation and welfare drives.
                </p>
              </div>
            </div>

            {/* Right Column: Dynamic about parameters */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="text-brand-green font-extrabold text-xs uppercase tracking-wider mb-2">Our Roots</span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-4.5xl text-brand-blue tracking-tight mb-6 leading-tight">
                Rooted in Compassion, <br />Powered entirely by Youth.
              </h2>
              
              <p className="text-slate-600 leading-relaxed mb-6 text-xs sm:text-sm">
                Established as a vision for on-ground change, <strong>{customName} {customSubtitle}</strong> is a registered non-governmental organization committed to cultivating a responsible, supportive, and conscious community. Driven majorly by collegiate change leaders, we mobilize physical networks to serve society where help is needed immediately.
              </p>

              {/* Mission & Vision cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
                <div className="p-5 bg-[#F3F4F6] rounded-2xl border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green mb-3">
                    <Heart className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-base text-brand-blue mb-2.5">Our Mission</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    To touch leaves, safeguard nature, feed street animals, and empower marginalized backgrounds through physical setups and youth leadership directories.
                  </p>
                </div>

                <div className="p-5 bg-[#F3F4F6] rounded-2xl border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green mb-3">
                    <Sprout className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-base text-brand-blue mb-2.5">Our Vision</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    To build a cohesive setup where citizens actively coordinate compost measures, children enjoy free study circles, and animal welfare is regularized.
                  </p>
                </div>
              </div>

              {/* Mini trust markers */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-x-8 gap-y-3 text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-brand-green" /> Government Registered NGO</span>
                <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-brand-green" /> 80G Tax Exemption Certified</span>
                <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-brand-green" /> 100% Audited Funds Flow</span>
              </div>
            </div>

          </div>
        </section>

        {/* Core Pillars / Value Section */}
        <section className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-blue">Our Core Guiding Values</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">What drives us every single day to be the change we want to see.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-brand-green/30 transition-all text-center">
              <div className="w-12 h-12 bg-indigo-50 text-brand-blue rounded-xl flex items-center justify-center mx-auto mb-4 font-bold text-lg">01</div>
              <h4 className="font-heading font-extrabold text-slate-800 text-sm mb-2 uppercase tracking-wide">Extreme Transparency</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Regular physical distribution audit posts and visual metrics reporting to all subscribers.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-brand-green/30 transition-all text-center">
              <div className="w-12 h-12 bg-indigo-50 text-brand-blue rounded-xl flex items-center justify-center mx-auto mb-4 font-bold text-lg">02</div>
              <h4 className="font-heading font-extrabold text-slate-800 text-sm mb-2 uppercase tracking-wide">Collegiate Autonomy</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Empowering young students to take leading coordinator roles in local regional drives.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-brand-green/30 transition-all text-center">
              <div className="w-12 h-12 bg-indigo-50 text-brand-blue rounded-xl flex items-center justify-center mx-auto mb-4 font-bold text-lg">03</div>
              <h4 className="font-heading font-extrabold text-slate-800 text-sm mb-2 uppercase tracking-wide">100% Non-Profit</h4>
              <p className="text-xs text-slate-400 leading-relaxed">No salaries or administration overheads. Every single rupee directly procures materials for targets.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-brand-green/30 transition-all text-center">
              <div className="w-12 h-12 bg-indigo-50 text-brand-blue rounded-xl flex items-center justify-center mx-auto mb-4 font-bold text-lg">04</div>
              <h4 className="font-heading font-extrabold text-slate-800 text-sm mb-2 uppercase tracking-wide">Practical Action</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Rather than virtual debates, our teams carry out physical tree plantings, rescue networks and books distribution.</p>
            </div>
          </div>
        </section>

        {/* Stories of Volunteers (Relocated detailed stories) */}
        <section className="bg-[#002244] border border-blue-900/40 text-white rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 py-1.5 px-4 bg-brand-green text-white rounded-bl-3xl text-xs font-bold leading-normal uppercase">
            Stories of Volunteers
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
            <div className="lg:col-span-1 border-r border-blue-900/30 pr-0 lg:pr-8 py-2">
              <h3 className="font-heading font-extrabold text-3xl mb-4 text-brand-green leading-tight">Hear From Our Changemakers</h3>
              <p className="text-slate-350 text-xs sm:text-sm leading-relaxed mb-6">
                Every year, thousands of college young minds join under our internships to drive social impact directly.
              </p>
              <button
                onClick={onVolunteerClick}
                className="bg-brand-green hover:bg-[#228f3b] text-white text-xs font-extrabold py-2.5 px-6 rounded-lg transition-colors inline-flex items-center gap-1 cursor-pointer shadow-md shadow-brand-green/20"
              >
                Join the Grid <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Three items in static grid */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div key={t.id} className="bg-white/5 border border-white/5 p-5 rounded-2xl flex flex-col justify-between h-full hover:border-white/10 transition-colors">
                  <p className="text-xs text-slate-300 leading-relaxed italic mb-6">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-3 mt-auto border-t border-white/5 pt-4">
                    <img
                      src={t.photoUrl}
                      alt={t.name}
                      className="w-8 h-8 rounded-full object-cover border border-brand-green/40"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-xs font-bold leading-none text-white">{t.name}</h4>
                      <span className="text-[10px] text-slate-400 font-semibold leading-normal block mb-0.5">{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
