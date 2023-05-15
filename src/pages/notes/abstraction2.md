*[ [Category - Programming](/notes/Category%2520-%2520Programming) ][ [Category - Patterns](/notes/Category%2520-%2520Patterns) ][ [Category - Essays](/notes/Category%2520-%2520Essays) ]*

The abstraction is the most important mental trick in the programmer’s toolbox. 

There is an almost universal rule: **Everything is a specific case of some more general abstraction**. 

If first remember learning this while reading [SICP](https://www.goodreads.com/book/show/43713.Structure_and_Interpretation_of_Computer_Programs?ac=1&from_search=true&qid=W9p2wr8MWi&rank=2), where there was an exercise that went like:

You know the add function is used like `(+ 1 2 3 4)`. 

Try to make a sum for any amount of numbers between two intervals, like `(add 1 4)`. 

Now why make the step always 1? Take in a function for the step increment, and call it like `(add 1 4 step)`, where `step` is a function. 

Now why is the addition just of raw numbers? Why not use them as inputs to functions? Like so `(add 1 4 step func)` where `func` is a function, like `5x + 1`. Now we have the equivalent of the mathematical `\Sigma` sum notation! 

But why should the accumulation of the terms only be a sum? Why not multiplying all the terms, like a factorial? Or repeated division? Like so `(add 1 4 step func accumulator)` where `accumulator` is a function that takes two numbers and combines them somehow. 

Notice that the original `(add 1 4)` is just a specific case of `(add 1 4 step func accumulator)` with `step: + 1` , `func: x`, `accumulator: +`. 

I always kept thinking *now this must be last layer of abstraction!*  But there was always an extra layer. To the point that, basically, there are as many layers of abstraction as you can think of. 
Of course after a point they have questionable use, since every abstraction is more mental overhead. But the concept is really powerful, namely that: 
**Everything is the specific case of some more general form** so if you start seeing the same pattern over and over, then you’re probably better off using the more general form.

Just thinking about a more general form of something unlocks creative new thoughts you may have never had working in the domain of that one specific case. Sometimes I think to myself “*What is the more general form of that which this object is a specific case of*?” just to send a probe up the brain to see if it finds anything. 