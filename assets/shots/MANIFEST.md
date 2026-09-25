# Shots manifest — CAREER-SHOTS-20260924-Job1 (2026-09-24) + RESHOOT-20260925 (2026-09-25)

12 кадров, ноль picsum/плейсхолдеров. Все пиксели — реальные рендеры браузера (stealth-chrome screenshot / system Chrome headless):
живые/local UI, Swagger, страницы GitHub и дословные выводы/код.
Фрагменты кода — excerpt'ы с точным указанием файла и строк (шапка внутри кадра).

## RESHOOT-20260925: все 12 открыты глазами в браузере (file://), вердикт по каждому
- Переснято 8: 5 тёмных кодовых карточек (#0B0B12, паддинги 28–32px, шапка с путём/источником, клип по контенту, без скроллбаров и обрезков строк,
  моноширинный Consolas 15px, подсветка-минимум) + ingul×2 без cookie-модалки + rag-query с телом ответа.
  Способ: `python` Playwright (`channel="chrome"`, headless), HTML-карточки собраны скриптом в `%TEMP%\\opencode\\reshoot`
  (репозиторий скриптами не засорён); UI — живые локальные серверы, после съёмки убиты.
- Оставлено 4 (глазами ok / чинится только в апстриме) — причины ниже в таблице.

| файл | проект | источник | размер | тип | статус |
|---|---|---|---|---|---|
| ledstil-catalog-1280.png | LedStil | `http://127.0.0.1:8088/public/ru/index.php` — локальный PHP `php -S 127.0.0.1:8088 local-router.php` (сервер чужой, предсуществующий, не трогал), viewport 1280×900 | 128.1 KB | ui | real, eye-ok-20260925 (слайдер/логотип биты в апстриме — отсутствующие ассеты, пересъём не лечит) |
| ledstil-card-390.png | LedStil | `http://127.0.0.1:8088/ru/led-strip.php` — тот же локальный PHP, viewport 390×844 (mobile) | 134.5 KB | ui | real, eye-ok-20260925 (фото товаров биты в апстриме — видны alt-тексты; пересъём не лечит) |
| rag-docs-1280.png | RAG Demo (`C:\Work\RAG-Demo`, lexical-only) | `python -m uvicorn app.main:app --port 8092` → `http://127.0.0.1:8092/docs` (Swagger, только GET; сервер мой, после убит) | 43.5 KB | docs | real, eye-ok-20260925 (все эндпоинты целиком, читаемо) |
| rag-query-1280.png | RAG Demo | ПЕРЕСНЯТ 2026-09-25: тот же сервер (`uvicorn`, после убит), Swagger Try-it-out `POST /query` `{"question":"What is the return policy?","top_k":3,"retrieval_mode":"lexical"}` → 200, клип блока операции до конца Response headers (без док-хвоста); тело ответа с честным evidence-gate отказом (`sufficient_evidence:false`) видно целиком; данные не тронуты | 56.8 KB | ui | real |
| ingul-catalog-1280.png | Ingul | ПЕРЕСНЯТ 2026-09-25: `python -m http.server 8091` в `C:\Work\Ingul` → `http://127.0.0.1:8091/html/index.html`, viewport 1280×900; cookie-модалка подавлена пресетом localStorage (`cookiesAccepted`+`languageSelected`, только состояние браузера) — hero «Ваша упаковка — Наша турбота» виден целиком (сервер мой, после убит) | 645.6 KB | ui | real |
| ingul-catalog-390.png | Ingul | ПЕРЕСНЯТ 2026-09-25: тот же сервер и URL, viewport 390×844 (mobile), модалка подавлена так же; hero + начало «Каталог» без перекрытий | 214.9 KB | ui | real |
| docs-analyzer-repo-1280.png | DocumentAnalyzer | `https://github.com/illmxnn/PDF-HTML-TXT-WORD-Document-Analyzer` — страница репо. ОСТАВЛЕН 2026-09-25 сознательно: GUI (PySide6) headless снять нельзя без фейка; `main.py --help` виснет (>120 c, процесса не осталось); страница репо — честное публичное лицо OSS-проекта, кадр полный, строки не обрезаны | 103.1 KB | repo | fallback-честно-подписан |
| docs-analyzer-code-1280.png | DocumentAnalyzer | ПЕРЕСНЯТ 2026-09-25: тёмная кодовая карточка, excerpt локального `C:\Work\DocumentAnalyzer\src\core\search.py` строки 1–44 (`SearchResult`, `SearchEngine.__init__`, `search()`), 446 строк всего — якоря проверены скриптом; вместо обрезанного GitHub-скрина со скроллбаром | 70.9 KB | code | real |
| justcars-help-1280.png | JustCars Exporter | ПЕРЕСНЯТ 2026-09-25: тёмная терминал-карточка — дословный `python C:\Work\JustCars\sync_catalog.py --help` (только argparse, без сети/записей) с промптом `C:\Work\JustCars>` и кареткой; вывод целиком, без пустой простыни | 53.3 KB | terminal | real |
| justcars-code-1280.png | JustCars Exporter | ПЕРЕСНЯТ 2026-09-25: тёмная кодовая карточка, excerpt `C:\Work\JustCars\sync_catalog.py` строки 143–201 (`SyncError`, `fetch_html`, `fetch_many_html`, якорь `class SyncError` проверен), пайплайн НЕ запускался | 104.4 KB | code | real |
| paybots-code-1280.png | Payment Bots | ПЕРЕСНЯТ 2026-09-25: тёмная кодовая карточка, excerpt `C:\Work\payment_bots\platform\bot\handlers\payments.py` строки 1–60, read-only, никаких запусков с сетью/платежами | 130.4 KB | code | real |
| paybots-struct-1280.png | Payment Bots | ПЕРЕСНЯТ 2026-09-25: тёмная терминал-карточка `dir /b` корня `C:\Work\payment_bots` (15 бот-папок + `platform` + `main`, read-only листинг, полный, без пустой простыни) | 46.3 KB | code | real |

Проверки: `git status` career-site — только `assets/shots/` изменённые (+ предсуществующий `?? CANDIDATE_PROFILE.md.new`, не трогал), без коммита;
`index.html`/остальное не тронуты; чужие проекты кодом не правились (только read-only запуски `--help` и GET/POST на локальных серверах);
серверы 8091/8092 убиты скриптами (`srv.terminate()`), 8088 оставлен жив (чужой); `stash@{0}` не тронут.
