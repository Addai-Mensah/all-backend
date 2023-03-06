// modelling relationships

// using references (normalization)
let author = {
    name:"mosh",
}
let course = {
    author:"id"
}

// using embedded documents
let courses = {
    author:{
        name:"mosh"
    }
}

// using the hybrid approach 

let authors = {
    name: "Mosh"
}

let course1 = {
    author:{
        id: "ref",
        name:"Mosh"
    }
}