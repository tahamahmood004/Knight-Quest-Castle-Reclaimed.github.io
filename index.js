const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

var music = new Audio('./sounds/HollowKnightOST-Greenpath.wav');

const scaledCanvas = {
  width: canvas.width / 2.5,
  height: canvas.height / 2.5,
}

const floorCollisions2D = []
for (let i = 0; i < floorCollisions.length; i += 108) {
  floorCollisions2D.push(floorCollisions.slice(i, i + 108))
}

const collisionBlocks = []
floorCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 202) {
      collisionBlocks.push(
        new CollisionBlock({
          position: {
            x: x * 16,
            y: y * 16,
          },
        })
      )
    }
  })
})

const platformCollisions2D = []
for (let i = 0; i < platformCollisions.length; i += 108) {
  platformCollisions2D.push(platformCollisions.slice(i, i + 108))
}

const platformCollisionBlocks = []
platformCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 202) {
      platformCollisionBlocks.push(
        new CollisionBlock({
          position: {
            x: x * 16,
            y: y * 16,
          },
          height: 16,
        })
      )
    }
  })
})

const gravity = 0.1

const player = new Player({
  position: {
    x: 0,
    y: 365,
  },
  collisionBlocks,
  platformCollisionBlocks,
  imageSrc: './img/FantasyWarrior/Sprites/Idle.png',
  frameRate: 10,
  animations: {
    Idle: {
      imageSrc: './img/FantasyWarrior/Sprites/Idle.png',
      frameRate: 10,
      frameBuffer: 3,
    },
    Run: {
      imageSrc: './img/FantasyWarrior/Sprites/Run.png',
      frameRate: 8,
      frameBuffer: 5,
    },
    Jump: {
      imageSrc: './img/FantasyWarrior/Sprites/Jump.png',
      frameRate: 3,
      frameBuffer: 3,
    },
    Fall: {
      imageSrc: './img/FantasyWarrior/Sprites/Fall.png',
      frameRate: 3,
      frameBuffer: 3,
    },
    FallLeft: {
      imageSrc: './img/FantasyWarrior/Sprites/LeftFall.png',
      frameRate: 3,
      frameBuffer: 3,
    },
    RunLeft: {
      imageSrc: './img/FantasyWarrior/Sprites/LeftRun.png',
      frameRate: 8,
      frameBuffer: 5,
    },
    IdleLeft: {
      imageSrc: './img/FantasyWarrior/Sprites/LeftIdle.png',
      frameRate: 10,
      frameBuffer: 3,
    },
    JumpLeft: {
      imageSrc: './img/FantasyWarrior/Sprites/LeftJump.png',
      frameRate: 3,
      frameBuffer: 3,
    },
    Attack1: {
      imageSrc: './img/FantasyWarrior/Sprites/Attack1.png',
      frameRate: 7,
      frameBuffer: 3,
    },
    Attack2: {
      imageSrc: './img/FantasyWarrior/Sprites/Attack2.png',
      frameRate: 7,
      frameBuffer: 3,
    },
    Attack3: {
      imageSrc: './img/FantasyWarrior/Sprites/Attack3.png',
      frameRate: 8,
      frameBuffer: 3,
    }
  },
})

const keys = {
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  j: {
    pressed: false,
  },
  k: {
    pressed: false,
  },
  l: {
    pressed: false,
  },
}

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: './img/DarkForest1.2/gamebackground.png',
})

const backgroundImageHeight = 640

const camera = {
  position: {
    x: 0,
    y: -backgroundImageHeight + scaledCanvas.height,
  },
}

function animate() {
  window.requestAnimationFrame(animate)
  c.fillStyle = 'white'
  c.fillRect(0, 0, canvas.width, canvas.height)

  c.save()
  c.scale(2.5, 2.5)
  c.translate(camera.position.x, camera.position.y)
  background.update()

  
  // collisionBlocks.forEach((collisionBlock) => {
  //   collisionBlock.update()
  // })

  // platformCollisionBlocks.forEach((block) => {
  //   block.update()
  // })

  player.checkForHorizontalCanvasCollision()
  player.update()

  player.velocity.x = 0

  if (keys.j.pressed) {
    player.switchSprite('Attack1')
    player.velocity.x = 0
    player.lastDirection = 'right'
    player.shouldPanCameraToTheLeft({ canvas, camera })
  } 
  else if (keys.k.pressed) {
    player.switchSprite('Attack2')
    player.velocity.x = 0
    player.lastDirection = 'right'
    player.shouldPanCameraToTheLeft({ canvas, camera })
  }
  else if (keys.l.pressed) {
    player.switchSprite('Attack3')
    player.velocity.x = 0
    player.lastDirection = 'right'
    player.shouldPanCameraToTheLeft({ canvas, camera })
  }
  else if (keys.ArrowRight.pressed) {
    player.switchSprite('Run')
    player.velocity.x = 2
    player.lastDirection = 'right'
    player.shouldPanCameraToTheLeft({ canvas, camera })
  }
  else if (keys.ArrowLeft.pressed) {
    player.switchSprite('RunLeft')
    player.velocity.x = -2
    player.lastDirection = 'left'
    player.shouldPanCameraToTheRight({ canvas, camera })
  }
  else if (player.velocity.y === 0) {
    if (player.lastDirection === 'right') player.switchSprite('Idle')
    else player.switchSprite('IdleLeft')
  } 

  if (player.velocity.y < 0) {
    player.shouldPanCameraDown({ camera, canvas })
    if (player.lastDirection === 'right') player.switchSprite('Jump')
    else player.switchSprite('JumpLeft')
  } else if (player.velocity.y > 0) {
    player.shouldPanCameraUp({ camera, canvas })
    if (player.lastDirection === 'right') player.switchSprite('Fall')
    else player.switchSprite('FallLeft')
  }

  if(player.position.x >= 1405 && player.position.y <= 200){
    winner()
  }

  c.restore()
}

animate()

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowRight':
      keys.ArrowRight.pressed = true
      break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = true
      break
    case 'ArrowUp':
    player.velocity.y = -4
      var audio = new Audio('./sounds/JumpGrunt1.wav');
      audio.play();
      // jump();     
      break
    case 'j':
      keys.j.pressed = true
      var audio = new Audio('./sounds/metal-hit.wav');
          audio.play();
      break
    case 'k':
      keys.k.pressed = true
      var audio = new Audio('./sounds/metal-hit.wav');
          audio.play();
      break
    case 'l':
      keys.l.pressed = true
      var audio = new Audio('./sounds/samurai-sword-impact.wav');
          audio.play();
      break
  }
})


window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'ArrowRight':
      keys.ArrowRight.pressed = false
      break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false
      break
    // case 'ArrowUp':
    //   keys.ArrowUp.pressed = false
    //   break
    case 'j':
      keys.j.pressed = false
      break
    case 'k':
      keys.k.pressed = false
      break
    case 'l':
      keys.l.pressed = false
      break              
  }
})
