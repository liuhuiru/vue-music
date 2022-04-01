import { computed, ref } from 'vue'

export default function useShortcut(props, groupRef) {

  const scrollRef = ref(null)
  const ANCHOR_HEIGHT = 18

  const shortcutList = computed(()=>{
    return props.singers.map((group)=>{
      return group.title
    })
  })

  const touch = {}

  function onShortcutTouchStart(e){
    const anchorIndex = parseInt(e.target.dataset.index)
    scrollTo(anchorIndex)

    touch.y1 = e.touches[0].pageY
    touch.anchorIndex = anchorIndex
  }

  function onShortcutTouchMove(e){
    touch.y2 = e.touches[0].pageY
    const delta = (touch.y2 - touch.y1) / ANCHOR_HEIGHT | 0
    const anchorIndex = touch.anchorIndex + delta
    scrollTo(anchorIndex)
  }

  function scrollTo(anchorIndex){
    if(isNaN(anchorIndex)){
      return
    }
    const index = Math.max(0, Math.min(shortcutList.value.length-1, anchorIndex))
    const targetEl = groupRef.value.children[index]
    const scroll = scrollRef.value.scroll
    scroll.scrollToElement(targetEl, 0)
  }

  return{
    shortcutList,
    onShortcutTouchStart,
    scrollRef,
    onShortcutTouchMove
  }

}