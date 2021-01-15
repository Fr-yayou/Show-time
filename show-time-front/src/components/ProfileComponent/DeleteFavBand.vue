<template>
   <button class="btn-close" @click="deleteArtistOnClick()" >
              X
    </button>
</template>


<script>
import { mapActions, mapGetters } from 'vuex';
import { mdiClose, mdiDeleteCircle } from "@mdi/js";

export default {
    name: "DeleteFavBand",

    data () {
        return {
            icons: { mdiClose, mdiDeleteCircle },
            bandIdToDelete:'',
        }
    },

    props: ["artist"],
    computed: {
         ...mapGetters(["authenticated", "getOneUser", "getAllGroups"]),
    },
    methods: {
         ...mapActions(["updateUser", "setUser"]),
        NameToIdArtist(name){
            this.bandIdToDelete = this.getAllGroups.find((group) => {
                return (group.name_group == name)._id
            })
            return(this.bandIdToDelete);
        },
        async deleteArtistOnClick() {
            var artistObj = this.getAllGroups.find((group) =>{
                return (group.name_group == this.artist)
            })
            var newArrayArtist = this.getOneUser.favorite_band.filter((bandId) =>{
                return bandId !== artistObj._id
            })
            var myUpdateUser = {
            '_id': this.authenticated.userId,
            'favorite_band': newArrayArtist,
            }
            await this.updateUser(myUpdateUser);
            await this.setUser(myUpdateUser._id);
        }
    },
    created() {
    this.setAllGroups;
    this.setUser(this.authenticated.userId);
  },

}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&display=swap');
.btn-close{
 font-family: 'Gloria Hallelujah', cursive;
}
</style>