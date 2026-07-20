try:
    from pydantic_settings import BaseSettings
except ImportError:  # pragma: no cover - fallback for older environments
    from pydantic import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "BridgeCare AI"
    DATABASE_URL: str = "sqlite:///./data.db"
    SECRET_KEY: str = "changeme"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7

    class Config:
        env_file = ".env"


settings = Settings()
