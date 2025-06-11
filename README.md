# Chit-Chat

Chit Chat App - A MERN stack chat application 

The code is divided into 2 parts:
1. backend
2. frontend

Backend 
1. It includes routes for routing to controllers.
2. It includes controllers like group and auth as their name suggests groupController handles creation, fetching all group data and joining group. Auth controllers handles login, signup and tokens creation.
3. It includes models which stores schemas of user, group and message.
4. App.js includes all the socket.io logic with routing to route controllers.

Frontend
1. It includes src in which 2 folders are created components and pages.
2. Components includes the home page components like grouptab, groupwindow, etc.
3. Pages includes landing page, authentication page and home page.
4. App.jsx is used for routing and keeping the state of user, groups ,tokens, etc. so it can be fetched when user visits or refresh the page and to pass this states to child components.



   This is an explanation of the directory structure of the codebase.


   
