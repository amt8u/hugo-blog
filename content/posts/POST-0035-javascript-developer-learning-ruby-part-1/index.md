---
title : Javascript developer learning Ruby part-1
url : javascript-developer-learning-ruby-part-1
summary : A Javascript developer learning ruby from scratch. In this article I will try to understand ruby and compare its features from a JS developer's perspective.
author: amt8u
date: '2020-11-17T12:44:57.000Z'
lastmod: '2020-11-17T12:54:13.000Z'
draft : false
tags : ['ruby']
thumbnail : images/ruby-feature.jpg
images : ['images/ruby-feature.jpg']
---

# The need

Just browsing various software engineer roles around the globe, I often encountered ruby on rails requirements. I have experience in java based backends like REST apis, servlets etc. But never got a chance to work on ruby.

First question that popped up in my mind was - What is ruby exactly? Is it a framework or a language? And how does it work with the web? I had no idea. To get  answers to those questions I had to dive into!

# Getting started
On searching in DuckDuckGo, the first result is of course the official rubyonrails project. But somehow I feel official project pages are not honest and do not present what they actually do. Instead it involves marketting and jargon terms. I tend to look at other results where I can find some opinion from different people.

As expected the official page just presented me an abstract definition which doesn't serve much purpose.

From the [definition](https://en.wikipedia.org/wiki/Ruby_on_Rails) I understand that **rubyonrails** is a framework for building web apps.

> Ruby on Rails, or Rails, is a server-side web application framework written in Ruby

And **Ruby** is the language.

# Why Ruby? and Rails?
Now that I know ruby is the language, and rails is the framework, the second question is - What they offer which java, .NET or for the matter, any other framework is not giving.

Tried a few articles which might answer the question

* [Monterail.com](https://www.monterail.com/blog/why-ruby-on-rails-development-2020) - Gave a historical background and updates about the language, but didn't give any insight as to why should I use Ruby instead of Java etc.

* [CareerKarma](https://careerkarma.com/blog/why-learn-ruby-on-rails/) - Another pointless article with abstract qualities. Just replace 'ruby' with any other technology and the whole article will still be valid. In fact it goes on to say that Javascript needs semicolons to end statements while ruby doesn't.

* [RubyGuides](https://www.rubyguides.com/2018/10/what-is-ruby-on-rails/) - Somewhat better than others. It seemed like the focus of the article was to motivate people to learn ruby and rails. I still don't have my answer.

* [Plesk.com](https://www.plesk.com/blog/various/ruby-rails-vs-php/) - Another article which focuses on the maturity and popularity of the language. Looks like the author doesn't have much experience in any and just for the sake of it have written the post. 

Looking at some of the articles, it was getting difficult to find an answer for my question. Being an experienced developer, I guess the best option would be to get my hands dirty. 

<hr>

# Installing ruby
It turns out that its not as easy as downloading an installer for Mac. But apparently somehow ruby was already installed on my system. Probably I might have installed it while trying out something else in the past.

# Ruby in 20 minutes
From the official ruby page I ended up in an [article](https://www.ruby-lang.org/en/documentation/quickstart/). This guide starts with the ruby interactive shell **irb**.

As asked, I wrote the first program using irb prompt

```ruby
puts "Kya bolta hai"
```

The output was 
```
irb(main):003:0> puts "Kya bolta hai"
Kya bolta hai
=> nil
irb(main):004:0> 
```

The `puts` statement outputs the string given as argument while the result of the expression itself is `nil`. Looks like `nil` is similar to what we have `undefined` in javascript. The default value returned from a function is always `undefined` in javascript.

`irb` could be used in a similar fashion like we use the devtools console for javascript. It provides an environment where you could directly run expressions.

# Functions
We have functions in javascript, while ruby has methods and are declared in a little different way

```ruby
irb(main):014:0> def f1
irb(main):015:1> a = 56
irb(main):016:1> b = 2
irb(main):017:1> c = a + b
irb(main):018:1> puts "You are" + c + "years old"
irb(main):019:1> end
=> :f1
```

To my surprise, this resulted in error clearly mentioning *no implicit conversion*
```
irb(main):020:0> f1()
Traceback (most recent call last):
        6: from /usr/bin/irb:23:in `<main>'
        5: from /usr/bin/irb:23:in `load'
        4: from /Library/Ruby/Gems/2.6.0/gems/irb-1.0.0/exe/irb:11:in `<top (required)>'
        3: from (irb):20
        2: from (irb):18:in `f1'
        1: from (irb):18:in `+'
TypeError (no implicit conversion of Integer into String)
irb(main):021:0> f1
```

Also noticed one thing, you can run functions without the parenthesis if you are not passing any parameters

* **Reading arguments**
You can read the arguments and interpolate the string using `#{}` syntax. This looks like the *ES6 template literals* feature in JS.
```
irb(main):022:0> def getBackTheArgument(arg)
irb(main):023:1> puts "You entered #{arg}"
irb(main):024:1> end
```

* **Default parameter and optional parenthesis** Since ES6, we also have the default argument feature. Optional parenthesis is something new for me.
```ruby
irb(main):029:0> def hi(name ="kola")
irb(main):030:1> puts "Hi #{name.capitalize}"
irb(main):031:1> end
=> :hi
irb(main):032:0> hi
Hi Kola
=> nil
irb(main):033:0> hi("mocha")
Hi Mocha
=> nil
irb(main):034:0> hi "mocha"
Hi Mocha
=> nil
```

* **Classes** The core concept seems to be same as typical class creation. The constructor is called `initialize`. Instance variables are created using `@` notation. Method declaration is similar to what we saw earlier.

```ruby
irb(main):035:0> class Greeter
irb(main):036:1> def initialize(name = "Gabbar")
irb(main):037:2> @name = name
irb(main):038:2> end
irb(main):039:1> def say_hi
irb(main):040:2> puts "hi #{@name}!"
irb(main):041:2> end
irb(main):042:1> def say_bye
irb(main):043:2> puts "bye #{@name}, don't come back"
irb(main):044:2> end
irb(main):045:1> end
```

* **Objects** A slight variation to the constructor pattern. Instead of writing `new Person()`, in ruby you need to say `Person.new()`

```ruby
irb(main):046:0> grt = Greeter.new("Billi")
=> #<Greeter:0x00007fa020982f98 @name="Billi">
```

* **Instance variables** Accessing a variable directly gives us an error. Unlike JS, in which properties can be directly accessed, here you can't
```ruby
irb(main):050:0> grt.@name
Traceback (most recent call last):
        3: from /usr/bin/irb:23:in `<main>'
        2: from /usr/bin/irb:23:in `load'
        1: from /Library/Ruby/Gems/2.6.0/gems/irb-1.0.0/exe/irb:11:in `<top (required)>'
SyntaxError ((irb):50: syntax error, unexpected tIVAR)
grt.@name
    ^~~~~
```

Accessing instance variables is a little tricky. You need to create getters and setters before you could access object variables. One more interesting feature in ruby is - you can update the class definition:-O. And the modification is also applicable to existing objects. Well, JS prototypal inheritance also behaves in a similar fashion. But we don't have the typical compiled classes in JS(ES6 classes are just syntactical sugar over prototype).

```ruby
irb(main):056:0> class Greeter
irb(main):057:1> attr_accessor :name
irb(main):058:1> end
```

Once we modify the class and add an attribute, it can be accessed using special methods which gets declared automatically - `name` and `name=`.

```ruby
irb(main):061:0> grt.name
=> "Billi"
irb(main):062:0> grt.name="Saanp"
=> "Saanp"
irb(main):063:0> grt.name
=> "Saanp"
irb(main):064:0> grt.say_hi
hi Saanp!
=> nil
```


* **Instance methods** We can check all the associated instance methods using a static property. Passing `false` will give the non-inherited methods only.
```ruby
Greeter.instance_methods
Greeter.instance_methods(false)
```

This was all done via the ruby interactive shell which felt similar to browser's console or nodejs shell. In part 2 I shall try to write some complex programs to better understand the language and its features.

> End






