import React, { useEffect, useState } from 'react';
import { getPatients, deletePatient } from '../services/api';

const PatientList = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getPatients();
            setPatients(data);
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        await deletePatient(id);
        setPatients(patients.filter(patient => patient.id !== id));
    };

    return (
        <div>
            <h2>Patient List</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map(patient => (
                        <tr key={patient.id}>
                            <td>{patient.id}</td>
                            <td>{patient.name}</td>
                            <td>{patient.age}</td>
                            <td>
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