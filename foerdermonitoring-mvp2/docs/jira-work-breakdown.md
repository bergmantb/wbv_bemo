# Jira Work-Break-Down: E2E-Fördermonitoring MVP

## Epic 1: Datenfundament und Quellintegration

Ziel: belastbare Datenbasis für Vertrag, Los, Bautranche, Adresse und Monatsscheiben schaffen.

### Story 1.1: Quellsystem-Mapping PFau, GBGS und Vertragsdaten

Als Fachbereich möchte ich je Attribut wissen, aus welchem System und welchem Datenobjekt es kommt, damit die IT Schnittstellen und Verantwortlichkeiten sauber schätzen kann.

Akzeptanzkriterien:

- Mapping enthält mindestens PFau, GBGS, vertragshaltende Systeme, ZRP/Bewilligung und Finanzdatenquelle.
- Für jedes MVP-Attribut sind Quelle, Schlüssel, Aktualisierungsfrequenz und fachlicher Owner dokumentiert.
- Fehlende Mappings sind als offene Punkte mit Klärverantwortung markiert.

### Story 1.2: Einheitliches Dimensionsmodell

Als Nutzer möchte ich Daten nach Ausbautreiber, Vertrag, Los, Bautranche, GKS, Förderprogramm und Monat auswerten.

Akzeptanzkriterien:

- Dimensionen Vertrag, Los und Bautranche sind eindeutig modelliert.
- Eine Bautranche ist genau einem Los zugeordnet.
- Ein Los ist genau einem Hauptvertrag zugeordnet.
- Filterlogik funktioniert konsistent über alle Reports.

### Story 1.3: Historisierung und Stichtagslogik

Als Management möchte ich Abweichungen im Zeitverlauf nachvollziehen.

Akzeptanzkriterien:

- Datenstände sind mit Stichtag und Ladezeitpunkt historisiert.
- Monatsvergleiche können reproduziert werden.
- Dashboard zeigt den aktuellen Stichtag sichtbar an.

## Epic 2: Vertrags- und Adress-Sollmengen

Ziel: vertragliche Sollmengen und Vertragsstammdaten als Basis der Abrechenbarkeit bereitstellen.

### Story 2.1: Import Vertragsstruktur Vertrag, Los, Bautranche

Akzeptanzkriterien:

- Hauptvertrag, Los und Bautranche werden aus PFau bzw. Vertragsdatenquelle importiert.
- Summe der Bautranchen-Adressen je Los wird gegen die Vertragsadressliste geprüft.
- Inkonsistenzen erzeugen Abweichungseinträge.

### Story 2.2: P1-Sollmengen TDG/GFPlus HP/BP/HC

Bezug: Excel `AZ-BB`.

Akzeptanzkriterien:

- HP+, BP und HC Sollmengen werden je Vertrag, Los und Bautranche bereitgestellt.
- Werte sind nach Quelle und Stand nachvollziehbar.
- Dashboard zeigt Sollmengen neben Istmengen aus GBGS.

### Story 2.3: Vertragsstammdaten und Vertragspreise

Bezug: Excel `BC-BH`.

Akzeptanzkriterien:

- Vertragsstatus, Pönale, Nachträge, Preise und Laufzeiten werden angezeigt.
- Vertragsdaten sind filterbar und exportierbar.
- Fehlende Werte werden als Datenqualitäts-Hinweis markiert.

## Epic 3: Rollout-Monitoring HP/BP/HC

Ziel: geplanter und gebauter Rollout auf Monatsscheiben darstellen.

### Story 3.1: Monatsscheibenmodell für HP/BP/HC

Bezug: Excel `BL-IX`.

Akzeptanzkriterien:

- HP, BP und HC liegen monatlich von 2025 bis 2029 vor.
- Das Datenmodell unterstützt Plan, Forecast und Ist.
- Summen je Jahr und Gesamt werden automatisch berechnet.

### Story 3.2: GBGS-Istmengen und Meilensteine

Bezug: Excel `BF-BH`, `IY-JI`.

Akzeptanzkriterien:

- GBGS liefert gebaute HP/BP/HC je Los/Bautranche.
- Meilensteine L2.9 bis L4.9 werden angezeigt.
- Tiefbaumeter und Ausbauparameter werden als Ist-/Statusdaten dargestellt.

### Story 3.3: Rollout-Dashboard

Akzeptanzkriterien:

- Dashboard zeigt Soll/Ist/Forecast je Monat.
- Nutzer können zwischen HP, BP und HC umschalten.
- Kritische Abweichungen werden visuell hervorgehoben.

## Epic 4: PFau-vs-GBGS-Abgleich und Abweichungsprozess

Ziel: Abrechenbarkeit der Adressen fachlich nachweisen.

### Story 4.1: Abgleich Vertragsadressbestand gegen gebaute Adressen

Akzeptanzkriterien:

- Abgleich verknüpft PFau-Vertragsadressen mit GBGS-Baustatus.
- Nur tatsächlich gebaute und zuordenbare Adressen werden als abrechenbar markiert.
- Nicht zuordenbare, offene oder überschüssige Adressen werden kategorisiert.

### Story 4.2: Abweichungsmonitor

Akzeptanzkriterien:

- Abweichungen haben Ursache, Menge/Betrag, betroffene Dimension, Status, Owner und Fälligkeit.
- Nutzer können von KPI oder Tabelle in die Abweichungsliste drillen.
- Statuswerte mindestens: Neu, In Klärung, Zur Korrektur, Erledigt, Blockiert.

### Story 4.3: Fachlicher Bereinigungsworkflow

Akzeptanzkriterien:

- Abweichung kann kommentiert und einem Owner zugewiesen werden.
- Fälligkeiten und nächste Schritte sind sichtbar.
- Historie zeigt Änderungen an Status und Kommentar.

## Epic 5: Cash-In Forecast

Ziel: Mengen- und Zahlungsprognose für Mittelzufluss steuerbar machen.

### Story 5.1: Abrechnungskreis GFPlus/JV

Bezug: Excel `JL-JO`.

Akzeptanzkriterien:

- Rechnungsstellung, bezahlt, offen und Bemerkung werden für TDG-GFPlus und GKS dargestellt.
- Darstellung erfolgt nach Monat, Vertrag, Los und GKS.
- Werte sind gegen abrechenbare Adressen plausibilisiert.

### Story 5.2: Abrechnungskreis Deckungslückenmodell

Bezug: Excel `JP-JT` und Forecast-Monatsscheiben.

Akzeptanzkriterien:

- Klassischer Eigenausbau wird als separater Abrechnungskreis geführt.
- Forecast kann getrennt von GFPlus gefiltert und analysiert werden.
- Offene Beträge werden je Monat ausgewiesen.

### Story 5.3: Cash-In Gesamtsicht

Akzeptanzkriterien:

- Summensicht kombiniert GFPlus/JV und Deckungslückenmodell.
- Dashboard zeigt Ist, Forecast, Jahresziel und Gap.
- Nutzer können vom Gesamtbetrag auf Abrechnungskreis und Los drillen.

## Epic 6: Fördermittelabruf gemäß Bewilligung

Ziel: Zahlungs- und Realisierungspläne mit Abruf und Auszahlung vergleichen.

### Story 6.1: ZRP-/Bewilligungsdaten importieren

Bezug: Excel `MH-MV`.

Akzeptanzkriterien:

- Aktueller ZRP ist nach Jahr, GKS und Fördermittelart verfügbar.
- Bundes-, Landes-, kommunaler und EU-Anteil werden separat geführt.
- Gesamtwerte werden automatisch summiert.

### Story 6.2: P1 Bundesfördermittel und kommunaler Eigenanteil

Bezug: Excel `MN`, `MU`.

Akzeptanzkriterien:

- Bundesfördermittel und kommunaler Eigenanteil sind im MVP enthalten.
- Abweichungen zwischen geplant, abgerufen und ausgezahlt werden angezeigt.
- Dashboard zeigt offene Mittel je GKS und Jahr.

### Story 6.3: Fördermittel-Dashboard

Akzeptanzkriterien:

- Nutzer sehen geplante, abgerufene, ausgezahlte und offene Mittel.
- Drilldown nach Fördermittelart, Jahr, GKS und Vertrag ist möglich.
- Ampellogik warnt bei Zielgefährdung.

## Epic 7: Reporting UX und Klickdummy

Ziel: Management- und Fachnutzer erhalten eine bedienbare Oberfläche als Diskussionsgrundlage.

### Story 7.1: Portfolio-Übersicht

Akzeptanzkriterien:

- Startansicht zeigt KPI-Kacheln, Rollout-Chart, Los-Tabelle und Top-Abweichungen.
- Filter beeinflussen sichtbare Kennzahlen.
- Stichtag und Aktualität sind sichtbar.

### Story 7.2: Vertrags- und Losdetail

Akzeptanzkriterien:

- Auswahl eines Loses öffnet Detailansicht.
- Detailansicht zeigt Vertragsdaten, Bautranchen, PFau/GBGS-Abgleich und nächste Schritte.
- Nutzer können zwischen Überblick, Sachkonten und Historie wechseln.

### Story 7.3: Reports und Export

Akzeptanzkriterien:

- Reports für Portfolio, Rollout, Cash-In, Fördermittel und Abweichungen sind auswählbar.
- Exportfunktion ist vorgesehen.
- Export enthält Stichtag, Filter und Quelle.

## Epic 8: Betrieb, Berechtigungen und Datenqualität

Ziel: MVP betreibbar und fachlich vertrauenswürdig machen.

### Story 8.1: Rollen- und Berechtigungskonzept

Akzeptanzkriterien:

- Rollen für Management, Fachbereich, IT, Datenowner und Read-only sind definiert.
- Pflege von Abweichungen ist rollenbasiert eingeschränkt.
- Exportberechtigungen sind geklärt.

### Story 8.2: Datenqualitätsregeln

Akzeptanzkriterien:

- Pflichtfelder und Plausibilitätsregeln sind definiert.
- Datenqualitätsfehler erscheinen im Dashboard.
- Fehler sind Quelle und Owner zuordenbar.

### Story 8.3: Monitoring der Schnittstellen

Akzeptanzkriterien:

- Ladezeitpunkt, Ladeergebnis und Fehler je Schnittstelle sind sichtbar.
- Nutzer sehen, ob PFau, GBGS und ZRP-Daten aktuell sind.
- Fehlerhafte Läufe erzeugen fachliche Hinweise.

## Priorisierter MVP-Releaseplan

| Release | Inhalt |
|---|---|
| R1 Datenkern | Epic 1, Story 2.1, Story 2.2 |
| R2 Rollout und Abgleich | Epic 3, Epic 4 |
| R3 Cash-In | Epic 5 |
| R4 Fördermittel | Epic 6 |
| R5 UX, Betrieb, Datenqualität | Epic 7, Epic 8 |

## Ergänzendes Epic: Fördermonitoring & Risikoanalyse nach Management-Zielbild

Ziel: MVP2 um die aus dem Management-Briefing abgeleitete Risikoanalyse und Datenarchitektur erweitern. MVP1 bleibt out of scope.

### Story: Shortterm-Dateilieferung aus SharePoint-Foldern

Als FRG möchte ich die relevanten Quellen kurzfristig als Dateien aus SharePoint-Foldern einlesen, damit ein Management-MVP ohne native IT-Schnittstellen bereitgestellt werden kann.

Akzeptanzkriterien:

- Unterstützte Quellen: FNES Control Tower, ODE/Micro Strategy/WFMT/PUMA, VRT-Monitor, WFS/PFAU, ANKE/Bid Database, JVK GFPlus-Steuerungsdatei, IPF/Forecast.
- Unterstützte lokale Formate: CSV, TSV, JSON; XLSX wird interimistisch als CSV-Export bereitgestellt.
- Ladeprotokoll zeigt Quelle, Datei, Zeilenanzahl, Ladezeitpunkt und Datenstand.
- Fehlerhafte oder unvollständige Lieferungen werden je Quelle und Owner ausgewiesen.

### Story: Risikoanalyse und Priorisierung

Als Management möchte ich kritische Förderprojekte priorisiert sehen, damit Risiken der Förderablieferung und des Cash-In frühzeitig sichtbar werden.

Akzeptanzkriterien:

- Risikoindikatoren umfassen Cash-In-Abweichung gegen IPF/Forecast, Rollout-Abweichung HP/BP/HC, Abrechenbarkeitslücke PFau/GBGS und Datenqualität.
- Risikostufen mindestens niedrig, mittel, hoch.
- Forecast und IPF werden klar als Referenzgrößen gekennzeichnet; FRG übernimmt keine Planungsverantwortung.
- Mitigationsverantwortung wird als Owner-/Governance-Hinweis ausgewiesen, nicht als FRG-Aufgabe.

### Story: Reports on Demand für Stakeholder

Als FRG möchte ich Reports nach Stakeholder und Detailgrad erzeugen, damit Management, FRG, FNES und Finance jeweils die passende Sicht erhalten.

Akzeptanzkriterien:

- Management Summary mit Cash-In, Rollout HP/BP/HC und Risikoabschätzung auf aggregierter Sicht.
- FRG-Monatssicht mit kritischen Projekten und Risikoentwicklung.
- FNES-Gebietssicht für operative Abstimmungen.
- Finance-Sicht zur Prognose auf Einhaltung IPF.
- Export als Excel-kompatible CSV-Datei.
