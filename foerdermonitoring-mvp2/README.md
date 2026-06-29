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

## Shortterm / Interim

Die Interim-App läuft lokal im Browser und verarbeitet SharePoint-Dateilieferungen als CSV, TSV oder JSON. XLSX-Dateien sollen für die lokale HTML-Variante als CSV exportiert werden. Die App harmonisiert die gelieferten Quellen, rendert MVP2-Dashboards, zeigt Risikoanalyse und erzeugt einen Excel-kompatiblen CSV-Report.

## Longterm

Die langfristige IT-Lösung soll die Datenquellen nativ anbinden, historisieren, qualitätssichern und in ein produktives Fördermonitoring/Risikomanagement überführen. Die fachliche Ticketbeschreibung liegt unter `docs/jira-longterm-it-ticket.md`.


