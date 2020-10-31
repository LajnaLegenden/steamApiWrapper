import HttpClient from './httpClient'

export class SteamApiWrapper extends HttpClient {
    //https://developer.valvesoftware.com/wiki/Steam_Web_API
    constructor(private apiKey: string) {
        super('http://api.steampowered.com')
    }

    public getNewsForApp = (appid: string, count: number = 3, maxLength: number = 300) => this.instance.get<News>('/ISteamNews/GetNewsForApp/v0002/', {
        params: {
            appid,
            count,
            maxLength,
            format: "json"
        }
    });

    /**
     * 
     * @param gameid AppID of the game you want the stats of.
     */
    public getGlobalAchievementPercentagesForApp = (gameid: string) => this.instance.get<AchievementPercentages>('/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/', {
        params: {
            gameid,
            format: "json"
        }
    });




    /**
     * Returns basic profile information for a list of 64-bit Steam IDs.
     * @param steamids Array, or string (comma separated) list of 64 bit Steam IDs to return profile information for. Up to 100 Steam IDs can be requested.
     */
    public getPlayerSummaries = (steamids: string[] | string) => {
        let ids = steamids;
        if (Array.isArray(steamids)) ids = steamids.join(",")
        return this.instance.get<GetPlayerSummaries>('/ISteamUser/GetPlayerSummaries/v0002/', {
            params: {
                steamids: ids,
                format: "json",
                key: this.apiKey,

            }
        });
    }
    /**
     * Returns the friend list of any Steam user, provided their Steam Community profile visibility is set to "Public".
     * @param steamid 64 bit Steam ID to return friend list for.
     */
    public getFriendList = (steamid: string) => this.instance.get<GetFriendList>('/ISteamUser/GetFriendList/v0001/', {
        params: {
            steamid,
            format: "json",
            key: this.apiKey,
            relationship: "friend"
        }
    });
    /**
     * Returns a list of achievements for this user by app id
     * @param steamid 64 bit Steam ID to return achievements for.
     * @param appid The ID for the game you're requesting
     */
    public getPlayerAchievements = (steamid: string, appid: string) => this.instance.get<GetFriendList>('/ISteamUser/GetFriendList/v0001/', {
        params: {
            steamid, appid,
            format: "json",
            key: this.apiKey
        }
    });
    /**
     * Returns a list of achievements for this user by app id
     * @param steamid 64 bit Steam ID to return achievements for.
     * @param appid The ID for the game you're requesting
     */
    public getUserStatsForGame = (steamid: string, appid: string) => this.instance.get<PlayerStatsRoot>('/ISteamUserStats/GetUserStatsForGame/v0002/', {
        params: {
            steamid, appid,
            format: "json",
            key: this.apiKey
        }
    });
    /**
     * GetOwnedGames returns a list of games a player owns along with some playtime information, if the profile is publicly visible. Private, friends-only, and other privacy settings are not supported unless you are asking for your own personal details (ie the WebAPI key you are using is linked to the steamid you are requesting).
     * @param steamid The SteamID of the account.
     * @param includeAppInfo Include game name and logo information in the output. The default is to return appids only.
     * @param includeFree By default, free games like Team Fortress 2 are excluded (as technically everyone owns them). If include_played_free_games is set, they will be returned if the player has played them at some point. This is the same behavior as the games list on the Steam Community.
     */
    public getOwnedGames = (steamid: string, includeAppInfo: boolean = true, includeFree: boolean = true) => this.instance.get<OwnedGamesRoot>('/IPlayerService/GetOwnedGames/v0001/', {
        params: {
            steamid,
            format: "json",
            key: this.apiKey, include_played_free_games: includeFree,
            include_appinfo: includeAppInfo
        }
    });
    /**
     * GetRecentlyPlayedGames returns a list of games a player has played in the last two weeks, if the profile is publicly visible. Private, friends-only, and other privacy settings are not supported unless you are asking for your own personal details (ie the WebAPI key you are using is linked to the steamid you are requesting).
     * @param steamid The SteamID of the account.
     */
    public getRecentlyPlayedGames = (steamid: string) => this.instance.get<RecentGamesRoot>('/IPlayerService/GetRecentlyPlayedGames/v0001/', {
        params: {
            steamid,
            format: "json",
            key: this.apiKey,
        }
    });


}
////#region types
export interface News {
    appnews: AppNews;
}

export interface AppNews {
    appid: number;
    newsitems: NewsItem[];
    count: number;
}

export interface NewsItem {
    gid: string;
    title: string;
    url: string;
    is_external_url: boolean;
    author: string;
    contents: string;
    feedlabel: string;
    date: number;
    feedname: string;
    feed_type: number;
    appid: number;
}

export interface AchievementPercentages {
    achievementpercentages: Achievements;
}

export interface Achievements {
    achievements: Achievement[];
}

export interface Achievement {
    name: string;
    percent: number;
}

export interface GetPlayerSummaries {
    response: GetPlayerSummariesResponse;
}

export interface GetPlayerSummariesResponse {
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
    personastate: number;
    realname: string;
    primaryclanid: string;
    timecreated: number;
    personastateflags: number;
    loccountrycode: string;
    locstatecode: string;
    loccityid: number;
}

export interface GetFriendList {
    friendslist: Friendslist;
}

export interface Friendslist {
    friends: Friend[];
}

export interface Friend {
    steamid: string;
    relationship: string;
    friend_since: number;
}

export interface PlayerStatsRoot {
    playerstats: PlayerStats;
}

export interface PlayerStats {
    steamID: string;
    gameName: string;
    stats: Stat[];
}

export interface Stat {
    name: string;
    value: number;
}

export interface OwnedGamesRoot {
    response: GamesRoot;
}

export interface GamesRoot {
    game_count: number;
    games: Game[];
}


export interface RecentGamesRoot {
    response: RecentGames;
}

export interface RecentGames {
    total_count: number;
    games: Game[];
}

export interface Game {
    appid: number;
    name: string;
    playtime_2weeks: number;
    playtime_forever: number;
    img_icon_url: string;
    img_logo_url: string;
    playtime_windows_forever: number;
    playtime_mac_forever: number;
    playtime_linux_forever: number;
}

////#endregion types

function log(...args) {
    if (process.env.NODE_ENV == "dev") console.log(args.toString())
}