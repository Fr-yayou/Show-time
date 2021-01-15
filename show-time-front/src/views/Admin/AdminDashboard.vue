<template>
<div class="container-adminDashboard">
    <div class="dashboard-navLeft">
        <SideNav/>
    </div>
    <div class="dashboard-displayRight">
        <router-view/>
    </div>
</div>
</template>

<script>
const SideNav = () => import("../../components/admin/SideNav.vue")
export default {
    components:{
        SideNav,
    },
}
</script>

<style scoped>
.container-adminDashboard{
    padding-top:70px;
    display:flex
}
.dashboard-navLeft{
    width: 20%;
    background-color: #323232;
    height: 91.12vh;
    position: fixed;
}
.dashboard-displayRight{
    width: 100%;
    background-color:#efeff2;
    margin-left: 20%;
    height: 91.12vh;
    
}
</style>