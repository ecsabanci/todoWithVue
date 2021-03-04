window.addEventListener("load", () => {

  const request_url_todo = "https://aodapi.eralpsoftware.net/todo";

  window.vue = new Vue({
    el: "#app",
    data: {
      token:"",
      name: "",
      todos: [],
      username: ""
    },
    methods:{
      addTodo(){
        if(this.name != ""){
          fetch(request_url_todo,{
            method : "POST",
            body: JSON.stringify({ "name" : this.name, date: new Date().toISOString  }),
            headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'token': this.token
          }})
          .then(() => {location.reload()})
        }
      },

      deleteTodo(index){
        console.log(this.todos[index]["id"])
        fetch(`${request_url_todo}/${this.todos[index]["id"]}`,{
          method : "DELETE",
          headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'token': this.token
          }
        })
        .then(() => {location.reload()})
      },

      setUsername(){
        if(this.username == ""){
          alert("Please enter a valid username")
        } else {
          localStorage.setItem("username",this.username)
          location.reload()
        }

      },

      changeStatus(index){
        this.todos[index]["isDone"] = !this.todos[index]["isDone"]
        console.log(this.todos[index].isDone)
      }

    },
    
    created(){
      let getUsername = localStorage.getItem("username")
      // ! please enter your username to see personal todo list
      fetch('https://aodapi.eralpsoftware.net/login/apply',{
        method : "POST",
        body: JSON.stringify({ "username": getUsername,"password":"123456"  }),
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        }


      })
        .then(response => {
        return response.json()
      }) 
        .then(data => {
        this.token = data.token
      })
        .then( () => {
          fetch(request_url_todo,{
            method : "GET",
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
              'token': this.token
            }
          })
          .then(res => { return res.json() })
          .then(data => {
            this.todos = data.body
            this.todos.forEach(todo => {
              todo.isDone = false
            })
          })
        }

        )




    }
    
})

})