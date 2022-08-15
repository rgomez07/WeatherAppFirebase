<template>
  <header class="container add-city">
    <nav>
        <span>Add City</span>
        <div class="right">
            <i @click="editCities" ref="editCities" class= "far fa-edit"></i>
            <i @click="reloadApp" class="fas fa-sync"></i>
            <i @click= "addCity" class="fas fa-plus"></i>
        </div>
    </nav>
  </header>
</template>

<script>
export default {
    name: "Navi-gation",
    methods:{
        addCity(){
            this.$emit("add-city")
        },
        reloadApp(){
            location.reload();
        },
        editCities(){
            this.$refs.editCities.classList.toggle("edit-active")
            this.$emit('edit-city')
        },
    }

}
</script>

<style lang="scss" scoped>
 .add-city{
        background-color: #1b0dea;
    }
header{
   
    nav{
        display: flex;
        color:aliceblue;
        padding: 30px 0;
        justify-content: space-between

    }

    .edit-active{
        color: rgba($color: #10c822, $alpha: 1.0)
    }

    .right{
        i{
            font-size:20px
        }
        i:nth-child(2),
        i:nth-child(3){
            margin-left: 16px;
        }
    }
    span{
        font-weight: 600;
    }
}

</style>