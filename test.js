let { SteamApiWrapper, Friend } = require('./dist/index')

let steam = new SteamApiWrapper("ED4F36E3DABC42D304714AB5941DAF94")

//my id 76561198140528342


async function main() {
    let a = (await steam.getFriendList("76561198140528342"));
    console.log(a.friendslist.friends.length)
}

main()