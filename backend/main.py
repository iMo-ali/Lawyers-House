import uvicorn
from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from auth import router as auth_router
from routers import laywer
from routers.staff import staff_router
from routers.client import clients_router
from routers.case import cases_router
app = FastAPI()
app.include_router(laywer.router)
app.include_router(staff_router)
app.include_router(clients_router)
app.include_router(auth_router.router)
app.include_router(cases_router)
# IMPORTANT for REACT app at port 3000
origins=["http://localhost:3000",
         "localhost:3000",
         "http://0.0.0.0:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Set-Cookie"], 
)
# app.include_router(api.router)
@app.get("/")
def service_check():
    return Response("Service is running.")
if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)