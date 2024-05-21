---
title : Understanding ISO in digital photography
url : understanding-iso-in-digital-photography/
summary : Have you ever wondered what exactly changes when you modify the ISO setting in a digital camera?
author: amt8u
date : 2021-01-23
draft : false
tags : ['photography']
thumbnail : images/how-iso-works-feature.jpg
---

I don't own a DSLR and still learning about very basics of photography. Just out of curiosity wanted to understand what it means actually to change the ISO setting in the camera. According to every beginners article on digital photography, changing ISO means changing the sensitivity of the camera sensor which effectively means changing the amount of light captured by the sensor. Though I am not an Electronics engineer, but I did study about how light is converted into voltages which ultimately is processed as rgb values and stored somewhere with/without compression.

# The question
I understand that the captured light information is dependent on the lens size aka `aperture` and the `shutter` speed of the lens. But going by the fact that ISO modifies the sensitivity of the sensor, it would be safe to assume that it also contributes to the amount of light captured by the sensor.

* Aperture is controlled by altering the size of the opening.
* Shutter speed is controlled by changing the speed of the shutter. So basically both these things are mechanical. 

My question is what happens when I change the ISO setting on the camera? This [post](https://photo.stackexchange.com/questions/2946/how-is-iso-implemented-in-digital-cameras) pretty much sums up what I want to know.

# Searching for answer
With help from the stackoverflow question, I had some pointers on which I can start my search.

Needless to say, there are not many helpful [articles](https://www.easybasicphotography.com/what-is-iso.html) which may provide a direct answer. Most of the articles just end up saying - ISO changes sensitivity but not answering *how*. Maybe its because they just assume that somehow its a part of the camera as a package and nobody needs to know. In the abstraction world, its true but I wanted to dig into the abstraction.

# Answer
After searching and reading about ISO for hours, I finally tumbled upon one [article](https://clarkvision.com/articles/iso/) which in my opinion is by far the most informative till now. I haven't yet understood everything but I think I got a preliminary answer to my question.

> Digital sensors don't change sensitivity

Contradictory to my belief, there is so such thing as intensity for digital sensors. They have just one intensity which as we call - on/off. Light captured by the sensor is converted to digital values(rgb) using an `ADC(Analog to Digital converter)`. ADC itself is a big subject in Electronics engineering which require you to understand various mathematical transformations and approximations.

It turns out that ISO is just the gain applied to this transformation. Now you would ask, isn't applying gain would mean changing the sensitivity? The gain is applied to the light already captured by the sensor which means that ISO does not change the amount of light the sensor captures. It just amplifies the signal that we get after processing the captured light.

# More ISO = more noise?
A typical argument given to support the fact that ISO changes sensitivity is - On increasing the ISO, you get more noise in the picture. At first it seems a perfect fit, but then reading on about the reason behind it makes it clear that ISO is nothing but a signal gain.

Apparently in most cameras not everything is manual by default. Even in Manual/Pro mode, the software is designed in such a way so that it compensates other things like shutter speed to maintain a good exposure. So if you increase the ISO, the amount of light captured is still the same, but the signal will be amplified. And due to a lower shutter speed, the amount of light that sensor receives is now less which produces noise. And with amplification the noise also gets amplified there by giving us an illusion that the noise is because of high ISO.

If you keep shutter speed and aperture constant and just increase the ISO, the light captured will be same, but you will get a picture with amplified values which in turn would make it over exposed.

I read all the top articles(as per DuckDuckGo) on ISO. It looks like not many people are aware of how it works. Many of them try to co relate it to the analog camera's film sensitivity which is altogether a different thing. Here are some sources that missed the point and can be misleading

* https://digital-photography-school.com/iso-settings/ - Explains about film ISO, but totallly misses the point for digital photography. Infact the first [comment](http://disq.us/p/2d8nlvi) itself feels more informative than the article itself
* https://www.digitalcameraworld.com/au/tutorials/camera-iso-settings-take-control-of-your-exposures-in-low-light - Looks a professional site, still no information on how ISO is implemented.
* https://www.lmscope.com/en/Digital_Camera_Sensitivity_ISO_en.html - Just touches about amplifier gain, but somehow it feels that that section was added later on.
* https://shuttermuse.com/what-is-iso-in-photography/ - Says that on doubling the ISO, the amount of captured light also doubles
* https://www.easybasicphotography.com/what-is-iso.html - Says ISO changes sensors ability to read and gather light

And last but not the least, an article straight from the manufacturer site
* https://www.nikonusa.com/en/learn-and-explore/a/tips-and-techniques/understanding-iso-sensitivity.html - Totally non informative of how ISO works and makes an incorrect analogy with analog film grain.

# Follow up questions
After understanding the mechanism its clear how ISO works. But it raises more questions now

* Why its called ISO?
* What do the numbers suffixed with ISO - 100, 200 etc mean?
* If ISO is just signal amplification, is it part of the camera or its up to the device using the camera to implement the gain or is this setting exposed as a parameter to the device from the camera.


# ISO for film speed
Remember the cameras in which you had to change the film roll. In analog photography, besides aperture and shutter speed, film also had a characteristic called *speed* which determined how much light it can capture.

[ISO](https://www.iso.org/home.html) is the organization which fixed the standard for film speed. Unfortunately the standard is [not free to read](https://www.iso.org/standard/11948.html) but [wikipedia](https://en.m.wikipedia.org/wiki/Film_speed#ISO) page has enough information. The standard for film speed is `ISO 5800:2001`. Every standard has a number associated with it. In fact every thing related to photography has been standardized by them if you look [here](https://en.m.wikipedia.org/wiki/Film_speed#ISO). Calling one of the aspect of photography as ISO is so misleading. And if you really want to use ISO, use it with the number like we have for dates - [ISO-8601](https://www.iso.org/iso-8601-date-and-time-format.html). Before reading all this I literally thought that in digital cameras ISO would be mean something like Input Signal Optimizer:-P

The standard for digital photography is here - [`ISO 12232:2019`](https://webstore.ansi.org/Standards/ISO/ISO122322019). It also requires a payment($110) if you want to read it. Otherwise you can refer the [wiki](https://en.m.wikipedia.org/wiki/Film_speed#Digital_camera_ISO_speed_and_exposure_index) page for basic idea.

Here is an excerpt from it

> For digital photo cameras ("digital still cameras"), an exposure index (EI) rating—commonly called ISO setting—is specified by the manufacturer such that the sRGB image files produced by the camera will have a lightness similar to what would be obtained with film of the same EI rating at the same exposure. The usual design is that the camera's parameters for interpreting the sensor data values into sRGB values are fixed, and a number of different EI choices are accommodated by varying the sensor's signal gain in the analog realm, prior to conversion to digital.



# My opinion
To sum up you can say ISO is nothing but a gimmick. You can always process the data after capturing light by software. Its another thing where you would want this processing to be done - In the camera's electronics or outside camera.

The take away is, instead of saying ISO this setting should have been called `Gain` or `Amplification` which would have resolved all the confusion. 

# Pending questions
Although I have understood the very basics of ISO, but I still don't have information of where the amplification is done. No article or answer had cited credible sources where I can read more about it. Some links are too old, some are broken.

If ISO is just gain, we could capture the image as raw and probably apply the gain while post processing in photoshop etc. effectively changing the ISO number in the exif details of the photo?

In analog photography ISO numbers meant something, but in digital it has no meaning, so can we altogether get rid of the numbers and just say `Gain` with values from `0` to `100`? Will it work?

In fact it seems you [can't even rely on the manufacturer](https://www.sony.net/SonyInfo/News/Press/201807/18-060E/) too for truth now.

Lets hope I find something in future.

**Update 27 jan 2021**
[Here is another great video](https://youtu.be/WEApLA-YNko) by Bylan Bennet covering exactly what ISO is. I would also recommed checking out his other photography videos.

> End