import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import validatePatientData from '../validation';
import { createPatient, updatePatient, getPatientById } from '../services/api';

const PatientForm = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        dob: '',
        email: '',
        glucose: '',
        haemoglobin: '',
        cholesterol: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        const loadPatient = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const patient = await getPatientById(id);
                setFormData({
                    full_name: patient.full_name || '',
                    dob: patient.dob || '',
                    email: patient.email || '',
                    glucose: patient.glucose || '',
                    haemoglobin: patient.haemoglobin || '',
                    cholesterol: patient.cholesterol || '',
                });
            } catch (error) {
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };

        loadPatient();
    }, [id]);

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
            if (id) {
                await updatePatient(id, formData);
            } else {
                await createPatient(formData);
            }
            history.push('/patients');
        } catch (error) {
            console.error('Error saving patient data:', error);
        }
    };

    if (loading) {
        return <div>Loading patient data...</div>;
    }

    if (notFound) {
        return <div>Patient not found.</div>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Full Name:</label>
                <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                />
                {errors.full_name && <span>{errors.full_name}</span>}
            </div>
            <div>
                <label>Date of Birth:</label>
                <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                />
                {errors.dob && <span>{errors.dob}</span>}
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <span>{errors.email}</span>}
            </div>
            <div>
                <label>Glucose:</label>
                <input
                    type="number"
                    name="glucose"
                    value={formData.glucose}
                    onChange={handleChange}
                />
                {errors.glucose && <span>{errors.glucose}</span>}
            </div>
            <div>
                <label>Haemoglobin:</label>
                <input
                    type="number"
                    name="haemoglobin"
                    value={formData.haemoglobin}
                    onChange={handleChange}
                />
                {errors.haemoglobin && <span>{errors.haemoglobin}</span>}
            </div>
            <div>
                <label>Cholesterol:</label>
                <input
                    type="number"
                    name="cholesterol"
                    value={formData.cholesterol}
                    onChange={handleChange}
                />
                {errors.cholesterol && <span>{errors.cholesterol}</span>}
            </div>
            <button type="submit">{id ? 'Update Patient' : 'Add Patient'}</button>
        </form>
    );
};

export default PatientForm;
