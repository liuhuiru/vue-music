<template>
  <div class="music-list">
    <div class="back" @click="goback">
      <i class="icon-back"></i>
    </div>
    <h1 class="title">{{title}}</h1>
    <!-- 上半部分背景页面 -->
    <div class="bg-image" :style="bgImageStyle" ref="bgImageRef">
      <div class="play-btn-wrapper" :style="playBtnStyle">
        <div class="play-btn" v-show="songs.length>0" @click="random">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" :style="filterStyle"></div>
    </div>
    <!-- 下半部分歌曲列表页面 -->
    <scroll class="list" 
            :style="scrollStyle"
            v-loading="loading" 
            v-no-result:[noResultText]="noResult" 
            :probeType="3" @scroll="onScroll"
    ><div class="song-list-wrapper">
        <song-list :songs="songs" @select="selectItem"></song-list>
      </div>
    </scroll>
    
  </div>
</template>

<script>
import SongList from '@/components/base/song-list/song-list.vue'
import Scroll from '@/components/base/scroll/scroll.vue'
import { mapActions } from 'vuex'

const RESERVED_HEIGHT = 40

export default {
  name: 'music-list',
  components:{
    SongList,
    Scroll
  },
  props:{
    songs: {
      type: Array,
      default(){
        return []
      }
    },
    title: String,
    pic: String,
    loading: Boolean,
    noResultText:{
      type: String,
      default: '抱歉，没有找到可播放的歌曲'
    }
  },
  data(){
    return {
      imageHeight: 0,
      scrollY: 0,
      maxTanslateY: 0
    }
  },
  computed:{
    noResult(){
      return !this.loading && !this.songs.length
    },

    playBtnStyle(){
      let display = ''
      // 滚动到最上面的时候随机播放按钮不隐藏
      if(this.scrollY >= this.maxTanslateY){
        display = 'none'
      }
      return {
        display 
      }
    },

    bgImageStyle(){
      const scrollY = this.scrollY
      let zIndex = 0
      let paddingTop = '70%'
      let height = 0
      //ios系统兼容
      let translateZ = 0

      if(scrollY > this.maxTanslateY){
        zIndex = 10
        paddingTop = 0
        height = `${RESERVED_HEIGHT}px`
        translateZ = 1
      }

      //实现下拉图片放大
      let scale = 1
      if(scrollY<0){
        scale = 1 + Math.abs(scrollY / this.imageHeight)
      }

      return {
        paddingTop,
        height,
        zIndex,
        backgroundImage: `url(${this.pic})`,
        transform: `scale(${scale})translateZ(${translateZ})`
      }
    },
    scrollStyle(){
      // console.log('h',this.imageHeight)
      return {
        top: `${this.imageHeight}px`
      }
    },

    filterStyle(){
      let blur = 0
      const scrollY = this.scrollY
      const imageHeight = this.imageHeight
      if(scrollY>=0){
        blur = Math.min(this.maxTanslateY/imageHeight, scrollY/imageHeight) * 20
      }
      return {
        backdropFilter: `blur(${blur}px)`
      }
    }

  },
  mounted(){
    this.imageHeight = this.$refs.bgImageRef.clientHeight
    this.maxTanslateY = this.imageHeight - RESERVED_HEIGHT

  },
  methods:{
    goback(){
      this.$router.back()
    },

    onScroll(pos){
      this.scrollY = -pos.y
    },

    selectItem( {song, index} ){
      this.selectPlay({
        list: this.songs,
        index: index
      })
    },
    random(){
      this.randomPlay(this.songs)
    },
    ...mapActions([
      'selectPlay',
      'randomPlay'
    ])
  }
}
</script>

<style lang="scss" scoped>
.music-list {
  position: relative;
  height: 100%;

  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 20;
    transform: translateZ(2px);

    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }

  .title {
    position: absolute;
    top: 0;
    left: 10%;
    width: 80%;
    z-index: 20;
    transform: translateZ(2px);
    @include no-wrap();
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large;
    color: $color-text;
  }

  .bg-image {
    position: absolute;
    width: 100%;
    transform-origin: top;
    background-size: cover;

    .play-btn-wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 10;
      width: 100%;

      .play-btn {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-theme;
        color: $color-theme;
        border-radius: 100px;
        font-size: 0;
      }

      .icon-play {
        display: inline-block;
        vertical-align: middle;
        margin-right: 6px;
        font-size: $font-size-medium-x;
      }

      .text {
        display: inline-block;
        vertical-align: middle;
        font-size: $font-size-small;
      }
    }

    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }

  .list {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 0;

    .song-list-wrapper {
      padding: 20px 30px;
      background: $color-background;
    }
  }
}
</style>