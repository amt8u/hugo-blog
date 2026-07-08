---
title : Short history of css layouts
url : short-history-of-css-layouts
date: '2025-03-17T05:00:42.540Z'
summary : A short history of css layout mechanisms to understand the evolution of creating responsive UI
author: amt8u
tags : ['css']
draft : false
thumbnail: images/layout.jpg
images: ['images/layout.jpg']
---

# Why history?

Because knowing the history helps us understand why a certain layout came into being. What was the purpose for it. What problem did it solve, and thus we can choose which one to use when.

# Layouts
## Block & Inline 
`CSS1` `1996`

https://www.w3.org/pub/WWW/TR/REC-CSS1

The spec documents starts by saying 

> This document specifies level 1 of the Cascading Style Sheet mechanism (CSS1). CSS1 is a simple style sheet mechanism that allows authors and readers to attach style (e.g. fonts, colors and spacing) to HTML documents. The CSS1 language is human readable and writable, and expresses style in common desktop publishing terminology.

I always thought why css had the cascading built into it. What was the thought process behind that thinking.

Interestingly, I found my answer in this document. The idea of cascading was to allowe users to extend the styling thereby giving the flexibility to the end users. Here's the exact quote

> One of the fundamental features of CSS is that style sheets cascade; authors can attach a preferred style sheet, while the reader may have a personal style sheet to adjust for human or technological handicaps. The rules for resolving conflicts between different style sheets are defined in this specification.
 
Coming to layouts, this specs categorically mentions that it doesn't support layouts.

> a layout language: CSS1 does not offer multiple columns with text-flow, overlapping frames etc.

So, we are left with the `block`, `inline` and `float` options.

As per the definition `block` element is one which has line break before and after.

`inline` is an element which does not have the line breaks(and thus the name inline 😃). So elements like `<em>`, `<strong>` which are supposed to be on the same line are by default `inline`.

With these two you could achieve certain amount of layouting, but more power was delivered by `float`.

## Floats
`CSS1` `1996`

https://www.w3.org/TR/REC-CSS1-961217#floating-elements


Float was introduced with the original spec and was again not meant for **layouts**. The original intent of `float` was to **wrap text around images**. Just like how you see text around images in the print media like magazines or books. If there is an image on the page, the text flows around the image and once the space is available, the text goes to full page.

While `float` seems to be easy to digest with the above definition, but if you look at the [rules](https://www.w3.org/TR/REC-CSS1-961217#floating-elements), its not that obvious. Having the power to move a certain element to left or right gave the developers **a hack to do layouts**.

A popular example is the **bootstrap** library which used [percentage based floats for creating columns](https://github.com/twbs/bootstrap/blob/v3.0.0/less/grid.less). It wasn't perfect but got the job done. Essentially what they did was to remove the elements from normal flow and get them stacked one after another. Changed their width as per the number of columns. So a `3` column layout will endup having elements with `33.333333%` width.

A sampled snippet from the code 

```css
@media (min-width: @screen-tablet) {
    .container {
        max-width: @container-tablet;
    }

    .col-sm-11 {
        float: left;
    }

    .col-sm-3 {
        width: percentage((3 / @grid-columns));
    }
}
```

Ofcourse since `float` was not meant for layouting(if that's a word), people abused it and had to use the other infamous hack.

```css
.clear-fix {
    clear: both;
}
```

## Positioning based 

`CSS2` `1998`

https://www.w3.org/TR/CSS2/visuren.html#positioning-scheme

Since floats weren't made for layouts, css guys gave us positioning capavbilities so that we can place the content as per our need.

With this, we got the `position` property in the css properties list with possible values

| Property    | Description                                                | Reference                                                    |
|-------------|------------------------------------------------------------|--------------------------------------------------------------|
| `static` 	  | Box is laid out according to the normal flow               | https://www.w3.org/TR/CSS2/visuren.html#propdef-position     |
| `relative`	 | Box is offset relative to its normal position              | https://www.w3.org/TR/CSS2/visuren.html#relative-positioning |
| `absolute`  | Specify offsets with respect to the box's containing block | https://www.w3.org/TR/CSS2/visuren.html#absolute-positioning |
| `fixed`     | Poisition as absolute, but with respect to viewport        | https://www.w3.org/TR/CSS2/visuren.html#fixed-positioning    |
| `inherit`   | same as parent value                                       | https://www.w3.org/TR/CSS2/cascade.html#value-def-inherit    |

### Relative
> Once a box has been laid out according to the normal flow or floated, it may be shifted relative to this position

### Absolute
> In the absolute positioning model, a box is removed from the normal flow entirely (it has no impact on later siblings) and assigned a position with respect to a containing block.

### Fixed
Fixed is a subcategory of absolute positioning. For the fixed element, the containing block is the viewport. 

While positioning gave some leeway, but still it wasn't perfect. You can create flexible layouts but it came with its caveats. With absolutely positioned elements you have to provide `top` , `left`, `right` and `bottom`


## Table layout
`CSS2` `1998`

https://www.w3.org/TR/CSS2/tables.html#q17.0

`Tables` came with positioning in CSS 2.1 version. I think this was the first time when CSS guys formally introduced something specific to layout. There is a large paragraph explaining about the introduction of tables in the spec and is evident by the below sentence 😎. 

> CSS tables can also be used to achieve specific layouts

While html had its own table structure(I hope you remember `<td>` and `<tr>`), this was an attempt of having [tables via CSS](https://www.w3.org/TR/CSS2/tables.html#table-display). So to convert any arbitary element into table, you just need to set the container's [display](https://www.w3.org/TR/CSS2/visuren.html#propdef-display) property to `table` and children as `table-row` or `table-cell`. And voila you got the layout.

```css
.table {
  display: table;
}

.row {
  display: table-row;
}

.cell {
  display: table-cell;
}
```
But tables had their own share of challenges - [border-collapse](https://www.w3.org/TR/CSS2/tables.html#propdef-border-collapse), [border-spacing](https://www.w3.org/TR/CSS2/tables.html#separated-borders) and [border conflicts](https://www.w3.org/TR/CSS2/tables.html#border-conflict-resolution). 

Even though tables seems to be an intuitive apparoch with more flexibility, somehow it didn't provide what was needed for layouting(If that's real word again 😂). You have to understand that tables are for "tabular" data i.e. where you map rows and columns. And not everything is about rows and columns.

## Multi-Column layouts
`CSS3` `2001`

Original - https://www.w3.org/1999/06/WD-css3-multicol-19990623
Updated - https://www.w3.org/TR/2005/WD-css3-multicol-20051215/

To be honest, I wasn't even aware about the multi column layout. In my experience I used everything else but not this one. Maybe it never gained traction as much as others did. Nevertheless, here is how you use the column layout easily to create multipe columns.

Create 3 columns with gap of 2em. 

```css
.content {
	column-count: 3;
	column-gap: 2em;
}
```

While the above is the minimal way to achieve columns, there are several other properties to get what you want. See the [updated doc](https://www.w3.org/TR/css-multicol-1/#the-number-and-width-of-columns) to know more.

It gets really complicated when you deal with different size contents. 

### Column gaps and rules

https://www.w3.org/TR/css-multicol-1/#column-gaps-and-rules

To set a gap between columns. You can also define the appearance of the gap as well
`column-gap`, `column-rule-color`, `column-rule-style`, `column-rule-width` and shorthand for all `column-rule`.

### Column breaks

https://www.w3.org/TR/css-multicol-1/#column-breaks

I couldn't understand much but what I could grasp from the document is that there are properties which would help you to decide where to break the flow and move to a new row. There is a whole separate spec for [content fragmentation](https://www.w3.org/TR/css-break-3/#propdef-break-before).  After a quick glance, it feels that its not just the container, but the whole pages on which the breask are to be defined. While we as devs only think about html on browser, the spec guys need to take into account all kinds of devices like print media, readers etc.

### Spanning columns

https://www.w3.org/TR/css-multicol-1/#spanning-columns

The column-span property makes it possible for an element to span across several columns. i.e. break the flow of columns and let one element just go over the columns. An element that spans more than one column is called a multi-column spanning element and the box it creates is called a multi-column spanner. Interestingly I found the phrase [block-chain](https://www.w3.org/TR/css-display-3/#containing-block-chain) 😃. Not sure if this was the first time ever this term was used, but it was nice to see that in css spec.

### Filling columns
https://www.w3.org/TR/css-multicol-1/#filling-columns

> There are two strategies for filling columns: columns can either be balanced, or not. If columns are balanced, user agents should try to minimize variations in column height, while honoring forced breaks, widows and orphans, and other properties that may affect column heights. If columns are not balanced, they are filled sequentially; some columns may end up partially filled, or with no content at all.

Read the whole text, there are many comninations around this.

### Overflow

https://www.w3.org/TR/css-multicol-1/#overflow

Again, you have to go through the doc to understand the various scenarios about overflows.

## Flexbox

`CSS3` `2009`

Initial - https://www.w3.org/TR/2009/WD-css3-flexbox-20090723/

Latest - https://www.w3.org/TR/css-flexbox-1/

When we had multi column layouts with various positioning techniques, why did Flexbox came into picture? Multi column layout was primarily meant for breaking text into columns for various devices. Though you could use it to create good looking documents, but it wasn't good enough to create User interfaces.

This was the time when people started making complex UIs on the browser. It was no longer about forms. Whole applications were built using html and css.

> Flexbox describes a CSS box model optimized for user interface design

The children can be laid out in any direction with the capability of flexing 😎. 

* **Grow to fill unused space**
* **Shrink to prevent overflowing parent**

Nesting of boxes can be used to build layouts in two dimensions.

I guess this was the most powerful layout mechanism since the inception of web. It gave a new meaning to responsive design. It prevented us from using the percentage widths.

Here are the main features of flexbox model

* can be laid out in **any flow direction** (leftwards, rightwards, downwards, or even upwards!)
* can have their display **order reversed** or rearranged at the style layer (i.e., visual order can be independent of source and speech order)
* can be laid out linearly along a single (main) axis or **wrapped** into multiple lines along a secondary (cross) axis
* can “flex” their sizes to **respond to the available space**
* can be **aligned with respect to their container** or each other on the secondary (cross)
* can be dynamically **collapsed or uncollapsed** along the main axis while preserving the container’s cross size

To gain more understanding of how it works, do checkout the [official spec section](https://www.w3.org/TR/css-flexbox-1/#box-model). Once you understand the concepts then only you will be able to appreciate its power

There is a [comprehensive guide from csstricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/#aa-flexbox-properties) explaining each property. There are multitude of properties both for parent and children. 

Initially it all was quite confusing as the properties themselves doesn't give much hint. Plus you will find many examples in the wild with elements having both parent based and child based properties, thus making it misleading. The reason here is that an element could be a child of a flexed parent as well as a parent with flexed children. Kind of chaining of flex items. And this chain can go deep too.

```css
.some-grand-parent {
	display: flex;
}
/*Consfusing properties*/
.some-parent {
  	display: flex;
  	flex-grow: 1;
}

/*This could be a child of .some-element*/
.some-child {
	flex-grow: 1;
}
```

// TODO - Will complete later as and when I get time

## CSS Grid
## Subgrid
## Container queries
## Masonry Layout