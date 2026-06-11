import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getPatients, deletePatient } from '../services/api';

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const history = useHistory();

    const loadPatients = async () => {
        const data = await getPatients();
        setPatients(data);
    };

    useEffect(() => {
        loadPatients();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deletePatient(id);
            setPatients(patients.filter(patient => patient.id !== id));
        } catch (error) {
            console.error('Error deleting patient:', error);
        }
    };

    const handleEdit = (id) => {
        history.push(`/patients/${id}/edit`);
    };

    return (
        <div>
            <h2>Patient List</h2>
            <button onClick={() => history.push('/add-patient')}>Add New Patient</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>DOB</th>
                        <th>Glucose</th>
                        <th>Haemoglobin</th>
                        <th>Cholesterol</th>
                        <th>Remarks</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map(patient => (
                        <tr key={patient.id}>
                            <td>{patient.id}</td>
                            <td>{patient.full_name}</td>
                            <td>{patient.email}</td>
                            <td>{patient.dob}</td>
                            <td>{patient.glucose}</td>
                            <td>{patient.haemoglobin}</td>
                            <td>{patient.cholesterol}</td>
                            <td>{patient.remarks}</td>
                            <td>
                                <button onClick={() => handleEdit(patient.id)}>Edit</button>
                                <button onClick={() => handleDelete(patient.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PatientList;
