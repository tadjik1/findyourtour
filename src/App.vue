<template>
  <div id="app">
    <Main />
  </div>
</template>

<script>
import Main from './components/Main.vue'

export default {
  name: 'app',
  components: {
    Main
  }
}
</script>

<style>
    * {
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    body {
        margin: 0;
        font-size: 1.6rem;
        line-height: 2.4rem;
        color: #1a2b49;
        background-color: #fff;
    }
    #app {
        font-family: 'Roboto', Helvetica, Arial, sans-serif;
    }
    ::placeholder {
        color: #6d6d6d;
    }
</style>
