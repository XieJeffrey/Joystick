cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.joystick = this.node.findChild('joystick').getComponent('joystick')
        this.box = this.node.findChild('box')
    },

    start() {
        this.joystick.register(this.touchMove.bind(this))
        this.moveSp = 200
    },

    touchMove(x, y) {
        this.box.x += this.moveSp * x * cc.director.getDeltaTime()
        this.box.y += this.moveSp * y * cc.director.getDeltaTime()
    },

    // update (dt) {},
});
