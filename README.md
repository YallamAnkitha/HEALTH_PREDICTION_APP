# Health Prediction Application

This is a health prediction application that utilizes a backend built with Python and Flask, and a frontend developed with React. The application allows users to manage patient records and predict health conditions using AI/ML integration.

## Project Structure

```
health-prediction-app
├── backend
│   ├── app.py               # Entry point for the backend application
│   ├── models.py            # Data models for the application
│   ├── routes.py            # API route definitions for CRUD operations
│   ├── services.py          # Business logic for handling patient records
│   ├── ai_service.py        # Integration with AI/ML health prediction API
│   ├── database.py          # Database management and interactions
│   ├── config.py            # Configuration settings for the application
│   └── requirements.txt     # Python dependencies for the backend
├── frontend
│   ├── public
│   │   └── index.html       # Main HTML file for the frontend application
│   ├── src
│   │   ├── App.js           # Main component of the React application
│   │   ├── index.js         # Entry point for the React application
│   │   ├── components
│   │   │   ├── Dashboard.js  # Component for displaying patient records
│   │   │   ├── PatientForm.js # Form for adding/editing patient records
│   │   │   ├── PredictionCard.js # Displays prediction results
│   │   │   └── PatientList.js # Lists all patient records
│   │   ├── services
│   │   │   └── api.js       # Functions for making API calls to the backend
│   │   └── validation.js     # Input validation logic for the patient form
│   └── package.json         # Configuration file for npm
├── data
│   └── schema.sql           # SQL schema for setting up the database
├── .gitignore                # Files and directories to ignore by Git
└── README.md                 # Documentation for the project
```

## Features

- **CRUD Operations**: Create, Read, Update, and Delete patient records.
- **AI/ML Integration**: Predict health conditions based on patient data using an external API.
- **User Interface**: A responsive and user-friendly interface built with React.
- **Data Validation**: Ensures data integrity through input validation in forms.
- **Persistent Storage**: Patient records are stored in a database.

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd health-prediction-app
   ```

2. **Set up the backend**:
   - Navigate to the `backend` directory.
   - Create a virtual environment:
     ```
     python -m venv venv
     ```
   - Activate the virtual environment:
     - On Windows:
       ```
       venv\Scripts\activate
       ```
     - On macOS/Linux:
       ```
       source venv/bin/activate
       ```
   - Install the required dependencies:
     ```
     pip install -r requirements.txt
     ```

3. **Set up the database**:
   - Run the SQL schema to set up the database tables.

4. **Run the backend**:
   ```
   python app.py
   ```

5. **Set up the frontend**:
   - Navigate to the `frontend` directory.
   - Install the frontend dependencies:
     ```
     npm install
     ```
   - Start the frontend application:
     ```
     npm start
     ```

## Usage

- Access the frontend application in your web browser at `http://localhost:3000`.
- Use the interface to manage patient records and view health predictions.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License

This project is licensed under the MIT License.