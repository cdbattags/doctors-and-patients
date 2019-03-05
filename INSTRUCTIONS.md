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