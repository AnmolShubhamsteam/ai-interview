try:
    from pydantic_settings import BaseSettings
except ImportError:  # Pydantic <2
    from pydantic import BaseSettings

class Settings(BaseSettings):
    gemini_api_key: str
    secret_key: str = "secret"

    class Config:
        env_file = '.env'

def get_settings() -> Settings:
    return Settings()
