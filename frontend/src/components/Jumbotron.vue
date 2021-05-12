<template>
  <div>
    <b-jumbotron class="jumbo">
      <h1 class="header">Cardinal Signs</h1>

      <h2 v-text="currentTime">
      </h2>

      <hr class="my-4">

      <b-list-group horizontal>
          <b-list-group-item class="user">
            <b-avatar button @click="onClick" variant="danger" ></b-avatar>
            Luis Aparicio
          </b-list-group-item>
      </b-list-group> 
      <b-button variant="success" size="lg">Clock In</b-button>
    </b-jumbotron>
    
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'Jumbotron',
  data() {
    return{
    currentMoment: null,
    currentTime: null,
    users: null,
    buttonColor: null,
    buttonText: null,
    };
  },
methods: {
    updateCurrentTime() {
        this.currentMoment = moment();
        this.currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
    }
},
created() {
    this.currentMoment = moment();
    this.currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
    setInterval(() => this.updateCurrentTime(), 1 * 1000);
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @font-face {
    font-family: 'Harlow Solid LET Plain:1.0';
    font-style: normal;
    font-weight: normal;
    src:  url('../assets/Harlow Solid LET Plain1.0.woff') format('woff');
    }
  
  .jumbo {
    background: linear-gradient( rgba(0, 0, 0, 0.384),rgba(255, 255, 255, 0.671)),
    url("../assets/hero.png")
      center;
    margin-top: -6rem;
    height: 25rem;
    background-size: cover;
    color: white;
    

    box-shadow: 
    0 0 60px 30px rgba(17, 0, 255, 0.418),
    0 0 100px 60px rgb(255, 255, 255), 
    0 0 140px 90px rgba(255, 0, 0, 0.315); 
  }
  .header {
    font-family: 'Harlow Solid LET Plain:1.0';
    font-size: 6rem;
    -webkit-text-stroke: 1px black;
    color: white;
    text-shadow:
        3px 3px 0 #000,
      -1px -1px 0 #000,  
        1px -1px 0 #000,
        -1px 1px 0 #000,
        1px 1px 0 #000;
  }
  .user{
    color: black;
  }
</style>
