import functions from "../functions.js"

const initState = {
  userName: "thatzita",
  id: "ObjectId(5bb60f66660ca9053b2b5)",
  userImg: "http://tricitycontracting.com/wp-content/uploads/2018/04/blank-profile-picture-973460_640-300x300.png",
  searchField:"",
  searchInfo: {
    ROCK: false,
    METAL: false,
    CLASSICAL: false,
    COUNTRY: false,
    POPMUSIC: false,
    BLUES: false,
    JAZZ: false,
    ELECTRO:false,
    HIPHOP:false
  },
  editedList: {
    playListName: "",
    genres: [],
    description: "",
    spotify: "",
  },
  showPopup: false,
  popup: {
    playListName: "",
    userName: "",
    genres: [],
    description: "",
    spotify: "",
    id: ""
  },
  
  playListArray: [
    // {
    //   id: 1,
    //   playListName: "Pedro's classical",
    //   userName: "Pedro",
    //   creator: "pedro123",
    //   genres: ["Classical"],
    //   description: "This is what I listen to when I cry in the shower",
    //   spotify: "https://open.spotify.com/user/spotify/playlist/37i9dQZF1DX7K31D69s4M1?si=hWZ30QO3Tk6NWqEa9n9fPQ",
    // },
    // {
    //   id: 2,
    //   playListName: "Hackerman 1337",
    //   userName: "Hackerman",
    //   creator: "hackerman123",
    //   genres: ["Electro", "Hiphop"],
    //   description: "This is what I use when I want to get PUMPED lifting computers at the gym",
    //   spotify: "https://open.spotify.com/user/s0etsmrf/playlist/0EFfOlwmjd3hq5HkOATip1?si=wbfnCFDtTnWZlyM6Opn82w",
    // },
    // {
    //   id: 13,
    //   playListName: "Rasmus, gymshark",
    //   userName: "Rasmus",
    //   creator: "rasmus123",
    //   genres: ["Rock", "Metal", "Country"],
    //   description: "Just listen, if you don't like it I will have to kill you, sorry brah",
    //   spotify: "https://open.spotify.com/user/zetalot/playlist/01mmK7ynahEMyiSHQjjBwL?si=7wqjhJ3LRjyN0rvfnQ2PKg",
    // },
    // {
    //   id: 99,
    //   playListName: "THATZITA",
    //   userName: "thatzita",
    //   creator: "thatzita123",
    //   genres: ["Pop"],
    //   description: "SKJUT MIG",
    //   spotify: "https://open.spotify.com/user/spotify/playlist/37i9dQZF1DX3YSRoSdA634?si=AlmTh6ttTzazH1s6jJp07A",
    // },
    // {
    //   id: 919,
    //   playListName: "THATZITA IGEN",
    //   userName: "thatzita",
    //   creator: "thatzita123", //id från mongodb
    //   genres: ["Classical","Country"],
    //   description: "SKJUT MIG IGEN",
    // },
    // {
    //   id: 43,
    //   playListName: "JAVASCRIPT MUSIC",
    //   userName: "thatzita",
    //   creator: "thatzita123",
    //   genres: ["Pop"],
    //   description: "SKJUT MIG",
    //   spotify: "https://open.spotify.com/user/spotify/playlist/37i9dQZF1DX3YSRoSdA634?si=AlmTh6ttTzazH1s6jJp07A",
    // },
    // {
    //   id: 50,
    //   playListName: "OHhh MUSIC",
    //   userName: "thatzita",
    //   creator: "thatzita123",
    //   genres: ["Metal"],
    //   description: "SKJUT MIG",
    //   spotify: "https://open.spotify.com/user/spotify/playlist/37i9dQZF1DX3YSRoSdA634?si=AlmTh6ttTzazH1s6jJp07A",
    // },
    // {
    //   id: 21,
    //   playListName: "pooo",
    //   userName: "thatzita",
    //   creator: "thatzita123",
    //   genres: ["Country"],
    //   description: "SKJUT MIG",
    //   spotify: "https://open.spotify.com/user/spotify/playlist/37i9dQZF1DX3YSRoSdA634?si=AlmTh6ttTzazH1s6jJp07A",
    // },
    // {
    //   id: 22,
    //   playListName: "Python",
    //   userName: "thatzita",
    //   creator: "thatzita123",
    //   genres: ["Blues"],
    //   description: "SKJUT MIG",
    //   spotify: "https://open.spotify.com/user/spotify/playlist/37i9dQZF1DX3YSRoSdA634?si=AlmTh6ttTzazH1s6jJp07A",
    // },
    // {
    //   id: 23,
    //   playListName: "MOTHAFUCKAAA",
    //   userName: "thatzita",
    //   creator: "thatzita123",
    //   genres: ["Hiphop"],
    //   description: "SKJUT MIG",
    //   spotify: "https://open.spotify.com/user/spotify/playlist/37i9dQZF1DX3YSRoSdA634?si=AlmTh6ttTzazH1s6jJp07A",
    // }
  ]
}


// function getGenreState(action){
//   return {
//     ROCK: action.data.ROCK,
//     METAL: action.data.METAL,
//     CLASSICAL: action.data.CLASSICAL,
//     COUNTRY: action.data.COUNTRY,
//     POPMUSIC: action.data.POPMUSIC,
//     BLUES: action.data.BLUES,
//     JAZZ: action.data.JAZZ,
//   }
// }

const rootReducer = (state = initState, action) => {

  switch (action.type) {

    case "SHOW_POPUP":
      return {
        ...state.showPopup = true,
        ...state.popup = {
          playListName: action.payload.playListName,
          userName: action.payload.userName,
          creator: action.payload.creator,
          genres: [...action.payload.genres],
          description: action.payload.description,
          spotify: action.payload.spotify,
          listId: action.payload._id
        },
        ...state,
      }
      case "DELETE_POPUP":
      console.log("TESTA REDUCERSS")
      let removedPlayList = functions.removeList(action.deleteData, [...state.playListArray]);
      console.log(removedPlayList)
      return {
        ...state,
        playListArray: removedPlayList
       
      }
     
      case "UPDATE_POPUP":
      let updatedPlaylist = functions.updateList(action.payload, [...state.playListArray], action.oldData);
      // console.log(action.payload)
      // console.log(action.oldData)
      console.log(updatedPlaylist)
      return {
        ...state,
        playListArray: [...state.playListArray.filter(obj =>
          obj._id !== updatedPlaylist._id), updatedPlaylist],
      }

      case "ADD_PLAYLIST":
      console.log(action.data)
      return {
        ...state,
        playListArray:[ action.data, ...state.playListArray],

      }
    case "CLOSE_POPUP":
      return {
        ...state.showPopup = false,
        ...state,
      }
    case "GENRELIMIT":
      return{
        ...state,
        searchInfo: functions.getGenreState(action)

      }
      break;
    case "ROCK_CLICKED":
      return {
        ...state,
        searchInfo: functions.getGenreState(action)
      }
    case "ROCK_UNCLICKED":
      return {
        ...state,
        searchInfo: functions.getGenreState(action)


      }

    case "COUNTRY_CLICKED":
      return {
        ...state,
        searchInfo: functions.getGenreState(action)

      }

    case "COUNTRY_UNCLICKED":
      return {
        ...state,
        searchInfo: functions.getGenreState(action)

      }

    case "METAL_CLICKED":
      return {
          ...state,
          searchInfo: functions.getGenreState(action)

      }
    case "METAL_UNCLICKED":
      return {
        ...state,
        searchInfo: functions.getGenreState(action)
      }
    case "CLASSICAL_CLICKED":
      return {
          ...state,
          searchInfo: functions.getGenreState(action)

      }
    case "CLASSICAL_UNCLICKED":
      return {
        ...state,
        searchInfo: functions.getGenreState(action)
      }

    case "POPMUSIC_CLICKED":
      console.log(action.type)
      return {
        ...state,
        searchInfo: functions.getGenreState(action)
      }

    case "POPMUSIC_UNCLICKED":
      return {
        ...state,
        searchInfo: functions.getGenreState(action)
      }

    case "JAZZ_CLICKED":
      return {
        ...state,
        searchInfo: functions.getGenreState(action)
      }

    case "JAZZ_UNCLICKED":
      return {
        ...state,
        searchInfo: functions.getGenreState(action)
      }
    case "BLUES_CLICKED":

      return {
        ...state,
        searchInfo: functions.getGenreState(action)
      }

    case "BLUES_UNCLICKED":
      return {
        ...state,
        searchInfo: functions.getGenreState(action)
      }

    case "HIPHOP_CLICKED":
      return {
        ...state,
        searchInfo: functions.getGenreState(action)
      }

    case "HIPHOP_UNCLICKED":
      return {
        ...state,
        searchInfo: functions.getGenreState(action)
      }
    case "ELECTRO_CLICKED":
    console.log(action.type)
    console.log(action.data)
      return {
        ...state,
        searchInfo: functions.getGenreState(action)
      }

    case "ELECTRO_UNCLICKED":
      return {
        ...state,
        searchInfo: functions.getGenreState(action)
      }

    case "UPDATE_SEARCHFIELD":
      return {
        ...state,
        searchField:action.data
      }

    case "UPDATE_LIST":
    
      return {
        ...state,
        playListArray:action.data
      }
    default:
      return state
  
      // case "DELETE_LIST":
        
      //   return {
      //   ...state,
      //   playListArray:action.data
      // }
      // default:
      // return state
    
  
  
  
  
    }

  
  
}


export default rootReducer
