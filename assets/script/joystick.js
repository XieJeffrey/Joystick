var util = require('./util')

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.joystickBg = this.node.findChild("joystickBg")
        this.joystick = this.joystickBg.findChild("center")

        this.joystickBg.on('touchstart', this.onTouchStart, this)
        this.joystickBg.on('touchmove', this.onTouchMove, this)
        this.joystickBg.on('touchcancel', this.onTouchEnd, this)
        this.joystickBg.on('touchend', this.onTouchEnd, this)
        let offset = 20
        this.limit_x = this.joystickBg.width / 2 - offset
        this.limit_y = this.joystickBg.height / 2 - offset
        this.delta_x = 0
        this.delta_y = 0
    },

    register(func) {
        this.callback = func
    },

    start() {

    },

    update(dt) {
        if (this.isPress) {
            //#region 摇杆回调
            if (this.callback) {
                this.callback(this.delta_x, this.delta_y)
            }
            //#endregion
        }
    },

    onTouchStart(event) {
        this.joystick.stopAllActions()
        this.joystick.x = 0
        this.joystick.y = 0
        this.isPress = true
    },


    onTouchMove(event) {
        let delta = event.touch.getDelta()
        this.joystick.x += delta.x
        this.joystick.y += delta.y
        if (Math.abs(this.joystick.x) > this.limit_x) {
            if (this.joystick.x > 0)
                this.joystick.x = this.limit_x
            if (this.joystick.x < 0)
                this.joystick.x = -this.limit_x
        }

        if (Math.abs(this.joystick.y) > this.limit_y) {
            if (this.joystick.y > 0)
                this.joystick.y = this.limit_y
            if (this.joystick.y < 0)
                this.joystick.y = -this.limit_y
        }

        let distance = Math.sqrt(this.joystick.x * this.joystick.x + this.joystick.y * this.joystick.y)
        if (distance >= this.limit_x) {
            let radio = this.limit_x / distance
            this.joystick.x = this.joystick.x * radio
            this.joystick.y = this.joystick.y * radio
        }

        let radio = 1 / distance
        this.delta_x = this.joystick.x * radio
        this.delta_y = this.joystick.y * radio
    },

    onTouchEnd(event) {
        this.joystick.x = 0
        this.joystick.y = 0
        this.delta_x = 0
        this.delta_y = 0
        this.isPress = false
    }

    // update (dt) {},
});
