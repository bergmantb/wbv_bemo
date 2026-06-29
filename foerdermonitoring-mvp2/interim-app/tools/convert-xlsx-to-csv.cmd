@echo off
set "PY=C:\Users\A7577402\AppData\Local\Python\bin\python.exe"
if not exist "%PY%" set "PY=python"
"%PY%" "%~dp0xlsx_to_csv.py" %*
pause
