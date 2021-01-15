import Vue from "vue";
import VueRouter from "vue-router";
import store from '../store'
import Home from "../views/Home.vue";
import Artists from "../views/Artists.vue";
import Concert from "../views/Concert.vue";
import Feedbacks from "../views/Feedbacks.vue";
import FeedbackConcert from "../components/FeedbackComponent/FeedbackConcert.vue";
// import Users from "../components/Users.vue"//
import ValidatedConcert from "../components/QRCodeComponent/ValidatedConcert.vue";
import EditConcert from "../components/ConcertComponent/EditConcert.vue";
import Profile from "../views/Profile.vue";
import MyQRCode from "../views/MyQRCode.vue";
import SignUp from "../views/SignUp.vue"
import SignIn from "../views/SignIn"
import WishList from "../views/WishList"
import BookedConcerts from "../views/BookedConcerts"
import FavoriteBands from "../views/FavoriteBands"
import AdminDashboard from "../views/Admin/AdminDashboard"
import ListUsers from "../views/Admin/ListUsers"
import SingleBookedConcert from "../views/SingleBookedConcert"
import OneUser from "../views/Admin/OneUser"
import CreateUsers from "../views/Admin/CreateUsers"
import FeedbackUser from "../views/FeedbackUser"
import Statistic from "../views/Admin/Statistic"
import ConcertNotLogged from "../views/ConcertNotLogged"

import EditConcertFromWishList from "../components/ConcertComponent/EditConcertFromWishList";



Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/admin/dashboard",
    name: "AdminDashboard",
    component: AdminDashboard,
    beforeEnter: (to, from, next) => {
      if (!store.getters["authenticated"]) {
        return next({
          name: "SignIn",
        });
      }
      next();
    },
    children:[
      {
        path:'users',
        component: ListUsers,
        beforeEnter: (to, from, next) => {
          if (!store.getters["authenticated"]) {
        return next({
          name: "SignIn",
        });
      }
      next();
    },
      },
      {
        path:'user/:id',
        component: OneUser,
        beforeEnter: (to, from, next) => {
        if (!store.getters["authenticated"]) {
        return next({
          name: "SignIn",
        });
      }
      next();
    },
      },
      {
        path:'create/user',
        component: CreateUsers,
        beforeEnter: (to, from, next) => {
        if (!store.getters["authenticated"]) {
        return next({
          name: "SignIn",
        });
      }
      next();
    },
      },
      {
        path: "feedbacks",
        component: Feedbacks,
        beforeEnter: (to, from, next) => {
        if (!store.getters["authenticated"]) {
        return next({
          name: "SignIn",
        });
      }
      next();
    },
      },
      {
        path: "statistic",
        component: Statistic,
        beforeEnter: (to, from, next) => {
        if (!store.getters["authenticated"]) {
        return next({
          name: "SignIn",
        });
      }
      next();
    },
      },
    ]
  },
  {
    path: "/wishlist",
    name: "WishList",
    component: WishList,
    beforeEnter: (to, from, next) => {
      if (!store.getters["authenticated"]) {
        return next({
          name: "SignIn",
        });
      }
      next();
    },
  },
  {
    path: "/bookedconcerts",
    name: "BookedConcerts",
    component: BookedConcerts,
    beforeEnter: (to, from, next) => {
      if (!store.getters["authenticated"]) {
        return next({
          name: "SignIn",
        });
      }
      next();
    },
  },
  {
    path: "/editconcertwish/:concertId",
    name: "EditConcertFromWishList",
    component: EditConcertFromWishList,
    props: true,
  },
  {
    path: "/favoritebands",
    name: "FavoriteBands",
    component: FavoriteBands,
    beforeEnter: (to, from, next) => {
      if (!store.getters["authenticated"]) {
        return next({
          name: "SignIn",
        });
      }
      next();
    },
  },
  {
    path: "/groups/:groupId",
    name: "Artists",
    component: Artists,
    props: true,
    beforeEnter: (to, from, next) => {
      if (!store.getters["authenticated"]) {
        return next({
          name: "SignIn",
        });
      }
      next();
    },
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/concerts",
    name: "Concert",
    component: Concert,
  },
  {
    path: "/events",
    name: "ConcertNotLogged",
    component: ConcertNotLogged,
  },
  {
    path: "/concerts/:concertId",
    name: "EditConcert",
    component: EditConcert,
    props: true,
    beforeEnter: (to, from, next) => {
      if (!store.getters["authenticated"]) {
        return next({
          name: "SignIn",
        });
      }
      next();
    },
  },

  {
    path: "/feedbacks/concert/:concertId",
    name: "FeedbackConcert",
    component: FeedbackConcert,
    props: true,
    beforeEnter: (to, from, next) => {
      if (!store.getters["authenticated"]) {
        return next({
          name: "SignIn",
        });
      }
      next();
    },
  },
  
  // {
  //   path: "/users",
  //   name: "Users",
  //   component: Users,
  // },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    beforeEnter: (to, from, next) => {
      if (!store.getters["authenticated"]) {
        return next({
          name: "SignIn",
        });
      }
      next();
    },
  },
  {
    path: "/bookedconcertinformation/:id",
    name: "SingleBookedConcert",
    component: SingleBookedConcert,
    beforeEnter: (to, from, next) => {
      if (!store.getters["authenticated"]) {
        return next({
          name: "SignIn",
        });
      }
      next();
    },
  },
  {
    path: "/myqrcodes",
    name: "MyQRCode",
    component: MyQRCode,
    beforeEnter: (to, from, next) => {
      if (!store.getters["authenticated"]) {
        return next({
          name: "SignIn",
        });
      }
      next();
    },
  },
  {
    path: "/myqrcodes/singleconcert/:id",
    name: "ValidatedConcert",
    component: ValidatedConcert,
    beforeEnter: (to, from, next) => {
      if (!store.getters["authenticated"]) {
        return next({
          name: "SignIn",
        });
      }
      next();
    },
  },
  {
    path: "/bookedconcertfeedback/:id",
    name: "FeedbackUser",
    component: FeedbackUser,
    beforeEnter: (to, from, next) => {
      if (!store.getters["authenticated"]) {
        return next({
          name: "SignIn",
        });
      }
      next();
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
