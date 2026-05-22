import React, { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Briefcase, Award, Users, Check, Send, Phone, Mail, MapPin, Clock, ArrowRight, HelpCircle } from "lucide-react";
import { BrandConfig } from "../types";

interface VolunteerProps {
  brandConfig: BrandConfig;
}

export default function Volunteer({ brandConfig }: VolunteerProps) {
  const { customName, customSubtitle } = brandConfig;

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [causes, setCauses] = useState<string[]>([]);
  const [schedule, setSchedule] = useState("Weekend");
  const [motivation, setMotivation] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // FAQs active index state
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleCause = (cause: string) => {
    if (causes.includes(cause)) {
      setCauses(prev => prev.filter(c => c !== cause));
    } else {
      setCauses(prev => [...prev, cause]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert("Please fill out your name, email, and phone number.");
      return;
    }
    setSubmitted(true);
  };

  const handleResetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setCauses([]);
    setSchedule("Weekend");
    setMotivation("");
    setSubmitted(false);
  };

  const facHighlights = [
    {
      icon: <Briefcase className="w-5 h-5 text-emerald-500" />,
      title: "Real-World Fieldwork",
      desc: "Step outside dry classrooms. Coordinate active seedlings plantings, distribute school gear inside slums, or rescue injured strays."
    },
    {
      icon: <Award className="w-5 h-5 text-emerald-500" />,
      title: "Government Registered LoRs",
      desc: "Receive formally signed NGO certificates and letters of recommendation (LoR) appropriate for academic calendars and study-abroad profiles."
    },
    {
      icon: <Users className="w-5 h-5 text-emerald-500" />,
      title: "Decentralized Youth Grid",
      desc: "Join high-energy regional chapters, exchange notes with change leaders from premier colleges, and build permanent social connections."
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Page Head */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-green font-extrabold text-sm uppercase tracking-wider font-heading">Our Community Grid</span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-brand-blue tracking-tight mt-1 mb-4">
            Volunteer & Contact
          </h1>
          <div className="w-16 h-1.5 bg-brand-green mx-auto rounded-full mb-4" />
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-semibold">
            Join thousands of college young minds driving social welfare on the ground. Check eligibility lists underneath or send custom contact inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Left: Benefits & Information Grid */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-150 shadow-sm">
              <h3 className="font-heading font-bold text-lg sm:text-xl text-brand-blue mb-6 border-b border-slate-100 pb-3 uppercase tracking-wider text-[11px] sm:text-xs">
                Volunteer Privileges
              </h3>
              
              <div className="space-y-6">
                {facHighlights.map((hl, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-soft-green text-soft-green-text flex items-center justify-center shrink-0">
                      {hl.icon}
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-slate-800 text-sm mb-1">{hl.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed font-medium">{hl.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Standard Office Coordinates card */}
            <div className="bg-[#002244] border border-blue-900/40 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
              <h3 className="font-heading font-extrabold text-base text-brand-green mb-6 uppercase tracking-wider text-[10px]">
                Office & Contact Coordinates
              </h3>
              
              <div className="space-y-4 text-xs">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-brand-green shrink-0" />
                  <div>
                    <p className="font-bold text-slate-200">Registered Corporate Location</p>
                    <p className="text-[11px] text-slate-400">Plot 12, Sector 4, near Central Library, Navi Mumbai, MH — 400706</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-brand-green shrink-0" />
                  <div>
                    <p className="font-bold text-slate-200">Support Helpline Lines</p>
                    <p className="text-[11px] text-slate-400 font-mono">+91 88280 12345 / +91 91523 99880</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-brand-green shrink-0" />
                  <div>
                    <p className="font-bold text-slate-200">Inquiry email box</p>
                    <p className="text-[11px] text-slate-400 font-mono">contact@inamigosfoundation.org</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Stateful Recruitment Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-150 shadow-md">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6 text-xs sm:text-sm text-slate-700"
                  >
                    <div>
                      <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-brand-blue mb-1">
                        Apply to Join the Collective
                      </h2>
                      <p className="text-slate-450 text-xs leading-normal">
                        Submit your details under the secure recruitment desk. Formally vetted applicants are contacted within 48 business hours.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="E.g., Devendra Sharma"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-brand-green focus:bg-white text-xs text-slate-800 font-medium"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="sharma.dev@gmail.com"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-brand-green focus:bg-white text-xs text-slate-800 font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Helpline Phone Number (WhatsApp)</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98200 11223"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-brand-green focus:bg-white text-xs text-slate-800 font-medium"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Availability schedule</label>
                        <select
                          value={schedule}
                          onChange={(e) => setSchedule(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-brand-green focus:bg-white text-xs text-slate-850 font-semibold"
                        >
                          <option value="Weekend">Saturdays & Sundays (Weekend Drives)</option>
                          <option value="Weekday">Mon to Fri (Office Activities)</option>
                          <option value="Fulltime">Full Time Internship Mode</option>
                          <option value="Remote">Virtual / Work from Home Mode</option>
                        </select>
                      </div>
                    </div>

                    {/* Checkbox fields causes */}
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block mb-2.5">What campaign cause interests you?</span>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          "Project Bachpanshala",
                          "Project Prakriti",
                          "Project Jeev",
                          "Project Udaan",
                          "Project Seva",
                          "Project Vikas"
                        ].map((cause) => {
                          const isSel = causes.includes(cause);
                          return (
                            <button
                              type="button"
                              key={cause}
                              onClick={() => toggleCause(cause)}
                              className={`flex items-center gap-2 p-2.5 text-xs text-left cursor-pointer rounded-xl border transition-all ${
                                isSel
                                  ? "bg-emerald-50 border-brand-green text-brand-green font-bold"
                                  : "bg-slate-50 border-slate-200 text-slate-700"
                              }`}
                            >
                              <div className={`w-4 h-4 rounded flex items-center justify-center border ${isSel ? "bg-brand-green border-brand-green text-white" : "border-slate-300 bg-white"}`}>
                                {isSel && <Check className="w-3 h-3 text-white" />}
                              </div>
                              <span className="truncate leading-none">{cause}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Motivation box */}
                    <div>
                      <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Describe your motivation briefly</label>
                      <textarea
                        rows={3}
                        value={motivation}
                        onChange={(e) => setMotivation(e.target.value)}
                        placeholder="Why do you wish to join InAmigos? Tell us about any previous volunteering experiences or skills..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-brand-green focus:bg-white text-xs text-slate-800 font-medium"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-brand-green hover:bg-[#228f3b] text-white py-3.5 rounded-xl text-xs sm:text-sm font-extrabold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-brand-green/10"
                    >
                      <Send className="w-4 h-4" /> Submit Application
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-10 space-y-6"
                  >
                    <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green mx-auto scale-110">
                      <Check className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-heading font-extrabold text-2xl text-brand-blue">Application Submitted!</h4>
                      <p className="text-slate-450 text-xs leading-relaxed max-w-sm mx-auto">
                        Thank you, <strong className="text-slate-700">{name}</strong>. Your membership enrollment request was received successfully. Our city coordinator will register your WhatsApp grid and communicate schedules.
                      </p>
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={handleResetForm}
                        className="py-2.5 px-6 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50 transition-colors"
                      >
                        Submit Another Form
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* FAQs Accordion Relocated section */}
        <section className="max-w-3xl mx-auto mt-20 border-t border-slate-200 pt-16">
          <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-blue text-center mb-8">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {[
              {
                q: "Are internships and volunteer certificates government registered?",
                a: "Yes, InAmigos Foundation is a formally registered non-profit organization under Central legislation. Certificates issued contain unique registration credentials appropriate for university documentation."
              },
              {
                q: "How are my donation funds exactly monitored and redistributed?",
                a: "We maintain 100% financial auditing logs. Funds donated towards strict microprojects (like Project Prakriti or Project Jeev) are spent entirely on procurement (saplings, safety collars, vet supplies). Audit files are sent to registered monthly donors annually."
              },
              {
                q: "Can I volunteer for remote digital micro-tasks?",
                a: "Yes, we support extensive virtual roles in content drafting, marketing outreach, graphic arts, coding, and curriculum structuring, supporting high flexibility for students during academic calendars."
              }
            ].map((faq, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all shadow-sm">
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full text-left p-5 flex justify-between items-center bg-white hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span className="font-bold text-xs sm:text-sm text-brand-blue">{faq.q}</span>
                  <span className="text-slate-400 shrink-0 ml-4 font-bold text-base">{activeFaq === i ? "−" : "+"}</span>
                </button>
                <AnimatePresence initial={false}>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 pt-0 border-t border-slate-100 text-xs text-slate-500 leading-relaxed bg-[#F8FAFC]">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
