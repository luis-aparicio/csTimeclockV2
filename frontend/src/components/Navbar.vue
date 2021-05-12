<template>
  <div>
  <b-navbar class="nav-bg" toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">
        <img src="../assets/logo.png" style="width: 25%;">
    </b-navbar-brand>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
    
      </b-navbar-nav>
  </b-navbar>
</div>

</template>

<script>
export default {
  name: 'Navbar'
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
    .nav-bg {
        background-color: transparent !important;
    }

</style>