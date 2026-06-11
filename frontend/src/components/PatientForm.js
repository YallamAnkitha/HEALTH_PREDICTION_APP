import React, { useState, useEffect } from 'react';
import validatePatientData from '../validation';
import { createPatient, updatePatient } from '../services/api';

const PatientForm = ({ patient, onSubmitSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        symptoms: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (patient) {
            setFormData({
                name: patient.name,
                age: patient.age,
                gender: patient.gender,
                symptoms: patient.symptoms,
            });
        }
    }, [patient]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validatePatientData(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            if (patient) {
                await updatePatient(patient.id, formData);
            } else {
                await createPatient(formData);
            }
            onSubmitSuccess();
        } catch (error) {
            console.error('Error saving patient data:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                {errors.name && <span>{errors.name}</span>}
            </div>
            <div>
                <label>Age:</label>
                <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                />
                {errors.age && <span>{errors.age}</span>}
            </div>
            <div>
                <label>Gender:</label>
                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                {errors.gender && <span>{errors.gender}</span>}
            </div>
            <div>
                <label>Symptoms:</label>
                <textarea
                    name="symptoms"
                    value={formData.symptoms}
                    onChange={handleChange}
                />
                {errors.symptoms && <span>{errors.symptoms}</span>}
            </div>
            <button type="submit">{patient ? 'Update Patient' : 'Add Patient'}</button>
        </form>
    );
};

export default PatientForm;