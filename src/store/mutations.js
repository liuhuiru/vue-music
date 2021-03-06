const mutations = {
  setPlayState(state, playing){
    state.playing = playing
  },

  setSequenceList(state, list){
    state.squenceList = list
  },
  
  setPlayList(state, list){
    state.playList = list
  },

  setPlayMode(state, mode){
    state.playMode = mode
  },

  setCurrentIndex(state, index){
    state.currentIndex = index
  },

  setFullScreen(state, fullScreen){
    state.fullScreen = fullScreen
  }
}

export default mutations