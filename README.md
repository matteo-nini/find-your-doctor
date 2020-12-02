# Find Your Doctor

_Browse hundreds of doctors specializing in certain categories and find the one that's right for you!_ <br/>

### Description
In this project i want to code the Mobile Web Application designed in this [Figma project](https://www.figma.com/file/HjwtbRxmSYSCYz8pYIJjo0/DoctorConsultationApp). <br>
The app, is a simple Doctor Consultation that work online and allow the user, to find the best doctor! <br>

### Tecnologies
_HTML_, _CSS_, _Javascript_ <br>

### How i made it

After the project analysis, i've used **Trello** for organize tasks with **Agile metodology**. <br>
So, i start coding! :nerd_face:<br>
The first step was to check the used device (_The app, in fact, works only on mobile!_): so i have done a **desktop page** (_look at it, 'cause it's beautiful_) to invite the user to switch to mobile device. <br><br>
[x] MOBILE PAGE<br>
And than i can start to work on **mobile**!<br> 
For this, i've install **browsersync package** (_via npm_), so i can watch the mobile version while i'm codin' it!
<br>

For the mobile version i create 4 different pages: <br>
- Homepage  <br>
- Login page  <br>
- Dashboard Page <br>
- Doctor Page <br>

#### Homepage
Simple, classic (maybe boring) homepage.

#### Login Page
Here you can log with your data. I provide the login page cause in the **dashboard page** was present an user icon. <br>
I provide a simple _form validation_ that check only if inputs aren't empty.

#### Dahboard Page
Let's split this page into sections:
- _Dashboard menu_: here you can find two clickable icons (menu, and user avatar) that show user informations.
- _Search box_: here the user can search and filter doctors by name.
- _Categories slider_: here the user can find all the categories, and filter doctors by them.
- _Top Doctors_: Here you can find all the top doctors.

#### Doctor Page
This page appear when the user click on a doctor (could be a filtered doctor, or one in Top Doctors list) and show the selected doctor informations.

<br><br>
I wanted also to provide a simple user navigation experience between pages, so, with some **CSS** and **JS**, i made some _cool animations_ when you change the page or when you click buttons or links! :smirk:

---

### Deploy Link

[Find Your Doctor!](https://findyourdoctor.netlify.app/ "Try it!")
