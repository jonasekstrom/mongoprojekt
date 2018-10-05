

let rockClicked = (searchInfo)=>{
  return {type:"ROCK_CLICKED",
   data:{
     rock:true,
     metal:searchInfo.metal,
     classical:searchInfo.classical,
     country:searchInfo.country,
     popMusic:searchInfo.popMusic,
     blues:searchInfo.blues,
     jazz:searchInfo.jazz,
   }
  }
}

let rockUnclick = (searchInfo)=>{
  return {type:"ROCK_UNCLICKED",
   data:{
     rock:false,
     metal:searchInfo.metal,
     classical:searchInfo.classical,
     country:searchInfo.country,
     popMusic:searchInfo.popMusic,
     blues:searchInfo.blues,
     jazz:searchInfo.jazz,
   }
  }
}

let addPost = ()=>{

  return {type:"ADD", data:"Python"}

}

let deletePost = () =>{

  return {type:"DELETE", data:""}
}


export default {

  addPost,
  deletePost,
  rockClicked,
  rockUnclick
}
