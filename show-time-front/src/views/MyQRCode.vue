<template>
    <div class="container-bookedConcert mt-16">
        <div v-if="getOneUser.booked_concert.length == 0">
            <h1 id="no-concertBooked">No awesome adventures planned yet...</h1>
        </div>
        <div v-else class="allcards">
            <div v-for="concert in filteredConcerts" :key="concert.id">
                <v-card class="mx-auto card-item concert-img" max-width="500">
                        <v-card-title> {{ concert.name_concert }} </v-card-title>
                    <div id="output">
                        <router-link :to="{ name: 'ValidatedConcert', params: { id: concert._id }}">
                        <qrcode-vue class="qrcode" 
                        :value="`http://localhost:8080//myqrcodes/singleconcert/${concert._id}`" 
                        :size="size" 
                        level="H">
                        </qrcode-vue>
                        </router-link>
                    </div>
                    
                    <v-row>
                        <v-col cols="6">
                            <v-card-subtitle class="pb-0 date">
                            <v-icon>{{ icons.mdiCalendarRange }}</v-icon> {{ concert.date }}
                            </v-card-subtitle>
                        </v-col>
                    </v-row>
                    </v-card>
            </div>
        </div>
    </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import {mapGetters,mapActions} from "vuex";
import { mdiCalendarRange, mdiTicket, mdiMusicNote } from "@mdi/js";


export default {
    name:"BookedConcerts",

    components: {
        QrcodeVue
    },

    data() {
        return {
            icons: { mdiCalendarRange, mdiTicket, mdiMusicNote },
            size: 100,
            value: `http://localhost:8080/bookedconcerts/${this.concertId}`
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
#no-concertBooked {
    color: white;
    text-align: center;
}

.container-bookedConcert{
    background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)), url("../assets/profileBg.jpg");
    background-size: cover;
    background-position: center center;
    height: 100vh;
    width: 100%;
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
    margin-top: 8%;
}

.qrcode{
    display: flex;
    justify-content: center;
    align-self: center;
}
</style>