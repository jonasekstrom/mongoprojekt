function getGenreState(action) {
  return {
    ROCK: action.data.ROCK,
    METAL: action.data.METAL,
    CLASSICAL: action.data.CLASSICAL,
    COUNTRY: action.data.COUNTRY,
    POPMUSIC: action.data.POPMUSIC,
    BLUES: action.data.BLUES,
    JAZZ: action.data.JAZZ,
    ELECTRO: action.data.ELECTRO,
    HIPHOP: action.data.HIPHOP
  }
}



function onClickedGenre(searchInfo, genre) {

  let howManyTrue = 0
  for (let x in searchInfo) {
    if (searchInfo[x] === true) {
      howManyTrue += 1
    }
  }

  if (howManyTrue > 2) {

    return {
      type: "GENRELIMIT",
      data: searchInfo,

    }
  }


  let currentAction = ""

  for (let x in searchInfo) {
    if (genre === x) {
      searchInfo[x] = true;
      currentAction = x
    } else {
      switch (x) {

        case "rock":
          searchInfo[x] = searchInfo.rock
          break;
        case "metal":
          searchInfo[x] = searchInfo.metal

          break;
        case "classical":
          searchInfo[x] = searchInfo.classical

          break;
        case "country":
          searchInfo[x] = searchInfo.country

          break;
        case "popMusic":
          searchInfo[x] = searchInfo.popMusic

          break;
        case "blues":
          searchInfo[x] = searchInfo.blues

          break;
        case "jazz":
          searchInfo[x] = searchInfo.jazz

          break;
        case "electro":
          searchInfo[x] = searchInfo.jazz

          break;
        case "hiphop":
          searchInfo[x] = searchInfo.jazz
          break;
        default:
      }
    }
  }

  return {
    type: currentAction + "_CLICKED",
    data: searchInfo,
  }
}

function offClickedGenre(searchInfo, genre) {
  let currentAction = ""

  for (let x in searchInfo) {
    if (genre === x) {
      searchInfo[x] = false;
      currentAction = x
    } else {
      switch (x) {

        case "rock":
          searchInfo[x] = searchInfo.rock
          break;
        case "metal":
          searchInfo[x] = searchInfo.metal

          break;
        case "classical":
          searchInfo[x] = searchInfo.classical

          break;
        case "country":
          searchInfo[x] = searchInfo.country

          break;
        case "popMusic":
          searchInfo[x] = searchInfo.popMusic

          break;
        case "blues":
          searchInfo[x] = searchInfo.blues

          break;
        case "jazz":
          searchInfo[x] = searchInfo.jazz

          break;
        default:

      }
    }

  }
  return {
    type: currentAction + "_UNCLICKED",
    data: searchInfo
  }
}

function updateList(data, allPlayLists, oldData) {
  let updatedList = {}
  let listName;
  let genres;
  let desc;
  let spotify;

  for (let i = 0; i < allPlayLists.length; i++) {
    if (allPlayLists[i].id === data.listId) {
      if (data.playListName === "") {
        listName = oldData.playListName;
      } else {
        listName = data.playListName;
      }

      if (data.description === "") {
        desc = oldData.description;
      } else {
        desc = data.description;
      }

      if (data.spotify === "") {
        spotify = oldData.spotify;
      } else {
        spotify = data.spotify;
      }

      if (data.genres.length === 0) {
        genres = oldData.genres;
      } else {
        genres = data.genres;
      }


      updatedList = {
        _id: oldData.listId,
        playListName: listName,
        userName: data.userName,
        creator: data.userId,
        genres: genres,
        description: desc,
        spotify: spotify
      }
      return updatedList
    }

  }



}

export default {
  onClickedGenre,
  offClickedGenre,
  getGenreState,
  updateList,
}
