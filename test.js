let { SteamApiWrapper, Friend } = require('./dist/index')

let steam = new SteamApiWrapper("exampleKey")

//my id 76561198140528342


async function main() {
    let a = (await steam.getFriendList("76561198140528342"));
    console.log(a.friendslist.friends.length)
}

main()