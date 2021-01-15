<template>
<div class="container-navSide">
    <h3 class="navSide-title"><span>Welcome</span> {{authenticated.username}}</h3>
    <ul class="list-linkNavSide">
        <router-link to="/admin/dashboard/users"><li>Users</li></router-link>
        <router-link to="/admin/dashboard/create/user"><li>Create users</li></router-link>
        <router-link to="/admin/dashboard/feedbacks"><li>Feedback</li></router-link>
        <a href="http://localhost:8080/admin/dashboard/statistic">Statistic</a>
    </ul>
</div>
</template>

<script>
import {mapGetters} from "vuex"
export default {
    name:"SideNav",

    computed:{
        ...mapGetters(["authenticated"])
    },

}
</script>

<style scoped>
.container-navSide{
    margin-left: 30px;
}
.navSide-title{
    color:white
}
.navSide-title span{
    color:#F9A825
}
.list-linkNavSide{
    height: 200px;
    display:flex;
    flex-direction: column;
    justify-content: space-around;
    list-style-type: none;

}
.list-linkNavSide a {
    color:white;
    font-weight:700;
    text-decoration: none;
}
.list-linkNavSide a:hover {
    color:#F9A825;
}
</style>