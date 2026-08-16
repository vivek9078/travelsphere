from pydantic import BaseModel
from typing import List

class Weather(BaseModel):
    temperature: float
    condition: str
    humidity: float

class FAQ(BaseModel):
    question: str
    answer: str

class Destination(BaseModel):
    slug: str
    name: str
    countrySlug: str
    countryName: str
    heroImage: str
    gallery: List[str]
    overview: str
    highlights: List[str]
    topAttractions: List[str]
    thingsToDo: List[str]
    bestSeason: str
    tripDuration: str
    avgBudget: str
    priceFrom: float
    weather: Weather
    travelTips: List[str]
    safety: str
    rating: float
    reviewCount: int
    latitude: float
    longitude: float
    isFeatured: bool
    isTrending: bool
    isPopular: bool
    faqs: List[FAQ]
