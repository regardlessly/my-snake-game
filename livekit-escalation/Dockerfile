FROM python:3.12-slim

WORKDIR /app

# Install uv for fast dependency management
RUN pip install uv

# Copy project files
COPY pyproject.toml .
COPY orchestrator/ orchestrator/
COPY clients/ clients/
COPY static/ static/

# Install dependencies
RUN uv pip install --system -e .

# Railway provides PORT env var
ENV ESCALATION_HOST=0.0.0.0
ENV ESCALATION_PORT=8200

EXPOSE 8200

CMD ["python", "-m", "orchestrator.server"]
