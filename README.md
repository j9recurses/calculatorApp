# Angular js CalculatorApp

A calculator written in angular js.
Has the same specs as the calculator in MacOsX/iphone.

It allows multiplication, division, subtraction and
addition of numbers.
The UI is a grid of numbers and functional operators.
The result is displayed at the top of the calculator.

Digits can be accessed on the keyboard with the standard
digit keys. Calculator functions:
÷, x, +, -, %,
can be accessed using the following the operator key + shift
the = operator can accessed with the enter key
and the ac button using shift+c.

##Mapping the UI to functions
The user can enter in a number, operator, or transformation
function(+/-,.) into a calculator, or click the ac
button to clear the screen.

When the user enters a displayed, its displayed.
For every successive number input, the result is shifted
by base 10 to make room for the newest digit input.

When a user enters an operator or transform function, the operation is applied
to the numbers entered.

<span>To put in the simplest terms, the calculator must
store the following 4 variables to maintain its state:

result : i.e. the number to show the user
screenReset:
  if a user enters a bunch of digits,
  and then an operator fnx, we need to clear the
  screen so they can enter the second number/set of digits
  into the calculator.

entered1: the second number the user entered
entered2: the first number the user entered
operation: stores the operation that user entered (ie, + -, /, * )

there are a decimal click and a double decimal click flags
that help the calculator deal with situations where
has entered decimal input.</span>

For UI input, the user can either click or type on a digit
or operator. For click events, I used ng-click to fire
off the corresponding function. For keyboard input,
I created a directive that listened for key events.
When a given key was pressed, the directive broadcast
the event up to the controller function, and in my controller,
I had a '$scope.$on('keydown keypress',...' function
that watched for keydown events and when certain
keys where pressed, it applied the appropriate



##Angular Implementation

I tried to follow these MVC architecture patterns
when design and building this app:

<span>Controllers:
+Contain the logic required to initialize the scope
+Contain the logic/fxns used by the view to present data from the scope
+Contain the logic/fxns that are needed to update the scope based on user interaction
+Controllers bring logic from the models and views together
</span>

<span>
Controllers shouldn't:
+Contain logic/fxns that manipulate DOM elements
+Contain logic/fxns that manage persistence of data:
  i.e. it shouldn't be handling complex
  data manipulation/business logic, generating, storing
  or significantly modifying app data, etc.
</span>

<span>
Models:
+Contain the logic/fxns that generate, modify, destroy
  or store app data.
</span>

<span>
Views:
  Manipulate DOM elements.
</span>
The angular frame work isn't a traditional MVC (its richer/
different because of services, filters, directives, etc)
but, nonetheless, general MVC patterns should be applied
to angular when possible.

##Controllers

Not following MVC patterns can lead to a bloated
Angular controller.

In this app, I tried to set up the controller so that
the controller brings the view and model logic together;
and drives the model drives view changes.

My controller handles what happens when a user clicks
or presses on a key or operation; it handles
what to do with the input, firing off functions
that get data from various services, or passes off data
to be displayed in the view.

##Services
Most of the meat of this application is handled
by various factory services. These services handle the
the creation/persistence of data.

By separating data manipulation and generation
tasks from the controller,
its easier to see the various pieces that the controller
is actually controlling/manipulating/coordinating and
creates the opportunity to to create reusable functions
that can be used by other controllers, services, etc
in the app.

Creating re-useable functions in services not only
DRYs up your code, but also
makes the application code more readable.

<span>Additionally, I tried to organize my services by concerns:
for instance, in my app, I
have the following factory services:

+CalculatorMath: handles all the math operation functions
                ÷, x, +, -, %, etc
+CalculatorSetup: Generates all the data needed to initialize
                  the calculator app.

+CalculatorDuties: Creates and manages the app data
                  the calculator needs maintain
                  to maintain its state


+CalculatorClicks: handles persistence and management app
            of data after given user action is taken in
            the calculator: is, in the case of click
            on a digit button, the controller fires
            a particular factory method in the this
            group and the actual method deals with
            the data persistence/transformation
            and then passes the resulting data back to
            to the controller.
</span>

###Views/Directives
This app doesn't have a ton of don manipulation, however,
in those cases, I used to directives to handle this
functionality.
For instance, as the user enters digits into the calculator,
 i.e. 12, 134444444444444
or when a user multiplies numbers: 10*1000 => 1000000
the number of number of digits in the results screen
increases. As a result, the font-size and padding of
the result screen to decrease in size or the digits
won't be visible to the user.
To handle this, I made a directive that handles
the font and padding resize.

###Overall App Structure

I divided all my views, filters, directives, services controllers
and views into separate files. Initially, since this
seemed like a small app, I had all my services in one file,
my directives in a file, etc, but these files soon became
a bit long and unruly. As a result, I dumped them into separate
files to be on the safe size.


###Things Are Missing From this App
A couple of things are missing/could make this app better:

1.When a user clicks on types on the digit or operate
button, the button should stay highlighted/active
for a second or 2 to give the user feed back that they
have clicked/pressed down on a particular button.

2.Some of the keycodes for the operator buttons are
funky/not ideal. On a standard key board,
input for percentage(%) is actual shift +5.
To this with a plan vanilla keydown events
you have to start looking for key combinations
in the $scope.on function in the controller
for these events. Looking for key combos is a big pain/
time suck. To get around this I used the angular
library hot keys to pick up these key combinations.
I tried to use the hotkeys lib to grab single key events
but it didn't seem to work for me.
I ran out time to build operator key hashes that would
pick up single key operators, like / or. or c. So, now,
these key inputs are resolving to shift+c, shift+., shift+/
which doesn't match the standard MacOSx spec.

The above features are missing because I ran out of
time to implement them.


###Installation
This app uses a Sinatra backend as the server
I could have used node, but I have a nginx server
that is config'd for sintra so I just went with that.

*assumes that you have ruby, npm and bower installed*

to install dependencies:
```bundle install

bower install
```
to run the app in your web browser, cd into the root dir and run:
```rackup```

