<template>
      <button class="btn-close" @click="deleteGenreOnClick()" >
              <v-icon>{{ icons.mdiClose }}</v-icon>
      </button>
</template>

<script>
import { mdiClose } from "@mdi/js";
import { mapActions} from "vuex";
export default {
  data(){
    return {
           icons: { mdiClose },
    }
  },
  name: "DeleteArtistFromConcert",
  props: ["mystyle", "getOneConcert"],
  methods: {
    ...mapActions(["updateConcert", "setConcert"]),
      async deleteGenreOnClick() {
        let newArrayGenre = this.getOneConcert.genre.filter((name) => {
          return name !== this.mystyle
        })
        let updateConcert = {
          '_id': this.getOneConcert._id,
          'genre': newArrayGenre,
        }
        await this.updateConcert(updateConcert);
        await this.setConcert(updateConcert._id);
    },
  },
};
</script>

<style scoped>
</style>