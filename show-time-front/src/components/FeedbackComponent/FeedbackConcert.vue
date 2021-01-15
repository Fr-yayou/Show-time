<template>
  <div class="container-concert">
    <div class="allcards">
      <v-card class="mx-auto card-item concert-img" max-width="500">
        <v-img
          class="white--text align-end"
          height="300px"
          src="../../assets/card1.jpg"
        >
          <button>
            <img class="love" src="../../assets/like.png" />
          </button>
          <button>
            <img class="cart" src="../../assets/cart.png" />
          </button>
          <v-card-title> {{ getOneConcert.name_concert }} </v-card-title>
        </v-img>
        <v-row>
          <v-col cols="6">
            <v-card-subtitle class="pb-0">
              <v-icon>{{ icons.mdiCalendarRange }}</v-icon>
              {{ getOneConcert.date }}
            </v-card-subtitle>
          </v-col>
          <v-col cols="6">
            <v-card-subtitle class="pb-0">
              <v-icon>{{ icons.mdiTicket }}</v-icon> Max places :
              {{ getOneConcert.max_tickets }}
            </v-card-subtitle>
          </v-col>
        </v-row>
        <v-card-text class="text--primary d-flex flex-wrap style-section">
          <v-icon>{{ icons.mdiMusicNote }}</v-icon>
          <div
            class="style"
            v-for="style in getOneConcert.genre"
            :key="style.id"
          >
            {{ style }}
          </div>
        </v-card-text>

        <v-card-text class="text--primary d-flex flex-wrap">
          <div class="d-flex flex-wrap justify-content-between group-card">
            <div
              v-for="group in filteredGroup"
              :key="group.id"
              class="group-section"
            >
              {{ group }} --
            </div>
          </div>
        </v-card-text>

        <v-card-actions class="d-flex justify-content-between button-section">
          <div>
            <router-link :to="`/concerts/${getOneConcert._id}`">
              <div><v-btn color="primary" text>Edit Concert</v-btn></div>
            </router-link>
          </div>
          <div>
            <v-btn
              color="red"
              text
              @click="deleteConcertOnSubmit(getOneConcert)"
            >
              Delete Concert</v-btn
            >
          </div>
        </v-card-actions>
      </v-card>
      <v-card v-scroll.self="onScroll" class="overflow-y-auto feedbacks" max-height="400">
        <v-banner
          class="justify-center headline font-weight-light banner"
          sticky
        >
          All Feedbacks
        </v-banner>

        <v-card-text>
          <div
            v-for="feedback in filterFeedback"
            :key="feedback.id"
            class="mb-4"
          >
            <div v-if="feedback.feedback != null">
              <v-icon>{{ icons.mdiCommentTextOutline }}</v-icon>
              {{ feedback.feedback }}
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  mdiCalendarRange,
  mdiTicket,
  mdiMusicNote,
  mdiStar,
  mdiCommentTextOutline,
} from "@mdi/js";

export default {
  name: "FeedbackConcert",
  props: ["concertId"],
  data() {
    return {
      scrollInvoked: 0,
      icons: {
        mdiCalendarRange,
        mdiTicket,
        mdiMusicNote,
        mdiStar,
        mdiCommentTextOutline,
      },
    };
  },
  components: {},
  methods: {
    onScroll() {
      this.scrollInvoked++;
    },
    ...mapActions([
      "setConcert",
      "setAllGroups",
      "deleteConcert",
      "setAllFeedbacks",
    ]),
    deleteConcertOnSubmit(concert) {
      var result = confirm("Are you sure you want to delete?");
      if (result) {
        this.deleteConcert(concert._id);
        this.$router.push(`/feedbacks`);
      }
    },
  },
  computed: {
    ...mapGetters(["getOneConcert", "getAllGroups", "getAllFeedbacks"]),
    filteredGroup() {
      return this.getOneConcert.name_group.map((j) => {
        return this.getAllGroups.find((x) => x._id === j).name_group;
      });
    },
    filterFeedback() {
      return this.getAllFeedbacks.filter((feedback) => {
        return feedback.concert_id == this.concertId;
      });
    },
  },
  created() {
    this.setConcert(this.concertId);
    this.setAllGroups;
    this.setAllFeedbacks;
  },
};
</script>

<style scoped>
.banner {
  background-color: white !important;
}

.container-concert {
  background-color: #efeff2;
}
.concert-img {
  position: relative;
}

.love {
  position: absolute;
  top: 20px;
  right: 15px;
  height: 8%;
  width: 5%;
}

.cart {
  position: absolute;
  top: 20px;
  right: 80px;
  height: 10%;
  width: 7%;
}

.allcards {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0%;
  padding-top: 70px;
  flex-wrap: wrap;
}

.button-section {
  display: flex;
  justify-content: space-between;
}
.style {
  margin-right: 3%;
}

.style-section {
  margin-top: 2%;
  margin-left: 3%;
  padding: 0%;
}
.card-item {
  margin: 8%;
}

.group-card {
  width: 100%;
}
.group-section {
  margin-left: 3%;
  text-align: center;
}

.feedbacks{
  margin: 3%;
  width: 50rem;
  min-height: 50rem;
}

</style>