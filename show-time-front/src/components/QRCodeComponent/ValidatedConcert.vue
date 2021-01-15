<template>
    <div class="container-concert">
        <div class="card-bookedConcert">
            <v-card class="mx-auto card-item concert-img" max-width="500">
                <v-img
                class="white--text align-end"
                height="300px"
                src="../../assets/card1.jpg"
                >
                <v-img
                class="medal"
                src="../../assets/medal.png"
                >
                </v-img>
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
            </v-card>
        </div>
    </div>
</template>

<script>
import {mapGetters,mapActions} from "vuex";
import { mdiCalendarRange, mdiTicket, mdiMusicNote, mdiClose } from "@mdi/js";
import GroupArtist from "@/components/ConcertComponent/Group";

export default {
    name: "SingleBookedConcert",
    components: {
        GroupArtist,
    },

    methods: {
        ...mapActions(["setConcert", "setUser", "updateUser"]),
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
.medal{
    width: 4rem;
    height: 4rem;
    margin-bottom: 10.5rem;
}

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