import json
from sqlalchemy.orm import Session
from database import engine, SessionLocal
import models

models.Base.metadata.create_all(bind=engine)

def seed():
    db = SessionLocal()
    
    # Check if we already have data
    if db.query(models.Period).first():
        print("Data already seeded.")
        return

    periods_data = [
        {"title_ar": "المولد والطفولة", "start_year": "570", "end_year": "583", "description_ar": "فترة مولد النبي ﷺ ونشأته في مكة ورضاعته في بني سعد.", "color_accent": "#C9A84C", "center_lng": 39.8579, "center_lat": 21.3891, "zoom_level": 12},
        {"title_ar": "الشباب والتجارة", "start_year": "583", "end_year": "610", "description_ar": "رحلاته التجارية وزواجه من خديجة رضي الله عنها ومشاركته في حلف الفضول.", "color_accent": "#A38038", "center_lng": 39.8579, "center_lat": 21.3891, "zoom_level": 10},
        {"title_ar": "بداية الوحي", "start_year": "610", "end_year": "613", "description_ar": "نزول الوحي في غار حراء وبداية الدعوة السرية.", "color_accent": "#8A9A5B", "center_lng": 39.8614, "center_lat": 21.4575, "zoom_level": 14},
        {"title_ar": "الدعوة الجهرية", "start_year": "613", "end_year": "619", "description_ar": "الجهر بالدعوة، وما لاقاه المسلمون من أذى قريش وهجرة الحبشة.", "color_accent": "#6B8E23", "center_lng": 39.8579, "center_lat": 21.3891, "zoom_level": 13},
        {"title_ar": "عام الحزن والإسراء", "start_year": "619", "end_year": "620", "description_ar": "وفاة خديجة وأبو طالب، ورحلة الطائف، ثم رحلة الإسراء والمعراج.", "color_accent": "#4B5320", "center_lng": 40.4168, "center_lat": 21.2703, "zoom_level": 11},
        {"title_ar": "الهجرة النبوية", "start_year": "622", "end_year": "622", "description_ar": "الهجرة من مكة إلى المدينة والمبيت في غار ثور.", "color_accent": "#1B4332", "center_lng": 39.6142, "center_lat": 24.4672, "zoom_level": 8},
        {"title_ar": "بناء دولة الإسلام", "start_year": "622", "end_year": "624", "description_ar": "بناء المسجد النبوي، المؤاخاة بين المهاجرين والأنصار، ووضع وثيقة المدينة.", "color_accent": "#2D6A4F", "center_lng": 39.6142, "center_lat": 24.4672, "zoom_level": 13},
        {"title_ar": "الغزوات الكبرى", "start_year": "624", "end_year": "630", "description_ar": "غزوات بدر، أحد، الخندق، وصلح الحديبية.", "color_accent": "#40916C", "center_lng": 38.7833, "center_lat": 23.7333, "zoom_level": 7},
        {"title_ar": "فتح مكة المكرمة", "start_year": "630", "end_year": "630", "description_ar": "دخول مكة فاتحاً وتطهير الكعبة من الأصنام.", "color_accent": "#52B788", "center_lng": 39.8579, "center_lat": 21.3891, "zoom_level": 14},
        {"title_ar": "حجة الوداع والوفاة", "start_year": "632", "end_year": "632", "description_ar": "حجة الوداع، وخطبة عرفات، ثم وفاة النبي ﷺ.", "color_accent": "#74C69D", "center_lng": 39.9842, "center_lat": 21.3547, "zoom_level": 12},
    ]

    for p_data in periods_data:
        db.add(models.Period(**p_data))
    
    db.commit()

    p_birth = db.query(models.Period).filter_by(title_ar="المولد والطفولة").first()
    p_wahi = db.query(models.Period).filter_by(title_ar="بداية الوحي").first()
    p_battles = db.query(models.Period).filter_by(title_ar="الغزوات الكبرى").first()

    locations_data = [
        {
            "name_ar": "الكعبة المشرفة", "longitude": 39.8262, "latitude": 21.4225, "period_id": p_birth.id,
            "type": "mosque", "description_ar": "مركز مكة المكرمة وأول بيت وضع للناس.", "is_approximate": False,
            "source_reference": "أطلس السيرة النبوية ص 40"
        },
        {
            "name_ar": "غار حراء", "longitude": 39.8614, "latitude": 21.4575, "period_id": p_wahi.id,
            "type": "mountain", "description_ar": "الغار الذي كان يتعبد فيه النبي ﷺ وفيه نزل الوحي أول مرة.", "is_approximate": False,
            "source_reference": "الرحيق المختوم ص 65"
        },
        {
            "name_ar": "بدر", "longitude": 38.7833, "latitude": 23.7333, "period_id": p_battles.id,
            "type": "battle", "description_ar": "موقع أول غزوة كبرى في الإسلام.", "is_approximate": False,
            "source_reference": "سيرة ابن هشام 1/606"
        },
        {
            "name_ar": "جبل أحد", "longitude": 39.5667, "latitude": 24.5101, "period_id": p_battles.id,
            "type": "battle", "description_ar": "موقع غزوة أحد.", "is_approximate": False,
            "source_reference": "الرحيق المختوم ص 230"
        }
    ]

    for l_data in locations_data:
        db.add(models.Location(**l_data))
    
    db.commit()

    loc_badr = db.query(models.Location).filter_by(name_ar="بدر").first()
    
    if loc_badr:
        battle_badr = models.Battle(
            location_id=loc_badr.id,
            muslim_count=313,
            enemy_count=1000,
            muslim_commander="محمد ﷺ",
            enemy_commander="أبو جهل",
            outcome="انتصار المسلمين",
            key_moments=[
                {"time": "08:00", "description": "المبارزة الفردية"},
                {"time": "10:00", "description": "الهجوم العام"},
                {"time": "14:00", "description": "هزيمة المشركين وهروبهم"}
            ],
            quran_verse="وَلَقَدْ نَصَرَكُمُ اللَّهُ بِبَدْرٍ وَأَنتُمْ أَذِلَّةٌ",
            quran_surah="آل عمران"
        )
        db.add(battle_badr)

    loc_uhud = db.query(models.Location).filter_by(name_ar="جبل أحد").first()
    
    if loc_uhud:
        battle_uhud = models.Battle(
            location_id=loc_uhud.id,
            muslim_count=700,
            enemy_count=3000,
            muslim_commander="محمد ﷺ",
            enemy_commander="أبو سفيان",
            outcome="خسارة المسلمين نتيجة مخالفة الرماة",
            key_moments=[
                {"time": "07:00", "description": "بداية المعركة وتفوق المسلمين"},
                {"time": "09:00", "description": "نزول الرماة من الجبل"},
                {"time": "10:00", "description": "التفاف خالد بن الوليد"}
            ],
            quran_verse="وَلَقَدْ صَدَقَكُمُ اللَّهُ وَعْدَهُ إِذْ تَحُسُّونَهُم بِإِذْنِهِ",
            quran_surah="آل عمران"
        )
        db.add(battle_uhud)

    db.commit()
    print("Database seeded successfully.")
    db.close()

if __name__ == "__main__":
    seed()
