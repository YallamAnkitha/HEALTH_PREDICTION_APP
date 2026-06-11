import axios from 'axios';

const API_URL = 'http://localhost:5000/api/patients';

export const getPatients = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching patients:', error);
        throw error;
    }
};

export const getPatientById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching patient with id ${id}:`, error);
        throw error;
    }
};

export const createPatient = async (patientData) => {
    try {
        const response = await axios.post(API_URL, patientData);
        return response.data;
    } catch (error) {
        console.error('Error creating patient:', error);
        throw error;
    }
};

export const updatePatient = async (id, patientData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, patientData);
        return response.data;
    } catch (error) {
        console.error(`Error updating patient with id ${id}:`, error);
        throw error;
    }
};

export const deletePatient = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error(`Error deleting patient with id ${id}:`, error);
        throw error;
    }
};