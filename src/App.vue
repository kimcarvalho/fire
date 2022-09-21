<template>
  <div id="app">
    <h1>Cadastrar</h1>

    <label for="email">Email: </label><input type="text" v-model="email"/><br>
    <label for="senha">Senha: </label><input type="text" v-model="senha"/><br>
    <button @click="cadastrarUsuario">Cadastrar Usuario</button>   
    <hr>

    <label for="tarefa">Tarefa: </label><input type="text" v-model="tarefa"/><br>
    <label for="Autor">Autor: </label><input type="text" v-model="autor"/><br>
    <button @click="cadastrar">Cadastrar</button>
    <button @click="buscarPosts">Buscar Posts</button>
    <button @click="atualizarPost">Atualizar Posts</button>    
    <hr/>

    <ul>
      <br>
      <li v-for="post in posts" :key="post.id">
        ID: {{post.id}} <button @click="deletarPost(post.id)">Deletar Posts</button><br>
        Tarefa: {{post.tarefa}} <br>
        Autor: {{post.autor}} <br><br>
      </li>      
    </ul>
  </div>
</template>

<script>
  import app from './services/firebaseConnection';

  export default {
    name: 'App',
    components:{
      
    },
    data(){
      return{
        idPost: '',
        tarefa: '',
        autor: '',
        posts: [],
        email: '',
        senha: ''
      }
    },
    async created(){     
      await app.firestore().collection('posts')    
      .onSnapshot((doc) => {
        this.posts = [];
        doc.forEach((item)=>{
          this.posts.push({
            id: item.id,
            tarefa: item.data().tarefa,
            autor: item.data().autor,
          });
        });
      });
    },
    methods:{
      async cadastrar(){
        await app.firestore().collection('posts')        
        .add({
          tarefa: this.tarefa,
          autor: this.autor
        })
        .then(() => {
          console.log('Cadastrado com sucesso');
          this.tarefa = '';
          this.autor = '';
        })
        .catch((error) => {
          console.log('Gerou algum erro: ' + error);
        })
      },

      async buscarPosts(){
        // await app.firestore().collection('posts')
        // .doc('123')
        // .get()
        // .then((snapshot) => {
        //   this.tarefa = snapshot.data().tarefa;
        //   this.autor = snapshot.data().autor;
        // } )
        // .catch((error) => {
        //   console.log('Erro ao Buscar: ' + error)
        // })

        this.posts = [];
        await app.firestore().collection('posts')    
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc)=>{
            this.posts.push({
              id: doc.id,
              tarefa: doc.data().tarefa,
              autor: doc.data().autor,
            });
          });
        }) 
        .catch((error) => {
          console.log('Erro ao Buscar: ' + error)
        })
      },
      async atualizarPost(){
        await app.firestore().collection('posts').doc(this.idPost)
        .update({
          tarefa: this.tarefa,
          autor: this.autor
        })
        .then(()=>{
          console.log('ATUALIZADO COM SUCESSO!');
          this.autor = '';
          this.tarefa = '';
          this.idPost = '';
        })
        .catch((error)=>{
          console.log('ERRO AO EDITAR: ' + error);
        })
      },
      async deletarPost(idPost){
        await app.firestore().collection('posts').doc(idPost)
        .delete()
        .then(()=>{
          console.log("Deletado com sucesso!");
          this.idPost = '';
        })
      },
      async cadastrarUsuario(){
        await app.auth().createUserWithEmailAndPassword(this.email, this.senha)
        .then(() => {
          this.email= '';
          this.senha = '';
        })
        .catch((error)=>{
          console.log('ERROR! '+error)
          if(error.code === 'auth/weak-password'){
            alert('Senha Muito Fraca');
          }else if(error.code === 'auth/email-already-in-use'){
            alert('Email já existe.');
          }
        })
      }
    }
  }
</script>

<style>

</style>