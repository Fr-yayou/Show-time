import axios from "axios"

const state = {
    groups:[],
    oneGroup:[],
}

const getters = {
    getAllGroups:(state) => state.groups,

    getOneGroup:(state) => state.oneGroup,
}

const actions = {
    async setAllGroups({commit}){
        var response = await axios.get("/groups")
        commit("setMyAllGroups", response.data)
    },

    async setGroup({commit}, groupId){
        var response = await axios.get(`/groups/${groupId}`)
        commit("setMyGroup", response.data)
    },

    async addGroup({commit}, newGroup){
        var res = await axios.post("/groups", newGroup)
        var response = await axios.get(`/groups/${res.data._id}`)
        commit("addMyGroup", response.data)
        return(response.data._id)
    },

    async deleteGroup({commit}, id){
        await axios.delete(`/groups/${id}`)
        commit("deleteMyGroup", id)
    },

    async updateGroup({commit}, newGroup){
        let response = await axios.put(`/groups/${newGroup._id}`, newGroup)
        response = await axios.get(`/groups`)
        commit("updateMyGroup", response.data)
    },
}

const mutations = {
    setMyAllGroups:(state, groups) => (state.groups = groups),
    setMyGroup:(state, oneGroup) => (state.oneGroup = oneGroup),
    addMyGroup:(state, newGroup) => (state.groups.push(newGroup)),
    deleteMyGroup:(state, id) => (state.groups = state.groups.filter(groups => groups._id !== id)),
    updateMyGroup: (state, group) => (state.group = group), 
};

export default{
    state,
    mutations,
    getters,
    actions
}