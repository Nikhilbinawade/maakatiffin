import os
from datetime import date
from fastapi import FastAPI
from fastapi.responses import HTMLResponse

app = FastAPI(title="MaaKaTiffin Production Starter")

@app.get("/", response_class=HTMLResponse)
def home():
    return """
    <html><body style="font-family:Arial;padding:40px">
    <h1>🍱 MaaKaTiffin</h1>
    <p>Production server is running.</p>
    <p>Next: connect PostgreSQL, authentication, GPS and Razorpay.</p>
    </body></html>
    """

@app.get("/health")
def health():
    return {"status":"ok","service":"maakatiffin"}
