After spending hours in configuring this blog its time to show some creativity. But before that there is one more thing to learn 

# Learning Markdown

Started my journey from [ghost markdown guide](https://ghost.org/changelog/markdown/). Will be reading and side by side playing with the Markdown syntax which would enable me to write better articles(**Hope!**).

The first thing is as always Headings. There are many ways to create headings in any editor. The most simpler way is to convert the text to large size with bold characters but that permanently fixes the styling. If you use a different theme and want your text to be styled according to the theme's styles, you need to have a way to treat text differently.

You can convert any text into heading by adding # in front of the text. Total available levels are 6 but for the most part you will only need 3. But for completeness I will use all 6.

```markdown
#Heading 1
##Heading 2
###Heading 3
#####Heading 4
#####Heading 5
######Heading 6
```
# Heading 1
## Heading 2

### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

<hr>

## Text

There are various ways to emphasize text. You can use * around the words to make them

``` markdown
*This text will become italic
**This text will be bold
***This will be bold as well as italic
The homepage for this blog is[here](http://seedocode.com)
```

*This text will become italic*

**This will be bold**

and

***This will be bold as well as italic***

The **homepage** for this blog is [here](https://cybercafe.dev/)

Though you can directly add an image to the post using the add image button, you can also add an image with similar syntax as you add a link.

``` markdown
![This will become the alt-text](https://seedocode.com/content/images/size/w2000/2020/01/IMG_20200126_093318-3.jpg)
```

![MyArt](https://cybercafe.dev/content/images/size/w2000/2020/01/IMG_20200126_093318-3.jpg)

## Lists

Lists are very difficult in plain html. Indentation never works as you would want. Some editors just ignore the whitespace and all your lists become plain lines

``` markdown
* First item
    * Second item
        * Second sub item
            * Second sub sub item
* Third item
```

* First item
* Second item
    * Second sub item
        * Second sub sub item
* Third item

``` markdown
1. Item number 1
    1. Item number 1.1
    2. Item number 1.2
2. Item number 2
3. Item number 3
```

1. Item number 1
    1. Item number 1.1
    2. Item number 1.2
2. Item number 2
3. Item number 3

## Quotes

``` markdown
You can add a qoute by prefixing any line with `>` character.
```

> You can add a qoute by prefixing any line with > character

## Dividers
If you want to have separation between your sections ,you can use `---` to create a divider like below

<hr>

and here you can start a new section.

## Code
The most important feature of any technical blog

``` markdown
Use ` and ` to denote a one liner code snippet.
```

`Use` \` and \` `to denote a one liner code snippet.`

``` markdown
    And indenting any text by 4 spaces
    will give you a code block.
```

    And indenting any text by 4 spaces
    will give you a code block.

## Referencing links

You can use numbers to reference links so that your main text looks cleaner. Also you can add title attribute which will come up as tool-tip for the links.

``` markdown
A good example of search engine is [Google][1] but I personally prefer to use [DuckDuckGo][2]

    [1]: https://www.google.com "Personalised AD based revenue"
    [2]: https://duckduckgo.com "Non personalised AD based revenue"
```

A good example of search engine is [Google][1] but I personally prefer to use [DuckDuckGo][2]

[1]: https://www.google.com "Personalised AD based revenue"
[2]: https://duckduckgo.com "Non personalised AD based revenue"

## Escaping

What if you want to type characters which are used for *markdowning*(Yup new word!)?
You can do so by using \* combination

``` markdown
    \* This won't become italic \*
    \** This won't become bold \**
    \## This will not become a heading
    and
    \[This will not become a link\](Not a link)
```

\* This won't become italic \*

\** This won't become bold \**

\## This will not become a heading

and

\[This will not become a link\](Not a link)

## Embedding HTML

A time may come that you might need more power that markdown. For that time you can always insert html directly. 

``` html
<input type="button" name="DummyButton" value="Click here" style="cursor:pointer"/>
```

<input type="button" name="DummyButton" value="Click here" style="cursor:pointer"/>

And yes you can be creative as much as you want!

``` html    
<input type="button" onclick="(function(){alert('You clicked just out of curiosity!')})()" style="font-size:25px; margin:5px; padding:30px; border:1px solid #ddd; border-radius:10px; cursor:pointer" name="DummyButton" value="Click here - Its more fancy!"/>
```

<input type="button" onclick="(function(){alert('You clicked just out of curiosity!')})()" style="font-size:25px; margin:5px; padding:30px; border:1px solid #ddd; border-radius:10px; cursor:pointer" name="DummyButton" value="Click here - Its more fancy!"/>

## Advanced markdowning!

### Strikethroughs
``` markdown
You had a debt of ~~1000~~ $. But now you are free.
```

You had a debt of ~~1000~~ $. But now you are free.

## Highlights

``` markdown
==Let this be highlighted==
```

==Let this be highlighted==

## Auto links generation

Just copy paste the link in the editor and it will create an embed

`https://seedocode.com`


## Footnotes

``` markdown
    This looks like what wikipedia[^1] has.
    
    [^1]: Wikipedia : [Link to wiki](https://wikipedia.org)
```

This looks like what wikipedia[^1] has.

[^1]: [Wikipedia](https://wikipedia.org)

This sums up mostly all available options for markdown. Will see if I get a hand of this and whether this will improve my writing!

