import axios from "axios"

const state = {
    concerts:[],
    oneConcert:[],
}

const getters = {
    getAllConcerts:(state) => state.concerts,
    
    //return one user
    getOneConcert:(state) => state.oneConcert,
}

const actions = {
    async setAllConcerts({commit}){
        var response = await axios.get("/concerts")
        commit("setMyAllConcerts", response.data)
    },

    async setConcert({commit}, concertId){
        var response = await axios.get(`/concerts/${concertId}`)
        commit("setMyConcert", response.data)
    },

    async addConcert({commit}, newConcert){
        var res = await axios.post("/concerts", newConcert)
        var response = await axios.get(`/concerts/${res.data._id}`)
        commit("addMyConcert", response.data)
    },

    async deleteConcert({commit}, concertId){
        await axios.delete(`/concerts/${concertId}`)
        commit("deleteMyConcert", concertId)
    },

    async updateConcert({commit}, newConcert){
        let response = await axios.put(`/concerts/${newConcert._id}`, newConcert) //maybe ._id instead of .id
        response = await axios.get(`/concerts/${newConcert._id}`)
        commit("updateMyConcert", response.data)
    },
}

const mutations = {
    setMyAllConcerts:(state, concerts) => (state.concerts = concerts),
    setMyConcert:(state, oneConcert) => (state.oneConcert = oneConcert),
    addMyConcert:(state, newConcert) => (state.concerts.push(newConcert)),
    deleteMyConcert:(state, concertId) => (state.concerts = state.concerts.filter(concert => concert._id !== concertId)), //maybe ._id instead of .id
    //updateMyConcert: (state, concerts) => (state.concerts = concerts), 
    updateMyConcert:(state, concerts) => {
        const index = state.concerts.findIndex(j => j._id == concerts._id)
        if (index!== -1){
            state.concerts.splice(index, 1, concerts)
        }
    }
};

export default{
    state,
    mutations,
    getters,
    actions
}