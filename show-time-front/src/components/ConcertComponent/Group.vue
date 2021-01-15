<template>
  <div class="d-flex flex-wrap justify-content-between group-card">
    <div v-for="group in filteredGroup" :key="group.id" class="group-section">
      <p class="artist"> {{ group }} <v-icon>{{ icons.mdiStar }}</v-icon></p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { mdiStar } from "@mdi/js";

export default {
    name: 'Group',
    data (){
      return {
        icons: { mdiStar },
      }
    },
    components: {
    },
    props: ['concert'],
    methods: {
      ...mapActions(['setAllGroups', "setAllConcerts"]),
    },
  computed: {
    ...mapGetters(['getAllGroups']),
    filteredGroup() {
      return this.concert.name_group.map (j => {
         return this.getAllGroups.find(x => x._id === j).name_group
      })
    }
  },
  created(){
    this.setAllGroups();
  },
}
</script>

<style scoped>

.group-card{
  width: 100%;
}
.group-section{
  margin-left: 3%;
  text-align: center;
}

.v-icon { 
  height: 10px; 
  width: 10px;
}
</style>