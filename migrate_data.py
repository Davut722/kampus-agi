import json
import os
import sys

from database import SessionLocal, University, init_db

# Windows terminal UTF-8 print destegi
if sys.stdout and hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

def parse_js_data(filepath):
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
            # 'const NAME = { ... };' yapısından json datasını ayıkla
            json_str = content.split("=", 1)[1].strip().rstrip(";")
            return json.loads(json_str)
    except Exception as e:
        print(f"[ERROR] {filepath} okunamadı: {e}")
        return {}

def migrate():
    print("Veritabanı tabloları başlatılıyor...")
    init_db()
    
    print("Statik JS verileri okunuyor...")
    images_data = parse_js_data("js/uni_images_data.js")
    websites_data = parse_js_data("js/uni_websites_data.js")
    
    # Tüm üniversitelerin benzersiz isimlerini topla
    all_uni_names = set(images_data.keys()).union(set(websites_data.keys()))
    
    db = SessionLocal()
    try:
        created = 0
        updated = 0
        for name in all_uni_names:
            img_url = images_data.get(name, "")
            web_url = websites_data.get(name, "")
            
            record = db.query(University).filter(University.name == name).first()
            if record:
                record.image_url = img_url
                record.website_url = web_url
                updated += 1
            else:
                new_record = University(
                    name=name,
                    image_url=img_url,
                    website_url=web_url,
                    kyk_info=[]
                )
                db.add(new_record)
                created += 1
                
        db.commit()
        print(f"\n[BASARILI] Toplam {len(all_uni_names)} universite islendi.")
        print(f"  - Yeni olusturulan: {created}")
        print(f"  - Guncellenen: {updated}")
    except Exception as e:
        db.rollback()
        print(f"[ERROR] Veritabani hatasi: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    migrate()
