from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class HadithBase(BaseModel):
    text_ar: str
    source: str
    book: str
    hadith_number: str

class HadithResponse(HadithBase):
    id: int
    class Config:
        from_attributes = True

class RouteBase(BaseModel):
    name_ar: str
    waypoints: List[List[float]]
    color: str
    animated: bool

class RouteResponse(RouteBase):
    id: int
    class Config:
        from_attributes = True

class BattleBase(BaseModel):
    muslim_count: int
    enemy_count: int
    muslim_commander: str
    enemy_commander: str
    outcome: str
    key_moments: List[Dict[str, Any]]
    quran_verse: Optional[str] = None
    quran_surah: Optional[str] = None

class BattleResponse(BattleBase):
    id: int
    class Config:
        from_attributes = True

class EventBase(BaseModel):
    title_ar: str
    description_ar: str
    date_hijri: Optional[str] = None
    date_ce: Optional[str] = None
    source_reference: str

class EventResponse(EventBase):
    id: int
    location_id: Optional[int] = None
    hadiths: List[HadithResponse] = []
    class Config:
        from_attributes = True

class LocationBase(BaseModel):
    name_ar: str
    longitude: float
    latitude: float
    type: str
    description_ar: str
    image_url: Optional[str] = None
    is_approximate: bool
    source_reference: str

class LocationResponse(LocationBase):
    id: int
    period_id: int
    events: List[EventResponse] = []
    battle: Optional[BattleResponse] = None
    class Config:
        from_attributes = True

class PeriodBase(BaseModel):
    title_ar: str
    start_year: str
    end_year: str
    description_ar: str
    color_accent: str
    center_lng: float
    center_lat: float
    zoom_level: float

class PeriodResponse(PeriodBase):
    id: int
    locations: List[LocationResponse] = []
    events: List[EventResponse] = []
    routes: List[RouteResponse] = []
    class Config:
        from_attributes = True
