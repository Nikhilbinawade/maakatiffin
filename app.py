from flask import Flask, send_from_directory, jsonify
from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent
app = Flask(__name__, static_folder=str(BASE_DIR), static_url_path="")

@app.get("/")
def home():
    return send_from_directory(BASE_DIR, "index.html")

@app.get("/health")
def health():
    return jsonify({"status": "ok", "service": "MaakaTiffin"})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)
