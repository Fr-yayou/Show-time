import axios from "axios"

const state = {
    feedbacks:[],
    oneFeedback:[],
}

const getters = {
    getAllFeedbacks:(state) => state.feedbacks,

    getOneFeedback:(state) => state.oneFeedback,
}

const actions = {
    async setAllFeedbacks({commit}){
        var response = await axios.get("/feedbacks")
        commit("setMyAllFeedbacks", response.data)
    },

    async setFeedback({commit}, feedbackId){
        var response = await axios.get(`/feedbacks/${feedbackId}`)
        commit("setMyFeedback", response.data)
    },

    async addFeedback({commit}, newFeedback){
        var res = await axios.post("/feedbacks", newFeedback)
        var response = await axios.get(`/feedbacks/${res.data._id}`)
        commit("addMyFeedback", response.data)
        return(response.data._id)
    },

    async deleteFeedback({commit}, id){
        await axios.delete(`/feedbacks/${id}`)
        commit("deleteMyFeedback", id)
    },

    async updateFeedback({commit}, newFeedback){
        let response = await axios.put(`/feedbacks/${newFeedback._id}`, newFeedback)
        response = await axios.get(`/feedbacks/${newFeedback._id}`)
        commit("updateMyFeedback", response.data)
    },
}

const mutations = {
    setMyAllFeedbacks:(state, feedbacks) => (state.feedbacks = feedbacks),
    setMyFeedback:(state, oneFeedback) => (state.oneFeedback = oneFeedback),
    addMyFeedback:(state, newFeedback) => (state.feedbacks.push(newFeedback)),
    deleteMyFeedback:(state, id) => (state.feedbacks = state.feedbacks.filter(feedbacks => feedbacks._id !== id)),
    updateMyFeedback: (state, feedback) => {
        const index = state.feedbacks.findIndex(j => j._id == feedback._id)
        if (index!== -1){
            state.feedbacks.splice(index, 1, feedback)
        }
    }
};

export default{
    state,
    mutations,
    getters,
    actions
}