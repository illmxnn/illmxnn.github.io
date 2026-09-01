# Illia Druzhenko — Portfolio

Статичный сайт-визитка: AI Automation Engineer | Python Backend Developer.
Premium minimal, Apple-inspired, чистый HTML/CSS без сборки — деплоится на GitHub Pages (illmxnn.github.io).

## Что внутри

- `index.html` — семантическая разметка (header/nav/main/section/footer), без AI-следов
- `style.css` — дизайн-система через CSS-переменные, Inter + JetBrains Mono, 390/768/1280 без overflow
- `DESIGN.md` — палитра, типографика, сетка, компоненты, motion L1, 3 варианта hero по sales-copy

Источник фактов: `CANDIDATE_PROFILE.md` (только CONFIRMED). Цифры — 170 / 4844, 12 тестов RAG, 656+ тестов CRM.

## Локальный запуск

Без сборки, просто откройте статику:

```bash
# вариант 1 — Python
python -m http.server 8000
# откройте http://localhost:8000

# вариант 2 — Node
npx serve .

# вариант 3 — просто файл
start index.html
```

Проверка: консоль без ошибок, якоря #projects / #skills / #contacts работают, фокус виден по Tab.

## Деплой на GitHub Pages (illmxnn.github.io)

Сайт уже оптимизирован под Pages — без build шага.

1. Создайте публичный репозиторий `illmxnn.github.io` (или `career-site` для project pages)
2. В `C:\Work\career-site`:
   ```bash
   git init
   git add .
   git commit -m "feat: initial portfolio"
   git branch -M main
   git remote add origin https://github.com/illmxnn/illmxnn.github.io.git
   git push -u origin main
   ```
3. В настройках репо > Pages > Source: Deploy from branch `main` / root
4. Проверка: `https://illmxnn.github.io` открывается, 390px и 1280px без горизонтального скролла

Для project pages (`/career-site/`): Pages > Source `main` / root, URL будет `https://illmxnn.github.io/career-site/`.

## Структура контента

- Hero — «Автоматизирую рутину: 170 авто > CRM за один запуск» (AIDA, 1 месседж, глаголы+выгода)
- 4 проекта: DocumentAnalyzer, RAG Demo, Ingul, JustCars Exporter (проблема > решение > стек > результат)
- «По запросу» — AgendHub и MorCars CRM, NDA-safe (описание/скринкаст по запросу)
- Навыки — лента пилюль
- Контакты — Telegram @illia_dev, GitHub illmxnn, email druzya771907@gmail.com

## Дизайн

См. `DESIGN.md`: тёплая бумага #FBFBF9, текст #0F1115, signal #FF3B30, скругления 16–20, тени 0–8px, motion 200–300ms, reduced-motion.

## Лицензия

© 2026 Illia Druzhenko. Код сайта — для портфолио, контент — по запросу.
