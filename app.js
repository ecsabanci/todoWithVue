// fetch('https://aodapi.eralpsoftware.net/todo',{
//   method : "POST",
//   body: JSON.stringify({ "name" : "ReactJS redux öğreneceğim.", date: new Date().toISOString  }),
//   headers: {
//     'Accept': 'application/json, text/plain, */*',
//     'Content-Type': 'application/json',
//     'token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkVtcmUgQ2FncmkgU2FiYW5jaSIsImlkIjo0LCJpYXQiOjE2MTQ1MDgwODEsImV4cCI6MTYxNDU4MDA4MX0.QkH1Ll0Crb_EJh_wciFexN3oKpQ6vQ7teP4cBVKIgyA"
//   }


// } )
//   .then(response => {
//     return response.json()
//   }) 
//   .then(data => {
//     console.log(data)
//   })



// fetch('https://aodapi.eralpsoftware.net/todo',{
//   method : "GET",
// //   body: { "name" : "Eralp Software'e proje göndereceğim." , date: new Date() },
//   headers: {
//     'Accept': 'application/json, text/plain, */*',
//     'Content-Type': 'application/json',
//     'token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkVtcmUgQ2FncmkgU2FiYW5jaSIsImlkIjo0LCJpYXQiOjE2MTQ1MDgwODEsImV4cCI6MTYxNDU4MDA4MX0.QkH1Ll0Crb_EJh_wciFexN3oKpQ6vQ7teP4cBVKIgyA"
//   }


// } )
//   .then(response => {
//     return response.json()
//   })
//   .then(data => {
//   console.log(data)
// })

window.addEventListener("load", () => {

  const request_url_todo = "https://aodapi.eralpsoftware.net/todo";

  window.vue = new Vue({
    el: "#app",
    data: {
      token:"",
      name: "",
      todos: []
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
      }
    },
    
    created(){
      fetch('https://aodapi.eralpsoftware.net/login/apply',{
        method : "POST",
        body: JSON.stringify({ "username":"ecsabancii@gmail.com","password":"123456"  }),
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
          })
        }

        )




    }
    
})

})


// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkVtcmUgQ2FncmkgU2FiYW5jaSIsImlkIjo0LCJpYXQiOjE2MTQ2MjIzMzAsImV4cCI6MTYxNDY5NDMzMH0.OkshEH61DnIONjXu1MgzmLcBjU2uAnDjzrKUSMIXPFs"