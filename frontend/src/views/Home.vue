<template>
  <div class="home">
    <jumbotron/>
    <b-container >
      <b-row>
        <b-col>
          <calender/>
        </b-col>
        <b-col> 
           <b-card no-body>
            <b-tabs pills card vertical end>
              <b-tab title="Tab 1" active><b-card-text>Tab contents 1</b-card-text></b-tab>
              <b-tab title="Tab 2"><b-card-text>Tab contents 2</b-card-text></b-tab>
              <b-tab title="Tab 3"><b-card-text>Tab contents 3</b-card-text></b-tab>
            </b-tabs>
          </b-card>
        </b-col>
      </b-row>
      <b-row>

      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Jumbotron from '@/components/Jumbotron.vue'
import Calender from '@/components/Calender.vue'


export default {
  name: 'Home',
  components: {
    Jumbotron,
    Calender
  }
}
</script>
