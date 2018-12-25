# Conference-Manager-App
<br>
<h3>1/ PROBLEM</h3>
You are planning a big programming conference and have received many proposals which have passed the initial screen process but you're having trouble fitting them into the time constraints of the day. There are so many possibilities! So you write a program to do it for you.<br>
The conference has multiple tracks each of which has a morning and afternoon session.<br>
Each session contains multiple talks.<br>
Morning sessions begin at 9am and must finish by 12 noon, for lunch.<br>
Afternoon sessions begin at 1pm and must finish in time for the networking event. The networking event can start no earlier than 4:00 and no later than 5:00.<br>
No talk title has numbers in it.<br>
All talk lengths are either in minutes (not hours) or lightning (5 minutes). Presenters will be very punctual; there needs to be no gap between sessions.<br>
Note that depending on how you choose to complete this problem, your solution may give a different ordering or combination of talks into tracks. This is acceptable; you don’t need to exactly duplicate the sample output given here.
<br><br>
Test input:<br>
Writing Fast Tests Against Enterprise Rails 60min<br>
Overdoing it in Python 45min<br>
Lua for the Masses 30min<br>
Ruby Errors from Mismatched Gem Versions 45min<br>
Common Ruby Errors 45min<br>
Rails for Python Developers lightning Communicating Over Distance 60min<br>
Accounting Driven Development 45min<br>
Woah 30min<br>
Sit Down and Write 30min<br>
Pair Programming vs Noise 45min<br>
Rails Magic 60min<br>
Ruby on Rails: Why We Should Move On 60min Clojure Ate Scala (on my project) 45min<br>
Programming in the Boondocks of Seattle 30min<br>
Ruby vs. Clojure for Back End Development 30min<br>
Ruby on Rails Legacy App Maintenance 60min<br>
A World Without HackerNews 30min<br>
User Interface CSS in Rails Apps 30min<br>
<br><br>
Test output:<br>
Track 1:<br>
09:00AM Writing Fast Tests Against Enterprise Rails 60min<br>
10:00AM Overdoing it in Python 45min<br>
10:45AM Lua for the Masses 30min<br>
11:15AM Ruby Errors from Mismatched Gem Versions 45min<br>
12:00PM Lunch<br>
01:00PM Ruby on Rails: Why We Should Move On 60min<br>
02:00PM Common Ruby Errors 45min<br>
02:45PM Pair Programming vs Noise 45min<br>
03:30PM Programming in the Boondocks of Seattle 30min<br>
04:00PM Ruby vs. Clojure for Back End Development 30min<br>
04:30PM User Interface CSS in Rails Apps 30min<br>
05:00PM Networking Event<br>
<br><br>
Track 2:<br>
09:00AM Communicating Over Distance 60min<br>
10:00AM Rails Magic 60min<br>
11:00AM Woah 30min<br>
11:30AM Sit Down and Write 30min<br>
12:00PM Lunch<br>
01:00PM Accounting Driven Development 45min<br>
01:45PM Clojure Ate Scala (on my project) 45min<br>
02:30PM A World Without HackerNews 30min<br>
03:00PM Ruby on Rails Legacy App Maintenance 60min<br>
04:00PM Rails for Python Developers lightning<br>
05:00PM Networking Event<br>

<br>
###############################################
<br>

<h3>2/ PROBLEMS APPROACH</h3>
- Using Dynamic Programming to fill each session.<br>
- Applying Dynamic Programming 0-1 Knapsack problem: for each item:<br>
nbsp; nbsp; nbsp; nbsp; weight = talk length<br>
nbsp; nbsp; nbsp; nbsp; value = talk length<br>
nbsp; nbsp; nbsp; nbsp; requirement is to maximize value, so that weight(talk length) < session duration (3 hours morning, 4 hours afternoon)

<br><br>

<h3>3/ HOW TO CLONE AND RUN PROJECT</h3>
$ git clone https://<span></span>github.com/tukhai/Conference-Manager-App.git<br>
$ cd Conference-Manager-App<br>
$ node app.js resources/source.txt<br>
<br>
User can put the list of proposal talks into /resources folder and run the same node command:<br>
$ node app.js resources/source1.txt<br>
$ node app.js resources/source2.txt<br>
$ node app.js resources/source3.txt<br>
etc.

<br><br>

<h3>4/ ADDED TEST CASES</h3>
a) <a href="https://pure-shelf-23565.herokuapp.com/resources/source.txt">source.txt</a> (Default list of proposal talks)<br>
b) [source_test_case_1.txt](https://pure-shelf-23565.herokuapp.com/resources/source_test_case_1.txt) (A lot of talks, excess to track 3)<br>
c) [source_test_case_2.txt](https://pure-shelf-23565.herokuapp.com/resources/source_test_case_2.txt) (A lot of talks, excess to track 4)<br>
d) [source_test_case_3.txt](https://pure-shelf-23565.herokuapp.com/resources/source_test_case_3.txt) (Less talks, only has track 1)<br>
e) [source_test_case_4.txt](https://pure-shelf-23565.herokuapp.com/resources/source_test_case_4.txt) (Most of talk doesnt have proper time => only take the talk with proper time)<br>

<br><br>

<h3>5/ WEB VERSION</h3>
You can visit the web version of this project at https://pure-shelf-23565.herokuapp.com<br>
<br>
Conference-Manager-Web project: https://github.com/tukhai/Conference-Manager-Web