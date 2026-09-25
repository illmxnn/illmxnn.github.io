# Shots manifest — CAREER-SHOTS-20260924-Job1 (2026-09-24) + RESHOOT-20260925 (2026-09-25) + DPR2-20260925 (2026-09-25)

12 кадров, ноль picsum/плейсхолдеров. Все пиксели — реальные рендеры браузера (stealth-chrome screenshot / system Chrome headless):
живые/local UI, Swagger, страницы GitHub и дословные выводы/код.
Фрагменты кода — excerpt'ы с точным указанием файла и строк (шапка внутри кадра).

## DPR2-20260925: все 12 пересняты в DPR2 (deviceScaleFactor=2, те же имена/фрейминг)
- 1280 CSS → 2560 px, 390 CSS → 780 px (ретина-чёткость, апскейла нет). Способ: Playwright `channel="chrome"` headless + `device_scale_factor=2`; карточки — тот же `%TEMP%\opencode\reshoot\cards.html`; UI — те же источники (live led-stil.info; Ingul http.server 8091; RAG uvicorn 8092; GitHub file/live); чужие проекты read-only, серверы убиты (`srv.terminate()`), 8088 не тронут.
- CSS anti-upscale: `.shot-frame--tall { max-width:390px }` (моб-кадры ≤390 CSS = 0.5x); wide/code уже в даунскейле; хинт «⤢ Открыть полностью» + aria «, открывается полностью» (см. DESIGN.md §16).

## RESHOOT-20260925: все 12 открыты глазами в браузере (file://), вердикт по каждому
- Переснято 8: 5 тёмных кодовых карточек (#0B0B12, паддинги 28–32px, шапка с путём/источником, клип по контенту, без скроллбаров и обрезков строк,
  моноширинный Consolas 15px, подсветка-минимум) + ingul×2 без cookie-модалки + rag-query с телом ответа.
  Способ: `python` Playwright (`channel="chrome"`, headless), HTML-карточки собраны скриптом в `%TEMP%\\opencode\\reshoot`
  (репозиторий скриптами не засорён); UI — живые локальные серверы, после съёмки убиты.
- Оставлено 4 (глазами ok / чинится только в апстриме) — причины ниже в таблице.

| файл | проект | источник | размер | тип | статус |
|---|---|---|---|---|---|
| ledstil-catalog-1280.png | LedStil | ПЕРЕСНЯТ 2026-09-25 с live `https://led-stil.info/ru` (Playwright `channel="chrome"` headless, viewport 1280×900, скролл к «СЕКЦИИ/Новинки» — топ-слайдер прода залит оффтопиком, см. риски) + DPR2 2026-09-25 (2560×1800, deviceScaleFactor=2) | 1774.4 KB (2560×1800) | ui | real, eye-ok-20260925-live, dpr2 |
| ledstil-card-390.png | LedStil | ПЕРЕСНЯТ 2026-09-25 с live `https://led-stil.info/ru/led-strip.php` (тот же Playwright, viewport 390×844 mobile) — фото товара грузится, alt-текстов нет + DPR2 2026-09-25 (780×1688) | 650.6 KB (780×1688) | ui | real, eye-ok-20260925-live, dpr2 |
| rag-docs-1280.png | RAG Demo (`C:\Work\RAG-Demo`, lexical-only) | `python -m uvicorn app.main:app --port 8092` → `http://127.0.0.1:8092/docs` (Swagger, только GET; сервер мой, после убит) + DPR2 2026-09-25 (2560×1800, viewport 1280×900) | 131.7 KB (2560×1800) | docs | real, eye-ok-20260925 (все эндпоинты целиком, читаемо), dpr2 |
| rag-query-1280.png | RAG Demo | ПЕРЕСНЯТ 2026-09-25: тот же сервер (`uvicorn`, после убит), Swagger Try-it-out `POST /query` `{"question":"What is the return policy?","top_k":3,"retrieval_mode":"lexical"}` → 200, клип блока операции до конца Response headers (без док-хвоста); тело ответа с честным evidence-gate отказом (`sufficient_evidence:false`) видно целиком; данные не тронуты + DPR2 2026-09-25 (2560×2616) | 180.7 KB (2560×2616) | ui | real, dpr2 |
| ingul-catalog-1280.png | Ingul | ПЕРЕСНЯТ 2026-09-25: `python -m http.server 8091` в `C:\Work\Ingul` → `http://127.0.0.1:8091/html/index.html`, viewport 1280×900; cookie-модалка подавлена пресетом localStorage (`cookiesAccepted`+`languageSelected`, только состояние браузера) — hero «Ваша упаковка — Наша турбота» виден целиком (сервер мой, после убит) + DPR2 2026-09-25 (2560×1800) | 1819.3 KB (2560×1800) | ui | real, dpr2 |
| ingul-catalog-390.png | Ingul | ПЕРЕСНЯТ 2026-09-25: тот же сервер и URL, viewport 390×844 (mobile), модалка подавлена так же; hero + начало «Каталог» без перекрытий + DPR2 2026-09-25 (780×1688) | 571.7 KB (780×1688) | ui | real, dpr2 |
| docs-analyzer-repo-1280.png | DocumentAnalyzer | `https://github.com/illmxnn/PDF-HTML-TXT-WORD-Document-Analyzer` — страница репо. ОСТАВЛЕН 2026-09-25 сознательно: GUI (PySide6) headless снять нельзя без фейка; `main.py --help` виснет (>120 c, процесса не осталось); страница репо — честное публичное лицо OSS-проекта, кадр полный, строки не обрезаны + DPR2 2026-09-25 (2560×1800, viewport 1280×900) | 346.5 KB (2560×1800) | repo | fallback-честно-подписан, dpr2 |
| docs-analyzer-code-1280.png | DocumentAnalyzer | ПЕРЕСНЯТ 2026-09-25: тёмная кодовая карточка, excerpt локального `C:\Work\DocumentAnalyzer\src\core\search.py` строки 1–44 (`SearchResult`, `SearchEngine.__init__`, `search()`), 446 строк всего — якоря проверены скриптом; вместо обрезанного GitHub-скрина со скроллбаром + DPR2 2026-09-25 (2560×2420) | 256.4 KB (2560×2420) | code | real, dpr2 |
| justcars-help-1280.png | JustCars Exporter | ПЕРЕСНЯТ 2026-09-25: тёмная терминал-карточка — дословный `python C:\Work\JustCars\sync_catalog.py --help` (только argparse, без сети/записей) с промптом `C:\Work\JustCars>` и кареткой; вывод целиком, без пустой простыни + DPR2 2026-09-25 (2560×1576) | 200.3 KB (2560×1576) | terminal | real, dpr2 |
| justcars-code-1280.png | JustCars Exporter | ПЕРЕСНЯТ 2026-09-25: тёмная кодовая карточка, excerpt `C:\Work\JustCars\sync_catalog.py` строки 143–201 (`SyncError`, `fetch_html`, `fetch_many_html`, якорь `class SyncError` проверен), пайплайн НЕ запускался + DPR2 2026-09-25 (2560×3150) | 375.4 KB (2560×3150) | code | real, dpr2 |
| paybots-code-1280.png | Payment Bots | ПЕРЕСНЯТ 2026-09-25: тёмная кодовая карточка, excerpt `C:\Work\payment_bots\platform\bot\handlers\payments.py` строки 1–60, read-only, никаких запусков с сетью/платежами + DPR2 2026-09-25 (2560×3198) | 481.6 KB (2560×3198) | code | real, dpr2 |
| paybots-struct-1280.png | Payment Bots | ПЕРЕСНЯТ 2026-09-25: тёмная терминал-карточка `dir /b` корня `C:\Work\payment_bots` (15 бот-папок + `platform` + `main`, read-only листинг, полный, без пустой простыни) + DPR2 2026-09-25 (2560×1868) | 160.3 KB (2560×1868) | code | real, dpr2 |

Проверки DPR2-20260925: `git status` career-site — `assets/shots/` (12 png + MANIFEST) + `index.html` + `style.css` + `DESIGN.md` изменённые (+ предсуществующий `?? CANDIDATE_PROFILE.md.new`, не трогал), без коммита;
`index.html`/остальное по ТЗ (хинт + aria); чужие проекты кодом не правились (только read-only запуски `--help` и GET/POST на локальных серверах);
серверы 8091/8092 убиты скриптами (`srv.terminate()`), 8088 оставлен жив (чужой); `stash@{0}` не тронут.

Проверки: `git status` career-site — только `assets/shots/` изменённые (+ предсуществующий `?? CANDIDATE_PROFILE.md.new`, не трогал), без коммита;
`index.html`/остальное не тронуты; чужие проекты кодом не правились (только read-only запуски `--help` и GET/POST на локальных серверах);
серверы 8091/8092 убиты скриптами (`srv.terminate()`), 8088 оставлен жив (чужой); `stash@{0}` не тронут.
