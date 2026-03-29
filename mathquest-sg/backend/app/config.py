from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    aws_region: str = "us-east-1"
    aws_access_key_id: str = ""
    aws_secret_access_key: str = ""
    redis_url: str = "redis://localhost:6379"
    cors_origins: list[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:5174",
    ]
    debug: bool = True

    # Dashboard & WhatsApp
    admin_pin: str = "1234"
    whatsapp_bridge_url: str = "http://localhost:3001"
    bridge_secret: str = "mathquest-bridge-secret"
    database_url: str = "postgresql://mathquest:mathquest@localhost:5432/mathquest"

    model_config = {"env_file": "../.env.local", "extra": "ignore"}


settings = Settings()
