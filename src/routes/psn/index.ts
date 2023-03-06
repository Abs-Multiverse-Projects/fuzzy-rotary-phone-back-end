import { Request, Response, Router } from "express";
import dotenv from "dotenv";
import {
	exchangeNpssoForCode,
	exchangeRefreshTokenForAuthTokens,
	exchangeCodeForAccessToken,
	getUserTitles,
	makeUniversalSearch,
	UserTitlesResponse,
	UniversalSearchResponse,
	SocialAccountResult,
	getProfileFromAccountId,
	getProfileFromUserName,
	ProfileFromAccountIdResponse,
	ProfileFromUserNameResponse,
	getUserFriendsAccountIds,
	GetUserFriendsAccountIdsResponse,
} from "psn-api";
import { Auth } from "../../types";

dotenv.config();

const psnRouter: Router = Router();

psnRouter.get("/auth", async (req: Request, res: Response) => {
	try {
		const code: string = await exchangeNpssoForCode(process.env.NPSSO!);
		const authorization = await exchangeCodeForAccessToken(code);
		res.send({ success: true, auth: authorization });
	} catch (error) {
		res.send({ success: false, error });
	}
});

// pass in refreshToken from '/auth' in req.body.refreshToken to refresh and get new token (without re-authenticating)
psnRouter.get("/refresh-auth", async (req: Request, res: Response) => {
	try {
		const refreshToken: string = req.body.refreshToken;
		const newAuthToken: Auth = await exchangeRefreshTokenForAuthTokens(
			refreshToken
		);
		res.send({ success: true, auth: newAuthToken });
	} catch (error) {
		res.send({ success: false, error });
	}
});

// pass in auth object (returned from '/auth') in req.body.auth
// can pass in accountId to get titles of that specific account (get accountId from '/profile' passing in a username)
psnRouter.get("/titles", async (req: Request, res: Response) => {
	const auth: Auth = req.body.auth;
	try {
		if (req.body.user) {
			const titles: UserTitlesResponse = await getUserTitles(
				auth,
				req.body.user
			);
			res.send({ success: true, titles });
		}
		const titles: UserTitlesResponse = await getUserTitles(auth, "me");
		res.send({ success: true, titles });
	} catch (error) {
		res.send({ success: false, error });
	}
});

// to search for a user (pass in auth received from '/auth' in req.body.auth and username in req.body.user)
// if req.body.user is left empty, signedIn user is searched for instead (roundedOrange1)
psnRouter.get("/user", async (req: Request, res: Response) => {
	try {
		const auth: Auth = req.body.auth;
		const user: UniversalSearchResponse<SocialAccountResult> =
			await makeUniversalSearch(
				auth,
				req.body.user ?? "me",
				"SocialAllAccounts"
			);
		res.send({ success: true, user });
	} catch (error) {
		res.send({ success: false, error });
	}
});

// given either an accountId or username as value for req.body.user
psnRouter.get("/profile", async (req: Request, res: Response) => {
	try {
		const auth: Auth = req.body.auth;
		if (Number(req.body.user)) {
			const profile: ProfileFromAccountIdResponse =
				await getProfileFromAccountId(auth, req.body.user);
			res.send({ success: true, profile });
		} else {
			const profile: ProfileFromUserNameResponse = await getProfileFromUserName(
				auth,
				req.body.user
			);
			res.send({ success: true, profile });
		}
	} catch (error) {
		res.send({ success: false, error });
	}
});

// get specified user's friends list given accountId (NOT USERNAME) in req.body.user
// if user has this to private, will return error
psnRouter.get("/friends-list", async (req: Request, res: Response) => {
	try {
		const auth: Auth = req.body.auth;
		const friendsList: GetUserFriendsAccountIdsResponse =
			await getUserFriendsAccountIds(auth, req.body.user);
		res.send({ success: true, friendsList });
	} catch (error) {
		res.send({
			success: false,
			message:
				"Incorrect parameters or that user has friends-list set to private.",
			error,
		});
	}
});

export default psnRouter;
