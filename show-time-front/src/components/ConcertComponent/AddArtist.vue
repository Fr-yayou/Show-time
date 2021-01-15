<template>
  <div>
    <div class="form-groupe">
      <v-text-field
        v-model="newGroup"
        label="Add New Artist"
        v-on:keyup.enter="submitNewGroup"
         hint="Put ENTER for adding artist"
             persistent-hint
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
      newGroup: "",
    };
  },
  props: ["getOneConcert"],
  methods: {
    ...mapActions(["addGroup", "updateConcert", "setConcert", "setAllGroups"]),
    submitNewGroup(e) {
      e.preventDefault();
      if (this.newGroup != "") {
        let group = {
          "name_group": this.newGroup,
        };
        this.addMyGrpToConcert(group).then((res) => {
          this.getOneConcert.name_group.push(res);
          let editConcert = {
            _id: this.getOneConcert._id,
            name_group: this.getOneConcert.name_group,
          };
          this.updateConcert(editConcert);
          this.newGroup = "";
        });
      }
    },
    async addMyGrpToConcert(group) {
      let result = await this.addGroup(group); // ajouter à la DB Group
      await this.setAllGroups();
      await this.setConcert(this.getOneConcert._id);
      return result; // retourne id du group
    },
  },
};
</script>

<style scoped>
</style>