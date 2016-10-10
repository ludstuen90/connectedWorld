# connectedWorld

This is an app designed to put old technology to work. If you have an old computer monitor around your house, this app is for you.

Rather than having the old monitor sit un-used in your basement, you can place it in a common area of the house,
 and have it run this app via a Rasberry Pi.

 Then, viola. You have a centralized information center for your home.

 No need to update a paper calendar. Along with other important information, this app provides a space
 where you can get up to date on the day's information before heading out the door.

When not being used, the monitor will display a clock. However, in addition to a calendar, it can also display photos, the weather outside, or other information.

For aesthetics, no keyboard or mouse is required to operate the app. Users tell the computer what information to display via
their smartphones. In other words, users smart phones become a sort of 'remote' through which to control this screen.

<b>How to use this app:</b>
-: Set the monitor (Rasberry Pi) you wish to use as a display to access the "/display" portion of this application. As you'll likely be connected via a wifi connection, you will need to locate the IP address of the NPM server. Point the browser to the Rasberry Pi's IP address, followed by the port number, followed by the page location. EG: http://10.0.0.213:3000/display

(Pro tip: For simplicity, you can set the Rasberry Pi to have a static IP address. This the IP address of the display will be the same each time. After this, you can program the Rasberry Pi to automatically load this 'display' page from start up)


-: Next, point the cell phone, tablet, or other mobile device you'll use as the "remote" to the base address. In the example above, this would be : http://10.0.0.213:3000/ Then, you can use the remote to change the display of your information center.
