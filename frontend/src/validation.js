function validatePatientData(patientData) {
    const errors = {};

    // Validate name
    if (!patientData.name || patientData.name.trim() === '') {
        errors.name = 'Name is required';
    }

    // Validate age
    if (!patientData.age || isNaN(patientData.age) || patientData.age <= 0) {
        errors.age = 'Age must be a positive number';
    }

    // Validate gender
    const validGenders = ['male', 'female', 'other'];
    if (!patientData.gender || !validGenders.includes(patientData.gender.toLowerCase())) {
        errors.gender = 'Gender must be male, female, or other';
    }

    // Validate symptoms
    if (!patientData.symptoms || patientData.symptoms.length === 0) {
        errors.symptoms = 'At least one symptom is required';
    }

    // Validate contact information
    if (!patientData.contact || !/^\d{10}$/.test(patientData.contact)) {
        errors.contact = 'Contact number must be a 10-digit number';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}

export default validatePatientData;