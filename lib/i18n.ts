import { translations } from "./translations";

export type Lang = "en" | "es";
export type Translations = (typeof translations)[Lang];

export interface Project {
	title: string;
	description: string;
	technologies: string[];
	images: string[];
	github: string[];
	website?: string;
	isTeam?: boolean;
}

export interface FinalCard {
	title: string;
	description: string;
	buttonText: string;
}

export interface ProjectsTranslation {
	title: string;
	isTeamText: string;
	viewMore: string;
	viewLess: string;
	viewGithub: string;
	viewWebsite: string;
	data: Project[];
	finalCard: FinalCard;
}

export interface ExperienceEntry {
	title: string;
	link: string;
	company: string;
	period: string;
	logo?: string;
	description: string;
}
