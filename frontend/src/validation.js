function validatePatientData(patientData) {
    const errors = {};

    if (!patientData.full_name || patientData.full_name.trim() === '') {
        errors.full_name = 'Full name is required.';
    }

    if (!patientData.dob || isNaN(Date.parse(patientData.dob))) {
        errors.dob = 'Date of birth must be a valid date.';
    } else if (new Date(patientData.dob) > new Date()) {
        errors.dob = 'Date of birth cannot be in the future.';
    }

    if (!patientData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(patientData.email)) {
        errors.email = 'A valid email address is required.';
    }

    if (patientData.glucose === undefined || patientData.glucose === '' || isNaN(patientData.glucose)) {
        errors.glucose = 'Glucose must be a number.';
    }

    if (patientData.haemoglobin === undefined || patientData.haemoglobin === '' || isNaN(patientData.haemoglobin)) {
        errors.haemoglobin = 'Haemoglobin must be a number.';
    }

    if (patientData.cholesterol === undefined || patientData.cholesterol === '' || isNaN(patientData.cholesterol)) {
        errors.cholesterol = 'Cholesterol must be a number.';
    }

    return errors;
}

export default validatePatientData;