import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sliders, X, Heart, Trash2, Upload, RefreshCw } from "lucide-react";

interface BrandingCustomizerProps {
  customizerOpen: boolean;
  setCustomizerOpen: (open: boolean) => void;
  brandConfig: {
    customLogo: string | null;
    customName: string;
    customSubtitle: string;
    customHeroImage: string;
    customAboutImage: string;
    customProjectImages: Record<string, string>;
    customGalleryImages: Record<number, string>;
  };
  setCustomLogo: (val: string | null) => void;
  setCustomName: (val: string) => void;
  setCustomSubtitle: (val: string) => void;
  setCustomHeroImage: (val: string) => void;
  setCustomAboutImage: (val: string) => void;
  handleLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleHeroUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAboutUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleProjectUpload: (id: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  handleGalleryUpload: (num: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  resetToSystemDefaults: () => void;
}

export default function BrandingCustomizer({
  customizerOpen,
  setCustomizerOpen,
  brandConfig,
  setCustomLogo,
  setCustomName,
  setCustomSubtitle,
  setCustomHeroImage,
  setCustomAboutImage,
  handleLogoUpload,
  handleHeroUpload,
  handleAboutUpload,
  handleProjectUpload,
  handleGalleryUpload,
  resetToSystemDefaults
}: BrandingCustomizerProps) {
  const {
    customLogo,
    customName,
    customSubtitle,
    customHeroImage,
    customAboutImage,
    customProjectImages,
    customGalleryImages
  } = brandConfig;

  return (
    <>
      {/* FLOATING ACTION TRIGGER: BRAND CUSTOMIZER */}
      <button
        id="branding-customizer-trigger"
        onClick={() => setCustomizerOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-brand-green hover:bg-[#228f3b] text-white p-3.5 sm:p-4 rounded-full shadow-2xl flex items-center gap-2 transform active:scale-95 transition-all text-xs sm:text-sm font-extrabold cursor-pointer border border-white/20 hover:scale-105"
        title="Customize logo, name, and images"
      >
        <Sliders className="w-4 h-4" />
        <span className="hidden sm:inline">Customize Branding</span>
      </button>

      {/* BRAND CUSTOMIZATION DECK MODAL */}
      <AnimatePresence>
        {customizerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/70 z-50 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setCustomizerOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-white rounded-3xl w-full max-w-lg max-h-[85vh] overflow-y-auto relative p-6 sm:p-8 shadow-2xl border border-slate-100"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setCustomizerOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6 pr-6">
                <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-brand-blue flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-brand-green" /> Branding & Asset Center
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Upload your foundation's assets and preview them in real time across all pages. Changes are stored locally and persist across refreshes!
                </p>
              </div>

              <div className="space-y-6 text-xs sm:text-sm text-slate-700">
                {/* 1. Identity Profile */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <h4 className="font-bold text-brand-blue mb-3 uppercase tracking-wider text-[10px] sm:text-xs">1. Brand Identity</h4>
                  
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="text-[10px] text-slate-400 font-bold uppercase block">Foundation Name</label>
                      <input
                        type="text"
                        value={customName}
                        onChange={(e) => {
                          setCustomName(e.target.value);
                          localStorage.setItem("custom_name", e.target.value);
                        }}
                        className="w-full bg-white border border-slate-200 rounded-xl p-2 sm:p-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-green mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 font-bold uppercase block">Subtitle / Suffix</label>
                      <input
                        type="text"
                        value={customSubtitle}
                        onChange={(e) => {
                          setCustomSubtitle(e.target.value);
                          localStorage.setItem("custom_subtitle", e.target.value);
                        }}
                        className="w-full bg-white border border-slate-200 rounded-xl p-2 sm:p-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-green mt-1"
                      />
                    </div>
                  </div>

                  {/* Logo Selector */}
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Official Brand Logo</span>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden shrink-0 border border-slate-200 shadow-sm">
                        {customLogo ? (
                          <img src={customLogo} alt="Logo preview" className="w-full h-full object-cover" />
                        ) : (
                          <Heart className="w-6 h-6 text-brand-green" />
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex gap-2">
                          <label className="flex-1 text-center font-bold bg-brand-green hover:bg-[#228f3b] text-white py-2 px-3 rounded-xl cursor-pointer text-[11px] transition-colors shadow-sm shadow-brand-green/10">
                            Upload Logo File
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleLogoUpload}
                              className="hidden"
                            />
                          </label>
                          {customLogo && (
                            <button
                              onClick={() => {
                                setCustomLogo(null);
                                localStorage.removeItem("custom_logo");
                              }}
                              className="p-2 border border-slate-200 bg-white hover:bg-red-50 hover:text-red-500 rounded-xl transition-all"
                              title="Reset to default icon"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        <p className="text-[9px] text-slate-400 leading-none">Supports PNG, JPG, or SVG files.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Main Hero & About Covers */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-4">
                  <h4 className="font-bold text-brand-blue uppercase tracking-wider text-[10px] sm:text-xs">2. Hero & About Covers</h4>
                  
                  {/* Hero Background */}
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Hero Cover Image</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Paste image URL..."
                        value={customHeroImage}
                        onChange={(e) => {
                          setCustomHeroImage(e.target.value);
                          localStorage.setItem("custom_hero_image", e.target.value);
                        }}
                        className="flex-1 bg-white border border-slate-200 rounded-xl p-2 text-xs text-slate-800 focus:outline-none focus:border-brand-green"
                      />
                      <label className="bg-slate-250 p-2 border border-slate-200 hover:bg-slate-100 rounded-xl cursor-pointer transition-colors relative shrink-0 text-xs font-semibold flex items-center justify-center gap-1">
                        <Upload className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline font-bold">Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleHeroUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* About Image */}
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">About Section Banner</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Paste image URL..."
                        value={customAboutImage}
                        onChange={(e) => {
                          setCustomAboutImage(e.target.value);
                          localStorage.setItem("custom_about_image", e.target.value);
                        }}
                        className="flex-1 bg-white border border-slate-200 rounded-xl p-2 text-xs text-slate-800 focus:outline-none focus:border-brand-green"
                      />
                      <label className="bg-slate-250 p-2 border border-slate-200 hover:bg-slate-100 rounded-xl cursor-pointer transition-colors relative shrink-0 text-xs font-semibold flex items-center justify-center gap-1">
                        <Upload className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline font-bold">Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAboutUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* 3. Projects Gallery / Covers */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <h4 className="font-bold text-brand-blue mb-3 uppercase tracking-wider text-[10px] sm:text-xs">3. Campaign Images</h4>
                  <div className="space-y-3">
                    {[
                      { id: "bachpanshala", name: "Project Bachpanshala" },
                      { id: "prakriti", name: "Project Prakriti" },
                      { id: "jeev", name: "Project Jeev" },
                      { id: "udaan", name: "Project Udaan" },
                      { id: "seva", name: "Project Seva" },
                      { id: "vikas", name: "Project Vikas" }
                    ].map((proj) => {
                      const curImg = customProjectImages[proj.id];
                      return (
                        <div key={proj.id} className="flex items-center gap-3 justify-between bg-white px-3 py-2 rounded-xl border border-slate-150">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                              <img src={curImg || (proj.id === "bachpanshala" ? "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000" : proj.id === "prakriti" ? "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000" : proj.id === "jeev" ? "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=1000" : proj.id === "udaan" ? "https://images.unsplash.com/photo-1484807352052-23338990c6c6?q=80&w=1000" : proj.id === "seva" ? "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000" : "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000")} alt="" className="w-full h-full object-cover" />
                            </div>
                            <span className="font-semibold text-xs text-slate-700">{proj.name}</span>
                          </div>
                          
                          <label className="text-[10px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 py-1.5 px-2.5 rounded-lg cursor-pointer transition-colors border border-slate-250 flex items-center gap-1 shrink-0">
                            <Upload className="w-3 h-3 text-slate-500" />
                            <span>Replace</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleProjectUpload(proj.id, e)}
                              className="hidden"
                            />
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Photo Gallery Slots */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <h4 className="font-bold text-brand-blue mb-3 uppercase tracking-wider text-[10px] sm:text-xs">4. Active Gallery Slots</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3, 4, 5, 6].map((num) => {
                      const curImg = customGalleryImages[num];
                      const dUrl = num === 1 ? "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1000" : num === 2 ? "https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=1000" : num === 3 ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000" : num === 4 ? "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1000" : num === 5 ? "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000" : "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000";
                      return (
                        <div key={num} className="relative aspect-video rounded-xl overflow-hidden group border border-slate-200 shadow-sm bg-white">
                          <img src={curImg || dUrl} alt="" className="w-full h-full object-cover" />
                          <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1 text-white transition-opacity duration-200 cursor-pointer text-[9px] font-bold">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Slot {num}</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleGalleryUpload(num, e)}
                              className="hidden"
                            />
                          </label>
                          <div className="absolute bottom-1 left-1.5 bg-brand-blue/80 px-1 py-0.5 rounded text-[8px] text-white">Slot {num}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Main Action buttons */}
                <div className="pt-4 flex gap-3 border-t border-slate-100">
                  <button
                    onClick={resetToSystemDefaults}
                    className="flex-1 py-3 border border-slate-200 hover:bg-slate-50 hover:text-red-500 font-bold text-xs text-slate-500 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Reset Defaults
                  </button>
                  <button
                    onClick={() => setCustomizerOpen(false)}
                    className="flex-1 py-3 bg-brand-blue hover:bg-brand-blue/90 font-bold text-xs text-white rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-brand-blue/15"
                  >
                    Finish Editing
                  </button>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
