<template>
<div class="background">
  <div class="container-wishList">
    <div>
      <h1 class="title-favband"> My favorite Bands</h1>
    </div>
    <v-col cols="12">
      <v-select
        v-model="newGroup"
        :items="filteredAllGroup"
        label="Choose artists"
        multiple
        chips
        required
      ></v-select>
    </v-col>
    <div v-for="(artist, index) in nameFavoriteBand" :key="artist.id">
        <h2 class="name-fav d-flex">
            <div><DeleteFavBand v-bind:artist="artist"/></div>
             <router-link :to="`/groups/${getOneUser.favorite_band[index]}`" style="text-decoration: none; color:white;"> 
                <div class="myArtist"> {{ artist }} </div>
            </router-link>
        </h2>
    </div>
    <div v-if="authenticated.isAdmin == 0" class="save">
      <router-link :to="`/profile`" style="text-decoration: none">
        <v-btn class="btn-save" @click="saveFavoriteBand"> Save </v-btn>
      </router-link>
    </div>
    <div v-else class="save">
      <router-link :to="`/admin/dashboard`" style="text-decoration: none">
        <v-btn class="btn-save" @click="saveFavoriteBand"></v-btn>
      </router-link>
    </div>
  </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { mdiClose } from "@mdi/js";
import DeleteFavBand from "@/components/ProfileComponent/DeleteFavBand";
export default {
  name: "FavoriteBands",
  props: [],
  components: {
    DeleteFavBand,
  },
  data() {
    return {
      model: 1,
      newGroup: [],
      newGroupId: [],
      icons: { mdiClose },
    };
  },
  methods: {
    ...mapActions(["updateUser", "setUser"]),
    convertNameToId(name){
        this.getAllGroups.find((group) => {
            (group.name_group == name)
        })
    },
    saveFavoriteBand() {
      var favBand = [...new Set(this.nameFavoriteBand.concat(this.newGroup))];
      favBand.map((name) => {
        var myGroupId = this.getAllGroups.find(
          (group) => group.name_group == name
        )._id;
        this.newGroupId.push(myGroupId);
      });
      let userUpdated = {
        _id: this.authenticated.userId,
        favorite_band: this.newGroupId,
      };
      this.updateUser(userUpdated);
    },
  },
  computed: {
    ...mapGetters(["getAllGroups", "authenticated", "getOneUser"]),
    filteredAllGroup() {
      return this.getAllGroups.map((group) => {
        return group.name_group;
      });
    },
    nameFavoriteBand() {
      return this.getOneUser.favorite_band.map((groupId) => {
        return this.getAllGroups.find((group) => group._id === groupId)
          .name_group;
      });
    },
  },
  created() {
    this.setAllGroups;
    this.setUser(this.authenticated.userId);
  },
};
</script>

<style scoped>

.theme--light.v-label {
    color: rgb(255, 255, 255) !important;
}

.myArtist{
    margin-left: 50px;
}

.title-favband{
    color: black;
}
.name-fav{
    color: white;
    font-weight: normal;
}

.background{
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url("../assets/test.jpg");
  height: 140vh;
  background-size: cover;
  background-position: center center;
}

.names {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.name {
  display: flex;
}

.chip {
  color: white;
}

.v-application .orange {
  background-color: #cc8500 !important;
  border-color: #ff5100 !important;
}

.v-chip.v-size--default {
  border-radius: 14px;
  font-size: 14px;
  height: 32px;
  padding: 0.8rem;
}

.container-wishList {
  padding-top: 5%;
  margin-left: 8%;
  margin-right: 8%;
}

.save {
  margin-top: 10%;
  margin-right: 3%;
  display: flex;
  justify-content: flex-end;
}

.btn-close {
  margin-left: 10px;
  margin-right: 0;
  padding: 0;
}
</style>