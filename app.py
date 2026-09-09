from flask import Flask, send_from_directory
from pathlib import Path
import os

app = Flask(__name__)
BASE_DIR = Path(__file__).resolve().parent

@app.get("/")
def home():
    return send_from_directory(BASE_DIR, "index.html")

@app.get("/<path:filename>")
def files(filename):
    return send_from_directory(BASE_DIR, filename)

@app.get("/health")
def health():
    return {"status": "ok", "service": "MaaKaTiffin"}

if __name__ == "__main__":
    port = int(os.environ.get("PORT", "10000"))
    app.run(host="0.0.0.0", port=port)
