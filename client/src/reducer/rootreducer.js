const initState = {
  searchInfo: {
    rock: false,
    metal: false,
    classical: false,
    country: false,
    popMusic: false,
    blues: false,
    jazz: false,
  },
  showPopup: false,
  popup: {
    //måste fixa så owner kan editera
    ownerOfPlayList: false,
    playListName: "",
    userName: "",
    genres: [],
    description: "",
    spotify: "",
  },
  playListArray: [{
      id: 1,
      playListName: "Pedro's classical music",
      userName: "Pedro",
      creator: "pedro123",
      genres: ["Classical"],
      description: "This is what I listen to when I cry in the shower",
      spotify: "https://open.spotify.com/user/spotify/playlist/37i9dQZF1DX7K31D69s4M1?si=hWZ30QO3Tk6NWqEa9n9fPQ",
    },
    {
      id: 2,
      playListName: "Working out like Hackerman 1337",
      userName: "Hackerman",
      creator: "hackerman123",
      genres: ["Electro", "Hiphop"],
      description: "This is what I use when I want to get PUMPED lifting computers at the gym",
      spotify: "https://open.spotify.com/user/s0etsmrf/playlist/0EFfOlwmjd3hq5HkOATip1?si=wbfnCFDtTnWZlyM6Opn82w",
    },
    {
      id: 13,
      playListName: "Rasmus, enough talk, LET'S DO THIS",
      userName: "Rasmus",
      creator: "rasmus123",
      genres: ["Rock", "Metal", "Country"],
      description: "Just listen, if you don't like it I will have to kill you, sorry brah",
      spotify: "https://open.spotify.com/user/zetalot/playlist/01mmK7ynahEMyiSHQjjBwL?si=7wqjhJ3LRjyN0rvfnQ2PKg",
    },
    {
      id: 99,
      playListName: "THATZITA",
      userName: "thatzita",
      creator: "thatzita123",
      genres: ["Pop"],
      description: "SKJUT MIG",
      spotify: "https://open.spotify.com/user/spotify/playlist/37i9dQZF1DX3YSRoSdA634?si=AlmTh6ttTzazH1s6jJp07A",
    }
  ]
}

const rootReducer = (state = initState, action) => {

  console.log(state)
  switch (action.type) {
    case "SHOW_POPUP":
      console.log(action.payload)
      return {
        ...state.showPopup = true,
        ...state.popup = {
          ownerOfPlayList: false,
          playListName: action.payload.playListName,
          userName: action.payload.userName,
          genres: [...action.payload.genres],
          description: action.payload.description,
          spotify: action.payload.spotify
        },
        ...state,
      }
    case "CLOSE_POPUP":
      return {
        ...state.showPopup = false,
        ...state,
      }
    case "ROCK_CLICKED":
      console.log(action.data)
      return {
        ...state,
        searchInfo: {
          rock: action.data.rock,
          metal: action.data.metal,
          classical: action.data.classical,
          country: action.data.country,
          popMusic: action.data.popMusic,
          blues: action.data.blues,
          jazz: action.data.jazz,
        }
      }
    case "ROCK_UNCLICKED":
      return {
        ...state,
        searchInfo: {
          rock: action.data.rock,
          metal: action.data.metal,
          classical: action.data.classical,
          country: action.data.country,
          popMusic: action.data.popMusic,
          blues: action.data.blues,
          jazz: action.data.jazz,
        }

      }
    default:
      return state
  }
}


export default rootReducer
