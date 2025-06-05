const config = {
  type: Phaser.AUTO,
  width: 256,
  height: 244,
  backgroundColor: "#049cd8",
  parent: "game",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: {
    preload,
    create,
    update,
  },
};

new Phaser.Game(config);

function preload() {
  this.load.image("cloud1", "assets/scenery/overworld/cloud1.png");

  this.load.spritesheet("mario", "assets/entities/mario.png", {
    frameWidth: 18,
    frameHeight: 16,
  });

  this.load.image("floorbricks", "assets/scenery/overworld/floorbricks.png");
}

function create() {
  this.add.image(100, 50, "cloud1").setOrigin(0, 0).setScale(0.15);

  this.mario = this.physics.add
    .sprite(50, 200, "mario")
    .setOrigin(0, 1)
    .setCollideWorldBounds(true)
    .setGravityY(550);

  this.floor = this.physics.add.staticGroup();
  this.floor
    .create(128, config.height - 16, "floorbricks")
    .setScale(1)
    .refreshBody();

  this.physics.add.collider(this.mario, this.floor);

  this.keys = this.input.keyboard.createCursorKeys();

  this.anims.create({
    key: "marioWalk",
    frames: this.anims.generateFrameNumbers("mario", { start: 1, end: 3 }),
    frameRate: 12,
    repeat: -1,
  });

  this.anims.create({
    key: "marioIdle",
    frames: [{ key: "mario", frame: 0 }],
    frameRate: 20,
  });
}

function update() {
  if (this.keys.left.isDown) {
    this.mario.setVelocityX(-160);
    this.mario.anims.play("marioWalk", true);
    this.mario.flipX = true;
  } else if (this.keys.right.isDown) {
    this.mario.setVelocityX(160);
    this.mario.anims.play("marioWalk", true);
    this.mario.flipX = false;
  } else {
    this.mario.setVelocityX(0);
    this.mario.anims.play("marioIdle", true);
  }

  if (this.keys.up.isDown && this.mario.body.touching.down) {
    this.mario.setVelocityY(-330);
  }
}
