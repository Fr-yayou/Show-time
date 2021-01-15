<template>
    <div class="container-bookedConcert">
        <div class="allcards">
            <div v-for="concert in filteredConcerts" :key="concert.id">
                <v-card class="mx-auto card-item concert-img" max-width="500">
                    <v-img
                    class="white--text align-end"
                    height="300px"
                    src="../assets/bookedConcert.jpg"
                    >
                        <v-card-title> {{ concert.name_concert }} </v-card-title>
                    </v-img>
                    <v-row>
                    <v-col cols="6">
                        <v-card-subtitle class="pb-0 date">
                        <v-icon>{{ icons.mdiCalendarRange }}</v-icon> {{ concert.date }}
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
                        <p class="group-display"> Artists </p>
                        <GroupArtist v-bind:concert="concert"/>
                    </v-card-text>

                    <v-card-actions class="d-flex justify-content-between button-section">
                        <div v-if="authenticated.isAdmin == 1">
                        <router-link :to="`/bookedconcerts/${concert._id}`" style="text-decoration: none;">
                            <div><v-btn color="primary" text>Edit Concert</v-btn></div>
                        </router-link>
                        </div>
                        <div v-if="authenticated.isAdmin == 1">
                        <DeleteConcert v-bind:concert="concert" />
                        </div>
                    </v-card-actions>
                    </v-card>
                    
                    <v-divider inset width=80%></v-divider>

            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters,mapActions} from "vuex";
import { mdiCalendarRange, mdiTicket, mdiMusicNote } from "@mdi/js";
import DeleteConcert from "@/components/ConcertComponent/DeleteConcert";
import GroupArtist from "@/components/ConcertComponent/Group";


export default {
    name:"BookedConcerts",

    components: {
        DeleteConcert,
        GroupArtist,
    },

    data() {
        return {
            icons: { mdiCalendarRange, mdiTicket, mdiMusicNote },
        }
    },

    methods:{
        ...mapActions(["setUser"]),
    },

    computed:{
        ...mapGetters(["getAllConcerts", "getOneUser", "authenticated"]),

        filteredConcerts() {
            return this.getOneUser.booked_concert.map(id => {
                return this.getAllConcerts.find(concert => concert._id === id)
            })
        },
    },

    created(){
        this.setUser(this.authenticated.userId)
    }
}
</script>

<style scoped>
.container-bookedConcert{
    background-color: #efeff2;
}

.concert-img {
    position: relative;
}

.allcards {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 0%;
    padding-top: 70px;
}

.button-section {
    display: flex;
    justify-content: space-between;
}

.genre {
    padding : 0;
    margin: 0;
}

.group-display {
    text-decoration: underline;
    margin-left: 3%;
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
</style>