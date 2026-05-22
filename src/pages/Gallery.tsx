import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  BookOpen,
  Sprout,
  Heart,
  Award,
  Briefcase,
  Sparkles,
  Camera,
  Layers,
  Info,
  Play,
  Pause,
  X
} from "lucide-react";
import { BrandConfig, GalleryItem } from "../types";

interface GalleryProps {
  brandConfig: BrandConfig;
  galleryItems: GalleryItem[];
}

interface SliderPhoto {
  url: string;
  caption: string;
}

interface ProjectGalleryGroup {
  id: string;
  projectName: string;
  category: "Education" | "Environment" | "Animal Welfare" | "Empowerment" | "Relief" | "Skill Development";
  tagline: string;
  icon: React.ReactNode;
  iconBgColor: string;
  iconTextColor: string;
  themeColor: string;
  achievements: string;
  photos: SliderPhoto[];
}

export default function Gallery({ brandConfig }: GalleryProps) {
  const { customGalleryImages, customProjectImages, customName } = brandConfig;

  // Active slideshow index state for each of the 6 projects
  const [slideIndexes, setSlideIndexes] = useState<Record<string, number>>({
    bachpanshala: 0,
    prakriti: 0,
    jeev: 0,
    udaan: 0,
    seva: 0,
    vikas: 0
  });

  // Autoplay states for each project gallery
  const [autoplayStates, setAutoplayStates] = useState<Record<string, boolean>>({
    bachpanshala: true,
    prakriti: false,
    jeev: false,
    udaan: false,
    seva: false,
    vikas: false
  });

  // Lightbox index states for visual modal zoom
  const [lightboxState, setLightboxState] = useState<{
    projectGroupId: string;
    photoIndex: number;
  } | null>(null);

  // Set up 6 projects with 6 distinct images per project
  const projectGalleries: ProjectGalleryGroup[] = [
    {
      id: "bachpanshala",
      projectName: "Project Bachpanshala",
      category: "Education",
      tagline: "Primary classes and free study resources for village/slum children.",
      icon: <BookOpen className="w-5 h-5" />,
      iconBgColor: "bg-emerald-50 border border-emerald-100",
      iconTextColor: "text-emerald-600",
      themeColor: "emerald",
      achievements: "1,200+ kids transitioned to school | 10 classrooms run",
      photos: [
        {
          url: customGalleryImages[1] || customProjectImages["bachpanshala"] || "shala.jpg",
          caption: "A joyful learning Sunday inside one of our neighborhood study centers."
        },
        {
          url: "seva1.jpeg",
          caption: "Handing out interactive storybooks and drawing boards to boost early literacy."
        },
        {
          url: "download88.webp",
          caption: "Fostering absolute concentration as a student starts her first English alphabet."
        },
        {
          url: "14.jpg",
          caption: "Weekend student volunteers tutoring youngsters in a non-formal classroom setup."
        },
        {
          url: ".jpg",
          caption: "Simplifying foundational mathematics with playful, tactile learning games."
        }
      ]
    },
    {
      id: "prakriti",
      projectName: "Project Prakriti",
      category: "Environment",
      tagline: "Promoting green cover, massive seedball drives, and urban organic lawns.",
      icon: <Sprout className="w-5 h-5" />,
      iconBgColor: "bg-teal-50 border border-teal-100",
      iconTextColor: "text-teal-600",
      themeColor: "teal",
      achievements: "20,000+ native saplings planted | 85 local waste cleanups",
      photos: [
        {
          url: customGalleryImages[2] || customProjectImages["prakriti"] || "prakriti1.jpg",
          caption: "Volunteers pressing organic clay seedballs for upcoming pre-monsoon dispersal."
        },
        {
          url: "prakriti6.jpg",
          caption: "Cultivating organic saplings at university nurseries for public donation audits."
        },
        {
          url: "udaan.jpg",
          caption: "Planting native mahogany and neem trees using local organic soil nutrition."
        },
        {
          url: "1747514074417.jpg",
          caption: "Conducting systematic ecosystem awareness hikes for school batches."
        },
        {
          url: "16.jpg",
          caption: "Clearing solid plastic, wrappers, and debris along delicate woodland waterbeds."
        },
        {
          url: "15.jpg",
          caption: "Distributing free seasonal seed bags to support balcony gardens."
        }
      ]
    },
    {
      id: "jeev",
      projectName: "Project Jeev",
      category: "Animal Welfare",
      tagline: "Dedicated stray animal medical vaccines, feeding runs, and support.",
      icon: <Heart className="w-5 h-5" />,
      iconBgColor: "bg-rose-50 border border-rose-100",
      iconTextColor: "text-rose-600",
      themeColor: "rose",
      achievements: "10,000+ strays fed regularly | 400+ sterilizations coordinated",
      photos: [
        {
          url: customGalleryImages[4] || customProjectImages["jeev"] || "download77.jpg",
          caption: "Checking on stray puppies outfitted with reflective safety collars to prevent accidents."
        },
        {
          url: "jeev3.jpg",
          caption: "Distributing nutritious dog food meals during our early morning patrol loops."
        },
        {
          url: "jeev.jpg",
          caption: "Fostering an injured stray cat recovering from injuries at our partner clinic."
        },
        {
          url: "13.jpg",
          caption: "Supporting professional veterinarians during anti-rabies vaccination drives."
        }
      
      ]
    },

    {
      id: "seva",
      projectName: "Project Seva",
      category: "Relief",
      tagline: "Direct nutritional hunger elimination, hot meals, and clothing setups.",
      icon: <Award className="w-5 h-5" />,
      iconBgColor: "bg-amber-50 border border-amber-100",
      iconTextColor: "text-amber-600",
      themeColor: "amber",
      achievements: "15,000+ hot cooked rice meals | 8,000 winter blankets",
      photos: [
        {
          url: customGalleryImages[5] || customProjectImages["seva"] || "seva6.jpg",
          caption: "Delivering healthy cooked vegetable rice boxes in marginalized street locations."
        },
        {
          url: "seva5.jpg",
          caption: "Volunteers gathering to pack fresh dry rations and survival packs."
        },
        {
          url: "seva4.jpg",
          caption: "Operating a community soup kitchen preparing food under proper hygiene codes."
        },
        {
          url: "seva2.jpg",
          caption: "Redistributing donated heavy winter blankets, coats, and socks."
        },
        {
          url: "16.jpg",
          caption: "Emergency hydration runs providing certified drinking water to remote setups."
        },
        {
          url: "15.jpg",
          caption: "Spreading warmth, comfort and support to homeless citizens during a chilly night."
        }
      ]
    },
   
  ];

  // Map autoplay side effects
  useEffect(() => {
    const intervals = Object.keys(autoplayStates).map((projectId) => {
      if (!autoplayStates[projectId]) return null;
      return setInterval(() => {
        handleNextSlide(projectId);
      }, 5000);
    });

    return () => {
      intervals.forEach((interval) => {
        if (interval) clearInterval(interval);
      });
    };
  }, [autoplayStates]);

  const handlePrevSlide = (projectId: string) => {
    setSlideIndexes((prev) => {
      const group = projectGalleries.find((g) => g.id === projectId);
      const limit = group ? group.photos.length : 6;
      const current = prev[projectId] ?? 0;
      const target = current === 0 ? limit - 1 : current - 1;
      return { ...prev, [projectId]: target };
    });
  };

  const handleNextSlide = (projectId: string) => {
    setSlideIndexes((prev) => {
      const group = projectGalleries.find((g) => g.id === projectId);
      const limit = group ? group.photos.length : 6;
      const current = prev[projectId] ?? 0;
      const target = current === limit - 1 ? 0 : current + 1;
      return { ...prev, [projectId]: target };
    });
  };

  const selectSpecificSlide = (projectId: string, index: number) => {
    setSlideIndexes((prev) => ({
      ...prev,
      [projectId]: index
    }));
  };

  const toggleAutoplay = (projectId: string) => {
    setAutoplayStates((prev) => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  // Lightbox navigational controls
  const handlePrevLightbox = () => {
    if (!lightboxState) return;
    const { projectGroupId, photoIndex } = lightboxState;
    const group = projectGalleries.find((g) => g.id === projectGroupId);
    if (!group) return;
    const targetIdx = photoIndex === 0 ? group.photos.length - 1 : photoIndex - 1;
    setLightboxState({ projectGroupId, photoIndex: targetIdx });
  };

  const handleNextLightbox = () => {
    if (!lightboxState) return;
    const { projectGroupId, photoIndex } = lightboxState;
    const group = projectGalleries.find((g) => g.id === projectGroupId);
    if (!group) return;
    const targetIdx = photoIndex === group.photos.length - 1 ? 0 : photoIndex + 1;
    setLightboxState({ projectGroupId, photoIndex: targetIdx });
  };

  // Keyboard controls for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxState) return;
      if (e.key === "ArrowLeft") handlePrevLightbox();
      if (e.key === "ArrowRight") handleNextLightbox();
      if (e.key === "Escape") setLightboxState(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxState]);

  return (
    <div id="gallery-page" className="pt-24 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-green font-extrabold text-xs sm:text-sm uppercase tracking-wider bg-emerald-50 px-3.5 py-1.5 rounded-full border border-brand-green/10">
            Unified Photographic Portfolio
          </span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-brand-blue tracking-tight mt-4 mb-4">
            Our Gallery of Change
          </h1>
          <div className="w-16 h-1.5 bg-brand-green mx-auto rounded-full mb-5" />
          <p className="text-xs sm:text-base text-slate-500 font-medium leading-relaxed">
            Explore active, unfiltered visual diaries from our 6 core projects on-ground. Toggle individual carousels, zoom on snapshots, or enable autoplay to witness real-time social service in motion.
          </p>
        </div>

        {/* 6 DISTINCT PROJECT CATEGORY SECTIONS */}
        <div className="space-y-16">
          {projectGalleries.map((project) => {
            const currentIdx = slideIndexes[project.id] ?? 0;
            const isPlaying = autoplayStates[project.id] ?? false;
            const currentPhoto = project.photos[currentIdx] ?? project.photos[0];

            return (
              <section
                key={project.id}
                id={`project-gallery-${project.id}`}
                className="bg-white rounded-[2.5rem] border border-slate-150 shadow-sm overflow-hidden p-6 sm:p-8 hover:shadow-md transition-shadow duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left Column: Project Profile Metadata (5 Grid) */}
                  <div className="lg:col-span-5 flex flex-col justify-between h-full py-2">
                    <div>
                      {/* Project Tag Badge */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className={`p-2.5 rounded-xl ${project.iconBgColor} ${project.iconTextColor}`}>
                          {project.icon}
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Campaign Portal</span>
                          <span className="text-xs uppercase font-extrabold text-brand-green tracking-widest leading-none">
                            {project.category}
                          </span>
                        </div>
                      </div>

                      {/* Title & Slogan */}
                      <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-blue tracking-tight mb-2">
                        {project.projectName}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed mb-6">
                        {project.tagline}
                      </p>

                      {/* Fact Banner */}
                      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-6">
                        <div className="flex items-start gap-2 text-slate-650 text-xs font-semibold leading-relaxed">
                          <Layers className="w-4 h-4 shrink-0 mt-0.5 text-brand-green" />
                          <div>
                            <span className="font-extrabold text-brand-blue block text-[11px] uppercase tracking-wider">On-Ground Impact Metrics</span>
                            <span className="text-slate-500 font-medium">{project.achievements}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Controls & Mini Info Indicator */}
                    <div className="mt-auto space-y-4">
                      {/* Interactive Controls Bar */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleAutoplay(project.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                            isPlaying
                              ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                              : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                          }`}
                          title={isPlaying ? "Pause autoplay carousel" : "Start autoplay slides"}
                        >
                          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                          <span>Autoplay</span>
                        </button>

                        <div className="flex items-center gap-1 text-[11px] text-slate-400 font-bold ml-auto bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200/55 font-mono">
                          <Info className="w-3.5 h-3.5 text-slate-400" />
                          <span>Photo {currentIdx + 1} of {project.photos.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: High-Fidelity Interactive Image Slider (7 Grid) */}
                  <div className="lg:col-span-7">
                    <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 group shadow-inner">
                      
                      {/* Image Frame with Framer Motion slide */}
                      <div className="absolute inset-0 select-none">
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={`${project.id}-slide-${currentIdx}`}
                            src={currentPhoto.url}
                            alt={`${project.projectName} Slide ${currentIdx + 1}`}
                            className="w-full h-full object-cover"
                            initial={{ opacity: 0, scale: 1.03 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.35 }}
                            referrerPolicy="no-referrer"
                          />
                        </AnimatePresence>
                      </div>

                      {/* Translucent overlay caption bar */}
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-transparent p-5 sm:p-6 text-white pt-12">
                        <p className="text-xs sm:text-sm font-semibold tracking-wide text-zinc-100 leading-relaxed drop-shadow-md">
                          {currentPhoto.caption}
                        </p>
                      </div>

                      {/* Quick Zoom Button */}
                      <button
                        onClick={() => setLightboxState({ projectGroupId: project.id, photoIndex: currentIdx })}
                        className="absolute top-4 right-4 bg-slate-900/60 backdrop-blur-md text-white border border-white/25 rounded-full p-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-105"
                        title="Expand / Intersect Lightbox modal"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>

                      {/* Interactive Arrow Left/Right overlays */}
                      <div className="absolute inset-y-0 inset-x-3 flex items-center justify-between pointer-events-none">
                        <button
                          onClick={() => handlePrevSlide(project.id)}
                          className="pointer-events-auto w-10 h-10 rounded-full bg-slate-900/60 backdrop-blur-md text-white border border-white/10 flex items-center justify-center hover:bg-slate-900 shadow transition-all hover:scale-110 active:scale-95 cursor-pointer ml-1"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="w-5 h-5 font-bold" />
                        </button>
                        <button
                          onClick={() => handleNextSlide(project.id)}
                          className="pointer-events-auto w-10 h-10 rounded-full bg-slate-900/60 backdrop-blur-md text-white border border-white/10 flex items-center justify-center hover:bg-slate-900 shadow transition-all hover:scale-110 active:scale-95 cursor-pointer mr-1"
                          aria-label="Next image"
                        >
                          <ChevronRight className="w-5 h-5 font-bold" />
                        </button>
                      </div>

                      {/* Interactive slide jump controls (bottom circles) */}
                      <div className="absolute top-4 left-4 flex gap-1.5 bg-slate-950/50 backdrop-blur-md p-1.5 rounded-full border border-white/10 z-10 transition-opacity duration-200">
                        {project.photos.map((_, pIdx) => (
                          <button
                            key={pIdx}
                            onClick={() => selectSpecificSlide(project.id, pIdx)}
                            className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                              currentIdx === pIdx
                                ? "bg-brand-green scale-110"
                                : "bg-white/40 hover:bg-white/70"
                            }`}
                            title={`Jump to image ${pIdx + 1}`}
                          />
                        ))}
                      </div>

                    </div>
                  </div>

                </div>
              </section>
            );
          })}
        </div>

        {/* Candid Process Bio Callout */}
        <section className="mt-20 border border-brand-green/10 bg-emerald-50/10 p-8 sm:p-12 rounded-[2.5rem] text-center max-w-4xl mx-auto">
          <Camera className="w-10 h-10 text-brand-green mx-auto mb-4" />
          <h4 className="font-heading font-extrabold text-brand-blue text-lg sm:text-xl mb-2">Authentic Photographic Chronicle</h4>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            All photography displayed across the {customName} Foundation galleries has been shot directly by student leaders, on-site, using accessible smartphones and cameras. We utilize real field snapshots rather than polished stock models to reflect our commitment to total organizational truth.
          </p>
        </section>

      </div>

      {/* DETAILED FULL-SCREEN LIGHTBOX MODAL DIALOG OVERLAY */}
      <AnimatePresence>
        {lightboxState && (() => {
          const group = projectGalleries.find((g) => g.id === lightboxState.projectGroupId);
          if (!group) return null;
          const photo = group.photos[lightboxState.photoIndex];
          if (!photo) return null;

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxState(null)}
              className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8"
            >
              {/* Close Button overlay */}
              <button
                onClick={() => setLightboxState(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/15 text-white hover:bg-white/35 transition-colors cursor-pointer border border-white/10 outline-none hover:rotate-90 duration-300"
                title="Close overlay"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Layout Content wrapper */}
              <div
                className="max-w-4xl w-full flex flex-col items-center justify-center relative select-none"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Photo frame */}
                <div className="relative w-full max-h-[70vh] flex items-center justify-center">
                  <img
                    src={photo.url}
                    alt="Zoomed display"
                    className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl border border-white/5"
                    referrerPolicy="no-referrer"
                  />

                  {/* Keyboard navigation instruction */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md text-[9px] font-bold text-slate-400 py-1 px-2.5 rounded-full border border-white/5 select-none hidden sm:block">
                    Use Left / Right arrow keys to navigate
                  </div>

                  {/* Left / Right overlays in Lightbox */}
                  <button
                    onClick={handlePrevLightbox}
                    className="absolute left-2 sm:-left-16 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 flex items-center justify-center shadow-lg transition-all hover:scale-105 cursor-pointer"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleNextLightbox}
                    className="absolute right-2 sm:-right-16 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 flex items-center justify-center shadow-lg transition-all hover:scale-105 cursor-pointer"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                {/* Captions card overlay */}
                <div className="text-center text-white mt-8 max-w-2xl px-4">
                  <span className="text-brand-green font-extrabold uppercase tracking-widest text-[11px] bg-slate-900/80 px-3 py-1.5 rounded-full border border-white/5">
                    {group.category} — {group.projectName}
                  </span>
                  
                  <p className="text-xs sm:text-sm text-slate-200 mt-4 leading-relaxed font-semibold">
                    {photo.caption}
                  </p>
                  
                  <div className="flex gap-4 items-center justify-center mt-6">
                    <button
                      onClick={handlePrevLightbox}
                      className="px-4 py-2 border border-white/10 hover:bg-white/10 text-xs font-bold rounded-lg cursor-pointer transition-colors text-white"
                    >
                      Prev
                    </button>
                    <span className="text-xs font-bold text-slate-400 font-mono">
                      Image {lightboxState.photoIndex + 1} of {group.photos.length}
                    </span>
                    <button
                      onClick={handleNextLightbox}
                      className="px-4 py-2 border border-white/10 hover:bg-white/10 text-xs font-bold rounded-lg cursor-pointer transition-colors text-white"
                    >
                      Next
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

    </div>
  );
}
