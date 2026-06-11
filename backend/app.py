from flask import Flask, jsonify
from flask_cors import CORS
from .database import init_db
from .routes import bp
def create_app():
    app = Flask(__name__)
    CORS(app)
    app.register_blueprint(bp)

    @app.route("/")
    def home():
        return jsonify({"message": "Health prediction backend is running"}), 200

    init_db()
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=True)