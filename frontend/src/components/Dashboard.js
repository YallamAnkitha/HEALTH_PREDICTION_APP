import React, { useEffect, useState } from 'react';
import { getPatients } from '../services/api';
import PatientList from './PatientList';
import PredictionCard from './PredictionCard';

const Dashboard = () => {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getPatients();
            setPatients(data);
        };
        fetchData();
    }, []);

    const handlePatientSelect = (patient) => {
        setSelectedPatient(patient);
    };

    return (
        <div className="dashboard">
            <h1>Health Prediction Dashboard</h1>
            <PatientList patients={patients} onPatientSelect={handlePatientSelect} />
            {selectedPatient && <PredictionCard patient={selectedPatient} />}
        </div>
    );
};

export default Dashboard;