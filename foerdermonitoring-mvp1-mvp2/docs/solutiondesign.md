# Solutiondesign: E2E-Fördermonitoring MVP1 und MVP2

## 1. Zielbild

Das Fördermonitoring soll zwei fachlich aufeinander aufbauende MVP-Stufen in einer gemeinsamen Monitoring-Logik abbilden.

MVP1 ist der Bid-/Subsidy-Control-Tower für geförderte Projekte vor und während der Vergabe. Er ersetzt den heute manuellen E2E Report Förderung bzw. die BidDatabase-Auswertungen durch ein automatisiertes Reporting aus PFAU, WFS und perspektivisch NGFC. Im Fokus stehen Win/Loss, WinRate, Infrashare, Funnel, Angebotsabgaben, Wettbewerber, Füllstand und Management Views.

MVP2 ist das E2E-Realisierungsmonitoring nach Zuschlag und Vertragsschluss. Es ergänzt die MVP1-Pipeline um Vertrag, Los, Bautranche, PFau-vs-GBGS-Abgleich, Rollout, Cash-In Forecast, Fördermittelabruf und Finanzsicht.

Kernfrage MVP1:

> Welche Förderprojekte, Lose und HHUSto sind gewonnen, verloren, offen oder kurz vor Angebotsabgabe, und wie entwickeln sich WinRate, Infrashare und Pipeline-Füllstand über Zeit?

Kernfrage MVP2:

> Welche vertraglich geschuldeten Adressmengen sind bis wann geplant, tatsächlich gebaut, abrechenbar, abgerechnet und als Fördermittel abrufbar?

## 2. Fachlicher Scope

### 2.1 MVP1: Bid Control Tower / NGFC Reporting

| Themenfeld | Inhalt | Quelle |
|---|---|---|
| Gesamtübersicht Win/Loss | Gewonnene HHUSto, verlorene HHUSto, WinRate YTD, Projektanzahl als Hinweisgröße | PFAU, WFS, BidDatabase/ANKE Übergang |
| Monatliche Entwicklung | HHUSto Wins, HHUSto Losses, monatliche WinRate, YTD-Verlauf | PFAU-Statushistorie |
| Projektdetails Win/Loss | Angebotsnummer, Projekt/Angebot, Landkreis, Region, Mandant, Förderprogramm, Förderaufruf, HHUSto, Wettbewerber bei Loss | PFAU, WFS |
| Angebote kurz vor Abgabe | Angebotsnummer, Projekt, Landkreis, Region, Mandant, Win-Chance, HHUSto, Abgabedatum, Iteration | PFAU Angebotsebene und Losberechnungsebene |
| Funnel View | Status von Branchendialog über MEV, TNA, Angebote, Reklamation bis Win/Loss | BidDatabase/PFAU |
| Top KPI / Management View | KPI Overview, KPI Development, Füllstand, CPH, CAPEX, Infrashare | Subsidy CT / MBfD Top Views |
| Competitive Intelligence | größte Wettbewerber und Wettbewerberdetail bei Loss | PFAU Feld Wettbewerbername, perspektivisch Q2 |

### 2.2 MVP2: E2E Realisierungs- und Fördermittelmonitoring

| Themenfeld | Inhalt | Quelle |
|---|---|---|
| Grunddaten | Ausbautreiber, Region, PTI, Bundesland, Förderprogramm, GKS | Excel MVP, PFAU, Stammdatensysteme |
| Vertragsdaten | Vertrag, Los, Bautranche, Status, Pönale, Nachträge, Preise, Laufzeiten | PFAU, vertragshaltende Systeme |
| Rollout | HP/BP/HC Plan, Ist und Forecast auf Monatsscheibe | GBGS, PFAU Planwerte |
| PFau-vs-GBGS-Abgleich | Vertragsadressbestand gegen tatsächlich gebaute Adressen | PFAU, GBGS |
| Cash-In Forecast | GFPlus/JV, Deckungslückenmodell und Gesamtsicht | PFAU, Finanzdaten |
| Fördermittelabruf | ZRP/Bewilligung, Bundesmittel, Landesmittel, kommunaler Eigenanteil, EU-Mittel | Bewilligungs-/ZRP-Daten |
| Abweichungsmonitor | Datenqualitäts-, Adress-, Bau-, Abrechnungs- und Cash-In-Differenzen | Kuratierte Monitoring-Schicht |

## 3. Quellen und Eingangsartefakte

| Artefakt | Rolle im Solutiondesign |
|---|---|
| `2026-04-30_Draft_Anforderung NGFC für ControlTower FörderungT.docx` | MVP1-Zielreporting E2E Report Förderung, PFAU/WFS-Quellen, Win/Loss-Logik, Sichten und Filter |
| `20241025_Subsidy_CT_Handover_V2.pptx` | Subsidy Bid Control Tower, acht Sichten, technische Architektur, BidDatabase-Transformation |
| `MBfD - Top 3 Views.pptx` | MBfD Top Views, Füllstand, Gebietsportfolio, Win/Loss, offene Projekte und Management-KPIs |
| `2026-03-20_Konzeptionelles_Datenmodell_Foerderprojekte_Glasfaserausbau.docx` | fachliches Datenmodell für Förderprojekt, Vergabeverfahren, Lose, Angebot, Zuschlag und WinRate/Infrashare |
| `Kopie von 20260511_Fördermonitoring.xlsx`, Reiter `MVP` | MVP2-Datenquader für Vertrag, Rollout, Cash-In, Fördermittel und Finanzen |

## 4. Zielarchitektur

### 4.1 Architekturprinzip

Die Lösung wird als fachliche Monitoring-Schicht über operativen Quellsystemen verstanden. MVP1 und MVP2 nutzen ein gemeinsames Dimensionsmodell, unterscheiden sich aber im Prozessabschnitt:

1. MVP1 betrachtet den Bid- und Vergabeprozess bis Zuschlag, Loss oder offene Angebotsabgabe.
2. MVP2 betrachtet Umsetzung, Vertragserfüllung, Baufortschritt, Abrechnung und Fördermittelabruf nach Zuschlag.

### 4.2 Datenfluss

1. PFAU liefert Angebots-, Losberechnungs-, Status-, Win/Loss- und Vertragsinformationen.
2. WFS liefert Altfälle, deren Win/Loss-Status weiterhin berücksichtigt werden muss.
3. BidDatabase/ANKE dient als Übergangs-/Referenzquelle für bisher manuelle Reports.
4. GBGS liefert den baulichen Ist-Status und Meilensteine für MVP2.
5. Bewilligungs-/ZRP- und Finanzquellen liefern Fördermittel-, Cash-In- und Zahlungsdaten.
6. Eine Transformationsschicht aggregiert Losdaten auf Projekt-, Regions-, Mandanten- und Bundesebene.
7. Die Visualisierungsschicht stellt Management Views, Detailreports und Abweichungsworkflows bereit.

## 5. Gemeinsames Datenmodell

### 5.1 Kernentitäten

| Entität | MVP | Schlüssel | Beschreibung |
|---|---|---|---|
| Förderprojekt | MVP1/MVP2 | Projekt-/Angebotsnummer | fachliche Klammer für Vergabe, Zuschlag, Vertrag und Umsetzung |
| Vergabeverfahren | MVP1 | Verfahrens-ID | vergaberechtlicher Auswahlprozess |
| Ausschreibung | MVP1 | Ausschreibungs-ID | Marktansprache inklusive Lose und Zuschlagskriterien |
| Los | MVP1/MVP2 | Los-ID | kleinste wettbewerbliche Einheit; später vertragliches Objekt |
| Loskombination | MVP1 | Kombination-ID | Bündel, Gesamtlos oder Nebenangebot mit n:m-Bezug zu Losen |
| Angebotsrunde | MVP1 | Angebotsrunde/Iteration | Erstangebot, Verhandlung, Finalangebot, Reklamation |
| Angebot | MVP1 | Angebotsnummer | versioniertes Angebot für Los, Loskombination oder Projekt |
| Zuschlag | MVP1 | Zuschlagsereignis | Win/Loss, Platzierung, Entscheidungsdatum, Wettbewerber |
| Vertrag | MVP2 | Vertrags-ID / PFau-ID | Betreiber- und/oder Zuwendungsvertrag nach Win |
| Bautranche | MVP2 | Bautranchen-ID | kleine geplante Ausbaueinheit unterhalb des Loses |
| Adresse | MVP2 | Adress-ID | Vertragsadresse mit Bau- und Abrechnungsstatus |
| Rollout-Monat | MVP2 | Monat, Los, Bautranche | HP/BP/HC Plan, Ist und Forecast |
| Cash-In | MVP2 | Monat, Abrechnungskreis | Forecast, in Rechnung gestellt, bezahlt, offen |
| Fördermittelabruf | MVP2 | Jahr/Monat, GKS | geplant, abgerufen, ausgezahlt, offen |
| Abweichung | MVP2 | Abweichungs-ID | Klärfall aus Daten-, Bau-, Abrechnungs- oder Fördermitteldifferenzen |

### 5.2 Modellierungsregeln

| Regel | Bedeutung |
|---|---|
| Angebot und Los sind zu entkoppeln | Ein Angebot kann sich auf ein Los, mehrere Lose oder eine vordefinierte Loskombination beziehen. |
| HHUSto sind die führende Erfolgsmenge | WinRate und Infrashare werden mengenbasiert berechnet, nicht auf Basis der Anzahl Projekte oder Lose. |
| Entscheidungsdatum ist stabil | Für Win/Loss zählt das früheste Datum, an dem erstmals eine belastbare Win- oder Loss-Information vorliegt. |
| WFS bleibt relevant | Altfälle aus WFS fließen in Win/Loss ein, solange sie nicht vollständig in PFAU abgebildet sind. |
| Projektanzahl ist Hinweisgröße | Projektanzahl darf angezeigt werden, aber nicht Grundlage der WinRate sein. |
| Bautranchen müssen adressseitig aufgehen | Summe der Bautranchen-Adressen je Los muss zur Vertragsadressliste des Hauptvertrags passen. |

## 6. MVP1-Fachlogik

### 6.1 Win/Loss und Entscheidungsdatum

| Thema | Regel |
|---|---|
| Win | Positive Zuschlagsentscheidung oder belastbare Vorabinformation zugunsten des Unternehmens. |
| Loss | Zuschlag an Wettbewerber, Ausschluss durch Vergabestelle, keine Angebotsabgabe trotz angelegtem Projekt, zurückgezogenes Angebot nach Vergabeentscheidung. |
| Entscheidungsdatum | Minimales Datum aller relevanten Statusmeldungen, die Win oder Loss anzeigen. Ein späterer rechtsverbindlicher Zuschlag überschreibt das ursprüngliche Datum nicht. |
| Statusmapping | PFAU-Statusmeldungen der Gebietskörperschaften müssen fachlich auf Win/Loss gemappt und dokumentiert werden. |
| Wettbewerbername | Bei Loss als zusätzliches Feld vorzusehen; in PFAU geplant. |

### 6.2 Kennzahlen MVP1

| KPI | Definition |
|---|---|
| Gewonnene HHUSto | Summe aller gewonnenen Haushalte und Unternehmensstandorte. |
| Verlorene HHUSto | Summe aller verlorenen Haushalte und Unternehmensstandorte. |
| WinRate | Gewonnene HHUSto / (gewonnene HHUSto + verlorene HHUSto). |
| Infrashare | Gewonnene HHUSto / ausgeschriebene HHUSto im betrachteten Markt oder Zeitraum. |
| Füllstand | Anteil geplanter bzw. hinterlegter Gebiete/HHUSto/CAPEX gegen Planvorgabe. |
| CPH | CAPEX je HHUSto, mit Vergleich gegen Plan/ZBTC/Forecast. |
| Pipeline offen | HHUSto und Projektanzahl in offenen Status vor Win/Loss. |
| Angebotsabgaben demnächst | Angebote sortiert nach nächstem Abgabedatum. |

### 6.3 MVP1-Sichten

| Sicht | Inhalt |
|---|---|
| Gesamtübersicht Win/Loss | YTD Wins, Losses, WinRate, Infrashare, Region/Mandant/Förderprogramm/Förderaufruf. |
| Monatliche Entwicklung | monatliche HHUSto Wins/Losses und monatliche WinRate. |
| Projektdetails Win/Loss | Top Wins und Flops nach HHUSto, inklusive Wettbewerber bei Loss. |
| Angebote kurz vor Abgabe | Angebotsliste mit Win-Chance, HHUSto, Abgabedatum und Iteration. |
| Funnel View | Projektanzahl, HHUSto und CAPEX je Status von Branchendialog bis Win/Loss. |
| Forecast View | offene HHUSto nach Win-Wahrscheinlichkeit. |
| Competitive Intelligence | größte Wettbewerber je Region und Detailansicht Wettbewerber. |
| MBfD Management View | Füllstand, CAPEX, CPH, Infrashare, Tiefbau und Cash-In als Managementsicht. |

## 7. MVP2-Fachlogik

### 7.1 Vertrags- und Adresslogik

| Thema | Regel |
|---|---|
| Vertrag | Hauptvertrag bzw. PFau-/WFS-ID bildet die rechtliche Klammer. |
| Los | Vertragliches Objekt unterhalb des Hauptvertrags. |
| Bautranche | Planungs- und Bauobjekt, das gegen GBGS abgeglichen wird. |
| Adressabgleich | Vertragliche Solladressen werden gegen tatsächlich gebaute GBGS-Adressen geprüft. |
| Abrechenbarkeit | Nur tatsächlich gebaute und zuordenbare Adressen sind förderrechtlich abrechenbar. |

### 7.2 MVP2-Kennzahlen

| KPI | Definition |
|---|---|
| Vertragsadressen Soll | Summe HP/BP/HC aus Vertrag/Nachtrag. |
| Gebaut Ist | Summe HP/BP/HC aus GBGS. |
| Abrechenbare Adressen | Schnittmenge aus Vertragsadressbestand und tatsächlich gebautem Status. |
| Offene Adressdifferenz | Vertragsadressmenge minus gebaute/zuordenbare Menge. |
| Cash-In Forecast | Prognostizierter Zahlungseingang je Abrechnungskreis und Monat. |
| Fördermittel geplant | ZRP/Bewilligung je Jahr und Fördermittelart. |
| Fördermittel offen | geplant bzw. bewilligt minus abgerufen/ausgezahlt. |

## 8. Überschneidungen und Abgrenzungen MVP1/MVP2

| Thema | MVP1 | MVP2 | Bewertung |
|---|---|---|---|
| PFAU als Quelle | Angebots-, Losberechnungs-, Status- und Win/Loss-Daten | Vertrags-, Bautranchen- und Abrechnungsdaten | Gemeinsame Quelle, aber unterschiedliche Objekte und Prozessphase. |
| Los | wettbewerbliche Einheit im Vergabeverfahren | vertragliches Objekt und Bau-/Abrechnungsbezug | Muss als durchgängige Dimension modelliert werden. |
| Förderprojekt | Angebots-/Bid-Klammer | Klammer für Realisierung nach Win | Gemeinsames Objekt, Status wechselt von Bid zu Umsetzung. |
| HHUSto/Adressen | Erfolgsmenge für WinRate/Infrashare | Soll-/Ist-/Abrechenbarkeitsmenge | Semantisch ähnlich, aber fachlich sauber zu differenzieren. |
| Win/Loss vs. Projektbewertung | WinRate nicht auf Projektanzahl, sondern HHUSto | Projekt/Vertrag als Steuerungsobjekt | Projektanzahl nur Hinweisgröße; Konflikt mit projektbasierter Bewertung im Datenmodell dokumentieren. |
| Cash-In | in MBfD Top Views als Managementkennzahl genannt | detaillierter Cash-In Forecast als eigener Datenquader | MVP1 zeigt Managementindikator, MVP2 liefert abrechenbare Detailbasis. |
| Förderprogramm/Förderaufruf | globale Filter für Bid-Erfolg | Filter und Vertrags-/Fördermittelkontext | Förderaufruf ist PFAU-Erweiterung und für beide relevant. |
| Wettbewerber | Loss-Analyse und Competitive Intelligence | nicht zentral | MVP1-spezifisch. |
| PFau-vs-GBGS-Abgleich | nicht Teil der Bid-Steuerung | zentrale Reconciliation für Abrechnung | MVP2-spezifisch. |

## 9. Priorisierung und Roadmap

| Release | Projektsprache | Inhalt |
|---|---|---|
| R1 | MVP1 | automatisierter Win/Loss Report aus PFAU/WFS, Gesamtübersicht, monatliche Entwicklung, Projekt-/Angebotsdetails, globale Filter |
| R2 | MVP1+ | Funnel, Forecast View, Wettbewerber, Füllstand, CPH, MBfD Management View |
| R3 | MVP2 | Vertragsstruktur, Los/Bautranche, HP/BP/HC Soll/Ist, PFau-vs-GBGS-Abgleich |
| R4 | MVP2 | Cash-In Forecast getrennt nach GFPlus/JV und Deckungslückenmodell |
| R5 | MVP2 | Fördermittelabruf gemäß Bewilligung/ZRP, Finanzsicht, Abweichungsworkflow |

## 10. Funktionale Anforderungen

| ID | MVP | Anforderung |
|---|---|---|
| F-01 | MVP1 | Nutzer können nach Region, Mandant, Förderprogramm, Förderaufruf und Zeitraum filtern. |
| F-02 | MVP1 | Das System berechnet WinRate ausschließlich auf HHUSto-Basis. |
| F-03 | MVP1 | Das System zeigt gewonnene und verlorene HHUSto YTD, monatlich und nach Region. |
| F-04 | MVP1 | Das System zeigt Top Wins, Top Losses und anstehende Angebotsabgaben. |
| F-05 | MVP1 | Das System bildet Status von Branchendialog bis Win/Loss als Funnel ab. |
| F-06 | MVP1 | Das System zeigt Wettbewerber bei Loss und aggregiert größte Wettbewerber je Region. |
| F-07 | MVP1 | Entscheidungsdatum für Win/Loss wird als frühestes relevantes Statusdatum bestimmt. |
| F-08 | MVP2 | Nutzer können nach Ausbautreiber, GKS, Vertrag, Los, Bautranche, Förderprogramm und Zeitraum filtern. |
| F-09 | MVP2 | Das System zeigt Soll, Forecast und Ist je HP/BP/HC auf Monatsscheibe. |
| F-10 | MVP2 | Das System stellt vertragliche Solladressen PFau gegen GBGS-Istbau und Abrechnungsstatus. |
| F-11 | MVP2 | Das System trennt Cash-In nach GFPlus/JV und Deckungslückenmodell und zeigt eine Gesamtsicht. |
| F-12 | MVP2 | Das System zeigt Fördermittel nach Bewilligung/ZRP, Abruf, Auszahlung und offenem Betrag. |
| F-13 | MVP2 | Nutzer können Abweichungen von Portfolio auf Vertrag, Los, Bautranche und Ursache drillen. |

## 11. Nichtfunktionale Anforderungen

| Bereich | Anforderung |
|---|---|
| Aktualität | MVP1 mindestens wöchentlich analog Subsidy CT Handover; MVP2 mindestens monatlich, perspektivisch automatisiert nach Quellaktualisierung. |
| Historisierung | Status, Entscheidungsdatum und Reporting-Stichtag müssen reproduzierbar sein. |
| Datenqualität | Jede KPI weist Quelle, Stand und Berechnungslogik aus. |
| Berechtigungen | Zentrale Fachseite, Regionen, Management und IT erhalten rollenbasierte Sichten. |
| Performance | Portfolio-, Funnel- und Losansichten sollen interaktiv filterbar sein. |
| Erweiterbarkeit | Weitere Förderprogramme, Förderaufrufe und PFAU-Felder müssen ohne Redesign ergänzbar sein. |

## 12. Offene Punkte für IT-Solutiondesign

| Punkt | Klärbedarf |
|---|---|
| PFAU-Statusmapping | Welche konkreten PFAU-/GKS-Statuswerte werden auf Win, Loss, Offen, keine Teilnahme und Ausschluss gemappt? |
| Förderaufruf | Feld ist für PFAU geplant; Verfügbarkeit und Historisierung klären. |
| Wettbewerbername | Feld bei Loss ist für PFAU geplant; Pflichtlogik und Rückbefüllung klären. |
| Workflow V2 | Erforderlich zur Vermeidung von Doppelzählung bei Gesamtlosen und Einzellosen. |
| Projektbewertung | Projekt-Win/Loss darf als Hinweisgröße angezeigt werden, aber nicht in WinRate eingehen. |
| WFS-Altfälle | Migrations- bzw. Übergangslogik für Altsystemfälle definieren. |
| PFau-vs-GBGS-Schlüssel | Verbindliche Schlüssel für Vertrag, Los, Bautranche und Adresse festlegen. |
| Cash-In-Formeln | Fachliche Berechnung je Abrechnungskreis final spezifizieren. |
| Datenlatenz | Aktualisierungsfrequenz je Quelle und Reporting-Stichtag festlegen. |

## 13. MVP-Schnitt

Der erste umsetzbare Schnitt sollte liefern:

1. MVP1-Datenimport aus PFAU/WFS für Angebotsnummer, Losberechnung, Status, Mandant, Region, Förderprogramm, HHUSto und Entscheidungsdatum.
2. Win/Loss-Mapping inklusive stabiler Entscheidungsdatumslogik.
3. Gesamtübersicht Win/Loss, monatliche Entwicklung, Top Wins/Losses und anstehende Angebotsabgaben.
4. Funnel-/Forecast-Sicht und MBfD Management-KPIs als Erweiterung.
5. Gemeinsames Dimensionsmodell für Förderprojekt, Los, Angebot, Zuschlag, Vertrag und Bautranche.
6. MVP2-Vertrags- und Rolloutdaten inklusive PFau-vs-GBGS-Abgleich.
7. Cash-In Forecast, Fördermittelabruf und Abweichungsmonitor.
