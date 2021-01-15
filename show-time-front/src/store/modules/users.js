import axios from "axios"

const state = {
    users:[],
    oneUser:[],
}

const getters = {
    getAllUsers:(state) => state.users,
    
    //return one user
    getOneUser:(state) => state.oneUser,
}

const actions = {
    async setAllUsers({commit}){
        var response = await axios.get("/users")
        commit("setMyAllUsers", response.data)
    },

    async setUser({commit}, userId){
        var response = await axios.get(`/users/${userId}`)
        commit("setMyUser", response.data)
    },

    async addUser({commit}, newUser){
        var response = await axios.post("/users", newUser)
        response = await axios.get(`/users`)
        commit("addMyUser", response.data)
    },

    async deleteUser({ commit }, id) {
        await axios.delete(`/users/${id}`)
        commit("deleteMyUser", id)
    },

    async updateUser({ commit }, newUser) {
        let response = await axios.put(`/users/${newUser._id}`, newUser) // add response = await axios.get(`/profile`)
        response = await axios.get(`/users/${newUser._id}`)
        commit("updateMyUser", response.data)
    },
}

const mutations = {
    setMyUser:(state, oneUser) => (state.oneUser = oneUser),
    setMyAllUsers:(state, users) => (state.users = users),
    addMyUser:(state, newUser) => (state.users.push(newUser)),
    deleteMyUser:(state, id) => (state.users = state.users.filter(users => users._id !== id)),
    updateMyUser: (state, updUser) => {
        const index = state.users.findIndex(user => user._id === updUser._id)
        if(index !== -1){
            state.users.splice(index, 1, updUser)
        }
    },
};

export default{
    state,
    mutations,
    getters,
    actions
}