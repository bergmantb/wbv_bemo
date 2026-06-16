# Delta Solutiondesign: Adressabgleich Pfau GBGS

## Einfuegehinweis

Dieses Delta ersetzt die zuletzt formulierte Ausbaustufe `GBGS-Features Button`, `Giga-Gebiet vollstaendig anlegen` und `VVM-Importliste erzeugen`.

Im bestehenden Solutiondesign ist dieses Delta an folgenden Stellen einzufuegen bzw. zu ersetzen:

- Abschnitt **Zielbild / Scope**: bisherigen Scope fuer vollstaendige GBGS-Gebietsanlage durch `Reduzierter Scope` ersetzen.
- Abschnitt **Frontend / Einstiegspunkt**: Button `GBGS-Features` durch Prozess-Dropdown-Eintrag `GBGS-Funktionen` ersetzen.
- Abschnitt **Fachlicher Ablauf / Use Cases**: bisherige Wizards durch die Abschnitte `UC 1` und `UC 2` dieses Deltas ersetzen.
- Abschnitt **Validierungen**: neue kontextsensitive Gebiets-ID-Bildungsregeln aufnehmen.
- Abschnitt **Schnittstellen / APIs**: API-Erweiterungen aus diesem Delta aufnehmen.
- Abschnitt **Jira-Tickets / Arbeitspakete**: bisherige Tickets zu vollstaendiger Gebietsanlage und echter VVM-Liste durch die neuen Tickets `PFAU-GBGS-201` bis `PFAU-GBGS-211` ersetzen.

## Reduzierter Scope

Nach erneuter Designdiskussion ist klar:

- Der Use Case heisst fachlich `Adressabgleich Pfau GBGS`.
- Es wird keine vollstaendige GBGS-Gebietsanlage im Pfau-Wizard nachgebaut.
- Es werden nur die fuer den Adressabgleich relevanten Daten erfasst.
- Die Gebietsdaten dienen der Vorbereitung und Absicherung des Adressabgleichs, nicht dem vollstaendigen Import eines Giga-Gebiets in GBGS.
- Die Erzeugung der echten `Liste 1` erfolgt nicht in Pfau, sondern in `PST`.
- Pfau erzeugt nur einen KLS-BT-Listenvorschlag auf Basis der KLS aus der aktuellen Bautranche.

## Frontend-Einstieg

Der Einstieg erfolgt in der Pfau-Bautranchensicht ueber das Prozess-Dropdown.

Neue Regel:

- Unterhalb des Eintrags `WFMT-Auftrag` wird ein weiterer Eintrag `GBGS-Funktionen` angezeigt.
- `GBGS-Funktionen` ist deaktiviert/grau, solange der `WFMT-Auftrag` noch nicht erzeugt wurde.
- `GBGS-Funktionen` wird aktiv/schwarz, sobald der `WFMT-Auftrag` erzeugt wurde.
- Es wird kein separater Button in der Bautranchensicht angezeigt.

## UC 1: Gebietsdaten fuer Adressabgleich erfassen

### Ziel

Der Wizard erfasst nur die Daten, die fuer `Adressabgleich Pfau GBGS` benoetigt werden, und validiert die Gebiets-ID nach Ausbautreiber.

### Wegfallende Felder/Funktionen

Aus dem bisherigen Wizard entfallen:

- `Initiative`
- `Gebietseigner`
- `Regelwerk fuer alle Bedarfspunkte`
- `Gebietsname aus Upload-Liste`
- `Kommunikativen Gebietsnamen aendern`
- `Schwellwert`
- kompletter Schritt `Partner`
- kompletter Schritt `Import`
- CSV-Dateiauswahl
- `CSV importieren`
- Upload-Ergebnis der Gebietsanlage

### Benoetigte Felder

Die Gebietserfassung fuer den Adressabgleich enthaelt nur noch:

| Feld | Pflicht | Beschreibung |
| --- | --- | --- |
| `Ausbautreiber / Gebietstyp` | ja | Auswahl fuer kontextsensitive Bildungsregel: `Deckungsluecke`, `GlasfaserPlus`, `Betreibermodell` |
| `Gebiets-ID` | ja | Eingabe und Validierung nach Bildungsregel |
| `Beginn Vorvermarktung` | ja | Relevantes Datum fuer Abgleich-/VVM-Kontext |
| `Ende Vorvermarktung` | ja | Relevantes Datum fuer Abgleich-/VVM-Kontext |
| `Beginn Ausbau` | ja | Relevantes Datum fuer Abgleich-/Baukontext |
| `Ende Ausbau` | ja | Relevantes Datum fuer Abgleich-/Baukontext |

### Kontextsensitive Bildungsregeln fuer Gebiets-ID

Die GUI zeigt die Bildungsregel abhaengig vom gewaehlten Ausbautreiber an.

#### Deckungsluecke

Regelhinweis in der GUI:

```text
Format fuer Deckungsluecke: DL_<Regel gemaess Fachvorgabe>
```

Validierung:

- Prefix `DL_` ist erforderlich.
- Detaillierte Struktur ist fachlich zu bestaetigen und anschliessend als Regex zu hinterlegen.

#### GlasfaserPlus

Regelhinweis in der GUI:

```text
Format fuer GlasfaserPlus: GFP_<Regel gemaess Fachvorgabe>
```

Validierung:

- Prefix `GFP_` ist erforderlich.
- Detaillierte Struktur ist fachlich zu bestaetigen und anschliessend als Regex zu hinterlegen.

#### Betreibermodelle

Regelhinweis in der GUI:

```text
BEMO_<10-stellige Vertragsnummer>
Beispiel: BEMO_1312200021
```

Aufbau der 10-stelligen Nummer:

```text
13122 0002 1
```

| Anteil | Bedeutung |
| --- | --- |
| `13122` | Vertrag bzw. Untervertrag |
| `0002` | fortlaufende Nummer fuer Bauabschnitt/Ausbaugebiet/Bautranche |
| `1` | beauftragte Technikvariante |

Validierung:

```text
^BEMO_[0-9]{10}$
```

Zusaetzlich soll die UI die drei Anteile farblich bzw. visuell getrennt erklaeren.

## UC 2: KLS-BT-Liste fuer PST vorschlagen

### Ziel

Die bisherige Funktion `VVM-Importliste erzeugen` wird fachlich umgeschrieben. Pfau erzeugt nicht die echte VVM-Importliste bzw. nicht die echte `Liste 1` fuer GBGS.

Pfau schlaegt nur den KLS-Anteil aus der aktuellen Bautranche vor. Diese Vorschlagsliste dient als Input fuer `PST`. Die eigentliche Erzeugung der echten `Liste 1` erfolgt in `PST`.

### Neue Bezeichnung

Die Funktion soll nicht mehr `VVM-Importliste erzeugen` heissen.

Vorschlag:

```text
KLS-BT-Liste fuer PST vorschlagen
```

Alternativ kurz:

```text
KLS-BT-Liste
```

### Wegfallende Felder/Funktionen

Aus dem bisherigen VVM-Importlisten-Wizard entfallen:

- `WE pruefen`
- `GE pruefen`
- Anspruch, die echte VVM-/Liste-1-Datei fuer GBGS zu erzeugen
- Buttontext `Importliste erzeugen`
- fachliche Aussage, dass Pfau die finale Liste erzeugt

### Benoetigte Inhalte

| Feld / Element | Pflicht | Beschreibung |
| --- | --- | --- |
| `Bautranche` | ja | aktuelle Bautranche, readonly |
| `Exportformat` | ja | zunaechst `CSV`, optional spaeter `XLSX` |
| KLS-Tabelle | ja | Liste aller KLS aus der aktuellen Bautranche |
| Aktion | ja | `KLS-BT-Liste exportieren` oder `KLS-BT-Liste fuer PST bereitstellen` |

### KLS-Tabellenvorschlag

Mindestspalten:

| Spalte | Beschreibung |
| --- | --- |
| `KLS-ID` | KLS aus der Bautranche |
| `Bautranche` | ID/Name der Bautranche |
| `Gebiets-ID` | validierte Gebiets-ID, falls bereits erfasst |
| `Quelle` | `Pfau` |

Optional:

- `Adresse`
- `Hausnummer`
- `PLZ`
- `Ort`
- `OID`

## Ablaufregel

1. Nutzer oeffnet eine Bautranche in Pfau.
2. Pfau zeigt das Prozess-Dropdown.
3. Pfau prueft, ob der `WFMT-Auftrag` erzeugt wurde.
4. Wenn nein, ist `GBGS-Funktionen` deaktiviert/grau.
5. Wenn ja, ist `GBGS-Funktionen` aktiv.
6. Nutzer waehlt `GBGS-Funktionen`.
7. Dialog zeigt die Funktionen:
   - `Gebietsdaten fuer Adressabgleich erfassen`
   - `KLS-BT-Liste fuer PST vorschlagen`
8. Bei Gebietsdaten-Erfassung werden nur die reduzierten Felder angezeigt.
9. Bei Eingabe der Gebiets-ID wird die Bildungsregel kontextsensitiv je Ausbautreiber angezeigt und validiert.
10. Bei KLS-BT-Liste werden nur KLS aus der aktuellen Bautranche vorgeschlagen/exportiert.
11. PST erzeugt ausserhalb von Pfau die echte `Liste 1`.

## Schnittstellen-Erweiterung

### Prozessstatus fuer Dropdown

```http
GET /api/pfau/bautranchen/{bautrancheId}/process-state
```

Beispielantwort:

```json
{
  "bautrancheId": "5005300021",
  "wfmtOrderCreated": true,
  "gbgsFunctionsEnabled": true
}
```

### Gebietsdaten fuer Adressabgleich speichern

```http
POST /api/pfau/gbgs-functions/area-data
```

Beispielpayload:

```json
{
  "bautrancheId": "5005300021",
  "areaType": "BETREIBERMODELL",
  "gebietsId": "BEMO_1312200021",
  "vvmStartDate": "2026-07-03",
  "vvmEndDate": "2026-09-01",
  "buildStartDate": "2026-09-18",
  "buildEndDate": "2027-03-17"
}
```

### Gebiets-ID validieren

```http
POST /api/pfau/gbgs-functions/area-id/validate
```

Beispielpayload:

```json
{
  "areaType": "BETREIBERMODELL",
  "gebietsId": "BEMO_1312200021"
}
```

Beispielantwort:

```json
{
  "valid": true,
  "ruleKey": "BEMO_10_DIGIT_CONTRACT",
  "message": "Gueltige BEMO-Gebiets-ID"
}
```

### KLS-BT-Liste laden/exportieren

```http
GET /api/pfau/gbgs-functions/bautranchen/{bautrancheId}/kls-list
```

Beispielantwort:

```json
{
  "bautrancheId": "5005300021",
  "gebietsId": "BEMO_1312200021",
  "targetTool": "PST",
  "items": [
    {
      "klsId": "23696071",
      "source": "Pfau"
    },
    {
      "klsId": "11792181",
      "source": "Pfau"
    }
  ]
}
```

## Komponentenänderungen

Frontend:

- Prozess-Dropdown um Eintrag `GBGS-Funktionen` unterhalb `WFMT-Auftrag` erweitern.
- Disabled/Enabled-State aus Prozessstatus ableiten.
- Alten Button `GBGS-Features` entfernen.
- Dialog fuer `GBGS-Funktionen` bereitstellen.
- Gebietsdaten-Wizard auf reduzierte Felder umbauen.
- Kontextsensitive Gebiets-ID-Hilfe und Validierung anzeigen.
- VVM-Importlisten-Wizard in KLS-BT-Listen-Wizard umbenennen und fachlich reduzieren.

Backend:

- Prozessstatus-API fuer Aktivierung von `GBGS-Funktionen`.
- Persistenz fuer reduzierte Gebietsdaten.
- Validator fuer Gebiets-ID je Ausbautreiber.
- API zum Laden/Exportieren der KLS aus der Bautranche.
- Keine Erzeugung der echten `Liste 1` in Pfau.

Umsysteme:

- `PST` bleibt verantwortlich fuer die Erzeugung der echten `Liste 1`.
- GBGS wird im Rahmen dieses Use Cases nicht ueber einen vollstaendigen CSV-Import aus Pfau befuellt.

## Jira-Tickets und Arbeitspakete

### PFAU-GBGS-201: Prozess-Dropdown um `GBGS-Funktionen` erweitern

Komponente: Pfau Frontend

Akzeptanzkriterien:

- Eintrag `GBGS-Funktionen` wird unterhalb `WFMT-Auftrag` angezeigt.
- Eintrag ist deaktiviert/grau, solange kein WFMT-Auftrag erzeugt wurde.
- Eintrag ist aktiv, sobald der WFMT-Auftrag erzeugt wurde.
- Alter Button `GBGS-Features` wird nicht mehr angezeigt.

### PFAU-GBGS-202: Prozessstatus-API fuer WFMT-Abhaengigkeit bereitstellen

Komponente: Pfau Backend

Akzeptanzkriterien:

- API liefert `wfmtOrderCreated`.
- API liefert `gbgsFunctionsEnabled`.
- Frontend kann den Status ohne zusaetzliche Logik auswerten.
- Berechtigungslogik entspricht der bestehenden Bautranchensicht.

### PFAU-GBGS-203: Dialog `GBGS-Funktionen` erstellen

Komponente: Pfau Frontend

Akzeptanzkriterien:

- Dialog startet aus dem Prozess-Dropdown.
- Dialog bietet `Gebietsdaten fuer Adressabgleich erfassen`.
- Dialog bietet `KLS-BT-Liste fuer PST vorschlagen`.
- Dialog folgt dem aktuellen Pfau-Design.

### PFAU-GBGS-204: Gebietsdaten-Wizard fachlich reduzieren

Komponente: Pfau Frontend

Akzeptanzkriterien:

- Entfernte Felder werden nicht mehr angezeigt.
- Schritte `Partner` und `Import` entfallen.
- Es bleiben nur Ausbautreiber/Gebietstyp, Gebiets-ID und relevante Terminangaben.
- Validierungsfehler werden am Feld angezeigt.

### PFAU-GBGS-205: Kontextsensitive Gebiets-ID-Regeln implementieren

Komponente: Pfau Frontend

Akzeptanzkriterien:

- Auswahl `Deckungsluecke` zeigt DL-Regelhinweis.
- Auswahl `GlasfaserPlus` zeigt GFP-Regelhinweis.
- Auswahl `Betreibermodell` zeigt BEMO-Regel inklusive 10-stelliger Aufschluesselung.
- BEMO wird mit Regex `^BEMO_[0-9]{10}$` validiert.
- DL/GFP Detailregex sind fachlich konfigurierbar bzw. nach Klaerung erweiterbar.

### PFAU-GBGS-206: Backend-Validator fuer Gebiets-ID bereitstellen

Komponente: Pfau Backend

Akzeptanzkriterien:

- API validiert Gebiets-ID nach Ausbautreiber.
- Backend ist fuehrend gegenueber reiner Frontend-Validierung.
- Fehlercodes und Meldungen sind eindeutig.
- Unit-Tests fuer BEMO gueltig/ungueltig sind vorhanden.

### PFAU-GBGS-207: Reduzierte Gebietsdaten speichern

Komponente: Pfau Backend / Persistence

Akzeptanzkriterien:

- Reduzierte Gebietsdaten werden pro Bautranche gespeichert.
- Aenderungen werden versioniert oder auditierbar abgelegt.
- Bestehende Bautranchen ohne Daten bleiben kompatibel.
- Daten koennen fuer den Adressabgleich gelesen werden.

### PFAU-GBGS-208: VVM-Importlisten-Wizard in KLS-BT-Listen-Wizard umbauen

Komponente: Pfau Frontend

Akzeptanzkriterien:

- Titel und Texte sprechen nicht mehr von finaler VVM-Importliste.
- WE/GE-Pruefung entfaellt.
- Button heisst `KLS-BT-Liste exportieren` oder `KLS-BT-Liste fuer PST bereitstellen`.
- UI zeigt nur den KLS-Anteil aus der Bautranche.

### PFAU-GBGS-209: KLS-BT-Liste aus Bautranche bereitstellen

Komponente: Pfau Backend

Akzeptanzkriterien:

- API liefert alle KLS der aktuellen Bautranche.
- Export enthaelt mindestens `KLS-ID`, `Bautranche`, `Gebiets-ID`, `Quelle`.
- Keine Berechnung/Erzeugung der echten Liste 1.
- Ergebnis ist fuer PST weiterverwendbar.

### PFAU-GBGS-210: PST-Uebergabekonzept abstimmen

Komponente: Integration / Fachkonzept

Akzeptanzkriterien:

- Zielbild fuer Uebergabe an PST ist dokumentiert.
- Dateiformat oder technische Schnittstelle ist entschieden.
- Verantwortlichkeit fuer echte Liste 1 ist eindeutig bei PST dokumentiert.
- Fehler- und Rueckmeldeprozess ist beschrieben.

### PFAU-GBGS-211: Regression und E2E-Tests

Komponente: QA / Test Automation

Akzeptanzkriterien:

- Test: `GBGS-Funktionen` deaktiviert ohne WFMT-Auftrag.
- Test: `GBGS-Funktionen` aktiv nach WFMT-Auftrag.
- Test: BEMO-Gebiets-ID gueltig/ungueltig.
- Test: DL/GFP zeigen jeweils eigenen Regelhinweis.
- Test: KLS-BT-Liste enthaelt nur KLS aus aktueller Bautranche.
- Test: alter Button ist nicht mehr vorhanden.

## Offene Klärungen

- Exakte Bildungsregel fuer `Deckungsluecke`.
- Exakte Bildungsregel fuer `GlasfaserPlus`.
- Soll der KLS-BT-Listenvorschlag nur exportiert oder direkt an PST uebergeben werden?
- Welches Ziel-Datenformat erwartet PST?
- Soll die Aktivierung von `GBGS-Funktionen` nur an WFMT-Auftrag gekoppelt sein oder zusaetzlich an weitere Prozessstatus?
- Welche Rollen duerfen `GBGS-Funktionen` nutzen?
