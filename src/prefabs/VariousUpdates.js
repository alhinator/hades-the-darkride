// rooms:  [q1, q2, q3, q4, boat, tar, asp, ely, styx, hades, mtn]
function q1Update(self) {
    //do we even need anything here
}

function boatUpdate(self, time, delta) {
    //["Boarding guests (1) & Cycling boat (2)", "In Transit (1) & Boarding Guests (2)",
    //"Dropping off Guests (1) & In Transit (2)", "Boat cycling (1) Dropping off Guests (2)"]

    //[600, 1200, 1200, 600]
    switch (self.currentStatus) {
        case "uninitialized":
            self.currentStatus = self.statusList[0]
            self.durationTillSwitch = self.durationList[0]
            break;
        case self.statusList[0]:
            if (self.scene.q1.currentGuests >= 6 && self.currentGuests < 6 && self.scene.q2.currentGuests < 50) { //don't accept more quests if house of hades has full guests
                self.scene.q1.subGuest(6)
                self.addGuest(6)
            }
            if (self.currentGuests > 0) { self.durationTillSwitch -= delta }
            if (self.durationTillSwitch <= 0) { self.currentStatus = self.statusList[1]; self.durationTillSwitch = self.durationList[1] }
            break;
        case self.statusList[1]:
            if (self.scene.q1.currentGuests >= 6 && self.currentGuests < 12) {
                self.scene.q1.subGuest(6)
                self.addGuest(6)
            }
            if (self.currentGuests > 0) { self.durationTillSwitch -= delta }
            if (self.durationTillSwitch <= 0) { self.currentStatus = self.statusList[2]; self.durationTillSwitch = self.durationList[2] }
            break;
        case self.statusList[2]:
            if (self.currentGuests > 0) { self.durationTillSwitch -= delta }
            if (self.durationTillSwitch <= 0) {
                self.currentStatus = self.statusList[3]; self.durationTillSwitch = self.durationList[3]
                self.subGuest(6)
                self.scene.q2.addGuest(6)
            }
            break;
        case self.statusList[3]:
            if (self.currentGuests > 0) { self.durationTillSwitch -= delta }
            if (self.durationTillSwitch <= 0) {
                self.currentStatus = self.statusList[0]; self.durationTillSwitch = self.durationList[0]
                self.subGuest(6)
                self.scene.q2.addGuest(6)
            }
            break;

    }
}
function q2Update(self) {
    //don't need to do anything here 
}
function q3Update(self, time , delta) {
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
function q4Update(self) {
    //["Awaiting Carts/Guests", "Loading Guests", "Awaiting Empty Tartarus", "Launching"]
    //[-1, 600, -1, 300]
    switch (self.currentStatus) {
        case "uninitialized":
            self.currentStatus = self.statusList[0]
            self.durationTillSwitch = self.durationList[0]
            self.availableCarts = 24
            break;
        case self.statusList[0]:
            if(self.availableCarts > 6 && self.currentGuests > 12) {
                self.currentStatus = self.statusList[1]
                self.durationTillSwitch = self.durationList[1]
            }
            break;
    }

}
function tarUpdate(self) {

}
function aspUpdate(self) {

}
function elyUpdate(self) {

}
function styxUpdate(self) {

}
function hadesUpdate(self) {

}
function mtnUpdate(self) {

}