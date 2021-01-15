<template>
  <div class="edit_concert">
    <div class="grey--text mb-2 title-edit">EDIT CONCERT</div>
    <div class="form-groupe">
      <v-text-field
        v-model="nameConcert"
        :placeholder="getOneConcert.name_concert"
        label="Concert"
      ></v-text-field>
    </div>
    <div>
      <v-col class="d-flex flex-wrap justify-content-between">
        <div v-for="group in filteredGroup" :key="group.id" class="genre2">
          <span class="input-group-text style genre">
            {{ group }}
            <DeleteArtistFromConcert v-bind:getOneConcert="getOneConcert" v-bind:group="group"/>
          </span
          >
        </div>
      </v-col>
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
    <v-col cols="12">
      <AddArtist v-bind:getOneConcert="getOneConcert" />
    </v-col>
    <v-col class="d-flex flex-wrap justify-content-between">
      <div v-for="mystyle in getOneConcert.genre" :key="mystyle.id" class="genre2">
        <span class="input-group-text style genre"> {{ mystyle }} 
         <DeleteGenreFromConcert v-bind:getOneConcert="getOneConcert" v-bind:mystyle="mystyle"/>
        </span>
      </div>
    </v-col>
    <AddGenre v-bind:getOneConcert="getOneConcert" />
    <div>
      <div class="form-groupe">
        <v-text-field
          v-if="dateConcert != ''"
          :placeholder="dateConcert"
          label="Date"
        >
        </v-text-field>
        <v-text-field v-else :placeholder="getOneConcert.date" label="Date">
        </v-text-field>
      </div>
    </div>
    <div class="form-groupe">
      <v-text-field
        v-model="maxTickets"
        :placeholder="getOneConcert.max_tickets.toString()"
        label="Attendents"
      ></v-text-field>
    </div>
    <div>
      <router-link :to="`/bookedconcertinformation/${getOneConcert._id}`">
        <v-btn class="btn-save" @click="saveForm"> Save </v-btn>
      </router-link>
    </div>
    <v-app id="inspire">
      <v-row justify="center">
        <v-date-picker v-model="dateConcert"></v-date-picker>
      </v-row>
    </v-app>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AddArtist from "@/components/ConcertComponent/AddArtist";
import AddGenre from "@/components/ConcertComponent/AddGenre";
import DeleteArtistFromConcert from "@/components/ConcertComponent/DeleteArtistFromConcert";
import DeleteGenreFromConcert from "@/components/ConcertComponent/DeleteGenreFromConcert";

export default {
  name: "EditConcertFromWishList",
  props: ["concertId"],
  components: {
    AddArtist,
    AddGenre,
    DeleteArtistFromConcert,
    DeleteGenreFromConcert
  },
  data() {
    return {
      dateConcert: "",
      nameConcert: "",
      nameGroup: "",
      maxTickets: "",
      newGroup: [],
      newGroupId: [],
    };
  },
  methods: {
    ...mapActions(["setConcert", "updateConcert"]),
    addGroupOnSubmit() {
      this.newGroup.map((name) => {
        var myGroupId = this.getAllGroups.find(
          (group) => group.name_group == name
        )._id;
        this.newGroupId.push(myGroupId);
      });
    },
    async saveForm(e) {
      e.preventDefault();

      var newConcert = { _id: this.concertId };
      if (this.nameConcert != "") {
        newConcert["name_concert"] = this.nameConcert;
      }
      if (this.dateConcert != "") {
        newConcert["date"] = this.dateConcert;
      }
      if (this.maxTickets != "") {
        newConcert["max_tickets"] = this.maxTickets;
      }
      if (this.newGroup != "") {
        this.addGroupOnSubmit();
        // first merge array name_group with newGroupID
        // then keep unique value
        // finally edit name_group of new concert
        this.getOneConcert.name_group = [
          ...new Set(this.getOneConcert.name_group.concat(this.newGroupId)),
        ];
        newConcert["name_group"] = this.getOneConcert.name_group;
      }
      await this.updateConcert(newConcert);
      this.$router.push(`/bookedconcertinformation/${this.getOneConcert._id}`);
    },
  },
  computed: {
    ...mapGetters(["getOneConcert", "getAllGroups"]),
    filteredGroup() {
      return this.getOneConcert.name_group.map((j) => {
        let test = this.getAllGroups.find((x) => {
          return x._id === j;
        });
        return test.name_group;
      });
    },
    filteredAllGroup() {
      return this.getAllGroups.map((group) => {
        return group.name_group;
      });
    },
  },
  created() {
    this.setConcert(this.concertId);
    this.setAllGroups;
  },
};
</script>

<style scoped>
.edit_concert {
  margin: 5%;
}

.title-edit {
  font-size: 3rem;
}

.style {
  margin-left: 2rem;
}

.btn-close:focus {
  outline: 0;
}
.genre2{
  margin-top: 2rem !important;
}

.genre {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  align-items: center;
  color: inherit;
  padding: 0.5rem;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
  min-height: inherit;
  position: relative;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  width: 100%;
  color: rgb(117, 116, 116);
  border-radius: 5px;
}
</style>