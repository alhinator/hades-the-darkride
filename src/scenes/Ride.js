const titleStyle = {
    fontFamily: 'sans-serif',
    fontSize: 20,
    fontWeight: 200,
    fontStyle: "normal",
    color: "#FFFFFF",
}

const buttStyle = {
    fontFamily: 'sans-serif',
    fontSize: 20,
    fontWeight: 200,
    fontStyle: "normal",
    color: "#FFFFFF",
    backgroundColor: "#FF0000"
}

class RideScene extends Phaser.Scene {
    constructor() {
        super('RideScene')
    }

    create() {
        this.totalGuests = 0


        //first, add all rooms and their corresponding labels.
        //set each room's update function here, as well. they are listed in other files.
        this.q1 = new Room(this) //does not have statuses
        this.q1Label = this.add.text(this.sys.canvas.width / 4, 20, "fields queue\n" + this.q1.currentGuests, titleStyle)
        this.q1.update = q1Update

        //charon's boat
        this.boat = new Room(this, ["Boarding(1) Cycling(2) Dropping off(3)", "Transit(1) Boarding(2) Cycling(3)", "Dropping off(1) Transit(2) & Boarding(3)", "Cycling(1) Dropping off(2) Transit(3)"], [900, 900, 900, 900])
        this.boatLabel = this.add.text(this.sys.canvas.width *2/5, 20, "charon's boat\n" + this.boat.currentStatus + "\nguests:" + this.boat.currentGuests, titleStyle)
        this.boat.update = boatUpdate

        //house of hades queue
        this.q2 = new Room(this)
        this.q2Label = this.add.text(this.sys.canvas.width * 3 / 4, 20, "house of hades queue\n" + this.q2.currentGuests, titleStyle)
        this.q2.update = q2Update

        //hades audience
        this.q3 = new Room(this, ["Awaiting Sufficient Guests", "Guests Entering", "Speech Ongoing", "Guests Exiting"], [-1, 800, 1200, 800])
        this.q3Label = this.add.text(this.sys.canvas.width / 4, 120, "hades' audience status", titleStyle)
        this.q3.update = q3Update

        //zag's room queue
        this.q4 = new Room(this, ["Awaiting Carts/Guests", "Loading Guests", "Awaiting Empty Tartarus", "Launching"], [-1, 600, -1, 300])
        this.q4Label = this.add.text(this.sys.canvas.width / 2, 120, "zag's room queue\nguests:" + 0 + "\navail carts:" + 0, titleStyle)
        this.q4.update = q4Update

        //tartarus
        this.tar = new Room(this, ["Awaiting Carts/Guests","Stage 1", "Stage 2", "Stage 3", "Boss", "Elevator", "Awaiting Empty Asphodel"], [-1, 300, 300, 300, 450, 150, -1])
        this.tarLabel = this.add.text(this.sys.canvas.width / 4, 300, "tartarus ", titleStyle)
        this.tar.update = tarUpdate
        
        //asphodel
        this.asp = new Room(this, ["Awaiting Carts/Guests","Stage 1", "Stage 2", "Stage 3", "Boss", "Elevator", "Awaiting Empty Elysium"], [-1, 300, 300, 300, 450, 150, -1])
        this.aspLabel = this.add.text(this.sys.canvas.width / 2, 300, "asphodel ", titleStyle)
        this.asp.update = aspUpdate

        //elysium
        this.ely = new Room(this, ["Awaiting Carts/Guests","Stage 1", "Stage 2", "Stage 3", "Boss", "Elevator", "Awaiting Empty Styx"], [-1, 300, 300, 300, 450, 150, -1])
        this.elyLabel = this.add.text(this.sys.canvas.width * 3 / 4, 300, "elysium ", titleStyle)
        this.ely.update = elyUpdate

        //styx
        this.styx = new Room(this, ["Awaiting Carts/Guests","Tunnels", "Awaiting Empty Hades"], [-1, 300, -1])
        this.styxLabel = this.add.text(this.sys.canvas.width / 4, 420, "styx status", titleStyle)
        this.styx.update = styxUpdate

        //hades
        this.hades = new Room(this, ["Awaiting Carts/Guests","Opening Inner Doors", "Boss", "Opening Outer Doors", "Closing Outer Doors"], [-1, 100, 450, 100, 100])
        this.hadesLabel = this.add.text(this.sys.canvas.width / 2, 420, "hades status", titleStyle)
        this.hades.update = hadesUpdate

        //outdoor/disembark
        this.mtn = new Room(this, ["Awaiting Carts/Guests","Disembarking", "Returning Carts"], [-1, 600, 200])
        this.mtnLabel = this.add.text(this.sys.canvas.width *3/4, 420, "outdoor status", titleStyle)
        this.mtn.update = mtnUpdate


        this.totalGuestsLabel = this.add.text(0, 20, "total guests: " + this.totalGuests, titleStyle)
        this.allRooms = [this.q1, this.q2, this.q3, this.q4, this.boat, this.tar, this.asp, this.ely, this.styx, this.hades, this.mtn]

        this.addGuestsB = this.add.text(0, 50, "Add guest to queue", buttStyle)
        this.addGuestsB.setInteractive()
        this.addGuestsB.on("pointerdown", () => {
            this.q1.addGuest()
        }, this)
        this.addGuestsB = this.add.text(0, 80, "Add guest(50) to queue", buttStyle)
        this.addGuestsB.setInteractive()
        this.addGuestsB.on("pointerdown", () => {
            this.q1.addGuest(50)
        }, this)



    }
    update(time, delta) {
        //loop thru the update cycles of all rooms.
        this.allRooms.forEach(element=>{
            element.update(element, time, delta)
        })

        let tmp = 0
        this.allRooms.forEach(element => {
            tmp += element.currentGuests
        });
        this.totalGuests = tmp
        this.totalGuestsLabel.text = "total guests: " + this.totalGuests

        this.q1Label.text = "fields queue\n" + this.q1.currentGuests
        this.boatLabel.text = "charon's boat status\n" + this.boat.currentStatus + "\nguests:" + this.boat.currentGuests
        this.q2Label.text = "house of hades queue\n" + this.q2.currentGuests
        this.q3Label.text = "hades' audience status\n" + this.q3.currentStatus + "\nguests:" + this.q3.currentGuests
        this.q4Label.text = "zag's room queue\n"+this.q4.currentStatus+ "\nguests:" + this.q4.currentGuests + "\navail carts:" + this.q4.availableCarts
        this.tarLabel.text = "tartarus status\n"+this.tar.currentStatus+ "\nguests:" + this.tar.currentGuests + "\navail carts:" + this.tar.availableCarts
        this.aspLabel.text = "asphodel status\n"+this.asp.currentStatus+ "\nguests:" + this.asp.currentGuests + "\navail carts:" + this.asp.availableCarts
        this.elyLabel.text = "elysium status\n"+this.ely.currentStatus+ "\nguests:" + this.ely.currentGuests + "\navail carts:" + this.ely.availableCarts
        this.styxLabel.text = "styx status\n"+this.styx.currentStatus+ "\nguests:" + this.styx.currentGuests + "\navail carts:" + this.styx.availableCarts
        this.hadesLabel.text = "hades status\n"+this.hades.currentStatus+ "\nguests:" + this.hades.currentGuests + "\navail carts:" + this.hades.availableCarts
        this.mtnLabel.text = "mtn/outdoor status\n"+this.mtn.currentStatus+ "\nguests:" + this.mtn.currentGuests + "\navail carts:" + this.mtn.availableCarts

    }
}