let showPopup = (payload) => {
  return {
    type: "SHOW_POPUP",
    payload
  }
}

let closePopup = () => {
  return {
    type: "CLOSE_POPUP"
  }
}

let rockClicked = (searchInfo) => {
  return {
    type: "ROCK_CLICKED",
    data: {
      rock: true,
      metal: searchInfo.metal,
      classical: searchInfo.classical,
      country: searchInfo.country,
      popMusic: searchInfo.popMusic,
      blues: searchInfo.blues,
      jazz: searchInfo.jazz,
    }
  }
}

let rockUnclick = (searchInfo) => {
  return {
    type: "ROCK_UNCLICKED",
    data: {
      rock: false,
      metal: searchInfo.metal,
      classical: searchInfo.classical,
      country: searchInfo.country,
      popMusic: searchInfo.popMusic,
      blues: searchInfo.blues,
      jazz: searchInfo.jazz,
    }
  }
}



export default {
  showPopup,
  closePopup,
  rockClicked,
  rockUnclick
}
