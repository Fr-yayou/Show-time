<template>
    <div>
        <v-btn 
        class="error mb-2 mr-3"
        dark
        elevation="12"  
        small
        @click="openModalDeleteProfile" >Delete</v-btn> 
        <div class="container-modalDeleteProfile" v-if="isDelete">
            <ProfileDeleteModal v-bind:id="user._id" v-on:closeDelete="updateIsDelete(false)" />
        </div>
        <!-- v-if="job.user_id == user.id" -->
    </div>
</template>


<script>
import ProfileDeleteModal from '@/components/ProfileComponent/ProfileDeleteModal';

export default {
    name: "ProfileDelete",
    
    components: {
        ProfileDeleteModal
    },

    data () {
        return {
            isDelete: false,
        }
    },

    props: ["user"],

    methods: {
        openModalDeleteProfile() {
            this.isDelete = true
        },

        updateIsDelete() {
            this.isDelete = false
        }
    }

}
</script>

<style scoped>
.container-modalDeleteProfile {
    position:fixed;
    background-color: #EFEFF2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius:15px;
    background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3)), url("../../assets/profileDeleteModal.jpg");
    /* background-image: url("../../assets/profileDeleteModal.jpg"); */
    background-size: cover;
    background-position: center bottom;
    height: 41.12vh;
    width: 40%;
}
</style>