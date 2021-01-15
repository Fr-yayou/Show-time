<template>
  <div class="container-concert">
    <div class="allcards" v-if="filteredConcert.length != 0">
      <div v-for="concert in filteredConcert" :key="concert.id">
        <v-card class="mx-auto card-item concert-img" max-width="500">
          <v-img
            class="white--text align-end"
            height="300px"
            src="../assets/card1.jpg"
          >
            <button @click="addConcertToWishList(concert._id)">
              <img class="love" src="../assets/like.png" />
            </button>
            <button @click="addConcertToBookedConcert(concert._id)">
              <img class="cart" src="../assets/cart.png" />
            </button>
            <v-card-title> {{ concert.name_concert }} </v-card-title>
          </v-img>
          <v-row>
            <v-col cols="6">
              <v-card-subtitle class="pb-0 date">
                <v-icon>{{ icons.mdiCalendarRange }}</v-icon> {{ concert.date }}
              </v-card-subtitle>
            </v-col>
            <v-col cols="6">
              <v-card-subtitle class="pb-0">
                <v-icon>{{ icons.mdiTicket }}</v-icon> Max places :
                {{ concert.max_tickets }}
              </v-card-subtitle>
            </v-col>
          </v-row>
          <v-card-text class="text--primary d-flex flex-wrap style-section">
            <v-icon>{{ icons.mdiMusicNote }}</v-icon>
            <div class="style" v-for="style in concert.genre" :key="style.id">
              <p class="genre">{{ style }}</p>
            </div>
          </v-card-text>

          <v-card-text class="text--primary d-flex flex-wrap">
            <Group v-bind:concert="concert" />
          </v-card-text>

          <v-card-actions class="d-flex justify-content-between button-section">
            <div v-if="authenticated.isAdmin == 1">
              <router-link
                :to="`/concerts/${concert._id}`"
                style="text-decoration: none"
              >
                <div><v-btn color="primary" text>Edit Concert</v-btn></div>
              </router-link>
            </div>
            <div v-if="authenticated.isAdmin == 1">
              <DeleteConcert v-bind:concert="concert" />
            </div>
          </v-card-actions>
        </v-card>
      </div>
    </div>
    <div v-if="authenticated.isAdmin == 1">
      <AddConcert />
    </div>
    <div v-if="filteredConcert.length == 0" class="no-yet" >
      <div class="quote">
        "Be patient, good things take time."
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Group from "@/components/ConcertComponent/Group";
import DeleteConcert from "@/components/ConcertComponent/DeleteConcert";
import AddConcert from "@/components/ConcertComponent/AddConcert";
import { mdiCalendarRange, mdiTicket, mdiMusicNote } from "@mdi/js";
export default {
  name: "Artists",
  props: ["groupId"],
  components: {
    Group,
    DeleteConcert,
    AddConcert,
  },
  data() {
    return {
      icons: { mdiCalendarRange, mdiTicket, mdiMusicNote },
      bool: true,
    };
  },
  methods: {
    ...mapActions(["setAllGroups"]),
  },
  computed: {
    ...mapGetters(["getAllFeedbacks", "authenticated", "getAllConcerts"]),
    filteredConcert() {
      return this.getAllConcerts.filter((concert) => {
        return concert.name_group.find((idgroup) => {
          return idgroup == this.groupId;
        });
      });
    },
  },
  created() {
    this.setAllGroups();
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap');
.quote{
  margin-bottom: 5%;
  color: white;
  font-size: 3rem;
  font-family: 'Playfair Display', serif;
}

.no-yet {
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)),
    url("../assets/notyet.jpg");
  height: 100vh;
  background-size: cover;
  background-position: center center;
}

.genre {
  padding: 0;
  margin: 0;
}
.container-concert {
  background-color: #efeff2;
  height: 100vh;
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
  margin: 0%;
  padding-top: 70px;
  flex-wrap: wrap;
}
.button-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
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
  min-height: 35rem;
}

.searchbar {
  padding-top: 70px;
}
</style>