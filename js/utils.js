function collision({ object1, object2 }) {
  return (
    object1.position.y + object1.height >= object2.position.y &&
    object1.position.y <= object2.position.y + object2.height &&
    object1.position.x <= object2.position.x + object2.width &&
    object1.position.x + object1.width >= object2.position.x
  )
}

function platformCollision({ object1, object2 }) {
  return (
    object1.position.y + object1.height >= object2.position.y &&
    object1.position.y + object1.height <=
      object2.position.y + object2.height &&
    object1.position.x <= object2.position.x + object2.width &&
    object1.position.x + object1.width >= object2.position.x
  )
}

// function jumper(){
//   player.velocity.y = -4
// }
// function jump(event) {
//   if (event.key === 'ArrowUp') {jumper(); 
//     document.removeEventListener('keydown', jump);
//   }
// }
// document.addEventListener('keydown', jump);

function winner(){
  document.querySelector('#displayText').style.display = 'flex'
}
