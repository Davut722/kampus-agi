import os
import json
import random
from database import SessionLocal, University

# Jenerik yurt uretme listeleri
KYK_TYPES = ["Kız", "Erkek", "Karma"]
KYK_DISTANCES = ["Kampüs İçi", "Kampüse 500m", "Kampüse 1 km", "Kampüse 2 km", "Kampüse 3 km", "Kampüse 5 km", "Otobüsle 15 dk"]
KYK_FEES = ["Standart KYK Ücreti", "Burslu/Ücretsiz", "Yarı Özel KYK Ücreti"]

def generate_mock_kyk(uni_name):
    base_name = uni_name.replace("Üniversitesi", "").replace("Teknik", "").strip()
    
    # Her üniversite için rastgele 1 ila 4 yurt üret
    yurt_count = random.randint(1, 4)
    kyk_list = []
    
    for i in range(yurt_count):
        yurt_type = random.choice(KYK_TYPES)
        distance = random.choice(KYK_DISTANCES)
        fee = random.choice(KYK_FEES)
        capacity = random.randint(150, 1500)
        
        # Isimlendirme varyasyonları
        name_variations = [
            f"{base_name} Merkez KYK Yurdu",
            f"{base_name} {yurt_type} Öğrenci Yurdu",
            f"{base_name} Kampüs Yurdu",
            f"KYK {base_name} Bölge Yurdu"
        ]
        
        yurt_ad = random.choice(name_variations)
        
        kyk_list.append({
            "ad": yurt_ad,
            "tip": yurt_type,
            "mesafe": distance,
            "ucret": fee,
            "kapasite": f"{capacity} Kişi"
        })
        
    return kyk_list

def seed():
    db = SessionLocal()
    try:
        unis = db.query(University).all()
        updated = 0
        for uni in unis:
            # Her zaman yeniden yaz
            yurtlar = generate_mock_kyk(uni.name)
            uni.kyk_info = yurtlar
            updated += 1
                
        db.commit()
        print(f"[BASARILI] {updated} universitenin KYK bilgileri tahmini/jenerik verilerle dolduruldu.")
    except Exception as e:
        db.rollback()
        print("[HATA]", e)
    finally:
        db.close()

if __name__ == "__main__":
    seed()
