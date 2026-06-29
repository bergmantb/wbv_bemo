# Jira-Ticket: Produktive IT-Lösung Fördermonitoring & Risikoanalyse MVP2

## Ticket-Typ
Epic / Capability für IT-Priorisierung

## Kurzbeschreibung
Als Bereich FRG benötigen wir eine produktive IT-Lösung für das MVP2-Fördermonitoring und die Risikoanalyse nach Zuschlag und Vertragsschluss. Die Lösung soll heterogene Quellen nativ anbinden, Daten validieren, harmonisieren, historisieren und daraus Managementreports, Reports on demand sowie Risikobewertungen entlang einer einheitlichen Bewertungslogik erzeugen.

## Fachlicher Scope
In Scope ist die E2E-Transparenz ab Realisierungsbeauftragung über Rollout, Dokumentation, Fördermittelabrechnung und Cash-In. MVP1 / Angebotsphase / Win-Loss-Analyse ist explizit out of scope.

FRG identifiziert Risiken, bewertet Auswirkungen und schafft Managementtransparenz. FRG übernimmt keine operative Rolloutsteuerung und keine Verantwortung für Forecast-Erstellung oder Maßnahmenumsetzung. Forecast und IPF dienen ausschließlich als Referenzwerte zur Risikoabschätzung.

## Datenquellen gemäß Zielbild

| Quelle / Lieferant | Systeme / Dateien | Zweck im Fördermonitoring | Datenverantwortung |
| --- | --- | --- | --- |
| FNES Control Tower | GGS, Digi B, PSL, Celonis | Rollout-Ist, Status, operative Ablieferung | FNES |
| FNES Reporting | ODE, Micro Strategy, WFMT, PUMA | Meilensteine, Gebiets-/Bauinformationen, operative Kennzahlen | FNES |
| FRG VRT-Monitor | VRT-Monitor | Förder-/Vertragskontext, Risikohinweise, Monitoringreferenz | FRG |
| FRG Vertrags-/Abrechnungssysteme | WFS, PFAU | Vertrag, Los, Bautranche, abrechenbare Adressen, Abrechnung | FRG / Systemowner |
| FRG Bestand / Altreports | ANKE, Bid Database | Referenz- und Stammdaten, Übergangsdaten | FRG |
| JVK | GFPlus-Steuerungsdatei | GFPlus-Managementsicht; Qualität verbleibt bei JVK | JVK |
| Referenzwerte | IPF, Forecast | Abgleichs-/Risikoreferenz für Cash-In und Ablieferung | Finance / FNES / jeweiliger Planowner |

## Zielbild Datenverarbeitung

1. Datenlieferung bzw. Schnittstellenanbindung der Quellen.
2. Datenvalidierung auf Pflichtfelder, Datentypen, Vollständigkeit, Dubletten, Stichtag und Schlüsselqualität.
3. Harmonisierung auf ein einheitliches Dimensionsmodell: Projekt, Ausbautreiber, Vertrag, Los, Bautranche, Kommune/Gebiet, Förderprogramm, Monat/Stichtag.
4. Qualitätssicherung inklusive Ladeprotokoll, Fehlerliste und fachlicher Owner-Zuordnung.
5. Konsolidierung in einen historisierten Fördermonitoring-Datenbestand.
6. Referenzabgleich gegen IPF und Forecast ohne Übernahme der Planungsverantwortung durch FRG.
7. Analysebausteine: Ist-Abgleich, Abweichungsanalyse, Risikobewertung, Priorisierung.
8. Management Reporting: Cash-In, Rollout-Ablieferung HP/BP/HC, kritische Projekte, Management Summary.

## User Stories

### Story 1: Native Quellintegration
Als Solutiondesigner möchte ich die relevanten Quellen gemäß Datenquellenliste automatisiert anbinden, damit manuelle SharePoint-Dateilieferungen perspektivisch abgelöst werden.

Akzeptanzkriterien:
- Für jede Quelle sind Schnittstellentyp, technischer Owner, fachlicher Owner, Aktualisierungsfrequenz und SLA dokumentiert.
- Die Lösung kann initial mindestens SharePoint-Dateilieferungen verarbeiten und ist fachlich auf native Schnittstellen erweiterbar.
- Ladezeitpunkt, Datenstand und Datei-/Schnittstellenherkunft werden historisiert.

### Story 2: Einheitliches Datenmodell MVP2
Als FRG-Nutzer möchte ich alle Quellen auf gemeinsame Dimensionen harmonisieren, damit Reports über Vertrag, Los, Bautranche, Gebiet, Ausbautreiber und Monat konsistent funktionieren.

Akzeptanzkriterien:
- Einheitliche Schlüssel- und Mappinglogik für Projekt, Vertrag, Los, Bautranche und Gebiet ist implementiert.
- TDG Deckungslücke, TDG BeMo und GFPlus können getrennt und aggregiert ausgewertet werden.
- GFPlus-Daten werden integrierbar dargestellt, Datenqualität und Verantwortung verbleiben aber bei JVK.

### Story 3: Datenqualität und Governance
Als FRG möchte ich Datenqualität transparent sehen, damit Risiken aus echten Abweichungen von Risiken aus Datenproblemen getrennt werden können.

Akzeptanzkriterien:
- Pflichtfeldprüfung, Datentypprüfung, Dublettenprüfung, Stichtagsprüfung und Schlüsselprüfung sind implementiert.
- Fehler werden Quelle, Owner, Projekt und Schweregrad zugeordnet.
- Es gibt ein Ladeprotokoll und eine Klärliste für Datenqualitätsprobleme.

### Story 4: Risikoanalyse und Bewertungslogik
Als Management möchte ich kritische Projekte priorisiert sehen, damit Entscheidungen auf Basis einer einheitlichen Risikologik getroffen werden können.

Akzeptanzkriterien:
- Risiken werden aus Cash-In-Abweichung, Rollout-Abweichung, Abrechenbarkeitslücke, Datenqualität und kritischen Statusmeldungen berechnet.
- Risikostufen mindestens: niedrig, mittel, hoch.
- Jede Risikobewertung ist mit Ursache, Quelle, Stichtag und betroffener Dimension nachvollziehbar.
- Die operative Mitigation wird nicht in FRG verankert; die Lösung zeigt Owner und Eskalationsbedarf.

### Story 5: Management Reporting und Reports on Demand
Als Stakeholder möchte ich adressatengerechte Reports abrufen, damit Management, FRG, FNES und Finance jeweils den passenden Detailgrad erhalten.

Akzeptanzkriterien:
- Management Summary für aggregierte Jahressicht: Cash-In, Rollout HP/BP/HC, Risikoabschätzung Ablieferung TDG-Förderung.
- FRG-Monatssicht mit kritischen Projekten, Monatsscheibe und Risikoentwicklung.
- FNES-Detailansicht auf Gebietsebene für Abstimmungen.
- Finance-Sicht mit Prognose auf Einhaltung IPF.
- Export als Excel/CSV und optional PDF ist möglich.

### Story 6: Historisierung und Auditierbarkeit
Als Fachbereich möchte ich Monatsstände reproduzieren, damit Managementreports und Abweichungen revisionssicher nachvollziehbar bleiben.

Akzeptanzkriterien:
- Jeder Datenstand wird mit Stichtag, Ladezeitpunkt und Quelle gespeichert.
- Historische Reports können reproduziert werden.
- Änderungen an Bewertungslogik und Datenmapping werden versioniert.

## Nicht-funktionale Anforderungen

- Rollen- und Berechtigungskonzept für FRG, FNES, JVK, Finance und Management.
- Datenschutz- und Informationsschutzprüfung für SharePoint-/Systemdaten.
- Performance für Portfolio-, Projekt- und Gebietssichten.
- Betriebskonzept mit Monitoring für Schnittstellenläufe und Fehlerfälle.
- Erweiterbarkeit für spätere Automatisierung Subsidy Control Tower 2027.

## Offene Entscheidungen

- Governance: Wer verantwortet operative Risikomitigation nach FRG-Risikoanzeige?
- Scope: Kurzfristig TDG, perspektivisch Gesamtförderung inklusive GFPlus mit klarer Rollentrennung?
- Datenqualität JVK: Wie werden GFPlus-Daten integriert, ohne Verantwortlichkeit von JVK auf FRG zu verschieben?
- Reportingstandard: Welcher Detailgrad ist für Salacki, FRG, FNES und Finance verbindlich?
- Nachbesetzung Datenaufbereitung innerhalb FRG als Voraussetzung für produktiven Betrieb.
