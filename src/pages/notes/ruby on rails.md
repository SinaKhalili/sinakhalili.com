Ah, the classical language of beauty, Ruby. 

Despite the [Poignant Guide](https://poignant.guide) being my all-time favourite programming book, I really haven't been able to use Ruby or Rails that much.

That changes now! I'm going to be reading [Learn enough rails to be dangerous](https://www.railstutorial.org/book)  and sharing my notes. In the end I will build a small "secret santa" application.

Let's begin! 

## General notes (like live tweets)
Rails is model-view-controller. A bit different from Django's Model-view-template, MVC is actually easier conceptually.

The templating lanuage uses `<%= ... %>` for computations that are rendered (expressions), and `<% ... %>` for those that aren't shown. 

With default options the `rails new` is massive. It even uses Yarn to install a bunch of webpack stuff. 😓. I guess rails never advertised itself as "minimal". 

`app/assets` is the *asset pipeline*, for static files.

`config/routes.rb`  is the routes files, like url.py in Django. Uses it's own DSL which is cool 😎

The code generation of the `rails` commandline is out of this world. Writing files like it's going out of style.

Remember to run the migrations! `rails db:migrate`

It comes with a Rakefile (like a Makefile) that has a `routes` command to show all the routes, just call `rake routes`

If you use `user:references` then a `user_id` is added the migration, and `belongs_to :user` is also added to the model. 

For example: 
`rails generate model Profile user:references`

## Router
looks like `root 'application#hello'`  which means a request for root should go to controller application, with function "hello". 

## Gemfile
Split up into different "groups". 
Standard move: create a new :production group and add the postgres gem (for Heroku). 

```ruby
group :production do
  gem 'pg', '1.2.3'
end
```
Use `bundle config set without 'production'` to not install the production gems

## Scaffolding
Generating is creating one new file, Scaffolding is code for an entire new resource
`rails generate scaffold User name:string email:string`
Then use name:type for the User attributes.
😲 It created a web interface to the model! Just go to `/users`  and to get to a user, use `/users/:id`. The id's start at 1. Basically, this calls different methods on the Users controller.
This is because it added the line `resources :users` to the routes.rb
The scaffolding automatically updates the routes.rb.
If you just want the controller, then you use `rails generate controller CamelCase action action2`.
The CapitalCamelCase is converted to snake_case_controller. Pretty neat.
The extra actions are the ones in addition to the REST ones. 
You can undo code generation with `rails destroy controller CamelCase actoin action2`
When you generate a controller, a test file in the `tests` folder is automatically created🤓
The base html file is created under the layouts

## Controllers
Controllers have different *actions*, which are methods called on particular HTTP requests, for example GET is show, POST is create.
Inheriting from ApplicationController gives you ActiveRecord, the rails ORM, so that's why these empty controllers have all this functionality.
The controller executes the action which coresponds to the url, if not specified. `/home` is the `home` action.
Empty controller action just renders a view (in `views/snake_case_name/home.html.erb`)

Use `before_action` with a method to fetch the user for the edit, show, and destroy pages. Scaffolding does this automatically.
```ruby
  before_action :set_user, only: [:show, :destroy]
...

  def set_user
    @user = User.find(params[:id])
  end
```


## Models
You can use the `has_many` and `belongs_to` to refer to key/foreign keys. I guess it uses some ruby metaprogramming magic to make it work.

The rails ORM is called active record.
To update, use
`User.update(12, user_name: "bob")`, the first param is the id. 

To access a model through it parent use `accepts_nested_attirbutes_for`

```ruby
class User < ApplicationRecord
  has_one :profile
  accepts_nested_attributes_for :profile, update_only: true
end
```
## Console
You can use the console by writing `rails console`. It's pretty good, and it updates with db changes so you can do it live with the server runng!

## Views
The base html is in layouts.
The folders corresspond to the controller names.
Uses `yield` as the block to be replaced. `yield(:title)` is the title, if in the main file you use `<% provide(:title, "hello") %>`... pretty cool!

You can use repeated sections of views by using partials. Do use a partial, just name the partial with an underscore at the beginning like `_image_partial.html.erb`, and in place you call give it an argument like
`<%= render partial: 'profile_pic', locals: {pic_url: @user.profile.pic_url} %> ` 
Now you can access that local variable in the partial like 
`<img src="<%= pic_url %>" width="260" height="260" class="profile-pic">`

## Clearance
This is a gem for doing user authentication by thoughtbot (who are pretty goated in the rails world). 
Remember to read their Readme and use their generators.
First install
`rails generate clearance:install`
then the views
`rails generate clearance:views`
then the routes
`rails generate clearance:routes`

If you have a controller to modify and you only want the user's data in that controller, use a `before_action` with `require_login` and in the index method use the `current_user` 
Example
```ruby
class BeanpostsController < ApplicationController
  before_action :require_login

  def index
    @beanposts = current_user.beanposts
  end

```
This is how you can create a my_account page. To create a new post using the user, use the `build` command.

Use a `Profile` controller to give user accounts extra data. 
Make the profile `rails g scaffold Profile bio:text user_id:integer`
Give the user **model** a `has_one` like so:
```ruby
class User < ApplicationRecord
  include Clearance::User
  has_many :beanposts
  has_one :profile, dependent: :destory
  before_create :build_profile
  accepts_nested_attributes_for :profile
end
```
And give the Profile **model** a  `belongs_to`, use `dependent` to ripple delete the profile (or else it will be orphaned after user delete)
```ruby
class Profile < ApplicationRecord
    belongs_to :user
end
```
You can add a link to create your profile in the layout (new_profile_path)
```erb
 <% if signed_in? %>
   Welcome back, <%= current_user.email %> (<%= link_to 'Sign out', sign_out_path, method: :delete %>)
    Make sure to <%= link_to  "Update your profile", edit_profile_path %>
  <% else %>
```
Make sure to change the `create` and `new` methods to use `current_user` (controller)
```ruby
  def new
    @profile = current_user.build_profile
  end
  
  def create
    @profile = current_user.build_profile(profile_params)
  end
  
  def edit
    @profile = current_user.profile.find(params[:id])
  end
	...
```

## Migrations
You store data in the db, and can change it over time with migrations. 
Using the command line tool for mirgrations, rails will auto-generate the migrations based on the naming of the migrations. For example to add a field to something: 
`rails generate migration AddUserRefToProducts user:references`
If you use AddSomethingToModel, the model is chosen automatically.

## From 0 to 💯
Use the rails command line.
1. `rails new app` Creates a new rails app with scaffolding
2. Check the routes in `config/routes.rb`, add `root 'foo#bar'`
3. If using Heroku, add the `pg` gem and move the `sqlite` from the global namespace into the `development, test`. 
4. Put it on Heroku:
	1.   `heroku login` to the account
	2.   `heroku create` the app
	3.   use their recommended Procfile: `web: bundle exec puma -t 5:5 -p ${PORT:-3000} -e ${RACK_ENV:-development}`
	4.   use `git push heroku main` for pushing to heroku
5. Use `rails generate scaffold User name:string email:string` to make a user
6. Run the migration `rails db:migrate`
7. Use [clearance](https://github.com/thoughtbot/clearance) for simple user accounts (follow the readme)
8. Make sure to use the clearance generators
9. Make a `StaticPages` controller for the homepage, and other static pages. Use `rails g controller StaticPages home about help`
10. Make sure to run `heroku rake db:migrate` on the database for migrations


# Rails: Final Verdict ⭐️⭐️⭐️⭐️⭐️
Quite possibly the greatest framework ever made. Ruby is a beautiful language, and everything in Rails just works. Great console, great ORM (although `allow_nested_attributes` was giving me some trouble), and an active community on stackoverflow. 
I think the main thing rails did was look around and say 
“Hey! Wait a second! Everyone just keeps remaking the same thing! Why don’t we just make a command for that?”
Isn’t [[Category - Patterns | pattern recognition]] and [[abstraction]] literally what programmers are supposed be good at? Why is rails the first to recognize the remarkable amount of repitition in web work? Lol.
My favourite part about rails is that it’s not shy when it comes to code generation. I cannot think of any framework that ouputs as much code *that is supposed to be read* as rails. I wish every tool had `rails generate`. 

## Extra resources: 

 - [The odin project](https://www.theodinproject.com/courses/getting-hired/lessons/building-your-personal-website)