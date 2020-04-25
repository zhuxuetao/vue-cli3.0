export default {
  namespaced: true,
  state: {
    LoadingIsShow: false
  },
  mutations: {
    SetLoading (state, boo) {
      state.LoadingIsShow = boo
    }
  }
}
