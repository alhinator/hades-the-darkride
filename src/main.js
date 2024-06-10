// aleghart

let config = {
    type:Phaser.CANVAS,
    width: 1080,
    height: 768,
    zoom: 0.9,
    render: { pixelArt: false },
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true
            debug: true
        }
    },
    scene: [RideScene]
}
let game = new Phaser.Game(config)


let { height, width } = game.config
