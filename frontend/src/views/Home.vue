<template>
  <div class="home">
    <jumbotron ref="jumbo" @jumboData="setData"/>
    <b-container >
      <b-row>
        <b-col> 
          <h5>Hours</h5>
          <b-progress :value="total" max="100" :precision="2" show-value class="mb-3"></b-progress>
           <b-card no-body>
            <b-tabs pills card end>
              <b-tab title="Current Pay Period" active>
                  <time-log 
                :user="currentUserLogs"
                :showAll="false"
                @selected="setSelected">
                  </time-log>
                   <b-button v-if="currentUserLogs.length > 0" variant="success" @click="exportLogs()">Export</b-button>
                   <b-button v-if="selected.length == 1" variant="outline-primary" @click="openEditModal()"> Edit </b-button>
                   <b-button v-if="selected.length == 1 && selected[0].state == 'out'" variant="danger" @click="deleteLog()"> Delete </b-button>
              </b-tab>
              <b-tab title="All">
                <time-log 
                :user="all"
                :showAll="true">
                </time-log>
                </b-tab>
              <b-tab title="----">
                <b-button variant="danger" @click="deleteUser()"> Delete Selected User... </b-button>
                </b-tab>
            </b-tabs>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <modal ref="editLog">
      <template v-slot:body>

      <div class="container">
          <div class="row">
            <div style="width: 100%; margin: 0% 0% 10% 0%">
              <b-container>
                <h1> Enter New Log Data </h1>
                <b-row>
                  <b-col md="auto">
                    <b-calendar class="border rounded p-2" style="margin: 0% 0% 0% 0%;" v-model="date" locale="en-US"></b-calendar>
                  </b-col>
                  <b-col>
                    <b-form-timepicker class="border rounded p-2" v-model="time" locale="en" ></b-form-timepicker>
                    <b-button variant="primary" @click="updateLog()"> Update Log </b-button>
                  </b-col>
                </b-row>
                
             </b-container>
            </div>
          </div>
        </div>

      </template>
    </modal>
    <modal ref="register">
      <template v-slot:body>

      <div class="container">
          <div class="row">
            <div style="width: 100%; margin: 5% 0% 0% 0%">
              <b-container>
                <h1> Register User </h1>
                <b-form-input v-model="text" placeholder="FirstName LastName" style="margin: 5% 0% 5% 0%"></b-form-input>
                <b-button variant="primary" @click="registerUser()" style="margin: 0% 0% 5% 0%">Submit</b-button>
             </b-container>
            </div>
          </div>
        </div>

      </template>
    </modal>
    <b-container class="reg">
      <b-button variant="primary" @click="openRegisterModal()">Register User</b-button>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Jumbotron from '@/components/Jumbotron.vue'
import TimeLog from '@/components/TimeLog.vue'
import Modal from "@/components/Modal"
import moment from 'moment'

export default {
  name: 'Home',
  components: {
    Jumbotron,
    TimeLog,
    Modal
  },
  data() {
    return{
    currentUser: {},
    currentUserLogs: {},
    all: {},
    selected: {},
    text: '',
    time: '',
    date: '',
    total: ''
    };
  },
  methods: {
    setData(data) {
      this.all = data.logs;
      this.currentUser = data;
      this.currentUserLogs = data.logs.filter(log => log.period == "current"); 
      let x;
      let num = 0;
      for (x in this.currentUserLogs){
        if(this.currentUserLogs[x].state === 'out')
        num = this.currentUserLogs[x].hours + num;
      }
      this.total = num;
    },
    setSelected(selected) {
      this.selected = selected;
    },
    deleteLog() { 
      let index = this.currentUser.logs.findIndex(log => log === this.selected[0]);
      this.currentUser.logs.splice(index-1,2);
      this.setData(this.currentUser);
      this.updateCurrentUser();
    },
    updateLog() {
      let index = this.currentUserLogs.findIndex(log => log === this.selected[0]);
      let newMoment = moment(this.date+" "+this.time, "YYYY-MM-DD hh:mm:ss");
      
      this.selected[0].moment = newMoment.format('MMMM Do YYYY, h:mm:ss a');
      this.selected[0].time = newMoment.valueOf();
      if(this.selected[0].state === 'out') {
        let outTime = this.selected[0].time;
        let inTime = this.currentUserLogs[index - 1].time;
        
        let total = ((outTime-inTime)/3600000);
        total = parseFloat(total.toFixed(2));
        this.selected[0].hours = total;
      }
      if(this.selected[0].state === 'in') {
        let outTime = this.currentUserLogs[index + 1].time;
        let inTime = this.selected[0].time; 
        
        let total = ((outTime-inTime)/3600000);
        total = parseFloat(total.toFixed(2));
        this.currentUserLogs[index + 1].hours = total;
      }
      this.updateCurrentUser();
    },
    updateCurrentUser() {
      var jumbo = this.$refs.jumbo;
      jumbo.updateUser(this.currentUser);
    },
    async deleteUser() {
      let body = {_id : this.currentUser._id};
      
      await this.$http.delete("/user", {data : body});
      
    },
    openRegisterModal() {
      this.$refs.register.openModal();
    },
    async registerUser() {
      let body = {
        name: this.text
      }
      await this.$http.post("/user/register", body);
      
      var jumbo = this.$refs.jumbo;
      var reg = this.$refs.register;
      jumbo.getUsers();
      reg.closeModal();
      this.text = '';
      
    },
    openEditModal() {
      this.$refs.editLog.openModal();
    },
    async exportLogs() {
      // credit: https://www.bitdegree.org/learn/javascript-download
      let exportedLogs = [];
      var x;
      
      for(x in this.currentUserLogs) {
        let log = {
          state: this.currentUserLogs[x].state,
          stamp: this.currentUserLogs[x].moment,
          hours: this.currentUserLogs[x].hours
        }
        this.currentUserLogs[x].period = this.currentUserLogs[x].moment.split(' ')[0]+" "+this.currentUserLogs[x].moment.split(' ')[2].substring(0,this.currentUserLogs[x].moment.split(' ')[2].length - 1);
        exportedLogs.push(log);
      }
      exportedLogs[0].total = "";
      exportedLogs[0].name = this.currentUser.name;
      exportedLogs.push({total: this.total});
      console.log(exportedLogs);
      this.currentUser.logs = this.currentUserLogs;
      this.updateCurrentUser();

      let filename = this.currentUser.name+" "+exportedLogs[0].stamp.split(',')[0]+'.csv';
      let text = this.$papa.unparse(exportedLogs);
      
      let element = document.createElement('a');
      element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', filename);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();
      document.body.removeChild(element); 
    }
  }
}
</script>

<style scoped>
  .reg {
    margin-top: 5rem;
    margin-bottom: 1px;
    position:relative;
    
  }
</style>