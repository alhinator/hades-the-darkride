class Room {
    constructor(_scene, statuses = [], durations = [] ){
        this.scene = _scene
        this.statusList = statuses
        this.currentStatus = "uninitialized"
        this.durationList = durations
        this.durationTillSwitch = -1
        this.currentGuests = 0
        this.availableCarts = 0
        if (this.statusList.length != this.durationList.length){throw("statuses & durations not same length")}
    }

    addGuest(num = 1){
        this.currentGuests+=num
    }
    subGuest(num = 1){
        this.currentGuests-=num
    }
    addCart(num = 1){
        this.availableCarts+=num
    }
    subCart(num = 1){
        this.availableCarts-=num
    }

    update(){
        
    }
}