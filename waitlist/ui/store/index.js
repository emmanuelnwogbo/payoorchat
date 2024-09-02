export const state = () => ({
    loaderon: false
});

export const mutations = {
    SET_LOADERON(state, data) {
        state.loaderon = data
    },
    SET_LOADEROFF(state, data) {
        state.loaderon = data
    },
}

export const actions = {
    setloaderon({ commit }) {
        commit('SET_LOADERON', true);
    },
    setloaderoff({ commit }) {
        commit('SET_LOADEROFF', false);
    },
}