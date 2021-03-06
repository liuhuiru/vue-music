import { ref, watch, computed, nextTick } from "vue"

export default function useFixed(props){
  const TITLE_HEIGHT = 30

  const groupRef = ref(null)
  const listHeight = ref([])
  const scrollY = ref(0)
  const currentIndex = ref(0)
  const distance = ref(0)

  const fixedTitle = computed(()=>{
    if(scrollY.value < 0){
      return ''
    }
    const currentGroup = props.singers[currentIndex.value]
    return currentGroup? currentGroup.title:''

  })

  const fixedStyle = computed(()=>{
    const distanceVal = distance.value
    const diff = (distanceVal>0 && distanceVal<TITLE_HEIGHT)? distanceVal - TITLE_HEIGHT : 0
    return {
      transform: `translate3d(0,${diff}px,0)`
    }
  })

  watch(()=> props.singers, async ()=>{
    await nextTick()
    caculate()
  })

  watch(scrollY, (newY)=>{
    const listHeightVal = listHeight.value
    for(let i=0;i<listHeightVal.length-1;i++){
      const heightTop = listHeightVal[i]
      const heightBottom = listHeightVal[i+1]
      //判断当前滚动到的位置
      if(newY >= heightTop && newY <= heightBottom){
        currentIndex.value = i
        distance.value = heightBottom - newY
      }
    }
  })

  function caculate(){
    const list = groupRef.value.children
    const listHeightVal = listHeight.value
    let height = 0

    listHeightVal.length = 0
    listHeightVal.push(height)
    
    for(let i=0; i<list.length; i++){
      height += list[i].clientHeight
      listHeightVal.push(height)
    }
  }

  function onScroll(pos){
    scrollY.value = -pos.y
  }

  return {
    groupRef,
    onScroll,
    fixedTitle,
    fixedStyle,
    currentIndex
  }
}
