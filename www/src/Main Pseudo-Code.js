/**
Pseudo-code functions
*/

/* Variables:
MAX_VEHICLES - (based on grid size, ex. numOfRows +1)
numOfCurrentVehicles = 0;
numOfCrashes = 0;
money = 0; (it rolls over from previous level)
BOAT_SPEED = .5;
TRAIN_SPEED = 1;
PLANE_SPEED = 2;
SPAWN TIME;
Timer = (however many milliseconds the level is)
Repair_time (5 seconds or however long it takes a tile to repair itself)


*/

/*Level start
Get level number, decide on grid (3x3, 4x4, etc)
Get screen size, alter size of tiles based and select sprites for background and vehicles - 100x100, 200x200, 300x300

*/

/*Spawn rules
numOfVehicles ++;
time between spawn (based on level)
make sure one doesn't spawn in a cell with a vehicle already in it (or about to hit it)

No impossible moves
(vehicles may inevitably collide, but won't if the player can't afford to slow one down)
*/

/*
Next vehicle display (direction of travel == direction facing)
time until is spawns
*/

/*Crash
Vehicle crash into terrain
vehicle is kill
terrain becomes unusable
numberOfCrashes ++
numOfVehicles --;
*/

/*Leave Grid
When vehicle reaches end of grid, it disappears
numOfVehicles --;
*/

/*
fix terrain (either wait or pay for it to be fixed immediately)
wait time based on level - price to repair is fixed
*/

/*
scoring - money accumulation based on number of vehicles that exist per second
(optional - different amounts based on vehicle)
(optional - more or less based on difficulty)
*/

/*
speed up on swipe forward
minus money, vehicle speeds up
*/

/*
slow down on swipe backwards
minus money, vehicle slows
*/

/*
End of level
when timer==0, check:
if(numberOfCrashes <= (THRESHHOLD)){
    win;
}else{
    lose;
} 
*/

/*Touch:
If terrain is broken, fix it.
If terrain is not broken, change it
If terrain has a vehicle on it, do nothing.
If you touch "next vehicle" icon, it comes immediately.
*/

/*

*/
