<template>
  <div>
    <b-jumbotron class="jumbo">
      <h1 class="header">Cardinal Signs</h1>

      <h2 class="time" v-text="currentTime">
      </h2>

      <hr class="my-4">
      <b-container class="d-flex justify-content-center">
        <b-list-group horizontal  >
            <b-list-group-item
            class="user"
            v-for="object in users"
            :key="object._id"
            :variant="object.selected"
            @click="setCurrent(object)"
            >
              <b-avatar button :variant="object.state"></b-avatar>
              {{object.name}}
            </b-list-group-item>
        </b-list-group> 
      </b-container>
      <b-button v-if="currentUser.state === 'success'" variant="danger" size="lg" @click="clockOut()">Clock Out</b-button>
      <b-button v-else-if="currentUser.state === 'danger'" variant="success" size="lg" @click="clockIn()">Clock In</b-button>
      <b-button v-else variant="none" size="lg">Select User</b-button>
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
    currentUser: {state: "null"},
    };
  },
methods: {
    updateCurrentTime() {
        this.currentMoment = moment();
        this.currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
    },
    async getUsers() {
      let response = await this.$http.get("/user/all");
      this.users = await response.data;
    },
    async updateUser(user) {
      await this.$http.post("/user", user);
      this.emitData(user);
    },
    setCurrent(user) {
      let id = user._id;
      let x;
      for (x in this.users) {
        if (this.users[x]._id === id) {
        this.users[x].selected = "success";
        this.currentUser = this.users[x];
        this.emitData(this.users[x]);
        }
        else
        this.users[x].selected = "default";
      }
    },
    clockIn() {
      let log = {
        state: "in",
        moment: this.currentTime,
        time: this.currentMoment.valueOf(),
        period: "current"
      }
      this.currentUser.logs.push(log);
      this.currentUser.state = "success";
      this.updateUser(this.currentUser);
    },
    clockOut() {
      let outTime = this.currentMoment.valueOf();
      let inTime = this.currentUser.logs[this.currentUser.logs.length - 1].time;
      
      let total = ((outTime-inTime)/3600000);
      total = parseFloat(total.toFixed(2));

      let log = {
        state: "out",
        moment: this.currentTime,
        time: outTime,
        hours: total,
        period: "current"
      }
      this.currentUser.logs.push(log);
      this.currentUser.state = "danger";
      this.updateUser(this.currentUser);
    },
    async emitData (user) {
      await this.$emit('jumboData', user);
    }
},
created() {
    this.currentMoment = moment();
    this.currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
    this.getUsers();
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
    margin-top: -5rem;
    background-position: bottom left;
    background-size: cover;
    color: white;
  }
  .header {
    font-family: 'Harlow Solid LET Plain:1.0';
    font-size: 6vw;
    margin-top: 2rem;
    -webkit-text-stroke: 1px black;
    color: white;
    text-shadow:
        3px 3px 0 #000,
      -1px -1px 0 #000,  
        1px -1px 0 #000,
        -1px 1px 0 #000,
        1px 1px 0 #000;
  }
  .time {
    font-size: 2vw;
  }
  .user{
    color: black;
    margin-bottom: 1rem;
  }
</style>
