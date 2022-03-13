# Excerpt
Complete guide to using AMD eyefinity multimonitor setup

# Really complete?
Well, not literally a *complete* guide, but some useful information that may help people who are trying to configure AMD eyefinity desktop with multiple monitors.

Officially there is very less information, and searching on internet gives you bits and pieces which is totally fine as not everyone has all kinds of monitors.

# Eyefinity is not that worth?
Well, it totally depends on the use case and available hardware, but yes configuring eyefinity is a challenge and requires a lot of setup before you can really make use of it. If you ask me, it seems that eyefinity is best suited for sim games like Dirt Rally, WRC. Yes, you can enable eyefinity and play any game that supports wide resolution like GTA5, but it will take a toll on your Graphics card and to support the eyefinity resolutions, you might have to compromise graphics quality which I believe is why we play GTA right?

For work eyefinity does not make any sense. In fact its better to have multiple independent monitors. Its easier to move, maximise and restore windows.

# Everyone uses multi monitors now a days, why is it so difficult then?
People have been using multi monitors for more than two decades and now a days, almost all offices have multi monitors for their employees to work. The setup is quite easy. You just need to plugin with the supported port and the system recognizes it automatically. You go to the display settings section and just rearrange based on the physical layout and you are done. 

In this kind of setup, every monitor runs at different resolution and probably at different scaling which allows you to utilize the monitors to its fullest, like 27 inch 4k with 150% and 24 inch 1080 with 100%. You get almost similar fonts with the 4k being more cripier. 

But when it comes to eyefinity, you don't have the option to configure monitors individually and of course any scaling will be applied on the full virtual monitor that the graphics card simulates. Because of this, you can only use eyefinity with native resolutions. And thats the reason why you can't use the below setup which seems feasible but is not.

* 24 inch 1080p
* 24 inch 4k
* 24 inch 1080p

The above setup will create a virtual monitor with empty space on the 4k one assuming you selected fit in the settings(more on that later). If you select `expand` then the image will cutoff from the other side monitors. We'll see in later sections what I mean here exactly.

# What about same models?
The ideal condition would be to have 3 identical monitors. You will not get any stretching, cutoff issues and all will work seamlessly. You might need to rearrange them based on their physical location on the desk.

But there is stil one small issue with this ideal setup - == Bezels ==. Whatever the manufacturer advertises, bezels are not going anywhere. For a straight line you may not notice, but with 3d graphics and tilted lines, you will notice that the lines are not aligned properly. And when bezels are big(in case you are using cheap monitors :-P), this distortion feels apparent and distracts when you are gaming.

To overcome this, AMD has provided an utility for `bezel correction`. But somehow they are not proud of this and have hidden it from the main menu. You have to manually open the AMD install folder and open `eyefinitypro.exe`. There are some options available like the layout method, offsets and re arrangement. 

* Layout - Quickly switch to a different layout like 1x3 to 3x1 etc.
* Orientation - You can select displays indepently in potrait or landscape mode. This is useful when you want to create eyefinity desktop with side monitors as potrait coz their horizontal resolution matches your center's vertical resolution. But be aware, it may not work for you(More on that later too).
* 

Yes Radeon has one click *Quick setup* button, but its not really what you want.

