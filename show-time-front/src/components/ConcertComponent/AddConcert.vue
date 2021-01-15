<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            Add Concert
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">ADD CONCERT</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Concert name"
                    required
                    v-model="ConcertName"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    label="Date"
                    required
                    v-model="ConcertDate"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    label="Max attendents"
                    required
                    v-model="MaxTickets"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="newGroup"
                    :items="filteredGroup"
                    label="Choose artists"
                    multiple
                    chips
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Add new artist"
                    v-model="newArtist"
                    v-on:keyup.enter="addNewGroupOnSubmit"
                    required
                    hint="Put ENTER for adding artist into Choose List"
                    persistent-hint
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <div v-for="style in this.arrayStyle" :key="style.id">
                    <v-col cols="4">
                      <v-text-field
                        label="Style"
                        :placeholder="style"
                        solo
                      ></v-text-field>
                    </v-col>
                  </div>
                  <v-text-field
                    label="Add genre"
                    v-model="newStyle"
                    v-on:keyup.enter="addNewStyleOnSubmit"
                    required
                    hint="Put ENTER for adding style"
                    persistent-hint
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="saveForm"> Save </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "AddConcert",
  components: {},
  data() {
    return {
      dialog: false,
      MaxTickets: "",
      ConcertDate: "",
      ConcertName: "",
      newStyle: "",
      newArtist: "",
      arrayStyle: [],
      newGroup: [],
      newGroupId: [],
    };
  },
  methods: {
    ...mapActions(["addConcert", "addGroup", "setAllGroups", "setAllConcerts"]),
    addNewStyleOnSubmit(e) {
      e.preventDefault();
      if (this.newStyle != "") {
        this.arrayStyle.push(this.newStyle);
        this.newStyle = "";
      }
    },
    addGroupOnSubmit() {
      this.newGroup.map((name) => {
        var myGroupId = this.getAllGroups.find(
          (group) => group.name_group == name
        )._id;
        this.newGroupId.push(myGroupId);
      });
    },
    async addNewGroupOnSubmit() {
      if (this.newArtist != ""){
        let new_group = {
          name_group: this.newArtist
        };
        let id_result = await this.addGroup(new_group);
        await this.setAllGroups();
        this.newArtist = "";
        return id_result
      }
    },
    saveForm(e) {
      e.preventDefault();
      if (
        this.MaxTickets != "" &&
        this.ConcertDate != "" &&
        this.ConcertName != ""
      ) {
        this.addGroupOnSubmit();
        let newConcert = {
          name_concert: this.ConcertName,
          date: this.ConcertDate,
          max_tickets: this.MaxTickets,
          name_group: this.newGroupId,
          genre: this.arrayStyle,
        };
        this.addMyConcert(newConcert);
        this.ConcertName = "";
        this.ConcertDate = "";
        this.MaxTickets = "";
        this.arrayStyle = [];
        this.newGroupId = [];
        this.newGroup = [];
      }
      this.dialog = false
    },
    async addMyConcert(newConcert) {
      await this.addConcert(newConcert); // add new Concert to DB
      await this.setAllConcerts();
    },
  },
  computed: {
    ...mapGetters(["getAllGroups"]),
    filteredGroup() {
      return this.getAllGroups.map((group) => {
        return group.name_group;
      });
    },
  },
};
</script>

<style scoped>
</style>