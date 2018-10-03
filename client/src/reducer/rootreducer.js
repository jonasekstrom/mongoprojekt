
const initState ={

  post:"jaavascript"

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

      default :
        return state
    }

}


export default rootReducer
