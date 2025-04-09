## Project info
 Project Plan: GreenGoals — A Habit Tracker for Sustainable Living

For this project, I’m building a web app called **GreenGoals**. It’s a habit-tracking tool that lets users log environmentally friendly actions they take each day—like biking instead of driving, recycling, using reusable bags, etc. The goal is to help users build more sustainable habits by visualizing their impact over time.

 What the App Will Do

The app will allow users to:

- Submit eco-friendly actions they’ve taken through a form.
- Store that data in an AWS DynamoDB table.
- View a list of all their logged activities.
- Delete any entries they no longer want to keep.
- Use a search feature to conditionally retrieve specific types of entries (e.g., only “recycling” logs).
- View simple charts or stats that summarize their progress (like most common activities, activity counts over time, etc.).

All data interaction will be handled using JavaScript, and the site will be styled with custom CSS.

 How It Will Be Structured

The app will be built with at least four separate HTML pages, each with a distinct purpose:

1. index.html
   This will be the landing page, introducing the app and linking to the other pages. It’ll have a clean layout and friendly design focused on accessibility.

2. log.html  
   This page will have a form for entering new eco-friendly actions. The form will sanitize input before submitting the data to AWS.

3. view.html 
   Users can click a button here to retrieve **all** stored entries from the database. Each entry will be displayed with a delete button to remove it if needed.

4. search.html  
   This page will let users search for specific types of actions—like filtering by keyword. It will conditionally retrieve and display matching results from the database.

5. stats.html (optional but planned)  
   I also want to include a simple statistics page that uses charts (probably with Chart.js) to show visual summaries of the user’s habits over time.
   
Technical Goals

To meet the A-grade requirements, I’m also planning to include:

- **AWS Integration**: All data will be stored and retrieved from AWS DynamoDB.
- **Form Input Sanitization**: I’ll write a sanitize.js file to clean any user input before it's submitted.
- **JavaScript Testing**: I’ll write a set of tests and aim for 80%+ test coverage of the frontend JavaScript.
- **Custom Styling**: Each page will have its own styling with over 21 different custom CSS styles in total.
- **Perfect Accessibility Scores**: I’ll make sure every page passes Lighthouse with a 100% accessibility score.



Why I Chose This Idea

I wanted to make something useful and meaningful, and I think a habit tracker focused on sustainability is a great fit. It gives me a chance to show off form handling, database interaction, conditional retrieval, sanitization, testing, and accessibility—all in one app. Plus, I can make it look really good with a green-themed design and fun user experience.

