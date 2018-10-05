
const initState ={
  searchInfo:{
      rock:false,
      metal:false,
      classical:false,
      country:false,
      popMusic:false,
      blues:false,
      jazz:false,
  },
  popup:{
    ownerOfPlayList: false,
    showPopup: false,
    playListName: "Working out like Hackerman",
    userName: "Hackerman",
    genres: ["Electro", "Jazz", "Blues"],
    description: "This is what I use when I want to get PUMPED lifting computers at the gym",
    spotify: "https://open.spotify.com/user/smeknoob/playlist/3x4mBCp6ICZOBRfBmEXoS9?si=7M9X9NDWT3iK1fHfsZ0sBQ",
  }
}

const rootReducer = (state = initState, action)=>{

    console.log(action)
    switch(action.type){

      case "ADD":
        return {
          ...state,
          post:action.data
        }
      case "DELETE":
        return{
          ...state,
          post:action.data
        }
      case "ROCK_CLICKED":
        console.log(action.data)
        return {
          ...state,

          searchInfo: {
            rock:action.data.rock,
            metal:action.data.metal,
            classical:action.data.classical,
            country:action.data.country,
            popMusic:action.data.popMusic,
            blues:action.data.blues,
            jazz:action.data.jazz,
          }

        }
      case "ROCK_UNCLICKED":
      return {
        ...state,

        searchInfo: {
          rock:action.data.rock,
          metal:action.data.metal,
          classical:action.data.classical,
          country:action.data.country,
          popMusic:action.data.popMusic,
          blues:action.data.blues,
          jazz:action.data.jazz,
        }

      }
      default :
        return state
    }

}


export default rootReducer
