<template>
  <div class="container-concert">
      <div class="d-flex m-2 ml-15 size-input searchbar">
        <v-icon medium> mdi-magnify </v-icon>
        <v-text-field
          name="search"
          class="myInput"
          id="myInput"
          placeholder="Search concert, date, genre ..."
          @change="myFunction"
        ></v-text-field>
      </div>
    <div class="allcards">
    <div v-for="concert in getAllConcerts" :key="concert.id">
      <v-card class="mx-auto card-item concert-img" max-width="500">
        <v-img
          class="white--text align-end"
          height="300px"
          src="../assets/card1.jpg"
        >
        <button @click="addConcertToWishList(concert._id)">
        <img
          class="love"
          src="../assets/like.png"
        >
        </button>
        <router-link :to="`/bookedconcertfeedback/${concert._id}`">
            <button @click="addConcertToBookedConcert(concert._id)">
          <img
            class="cart"
            src="../assets/cart.png"
          >
          </button>
        </router-link>
          <v-card-title class="name_concert"> {{ concert.name_concert }} </v-card-title>
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
              <p class="genre"> {{ style }} </p>
          </div>
        </v-card-text>

          <v-card-text class="text--primary d-flex flex-wrap">
            <Group v-bind:concert="concert"/>
          </v-card-text>

          <v-card-actions class="d-flex justify-content-between button-section">
            <div v-if="authenticated.isAdmin == 1">
              <router-link :to="`/concerts/${concert._id}`" style="text-decoration: none;">
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
    <AddConcert/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Group from "@/components/ConcertComponent/Group";
import DeleteConcert from "@/components/ConcertComponent/DeleteConcert";
import AddConcert from "@/components/ConcertComponent/AddConcert";
import { mdiCalendarRange, mdiTicket, mdiMusicNote, } from "@mdi/js";

export default {
  name: "Concert",
  data() {
    return {
      icons: { mdiCalendarRange, mdiTicket, mdiMusicNote },
      search: "",
    };
  },
  components: {
    Group,
    DeleteConcert,
    AddConcert,
  },
  methods: {
    ...mapActions(["setAllConcerts", "setAllGroups", "updateUser", "setUser"]),

    addConcertToBookedConcert(concertId) {
      // add message already booked
      if (this.getOneUser.booked_concert.includes(concertId) == false) {
        if (this.getOneUser.whished_concert.includes(concertId) == true) {
            let newWishList = this.getOneUser.whished_concert.filter(id => id !== concertId)
            this.getOneUser.booked_concert.push(concertId)
            let updWishList = {
                _id: this.authenticated.userId,
                whished_concert: newWishList
            }
            this.updateUser(updWishList)
        }
        else {
            this.getOneUser.booked_concert.push(concertId)
        }
      }
      // copy the booked concert list into a new local list
      let newBookedConcertList = [...this.getOneUser.booked_concert]
      let updBookedConcertList = {
        _id: this.authenticated.userId,
        booked_concert: newBookedConcertList
      };
      this.updateUser(updBookedConcertList)
    },

    addConcertToWishList(concertId) {
      // add message already in wished list
      if (this.getOneUser.whished_concert.includes(concertId) == false) {
        this.getOneUser.whished_concert.push(concertId)
      }
      // copy the whished_concert list into a new local list
      let newWishedList = [...this.getOneUser.whished_concert]
      let updWishList = {
        _id: this.authenticated.userId,
        whished_concert: newWishedList
      };
      this.updateUser(updWishList)
    },
    myFunction() {
      var inputsearch = document.getElementById("myInput");
      var filter = inputsearch.value.toLowerCase();
      var dates = document.getElementsByClassName("date"); 
      var name_concert = document.getElementsByClassName("name_concert"); 
      var card = document.getElementsByClassName("card-item")
      for (let i = 0; i < card.length; i ++){
        card[i].style.display = "none";
        var myDate = dates[i].outerText;
        var myNameConcert = name_concert[i].outerText;
        var myConcertGenre = card[i].getElementsByClassName("genre");
        var myGenres = ""
        for (let j = 0; j < myConcertGenre.length; j++) {
          myGenres += myConcertGenre[j].outerText
        }
        var myConcertArtist = card[i].getElementsByClassName("artist");
        var myArtists = ""
        for (let j = 0; j < myConcertArtist.length; j++) {
          myArtists += myConcertArtist[j].innerText
        }
        var completeConcert = myDate + myNameConcert + myGenres + myArtists;
        completeConcert = completeConcert.replace(/\s/g, '').toLowerCase();
        // The method indexOf() returns the index of the first occurrence of the value 
        // searched for within the current string (from indexStart). It returns -1 if
        // the searched value is not found.
      if (completeConcert.indexOf(filter.replace(/ /g, "")) > -1){
          card[i].style.display = "block";
        }
      }
    },
  },
  computed: {
    ...mapGetters(["getAllConcerts", "getAllGroups", "authenticated", "getOneUser"]),
    filteredGroup() {
      return this.concert.name_group.map((j) => {
        return this.getAllGroups.find((x) => x._id === j).name_group;
      });
    },
  },
  created() {
    this.setAllConcerts();
    this.setAllGroups();
    this.setUser(this.authenticated.userId)
  },
};
</script>

<style scoped>
.genre {
  padding : 0;
  margin: 0;
}
.container-concert {
  background-color: #efeff2;
  height: 100vh;
}
.concert-img {
  position: relative;
}
.love{
    position: absolute;
    top: 20px;
    right: 15px;
    height:8%;
    width:5%;
}
.cart{
    position: absolute;
    top: 20px;
    right: 80px;
    height:10%;
    width:7%;
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

.searchbar{
  padding-top: 70px;
}
</style>
