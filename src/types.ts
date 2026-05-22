import { ReactNode } from "react";

export interface Project {
  id: string;
  title: string;
  tagline: string;
  icon: ReactNode;
  category: "Education" | "Environment" | "Animal Welfare" | "Empowerment" | "Relief" | "Skill Development";
  image: string;
  description: string;
  impactMetrics: string;
  longDescription: string;
  achievements: string[];
  volunteerRoles: string[];
  fundingGoal: number;
  fundsRaised: number;
}

export interface GalleryItem {
  id: number;
  title: string;
  photoUrl: string;
  caption: string;
  category: "Education" | "Environment" | "Welfare" | "Empowerment";
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  photoUrl: string;
}

export interface BrandConfig {
  customLogo: string | null;
  customName: string;
  customSubtitle: string;
  customHeroImage: string;
  customAboutImage: string;
  customProjectImages: Record<string, string>;
  customGalleryImages: Record<number, string>;
}
