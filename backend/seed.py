from .database import engine
from . import models

def seed():
    models.Base.metadata.create_all(bind=engine)
    print("Database tables created.")

if __name__ == '__main__':
    seed()
