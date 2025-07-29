---
title : Where to write code
url : where-to-write-code
summary : Do you find yourself in situation where you cannot decide where to write the code? In a class method, static method, base method or a utility method outside class. Lets explore how we can decide that.
author: amt8u
date: '2025-07-29T14:06:26.621Z'
draft : false
thumbnail: images/question-mark.jpg
images: ['images/question-mark.jpg']
tags : ['programming']
---

# Where to write code?
Maybe the seasoned programmers might instinctively know where a piece of logic belongs, but for many of us it it could be surprisingly tricky

Consider a realistic situation like below

A class `UserDataModel` which extends a base class `DataModel`. The UserDataModel already has a lot of code, and now there is a requirement to add a feature to it.

Before you start writing code, you need to decide where to write it? Below are the possible options you might choose from
 
* As a member method to the given class `UserDataModel`
* As a base method to the base class `DataModel`
* As a static function to the class `UserDataModel`
* As a static function to the base class `DataModel`
* As a utility function outside of the class somewhere
* As a private function in the class

This is a very basic questino that will affect the code maintainability, testability and architecture.

## Member method/Instance Methods
When the code
* operates on instance state
* implements core object behaviour, what this object does

You may ask then we can easily pass the instance state to a function as parameter and externalize that logic which means that it will be operating on instance state. And by the way, every function will always be operating on instance state, if not directly. You can externalize the logic when

* Logic is pure and stateless(means doesn't use this)
* Function works across multiple object types like `function calculateCreditScore(user, transactions)`
* you are writing a utiltiy library

## Static methods
Use when
* doesn't need instance state
* logically belongs to the class(thats difficult to debate though)
* creates or validates instances(factory methods/builder/validators)

e.g 
```js
class BankAccount {
    static fromJSON(data) {
        return new BankAccount(data.balance, data.accountType);
	}
    static isValidAccountNumber(number) {
        return /^\d{10}$/.test(number);
	}
}
```

## Utility methods
Use when
* has no class relationship - could work anywhere
* is pure(same inputs always produce same output)
* general purpose functionality(string manipulation, formatting, calculations)

## Base class method
Use when
* the needed behaviour is same across classes

# Decision questionnaire
Ask these questions in order:

Does it need instance data? → **Member method**
Is it related to the class concept but not instances? → **Static method**
Could it be used anywhere in the codebase? → **Utility function**
Is it shared behavior across subclasses? → **Base class method**

# Flowchart

Here is a flowchart to make it easy for you

![flowchart](./images/code-flowchart.svg)

Flowchart in mermaid code in case the above doesn't render.
```mermaid
flowchart TD
    A[New Code to Write] --> B{Does it need access to<br/>instance data/state?}
    
    B -->|Yes| C{Is it core behavior<br/>of the object?}
    B -->|No| D{Is it conceptually related<br/>to a specific class?}
    
    C -->|Yes| E[Instance Method]
    C -->|No| F{Is it shared behavior<br/>across multiple subclasses?}
    
    F -->|Yes| G[Base Class Method]
    F -->|No| H{Can it be made pure<br/>by passing instance as param?}
    
    H -->|Yes| I[Consider Utility Function<br/>+ Instance Method Wrapper]
    H -->|No| E
    
    D -->|Yes| J{Does it create/validate<br/>instances of the class?}
    D -->|No| K{Is it general purpose<br/>and reusable?}
    
    J -->|Yes| L[Static Method]
    J -->|No| M{Does it operate on<br/>multiple instances?}
    
    M -->|Yes| L
    M -->|No| N{Is it a helper for<br/>the class but not instances?}
    
    N -->|Yes| L
    N -->|No| K
    
    K -->|Yes| O[Utility Function]
    K -->|No| P{Is it domain-specific<br/>business logic?}
    
    P -->|Yes| Q[Domain Service/Module]
    P -->|No| O
    
    %% Styling
    classDef decision fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef outcome fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
    classDef consideration fill:#fff3e0,stroke:#ef6c00,stroke-width:2px
    
    class B,C,D,F,H,J,M,N,K,P decision
    class E,G,L,O,Q outcome
    class I consideration
```

# Conclusion
The key is being intentional about the choice rather than defaulting to one pattern

Methods should live where they have the **least coupling** and **highest cohesion** with their surroundings

> End


