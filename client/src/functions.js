function getGenreState(action){


  console.log(action.data)

  return {
    ROCK: action.data.ROCK,
    METAL: action.data.METAL,
    CLASSICAL: action.data.CLASSICAL,
    COUNTRY: action.data.COUNTRY,
    POPMUSIC: action.data.POPMUSIC,
    BLUES: action.data.BLUES,
    JAZZ: action.data.JAZZ,
    ELECTRO: action.data.ELECTRO,
    HIPHOP:action.data.HIPHOP
  }
}



function onClickedGenre(searchInfo, genre){

  let howManyTrue = 0
  for(let x in searchInfo){
    if(searchInfo[x]=== true){
      howManyTrue +=1
    }
  }

  if(howManyTrue > 2){
    
    return {
      type: "GENRELIMIT",
      data: searchInfo,

    }
  }


  let currentAction = ""

  console.log(genre)

  for(let x in searchInfo){
    if(genre === x){
      console.log(x)

      searchInfo[x] = true;
      currentAction = x
    }else{
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

  console.log(searchInfo)

  console.log(currentAction)



  return {
    type: currentAction+ "_CLICKED",
    data: searchInfo,
  }
}

function offClickedGenre(searchInfo,genre){


    let currentAction = ""

    for(let x in searchInfo){
      if(genre === x){
        searchInfo[x] = false;
        currentAction = x
      }else{
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
      type: currentAction+"_UNCLICKED",
      data: searchInfo
    }
}

function updateList(data, allPlayLists, oldData){
  // console.log(data)
  // console.log(allPlayLists)
  // console.log(oldData)
  let updatedList = {}
  let listName;
  let genres;
  let desc;
  let spotify;

  for(let i = 0; i < allPlayLists.length; i++){
    if(allPlayLists[i].id == data.listId){
      console.log("matching playlist ID");
      console.log(data)
      if(data.playListName == ""){
        listName = oldData.playListName;
        // console.log("old playlistname " +listName);
      }else{
        listName = data.playListName;
        // console.log("new playlistname " +listName);
      }

      if(data.description == ""){
        desc = oldData.description;
        // console.log("old description " +desc);
      }else{
        desc = data.description;
        // console.log("new description " +desc);
      }

      if(data.spotify == ""){
        spotify = oldData.spotify;
      }else{
        spotify = data.spotify;
      }

      if(data.genres.length == 0){
        // console.log("new genres ", data.genres);
        // console.log("old genres ", oldData.genres);
        genres = oldData.genres;
      }else{
        // console.log("new genres ", data.genres);
        // console.log("old genres ", oldData.genres);
        genres = data.genres;
      }
      

      updatedList = {
      id: data.listId,
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
