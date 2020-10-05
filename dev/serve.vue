<script>
import Vue from 'vue';
import VueProgressAvatar from '@/vue-progress-avatar.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VueProgressAvatar
  }
});
</script>

<template>
  <div id="app">
    <vue-progress-avatar />
  </div>
</template>
