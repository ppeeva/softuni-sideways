# Sideways

Application developed for the ReactJS exam in SoftUni. 

## Functionality

The application serves as a sideways catalog (inspired by the books of Ivan Mihalev and Elina Tzankova). There is a brief information about interesting places one can visit, not necessarilly being the most famoust tourist sites. 

Site guests can view the whole catalog and the details of each sideway, as well as the sideway comments if any.

Registered users can: 
- [1] add new sideways to the catalog
- [2] edit and delete their own sideways
- [3] comment on any sideway
- [4] use the option to mark a sideway as favourite thus generating 'My Favourites' list in their profile
- [5] use the option to mark a sideway as planned for visit thus generating 'My Planned' list in their profile
- [6] use the option to mark a sideway as visited thus generating 'My Visits' list in their profile and removing the sideway from the planned list


## Technologies used

- Node.js
- React
- CSS
- HTML
- JavaScript

## Architecture 

### back-end

The application relies on SoftUni practice server (https://github.com/softuni-practice-server/softuni-practice-server) for storing and retrieving data.

Users can register with email and password and can modify only their own content. 

LocalStorage is used for persisting the user's token so that they are not logged out on refreshing the page.

### front-end

React Router is used for client-side navigation.

ContextAPI is used for distributing and accessing data of the authenticated user across the pages. 

The application has stateful React components using React Hooks. 

Login/Registered and Create/Edit Sideway pages are implemented as Controlled Forms with custom validation.

Separate CSS modules are used for styling the components. 

## Getting started

- Fork and clone this repository.
- Run 'npm install' in the terminal.
- Run 'node server.js' in the terminal and do not close it.
- Run 'npm start' in another terminal.
