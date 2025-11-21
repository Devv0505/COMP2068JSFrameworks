# Expense Tracker  
A full-stack Expense Tracking application built with **Node.js, Express, MongoDB, Mongoose, Passport.js, and Handlebars (HBS)**.  
This project was created for **COMP 2068 – JavaScript Frameworks (Assignment 2)**.

It allows users to securely register, log in, and manage their expenses with full **CRUD functionality**, along with data visualization using **Chart.js**.

---

## Live Demo  
**Live Site (Render):** https://assignment2-vzpe.onrender.com
**GitHub Repository:** https://github.com/Devv0505/COMP2068JSFrameworks.git

---

##  Features

###  Public Features (No Login Required)
- Public homepage showing **recent expenses (read-only)**  
- Displays spending examples with:
  - Title  
  - Category  
  - Amount  
  - Date (formatted: `Oct 31, 2025`)  
- Fully responsive design  

### Authenticated Features
Once a user logs in:

####  Full CRUD (Create, Read, Update, Delete)
- Add a new expense  
- Edit existing expenses  
- Delete with confirmation  
- View a personalized dashboard of your own expenses  

####  Authentication
- Local username/password login  
- **GitHub OAuth Login** (Passport-GitHub2)  
- Sessions stored in MongoDB using `connect-mongo`  

####  Additional Features (Required by Assignment)
- **Data Visualization (Pie Chart)** of spending by category  
- **GitHub OAuth** provider (extra authentication provider)  
- Stylish modern UI using Bootstrap + custom CSS  

---

##  Dashboard Features
- Clean, modern dashboard with:
  - Total spending  
  - Total records  
  - Top category  
  - Pie chart breakdown  
  - Expense table (edit/delete options)  

---
##  Technologies Used

- **Node.js**
- **Express.js**
- **Handlebars (HBS)**
- **MongoDB + Mongoose**
- **Passport.js (Local + GitHub OAuth)**
- **Connect-Mongo (Session Store)**
- **Bootstrap 5**
- **Chart.js**
- **Render (Deployment)**


## Academic Integrity & Citations
A small portion of this project was developed with assistance from ChatGPT (OpenAI).  
ChatGPT was used only for **debugging guidance**, **UI styling help**, **improving clarity**,  
and **generating sample code snippets**, all of which were adapted by me and integrated manually.  
No more than 10% of the final codebase comes from ChatGPT,  
and I fully understand, modified, and documented all contributed sections.

## Author

**Name:** Dev
**Course:** COMP 2068 — JavaScript Frameworks
**Assignment:** 2 (Full Stack CRUD Application)