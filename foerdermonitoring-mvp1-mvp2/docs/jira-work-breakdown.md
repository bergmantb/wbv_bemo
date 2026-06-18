# Jira Work-Break-Down: Fördermonitoring MVP1 und MVP2

## Epic 1: MVP1 Datenfundament PFAU/WFS

Ziel: automatisierte Datenbasis für den E2E Report Förderung aus PFAU und WFS schaffen.

### Story 1.1: PFAU Angebots- und Losberechnungsdaten anbinden

Akzeptanzkriterien:

- Angebotsnummer, Projekt-/Angebotsbezeichnung, Losberechnung, Landkreis, Region, Mandant, Förderprogramm und HHUSto werden importiert.
- PFAU-Angebotsebene und Losberechnungsebene sind getrennt verfügbar.
- Datensatz enthält Quelle, Ladezeitpunkt und Reporting-Stichtag.

### Story 1.2: WFS-Altfälle berücksichtigen

Akzeptanzkriterien:

- WFS-Projekte mit Win/Loss-Status fließen in MVP1-Auswertungen ein.
- WFS-Daten sind als Altsystemquelle gekennzeichnet.
- Dublettenlogik zwischen WFS und PFAU ist dokumentiert.

### Story 1.3: Förderaufruf und Wettbewerberfeld vorbereiten

Akzeptanzkriterien:

- Datenmodell enthält Felder für Förderaufruf und Wettbewerbername bei Loss.
- Fehlende Werte werden als "noch nicht in PFAU verfügbar" markiert.
- Rückbefüllungsbedarf wird als Datenqualitätsregel sichtbar.

## Epic 2: MVP1 Win/Loss-Logik und Kennzahlen

Ziel: fachlich stabile Win/Loss- und WinRate-Berechnung auf HHUSto-Basis.

### Story 2.1: PFAU-Statusmapping auf Win/Loss definieren

Akzeptanzkriterien:

- Statuswerte werden mindestens auf Win, Loss, Offen, Keine Teilnahme, Ausschluss und Zurückgezogen gemappt.
- Statusmapping ist fachlich dokumentiert und versioniert.
- Mapping kann um BE-FIBER-800-Status erweitert werden.

### Story 2.2: Entscheidungsdatum berechnen

Akzeptanzkriterien:

- Entscheidungsdatum ist das früheste Datum aller relevanten Win-/Loss-Statusmeldungen.
- Spätere rechtsverbindliche Zuschläge überschreiben das frühere Entscheidungsdatum nicht.
- Historische YTD-Auswertungen bleiben reproduzierbar.

### Story 2.3: WinRate und Infrashare berechnen

Akzeptanzkriterien:

- WinRate = gewonnene HHUSto / (gewonnene HHUSto + verlorene HHUSto).
- WinRate wird nicht auf Basis der Anzahl Projekte oder Lose berechnet.
- Infrashare wird als gewonnene HHUSto / ausgeschriebene HHUSto im betrachteten Markt oder Zeitraum berechnet.

## Epic 3: MVP1 Report Views

Ziel: die MVP1-Sichten des NGFC/Control-Tower-Reportings bereitstellen.

### Story 3.1: Gesamtübersicht Win/Loss

Akzeptanzkriterien:

- View zeigt gewonnene HHUSto YTD, verlorene HHUSto YTD, WinRate YTD und Projektanzahl als Hinweisgröße.
- Filter: Region, Mandant, Förderprogramm, Förderaufruf, Zeitraum.
- Aggregation: Bund und Region.

### Story 3.2: Monatliche Entwicklung

Akzeptanzkriterien:

- View zeigt HHUSto Wins, HHUSto Losses und monatliche WinRate je Monat.
- Standardansicht ist YTD.
- Filter aus Story 3.1 wirken konsistent.

### Story 3.3: Projektdetails Win/Loss

Akzeptanzkriterien:

- View zeigt Top 10 Wins und Flop 10 Losses sortiert nach HHUSto.
- Attribute: Angebotsnummer, Projekt, Landkreis, Region, Mandant, Förderprogramm, Förderaufruf, HHUSto.
- Bei Loss wird Wettbewerbername angezeigt, sobald verfügbar.

### Story 3.4: Angebote kurz vor Angebotsabgabe

Akzeptanzkriterien:

- View zeigt Angebote sortiert nach nächstem Abgabedatum.
- Attribute: Angebotsnummer, Bezeichnung, Landkreis, Region, Mandant, Win-Chance, HHUSto, Abgabedatum, Iteration.
- Gesamtlose und Einzellose werden so behandelt, dass HHUSto nicht doppelt gezählt werden.

## Epic 4: MVP1 Funnel, Forecast und Competitive Intelligence

Ziel: Subsidy Bid Control Tower Sichten über den reinen Win/Loss-Report hinaus bereitstellen.

### Story 4.1: Funnel View

Akzeptanzkriterien:

- Status von Branchendialog, MEV, TNA, Angebotsrunden, Reklamation, Win und Loss werden abgebildet.
- View zeigt Projektanzahl, HHUSto und Brutto-CAPEX je Status.
- Statusoutput entspricht der transformierten BidDatabase-Logik.

### Story 4.2: Forecast View

Akzeptanzkriterien:

- Offene HHUSto werden nach Win-Wahrscheinlichkeit gruppiert.
- Win, Loss und keine Teilnahme sind aus dem Forecast ausgeschlossen.
- View unterstützt Regionen und Bund.

### Story 4.3: Wettbewerber Views

Akzeptanzkriterien:

- Größte Wettbewerber je Region werden nach verlorenen HHUSto ausgewiesen.
- Wettbewerberdetail zeigt vergangene Loss-Projekte und Angebotscharakteristika.
- Fehlende Wettbewerberdaten werden sichtbar markiert.

### Story 4.4: MBfD Management View

Akzeptanzkriterien:

- View zeigt Füllstand für CAPEX und HHUSto.
- CPH wird gegen Planvorgabe bzw. ZBTC/Forecast verglichen.
- Infrashare, Tiefbau, Brutto-CAPEX und Cash-In werden als Management-KPIs vorbereitet.

## Epic 5: Gemeinsames Datenmodell MVP1/MVP2

Ziel: durchgängige Dimensionen von Vergabe bis Umsetzung schaffen.

### Story 5.1: Förderprojekt, Angebot, Los und Loskombination modellieren

Akzeptanzkriterien:

- Angebot und Los sind als n:m-Beziehung modellierbar.
- Gesamtlose, Einzellose und vordefinierte Loskombinationen werden unterstützt.
- Zuschläge können auf Los-, Bündel- oder Projektebene abgebildet werden.

### Story 5.2: Übergang von Win zu Vertrag modellieren

Akzeptanzkriterien:

- Gewonnene Lose können mit Vertrag, Betreibervertrag oder Zuwendungsvertrag verbunden werden.
- MVP2-Objekte Vertrag, Los und Bautranche referenzieren MVP1-Förderprojekt und Zuschlag.
- Altfälle ohne vollständige Referenz werden als Datenqualitätsfälle ausgewiesen.

### Story 5.3: Überschneidungs- und Konfliktregeln dokumentieren

Akzeptanzkriterien:

- Projektanzahl ist nur Hinweisgröße und geht nicht in WinRate ein.
- HHUSto/Adressmengen werden nach Prozessphase semantisch getrennt.
- Cash-In in MVP1 ist Managementindikator, in MVP2 detaillierter Forecast-Datenquader.

## Epic 6: MVP2 Vertrags- und Adress-Sollmengen

Ziel: vertragliche Sollmengen und Vertragsstammdaten als Basis der Abrechenbarkeit bereitstellen.

### Story 6.1: Vertragsstruktur Vertrag, Los, Bautranche importieren

Akzeptanzkriterien:

- Hauptvertrag, Los und Bautranche werden aus PFAU bzw. Vertragsdatenquelle importiert.
- Summe der Bautranchen-Adressen je Los wird gegen die Vertragsadressliste geprüft.
- Inkonsistenzen erzeugen Abweichungseinträge.

### Story 6.2: Sollmengen TDG/GFPlus HP/BP/HC

Akzeptanzkriterien:

- HP+, BP und HC Sollmengen werden je Vertrag, Los und Bautranche bereitgestellt.
- Werte sind nach Quelle und Stand nachvollziehbar.
- Dashboard zeigt Sollmengen neben Istmengen aus GBGS.

### Story 6.3: Vertragsstammdaten und Vertragspreise

Akzeptanzkriterien:

- Vertragsstatus, Pönale, Nachträge, Preise und Laufzeiten werden angezeigt.
- Vertragsdaten sind filterbar und exportierbar.
- Fehlende Werte werden als Datenqualitäts-Hinweis markiert.

## Epic 7: MVP2 Rollout, PFau-vs-GBGS und Abweichungen

Ziel: geplanter und gebauter Rollout auf Monatsscheiben darstellen und abrechenbare Adressen nachweisen.

### Story 7.1: Monatsscheibenmodell für HP/BP/HC

Akzeptanzkriterien:

- HP, BP und HC liegen monatlich von 2025 bis 2029 vor.
- Das Datenmodell unterstützt Plan, Forecast und Ist.
- Summen je Jahr und Gesamt werden automatisch berechnet.

### Story 7.2: GBGS-Istmengen und Meilensteine

Akzeptanzkriterien:

- GBGS liefert gebaute HP/BP/HC je Los/Bautranche.
- Meilensteine L2.9 bis L4.9 werden angezeigt.
- Tiefbaumeter und Ausbauparameter werden als Ist-/Statusdaten dargestellt.

### Story 7.3: PFau-vs-GBGS-Abgleich

Akzeptanzkriterien:

- Abgleich verknüpft PFau-Vertragsadressen mit GBGS-Baustatus.
- Nur tatsächlich gebaute und zuordenbare Adressen werden als abrechenbar markiert.
- Nicht zuordenbare, offene oder überschüssige Adressen werden kategorisiert.

### Story 7.4: Abweichungsmonitor

Akzeptanzkriterien:

- Abweichungen haben Ursache, Menge/Betrag, betroffene Dimension, Status, Owner und Fälligkeit.
- Nutzer können von KPI oder Tabelle in die Abweichungsliste drillen.
- Statuswerte mindestens: Neu, In Klärung, Zur Korrektur, Erledigt, Blockiert.

## Epic 8: MVP2 Cash-In und Fördermittelabruf

Ziel: Mittelzufluss, Abrechnungskreise und Fördermittelabruf steuerbar machen.

### Story 8.1: Cash-In GFPlus/JV

Akzeptanzkriterien:

- Rechnungsstellung, bezahlt, offen und Bemerkung werden für TDG-GFPlus und GKS dargestellt.
- Darstellung erfolgt nach Monat, Vertrag, Los und GKS.
- Werte sind gegen abrechenbare Adressen plausibilisiert.

### Story 8.2: Cash-In Deckungslückenmodell

Akzeptanzkriterien:

- Klassischer Eigenausbau wird als separater Abrechnungskreis geführt.
- Forecast kann getrennt von GFPlus gefiltert und analysiert werden.
- Offene Beträge werden je Monat ausgewiesen.

### Story 8.3: Fördermittelabruf gemäß Bewilligung

Akzeptanzkriterien:

- Aktueller ZRP ist nach Jahr, GKS und Fördermittelart verfügbar.
- Bundes-, Landes-, kommunaler und EU-Anteil werden separat geführt.
- Dashboard zeigt geplante, abgerufene, ausgezahlte und offene Mittel.

## Epic 9: UX, Rollen und Betrieb

Ziel: beide MVP-Stufen in einer bedienbaren Oberfläche zusammenführen.

### Story 9.1: MVP-Umschalter und integrierte Navigation

Akzeptanzkriterien:

- Nutzer können zwischen MVP1 Bid Control Tower, MVP2 Realisierung und Gesamtübersicht wechseln.
- Globale Filter sind rollenkonform sichtbar.
- Gemeinsame Dimensionen wirken über beide MVP-Stufen.

### Story 9.2: Rollen- und Berechtigungskonzept

Akzeptanzkriterien:

- Rollen für Management, Fachbereich, Regionen, IT, Datenowner und Read-only sind definiert.
- Pflege von Abweichungen ist rollenbasiert eingeschränkt.
- Exportberechtigungen sind geklärt.

### Story 9.3: Schnittstellen- und Datenqualitätsmonitor

Akzeptanzkriterien:

- Ladezeitpunkt, Ladeergebnis und Fehler je Schnittstelle sind sichtbar.
- Nutzer sehen, ob PFAU, WFS, GBGS, ZRP und Finanzdaten aktuell sind.
- Fehlerhafte Läufe erzeugen fachliche Hinweise.

## Priorisierter Releaseplan

| Release | Projektsprache | Inhalt |
|---|---|---|
| R1 | MVP1 | PFAU/WFS Datenkern, Win/Loss, Gesamtübersicht, monatliche Entwicklung |
| R2 | MVP1+ | Funnel, Forecast, Wettbewerber, Füllstand, MBfD Management View |
| R3 | MVP2 | Vertragsstruktur, Los/Bautranche, Rollout, PFau-vs-GBGS |
| R4 | MVP2 | Cash-In Forecast und Fördermittelabruf |
| R5 | Integration | Rollen, Betrieb, Datenqualität, gemeinsame Gesamtübersicht |
