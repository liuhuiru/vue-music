<template>
  <m-header></m-header>
  <Tab></Tab>
  <router-view></router-view>
</template>

<script>
import Header from '@/components/header/header'
import Tab from '@/components/tab/tab'

export default {
  components: {
    mHeader: Header,
    Tab
  }
}
</script>

