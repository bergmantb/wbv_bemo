# E2E Fördermonitoring - MVP2 only

Dieses Paket enthält die MVP2-Artefakte für das Realisierungsmonitoring nach Zuschlag und Vertragsschluss. MVP1 / Angebotsphase / Win-Loss ist bewusst out of scope.

## Artefakte

- [Solutiondesign HTML für Confluence](docs/solutiondesign-confluence.html)
- [Solutiondesign](docs/solutiondesign.md)
- [Jira Work-Break-Down](docs/jira-work-breakdown.md)
- [Langfrist-Jira-Ticket Fördermonitoring/Risikomanagement](docs/jira-longterm-it-ticket.md)
- [Klickdummy MVP2](clickdummy/index.html)
- [Interim-App für lokale Dateilieferungen](interim-app/index.html)
- [Windows-Startdatei Interim-App](interim-app/start-interim-app.cmd)
- [Beispiel-CSV für Upload/Test](interim-app/sample-data/foerdermonitoring_mvp2_sample.csv)
- [XLSX-Konverter](interim-app/tools/xlsx_to_csv.py)
- [Windows-Startdatei XLSX-Konverter](interim-app/tools/convert-xlsx-to-csv.cmd)

## Shortterm / Interim

Die Interim-App läuft lokal im Browser und verarbeitet SharePoint-Dateilieferungen als CSV, TSV oder JSON. XLSX-Dateien sollen für die lokale HTML-Variante als CSV exportiert werden. Die App harmonisiert die gelieferten Quellen, rendert MVP2-Dashboards, zeigt Risikoanalyse und erzeugt einen Excel-kompatiblen CSV-Report.

## Longterm

Die langfristige IT-Lösung soll die Datenquellen nativ anbinden, historisieren, qualitätssichern und in ein produktives Fördermonitoring/Risikomanagement überführen. Die fachliche Ticketbeschreibung liegt unter `docs/jira-longterm-it-ticket.md`.



## XLSX-Konverter

Der Konverter unter `interim-app/tools` wandelt XLSX/XLSM-Dateien in semikolongetrennte UTF-8-CSV-Dateien um. Ohne Parameter öffnet `convert-xlsx-to-csv.cmd` eine Dateiauswahl. Per Kommandozeile kann ein Sheet und bei komplexen Excel-Dateien eine Kopfzeile angegeben werden:

```powershell
C:\Users\A7577402\AppData\Local\Python\bin\python.exe foerdermonitoring-mvp2\interim-app\tools\xlsx_to_csv.py "C:\Pfad\Quelle.xlsx" --sheet MVP --header-row 22 --out "C:\Pfad\quelle.csv"
```

Die erzeugte CSV kann anschließend in der Interim-App hochgeladen werden.
