# Solutiondesign: E2E-Monitoring geförderter Glasfaserausbau

## 1. Zielbild

Das E2E-Fördermonitoring bündelt Vertrags-, Rollout-, Cash-In-, Fördermittel- und Finanzdaten für den geförderten Glasfaserausbau in einer fachlichen Monitoring-Anwendung. Ziel ist ein steuerbarer Überblick je Ausbautreiber, Vertrag, Los, Bautranche und Gebietskörperschaft.

Kernfrage des MVP:

> Welche vertraglich geschuldeten Adressmengen sind bis wann geplant, tatsächlich gebaut, abrechenbar, abgerechnet und als Fördermittel abrufbar?

Das Reporting stellt Soll-, Forecast- und Ist-Daten pro Datendimension gegenüber. Abweichungen zwischen PFau-Vertrags-/Abrechnungsbestand und GBGS-Baustatus werden sichtbar gemacht, priorisiert und in einen Bereinigungsprozess überführt.

## 2. Fachlicher Scope MVP

Der MVP orientiert sich am Excel-Reiter `MVP` der Datei `Kopie von 20260511_Fördermonitoring.xlsx`.

### 2.1 Oberthemen

| Oberthema | Zweck im Monitoring | MVP-Relevanz |
|---|---|---|
| Grunddaten | Portfolio- und Projektkontext, z. B. Ausbautreiber, Niederlassung, PTI, Bundesland, Förderprogramm, GKS | Basisfilter und Stammdaten |
| Vertragsdaten | Vertrag, Los, Bautranche, Vertragsstatus, Pönale, Änderungen, Vertragsmengen und Vertragspreise | Steuerungs- und Abrechnungsgrundlage |
| Geplanter und gebauter Rollout | HP/BP/HC auf Monatsscheiben, Ist-Zahlen aus GBGS, Meilensteine und Ausbauparameter | Soll/Ist-Tracking |
| Cash-In Forecast | Prognose von abrechenbaren Mengen und Zahlungseingängen, getrennt nach GFPlus und klassischem Deckungslückenmodell | Prio-Datenquader |
| Geplanter Abruf Fördermittel | Zahlungs- und Realisierungsplan gemäß Bewilligung, inklusive Bundes-, Landes-, kommunalem und EU-Anteil | Abgleich gegen Cash-In und Abrufstatus |
| Finanzen | Finanzielle Bewertung, Mittelbindung, offene Differenzen, Abrechnungs- und Zahlungsstatus | Management-Steuerung |

### 2.2 Zentrale Dimensionen

| Dimension | Spaltenbezug im Excel | Beschreibung |
|---|---:|---|
| Ausbautreiber | K | Fachlicher Treiber, z. B. GFPlus Förderung oder Eigenausbau |
| Vertrag | O/P | Hauptvertrag bzw. PFau-/WFS-ID |
| Los | Q | Vertragliches Objekt unterhalb des Hauptvertrags |
| Bautranche | R | Kleine Ausbaueinheit, in PFau geplant und gegen GBGS-Baustatus abgeglichen |
| GKS | S | Gebietskörperschaft |
| Förderprogramm | U | Förderprogramm, z. B. BFP23 |
| Abrechnungsverfahren | X | Verfahren mit GKS, z. B. vereinfachter Mittelabruf |

Fachliche Regel:

> Die Summe aller Adressen der Bautranchen je Los muss der Adressliste des zugehörigen Hauptvertrags entsprechen. Differenzen sind als Abweichung zu erkennen, zu priorisieren und in die Bereinigung zu geben.

## 3. Priorisierte Datenbereiche

Im Excel sind rote Markierungen als fachliche Priorisierung für die IT-Umsetzung zu verstehen. Für den MVP sind insbesondere folgende Bereiche zu schneiden:

| Priorität | Bereich | Spalten | Fachlicher Nutzen |
|---|---|---:|---|
| P1 | Vertragliche Soll-Adressmengen TDG/GFPlus | AZ-BB | Basis für abrechenbare Adressen HP/BP/HC |
| P1 | PFau-vs-GBGS Soll/Ist-Abgleich | AZ-BK, IY-JI | Nachweis, ob Vertragsadressen tatsächlich gebaut und abrechenbar sind |
| P1 | Cash-In Forecast | JL-MF | Cash-In-Sicht nach Abrechnungskreis und Monat |
| P1 | Bundesfördermittel | MN | Abgleich geplanter und realisierter Mittelabrufe |
| P1 | Kommunaler Eigenanteil | MU | vollständige Finanzsicht je Bewilligung |
| P2 | Vertragsstammdaten und Preise | BC-BH | Sollgrößen, Preise, Stammdatenergänzung |
| P2 | Ausbauparameter und Meilensteine | IY-JI | Baufortschritt und Zielerreichung |
| P3 | Angebotsphase und Grunddaten-Anreicherungen | AO-AU, K-AM | Filter, Kontext und Portfoliobericht |

## 4. Quellsysteme und Datenflüsse

| Quelle | Rolle | Datenobjekte |
|---|---|---|
| PFau | Vertragshaltung, Bautranchenplanung, Abrechnung | Vertrag, Los, Bautranche, Vertragsadresslisten, abrechenbare Mengen, Rechnungsstatus |
| GBGS | Baulicher Ist-Status | gebaute HP/BP/HC, Meilensteine, Tiefbaumeter, Baufortschritt |
| Vertragshaltende Systeme | Vertragsstammdaten | Vertragspreise, Nachträge, Pönale, Laufzeiten, Status |
| ZRP/Bewilligung | Fördermittelplanung | Zahlungs- und Realisierungsplan, Bundes-/Landesmittel, kommunaler Eigenanteil, EU-Mittel |
| Fachliche Bereinigungsprozesse | Korrektur- und Klärprozess | Differenzen, Ursachen, Verantwortliche, Fälligkeiten |

### 4.1 Ziel-Datenfluss

1. Quellen liefern Daten in eine fachliche Integrationsschicht.
2. Identitäts- und Mappinglogik verbindet Vertrag, Los, Bautranche und Adresse.
3. Reconciliation vergleicht PFau-Solladressen mit GBGS-Ist-Bauzustand.
4. Fachliche Kennzahlen werden monatlich aggregiert.
5. Dashboard, Reports und Abweichungsworkflow greifen auf kuratierte Datenprodukte zu.

## 5. Fachliches Datenmodell

### 5.1 Kernentitäten

| Entität | Schlüssel | Wichtige Attribute |
|---|---|---|
| Vertrag | Vertrags-ID / PFau-ID | Ausbautreiber, Förderprogramm, GKS, Vertragsstatus, Vertragsende |
| Los | Los-ID | Vertrag, Region, Losart, GKS |
| Bautranche | Bautranchen-ID | Los, Planmengen HP/BP/HC, Status |
| Adresse | Adress-ID | Bautranche, Vertragszuordnung, Bauzustand, Abrechenbarkeit |
| Rollout-Monat | Monat, Los, Bautranche | Plan HP/BP/HC, Ist HP/BP/HC, Forecast |
| Cash-In | Monat, Abrechnungskreis | forecast, in Rechnung gestellt, bezahlt, offen |
| Fördermittelabruf | Jahr/Monat, GKS | geplant, abgerufen, ausgezahlt, offen |
| Abweichung | Abweichungs-ID | Ursache, Betrag/Menge, Quelle, Status, Owner, Fälligkeit |

### 5.2 Abrechnungskreise

| Abrechnungskreis | Excel-Bezug | Darstellung |
|---|---:|---|
| Joint Venture GlasfaserPlus | JK-JO | Eigene Sicht für Innenverhältnis TDG-GFPlus und GKS-Rechnungsstellung |
| Klassischer Eigenausbau / Deckungslückenmodell | JP-JT und Forecast-Monatsscheiben | Separate Forecast- und Zahlungslogik |
| Gesamtsicht | fachlich zu ergänzen | Summendarstellung beider Kreise je Monat, Jahr, Los und GKS |

## 6. Kennzahlen und Reports

### 6.1 KPI-Set MVP

| KPI | Definition |
|---|---|
| Vertragsadressen Soll | Summe HP/BP/HC aus PFau-Vertrag/Nachtrag |
| Gebaut Ist | Summe HP/BP/HC aus GBGS |
| Abrechenbare Adressen | Schnittmenge aus Vertragsadressbestand und tatsächlich gebautem Status |
| Offene Adressdifferenz | Vertragsadressmenge minus gebaute/zuordenbare Menge |
| Cash-In Forecast | Prognostizierter Zahlungseingang je Abrechnungskreis und Monat |
| Fördermittel geplant | ZRP/Bewilligung je Jahr und Fördermittelart |
| Fördermittel abgerufen | Tatsächlich abgerufene Fördermittel |
| Fördermittel offen | geplant bzw. bewilligt minus abgerufen/ausgezahlt |

### 6.2 Dashboard- und Reporttypen

| Report | Inhalt |
|---|---|
| Portfolio-Übersicht | Management-KPIs, Ampeln, Top-Abweichungen, Cash-In-Ausblick |
| Vertrags-/Losübersicht | Vertrag, Los, Bautranche, HP/BP/HC Soll/Ist, Status |
| Rollout-Monatsscheiben | HP/BP/HC Plan, Ist und Forecast über Monate |
| PFau-vs-GBGS-Abgleich | Adress- und Mengenabgleich inklusive Klärstatus |
| Cash-In Forecast | JV GFPlus, Deckungslückenmodell und Gesamtsicht |
| Fördermittelabruf | Bewilligung/ZRP versus Abruf/Auszahlung |
| Abweichungsmonitor | Ursachen, Beträge, Mengen, Owner, Fälligkeiten |

## 7. Funktionale Anforderungen

| ID | Anforderung |
|---|---|
| F-01 | Nutzer können nach Ausbautreiber, Bundesland, GKS, Vertrag, Los, Bautranche, Förderprogramm und Zeitraum filtern. |
| F-02 | Das System zeigt Soll, Forecast und Ist je HP/BP/HC auf Monatsscheibe. |
| F-03 | Das System stellt vertragliche Solladressen PFau gegen GBGS-Istbau und Abrechnungsstatus. |
| F-04 | Das System trennt Cash-In nach GFPlus/JV und Deckungslückenmodell und zeigt eine Gesamtsicht. |
| F-05 | Das System zeigt Fördermittel nach Bewilligung/ZRP, Abruf, Auszahlung und offenem Betrag. |
| F-06 | Nutzer können Abweichungen drill-down-fähig von Portfolio auf Vertrag, Los, Bautranche und Ursache analysieren. |
| F-07 | Abweichungen erhalten Status, Owner, Fälligkeit und Kommentarhistorie. |
| F-08 | Reports sind exportierbar, z. B. CSV/XLSX für Abstimmungen mit IT, Controlling und Management. |

## 8. Nichtfunktionale Anforderungen

| Bereich | Anforderung |
|---|---|
| Datenqualität | Jede KPI muss Quelle, Stand und Berechnungslogik ausweisen. |
| Nachvollziehbarkeit | Abweichungen müssen revisionssicher mit Quelle, Timestamp und Bearbeitungsstatus nachvollziehbar sein. |
| Performance | Portfolio- und Losansichten sollen interaktiv filterbar sein. |
| Berechtigungen | Fachseite, Management, IT und ggf. regionale Rollen erhalten rollenbasierte Leserechte; Pflege von Klärstatus nur für berechtigte Rollen. |
| Aktualität | MVP mindestens monatlich, perspektivisch automatisiert nach Quellaktualisierung. |
| Erweiterbarkeit | Zusätzliche Förderprogramme und Datenquellen müssen ohne Redesign integrierbar sein. |

## 9. Offene Punkte für IT-Solutiondesign

| Punkt | Klärbedarf |
|---|---|
| Source Mapping | Konkrete Tabellen, APIs oder Exporte je Quellsystem fehlen noch für Zeilen 22/23 im Excel. |
| Identitätslogik | Verbindliche Schlüssel für Vertrag, Los, Bautranche und Adresse zwischen PFau und GBGS festlegen. |
| Cash-In-Formeln | Fachliche Berechnung je Abrechnungskreis final spezifizieren. |
| Datenlatenz | Aktualisierungsfrequenz je Quelle und Reporting-Stichtag festlegen. |
| Abweichungsprozess | Workflow-Tooling klären: Jira, integrierte App, Confluence-Task oder Fachprozess. |
| Historisierung | Snapshot-Logik je Monatsstichtag definieren. |

## 10. MVP-Schnitt

Der erste IT-Schnitt sollte liefern:

1. Datenimport und Mapping für Vertrag, Los, Bautranche, GKS und HP/BP/HC-Sollmengen.
2. GBGS-Istmengen und Meilensteine je Los/Bautranche.
3. PFau-vs-GBGS-Abgleich inklusive Abweichungskennzeichnung.
4. Rollout-Dashboard HP/BP/HC auf Monatsscheibe.
5. Cash-In Forecast getrennt nach GFPlus/JV und Deckungslückenmodell plus Summe.
6. Fördermittelabruf gemäß Bewilligung/ZRP für Bundesmittel und kommunalen Eigenanteil.
7. Abweichungsmonitor mit Status, Owner und Fälligkeit.

## Ergänzung Juni 2026: Fördermonitoring & Risikoanalyse MVP2

### Fachliche Entscheidung
MVP1 / Angebotsphase / Win-Loss ist out of scope. Die technische Linie verfolgt MVP2 weiter: E2E-Transparenz nach Realisierungsbeauftragung mit Fokus auf Rollout-Ablieferung, Dokumentation, Fördermittelabrechnung, Cash-In und Risikofrüherkennung.

### Rollenverständnis FRG
FRG schafft Transparenz, identifiziert Risiken, bewertet Auswirkungen und stellt Managementreports bereit. FRG übernimmt keine operative Rolloutsteuerung, keine Maßnahmenumsetzung zur Risikomitigation und keine Forecast-/Planungsverantwortung. Forecast und IPF dienen ausschließlich als Referenzgrößen zur Risikoabschätzung.

### Datenquellen gemäß Management-Zielbild

| Lieferant | Quelle / System | Verwendung |
| --- | --- | --- |
| FNES | Control Tower mit GGS, Digi B, PSL, Celonis | Rollout-Ist, Status, operative Ablieferung |
| FNES | ODE / Micro Strategy / WFMT / PUMA | Gebiets-, Meilenstein- und Bauinformationen |
| FRG | VRT-Monitor | Förder-/Vertragskontext und Risikohinweise |
| FRG | WFS / PFAU | Vertrag, Los, Bautranche, abrechenbare Adressen, Abrechnung |
| FRG | ANKE / Bid Database | Übergangs-/Referenzdaten und Stammdaten |
| JVK | GFPlus-Steuerungsdatei | GFPlus-Managementsicht; Datenqualität bei JVK |
| Finance / Planowner | IPF / Forecast | Referenzwerte für Risikoabschätzung |

### Shortterm-/Interimslösung
Für die kurzfristige Management-AFO werden die Quellen turnusmäßig als Dateien in SharePoint-Foldern bereitgestellt. Die lokale Interim-App im Ordner `interim-app` verarbeitet CSV, TSV und JSON, harmonisiert die Daten und rendert Dashboards, Risikoanalyse, Reports on demand sowie einen Excel-kompatiblen CSV-Report.

XLSX-Dateien werden in der lokalen HTML-App nicht nativ geparst; für die Interimslösung ist ein CSV-Export aus Excel/SharePoint vorgesehen. Die Langfristlösung muss native Schnittstellen und optional XLSX-Verarbeitung bereitstellen.

### Langfristlösung
Die langfristige Lösung wird als IT-AFO/Jira-Epic beschrieben. Ziel ist eine produktive Datenarchitektur mit nativer Quellintegration, Datenvalidierung, Harmonisierung, Qualitätssicherung, Konsolidierung, Historisierung, Risikoanalyse und adressatengerechtem Management Reporting.
