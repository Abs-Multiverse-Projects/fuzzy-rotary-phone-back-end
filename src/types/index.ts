export interface Auth {
	accessToken: string;
	expiresIn: number;
	idToken: string;
	refreshToken: string;
	refreshTokenExpiresIn: number;
	scope: string;
	tokenType: string;
}

export interface Titles {
	trophyTitles: TrophyTitle[];
	totalItemCount: number;
}

export interface TrophyTitle {
	npServiceName: NPServiceName;
	npCommunicationId: string;
	trophySetVersion: string;
	trophyTitleName: string;
	trophyTitleIconUrl: string;
	trophyTitlePlatform: TrophyTitlePlatform;
	hasTrophyGroups: boolean;
	definedTrophies: NedTrophies;
	progress: number;
	earnedTrophies: NedTrophies;
	hiddenFlag: boolean;
	lastUpdatedDateTime: Date;
	trophyTitleDetail?: string;
}

export interface NedTrophies {
	bronze: number;
	silver: number;
	gold: number;
	platinum: number;
}

export enum NPServiceName {
	Trophy = "trophy",
	Trophy2 = "trophy2",
}

export enum TrophyTitlePlatform {
	Ps4 = "PS4",
	Ps5 = "PS5",
}
