import React, { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart,
  Sprout,
  BookOpen,
  Award,
  Users,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  ArrowRight,
  Check,
  ChevronRight,
  Briefcase,
  Sparkles,
  Send,
  HelpCircle,
  ShieldCheck,
  HeartHandshake,
  Instagram,
  Linkedin,
  Facebook
} from "lucide-react";

// Subpages
import logo from "./pages/logo.jpg";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Impact from "./pages/Impact";
import Gallery from "./pages/Gallery";
import Volunteer from "./pages/Volunteer";

// Branding panel
import BrandingCustomizer from "./components/BrandingCustomizer";

// Types
import { Project, GalleryItem, Testimonial, BrandConfig } from "./types";

export default function App() {
  // Navigation: stateful page tracking matching true HTML routes!
  const [currentPage, setCurrentPage] = useState<"home" | "about" | "projects" | "impact" | "gallery" | "volunteer">(() => {
    const path = window.location.pathname;
    if (path.includes ("about.html") || path.includes("about")) return "about";
    if (path.includes("projects.html") || path.includes("projects")) return "projects";
    if (path.includes("impact.html") || path.includes("impact")) return "impact";
    if (path.includes("gallery.html") || path.includes("gallery")) return "gallery";
    if (path.includes("volunteer.html") || path.includes("volunteer")) return "volunteer";
    return "home";
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Live Customizer Branding states
  const [customLogo, setCustomLogo] = useState<string | null>(() => {
    return localStorage.getItem("logo.jpg") || logo;
  });
  const [customName, setCustomName] = useState<string>(() => {
    return localStorage.getItem("custom_name") || "InAmigos";
  });
  const [customSubtitle, setCustomSubtitle] = useState<string>(() => {
    return localStorage.getItem("custom_subtitle") || "Foundation";
  });
  const [customHeroImage, setCustomHeroImage] = useState<string>(() => {
    return localStorage.getItem("custom_hero_image") || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070";
  });
  const [customAboutImage, setCustomAboutImage] = useState<string>(() => {
    return localStorage.getItem("custom_about_image") || "https://images.unsplash.com/photo-1559027615-cd4e7f33ec7c?q=80&w=2070";
  });
  const [customProjectImages, setCustomProjectImages] = useState<Record<string, string>>(() => {
    try {
      const stored = localStorage.getItem("custom_project_images");
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });
  const [customGalleryImages, setCustomGalleryImages] = useState<Record<number, string>>(() => {
    try {
      const stored = localStorage.getItem("custom_gallery_images");
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const [customizerOpen, setCustomizerOpen] = useState(false);

  // General dialog overlay states
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [selectedDonationCause, setSelectedDonationCause] = useState("General Fund");
  const [donationAmount, setDonationAmount] = useState<string | number>("1500");
  const [donationFrequency, setDonationFrequency] = useState<"One-time" | "Monthly">("One-time");
  const [customAmountActive, setCustomAmountActive] = useState(false);
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [paymentComplete, setPaymentComplete] = useState(false);

  const [selectedProjectForModal, setSelectedProjectForModal] = useState<Project | null>(null);

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Intercept paths or pushState parameters
  const navigateTo = (pageName: "home" | "about" | "projects" | "impact" | "gallery" | "volunteer") => {
    setCurrentPage(pageName);
    setMobileMenuOpen(false);
    const targetHTML = pageName === "home" ? "index.html" : `${pageName}.html`;
    
    // Update the browser's actual address bar to showcase real page change
    window.history.pushState(null, "", `/${targetHTML}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Synchronize browser history (such as back / forward arrows) with page views
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.includes("about")) setCurrentPage("about");
      else if ( path.includes("projects")) setCurrentPage("projects");
      else if (path.includes("impact")) setCurrentPage("impact");
      else if (path.includes("gallery")) setCurrentPage("gallery");
      else if (path.includes("volunteer")) setCurrentPage("volunteer");
      else setCurrentPage("home");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Elevated header control
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Customizer file-reads helper functions
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setCustomLogo(result);
        localStorage.setItem("", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHeroUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setCustomHeroImage(result);
        localStorage.setItem("custom_hero_image", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAboutUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setCustomAboutImage(result);
        localStorage.setItem("custom_about_image", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProjectUpload = (projectId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        const updated = { ...customProjectImages, [projectId]: result };
        setCustomProjectImages(updated);
        localStorage.setItem("custom_project_images", JSON.stringify(updated));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryUpload = (itemId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        const updated = { ...customGalleryImages, [itemId]: result };
        setCustomGalleryImages(updated);
        localStorage.setItem("custom_gallery_images", JSON.stringify(updated));
      };
      reader.readAsDataURL(file);
    }
  };

  const resetToSystemDefaults = () => {
    localStorage.removeItem("logi.png");
    localStorage.removeItem("custom_name");
    localStorage.removeItem("custom_subtitle");
    localStorage.removeItem("custom_hero_image");
    localStorage.removeItem("custom_about_image");
    localStorage.removeItem("custom_project_images");
    localStorage.removeItem("custom_gallery_images");
    setCustomLogo(null);
    setCustomName("InAmigos");
    setCustomSubtitle("Foundation");
    setCustomHeroImage("https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070");
    setCustomAboutImage("https://images.unsplash.com/photo-1559027615-cd4e7f33ec7c?q=80&w=2070");
    setCustomProjectImages({});
    setCustomGalleryImages({});
  };

  // Action flow trigger points
  const triggerDonateFlow = (causeName: string) => {
    setSelectedDonationCause(causeName);
    setDonateModalOpen(true);
  };

  const handleResetDonation = () => {
    setDonateModalOpen(false);
    setPaymentComplete(false);
    setDonorName("");
    setDonorEmail("");
    setCustomAmountActive(false);
    setDonationAmount("1500");
  };

  const handleProcessPayment = (e: FormEvent) => {
    e.preventDefault();
    if (!donorName || !donorEmail) {
      alert("Please specify your full name and email.");
      return;
    }
    setPaymentComplete(true);
  };

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setNewsletterEmail("");
    }
  };

  // Bundle up config and image pointers
  const brandConfig: BrandConfig = {
    customLogo,
    customName,
    customSubtitle,
    customHeroImage,
    customAboutImage,
    customProjectImages,
    customGalleryImages,
  };

  // Structured datasets
  const ongoingProjects: Project[] = [
    {
      id: "bachpanshala",
      title: "Project Bachpanshala",
      tagline: "Bridging foundational education for slam/village kids.",
      icon: <BookOpen className="w-5 h-5 text-emerald-500" />,
      category: "Education",
      image: customProjectImages["bachpanshala"] || "images.jpg",
      description: "Our hallmark program establishing safe non-formal study classrooms directly inside urban slums and remote village communities, catering to over 5,000 baseline pupils.",
      impactMetrics: "1,200+ kids transitioned to public schools | 10 centers operating",
      longDescription: "Project Bachpanshala provides free primary education, free study supplies, mental wellness sessions, and basic hygiene support to children from low-income, marginalized setups. We focus on foundational literacy and numeracy via playful, engaging, and hands-on modules so children don't drop out of their primary learning journey.",
      achievements: [
        "12 digital tabs deployed for interactive learning",
        "100% textbook allocation achieved via community drives",
        "Successfully raised foundational literacy score of 82% of batch within 6 months"
      ],
      volunteerRoles: ["Curriculum planner", "Elementary math/English teacher", "Storyteller & creative artist", "Hygiene workshop host"],
      fundingGoal: 450000,
      fundsRaised: 312000
    },
    {
      id: "prakriti",
      title: "Project Prakriti",
      tagline: "Eco-conservation, tree plantation, and clean drives.",
      icon: <Sprout className="w-5 h-5 text-emerald-500" />,
      category: "Environment",
      image: customProjectImages["prakriti"] || "download22.jpeg",
      description: "Nurturing ecological balance through extensive afforestation, waste auditing, and interactive climate action bootcamps in major schools and housing societies.",
      impactMetrics: "20,000+ Native Saplings Planted | 85 Waste Collection Walks",
      longDescription: "Under Project Prakriti, InAmigos Foundation conducts massive green campaigns including seedball making workshops, soil nutrition awareness campaigns, organic farming basics, and plantation drives across barren city fringes to combat concrete jungle expansions while installing bird feeders and water pots.",
      achievements: [
        "85% survival rate of native saplings via volunteer geolocation monitoring",
        "Conducted 12 waste auditing protocols in high-density urban areas",
        "Engaged 4,000+ high school children in environmental pledge certificates"
      ],
      volunteerRoles: ["Tree plantation organizer", "Urban compost educator", "Content builder for Climate Bootcamps", "Local park cleanup lead"],
      fundingGoal: 250000,
      fundsRaised: 185000
    },
    {
      id: "jeev",
      title: "Project Jeev",
      tagline: "Dedicated stray animal rescue and constant support.",
      icon: <Heart className="w-5 h-5 text-emerald-500" />,
      category: "Animal Welfare",
      image: customProjectImages["jeev"] || "download77.jpg",
      description: "Ensuring feed security, basic first aid, medical vaccinations, and warmth assistance for our community co-inhabitants who cannot speak for themselves.",
      impactMetrics: "10,000+ Stray Dogs & Cats Fed regularly | 400+ Sterilizations coordinated",
      longDescription: "Project Jeev is a dedicated compassionate initiative targeting street cows, stray dogs, and cats. Our volunteers mobilize everyday food distribution runs, execute emergency first-aid on coordinates found via our community WhatsApp grid, and install winter jackets made from upcycled materials.",
      achievements: [
        "Distributed 1,200 reflective safety collars to mitigate wildlife vehicle accidents",
        "Arranged 35 specialized rabies vaccinations drives with state vets",
        "Rescued and fostered 92 severely disabled or injured kittens and puppies"
      ],
      volunteerRoles: ["Daily feeding driver", "Rescue coordinator", "Reflective safety collar fitter", "Adoption coordinator"],
      fundingGoal: 300000,
      fundsRaised: 220000
    },
    {
      id: "udaan",
      title: "Project Udaan",
      tagline: "Sanitation hygiene, digital tutoring, and vocational support.",
      icon: <Sparkles className="w-5 h-5 text-emerald-500" />,
      category: "Empowerment",
      image: customProjectImages["udaan"] || "download44.jpg",
      description: "Empowering rural and slum-dwelling women through intensive vocational coaching, machine sewing guilds, and premium menstrual hygiene drives.",
      impactMetrics: "12,000+ Sanitary Pads distributed | 450+ craft kits handed over",
      longDescription: "Project Udaan empowers young girls and women to break generational poverty chains. Through vocational centers, she learns standard dress-making, high-fashion tailoring, handmade crafting, basic computer typing, and small-scale digital trade business setup, coupled with extensive workshops around basic body rights and health metrics.",
      achievements: [
        "Built 3 sewing workshop mini-units with local electricity support",
        "Trained 130 women who are now earning an average of ₹8,000 extra per month",
        "Produced 2,500 cotton washable face-cover masks and towels"
      ],
      volunteerRoles: ["Digital skills tutorial master", "Hygiene educator", "Handicrafts merchant designer", "Emotional health counselor"],
      fundingGoal: 500000,
      fundsRaised: 410000
    },
    {
      id: "seva",
      title: "Project Seva",
      tagline: "Immediate disaster relief, food donation, and support.",
      icon: <Award className="w-5 h-5 text-emerald-500" />,
      category: "Relief",
      image: customProjectImages["seva"] || "seva6.jpg",
      description: "Targeting direct elimination of nutritional hunger. Organizing massive cooked-meals handoffs, fresh drinking water distribution, and winter blanket camps.",
      impactMetrics: "15,000+ Fresh Rice Lunches delivered | 8,000 winter socks and blankets",
      longDescription: "Project Seva behaves as our rapid response unit during extreme temperatures, floods, and festive seasonal drives. We setup high-efficiency community kitchens to feed migrant farm laborers and homeless citizens on severe nights while organizing systematic physical drives to redistribute wearable clothes collected from urban apartments.",
      achievements: [
        "Collected and sorted 20,000 wearable garments from 8 leading residential towers",
        "Reached 10 remote tribal settlements during heavy unpredicted block rainfalls",
        "Established 4 permanent food drop boxes where community members can keep extra bread"
      ],
      volunteerRoles: ["Disaster relief driver", "Dry ration box packer", "Clothing sorting assistant", "Hot meals chef lead"],
      fundingGoal: 200000,
      fundsRaised: 140000
    },
    {
      id: "vikas",
      title: "Project Vikas",
      tagline: "Career workshops, interactive tech webinars, and internships.",
      icon: <Briefcase className="w-5 h-5 text-emerald-500" />,
      category: "Skill Development",
      image: customProjectImages["vikas"] || "download66.jpg",
      description: "Developing future youth leaders. Over 1,200 students trained via live social internships, building real executive skill-sets while supporting society.",
      impactMetrics: "2,500+ Qualified Youth Certified | 96% Satisfaction rate",
      longDescription: "Project Vikas supports the next generation of social innovators. Undergraduate students and postgraduates from different corners enroll in our online and offline field internships, developing skill-sets in team building, public speaking, event coordinating, graphic art, and fundraising while getting structured letters of recommendations.",
      achievements: [
        "Delivered 45 high-impact guest lectures on resume preparation & corporate life",
        "Enabled remote digital volunteering scopes for children from tier-3 zones",
        "Graduated 15 interns who progressed into prominent NGOs / corporate ESG roles"
      ],
      volunteerRoles: ["Student leader coordinator", "HR workshops trainer", "Resume drafting reviewer", "Web-design advisor"],
      fundingGoal: 150000,
      fundsRaised: 110000
    }
  ];

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: "Happy classroom smiles under Project Bachpanshala",
      photoUrl: customGalleryImages[1] || "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1000",
      caption: "Our student-volunteers teaching math modules during a sunny Sunday in the suburban slums.",
      category: "Education"
    },
    {
      id: 2,
      title: "Green Tree Plantation Drive at City Borders",
      photoUrl: customGalleryImages[2] || "https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=1000",
      caption: "Young volunteers work hand-in-hand to plant over 500 local mahogany and neem saplings.",
      category: "Environment"
    },
    {
      id: 3,
      title: "Livelihood sewing graduation ceremony",
      photoUrl: customGalleryImages[3] || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000",
      caption: "Our Project Udaan batch proud to show off self-made garments and receive regional market link certificates.",
      category: "Empowerment"
    },
    {
      id: 4,
      title: "Feeding program on cold streets",
      photoUrl: customGalleryImages[4] || "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1000",
      caption: "Daily street patrol delivering hot nutritious meat-rice meals to rescue animals and stray puppies.",
      category: "Welfare"
    },
    {
      id: 5,
      title: "Fresh home cooked meal servers",
      photoUrl: customGalleryImages[5] || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000",
      caption: "Volunteers gathering to handcraft over 450 packaging units of nutritious fresh vegetable pulav is served to needy citizens.",
      category: "Education"
    },
    {
      id: 6,
      title: "Vikas leadership development circles",
      photoUrl: customGalleryImages[6] || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000",
      caption: "We run monthly offline strategy camps, boosting organizational and strategic action thinking for interns.",
      category: "Empowerment"
    }
  ];

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sneha Rao",
      role: "College Student / Project Vikas Intern",
      quote: "My 3-month long internship under InAmigos restructured my entire life view. The hands-on experience of coordinating Project Bachpanshala's children was beautiful and deeply rewarding.",
      photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100"
    },
    {
      id: 2,
      name: "Aarav Mehta",
      role: "Technology Lead / Active Environment Volunteer",
      quote: "Project Prakriti is incredibly systematic. From geolocating trees to tracking soil moisture, the foundation doesn't just plant saplings but ensures they grow into green, dense microforests.",
      photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100"
    },
    {
      id: 3,
      name: "Meera Deshmukh",
      role: "Community Women Champion / Beneficiary",
      quote: "Before joining Project Udaan, I was limited inside my walls. The technical tailoring workshops let me launch a microshop at my street. I am financially stable and confident now.",
      photoUrl: "https://images.unsplash.com/photo-1563122870-6b0b48a0af09?q=80&w=100"
    }
  ];

  const renderActivePageContent = () => {
    switch (currentPage) {
      case "about":
        return <About brandConfig={brandConfig} testimonials={testimonials} onVolunteerClick={() => navigateTo("volunteer")} />;
      case "projects":
        return (
          <Projects
            brandConfig={brandConfig}
            ongoingProjects={ongoingProjects}
            onDonateClick={triggerDonateFlow}
            onProjectDetailsClick={(p) => setSelectedProjectForModal(p)}
          />
        );
      case "impact":
        return <Impact brandConfig={brandConfig} onDonateClick={triggerDonateFlow} />;
      case "gallery":
        return <Gallery brandConfig={brandConfig} galleryItems={galleryItems} />;
      case "volunteer":
        return <Volunteer brandConfig={brandConfig} />;
      case "home":
      default:
        return <Home brandConfig={brandConfig} onDonateClick={() => navigateTo("projects")} onVolunteerClick={() => navigateTo("volunteer")} onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen text-slate-800 flex flex-col justify-between">
      
      {/* GLOBAL HEADER HEADER */}
      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b border-transparent ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-md py-4 border-slate-150" : "bg-white/80 py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo Signage */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo("home")}>
              {customLogo ? (
                <img
                  src={customLogo}
                  alt="Organization Logo"
                  className="w-14 h-14 rounded-full object-cover border border-brand-green/30"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-brand-green flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
              )}
              <div>
                <span className="font-heading font-extrabold text-xl text-brand-blue tracking-tight hover:text-brand-green transition-colors leading-none block">
                  {customName}
                </span>
                <span className="text-[10px] uppercase font-bold text-brand-green tracking-widest mt-0.5 block leading-none">
                  {customSubtitle}
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links — linking to separate .html representation seamlessly! */}
            <div className="hidden md:flex items-center gap-7">
              {[
                { name: "Home", key: "home", href: "index.html" },
                { name: "About", key: "about", href: "about.html" },
                { name: "Projects", key: "projects", href: "projects.html" },
                { name: "Impact", key: "impact", href: "impact.html" },
                { name: "Gallery", key: "gallery", href: "gallery.html" },
                { name: "Volunteer", key: "volunteer", href: "volunteer.html" }
              ].map((navItem) => (
                <a
                  key={navItem.key}
                  href={`/${navItem.href}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo(navItem.key as any);
                  }}
                  className={`text-sm font-bold tracking-wide transition-colors cursor-pointer ${
                    currentPage === navItem.key
                      ? "text-brand-green font-extrabold border-b-2 border-brand-green pb-1"
                      : "text-brand-blue hover:text-brand-green"
                  }`}
                >
                  {navItem.name}
                </a>
              ))}
            </div>

            {/* Quick action button inside Header panel */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => navigateTo("volunteer")}
                className="bg-slate-100 hover:bg-slate-200 text-brand-blue text-xs font-extrabold px-5 py-2.5 rounded-xl transition-all cursor-pointer"
              >
                Join Chapter
              </button>
              <button
                onClick={() => triggerDonateFlow("General Fund")}
                className="bg-brand-green hover:bg-[#228f3b] text-white text-xs font-extrabold px-5 py-2.5 rounded-xl transition-all hover:scale-105 cursor-pointer shadow-md shadow-brand-green/20"
              >
                Donate
              </button>
            </div>

            {/* Mobile menu burger */}
            <div className="md:hidden flex items-center gap-3">
              <button
                onClick={() => triggerDonateFlow("General Fund")}
                className="bg-brand-green text-white text-[11px] font-extrabold px-3 py-2 rounded-xl"
              >
                Donate
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 rounded-xl bg-slate-100 text-brand-blue hover:bg-slate-200 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Stateful Mobile Links Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-slate-100"
            >
              <div className="px-4 pt-3 pb-6 space-y-2 flex flex-col font-bold">
                {[
                  { name: "Home", key: "home", href: "index.html" },
                  { name: "About", key: "about", href: "about.html" },
                  { name: "Projects", key: "projects", href: "projects.html" },
                  { name: "Impact", key: "impact", href: "impact.html" },
                  { name: "Gallery", key: "gallery", href: "gallery.html" },
                  { name: "Volunteer", key: "volunteer", href: "volunteer.html" }
                ].map((mItem) => (
                  <a
                    key={mItem.key}
                    href={`/${mItem.href}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo(mItem.key as any);
                    }}
                    className={`p-3 text-sm rounded-xl transition-all ${
                      currentPage === mItem.key
                        ? "bg-emerald-50 text-brand-green font-extrabold"
                        : "text-slate-650 hover:bg-slate-50"
                    }`}
                  >
                    {mItem.name}
                  </a>
                ))}
                
                <div className="pt-4 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigateTo("volunteer");
                    }}
                    className="w-full text-center bg-slate-100 hover:bg-slate-250 py-3 rounded-xl text-xs font-bold text-slate-750"
                  >
                    Join Internship
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      triggerDonateFlow("General Fund");
                    }}
                    className="w-full text-center bg-brand-green text-white py-3 rounded-xl text-xs font-extrabold"
                  >
                    Pledge Securely
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* RENDER ACTIVE MULTIPAGE PAGE CONTENT WITHIN ROUTER VIEW */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
          >
            {renderActivePageContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 8. GLOBAL CTA BANNER */}
      {currentPage !== "volunteer" && (
        <section className="py-24 bg-gradient-to-r from-brand-blue to-dark-blue text-white relative overflow-hidden shadow-inner w-full">
          {/* Animated background circles */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/5 rounded-full filter blur-[80px]" />
          <div className="absolute -bottom-10 left-10 w-80 h-80 bg-slate-950/20 rounded-full filter blur-[100px]" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <Heart className="w-16 h-16 mx-auto mb-6 text-brand-green scale-105 animate-pulse" />
            
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight mb-4 text-white leading-tight">
              Be the Reason Someone Smiles Today
            </h2>
            
            <p className="text-sm sm:text-lg text-slate-350 max-w-xl mx-auto leading-relaxed mb-10 font-medium">
              "Your small contribution can create a big, lasting social change." Whether it's feeding an injured stray animal or primary tutoring an elementary child, every coordinate counts.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                id="cta-volunteer-now-final"
                onClick={() => navigateTo("volunteer")}
                className="w-full sm:w-auto bg-brand-green text-white font-extrabold text-base px-8 py-4 rounded-full shadow-lg shadow-brand-green/30 hover:bg-[#228f3b] transition-all flex items-center justify-center gap-2 cursor-pointer border border-brand-green"
              >
                Volunteer With Us
              </button>
              <button
                id="cta-donate-now-final"
                onClick={() => triggerDonateFlow("General Fund")}
                className="w-full sm:w-auto bg-white/5 border border-white/20 hover:bg-white/10 hover:border-white text-white font-semibold text-base px-8 py-4 rounded-full transition-all text-center filter backdrop-blur-sm cursor-pointer"
              >
                Support Our Campaigns
              </button>
            </div>
          </div>
        </section>
      )}

      {/* GLOBAL FOOTER */}
      <footer className="bg-dark-blue text-slate-400 pt-20 pb-8 text-xs sm:text-sm border-t border-blue-950 relative w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/5">
          
          {/* Col 1: Logo & Brief Bio */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              {customLogo ? (
                <img
                  src={customLogo}
                  alt="Logo"
                  className="w-9 h-9 rounded-full object-cover border border-brand-green/30"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-brand-green flex items-center justify-center">
                  <Heart className="w-4 h-5 text-white" />
                </div>
              )}
              <div>
                <span className="font-heading font-extrabold text-lg text-white">{customName}</span>
                <span className="text-[10px] block -mt-1 text-brand-green font-semibold tracking-wider uppercase">{customSubtitle}</span>
              </div>
            </div>
            
            <p className="leading-relaxed text-slate-400 text-xs sm:text-sm">
              A registered non-profit organization committing physical student networks to deliver structural on-ground educational setups, nature tree plantations, and emergency stray animal rescue aids.
            </p>

            {/* Newsletter Subscription Card */}
            <div className="mt-4 bg-white/5 border border-white/5 p-5 rounded-2xl">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-2">Subscribe to our Newsletters</h4>
              <p className="text-[10px] text-slate-500 mb-4 leading-normal font-semibold">
                No spam. Only regular quarterly reports and upcoming local volunteer opportunities.
              </p>
              
              {newsletterSubscribed ? (
                <div className="bg-brand-green/10 border border-brand-green/30 p-3 rounded-lg flex items-center gap-2 text-brand-green font-bold text-[11px]">
                  <Check className="w-4 h-4" /> Thank you for subscribing!
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter email..."
                    className="flex-1 bg-[#001c38] border border-white/10 rounded-lg py-2 px-3 text-white text-xs focus:ring-1 focus:ring-brand-green focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-brand-green hover:bg-[#228f3b] text-white font-bold px-3 rounded-lg py-2 text-xs transition-colors flex items-center justify-center cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Col 2: Quick Links Navigation Layout */}
          <div className="md:col-span-2">
            <h4 className="text-white font-heading font-bold text-xs sm:text-sm uppercase tracking-wider mb-6 pb-2 border-b border-white/5">
              Quick Links
            </h4>
            <div className="flex flex-col gap-3 font-semibold text-xs text-slate-400">
              {[
                { name: "Home", key: "home" },
                { name: "About", key: "about" },
                { name: "Projects", key: "projects" },
                { name: "Impact", key: "impact" },
                { name: "Gallery", key: "gallery" },
                { name: "Volunteer", key: "volunteer" }
              ].map((lnk) => (
                <a
                  key={lnk.key}
                  href={`/${lnk.key === "home" ? "index.html" : `${lnk.key}.html`}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo(lnk.key as any);
                  }}
                  className={`hover:text-brand-green transition-colors ${currentPage === lnk.key ? "text-brand-green font-bold" : ""}`}
                >
                  {lnk.name}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Contact details */}
          <div className="md:col-span-3">
            <h4 className="text-white font-heading font-bold text-xs sm:text-sm uppercase tracking-wider mb-6 pb-2 border-b border-white/5">
              Contact Details
            </h4>
            <div className="flex flex-col gap-4 text-slate-400">
              <div className="flex gap-3 items-start">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-brand-green" />
                <p className="leading-relaxed text-xs">
                  InAmigos Headquarters, <br />
                  Plot 18, Block B, Sector 4, <br />
                  New Delhi, 110001, India
                </p>
              </div>

              <div className="flex gap-3 items-center">
                <Phone className="w-4 h-4 shrink-0 text-brand-green" />
                <a href="tel:+918544923122" className="hover:text-brand-green transition-colors text-xs">
                  +91-8544-923-122
                </a>
              </div>

              <div className="flex gap-3 items-center">
                <Mail className="w-4 h-4 shrink-0 text-brand-green" />
                <a href="mailto:support@inamigos.org" className="hover:text-brand-green transition-colors text-xs">
                  support@inamigos.org
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Social media & Regulatory Info */}
          <div className="md:col-span-3">
            <h4 className="text-white font-heading font-bold text-xs sm:text-sm uppercase tracking-wider mb-6 pb-2 border-b border-white/5">
              Social Community
            </h4>
            
            <div className="flex gap-3 mb-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-green hover:text-white transition-all flex items-center justify-center text-slate-300 cursor-pointer"
                aria-label="Instagram handle"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-green hover:text-white transition-all flex items-center justify-center text-slate-300 cursor-pointer"
                aria-label="LinkedIn handle"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-green hover:text-white transition-all flex items-center justify-center text-slate-300 cursor-pointer"
                aria-label="Facebook page"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>

            <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">
              InAmigos Foundation is registered u/s Section 8 of the Indian Companies Act, 2013 and Rule 18 of the IT exemption laws. All contributions receive 50% 80G tax write-off slips. Keep your donation invoices secure.
            </p>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500 text-[11px] font-medium font-sans">
          <p>© {new Date().getFullYear()} {customName} Foundation. All Rights Reserved.</p>
          <div className="flex gap-6">
            <button onClick={() => alert("Privacy specifications strictly secure all raw donor emails and phone profiles u/s 43A of the IT Protection Guidelines.")} className="hover:text-slate-400 transition-colors">Privacy Policy</button>
            <button onClick={() => alert("NGO Audit and Company files are available for download in our main office panels.")} className="hover:text-slate-400 transition-colors">Audit File Logs</button>
            <button onClick={() => alert("Welfare agreements require all street volunteers to pledge absolute non-violence while on weekend missions.")} className="hover:text-slate-400 transition-colors">Terms of Welfare</button>
          </div>
        </div>
      </footer>

      {/* FLOATING ACTION REGISTRATION BRACELET CUSTOMIZER */}
      <BrandingCustomizer
        customizerOpen={customizerOpen}
        setCustomizerOpen={setCustomizerOpen}
        brandConfig={brandConfig}
        setCustomLogo={setCustomLogo}
        setCustomName={setCustomName}
        setCustomSubtitle={setCustomSubtitle}
        setCustomHeroImage={setCustomHeroImage}
        setCustomAboutImage={setCustomAboutImage}
        handleLogoUpload={handleLogoUpload}
        handleHeroUpload={handleHeroUpload}
        handleAboutUpload={handleAboutUpload}
        handleProjectUpload={handleProjectUpload}
        handleGalleryUpload={handleGalleryUpload}
        resetToSystemDefaults={resetToSystemDefaults}
      />

      {/* MODAL 1: In-depth Project Description Detail Popup */}
      <AnimatePresence>
        {selectedProjectForModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/70 z-50 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedProjectForModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto relative p-6 sm:p-8 text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start pb-4 border-b border-slate-100 mb-6Shared text-xs sm:text-sm">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-soft-green text-soft-green-text rounded-2xl">
                    {selectedProjectForModal.icon}
                  </div>
                  <div>
                    <h3 className="font-heading font-extrabold text-2xl text-brand-blue leading-tight">
                      {selectedProjectForModal.title}
                    </h3>
                    <span className="text-brand-green font-extrabold text-xs uppercase tracking-widest block mt-0.5">
                      {selectedProjectForModal.category}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProjectForModal(null)}
                  className="p-1.5 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Photo panel */}
              <img
                src={selectedProjectForModal.image}
                alt={selectedProjectForModal.title}
                className="w-full h-52 object-cover rounded-2xl mb-6 shadow"
                referrerPolicy="no-referrer"
              />

              <h4 className="font-bold text-brand-blue border-l-2 border-brand-green pl-3 mb-2 text-sm sm:text-base">About the Campaign</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                {selectedProjectForModal.longDescription}
              </p>

              {/* Achievements details */}
              <h4 className="font-bold text-brand-blue border-l-2 border-brand-green pl-3 mb-3 text-sm sm:text-base">Latest Achievements</h4>
              <ul className="space-y-2.5 mb-6 text-xs sm:text-sm text-slate-600 font-semibold">
                {selectedProjectForModal.achievements.map((ach, ind) => (
                  <li key={ind} className="flex gap-2.5 items-start">
                    <Check className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>

              {/* Volunteer roles */}
              <h4 className="font-bold text-brand-blue border-l-2 border-brand-green pl-3 mb-3 text-sm sm:text-base font-heading">On-Ground Volunteer Roles Needed</h4>
              <div className="flex flex-wrap gap-2 mb-8">
                {selectedProjectForModal.volunteerRoles.map((role) => (
                  <span key={role} className="bg-slate-100 text-slate-650 text-xs py-1.5 px-3 rounded-lg border border-slate-200 font-bold">
                    {role}
                  </span>
                ))}
              </div>

              {/* Modal buttons */}
              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button
                  onClick={() => {
                    setSelectedProjectForModal(null);
                    navigateTo("volunteer");
                  }}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3.5 px-4 rounded-xl transition-colors text-center cursor-pointer text-xs"
                >
                  Apply to Volunteer
                </button>
                <button
                  onClick={() => {
                    const titleSelected = selectedProjectForModal.title;
                    setSelectedProjectForModal(null);
                    triggerDonateFlow(titleSelected);
                  }}
                  className="flex-1 bg-brand-green hover:bg-[#228f3b] text-white font-extrabold py-3.5 px-4 rounded-xl transition-colors text-center cursor-pointer shadow-md shadow-brand-green/20 text-xs"
                >
                  Fund This Project
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL 2: Interactive Donation Flow and Exemption Slip */}
      <AnimatePresence>
        {donateModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/70 z-50 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={handleResetDonation}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-white rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto relative p-6 sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleResetDonation}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>

              {paymentComplete ? (
                /* Success celebration frame */
                <div className="text-center py-6 text-xs sm:text-sm text-slate-600">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-brand-green mx-auto flex items-center justify-center mb-6 text-brand-green">
                    <Check className="w-8 h-8 font-extrabold" />
                  </div>
                  
                  <h3 className="font-heading font-extrabold text-2xl text-brand-blue mb-2 leading-none">Thank you, Changemaker!</h3>
                  <p className="text-[10px] text-brand-green font-extrabold uppercase tracking-widest mb-6 block">Payment Processed Successfully</p>
                  
                  {/* Generated virtual certificate */}
                  <div className="bg-[#002244] border border-blue-900/40 p-6 rounded-2xl text-white text-left relative overflow-hidden mb-6">
                    <div className="absolute top-3 right-4 text-[8px] uppercase tracking-wider text-brand-green font-bold">Official Certification</div>
                    
                    <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">InAmigos Certificate of Compassion</span>
                    <p className="text-slate-300 text-xs leading-relaxed mt-4">
                      This confirms that <strong className="text-white">{donorName}</strong> has supported <strong>"{selectedDonationCause}"</strong> at {customName} Foundation with a contribution of <strong>₹{Number(donationAmount).toLocaleString("en-IN")} INR</strong>.
                    </p>
                    
                    <div className="border-t border-white/5 mt-6 pt-3 flex justify-between items-center text-[9px] text-slate-400 font-mono">
                      <span>Ref Code: INA-{Math.floor(100000 + Math.random() * 900000)}</span>
                      <span className="text-brand-green font-semibold uppercase">Verified NGO Seal</span>
                    </div>
                  </div>

                  <p className="text-slate-500 text-xs leading-relaxed mb-6 font-semibold">
                    Your formal 80G tax exemption receipt has been sent to your email (<strong>{donorEmail}</strong>).
                  </p>

                  <button
                    onClick={handleResetDonation}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition-all cursor-pointer"
                  >
                    Return to Pages
                  </button>
                </div>
              ) : (
                /* Interactive payment formulation inputs */
                <div>
                  <div className="text-center mb-6">
                    <HeartHandshake className="w-10 h-10 text-brand-green mx-auto mb-2 font-normal" />
                    <h3 className="font-heading font-extrabold text-2xl text-brand-blue leading-none">Support Our Mission</h3>
                    <p className="text-xs text-slate-400 leading-snug mt-1">100% Secure. Government Tax Exempted.</p>
                  </div>

                  <form onSubmit={handleProcessPayment} className="space-y-5 text-xs sm:text-sm text-slate-700 font-semibold">
                    
                    {/* Cause selector */}
                    <div>
                      <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">1. Directed Cause</label>
                      <select
                        value={selectedDonationCause}
                        onChange={(e) => setSelectedDonationCause(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 text-xs focus:ring-1 focus:ring-brand-green focus:outline-none focus:border-brand-green font-bold"
                      >
                        <option value="General Fund">General Core Welfare Fund</option>
                        <option value="Project Bachpanshala">Project Bachpanshala (Children Education)</option>
                        <option value="Project Prakriti">Project Prakriti (Afforestation)</option>
                        <option value="Project Jeev">Project Jeev (Rescue Animal Feed)</option>
                        <option value="Project Udaan">Project Udaan (Women Sewing Vocations)</option>
                        <option value="Project Seva">Project Seva (Relief & Food)</option>
                        <option value="Project Vikas">Project Vikas (Leadership Internships)</option>
                      </select>
                    </div>

                    {/* Frequency selector */}
                    <div>
                      <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">2. Gift Frequency</label>
                      <div className="grid grid-cols-2 gap-2">
                        {["One-time", "Monthly"].map((mode) => (
                          <button
                            key={mode}
                            type="button"
                            onClick={() => setDonationFrequency(mode as any)}
                            className={`py-2 px-3 text-xs border rounded-xl text-center font-bold tracking-wide transition-all ${
                              donationFrequency === mode
                                ? "bg-slate-900 border-slate-900 text-white"
                                : "bg-white border-slate-200 hover:bg-slate-50 text-slate-600 cursor-pointer"
                            }`}
                          >
                            {mode === "Monthly" ? "Give Monthly Circles" : "Single Gift"}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quick values layout */}
                    <div>
                      <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">3. Donation Amount (INR / ₹)</label>
                      <div className="grid grid-cols-4 gap-2 mb-3">
                        {["500", "1500", "3500", "7000"].map((pt) => (
                          <button
                            key={pt}
                            type="button"
                            onClick={() => {
                              setDonationAmount(pt);
                              setCustomAmountActive(false);
                            }}
                            className={`py-2 text-xs border rounded-xl font-bold tracking-wider transition-all ${
                              donationAmount.toString() === pt && !customAmountActive
                                ? "border-brand-green bg-brand-green/10 text-brand-green font-extrabold"
                                : "bg-white border-slate-200 hover:bg-slate-50 text-slate-600 cursor-pointer"
                            }`}
                          >
                            ₹{Number(pt).toLocaleString("en-IN")}
                          </button>
                        ))}
                      </div>

                      {customAmountActive ? (
                        <div className="relative">
                          <span className="absolute left-3.5 top-2.5 text-xs text-slate-450 font-bold">₹</span>
                          <input
                            type="number"
                            required
                            min="200"
                            placeholder="Enter Custom Amount..."
                            value={donationAmount}
                            onChange={(e) => setDonationAmount(e.target.value)}
                            className="w-full bg-slate-50 border border-brand-green rounded-xl py-2 pl-7 pr-3 text-xs text-slate-900 focus:outline-none focus:border-brand-green font-bold"
                          />
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setCustomAmountActive(true);
                            setDonationAmount("");
                          }}
                          className="w-full text-center text-[11px] text-slate-500 font-bold border border-dashed border-slate-250 py-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          + Type Custom Amount (Min ₹200)
                        </button>
                      )}
                    </div>

                    {/* User profile */}
                    <div className="space-y-3">
                      <label className="block text-[10px] text-slate-400 font-bold uppercase block -mb-1">4. Contact Information</label>
                      <input
                        type="text"
                        required
                        placeholder="Your Full Name..."
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-brand-green"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Your Email Address..."
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-brand-green"
                      />
                    </div>

                    {/* Action submit button */}
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-brand-green hover:bg-[#228f3b] text-white font-extrabold text-sm rounded-xl tracking-wide shadow-md transition-all cursor-pointer shadow-brand-green/20"
                    >
                      Process Payment (₹{Number(donationAmount || 0).toLocaleString("en-IN")})
                    </button>

                    <p className="text-center text-[9px] text-slate-450 italic leading-snug font-bold">
                      🔒 Secured SSL Certified Node Gateway. 501(c)3 & 80G Receipts generated instantly.
                    </p>
                  </form>
                </div>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
