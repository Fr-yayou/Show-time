<template>
<div class="container-usersList">
    <h1>Users List</h1>
    <div class="container-table">
        <v-container>
      <v-card>
        <v-card-title>
            Users
          <v-spacer></v-spacer>
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        </v-card-title>
        <v-data-table class="row-pointer" :headers="headers" :search="search" :items="getAllUsers" @click:row="oneUser">
        </v-data-table>
      </v-card>
    </v-container>
    </div>
</div>
</template>

<script>
import {mapGetters,mapActions} from "vuex"
export default {
    name:"ListUsers",
    data() {
        return {
            search: "",
            headers:[
                {
                    text: "Username",
                    align: "start",
                    sortable: true,
                    value:"username",
                },
                    { text: "Email", value: "email" },
                    { text: "UserId", value: "_id" },
                    { text: "Role", value: "isAdmin" },
                ],
        }
    },

    methods:{
         ...mapActions(["setAllUsers"]),

         oneUser(value){
             this.$router.push({path:`/admin/dashboard/user/${value._id}`})
         }
        
    },

    computed:{
         ...mapGetters(["getAllUsers"])
    },

    created(){
        this.setAllUsers()
    }
}
</script>

<style scoped>
.container-usersList{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top:20px;

}


.container-table{
    width: 100%;
}
.row-pointer:hover{
    cursor: pointer;  
}
</style>