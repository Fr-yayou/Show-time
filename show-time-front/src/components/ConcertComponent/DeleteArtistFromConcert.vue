<template>
      <button class="btn-close" @click="deleteArtistOnClick()" >
              <v-icon>{{ icons.mdiClose }}</v-icon>
      </button>
</template>

<script>
import { mdiClose } from "@mdi/js";
import { mapActions, mapGetters} from "vuex";
export default {
  data(){
    return {
           icons: { mdiClose },
    }
  },
  name: "DeleteArtistFromConcert",
  props: ["group", "getOneConcert"],
  methods: {
    ...mapActions(["updateConcert", "setConcert"]),
      async deleteArtistOnClick() {
        let idGroupToDelete = this.getAllGroups.find((x) => x.name_group === this.group)._id
        let newArrayIdGroup = this.getOneConcert.name_group.filter((group_id) => {
          return group_id != idGroupToDelete
        })
        let updateConcert = {
          '_id': this.getOneConcert._id,
          'name_group': newArrayIdGroup,
        }
        await this.updateConcert(updateConcert);
        await this.setConcert(updateConcert._id);
    },
  },
  computed: {
     ...mapGetters(["getAllGroups"]),
  },
  created() {
    this.setAllGroups;
  },
};
</script>

<style scoped>
</style>