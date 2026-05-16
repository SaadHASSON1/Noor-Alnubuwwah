from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

import models
import schemas
from database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Noor Al-Nubuwwah API", description="API for Prophet Muhammad Interactive Map", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/periods", response_model=List[schemas.PeriodResponse])
def read_periods(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    periods = db.query(models.Period).offset(skip).limit(limit).all()
    return periods

@app.get("/api/periods/{period_id}", response_model=schemas.PeriodResponse)
def read_period(period_id: int, db: Session = Depends(get_db)):
    period = db.query(models.Period).filter(models.Period.id == period_id).first()
    if period is None:
        raise HTTPException(status_code=404, detail="Period not found")
    return period

@app.get("/api/locations/{location_id}", response_model=schemas.LocationResponse)
def read_location(location_id: int, db: Session = Depends(get_db)):
    location = db.query(models.Location).filter(models.Location.id == location_id).first()
    if location is None:
        raise HTTPException(status_code=404, detail="Location not found")
    return location

@app.get("/api/battles/{battle_id}", response_model=schemas.BattleResponse)
def read_battle(battle_id: int, db: Session = Depends(get_db)):
    battle = db.query(models.Battle).filter(models.Battle.id == battle_id).first()
    if battle is None:
        raise HTTPException(status_code=404, detail="Battle not found")
    return battle

@app.get("/api/search", response_model=List[schemas.LocationResponse])
def search_locations(query: str, db: Session = Depends(get_db)):
    locations = db.query(models.Location).filter(models.Location.name_ar.contains(query)).all()
    return locations

@app.get("/")
def read_root():
    return {"message": "Welcome to Noor Al-Nubuwwah API"}
