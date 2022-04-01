// 洗牌算法，用于随机播放音乐
export function shuffle(source){
  //不要直接修改原始source
  const arr = source.slice()
  for(let i = 0; i < arr.length; i++){
    const j = getRandomInt(i);
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function getRandomInt(max){
  return Math.floor(Math.random() * (max + 1))
}
