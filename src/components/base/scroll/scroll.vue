<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<script>
import useSroll from './use-scroll'
import { ref } from 'vue'

export default {
  name: 'scroll',
  props: {
    click: {
      type: Boolean,
      default: true
    },
    probeType: {
      type: Number,
      default:0
    }
  },
  emits:['scroll'],
  setup(props, { emit }){
    const rootRef = ref(null)
    const scroll = useSroll(rootRef, props, emit)
    return{
      rootRef,
      scroll
    }
  }
}
</script>

<style>

</style>