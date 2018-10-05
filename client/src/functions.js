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



export default {
  onClickedGenre,
  offClickedGenre,
  getGenreState
}
