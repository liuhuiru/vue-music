<template>
  <div class="singer" v-loading="!singers.length">
    <index-list :singers="singers" @select="singerSelect"></index-list>
    <!-- <router-view :singer="selectedSinger"></router-view> -->
    <!-- 添加路由过渡动画 -->
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :singer="selectedSinger" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { getSingerList } from '@/service/singer'
import IndexList from '@/components/index-list/index-list.vue'
import storage from 'good-storage'
import { SINGER_KEY } from '@/assets/js/constant'

export default {
  name:'singer',
  data(){
    return {
      singers:[],
      selectedSinger:null
    }
  },
  components:{
    IndexList
  },
  async created(){
    const res = await getSingerList()
    this.singers = res.singers
    console.log('singers',this.singers)
  },
  methods:{
    singerSelect(singer){
      console.log(singer)
      this.selectedSinger = singer
      this.cacheSinger(singer)
      this.$router.push({
        path: `/singer/${singer.mid}`
      })
    },
    cacheSinger(singer) {
      storage.session.set(SINGER_KEY, singer)
    }
  }
}
</script>

<style lang="scss" scoped>
.singer {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}

</style>