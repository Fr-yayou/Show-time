<template>
    <v-btn  color="red" text @click="deleteConcertOnSubmit(concert)"> Delete Concert</v-btn>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "DeleteConcert",
  props: ["concert"],
  methods: {
    ...mapActions(["deleteConcert"]),
    deleteConcertOnSubmit(concert) {
      var result = confirm("Are you sure you want to delete?");
      if (result) {
        this.deleteConcert(concert._id);
      }
    },
  },
  computed: {},
};
</script>

<style scoped>
</style>