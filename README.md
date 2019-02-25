# doctors and patients take home challenge

Build a simple, but well-crafted and appealing web application that allows doctors and patients to collect and share healthcare information:

Patients’ personal details, including:
  - Name
  - Age
  - Mailing Address
  - Phone Number
  - Email Address

Functional Requirements
- Doctors and Patients sign in with username / password credentials
- The system recognizes the user as either a doctor or a patient
- Upon signing in, doctors see a listing of patients in the system.
  - Doctors can also search for patients by name.
- When a doctor selects a patient:
  - The patient’s personal details are displayed.
- Upon signing in, patients see an overview of their information in the system:
  - Their personal details are displayed, able to be edited.

Technical Requirements
- We’re looking for a complete client and server implementation: a browser-based single page application that communicates via HTTP calls to an API to fetch and store data. Use React to implement your web application and Node.js for your API server. You’re welcome to use any additional libraries or technologies you like.
- No need to create a user registration process, feel free to seed accounts.
- All data must be persisted.

## INSTRUCTIONS TO RUN

1. `npm install`
2. make sure have sqlite3 installed
3. `npm run db:migrate`
4. (OPTIONAL) `npm run db:seed` 
5. `npm run start:dev`

## first thoughts

- Node.js
- PM2/systemd for process management
  - can I calculate what PM2 does at the systemd level?
- Chef script to deploy this?
- Docker as well?
- Kubernetes research?
  - "Kubernetes is a container orchestration system for Docker containers that is more extensive than Docker Swarm and is meant to coordinate clusters of nodes at scale in production in an efficient manner. It works around the concept of pods, which are scheduling units (and can contain one or more containers) in the Kubernetes ecosystem, and they are distributed among nodes to provide high availability. One can easily run a Docker build on a Kubernetes cluster, but Kubernetes itself is not a complete solution and is meant to include custom plugins."

## getting persistent storage up and running using sqlite local file IO db



## phone call 2019-02-21 with Chris Tava

https://docs.google.com/document/d/1ycrZG3wXwfu-Qk-MnB4q2oCQWxhjZ07diKv9QXOG7JU/edit?usp=sharing

## Tempus labs notes

- 2015
- lab in Chicago
- 600 people in Chicago
- 30 in NYC
- Nova sequencers
- dye it
- tuber normal match
- 10 business days
- report and work with physician
- doctors in community based hospitals
- full stack engineers
- match doctors
- insurance claim information
- world's largest dataset
- Rush's melanoma tumor board meeting
  - medical oncology never seen mutation before
  - 800 other people having this problem
  - 39 patients and here's the treatment
- NYC node.js/mysql/postgres/React
- abstract data and route patients to clinical
- building reports
- NY is focused on clinical side but merging the two
- FlatIron help does similar
- Foundation medicine sequencing
- each quarter to look at competition
- typscript is a must here supposedly
- existing business and how do we move it forward
- like to change who works on what
- founder Groupon is the CEO of the company
- rotation is picking up abstraction work
- 200-300 people that use our software and all internal
- look at PDF that abstracts out and NLP engine
- FDA changing minds on everything
- 100 million dollars