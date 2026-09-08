export interface CaseStudy {
  projectId: string;
  title: string;
  company: string;
  category: string;
  overview: string;
  challenge: string;
  solution: string[];
  technologies: string[];
  results: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
  github?: string;
  live?: string;
  architecture?: string;
}

/** Populated when Projects section is re-enabled with Abdul's work. */
export const caseStudies: CaseStudy[] = [];
