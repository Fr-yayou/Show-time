<template>
    <div>
        <div class="cornerModalDeleteProfile">
            <v-btn icon @click="closeModalDeleteProfile"><v-icon color="white">{{ icons.mdiClose }}</v-icon></v-btn>
        </div> 

        <div class="centerWarningMessage">
            <h1> Delete Account </h1>
            <p> Please note that All your datas will be deleted. Also, you will not be able to recover your datas. </p>
            <p> Sad to see you go. May the rock be with you!</p>
            <p> Are you sure you want to delete your account?</p>
            <div class="container-btnDeleteProfile">
                <router-link :to="`/signin`" style="text-decoration:none;">
                    <v-btn @click="destroyUser(id)" color="error">DELETE </v-btn>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions} from "vuex";
import { mdiClose } from '@mdi/js';

export default {
    name:"ProfileDeleteModal",

    props: ["id"],

    data() {
        return{
            icons: { mdiClose },
        }
    },

    methods:{
        ...mapActions(["deleteUser"]),
        
        destroyUser(id) {
            this.deleteUser(id);
            this.$emit("closeDelete", false)
        },

        closeModalDeleteProfile(){
            this.$emit("closeDelete", false)
        }
    }
}


</script>

<style scoped>

.centerWarningMessage {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1%;
}

.container-btnDeleteProfile{
    display: flex;
    justify-content: center;
    font-weight: bold;
}

.cornerModalDeleteProfile {
    display: flex;
    justify-content: flex-end;
}

h1 {
    font-size: 20px;
    font-weight: bold;
    color:#FF5F60;
}

p {
    color: white;
    font-weight: bold;
}

</style>