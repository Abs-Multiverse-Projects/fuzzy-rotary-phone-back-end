export interface PlayerSummaryResponse {
	response: PlayerSummary;
}

export interface PlayerSummary {
	players: Player[];
}

export interface Player {
	steamid: string;
	communityvisibilitystate: number;
	profilestate: number;
	personaname: string;
	profileurl: string;
	avatar: string;
	avatarmedium: string;
	avatarfull: string;
	avatarhash: string;
	lastlogoff: number;
	personastate: number;
	primaryclanid: string;
	timecreated: number;
	personastateflags: number;
}

export interface OwnedGamesResponse {
	GamesResponse: GamesResponse;
}

export interface GamesResponse {
	game_count: number;
	games: Game[];
}

export interface Game {
	appid: number;
	playtime_forever: number;
	playtime_windows_forever: number;
	playtime_mac_forever: number;
	playtime_linux_forever: number;
	rtime_last_played: number;
}

export interface FriendsListResponse {
	friendslist: Friendslist;
}

export interface Friendslist {
	friends: Friend[];
}

export interface Friend {
	steamid: string;
	relationship: Relationship;
	friend_since: number;
}

export enum Relationship {
	Friend = "friend",
}

export interface PlayerAchievementsResponse {
	playerstats: Playerstats;
}

export interface Playerstats {
	steamID: string;
	gameName: string;
	achievements: Achievement[];
	success: boolean;
	error?: string;
}

export interface Achievement {
	apiname: string;
	achieved: number;
	unlocktime: number;
}

export interface PlayerIDResponse {
	response: IDResponse;
}

export interface IDResponse {
	success: 1 | 42; // 1 = true, 42 = false
	steamid?: string;
	message?: string;
}

export interface PlayerLevelResponse {
	response: LevelResponse;
}

export interface LevelResponse {
	player_level: number;
}