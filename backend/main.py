import uvicorn
from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from auth import router as auth_router
from routers import laywer
app = FastAPI()
app.include_router(laywer.router)
# IMPORTANT for REACT app at port 3000
origins=["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# app.include_router(api.router)
app.include_router(auth_router.router)
@app.get("/")
def service_check():
    return Response("Service is running.")
if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)