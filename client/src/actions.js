import functions from "./functions.js"

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

let updatePopup = (payload, oldData) => {
  console.log(payload)
  // console.log(oldData)
  return {
    type: "UPDATE_POPUP",
    payload,
    oldData
  }
}


let rockClicked = (searchInfo) => {
  return functions.onClickedGenre(searchInfo, "ROCK")
}

let rockUnclicked = (searchInfo) => {
  return functions.offClickedGenre(searchInfo, "ROCK")
}

let countryClicked = (searchInfo) => {
  return functions.onClickedGenre(searchInfo, "COUNTRY")
}

let countryUnclicked = (searchInfo) => {
  return functions.offClickedGenre(searchInfo, "COUNTRY")
}

let metalClicked = (searchInfo) => {
  return functions.onClickedGenre(searchInfo, "METAL")
}

let metalUnclicked = (searchInfo) => {
  return functions.offClickedGenre(searchInfo, "METAL")
}

let classicalClicked = (searchInfo) => {
  return functions.onClickedGenre(searchInfo, "CLASSICAL")
}

let classicalUnclicked = (searchInfo) => {
  return functions.offClickedGenre(searchInfo, "CLASSICAL")
}

let popClicked = (searchInfo) => {
  return functions.onClickedGenre(searchInfo, "POPMUSIC")
}

let popUnclicked = (searchInfo) => {
  return functions.offClickedGenre(searchInfo, "POPMUSIC")
}

let jazzClicked = (searchInfo) => {
  return functions.onClickedGenre(searchInfo, "JAZZ")
}

let jazzUnclicked = (searchInfo) => {
  return functions.offClickedGenre(searchInfo, "JAZZ")
}

let bluesClicked = (searchInfo) => {
  return functions.onClickedGenre(searchInfo, "BLUES")
}

let bluesUnclicked = (searchInfo) => {
  return functions.offClickedGenre(searchInfo, "BLUES")
}

let hiphopClicked = (searchInfo) => {
  return functions.onClickedGenre(searchInfo, "HIPHOP")
}

let hiphopUnclicked = (searchInfo) => {
  return functions.offClickedGenre(searchInfo, "HIPHOP")
}

let electroClicked = (searchInfo) => {
  return functions.onClickedGenre(searchInfo, "ELECTRO")
}

let electroUnclicked = (searchInfo) => {
  return functions.offClickedGenre(searchInfo, "ELECTRO")
}

let searchField = (value)=>{
  return {
    type:"UDATE_SEARCHFIELD",
    data:value
  }
}

export default {
  showPopup,
  closePopup,
  updatePopup,
  rockClicked,
  rockUnclicked,
  countryClicked,
  countryUnclicked,
  metalClicked,
  metalUnclicked,
  classicalClicked,
  classicalUnclicked,
  popClicked,
  popUnclicked,
  jazzClicked,
  jazzUnclicked,
  bluesClicked,
  bluesUnclicked,
  hiphopClicked,
  hiphopUnclicked,
  electroClicked,
  electroUnclicked,
  searchField
}
