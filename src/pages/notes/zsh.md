I've been using zsh for while now, I even made a YouTube video about it. 

## Tricks
Use `take` to make a folder and cd into at the same time. 

## Performance
After a ton of time adding plugins I finally made my zsh unusably slow. Like 5 second startup slow. Thankfully, I found a [blog post](https://blog.patshead.com/2011/04/improve-your-oh-my-zsh-startup-time-maybe.html) about fixing it. Basically: disable useless plugins and  put `skip_global_compinit=1`. That line is key, since compinit takes it’s time. And the matter of fact is: I don’t really forget my commands enough to *need* completions like that. 
I thought it was so cool at first. But now, eh. I’d rather have the speed.