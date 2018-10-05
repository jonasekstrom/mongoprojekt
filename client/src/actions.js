

let showPopup = (payload) =>{
  return {type:"SHOW_POPUP", payload}
}

let closePopup = ()=>{
  return {type:"CLOSE_POPUP"}
}

let addPost = ()=>{
  return {type:"ADD", data:"Python"}
}

let deletePost = () =>{

  return {type:"DELETE", data:""}
}


export default {
  showPopup,
  closePopup,
  addPost,
  deletePost
}
