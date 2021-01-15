<template>
<div class="backgroundWishConcert">
    <div class="container-wishList d-flex flex-column align-center">
        <div class="mb-3 mt-3">
            <h1> My next Wished Adventures... <span class="colorOne">Concerts</span>... </h1>
        </div>

        <div v-if="getOneUser.whished_concert.length == 0">
            <p id="no-concert">No concerts saved in your wish list yet...</p>
        </div>

        <div v-else>
        <v-card
        class="mx-auto"
        width="650"
        tile
        >
            <v-list rounded>
            <v-list-item-group
                color="primary"
            >
                <v-list-item v-for="(concert) in filteredConcerts" :key="concert.id">
                    <v-list-item-icon>
                        <img
                            alt="Wished Concert"
                            class="love"
                            src="../assets/like.png"
                            style="positon: absolute; height: 50%; width:4%;"
                        >
                    </v-list-item-icon>

                    <router-link :to="`/bookedconcertinformation/${concert._id}`" class="d-flex" style="text-decoration: none; width: 100%;">
                        <v-list-item-content>
                            <div class="d-flex justify-space-between" style="color:black;">
                                <div><v-list-item-title> {{ concert.name_concert }} </v-list-item-title></div>
                                <div><v-list-item-title> Date: {{ concert.date }} </v-list-item-title></div>
                            </div>
                        </v-list-item-content>
                    </router-link>
                </v-list-item>
            </v-list-item-group>
            </v-list>
        </v-card>
        </div>
    </div>
</div>
</template>

<script>
import { mapGetters,mapActions } from "vuex";

export default {
    name:"WishList",

    methods:{
        ...mapActions(["setUser"]),
    },

    computed:{
        ...mapGetters(["getAllConcerts", "getOneUser", "authenticated"]),

        filteredConcerts() {
            return this.getOneUser.whished_concert.map(id => {
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
.backgroundWishConcert {
    background-image: url("../assets/wishConcertBg.jpg");
    height: 100vh;
    background-size: cover;
    background-position: center center;
    opacity: 0.9;
}

.container-wishList{
    padding-top: 70px;
}

.colorOne {
    color: #F9A825;

}

#no-concert {
    color: white;
}

h1 {
    color: white;
    font-weight: normal;
}

.love {
    position: absolute;
    height:50%;
}



</style>