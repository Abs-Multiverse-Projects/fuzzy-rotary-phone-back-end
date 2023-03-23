import { Request, Response, Router } from "express";
import fetch from "isomorphic-fetch";
import { CONSTANTS } from "../../constants";
import dotenv from "dotenv";
import {
	FriendsListResponse,
	OwnedGamesResponse,
	PlayerAchievementsResponse,
	PlayerIDResponse,
	PlayerSummaryResponse,
} from "../../types/steam";

dotenv.config();

const steamRouter: Router = Router();

steamRouter.post("/:username/id", async (req: Request, res: Response) => {
	try {
		const queryParams: string = `key=${process.env.STEAM_API_KEY}&vanityurl=${req.params.username}`;
		const apiResponse = await fetch(
			`${CONSTANTS.STEAM_BASE_URL}/ISteamUser/ResolveVanityURL/v0001/?${queryParams}`
		);
		const data: PlayerIDResponse = await apiResponse.json();

		if (data.response.success === 42) throw new Error(data.response.message);
		else res.json({ success: true, username: req.params.username, data });
	} catch (error) {
		if (error instanceof Error)
			res.status(404).json({ success: false, error: error.message });
		else res.status(418).json({ success: false, error });
	}
});

// pass in a playerId as a parameter to replace /:playerId
steamRouter.post(
	"/:playerId/player-summary",
	async (req: Request, res: Response) => {
		try {
			const queryParams: string = `key=${process.env.STEAM_API_KEY}&steamids=${req.params.playerId}`;
			const apiResponse = await fetch(
				`${CONSTANTS.STEAM_BASE_URL}/ISteamUser/GetPlayerSummaries/v0002/?${queryParams}`
			);
			const data: PlayerSummaryResponse = await apiResponse.json();

			res.json({ success: true, data });
		} catch (error) {
			if (error instanceof Error)
				res.status(404).json({ success: false, error: error.message });
			else res.status(418).json({ success: false, error });
		}
	}
);

// pass in a playerId as a parameter to replace /:playerId
steamRouter.post("/:playerId/games", async (req: Request, res: Response) => {
	try {
		const queryParams: string = `key=${process.env.STEAM_API_KEY}&steamid=${req.params.playerId}&format=json`;
		const apiResponse = await fetch(
			`${CONSTANTS.STEAM_BASE_URL}/IPlayerService/GetOwnedGames/v0001/?${queryParams}`
		);
		const data: OwnedGamesResponse = await apiResponse.json();

		res.json({ success: true, data });
	} catch (error) {
		if (error instanceof Error)
			res.status(404).json({ success: false, error: error.message });
		else res.status(418).json({ success: false, error });
	}
});

// pass in a playerId as parameter
// pass in relationship (friend or all, default will be all) & format (default is json) as req.body.relationship & req.body.format respectively
steamRouter.post(
	"/:playerId/friends-list",
	async (req: Request, res: Response) => {
		try {
			const queryParams: string = `key=${process.env.STEAM_API_KEY}&steamid=${
				req.params.playerId
			}&relationship=${req.body.relationship ?? "all"}&format=${
				req.body.format ?? "json"
			}`;
			const apiResponse = await fetch(
				`${CONSTANTS.STEAM_BASE_URL}/ISteamUser/GetFriendList/v0001/?${queryParams}`
			);
			const data: FriendsListResponse = await apiResponse.json();

			if (data.friendslist.friends.length === 0) throw new Error();

			res.json({ success: true, data });
		} catch (error) {
			if (error instanceof Error)
				res.status(404).json({ success: false, error: error.message });
			else res.status(418).json({ success: false, error });
		}
	}
);

// pass in playerId as param & appId (game id) as params
steamRouter.post(
	"/:playerId/achievements/:appId",
	async (req: Request, res: Response) => {
		try {
			const queryParams: string = `key=${process.env.STEAM_API_KEY}&appid=${req.params.appId}&steamid=${req.params.playerId}`;

			const apiResponse = await fetch(
				`${CONSTANTS.STEAM_BASE_URL}/ISteamUserStats/GetPlayerAchievements/v0001/?${queryParams}`
			);
			const data: PlayerAchievementsResponse = await apiResponse.json();

			if (!data.playerstats.success) throw new Error(data.playerstats.error);

			res.json({ success: true, data });
		} catch (error) {
			if (error instanceof Error)
				res.status(404).json({ success: false, error: error.message });
			else res.status(418).json({ success: false, error });
		}
	}
);

steamRouter.post("/:playerId/level", async (req: Request, res: Response) => {
	try {
		const queryParams: string = `key=${process.env.STEAM_API_KEY}&steamid=${req.params.playerId}`;
		const apiResponse = await fetch(
			`${CONSTANTS.STEAM_BASE_URL}/IPlayerService/GetSteamLevel/v1/?${queryParams}`
		);

		const data = await apiResponse.json();
		res.json({ success: true, data });
	} catch (error) {
		if (error instanceof Error)
			res.status(404).json({ success: false, error: error.message });
		else res.status(418).json({ success: false, error });
	}
});

export default steamRouter;
