<template>
  <div>
    <div class="form-groupe">
      <v-text-field
        v-model="newStyle"
        label="Add Music Style"
        v-on:keyup.enter="submitNewStyle"
      ></v-text-field>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Group",
  components: {},
  data() {
    return {
      newStyle: "",
    };
  },
  props: ["getOneConcert"],
  methods: {
    ...mapActions(["updateConcert", "setConcert"]),
    submitNewStyle(e){
      e.preventDefault();
      if (this.newStyle != ""){
        this.getOneConcert.genre.push(this.newStyle);
        let editConcert = {
          _id: this.getOneConcert._id,
          genre: this.getOneConcert.genre,
        }
        this.updateConcert(editConcert);
        this.newStyle = "";
      }
    },
  },
};
</script>

<style scoped>
</style>