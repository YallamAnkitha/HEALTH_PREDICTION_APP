import sqlite3
from datetime import datetime
from .database import get_connection
from .ai_service import get_health_prediction

REQUIRED_FIELDS = [
    'full_name',
    'dob',
    'email',
    'glucose',
    'haemoglobin',
    'cholesterol',
]


def _row_to_dict(row):
    return {
        'id': row['id'],
        'full_name': row['full_name'],
        'dob': row['dob'],
        'email': row['email'],
        'glucose': row['glucose'],
        'haemoglobin': row['haemoglobin'],
        'cholesterol': row['cholesterol'],
        'remarks': row['remarks'],
        'created_at': row['created_at'],
        'updated_at': row['updated_at'],
    }


def _validate_patient_data(data):
    errors = {}
    for field in REQUIRED_FIELDS:
        if field not in data or data[field] is None or str(data[field]).strip() == '':
            errors[field] = f'{field.replace("_", " ").capitalize()} is required.'

    if 'glucose' in data:
        try:
            float(data['glucose'])
        except (ValueError, TypeError):
            errors['glucose'] = 'Glucose must be a number.'
    if 'haemoglobin' in data:
        try:
            float(data['haemoglobin'])
        except (ValueError, TypeError):
            errors['haemoglobin'] = 'Haemoglobin must be a number.'
    if 'cholesterol' in data:
        try:
            float(data['cholesterol'])
        except (ValueError, TypeError):
            errors['cholesterol'] = 'Cholesterol must be a number.'

    return errors


def create_patient(patient_data):
    errors = _validate_patient_data(patient_data)
    if errors:
        return None, errors

    remarks = get_health_prediction(
        patient_data.get('full_name'),
        float(patient_data.get('glucose', 0)),
        float(patient_data.get('haemoglobin', 0)),
        float(patient_data.get('cholesterol', 0)),
    )
    now = datetime.utcnow().isoformat()
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        """
        INSERT INTO patients (full_name, dob, email, glucose, haemoglobin, cholesterol, remarks, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            patient_data['full_name'].strip(),
            patient_data['dob'].strip(),
            patient_data['email'].strip(),
            float(patient_data['glucose']),
            float(patient_data['haemoglobin']),
            float(patient_data['cholesterol']),
            remarks,
            now,
            now,
        ),
    )
    conn.commit()
    patient_id = cursor.lastrowid
    conn.close()
    patient = get_patient(patient_id)
    return patient, None


def get_patient(patient_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM patients WHERE id = ?", (patient_id,))
    row = cursor.fetchone()
    conn.close()
    return _row_to_dict(row) if row else None


def update_patient(patient_id, updated_data):
    if not get_patient(patient_id):
        return None, None

    errors = _validate_patient_data(updated_data)
    if errors:
        return None, errors

    remarks = get_health_prediction(
        updated_data.get('full_name'),
        float(updated_data.get('glucose', 0)),
        float(updated_data.get('haemoglobin', 0)),
        float(updated_data.get('cholesterol', 0)),
    )
    now = datetime.utcnow().isoformat()
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        """
        UPDATE patients
        SET full_name = ?, dob = ?, email = ?, glucose = ?, haemoglobin = ?, cholesterol = ?, remarks = ?, updated_at = ?
        WHERE id = ?
        """,
        (
            updated_data['full_name'].strip(),
            updated_data['dob'].strip(),
            updated_data['email'].strip(),
            float(updated_data['glucose']),
            float(updated_data['haemoglobin']),
            float(updated_data['cholesterol']),
            remarks,
            now,
            patient_id,
        ),
    )
    conn.commit()
    conn.close()
    patient = get_patient(patient_id)
    return patient, None


def delete_patient(patient_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM patients WHERE id = ?", (patient_id,))
    conn.commit()
    conn.close()


def get_all_patients():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM patients ORDER BY created_at DESC")
    rows = cursor.fetchall()
    conn.close()
    return [_row_to_dict(row) for row in rows]
