This tool will allow users to keep track of locations. It should be mobile responsive with emphasis on speed, and ease of use. 

Any design elements should be open for commercial usage. 

We will be recreating something nearly identical to this: https://youtu.be/4fLpsRcDlMY   

The biggest change to that video is that our design will be mobile friendly.  

For the directional buttons, they should be placed at the bottom of the screen & the boxes should be above them. 

The boxes should scale to fit on the screen.  It is possible that hundreds of boxes will be placed on the grid. It should scale to have smaller boxes as more get added.  If more boxes are added than fit on the screen, users should be able to easily scroll around to see them all.  

There is no saved data on this.  If the page is reset or the 'reset" button is selected, the tool should go back to the default state.  

The default state will show arrows, and one box that represents the home box. This home box will always be visible and can not be removed or modified. This room should use a different design to make it stand out from the rest. 


When a user hits one of the directional buttons (for example up / north) a new box is added to the grid above the first one. This new box is considered the "current" box.   The current box should always have a heavy red border around it. 
 
If the user hits another button (for example right/east), a new box appears in that direction from the current box. 

The previous box loses it's red border and the new box gains the red border. 
 
If a user goes back to a previous box, the border follows them to there current selected box.  
 
So if a user is in the "home" box, and clicks up, down, up, here is what would happen. 
 
Step 1) On fresh screen, home box shows. User clicks up. 
 
Step 2) New box appears appears above home box with red border.  User clicks down. 
 
Step 3) No new boxes appear, red border is removed from the step 2 box. Red border appears on starter box (which is current room.)  User clicks up. 
 
Step 4) Box that was created in Step 2 has red border and red border is removed from home box. 
 
When rooms are "connected" there should be a line between those two boxes.  
 
So if a user clicks up, left, down, here is the process
 
Step 1) On fresh screen home box shows up with no other boxes. User clicks up.
 
Step 2) New box is created above home box, and there is a line attaching these two boxes. User clicks left. 
 
Step 3) New box is created to the left of the box created in step 2. These two boxes are connected. User clicks down. 
 
Step 4) New box is created below the box created in step 3. These boxes are connected. This box & the home box Do not have a connection since the user never connected them.  If the user clicked right while in this box, they lines would connect. 

 
In addition to the above, here are a few more functions that are needed. 
 
Holding down on one of the boxes deletes the box & all the lines connecting to that boxes. 
 
Tapping a box allows you to have a quick menu to change primary (background) color of the box to one of these colors, orange, green, yellow, white. 
 
small Button at the top to "reset" the entire grid back to default. 
 
Home Box can not be deleted, or changed. 