FROM python:3.11-bullseye
WORKDIR /app
ENV PYTHONPATH=/app

# Install system build deps required by some ML packages (faiss, numpy wheels, etc.)
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        build-essential \
        gcc \
        g++ \
        libopenblas-dev \
        libgomp1 \
        libatlas-base-dev && \
    rm -rf /var/lib/apt/lists/*

COPY ./requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r /app/requirements.txt --timeout 600
COPY . /app/backend
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
