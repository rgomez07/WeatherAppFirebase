<template>
 <div @click="goToCityWeather" class="city">
    <i v-if="edit" @click="removeCity" class="far fa-trash-alt edit" ref="edit"></i>
    <span> {{this.city.city}}</span>
    <div class="weather">
    <span> {{Math.round(this.city.currentWeather.main.temp)}}&deg;</span>
    <img :src="require(`../../public/conditions/conditions/${this.city.currentWeather.weather[0].icon}.svg`)" alt="" />
 </div>
 <div class="video">
    <video 
    autoplay
    loop 
    muted 
    :src="require(`../../public/conditions/videos/videos/${this.city.currentWeather.weather[0].icon}.mp4`)"
    ></video>
    <div class="bg-overlay"></div>
 </div>
 </div>
 
</template>
console.log(this.city.currentWeather.weather[0].icon)
<script>
import db from '../firebase/firebaseinit'
export default {
name: "Ci-ty",
props: ['city', 'edit'],
created(){},
data(){
    return{
        id:null,
    }
},
methods:{
    removeCity(){
        db.collection('cities')
        .where('city', '==', `${this.city.city}`)
        .get()
        .then((docs) =>{
            docs.forEach((doc) =>{
                this.id = doc.id;
            });
        })
        .then(() =>{
            console.log(this.id);
            db.collection('cities').doc(this.id).delete()
        })
    },
    goToCityWeather(event){
        if(event.target === this.$refs.edit){
            //
        }
        else{
            this.$router.push({name: "Single-Weather", params: {city: this.city.city}})
            console.log(this.city.city)
        }
    },
}
}

</script>


<style lang="scss" scoped>
.city {
    display: flex;
    position: relative;
    flex-direction: column;
    padding: 20px;
    flex-basis: 50%;
    min-height: 250px;
    color: #fff;
    box-shadow: 0 1px 2 px 0 rgba(0, 0, 0, 0.05);

    .edit{
        border-radius: 0px 15px 0 0;
        border: 10px solid rgb(0, 0, 0, 0.05);
        background-color: rgb(208, 9, 9);
        z-index: 1;
        font-size: 20px;
        position: absolute;
        bottom: 0px;
        left: 0px;
    }

    span{
        z-index: 1;
        text-transform: capitalize;
        display: block;
        font-size: 25 px;
        font-weight: 600;
    }
    .weather{
        display: flex;
        z-index: 1;
        justify-content: flex-end;
        align-items: flex-end;
        flex:1;
        span{
            font-size: 35px;
            margin-right: 8px
        }
        img{
            height: 20px;
            width: auto;
        }
       
    }
     .video{
            overflow: hidden;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;

            video{
                height: 100%;
                @media(min-width: 900px){
                    height: auto;
                    width:100%;
                }
            }
            .bg-overlay{
                position: absolute;
                height: 100%;
                width: 100%;
                top:0;
                background-color: rgba(0 , 0 , 0, 0.2);


            }

        }
}
</style>