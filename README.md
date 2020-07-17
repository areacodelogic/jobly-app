### Jobly

A full-stack job posting and job application website. 

Users can create an account, log-in, search for companies, search for jobs and apply to them. 

Data is stored in a Postgres database.

Live site:  http://perfect-circle.surge.sh/

### Layers and Key Elements

Database: 
* PostgreSQL

Backend: 
* Node.js
* Express.js
* JWT
* Bcrypt - hash and compare passwords
* Jsonschema - validate request body data for post and patches
* Middleware - authentication and authorization for private routes
* 'pg' module - connect to postgres database
* Parameterized queries - prevent SQL injection
* Supertest and Jest - for integration tests

Frontend:
* React
* React-router
* Context - to persist logged-in status throughout application
* Controlled components - for forms
* HTML/CSS
* Bootstrap

### Component Architecture

```
App
└─┬─ Nav
  └┬ Routes
   ├── Home
   ├── Login
   │     ├── LoginForm
   │     └── SignUpForm
   └─┬ PrivateRoutes 
     ├─┬ Companies
     │ ├── Search
     │ └── CompanyCard 
     ├─┬ Company
     │ └── JobCard 
     ├─┬ Jobs
     │ ├── Search
     │ └── JobCard
     └── Profile
```


### Routes

Path | Component
:--- | :--------
/ | Home
/register | Login
/login | Login
/companies | Companies
/companies/:handle | Company
/jobs | Jobs
/profile | Profile

