<template>
  <div class="search-form">
    <input
      :value="query"
      @input="$emit('input', $event.target.value)"
      class="search-input"
      placeholder="Reichstag" />
    <i class="fas fa-search search-icon"></i>
  </div>
</template>

<script>
export default {
  name: 'SearchForm',
  props: {
    query: String
  }
}
</script>

<style scoped>
.search-form {
  position: relative;
}
.search-input {
  border: 1px solid #eee;
  border-radius: 8px;
  width: 100%;
  padding: 12px 12px 12px 48px;
  box-sizing: border-box;
  position: relative;
  font-size: 16px;
  line-height: 1.5;
  flex: 1;
  background-color: #eee;
  color: #132968;
}
.search-input:focus {
  border-color: rgba(0,0,0,.12);
  background-color: #fff;
  outline: none;
  box-shadow: 0 2px 2px rgba(0,0,0,.16);
}
.search-icon {
  position: absolute;
  top: 50%;
  font-size: 20px;
  left: 15px;
  transform: translateY(-50%);
}
</style>
