from flask import Blueprint, jsonify, request
from .services import create_patient, get_all_patients, get_patient, update_patient, delete_patient

bp = Blueprint("api", __name__, url_prefix="/api")

@bp.route("/patients", methods=["GET"])
def list_patients():
    return jsonify(get_all_patients()), 200

@bp.route("/patients/<int:patient_id>", methods=["GET"])
def fetch_patient(patient_id):
    patient = get_patient(patient_id)
    if not patient:
        return jsonify({"message": "Patient not found"}), 404
    return jsonify(patient), 200

@bp.route("/patients", methods=["POST"])
def add_patient():
    data = request.get_json() or {}
    patient, errors = create_patient(data)
    if errors:
        return jsonify({"errors": errors}), 400
    return jsonify(patient), 201

@bp.route("/patients/<int:patient_id>", methods=["PUT"])
def edit_patient(patient_id):
    data = request.get_json() or {}
    patient, errors = update_patient(patient_id, data)
    if errors:
        return jsonify({"errors": errors}), 400
    if not patient:
        return jsonify({"message": "Patient not found"}), 404
    return jsonify(patient), 200

@bp.route("/patients/<int:patient_id>", methods=["DELETE"])
def remove_patient(patient_id):
    if not get_patient(patient_id):
        return jsonify({"message": "Patient not found"}), 404
    delete_patient(patient_id)
    return jsonify({"message": "Patient deleted"}), 200