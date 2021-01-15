<template>
<div class="feedback-container">
  <v-alert id="warning" color="red" elevation="20" type="warning">
    This concert has been deleted !
     <button class="btn-close" @click="closeWarning()" >
              <v-icon>{{ icons.mdiClose }}</v-icon>
      </button>
  </v-alert>
        <v-container>
      <v-card>
        <v-card-title>
          Feedback & Sales
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          class="row-pointer"
          :headers="headers"
          :search="search"
          :items="getAllFeedbacks"
          @click:row="goToConcert"
        >
        </v-data-table>
      </v-card>
    </v-container>
</div>
</template>


<script>
import { mdiClose } from "@mdi/js";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Feedbacks",
    data() {
    return {
      icons: { mdiClose },
      search: "",
      headers: [
        {
          text: "Concert Id",
          align: "start",
          sortable: true,
          value: "concert_id",
        },
        { text: "User Id", value: "user_id" },
        { text: "Feedback", value: "feedback" },
      ],
    };
  },
    methods: {
    ...mapActions(["setAllFeedbacks", "setAllConcerts"]),
    convertIdToNameConcert(id){
        return this.getAllConcerts.find((concert)=> {
         (concert._id == id).name_concert
      })
    },
    goToConcert(feedback){
      if (this.myIdConcertExists(feedback.concert_id)) {
        this.$router.push(`/feedbacks/concert/${feedback.concert_id}`);
      }
      else {
        document.getElementById("warning").style.display = "block";
      }
    },
    myIdConcertExists(id) {
      let res = this.getAllConcerts.find((concert) => {
        return concert._id == id
      })
      return(res);
    },
    closeWarning(){
      document.getElementById("warning").style.display = "none";
    }

  },
    computed: {
    ...mapGetters(["getAllFeedbacks", "authenticated", "getAllConcerts"]),
  },
  created() {
    this.setAllFeedbacks();
    this.setAllConcerts();
  },
};
</script>

<style>
.row-pointer >>> tbody tr :hover {
  cursor: pointer;
}

#warning{
  display: none;
}
</style>