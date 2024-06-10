// rooms:  [q1, q2, q3, q4, boat, tar, asp, ely, styx, hades, mtn]
function q1Update(self) {
    //do we even need anything here
}

function boatUpdate(self, time, delta) {
    //["Boarding(1) Cycling(2) Dropping off(3)", "Transit(1) Boarding(2) Cycling(3)",
    //"Dropping off(1) Transit(2) & Boarding Guests(3)", "Cycling(1) Dropping off(2) Transit(3)"]

    //[600, 1200, 1200, 600]
    switch (self.currentStatus) {
        case "uninitialized":
            self.currentStatus = self.statusList[0]
            self.durationTillSwitch = self.durationList[0]
            self.b1 = 0
            self.b2 = 0
            self.b3 = 0
            break;
        case self.statusList[0]:
            if (self.b1 == 0 && self.scene.q1.currentGuests > 6) { //boarding
                self.b1 = 1
                self.addGuest(6)
                self.scene.q1.subGuest(6)
            }
            if (self.b2 == -1) { //cycling
                self.b2 = 0
            }
            if (self.b3 == 2) { //dropping
                self.subGuest(6)
                self.scene.q2.addGuest(6)
                self.b3 = -1
            }
            self.durationTillSwitch -= delta
            if (self.durationTillSwitch < 0) {
                self.currentStatus = self.statusList[1]
                self.durationTillSwitch = self.durationList[1]
            }
            break;
        case self.statusList[1]:
            if (self.b1 == 1) { //transit
                self.b1 = 2

            }
            if (self.b2 == 0 && self.scene.q1.currentGuests > 6) { //boarding
                self.b2 = 1
                self.addGuest(6)
                self.scene.q1.subGuest(6)
            }
            if (self.b3 == -1) { //cycling
                self.b3 = 0
            }
            self.durationTillSwitch -= delta
            if (self.durationTillSwitch < 0) {
                self.currentStatus = self.statusList[2]
                self.durationTillSwitch = self.durationList[2]
            }
            break;
        case self.statusList[2]:
            if (self.b1 == 2) { //dropping
                self.subGuest(6)
                self.scene.q2.addGuest(6)
                self.b1 = -1
            }
            if (self.b2 == 1) { //transit
                self.b2 = 2
            }
            if (self.b3 == 0 && self.scene.q1.currentGuests > 6) { //boarding
                self.b3 = 1
                self.addGuest(6)
                self.scene.q1.subGuest(6)
            }
            self.durationTillSwitch -= delta
            if (self.durationTillSwitch < 0) {
                self.currentStatus = self.statusList[3]
                self.durationTillSwitch = self.durationList[3]
            }
            break;
            case self.statusList[3]:
                if (self.b1 == -1) { //cycling
                    self.b1 = 0
                }
                if (self.b2 == 2) { //dropping
                    self.subGuest(6)
                    self.scene.q2.addGuest(6)
                    self.b2 = -1
                }
                if (self.b3 == 1) { //transit
                    self.b3 = 2
                }
                self.durationTillSwitch -= delta
                if (self.durationTillSwitch < 0) {
                    self.currentStatus = self.statusList[0]
                    self.durationTillSwitch = self.durationList[0]
                }
                break;


    }
}
function q2Update(self) {
    //don't need to do anything here 
}
function q3Update(self, time, delta) {
    //["Awaiting Sufficient Guests", "Guests Entering", "Speech Ongoing", "Guests Exiting"]
    //[-1, 800, 1200, 800]
    switch (self.currentStatus) {
        case "uninitialized":
            self.currentStatus = self.statusList[0]
            self.durationTillSwitch = self.durationList[0]
            break;
        case self.statusList[0]:
            if (self.scene.q2.currentGuests > 30 && self.scene.q4.currentGuests < 50) { //lock zag's room queue to less than 80.
                self.currentStatus = self.statusList[1]
                self.durationTillSwitch = self.durationList[1]

                self.scene.q2.subGuest(30)
                self.addGuest(30)
            }
            break;
        case self.statusList[1]:
            self.durationTillSwitch -= delta
            if (self.durationTillSwitch < 0) {
                self.currentStatus = self.statusList[2]
                self.durationTillSwitch = self.durationList[2]
            }
            break;
        case self.statusList[2]:
            self.durationTillSwitch -= delta
            if (self.durationTillSwitch < 0) {
                self.currentStatus = self.statusList[3]
                self.durationTillSwitch = self.durationList[3]
            }
        case self.statusList[3]:
            self.durationTillSwitch -= delta
            if (self.durationTillSwitch < 0) {
                self.currentStatus = self.statusList[0]
                self.durationTillSwitch = self.durationList[0]

                self.subGuest(30)
                self.scene.q4.addGuest(30)
            }
    }
}
function q4Update(self, time, delta) {
    //["Awaiting Carts/Guests", "Loading Guests", "Awaiting Empty Tartarus", "Launching"]
    //[-1, 600, -1, 300]
    switch (self.currentStatus) {
        case "uninitialized":
            self.currentStatus = self.statusList[0]
            self.durationTillSwitch = self.durationList[0]
            self.availableCarts = 24
            break;
        case self.statusList[0]:
            if (self.availableCarts > 6 && self.currentGuests > 12) {
                self.currentStatus = self.statusList[1]
                self.durationTillSwitch = self.durationList[1]
            }
            break;
        case self.statusList[1]:
            self.durationTillSwitch -= delta
            if (self.durationTillSwitch < 0) {
                self.currentStatus = self.statusList[2]
                self.durationTillSwitch = self.durationList[2]
            }
            break;
        case self.statusList[2]:
            if (self.scene.tar.currentGuests == 0) {
                self.currentStatus = self.statusList[3]
                self.durationTillSwitch = self.durationList[3]
            }
            break;
        case self.statusList[3]:
            self.durationTillSwitch -= delta
            if (self.durationTillSwitch < 0) {
                self.currentStatus = self.statusList[0]
                self.durationTillSwitch = self.durationList[0]
                self.subGuest(12)
                self.subCart(6)
                self.scene.tar.addGuest(12)
                self.scene.tar.addCart(6)
            }
            break;

    }

}
function tarUpdate(self, time, delta) {
    //["Stage 1", "Stage 2", "Stage 3", "Boss", "Elevator", "Awaiting Empty Asphodel"]
    switch (self.currentStatus) {
        case "uninitialized":
            self.currentStatus = self.statusList[0]
            self.durationTillSwitch = self.durationList[0]
            break;
        case self.statusList[0]:
            if (self.currentGuests > 0) {
                self.currentStatus = self.statusList[1]
                self.durationTillSwitch = self.durationList[1]
            }
            break;
        case self.statusList[1]:
            self.durationTillSwitch -= delta
            if (self.durationTillSwitch < 0) {
                self.currentStatus = self.statusList[2]
                self.durationTillSwitch = self.durationList[2]
            }
            break;
        case self.statusList[2]:
            self.durationTillSwitch -= delta
            if (self.durationTillSwitch < 0) {
                self.currentStatus = self.statusList[3]
                self.durationTillSwitch = self.durationList[3]
            }
            break;
        case self.statusList[3]:
            self.durationTillSwitch -= delta
            if (self.durationTillSwitch < 0) {
                self.currentStatus = self.statusList[4]
                self.durationTillSwitch = self.durationList[4]
            }
            break;
        case self.statusList[4]:
            self.durationTillSwitch -= delta
            if (self.durationTillSwitch < 0) {
                self.currentStatus = self.statusList[5]
                self.durationTillSwitch = self.durationList[5]
            }
            break;
        case self.statusList[5]:
            self.durationTillSwitch -= delta
            if (self.durationTillSwitch < 0) {
                self.currentStatus = self.statusList[6]
                self.durationTillSwitch = self.durationList[6]
            }
            break;
        case self.statusList[6]:
            if (self.scene.asp.currentGuests == 0) {
                self.currentStatus = self.statusList[0]
                self.durationTillSwitch = self.durationList[0]
                self.subGuest(12)
                self.subCart(6)
                self.scene.asp.addGuest(12)
                self.scene.asp.addCart(6)
            }
            break;
    }


}
function aspUpdate(self, time, delta) {
    switch (self.currentStatus) {
        case "uninitialized":
            self.currentStatus = self.statusList[0]
            self.durationTillSwitch = self.durationList[0]
            break;
        case self.statusList[0]:
            if (self.currentGuests > 0) {
                self.currentStatus = self.statusList[1]
                self.durationTillSwitch = self.durationList[1]
            }
            break;
        case self.statusList[1]:
            self.durationTillSwitch -= delta
            if (self.durationTillSwitch < 0) {
                self.currentStatus = self.statusList[2]
                self.durationTillSwitch = self.durationList[2]
            }
            break;
        case self.statusList[2]:
            self.durationTillSwitch -= delta
            if (self.durationTillSwitch < 0) {
                self.currentStatus = self.statusList[3]
                self.durationTillSwitch = self.durationList[3]
            }
            break;
        case self.statusList[3]:
            self.durationTillSwitch -= delta
            if (self.durationTillSwitch < 0) {
                self.currentStatus = self.statusList[4]
                self.durationTillSwitch = self.durationList[4]
            }
            break;
        case self.statusList[4]:
            self.durationTillSwitch -= delta
            if (self.durationTillSwitch < 0) {
                self.currentStatus = self.statusList[5]
                self.durationTillSwitch = self.durationList[5]
            }
            break;
        case self.statusList[5]:
            self.durationTillSwitch -= delta
            if (self.durationTillSwitch < 0) {
                self.currentStatus = self.statusList[6]
                self.durationTillSwitch = self.durationList[6]
            }
            break;
        case self.statusList[6]:
            if (self.scene.ely.currentGuests == 0) {
                self.currentStatus = self.statusList[0]
                self.durationTillSwitch = self.durationList[0]
                self.subGuest(12)
                self.subCart(6)
                self.scene.ely.addGuest(12)
                self.scene.ely.addCart(6)
            }
            break;
    }
}
function elyUpdate(self, time, delta) {
    switch (self.currentStatus) {
        case "uninitialized":
            self.currentStatus = self.statusList[0]
            self.durationTillSwitch = self.durationList[0]
            break;
        case self.statusList[0]:
            if (self.currentGuests > 0) {
                self.currentStatus = self.statusList[1]
                self.durationTillSwitch = self.durationList[1]
            }
            break;
        case self.statusList[1]:
            self.durationTillSwitch -= delta
            if (self.durationTillSwitch < 0) {
                self.currentStatus = self.statusList[2]
                self.durationTillSwitch = self.durationList[2]
            }
            break;
        case self.statusList[2]:
            self.durationTillSwitch -= delta
            if (self.durationTillSwitch < 0) {
                self.currentStatus = self.statusList[3]
                self.durationTillSwitch = self.durationList[3]
            }
            break;
        case self.statusList[3]:
            self.durationTillSwitch -= delta
            if (self.durationTillSwitch < 0) {
                self.currentStatus = self.statusList[4]
                self.durationTillSwitch = self.durationList[4]
            }
            break;
        case self.statusList[4]:
            self.durationTillSwitch -= delta
            if (self.durationTillSwitch < 0) {
                self.currentStatus = self.statusList[5]
                self.durationTillSwitch = self.durationList[5]
            }
            break;
        case self.statusList[5]:
            self.durationTillSwitch -= delta
            if (self.durationTillSwitch < 0) {
                self.currentStatus = self.statusList[6]
                self.durationTillSwitch = self.durationList[6]
            }
            break;
        case self.statusList[6]:
            if (self.scene.styx.currentGuests == 0) {
                self.currentStatus = self.statusList[0]
                self.durationTillSwitch = self.durationList[0]
                self.subGuest(12)
                self.subCart(6)
                self.scene.styx.addGuest(12)
                self.scene.styx.addCart(6)
            }
            break;
    }
}
function styxUpdate(self, time, delta) {
    switch (self.currentStatus) {
        case "uninitialized":
            self.currentStatus = self.statusList[0]
            self.durationTillSwitch = self.durationList[0]
            break;
        case self.statusList[0]:
            if (self.currentGuests > 0) {
                self.currentStatus = self.statusList[1]
                self.durationTillSwitch = self.durationList[1]
            }
            break;
        case self.statusList[1]:
            self.durationTillSwitch -= delta
            if (self.durationTillSwitch < 0) {
                self.currentStatus = self.statusList[2]
                self.durationTillSwitch = self.durationList[2]
            }
            break;
        case self.statusList[2]:
            if (self.scene.hades.currentGuests == 0) {
                self.currentStatus = self.statusList[0]
                self.durationTillSwitch = self.durationList[0]
                self.subGuest(12)
                self.subCart(6)
                self.scene.hades.addGuest(12)
                self.scene.hades.addCart(6)
            }
            break;
    }
}
function hadesUpdate(self, time, delta) {

}
function mtnUpdate(self, time, delta) {

}