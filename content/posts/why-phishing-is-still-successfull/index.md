---
title : Why phishing is still successful?
url : why-phishing-is-still-successful/
summary : Almost all organisations spread awareness about phishing to their employees and customers but do they really help? Here is my opinion on why those prevention tips are not useful for people.
author: amt8u
date : 2021-03-29
draft : false
tags : ['hacking']
thumbnail : images/phishing-feature.jpeg
images : ['images/phishing-feature.jpeg']
---

Because technology is not easy. Average user doesn't know how websites work. Sometimes even developers can't recognize let alone the layman. Almost all big organizations publish phishing prevention tips and techniques quite frequently to their employess as well as customers but still [thousands of people get scammed daily](https://www.business-standard.com/article/news-ians/india-2nd-in-list-of-top-phishing-hosting-nations-report-119052300970_1.html). In this article I will take a deep dive into why I feel those tips are often not useful for the targeted audience. 

# Why advisory is of no help?
While in isolation all advises are correct but somehow they don't offer the required help average user should get. Here are a few general guidelines about phishing that people can follow to identify scams.

* Federal trade commission - https://www.consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams
* DSCI India - https://www.dsci.in/sites/default/files/DSCI_WFH_Advisory_for_Employees.pdf
Lets take a deep dive into FTC guidelines. Though this will hold true for most of the other tips from various sources.
* **Phishing emails and text messages may look like they’re from a company you know or trust**
If they look like they are from bank, how would a regular non-tech person would know if *"its looking like"* or is really a message from bank. Think from the point of view of such a person like your mom. If the mail says its from State Bank of India, for her, it is from the bank. She cannot make out the difference. Thus making this tip unhelpful for her.
* **Phishing emails and text messages often tell a story to trick you into clicking on a link or opening an attachment.**
* *say they’ve noticed some suspicious activity or log-in attempts* - Isn't this a genuine message. If you log in to your bank account on another device, you always get an email saying that there is some suspicious activity. If you haven't performed that action, you will need to take action quickly. How the user would know whether its really some genuine situation or not.
* *claim there’s a problem with your account or your payment information* - This again could be a genuine message. Almost all ecommerce sites do this. In fact Amazon even takes time and informs about your failed payments after half an hour of the failed payment while purchase. Again this is of no help.
* *say you must confirm some personal information* - Of course, every authentic site also needs you to confirm your personal information. For instance if you log in to your netbanking from a new browser, apart from username/password it also asks a security question. Isn't that confirming personal information?
* *include a fake invoice* - If you see, practically most of the time there is no way to verify the authenticity of invoices. If you get an invoice in the mail, how do you verify? On amazon you can probably login and checkout your orders, but what about orders places by others. What about bills generated offline? With some random numbers you can always create a good looking fake invoice.
* *want you to click on a link to make a payment* - This one is hilarious - Isn't that the whole purpose of internet online payment systems? Every purchase you do requires you to make some payment either by a button or a link sent to your mail. Sometimes the communication is asynchronous like buying an insurance policy. The link arrives later - maybe even after a day. So if some mail says that your payment is awaiting for your policy, you might believe it.
* *say you’re eligible to register for a government refund* - This one is slightly a good point. At least in India, there is no such scheme where you are offered a goverment refund via mail. At least I am not aware of.
* *offer a coupon for free stuff* - The whole ecommerce is based on coupons and free goodies. Every major company promotes their release with these kind of offers. Oneplus offered a free mobile phone if you participate in their pgrogram. Makemytrip offers like millions of coupons while booking flight tickets. ICICI bank offers various Dining delights and almost sends 3 mails a week.

Now lets compare the example they have put on their site with a snapshot of the authentic message from my own email.

| Phishing example                                         | Authentic email                                |
|----------------------------------------------------------|------------------------------------------------|
| ![ftc-phishing-example](images/ftc-phishing-example.png) | ![authentic-email](images/authentic-email.png) |

As a normal user, can you make out the difference. Probably not. Just see that all the points mentioned above are also applicable to the authentic message and not just the phishing one. While there is one difference that the fake message has a generic greeting like `Hi Dear`. But getting your name in the fake message is not that a big deal now a days. And also its quite common to have incorrect greetings in messages from various organizations. Many banks upgrade their systems and migrate your data to new data which sometimes converts the initials like Mr/Mrs to your first name. So again its not an easy task to ascertain whether its a fake message or not.

These are some other often put out tips

* **Don't open links which have strange characters**

Have you seen actual links to authentic sites. There is no such thing as strange characters. Every link you get now a days is appended with some identifier for analytics. The link can be as long as 200-300 characters with all kind of characters in it. Mostly those are random Ids to identify who clicked on the link. This advice also isn't much helpful now.

# What's the solution then?
To be honest there is no hard solution or guidelines that you can follow and it would be effective 100% of the time. But instead of unhelpful best practices I would present some practical steps that you can follow depending on your tech-savvy level. Below steps are in order of tech expertise from total novice to web developer.


* **Just don't click** - Never click on links you receive on email even if you get genuine mails. If you are not capable to distinguish phishing links, this is the best you can do. Obviously you will lose the convinience but that's the only way. Always goto someone trustworthy and let them decide for you whether its a good link or bad link.
* **Is it secure?** - Check for SSL certificate. If the URL starts with `http://` and not `https://`, there is a high chance that it could be a scam link. Since this is not followed rigorously by every organisation. There are many examples of big websites still working on non-secure URLs. The advice is that if the link is not secure, stop there and don't open it even if its an authentic link. Consult someone trustworthy first.
* **Prefer App** - If you can handle some tech, do not click on links from anywhere except apps. Specially the ones received on social media. If you receive any communication on email, just login to the app. If there is a payment awaited, the app will tell you the same and you can safely pay through. Just think of the email as one-sided communication. *Do not reply! Do not Click!* Get in touch with the company via some other medium like customer care or visit them personally.
* **URL Shortners** - URL shortners just make it plain difficult to know the genuineness of any URL. You can tell its a scam site only after opening the URL or using a tool to check the full URL from the short URL. Being very easy to put into SMSs, these are quite heavily used by various organisations for customer communication.
* **Inspect underlying link** - For all of those who know how links are constructed, the link is always in the background. What you see is text or image that incorporates the link. You can be fooled by showing the text as an authentic address while the underlying link is a scam website. Just for eg this link - [https://www.facebook.com](https://www.cybercafe.dev) will lead you to the homepage of this blog and not facebook. If you are on laptop or desktop, you can hover your mouse on the link and the browsers will show you the full underlying link on bottom left or bottom right. If you are on mobile, hover is not possible. What you can do is press and hold on the link and copy the link location. Open up any messaging app like whatsapp and paste the link there.
* **Whois query** - If you are still in doubt and the link seems authentic, you can copy the link and use a tool like [whois query](https://whois.domaintools.com) to get the ownership and registration details of the website. If the link is from reputed company, then mostly the details would be same for the company URL and the link that you received in the mail.
* **Ping** - Copy the link and do a ping request to get the IP Address of the site. Do a separate ping request with the proper link and see if the IP addresses networks match. Generally companies hosts all their sites on one subnet.
* **Analyse requests** - Still curious? You can open the link and further study about the site. But wait! Don't click on the link from mail. Copy the link and open up a new browser window, preferably in incognito mode. Open the dev tools of the browser by pressing F12 or Ctrl+Shift+I or right click -> Inspect. Check the `Preserve log` option before opening the link. Now enter the link and open the page. You can see in the `Network panel` all the requests that go through including the redirects if any. Generally scam sites will try to redirect you to another site which ultimately would be a phishing page.
* **Check homepage** - Remove everything from the URL except the domain and enter the URL. If its a genuine link, you would be redirected to the actual homepage of the website. Stressing again, that a homepage doesn't mean that the site is authentic. A properly developed phishing site can even fool IT engineers.
* **Analyse page contents** - All looks OK? If the site loads up fine with a proper domain and correct certificate, still it could be a scam site. Next step would be to analyse the contents of the page. At this step you would need to have advanced skills of web development. Checkout if all the `<head>` tags are present with relevant info like metadata. Generally all public facing websites will have good amount of metadata present in header. Also check if other links on the page are genuine by identifying the `<a>` tags.

# What if I find one?
If at all you are able to identify the link to be a phishing site, there is one thing that you can do - Ignore!.

There is pretty much nothing else you can do. Being a responsible user, you may communicate this with the organisation that the site is faking. It all depends on the organisation how they take your input. Once you mail them, the response will be generic and they will repeat the same unhelpful set of advices.

# Anything that companies can do?

Instead of giving advise to ignore suspicious links, companies can add more information like below to help people educate

* **Email header** - Educate people about the email headers. Especially the from field. Every email scam comes from outsite the organization. People should be able to identify the actual email address and not the name which is almost all the time something other than what the address says.
* **Consistent communication** - Companies should send communication from single email address and be consistent about it. If there is a change, let the customers know with multiple communications that the address has changed.
* **Links** - Explain customers how a link is created. The link should end up in particular domain like *****.facebook.com. Educate them what is domain, subdomain, path and url params.
* **Examples** - I see that many organizations try their best to spread awareness about phishing, but with generic guidelines, there should be some examples too. Maybe a quick quiz with not so obvious answers?

These were a few points I wanted to put out. Take these as more of an opinion. I will update some points if required.

> End


