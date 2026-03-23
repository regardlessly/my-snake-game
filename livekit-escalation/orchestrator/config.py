from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # LiveKit
    livekit_url: str = "ws://localhost:7880"
    livekit_api_key: str = "caritahub_kiosk"
    livekit_api_secret: str = ""

    # Server (Railway provides PORT env var)
    escalation_host: str = "0.0.0.0"
    escalation_port: int = 8200
    port: int = 0  # Railway PORT override

    # Telegram
    telegram_bot_token: str = ""
    telegram_chat_id: str = ""

    # ClickHouse
    clickhouse_host: str = "localhost"
    clickhouse_port: int = 8123
    clickhouse_database: str = "cth_tzuchi_analytic"

    # Staff call page base URL (for Telegram links)
    staff_call_base_url: str = "http://localhost:8200"

    # TLS
    ssl_certfile: str = ""
    ssl_keyfile: str = ""

    # Timeouts
    call_timeout_seconds: int = 90

    model_config = {"env_file": ".env", "env_file_encoding": "utf-8"}


settings = Settings()
