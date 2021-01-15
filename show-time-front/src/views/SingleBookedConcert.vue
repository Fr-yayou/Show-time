<template>
    <div class="container-concert">
        <div class="card-bookedConcert">
            <v-card class="mx-auto card-item concert-img" max-width="500">
                <v-img
                class="white--text align-end"
                height="300px"
                src="../assets/card1.jpg"
                >
                <router-link :to="`/bookedconcertfeedback/${getOneConcert._id}`">
                <button @click="addConcertToBookedConcert(getOneConcert._id)">
                <img
                class="cart"
                src="../assets/cart.png"
                >
                </button>
                </router-link>
                <v-card-title> {{ getOneConcert.name_concert }} </v-card-title>
                </v-img>
                <v-row>
                <v-col cols="6">
                    <v-card-subtitle class="pb-0 date">
                    <v-icon>{{ icons.mdiCalendarRange }}</v-icon> {{ getOneConcert.date }}
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
                <div class="style" v-for="style in getOneConcert.genre" :key="style.id">
                    <p class="genre"> {{ style }} </p>
                </div>
                </v-card-text>

                <v-card-text class="text--primary d-flex flex-wrap">
                    <GroupArtist v-bind:concert="getOneConcert"/>
                </v-card-text>

                <v-card-actions class="d-flex justify-space-between button-section">
                    <div v-if="authenticated.isAdmin == 1">
                    <router-link :to="`/editconcertwish/${getOneConcert._id}`" style="text-decoration: none;">
                        <div><v-btn color="primary" text>Edit Concert</v-btn></div>
                    </router-link>
                    </div>
                    <div v-if="authenticated.isAdmin == 1">
                    <DeleteConcert v-bind:concert="getOneConcert" />
                    </div>
                </v-card-actions>
            </v-card>
        </div>
    </div>
</template>

<script>
import {mapGetters,mapActions} from "vuex";
import { mdiCalendarRange, mdiTicket, mdiMusicNote, mdiClose } from "@mdi/js";
import DeleteConcert from "@/components/ConcertComponent/DeleteConcert";
import GroupArtist from "@/components/ConcertComponent/Group";

export default {
    name: "SingleBookedConcert",

    // props: ["concert"],

    components: {
        DeleteConcert,
        GroupArtist,
    },

    methods: {
        ...mapActions(["setConcert", "setUser", "updateUser"]),

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
    },

    computed: {
        ...mapGetters(["getOneConcert", "getOneUser", "authenticated"]),
    },

    created() {
        this.setConcert(this.$route.params.id)
        this.setUser(this.authenticated.userId)
    },

    data() {
        return {
            icons: { mdiCalendarRange, mdiTicket, mdiMusicNote, mdiClose },
        }
    },

}
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

.cart{
    position: absolute;
    top: 20px;
    right: 15px;
    height:10%;
    width:6%;
}

.card-bookedConcert {
    margin: 0%;
    padding-top: 70px;
    padding-bottom: 70px;
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

</style>