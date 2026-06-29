# XLSX-Konverter für die MVP2-Interim-App

## Zweck

`xlsx_to_csv.py` wandelt SharePoint-/Excel-Lieferungen in semikolongetrennte UTF-8-CSV-Dateien um, die anschließend in der lokalen Browser-App hochgeladen werden können.

## Voraussetzungen

- Python 3.x
- `openpyxl` (`python -m pip install openpyxl`)

Auf diesem Rechner wurde `openpyxl` bereits installiert.

## Nutzung per Doppelklick

`convert-xlsx-to-csv.cmd` starten. Ohne Parameter öffnet sich eine Dateiauswahl. Standardmäßig wird das Sheet `MVP` verwendet, falls vorhanden; sonst das erste Sheet.

## Nutzung per Kommandozeile

```powershell
C:\Users\A7577402\AppData\Local\Python\bin\python.exe xlsx_to_csv.py "C:\Pfad\Quelle.xlsx" --sheet MVP --out "C:\Pfad\quelle.csv"
```

Sheets anzeigen:

```powershell
C:\Users\A7577402\AppData\Local\Python\bin\python.exe xlsx_to_csv.py --list-sheets "C:\Pfad\Quelle.xlsx"
```

Bei komplexen Excel-Dateien mit mehrstufigen Kopfzeilen kann die Kopfzeile explizit gesetzt werden:

```powershell
C:\Users\A7577402\AppData\Local\Python\bin\python.exe xlsx_to_csv.py "C:\Pfad\Quelle.xlsx" --sheet MVP --header-row 22
```

## Hinweis

Der Konverter ist bewusst generisch: er erhält Spalten und Zeilen der Quelle und normalisiert nur einfache bekannte Feldnamen wie `Projekt_ID`, `HC Ist`, `Cash-In Ist`, `IPF` usw. Die fachliche Harmonisierung erfolgt anschließend in der Interim-App bzw. später in der produktiven IT-Lösung.
