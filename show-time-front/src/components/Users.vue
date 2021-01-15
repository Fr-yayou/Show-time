<template>
<div class= "users">
  <div v-for="user in getAllUsers" :key="user.id">
    <div>
      {{ user._id }}
    </div>
  </div>
</div>
 
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'Users',
    methods: {
      ...mapActions(['setAllUsers'])
    },
  computed: {
    ...mapGetters(['getAllUsers'])
  },
  created(){
    this.setAllUsers();
  },
}
</script>