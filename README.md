# Central Gaming Intelligence API
The backend for my [frontend project](https://github.com/Abs-Multiverse-Projects/fuzzy-rotary-phone). Includes routes for calls to [psn-api](https://psn-api.achievements.app/) while avoiding cors errors.

#### Todo:
- [x] routes for psn-api – [commit](https://github.com/Abs-Multiverse-Projects/fuzzy-rotary-phone-back-end/commit/28f9af75912ce87331de98e4c068df6b01719efb)
- [ ] routes for steam api
- [ ] routes for xbox api
## Routes:

### Authentication

```typescript
PUT '/psn/auth' => { success: <boolean>, auth: { /* authentication object */ } }
```

Returns an object that includes an access token. This ==entire object== is passed into each call to this api as the value for `request.body.auth`. For refreshing a pre-existing auth token, see [refresh auth](#refresh-auth).

#### Request body object

```typescript
{
} // no request body object required for this endpoint
```

---

### Refresh Auth

```typescript
POST '/psn/refresh-auth' => { success: <boolean>, auth: { /* authentication object */ } }
```

Used to refresh an auth token when it has expired. Pass in the expired token's "refreshToken" key found in `auth.refreshToken` into `request.body.refreshToken`.
Returns an auth object identical to [/auth](#authentication).

#### Request body object

```typescript
{
	refreshToken: <string>
}
```

---

### Get a User's Titles

```typescript
POST '/psn/titles' => { success: <boolean>, titles: { /* list of titles */ } }
```

Pass in auth object into `request.body.auth` and ==accountId== into `request.body.user`.
If accountId is unknown, use [profile endpoint](#get-a-users-profile) to get this first.

#### Request body object

```typescript
{
	auth: { /* auth object from /auth endpoint */ },
	user: <string> // accountId should go here
}
```

---

### Find a User

```typescript
POST '/psn/user' => { success: <boolean>, user: { /* found user object */ } }
```

Pass in auth object into `request.body.auth` and ==username== into `request.body.user`. If no username is passed in, the signed in user's information is returned (based on .env files NPSSO key).

#### Request body object

```typescript
{
	auth: { /* auth object returned from /auth endpoint */ },
	user: <string> // username being searched for, e.g. roundedOrange1
}
```

---

### Get a User's Profile

```typescript
POST '/psn/profile' => { success: <boolean>, profile: { /* user's profile object */} }
```

Pass in auth object into `request.body.auth` and either an ==accountId== or a ==username== into `request.body.user`. Return's a user's profile information.

#### Request body object

```typescript
{
	auth: { /* auth object returned from /auth endpoint */},
	user: <string> // username or accountId as a string
}
```

---

### Get a User's Friends List

```typescript
POST '/psn/friends-list' => { success: <boolean>, friendsList: { /* friendsList object */ } }
```

Pass in auth object into `request.body.auth` and ==accountId== into `request.body.user`. If that user has their friends list set to private, this will return an error.

#### Request body object

```typescript
{
	auth: { /* auth object returned from /auth endpoint */ },
	user: <string> // user's accountId whose friendslist you wish to retrieve
}
```
