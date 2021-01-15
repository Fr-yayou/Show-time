import axios from 'axios'

export default{
    state:{
        token: null,
        user: null,
    },

    getters:{
        authenticated (state) {
            return state.token && state.user
        },

        user (state) {
            return state.user
        },
        response(state){
            return state.error
        }
    },

    mutations: {
        ///received token//
        set_token:(state, token) => (state.token = token),
        set_user:(state, data) => (state.user = data),
        REMOVE_USER:(state,data) =>(state.user = data),
        REMOVE_TOKEN:(state,data) =>(state.token = data)
    },

    actions : {
        async signIn ({dispatch}, credentials) {
            let response = await axios.post('users/signin', credentials)
            return dispatch('attempt', response.data.token)
        },
    
        async attempt ({commit, state}, token){
            if (token){
                commit('set_token', token)
            }
            if(!state.token) {
                return
            }
            try{
                let response = await axios.get('users/auth')
                commit('set_user', response.data)
            }catch (e){
                commit('set_token', null)
                commit('set_user', null)
            }
        },

        signOut ({ commit }){
            return axios.post('users/logout').then(() => {
                commit('set_token', null)
                commit('set_user', null)
            })
        },

        async register(_,newUser){
            let responseServer
            await axios.post('users/signup', newUser)
            .then( response =>{
                return responseServer = response.data.email
                
            })
            .catch(error => {
                if (error) {
                    return  responseServer = error.response.data.message
                }
            })
            return responseServer
        },

        async sendToken(_, userinfo){
            let response = await axios.post('send-token', userinfo)
            return response.data
        },

        async validateToken(_, token){
            let response = await axios.post('validate-token', token)
            return response
        },

        async logOut({commit},data){
            console.log(data)
            commit('REMOVE_TOKEN',data)
            commit('REMOVE_USER',data)
        }
    },
    

}