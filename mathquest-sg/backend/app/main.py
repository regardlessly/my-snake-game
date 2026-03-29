from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import dashboard, generate, health, tutor, verify, whatsapp
from app.services.dashboard_db import close_pool, init_pool


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup/shutdown lifecycle: manage the asyncpg connection pool."""
    await init_pool()
    yield
    await close_pool()


app = FastAPI(
    title="MathQuest SG Backend",
    description="AI tutoring + SymPy verification service",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(verify.router)
app.include_router(tutor.router)
app.include_router(generate.router)
app.include_router(dashboard.router)
app.include_router(whatsapp.router)
