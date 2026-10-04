from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

database_catatan = []

class CatatanBaru(BaseModel):
    tugas: str
    selesai: bool = False

@app.get("/catatan")
def lihat_semua_catatan():
    return {"jumlah_catatan": 
    len(database_catatan), "data":
    database_catatan}

@app.post("/catatan")
def tambah_catatan(data:CatatanBaru):
    database_catatan.append(data)
    return {"pesan": "catatan berhasil ditambahkan!",
    "catatan_baru": data}

@app.delete("/catatan/hapus-semua")
def hapus_semua():
    database_catatan.clear()
    return {"pesan":"semua catatan sudah dihapus!"}
