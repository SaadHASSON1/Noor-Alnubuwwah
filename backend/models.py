from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, JSON
from sqlalchemy.orm import relationship
from database import Base

class Period(Base):
    __tablename__ = "periods"

    id = Column(Integer, primary_key=True, index=True)
    title_ar = Column(String, index=True)
    start_year = Column(String)
    end_year = Column(String)
    description_ar = Column(String)
    color_accent = Column(String)
    center_lng = Column(Float)
    center_lat = Column(Float)
    zoom_level = Column(Float)

    locations = relationship("Location", back_populates="period")
    events = relationship("Event", back_populates="period")
    routes = relationship("Route", back_populates="period")

class Location(Base):
    __tablename__ = "locations"

    id = Column(Integer, primary_key=True, index=True)
    name_ar = Column(String, index=True)
    longitude = Column(Float)
    latitude = Column(Float)
    period_id = Column(Integer, ForeignKey("periods.id"))
    type = Column(String) # city/battle/dawah/journey/mosque/mountain
    description_ar = Column(String)
    image_url = Column(String, nullable=True)
    is_approximate = Column(Boolean, default=False)
    source_reference = Column(String)

    period = relationship("Period", back_populates="locations")
    events = relationship("Event", back_populates="location")
    battle = relationship("Battle", back_populates="location", uselist=False)

class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    location_id = Column(Integer, ForeignKey("locations.id"), nullable=True)
    period_id = Column(Integer, ForeignKey("periods.id"))
    title_ar = Column(String, index=True)
    description_ar = Column(String)
    date_hijri = Column(String, nullable=True)
    date_ce = Column(String, nullable=True)
    source_reference = Column(String)

    period = relationship("Period", back_populates="events")
    location = relationship("Location", back_populates="events")
    hadiths = relationship("Hadith", back_populates="event")

class Hadith(Base):
    __tablename__ = "hadiths"

    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(Integer, ForeignKey("events.id"), nullable=True)
    text_ar = Column(String)
    source = Column(String)
    book = Column(String)
    hadith_number = Column(String)

    event = relationship("Event", back_populates="hadiths")

class Battle(Base):
    __tablename__ = "battles"

    id = Column(Integer, primary_key=True, index=True)
    location_id = Column(Integer, ForeignKey("locations.id"))
    muslim_count = Column(Integer)
    enemy_count = Column(Integer)
    muslim_commander = Column(String)
    enemy_commander = Column(String)
    outcome = Column(String)
    key_moments = Column(JSON)
    quran_verse = Column(String, nullable=True)
    quran_surah = Column(String, nullable=True)

    location = relationship("Location", back_populates="battle")

class Route(Base):
    __tablename__ = "routes"

    id = Column(Integer, primary_key=True, index=True)
    period_id = Column(Integer, ForeignKey("periods.id"))
    name_ar = Column(String)
    waypoints = Column(JSON) # Array of [lng, lat]
    color = Column(String)
    animated = Column(Boolean, default=True)

    period = relationship("Period", back_populates="routes")
