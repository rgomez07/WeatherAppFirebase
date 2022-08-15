<template>
  <div class="main">
    <div> <h1 href="/" class="maintitle"><a href="/"> Welcome to Weather Buddy </a></h1></div>
   
   <Modal v-if="modalOpen" v-on:close-modal="toggleModal" :APIkey="APIkey" />
   <Navigation v-on:add-city="toggleModal" v-on:edit-city="toggleEdit"/>
    <router-view v-bind:cities="cities" v-bind:edit="edit" :APIkey="APIkey"/>
  </div>
  
</template>
<script>
import  axios  from "axios";
import db from "./firebase/firebaseinit";
import Navigation from "./components/Navigation"
import Modal from "./components/Modal" 
export default {
  name: "App",
  components:{
    Navigation,
    Modal,
   
},
  data() {
    return {
      APIkey: "50bf942fd29655f8b62b293ae87d95ba",
      cities: [],
      modalOpen: null,
      edit: null,
      };
  },
  created() {
    this.getCityWeather();
  },
  methods: {
    getCityWeather(){
      let firebaseDB = db.collection('cities');
      firebaseDB.onSnapshot(snap =>{
        snap.docChanges().forEach(async(doc) => {
         
          if (doc.type === 'added' && !doc.doc.Nd){
            try{
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${doc.doc.data().city}&units=metric&appid=${this.APIkey}`)
            const data = response.data
            firebaseDB.doc(doc.doc.id).update({currentWeather: data,})
            .then(() =>{
              this.cities.push(doc.doc.data())
            })
            }
            catch(error){
              console.log(error)
            }
          }
          else if (doc.type === 'added' && doc.doc.Nd){
              this.cities.push(doc.doc.data())
          }
          else if(doc.type === 'removed'){
            this.cities = this.cities.filter((city) =>
              city.city !==doc.doc.data().city)
          }
        });
      })
    },
    toggleModal() {
      this.modalOpen = !this.modalOpen;
    },
    toggleEdit(){
      this.edit = !this.edit;
    },
    
  }
};
</script>

<style lang="scss">
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;

}
.main{
  max-width: 1024 px;
  margin: 0 auto;
  height: 100vh;

.maintitle{
  margin:auto;
  width: 50%;
  border: 3px solid gold;
  padding: 10px;
}
  
  .container{
    padding: 0 20px;
  }
}

</style>
