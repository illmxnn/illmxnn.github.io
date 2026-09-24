# Shots manifest — CAREER-SHOTS-20260924-Job1 (2026-09-24)

12 кадров, ноль picsum/плейсхолдеров. Все пиксели — реальные рендеры браузера (stealth-chrome screenshot):
живые/local UI, Swagger, страницы GitHub и дословные выводы/код, открытые через `file://`.
Фрагменты кода — excerpt'ы с точным указанием файла и строк (шапка внутри кадра).

| файл | проект | источник | размер | тип | статус |
|---|---|---|---|---|---|
| ledstil-catalog-1280.png | LedStil | `http://127.0.0.1:8088/public/ru/index.php` — локальный PHP `php -S 127.0.0.1:8088 local-router.php` (сервер чужой, предсуществующий, не трогал), viewport 1280×900 | 128.1 KB | ui | real |
| ledstil-card-390.png | LedStil | `http://127.0.0.1:8088/ru/led-strip.php` — тот же локальный PHP, viewport 390×844 (mobile) | 134.5 KB | ui | real |
| rag-docs-1280.png | RAG Demo (`C:\Work\RAG-Demo`, lexical-only) | `python -m uvicorn app.main:app --port 8092` → `http://127.0.0.1:8092/docs` (Swagger, только GET; сервер мой, после убит) | 43.5 KB | docs | real |
| rag-query-1280.png | RAG Demo | тот же сервер, Swagger Try-it-out `POST /query` `{"question":"What is the return policy?","top_k":3,"retrieval_mode":"lexical"}` → 200, честный evidence-gate отказ (`sufficient_evidence:false`); данные не тронуты | 26.5 KB | ui | real |
| ingul-catalog-1280.png | Ingul | `python -m http.server 8091` в `C:\Work\Ingul` → `http://127.0.0.1:8091/html/index.html`, viewport 1280×900 (сервер мой, после убит) | 338.3 KB | ui | real |
| ingul-catalog-390.png | Ingul | тот же сервер и URL, viewport 390×844 (mobile) | 90.8 KB | ui | real |
| docs-analyzer-repo-1280.png | DocumentAnalyzer | `https://github.com/illmxnn/PDF-HTML-TXT-WORD-Document-Analyzer` — страница репо. GUI (PySide6) headless снять нельзя без фейка; `main.py --help` виснет (>120 c, процесса не осталось). Честный fallback | 103.1 KB | repo | fallback-честно-подписан |
| docs-analyzer-code-1280.png | DocumentAnalyzer | `https://github.com/illmxnn/PDF-HTML-TXT-WORD-Document-Analyzer/blob/main/src/core/search.py` — фрагмент кода. Честный fallback (см. выше) | 92.7 KB | code | fallback-честно-подписан |
| justcars-help-1280.png | JustCars Exporter | `python C:\Work\JustCars\sync_catalog.py --help` (только argparse, без сети/записей) — вывод сохранён в `%TEMP%\opencode\justcars-help.txt`, снят через `file://` | 34.5 KB | terminal | real |
| justcars-code-1280.png | JustCars Exporter | excerpt `C:\Work\JustCars\sync_catalog.py` строки 143–201 (`SyncError`, `fetch_html`, `fetch_many_html`), пайплайн НЕ запускался, снят через `file://` | 52.6 KB | code | real |
| paybots-code-1280.png | Payment Bots | excerpt `C:\Work\payment_bots\platform\bot\handlers\payments.py` строки 1–60, read-only, никаких запусков с сетью/платежами, снят через `file://` | 65.7 KB | code | fallback-честно-подписан |
| paybots-struct-1280.png | Payment Bots | read-only листинг корневого каталога `C:\Work\payment_bots` (15 бот-папок + `platform` + `main`), снят через `file://` | 21.3 KB | code | fallback-честно-подписан |

Проверки: `git status` career-site — только `assets/shots/` новое (+ предсуществующий `?? CANDIDATE_PROFILE.md.new`, не трогал), без коммита;
чужие проекты кодом не правились; серверы 8091/8092 убиты (`000`), 8088 оставлен жив (чужой).
