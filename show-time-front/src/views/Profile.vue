<template>
    <div class="background-profile">
        <v-container class="d-flex mt-10">
            <div class="mr-3 mt-8">
                <h1 class="mr-3 white--text">Welcome <span class="colorOne">{{ getOneUser.username }}</span> </h1>
                    <!-- <div class="profile-links">
                        <router-link to="/bookedconcerts"><p>My Booked Concerts</p></router-link>
                    </div> -->
                    <div class="profile-links">
                        <router-link to="/myqrcodes"><p>My QR Code</p></router-link>
                    </div> 
                    <div class="profile-links">
                        <router-link to="/wishlist"><p>My Wished Concerts</p></router-link>
                    </div>
                    <div class="profile-links">
                        <router-link to="/favoritebands"><p>My Favorite Artists</p></router-link>
                    </div>
            </div>
            <v-divider class="mt-9" color="black" vertical></v-divider>

            <div class="ml-8 mt-8">
                <v-card class="card-background" elevation="12" width=100%>
                    <v-card-title> Your account details </v-card-title>
                    <v-divider class="mx-4"></v-divider>
                    <v-card-subtitle class="mx-4"> Email: {{ getOneUser.email }}</v-card-subtitle>
                    <v-divider class="mx-4"></v-divider>
                    <v-card-text>
                    </v-card-text>

                    <div class="d-flex">
                        <ProfileEdit v-bind:user="getOneUser"/>
                        <ProfileDelete v-bind:user="getOneUser"/>
                    </div>
                </v-card>
            </div>
        </v-container>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ProfileEdit from '@/components/ProfileComponent/ProfileEdit';
import ProfileDelete from '@/components/ProfileComponent/ProfileDelete';



export default {
    name: 'Profile',

    components: {
        ProfileEdit,
        ProfileDelete,
    },

    methods: {
        ...mapActions(['setAllUsers', 'setUser'])
    },

    computed: {
        ...mapGetters(['getAllUsers', 'getOneUser', 'authenticated'])
    },
    
    created(){
        this.setAllUsers();
        this.setUser(this.authenticated.userId)
    },
}
</script>

<style scoped>

.background-profile {
    background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)), url("../assets/profileBg.jpg");
    /* background-image: url("../assets/profileBg.jpg"); */
    background-size: cover;
    background-position: center center;
    height: 100vh;
    width: 100%;
}

.card-background {
    background-color: #efeff2;
}

.colorOne {
    color: #F9A825;
}

.profile-links a{
    color:#F9A825;
    text-decoration: none;
}


</style>