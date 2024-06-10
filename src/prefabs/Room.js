class Room {
    constructor(_scene, statuses = [], durations = [] ){
        this.scene = _scene
        this.statusList = statuses
        this.currentStatus = "uninitialized"
        this.durationList = durations
        this.durationTillSwitch = -1
        this.currentGuests = 0
        if (this.statusList.length != this.durationList.length){throw("statuses & durations not same length")}
    }

    addGuest(num = 1){
        this.currentGuests+=num
    }
    subGuest(num = 1){
        this.currentGuests-=num
    }

    update(){
        
    }
}