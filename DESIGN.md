# DESIGN.md — Illia Druzhenko Portfolio

> Инженерная точность вместо лозунгов: один запуск вместо недель ручной сверки.
Источник фактов: `C:\Work\Orchestrator\career\CANDIDATE_PROFILE.md` (только CONFIRMED), `GITHUB_PORTFOLIO_AUDIT.md`, `INTERVIEW_CHEATSHEET.md`. Все цифры ниже — только подтверждённые: 170 / 4844, 12 тестов RAG, 590+/656+ тестов MorCars.

---

## 1. Visual Theme & Atmosphere

**Style**: Precision Minimal — Apple-инспирированный белый минимал с индустриальным моно-акцентом (инженерный каталог, не маркетинг).
**Keywords**: точный, спокойный, тактильный, достоверный, инженерный, сдержанный, читаемый, материальный
**Tone**: уверенная тишина инженера — NOT крикливый стартап, NOT «спокойная панель» без выгоды, NOT тёмный неон
**Feel**: как разложенный на светлом столе инструмент: каждый элемент на своём месте, металл и бумага, ничего лишнего
**Interaction Tier**: L1 —???? (элегантный hover + мягкий вход, без scroll-jacking)
**Dependencies**: CSS only + `IntersectionObserver` (vanilla, < 2KB) для fade-in; `prefers-reduced-motion` обязателен

Signature risk: **моно-рельс** — вертикальная линия-таймлайн с сигнальной точкой вермильон, соединяющая hero > проекты > «по запросу». Одна линия на всю страницу, вместо десятка декораций. Запоминается, но не шумит.

---

## 2. Color Palette & Roles
```css
:root {
  /* Backgrounds */
  --bg: #FBFBF9;                         /* страница — тёплая бумага */
  --surface: #FFFFFF;                    /* карточка */
  --surface-alt: #F2F2EF;                /* чередующаяся секция / muted */
  --surface-hover: #FFFFFF;              /* hover карточки — остаётся белой, меняется бордер/тень */
  /* Borders */
  --border: #E8E8E0;                     /* волосная линия */
  --border-hover: #D6D6CF;               /* hover бордера */
  --border-strong: #111214;              /* акцентный бордер для primary */
  /* Text */
  --text: #0F1115;                        /* заголовки — почти чёрный */
  --text-secondary: #5E636E;              /* описания — тёплый серый */
  --text-tertiary: #6E6E73;               /* подпись, лейбл */
  --text-on-accent: #FFFFFF;
  /* Accent — сдержанный: чёрный как primary, вермильон как сигнал */
  --accent: #0F1115;                      /* primary CTA, ссылки-акценты */
  --accent-hover: #000000;
  --signal: #FF3B30;                      /* одна сигнальная точка/маркер */
  --signal-hover: #E6352B;
  --accent-muted: #EDEDEA;                /* pill фон */
  /* RGB variants */
  --bg-rgb: 251,251,249;
  --surface-rgb: 255,255,255;
  --text-rgb: 15,17,21;
  --accent-rgb: 15,17,21;
  --signal-rgb: 255,59,48;
  --border-rgb: 232,232,224;
  /* Semantic */
  --success: #1A7F37;
  --warning: #9A6700;
  --error: #CF222E;
  --focus: #0A84FF;
}
```

**Color Rules:**
- Все цвета — через CSS-переменные, ноль хардкода hex в компонентах
- Одна страница — один сигнальный цвет (`--signal`) только для маркеров/точек, не заливать большие площади
- Текст на `--surface` всегда проходит WCAG AA ( #0F1115 на #FFFFFF = 18.8:1, #5E636E на #FFFFFF = 7.1:1 )
- Полупрозрачные поверхности — только для навигации (`backdrop-filter: blur(14px) saturate(180%)`), не для карточек контента
- Не ставить светлую полупрозрачную панель на светлую — читаемость падает (Apple Materials rule)

---

## 3. Typography Rules

**Font Stack:**
```css
@import url(''https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap'');
:root {
  --font-sans: "Inter", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}
```

| Role | Font | Size | Weight | Line Height | Letter Spacing |
|------|------|------|--------|-------------|----------------|
| Eyebrow / Mono label | JetBrains Mono | 11px | 500 | 1.4 | 0.08em (uppercase) |
| Hero H1 | Inter | clamp(32px, 5vw, 52px) | 700 | 1.05 | -0.03em |
| Hero sub | Inter | 17px | 400 | 1.6 | -0.01em |
| Section H2 | Inter | 28px | 700 | 1.15 | -0.02em |
| H3 (card title) | Inter | 18px | 600 | 1.3 | -0.015em |
| Body | Inter | 15.5px | 400 | 1.7 | -0.01em |
| Small / caption | Inter | 13px | 400 | 1.6 | 0 |
| Mono / code | JetBrains Mono | 13px | 400 | 1.6 | 0 |

**Typography Rules:**
- Heading weight ? 600, body 400, mono 500 для лейблов
- Крупный текст — негативный трекинг, body около 0 (Apple tracking rule)
- Лимиты Apple copywriting: H1 ? 8 слов (EN) / 12 симв (ZH) — не применимо напрямую, но держим H1 в одну мысль, ? 14 слов RU
- Моно только для system-меток (stack, цифры, статусы), не для прозы
- **NEVER use**: Playfair Display, Fraunces, Orbitron, Comic-like, рукописные; не мешать 3+ семейства
- Fallback обязателен — системный sans если Inter не загрузился

**Text Decoration:**
- Hero H1: без градиента, без тени — уверенность через размер/треккинг, не через декор
- Section H2: тонкая волосная линия слева (`--signal` 2px) как маркер, не градиент
- По `text-decoration-rules.md`:???? — градиент только если бренд просит «wow», здесь запрещён

---

## 4. Component Stylings

### Buttons

```css
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  min-height: 44px; padding: 0 18px; border-radius: 999px;
  font: 500 14px/1 var(--font-sans); letter-spacing: -0.01em;
  text-decoration: none; cursor: pointer;
  transition: transform 200ms cubic-bezier(0.2,0.8,0.2,1), background 200ms ease, border-color 200ms ease, color 200ms ease, box-shadow 200ms ease;
  will-change: transform;
}
.btn:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
/* Primary — чёрная таблетка (Apple-like) */
.btn--primary {
  background: var(--accent); color: var(--text-on-accent); border: 1px solid var(--accent);
  box-shadow: 0 1px 2px rgba(15,17,21,0.08), 0 4px 12px rgba(15,17,21,0.10);
}
.btn--primary:hover { background: var(--accent-hover); transform: translateY(-1px); box-shadow: 0 4px 16px rgba(15,17,21,0.14); }
.btn--primary:active { transform: scale(0.98); transition-duration: 100ms; }
.btn--primary:disabled { opacity: 0.45; pointer-events: none; }
/* Secondary — контур на белом */
.btn--secondary {
  background: var(--surface); color: var(--text); border: 1px solid var(--border-strong);
}
.btn--secondary:hover { background: var(--surface); border-color: var(--text); transform: translateY(-1px); }
.btn--secondary:active { transform: scale(0.98); }
.btn--secondary:disabled { opacity: 0.45; pointer-events: none; }
/* Ghost — текстовая, для «Демо по запросу» */
.btn--ghost {
  background: transparent; color: var(--text-secondary); border: 1px solid var(--border);
  border-radius: 999px;
}
.btn--ghost:hover { color: var(--text); border-color: var(--border-hover); background: var(--surface-alt); }
.btn--ghost:active { transform: scale(0.98); }
```

### Cards (project)
```css
.card {
  background: var(--surface); border: 1px solid var(--border); border-radius: 20px;
  padding: 22px; display: flex; flex-direction: column; gap: 14px;
  box-shadow: 0 1px 2px rgba(15,17,21,0.04);
  transition: border-color 220ms ease, box-shadow 220ms ease, transform 220ms cubic-bezier(0.2,0.8,0.2,1);
}
.card:hover { border-color: var(--border-hover); box-shadow: 0 8px 32px rgba(15,17,21,0.08); transform: translateY(-2px); }
.card:focus-within { border-color: var(--text); box-shadow: 0 0 0 1px var(--text); }
.card__eyebrow { font: 500 11px/1.4 var(--font-mono); letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-tertiary); display: flex; align-items: center; gap: 8px; }
.card__eyebrow::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: var(--signal); flex: 0 0 6px; }
.card__title { font: 600 18px/1.3 var(--font-sans); letter-spacing: -0.015em; color: var(--text); }
.card__desc { font: 400 14px/1.7 var(--font-sans); color: var(--text-secondary); }
.card__meta { display: flex; flex-wrap: wrap; gap: 6px; }
.card__result { font: 500 12.5px/1.5 var(--font-mono); color: var(--text); background: var(--surface-alt); border: 1px solid var(--border); border-radius: 999px; padding: 6px 10px; }
.card__stack { display: flex; flex-wrap: wrap; gap: 6px; }
.tag { font: 500 11px/1 var(--font-mono); letter-spacing: 0.04em; color: var(--text-secondary); background: var(--accent-muted); border: 1px solid var(--border); border-radius: 999px; padding: 6px 8px; }
```

### Navigation (translucent)
```css
.nav {
  position: sticky; top: 0; z-index: 40;
  background: rgba(251,251,249,0.72); backdrop-filter: blur(14px) saturate(180%); -webkit-backdrop-filter: blur(14px) saturate(180%);
  border-bottom: 1px solid rgba(232,232,224,0.9);
}
.nav__inner { max-width: 1280px; margin: 0 auto; padding: 14px 24px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.nav__brand { font: 600 13px/1 var(--font-mono); letter-spacing: 0.04em; color: var(--text); text-decoration: none; }
.nav__links { display: flex; gap: 18px; }
.nav__link { font: 500 13px/1 var(--font-sans); color: var(--text-secondary); text-decoration: none; padding: 8px 0; border-bottom: 1px solid transparent; transition: color 180ms ease, border-color 180ms ease; }
.nav__link:hover { color: var(--text); }
.nav__link:focus-visible { outline: 2px solid var(--focus); outline-offset: 4px; border-radius: 2px; }
```

### Links
```css
.link { color: var(--text); text-decoration: underline; text-decoration-color: var(--border-hover); text-underline-offset: 3px; transition: text-decoration-color 180ms ease, color 180ms ease; }
.link:hover { text-decoration-color: var(--text); }
.link:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; border-radius: 2px; }
```

### Tags / Pills / Skill
```css
.skill-pill {
  display: inline-flex; align-items: center; min-height: 32px; padding: 0 12px;
  font: 500 12.5px/1 var(--font-mono); color: var(--text-secondary);
  background: var(--surface); border: 1px solid var(--border); border-radius: 999px;
}
```

### Evidence strip (metrics)
```css
.evidence { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; border: 1px solid var(--border); border-radius: 16px; background: var(--surface); padding: 14px; }
.evidence__item { text-align: left; }
.evidence__num { font: 700 20px/1 var(--font-sans); letter-spacing: -0.03em; color: var(--text); }
.evidence__label { font: 500 10px/1.4 var(--font-mono); letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-tertiary); margin-top: 4px; }
```

---

## 5. Layout Principles

**Container:**
- Max width: 1280px (content), 720px narrow для текста
- Padding: 24px desktop, 20px tablet, 16px mobile (390)
- Section vertical rhythm: 88px desktop / 64px tablet / 48px mobile

**Spacing Scale (8pt + 4pt для мелочей):**
- 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 88, 120

**Grid:**
```css
.container { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
.hero { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 32px; align-items: start; }
.projects { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.skills { display: flex; flex-wrap: wrap; gap: 8px; }
@media (max-width: 960px) { .hero { grid-template-columns: 1fr; } .projects { grid-template-columns: 1fr; } }
@media (max-width: 640px) { .container { padding: 0 16px; } }
```

Правила: секция = один смысл; проекты — bento 2-колонки, не скучный 1?4; «По запросу» — во всю ширину, визуально отделена пунктиром.

---

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat | no shadow, border 1px var(--border) | skill pills, inline tags |
| Subtle | `0 1px 2px rgba(15,17,21,0.04)` | карточки в покое |
| Elevated | `0 8px 32px rgba(15,17,21,0.08), 0 1px 2px rgba(15,17,21,0.06)` | card hover, dropdown |
| Nav | `0 1px 0 rgba(15,17,21,0.04)` + blur 14px | sticky nav |
| CTA | `0 4px 16px rgba(15,17,21,0.14)` | primary button hover |

Тени только на тёплом чёрном (15,17,21) с низкой непрозрачностью — без синих/цветных glow. Blur ? 14px, не накрывать скролл-контент.

---

## 7. Animation & Interaction

**Motion Philosophy**: Сдержанно-материально: только `transform` + `opacity`, 200–300ms, ease-out с лёгким spring (cubic-bezier 0.2,0.8,0.2,1). Одно оркестрованное появление, дальше — микровзаимодействия.
**Tier**: L1

### Dependencies
```html
<!-- нет сторонних либ; только нативный IntersectionObserver -->
```

### Entrance Animation
```css
.reveal { opacity: 0; transform: translateY(10px); transition: opacity 520ms ease, transform 520ms cubic-bezier(0.2,0.8,0.2,1); }
.reveal.is-visible { opacity: 1; transform: none; }
.reveal[data-delay="1"] { transition-delay: 80ms; }
.reveal[data-delay="2"] { transition-delay: 160ms; }
```

### Scroll Behavior
```js
// L1 reveal — один раз, без повторов
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add(''is-visible''); io.unobserve(e.target);} });
},{ threshold: 0.14, rootMargin: ''0px 0px -40px 0px'' });
document.querySelectorAll(''.reveal'').forEach(el=> io.observe(el));
```

### Hover & Focus States
```css
a:focus-visible, button:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
.card, .btn { will-change: transform; }
@media (hover: none) { .card:hover { transform: none; box-shadow: 0 1px 2px rgba(15,17,21,0.04); } }
```

### Special Effects
- Моно-рельс: `position: absolute` линия 1px `var(--border)` от hero до footer, с градиентным fade на концах; точки — 6px сигнал.
- Hero proof-card: лёгкий `translateY(-1px)` на hover, без blur.

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
  .card, .btn { transition: none; }
  * { scroll-behavior: auto !important; animation: none !important; }
}
@media (prefers-reduced-transparency: reduce) {
  .nav { background: var(--bg); backdrop-filter: none; -webkit-backdrop-filter: none; }
}
```

---

## 8. Do''s and Don''ts

### Do
- Писать заголовки выгодой, а не фичей — одна мысль на блок, цифра где возможно
- Держать карточку проекта в структуре Проблема > Решение > Стек > Результат
- Проверять контраст до публикации (AA минимум)
- Давать каждому интерактиву hover + focus-visible + active + disabled
- Использовать моно только для меток/цифр/стека
- Показывать код/репозиторий вместо лозунгов («показываю код, а не лозунги»)
- Формулировать «По запросу» NDA-safe: без клиентских деталей, только «доступно описание/скринкаст»
- Держать сетку 8pt и волосы-линии 1px — точность читается как надёжность
### Don''t
- ? Не писать «Разрабатываю боты и CRM» / «Спокойная панель» — сухое перечисление фичей без выгоды
- ? Не выдумывать метрики: никаких «пользователей», «выручки», «на 40% быстрее» без CONFIRMED
- ? Не писать Advanced / Lead / Senior без подтверждения
- ? Не хардкодить hex вне :root — только CSS-переменные
- ? Не ставить blur > 14px и не накрывать blur''ом большие скролл-зоны
- ? Не делать 12 карточек одинакового размера — только bento 2-колоночная сетка с вариацией
- ? Не использовать эмодзи как иконки (кроме signal-точки) — только текст/моно
- ? Не прятать CTA внизу — первый экран должен содержать 2 CTA (GitHub + Telegram)
- ? Не использовать тяжёлые фреймворки/бандлы — чистая статика для GitHub Pages
- ? Не оставлять AI-следов в коде/коммитах/комментах
---
## 9. Responsive Behavior
**Breakpoints:**
| Name | Width | Key Changes |
|------|-------|-------------|
| Desktop | > 960px | 2-колонки hero + 2-колонки проекты, nav links в линию |
| Tablet | 641–960px | hero 1 колонка, проекты 2>1 при 720, evidence 4>2 |
| Mobile | ? 640px | всё в 1 колонку, nav компакт, карточки radius 16, кнопки full-width где нужно |
| Small | 390px | тестовая ширина — нет горизонтального скролла, padding 16, текст 15.5px читаем |
**Touch Targets:** minimum 44?44px (кнопки 44px высота, nav link увеличенный hit-area)
**Collapsing Strategy:** hero visual уходит под текст; evidence strip схлопывается в 2?2; проекты — 1 колонка; скиллы — перенос; контакты — 1 колонка
**Overflow guard:**
```css
html, body { overflow-x: clip; }
img, video { max-width: 100%; height: auto; }
.container, .card, .evidence { min-width: 0; }
```
```css
@media (max-width: 640px) {
  .hero { gap: 20px; }
  .evidence { grid-template-columns: repeat(2,1fr); }
  .btn--primary, .btn--secondary { width: 100%; }
  .nav__links { gap: 12px; }
}
```
---
## 10. Sales Copy — 3 варианта hero (AIDA / PAS / 4U) + выбор
### Вариант A — AIDA (выбран для сайта) — Рекомендован
**H1:** Автоматизирую рутину: 170 авто > CRM за один запуск.
**Sub:** Каталог 170 авто и 4 844 фото > детерминированный XLSX/XML без ручной сверки. Брони с OCR и тарифами — без ошибок импорта. Python, FastAPI, Telegram, Docker. Показываю код: 12 тестов RAG-демо и 656+ тестов CRM.
**CTA:** [Посмотреть GitHub >] [Написать в Telegram — отвечу сегодня]
**Формула:** Attention (автоматизирую рутину) > Interest (170>CRM за запуск) > Desire (без ручной сверки/ошибок) > Action (глагол+выгода)
**Почему работает:** один месседж, сверх-конкретика, доказательство цифрами, глагол+выгода в CTA.
### Вариант B — PAS (болевой, для вдумчивых)
**H1:** Надоело переносить каталог и брони вручную?
**Sub:** Каждый экспорт — часы сверки, ошибки цен и потерянные фото. Собираю поток в один детерминированный пайплайн: парсинг > нормализация > XLSX/XML > импорт. 170 авто и 4 844 изображения за один прогон, воспроизводимо и покрыто тестами.
**CTA:** [Разобрать ваш процесс за 15 минут >]
**Формула:** Problem (ручной перенос) > Agitate (часы, ошибки) > Solution (детерминированный пайплайн + цифры)
### Вариант C — 4U (ультра-конкретика, для скептиков)
**H1:** От идеи до рабочего экспорта — за один спринт. Без NDA-рисков.
**Sub:** Готовый пайплайн уже проверен: точные заголовки, нормализация чисел, детерминированные изображения, валидация под импортёр. RAG-демо с hybrid-поиском и цитатами — на GitHub, 12 тестов, Docker.
**CTA:** [Скачать пример экспорта >]
**Формула:** Useful (готовый пайплайн) + Urgent (за спринт) + Unique (детерминированно + NDA-safe) + Ultra-specific (170/4844, заголовки, Qdrant)
**Чеклист 7 — прогон варианта A (выбранного):**
- [x] Выгода, а не фича: «за один запуск без ручной сверки» вместо «панель провайдеров»
- [x] Конкретика: 170, 4 844, 12, 656+, XLSX/XML, OCR, FastAPI/Telegram/Docker
- [x] Боль/желание: рутина/ручная сверка/ошибки импорта
- [x] Доказательство: цифры из CONFIRMED + ссылка на GitHub
- [x] Срочность/уникальность: «за один запуск», «детерминированно», NDA-safe
- [x] Один месседж: автоматизация рутины > CRM без ручной работы
- [x] CTA глагол+выгода: «Посмотреть GitHub >» и «Написать в Telegram — отвечу сегодня»
Apple copy доп-проверка (copywriting.md): один тезис на строку, коротко, выгода впереди, ритм через точку — соблюдено.
---
## 11. Контент-карта (для index.html)
- Header/nav: Illia Druzhenko — AI Automation Engineer | Python Backend Developer (позиционирование), якоря: Проекты / Навыки / Контакты
- Hero: Вариант A + proof-strip (170 / 4844 / 12 / 656+) + 2 CTA + моно-рельс
- Проекты: 4 карточки (DocumentAnalyzer, RAG Demo, Ingul, JustCars Exporter) + 1 широкая «По запросу»
- Навыки: лента пилюль
- Контакты: Telegram @illia_dev, GitHub illmxnn, email, Киев/Remote/B2 English (изм. копи 2026-09-25: упоминание DUICT удалено везде — hero-note, about, contacts)
- Footer: Kyiv • Remote • B2 English • © 2026 Illia Druzhenko
Все тексты проектов — по формуле PAS/JTBD, без «Advanced/Lead/выручка/пользователи». Только CONFIRMED.

---
## 12. Paper lab (2026-09-24)

> Светлая лаборатория вместо тёмного космоса: чертёжная сетка, моно-схемы, одна тёмная консоль.

- supersedes 2026-09-24: dark void (stash@{0}) + picsum gallery (removal note: void-маршрут и фото-лента удалены, stash не трогать).
- **Hero**: чертёжная сетка 28px на `hero-wrap` + тёмная консоль `#101216` с typing-циклом лога экспортёра (40–60ms/char, hold 2.6s, каретка `--signal`) + inline SVG-схема парсинг→нормализация→импорт с dash-flow 1.1s. Reduced-motion: полный текст сразу, поток статичен, каретка скрыта.
- **Карточки (6)**: вместо фото-лент — мини pipeline-SVG (3 узла, моно 11px) + бейдж моно-цифрами; структура Проблема→Решение→Стек→Результат и все тексты untouched. Схемы: LedStil каталог→аудит→генерация, DocumentAnalyzer сканы→FTS→поиск, RAG чанки→hybrid→цитаты, Ingul static→ленты→Pages, JustCars парсинг→нормализация→импорт, Payment платежи→409·retry→своп.
- **Галерея**: секция, якорь в nav, CSS и JS удалены без хвостов; кикеры Skills 03→02, Contacts 04→03.
- **`/3d/`**: редирект на `/` (meta refresh + `location.replace` + ссылка + 5 строк); внешних модулей и моделей ноль, страница статична.
- **Motion**: только `transform` + `opacity` 200–220ms + dash-flow/stagger reveal; tilt и параллакс убраны — плоская чертёжная эстетика. Зависимостей JS ноль.
- **Бюджеты**: 0 JS-библиотек, LCP <2.5s, 1280/390 без HScroll, tap 44px, AA, консоль 0 ошибок.


---

## 13. Wow dark v2 (2026-09-24)

> Глубокий фон, сочные градиентные blob, стекло, glow и одна светящаяся 3D-сцена в hero. Реальные кадры вместо схем.

- supersedes 2026-09-24: paper lab (светлая лаборатория, чертёжная сетка, моно-консоль с typing, pipeline-SVG в карточках).
- **Фон**: `--bg #07070D`, текст `#F4F4F5`, вторичный `#BDBDC9`, третичный `#8E8E9C` (AA на фоне). Три hue: violet `#7C5CFF` / cyan `#38E1FF` / magenta `#FF4ECD`; поверхности — стекло `rgba(255,255,255,0.045)` + blur, бордеры `rgba(255,255,255,0.10)`.
- **Hero**: 1 canvas Three.js (частицы-волна, mouse + scroll reactive, DPR cap 1.5 / mobile 1.0, пауза offscreen + `document.hidden`, старт после first paint). Без WebGL — CSS mesh-градиент, всё равно вау. H1 AIDA + 2 CTA + proof-strip (170/4844, 2500+, 656+, 15+ — те же цифры, та же подача).
- **Секции (10 блоков)**: hero / marquee-цифры / 6 кейсов / NDA-блок по запросу / процесс 4 шага / возможности / FAQ для неайтишников / обо мне / контакты / footer.
- **Кейсы**: у каждого 2 реальных кадра из `assets/shots/` + табы «Простыми словами» / «Технически» (кнопки, стрелки клавиатуры) + результат-полоса. Fallback-кадры подписаны честно («страница репозитория», «фрагмент кода»).
- **Навигация**: Проекты / Процесс / FAQ / Контакты + CTA «Написать» (макс 5), mobile-бургер, активный якорь, плавный скролл, back-to-top.
- **Motion**: CSS-tilt карточек за курсором, магнит CTA ≤6px, reveal, marquee (пауза по hover). Только transform/opacity, interruptible. Reduced-motion: полная статика, контент целиком.
- **Бюджеты**: 0 JS-библиотек кроме three CDN; LCP <2.5s (LCP — текст H1); 1280/390 без HScroll; tap ≥44px; AA; консоль 0 ошибок.
- **`/3d/`**: редирект не тронут. RU/EN-переключатель убран сознательно (скоп: один язык, вдвое меньше копи).

---

## 14. Shot-system (2026-09-25)

> Компактно в карточке, полное чтение по клику: кадры больше не расползают карточку, текст читается в лайтбоксе.

- **Фреймы `.shot-frame`**: тёмное стекло v2 + radius 14px + hairline border; сверху мини-бар (3 точки + имя файла моно 11px). `img { object-fit: cover; object-position: top center; width: 100%; height: 100% }` — кроп всегда сверху, где шапка интерфейса.
- **Варианты**: `--wide` (16/10, desktop UI, фрейм ≤440px), `--tall` (3/4, mobile-кадры, фрейм ≤420px desktop / ≤320px mobile), `--code` (16/7, автовысота до 300px, листинги и структуры).
- **Лайтбокс `.shotbox`**: клик/Enter/Space по кадру → fullscreen overlay; картинка `contain` целиком, высокие — скролл внутри; закрытие Esc / клик по фону / крест 44px; фокус возвращается на кадр; `role="dialog"`, `aria-modal`, `aria-label`; reduced-motion — открытие без анимации.
- **Подписи `.case__cap`**: моно 13px (`≥12.5px`), формат «▲ что на кадре · тип» (desktop UI / mobile UI / терминал / код / API / GitHub).
- **Клавиатура**: каждый кадр — нативная `<button>`, тапы контролов лайтбокса ≥44px.
- **Бюджеты**: ни один кадр не выше 440px в карточке (desktop) / 340px (mobile 390); HScroll 0 @1280/@390; консоль 0 ошибок.

---

## 15. Future gallery (2026-09-25)

> Листающаяся футуристичная галерея вместо статичных фреймов: каждый кейс — свайп-трек в духе тёмного v2.

- **Структура `.shots`**: `viewport` (неоновый hairline + едва видимая сетка 28px + верхнее свечение) > `track` (flex, scroll-snap mandatory, скроллбар скрыт) > `slide` × N (фрейм + своя подпись). Под треком — хром-бар: стрелка ‹, HUD-счётчик `01/02` (mono, live), точки-пилюли, стрелка ›.
- **Состояния**: активный слайд — cyan-рамка + glow (`--glow-b` + hairline `rgba(56,225,255,.5)`); точка активного — пилюля 20px градиентом violet→cyan; стрелки на границах — `disabled` 35%.
- **Ввод**: нативный свайп пальцем + drag мышью (pointer events, порог 5px, клик после драга гасится — лайтбокс не всплывает случайно); стрелки; клавиатура на треке (←/→/Home/End, `tabindex=0`, `role=region` + `aria-roledescription="carousel"`); индекс всегда выводится из реального скролла (центр слайда к центру трека).
- **Лайтбокс `.shotbox`**: без изменений — клик/Enter/Space по слайду открывает полный кадр поверх слайдера, Esc/фон/крест закрывают, фокус возвращается.
- **Высоты**: reuse shot-system — wide 16/10, tall 3/4, code 16/7; в карточке виден один слайд + хром-бар, карточка не раздувается.
- **Reduced motion**: snap proximity, programmatic scroll `auto`, transitions off; автоплея нет вообще.
- **Бюджеты**: HScroll 0 @1280/@390, консоль 0, стрелки/крест 44px, `diff --check` clean.

---

## 16. Retina shots + hint (2026-09-25)

> Кадры чёткие на ретине, открытие очевидно: мыло от апскейла убрано, хинт виден.

- **DPR2**: все 12 png сняты с `deviceScaleFactor=2` (1280 CSS → 2560 px, 390 CSS → 780 px), те же имена/фрейминг; MANIFEST фиксирует dpr2 + размеры.
- **Anti-upscale**: `.shot-frame--tall { max-width: 390px }` — мобильные кадры никогда не шире 390 CSS (0.5x от 780 px); wide/code и так уже в даунскейле (колонка ~574 < 1280); `image-rendering` не тронут, srcset не нужен.
- **Хинт `.shot-hint`**: чип «⤢ Открыть полностью» 12.5px поверх кадра справа-снизу; hover/focus — появление, touch (`hover: none`) — всегда полупрозрачный 0.92; `aria-hidden`, клик проходит в кнопку; cursor zoom-in сохранён; aria-label каждого кадра дополнен «, открывается полностью»; лайтбокс без изменений.
- **Подписи**: `.case__cap` 13px (≥12.5px), формат «▲ что · тип» сохранён.
- **Бюджеты**: HScroll 0 @1280/@390, консоль 0, reduced-motion — хинт без транзишена.

---

## 17. HUD-панель + единая высота + фейд (2026-09-25)

> Панель читается как прибор: круглые кнопки, крупный счётчик, тонкий бар. Слайды одной высоты, обрезка видна сразу.

- **Панель `.shots__bar`**: одна HUD-строка в духе v2 — стекло + blur 12px, radius 16px, padding 8px, gap 12px (8px на 390), сетка 8pt. Порядок: стрелка ‹ счётчик › бар › стрелка.
- **Стрелки `.shots__arrow`**: круг 44px, glass-градиент, glow-бордер `rgba(56,225,255,0.35)`, внутренняя светлая кромка + внешнее свечение; шеврон SVG 18px (не голый символ); hover — бордер 0.7 + свечение; disabled — 35%; focus-visible — кольцо `--focus`.
- **Счётчик `.shots__count`**: моно 14px, tabular-nums, формат `01 / 02` с разделителем; текущее — `--text`, всего — `--text-secondary`; `aria-live="polite"`, индекс из реального скролла; JS дописывает total и ширину бара.
- **Прогресс `.shots__progress`**: тонкая полоса 3px вместо пилюли с точкой; трек `rgba(255,255,255,0.14)`, заливка градиентом violet→cyan + glow; ширина `(i+1)/n`; transition 260ms; reduced-motion — без transition.
- **Единая высота**: `--shots-h: 380px` desktop / `340px` mobile 390; `.shot-frame` строго `height: var(--shots-h)`; `.shot-frame__view` — `height: 342px` desktop / `302px` mobile, `aspect-ratio: auto`, `object-fit: cover, top`; варианты wide/tall/code переопределены — высота не прыгает при листании; tall-кадры по-прежнему `max-width: 390px` по центру.
- **Сигнал обрезки**: `::after` фейд 76px `transparent → rgba(7,7,13,0.92)` поверх низа кадра + чип по центру низа всегда видим (не только hover); чип — пилюля с cyan-бордером и свечением; курсор zoom-in; подписи и лайтбокс без изменений.
- **Бюджеты**: высоты равны внутри каждого слайдера (замер evaluate), HScroll 0 @1280/@390, консоль 0, тапы 44px, `diff --check` clean.

---

## 18. HUD-compact + центрирование кадров (2026-09-25)

> Прибор стал компактным: узкая пилюля по центру, счётчик строго посередине, тонкая нить прогресса поверх.

- **Панель `.shots__bar`**: `max-width: 240px`, `width: fit-content`, `margin-inline: auto` — вся строка по центру карточки; radius 999px (пилюля), padding 5px 8px, gap 8px. Порядок в DOM без изменений: стрелка ‹ счётчик › стрелка; бар вынесен поверх.
- **Стрелки `.shots__arrow`**: круг 32px (визуально мелкие по вердикту юзера 2026-09-25 «всё равно огромный»), шеврон 14px, glow-бордер и состояния без изменений.
- **Счётчик `.shots__count`**: `flex: 0 1 auto`, `min-width: 62px`, `text-align: center` — цифры строго по центру панели; mono 12px, tabular-nums, `aria-live="polite"` без изменений.
- **Прогресс `.shots__progress`**: тонкая нить 2px поверх панели (`position: absolute; left: 24px; right: 24px; top: -1px`), ширина `(i+1)/n`, градиент violet→cyan + glow; transition 260ms; reduced-motion — без transition.
- **Кадры по центру**: `.shots__slide { align-items: center }`, `.shot-frame { width: 100%; margin-inline: auto }`; tall — `max-width: 390px` по центру, боковые gutter симметричны; `object-position: top center` сохранён; высоты 380/340, фейд 76px + чип, лайтбокс, DPR2 — без изменений.
- **Бюджеты**: ширина панели ≤340px desktop, gutter-diff tall ≤2px, HScroll 0 @1280/@390, консоль 0, тапы 44px, `diff --check` clean.

---

## 19. Mobile fixes (2026-09-25)

> Четыре фикса по скринам юзера @390: читаемый hero, меню-оверлей, без универа, слайдер без стрелок.

- **Hero ≤640px**: `.hero .eyebrow` — 10.5px, `letter-spacing 0.04em`, `text-transform: none`, wrap без трекинг-каши; `.hero__h1` — 30px / `line-height 1.18`; `.hero__sub` — 15px/1.65; hero-padding 48px.
- **Меню-оверлей ≤760px**: `.nav__mobile` — `position: fixed; inset: 0; z-index: 80`, фон `rgba(7,7,13,0.92)` + blur 18px; открытие не сдвигает layout; бургер поверх (z 82, крест × при открыто); закрытие — Esc / крест / клик по ссылке; `body.menu-open` — lock скролла; фокус — первый линк при открытии, возврат на бургер при закрытии.
- **Без универа (изм. копи)**: «DUICT, 3-й курс» удалено везде — hero-note («B2 English · Remote Ukraine / Worldwide»), about-ряд «Учёба» удалён целиком, contacts-sub («Киев · Remote Ukraine / Worldwide · B2 English»); footer и так чист; §11 обновлён.
- **Слайдеры mobile**: `.shots__arrow { display: none }` @≤640px; `.shots__track` — `touch-action: pan-x pan-y` + `-webkit-overflow-scrolling: touch` (свайп работает, вертикальный скролл не ломается); нативный drag картинок подавлен (`dragstart` preventDefault + `-webkit-user-drag: none` — иначе жест перехватывается и трек не едет); счётчик+нить остаются; лайтбокс/высоты/фейд без изменений.
- **Бюджеты**: HScroll 0 @1280/@390, консоль 0, `diff --check` clean, без коммита.

---

## 20. Frames dynamics + spacing + custom fonts (2026-09-25)

> Рамки живые, отступы по шкале, шрифты с характером: активный слайд переливается, консоль дышит, текст читается display-гарнитурой.

- **Живая рамка активного слайда**: `.shots__slide.is-active .shot-frame` — градиентный border (`violet→cyan→magenta`, `background-size 220%`, `frame-flow 3.6s` по `background-position`) + мягкий пульс `box-shadow` (22→36px glow). Неактивные слайды — `opacity 0.55`, активный — `1` (кросс-фейд 320ms при смене). Всё interruptible: анимации не блокируют скролл/свайп/стрелки, индекс по-прежнему из реального скролла.
- **Hover-lift + shine**: `.shot-frame:hover` — `translateY(-4px)` + усиленная тень; `shine`-блик (`frame-shine 700ms`, skewed white gradient через `::after` на `__view`, только `transform`/`opacity`). На touch (`hover: none`) блик не срабатывает — кадр остаётся статичным, хинт виден как раньше.
- **Дыхание консоли**: `.glass-console` — `console-breathe 4.2s ease-in-out infinite` (glow violet 22→38px + лёгкий cyan на пике). Только `box-shadow`, без layout.
- **Отступы по шкале 8/12/16/20**: шапка консоли `12/16`, код `20` (≥16 от краёв), футер `12/20` отделён бордером, бар фрейма `8/12`, `case__media gap 12`, подпись `margin-top 12 + padding-top 4`, панель `margin-top 16` — капшн не впритык. Все значения из шкалы §5, ничего вне её.
- **Шрифты**: Google Fonts `display=swap` + preconnect — display `Unbounded 500/600/700` (H1, section-H2, case-H3, onrequest/step/help/about имена — футуристично, кириллица есть; Space Grotesk отклонён 2026-09-25: нет кириллицы в Google Fonts), mono `JetBrains Mono` (код, счётчики, подписи, лейблы — без изменений), текст `Inter` (body/sub — без изменений). `--font-display` с fallback-стеком (`Unbounded → Inter → system-ui → sans`). Файловые имена в барах фреймов остаются mono (системная метка, не заголовок).
- **Reduced-motion**: `frame-flow`, `frame-shine`, `console-breathe` — off; слайды `opacity 1`, hover-lift off, шрифты остаются.
- **Бюджеты**: HScroll 0 @1280/@390, консоль 0, `diff --check` clean, без коммита.

---

## 21. Copy-UX batch (2026-09-25)

> Шесть пунктов вердикта: копи ботов, лайтбокс-fit, свайп/mobile, FAQ-desktop, перепись текстов, дедуп «Возможностей».

- **1. Копи ботов (PAS, выбран)**: Problem — «Обычный бот считает каждый вебхук новым платежом: ретрай — и клиент списан дважды, таймаут — и деньги потеряны. Разбор — вручную по логам.» Agitate — в первом предложении (двойное списание/потеря). Solution — «Мои 15+ ботов так не умеют: идемпотентность и 409/retry гасят дубли, HD-кошельки TON/TRON/EVM держат ключи детерминированно, своп уходит на холодный сам.» Доказательство — 15+ в проде, ноль дублей. Альтернативы: 4U («Дубли списаний — ноль: 15+ ботов, 409/retry, HD, своп на холодный») и JTBD («Когда вебхук ретраится, хочу один платёж — получаю идемпотентность»).
- **2. Лайтбокс-fit**: `.shotbox__fig { max-width: 100vw; max-height: calc(100dvh - 40px) }`, `.shotbox__scroll { display: flex; center; overscroll-behavior: contain; touch-action: pan-y }`, `img { max-width: 100%; max-height: calc(100dvh - 190px); object-fit: contain }` — кадр целиком в экране 1280 и 390, страница под ним locked (`body overflow hidden` уже был, проверен), свайп трека из модалки не просвечивает (`overscroll-behavior`).
- **3. Свайп + mobile**: слайд `flex: 0 0 calc(100% - 40px)` desktop / `calc(100% - 28px)` mobile 390 — виден пик следующего; гэп 12px по шкале; фейд правого края `.shots__viewport::after` 44px. Стрелки disabled на концах (JS `render()` уже выставлял, проверено 6/6 `prev disabled` на старте). Mobile: кейс 20px, заголовок 19px, подпись 12.5px, хинт 12px с ellipsis, help-строки в колонку, HUD-пилюля по центру без перекрытий.
- **4. FAQ-desktop**: root cause — `summary{display:flex}` + иконка-спан перехватывали hit-test, `aria-expanded` не синхронизировался, первый item `open` по умолчанию маскировал тоггл, в AX-дереве вопрос читался как generic вместо кнопки. Фикс — `.faq__icon{pointer-events:none}`, `summary::marker{content:""}`, JS-синхронизация `aria-expanded` на событие `toggle` (нативный `<details>` сохранён для no-JS). Доказательство — programmatic-click 7/7 открывает.
- **5. Все тексты**: hero-sub, 6×(просто/технически), процесс, FAQ 7, обо мне — переписаны по PAS/JTBD, выгода вперёд, цифры только CONFIRMED (170/4844, 24/24, 1.8s, no diff, 243→172, 92/100, 2500+/500+, 5 Critical, 12 RAG, 656+ CRM, 15+ ботов, 12/14/18, 36 роутов, 160 файлов батч, PHP/MySQL, FastAPI/aiogram, Scrapegraph/Scrapling, Qdrant+FTS, Tesseract, HD TON/TRON/EVM, 409/retry, вебхуки, Mini App, Docker). Без общих фраз («высокое качество», «ответственный»). NDA — только «по запросу».
- **6. Дедуп**: сетка `.help` из 4 карточек удалена (дублировала кейсы 1-в-1); вместо неё `.help-list` — 4 строки-якоря «боль → кейс»: CRM-паттерн → `#onrequest`, платежи → `#case-paybots`, PDF/сканы → `#case-docs`, каталог/импортёр → `#case-justcars`. Двух одинаковых сеток больше нет.
- **Hero-варианты (смысл различается)**: A — детерминизм («170/4844 за 1.8s без сверки», выбран); B — болевой («надоело сверять каталог вручную?»); C — NDA-скорость («прототип за 2–3 дня на моих данных»). На сайте — A.
- **Чеклист 7 (вариант A + боты)**: выгода вперёд; конкретика цифрами; боль словами клиента; доказательство (тесты/скринкаст/кейсы); уникальность (детерминированно, NDA-safe); один месседж на блок; CTA глагол+выгода. Пройден.
- **Бюджеты**: HScroll 0 @1280/@390, консоль 0 JS-ошибок, `diff --check` clean, без коммита.

---

## 22. Versatility (2026-09-25)

> Боты обобщены, +3 кейса продуктов: разносторонность видна сразу, владения нет, схемы честные.

- **1. Боты обобщить**: кейс paybots + FAQ + help-строка + JSON-LD + meta + hero/marquee: убраны «Мои 15+», «15+ ботов в проде», «ноль дублей» как владение. Осталась суть компетенции «собираю так»: идемпотентность/409, HD TON/TRON/EVM, своп на холодный, FSM, Mini App. Заголовок нейтральный — «Платежи без дублей и потерь». Evidence `15+/Ботов в проде` → `9/Кейсов: бэкенд · трейдинг · контент · постинг`; marquee → «платежи без дублей 409 · HD · своп». Кадры не тронуты, alt структуры — нейтральный (handlers/platform/main).
- **2. +3 кейса** тем же паттерном (схема + табы просто/технически + результат), порядок: сильные первыми, новые — после paybots:
  - **Aivora** — торговый советник: multi-TF 15м/1ч/4ч, ATR/BB-конфлюенс, скоринг 5 слоёв → NO_TRADE без уверенности; суть «советник, который чаще молчит, чем врёт» + дисклеймер «не финсовет».
  - **ContenQ** — фабрика контента: 1 видео → N клипов (чанки/кроп 9:16/4:5/1:1/субтитры/дубляж), 10-stage pipeline FFmpeg/Celery, ElevenLabs 10+ голосов, 22 таблицы, handoff.
  - **PubLane** — белый автопостинг: пачка Reels за минуты, timezone-календарь, multi-account, approval, официальные API/OAuth, 8 сетей, 30 таблиц. Без серых схем.
  - Факты только CONFIRMED: vault `research/{aivora,contenq,publane}-promo-plan-2026-09-14` + `requirements/contenq` (22 таблицы, Celery benchmark 50/200/500, 10+ голосов) + `CANDIDATE_PROFILE.md`. Выручка/пользователи/сроки не выдуманы.
- **3. Баланс**: интро кейсов — «9 кейсов: автоматизация + трейдинг + контент + платформа», суб: кадры настоящие, схемы — честные SVG.
- **Визуал**: честные inline SVG-схемы (3 узла, палитра v2 violet/cyan/magenta, mono 11–13px), подписи «▲ Схема: … · схема, не скриншот», `role="img"` + aria-label. Слайдер с 1 слайдом не делался — статичный `.scheme` (минимум CSS: рамка/радиус/фон/тень как у фреймов + `svg{width:100%}`). Табы/результат/стек — как у остальных 6.
- **Sales-copy**: новые кейсы по PAS (боль сигналов/монтажа/ручного постинга → решение-паттерн) + 4U в заголовках (конкретика multi-TF/10-stage/timezone). Чеклист 7: выгода вперёд, конкретика без выдуманных цифр, боль словами клиента, доказательство паттерном, уникальность (NO_TRADE/фабрика+ handoff/белый API), один месседж на кейс, CTA глагол+выгода («Обсудить советника/фабрику/автопостинг →»).
- **Бюджеты**: HScroll 0 @1280/@390, консоль 0, тапы 44px, AA, `diff --check` clean, без коммита.

---

## 23. Funnel-wire: шоты в 3 кейса + CTA за 10 секунд (2026-09-25)

> Шоты первыми, схема следом; полоса после кейсов; стики-бар на mobile. От любого места до CTA — не больше 1 скролла.

- **1. Шоты в кейсы (все 6 файлов, шоты первыми + схема следом)**:
  - **Aivora — 03/03** (отклонение от «02/02» сознательное): два разных факта — интерфейс CRM (`aivora-login-1280`, cover) + рендер сигнала (`aivora-signal-1280`, целиком через `.shot-frame--contain` → `object-fit: contain` на `#0B0B12`, без кропа) + прежняя SVG-схема третьим слайдом. В 02/02 выпадал бы один кадр из скоупа — все 6 файлов и все схемы сохранены, порядок «шоты → схема» соблюдён. HUD generic (`slides.length`), JS не менялся.
  - **ContenQ / PubLane — 02/02**: responsive-шот через `<picture>` (1280 desktop / 390 mobile @≤640px, лайтбокс всегда открывает 1280) + прежняя SVG-схема вторым слайдом. DPR1-кадры как есть: колонка ~574px < 1280, апскейла нет; mobile-кадры ≤390 CSS.
  - **Схема в слайдере**: `.shots__slide .scheme { height: var(--shots-h) }` (380/340) + `justify-content: center` — высоты равны внутри каждого слайдера, SVG видна целиком, без лайтбокса/фейда/чина (диаграмма уже читается).
  - **Подписи честные**: «▲ Экран логина CRM · интерфейс», «▲ Рендер сигнала с входом и TP/SL · правая ось срезана исходником» (ось срезана рендером Aivora, не кадрированием — подпись не скрывает), «▲ Лендинг … · интерфейс», схемы — прежние «· схема, не скриншот».
- **2. Воронка (sales-copy: 1 месседж + глагол-выгода, PAS-боль → решение)**:
  - **CTA-полоса `#cta-band`** после кейсов (в `#projects`, за `.onrequest`): одна строка «Узнали свою боль? Напишите — разберём ваш процесс за 15 минут.» + `[Написать в Telegram →]` (t.me/illia_dev). Без воды: flex-строка desktop, колонка + full-width кнопка mobile. Визуал v2: hairline cyan-бордер, градиент violet→cyan, `var(--glow-b)`.
  - **Stiki mobile-бар `#stickyCta`** (только ≤640px): fixed bottom, safe-area (`env(safe-area-inset-bottom)`), `z-index 70` (ниже меню 80 и лайтбокса 90). Показ — после hero (`pastHero`), скрытие — у `#contacts`/`.footer` (два observer, `threshold 0.06/0`); `body.sticky-on` компенсирует паддингом 84px — футер не перекрыт; `.totop` при баре поднят (`bottom: 100px`). Скрытие через `visibility` — фокус не уходит в невидимую кнопку. Тап 44px (btn).
  - **Аудит CTA**: hero (GitHub + Telegram) / полоса / контакты + стики — дублей нет, case-ссылки «Обсудить →» прежние. От hero до полосы — кейсы (1 скролл-зона), от полосы до контактов — процесс/help/FAQ/about; стики-бар держит t.me в 0 скроллов на mobile.
- **Бюджеты**: HScroll 0 @1280/@390, консоль 0, тапы 44px, reduced-motion — бар/слайды без транзишенов, `diff --check` clean, без коммита.

---

## 24. Peer-tone + merge низа (2026-09-26)

> На равных с умной аудиторией: плотность вместо разжёвывания, один контакт-блок вместо двух визиток.

- **1. Тон peer-to-peer (sales-copy: точность и плотность, чеклист 7)**: hero-sub, табы, процесс, help-строки, FAQ, about, контакты-подписи — без сюсюканья и разжёвывания базы (идемпотентность, дедуп, RRF, вебхуки — как есть). История удалений (удалено, не использовать): прежние ярлыки табов и FAQ-подзаголовок про «упрощение для новичков», заголовок about про «объяснения без технических деталей», вопрос FAQ «не разбираюсь в коде», фраза about про «скринкаст/репозитории для разных уровней». Замена: about-заголовок «Инженер детерминированных систем» (суть — воспроизводимость бит-в-бит), FAQ-вопрос «Как проверить результат без доступа к коду?», about-p3 «Скринкаст — по запросу. Код и тесты открыты: 656+ CRM, 12 RAG, docker compose up». Анти-пример теперь и «для чайников» — тоже удалено везде.
- **2. Табы «Обзор / Детали»**: 9 кейсов (LedStil, Exporter, RAG, Ingul, Analyzer, Bots, Aivora, ContenQ, PubLane): кнопки + `aria-label` «*: вид» (было «уровень рассказа»). ID `tab-*-simple/tech`, `panel-*` не менялись — JS табов без изменений, стрелки/aria-selected как были.
- **3. Слияние низа**: `about-card` (Имя/База/Английский/Стек) удалён из HTML (CSS-правила оставлены, не используются); about — текст сути в одну колонку `.about--single` (max 760px): детерминизм + правила/дедуп/платежи + короткая строка доказательств без повтора hero. Контакты — единый блок «Связаться»: eyebrow «Связаться — отвечаю сегодня», строки Telegram/GitHub/Email/Локация/Стек + 3 CTA (GitHub/Telegram/CV) + хинт. Двух визиток нет: `about-card` 0 в HTML, `contact-card__row` 5.
- **4. JSON-LD синхрон**: `FAQPage` первый вопрос/ответ — те же формулировки, что в видимом FAQ (Обзор/Детали, 1.8s, 170/4 844, 24/24, no diff); структура `@type/Question/Answer` не тронута, остальные 5 вопросов без изменений.
- **Чеклист 7 (тон+слияние)**: выгода — детерминизм/no diff вместо «понятности»; конкретика — только CONFIRMED (170/4844, 24/24, 1.8s, 243→172, 656+/12, B2, Киев/Remote); боль — ручная сверка/дубли/потери, словами заказчика; доказательство — тесты/экспорты/скринкаст; уникальность — бит-в-бит + NDA-safe; один месседж — about про подход, контакты про связь; CTA глагол+выгода без изменений.
- **Бюджеты**: HScroll 0 @1280/@390, консоль 0, `diff --check` clean, кадры не тронуты, без коммита.

---

## 25. Services + full cases (2026-09-26)

> Вердикт юзера: hero говорит, что я МОГУ, — надо назвать КОНКРЕТНО, что делаю, + полные описания проделанной работы. Факты только CONFIRMED (ТЗ — единственный источник правды).

- **1. Секция «Что я делаю» `#services`** (после proof-strip-marquee, до `#projects`; 5-й линк «Услуги» в desktop-nav + mobile-меню, spy-массив + `data-nav="services"`): 8 позиций, каждая = навык + 1 строка сути с цифрами + якорь на кейс-пример (парсинг → `#case-justcars`; CRM/тарифы/брони → `#onrequest` обобщённо; боты+платежи → `#case-paybots`; RAG → `#case-rag`; e-commerce → `#case-ledstil`; фабрика+автопостинг → `#case-contenq` с упоминанием handoff в PubLane; сигналы → `#case-aivora`; desktop → `#case-docs`).
- **2. Кейсы полностью**: таб «Детали» — контекст → `ul.case__points` (4–5 конкретных пунктов с цифрами/решениями) → результат; таб «Обзор» untouched (peer-tone §24 сохранён). Конкретика из Baseline ТЗ: MorCars-дедуп 243→172 + калькулятор 92/100 (сервис 02), 1.8s + 24/24 + no diff, LedStil 2500+/500+/5 Critical, RAG hybrid RRF 512/50 + 12 тестов + evidence-gate, Ingul 12/14/18 + 36 роутов, paybots 409/HD/своп, OCR Tesseract 160 + FTS, Qdrant, Docker. NDA on-request.
- **3. Hero-привязка**: hero-sub lead дополнен «Ниже — конкретно, что делаю: 8 направлений с примерами из кейсов» (якорь `#services`, стиль `.hero__sub a`).
- **4. JSON-LD**: структура не тронута, новых сущностей не вводилось — видимые тексты консистентны с FAQPage (24/24, no diff, 170/4 844).
- **Визуал**: `.services` — сетка 2-col (1-col ≤640px) из `.svc`-карточек (v2-стекло, radius 20, padding 22/18, hover-lift + cyan-glow как `.step`/`.help-row`); номер mono 13px accent, заголовок display 17/16px, суть 14.5px secondary, go-строка mono 12px cyan. `.case__points` — отступ 22px, gap 6px, `code`-чипы наследуются от `.tabs__panel`. Reduced-motion: `.svc` в списке без транзишенов. Кадры/JS-слайдеры/лайтбокс не тронуты.
- **Sales-copy**: JTBD на позицию (боль → суть с цифрой → якорь-доказательство) + чеклист 7: выгода (файл без сверки/платёж без дублей), конкретика (все цифры CONFIRMED), боль словами клиента, доказательство якорем в кейс, уникальность (детерминизм/no diff/NO_TRADE), один месседж на карточку, CTA — сам якорь («Кейс: … →»).
- **Бюджеты**: HScroll 0 @1280/@390, консоль 0, тапы ≥44px (карточка-ссылка целиком), `diff --check` clean, без коммита/пуша.

---

## 26. Обзор=PAS + Детали=4U + сквозной дедуп (2026-09-26)

> Вердикт юзера: в Обзоре — PAS, в Деталях — 4U; одна боль/один клейм — один раз на весь сайт. Эталон тона — PAS про каталог («Ручной перенос... 1.8 секунды... бит-в-бит») — untouched.

- **1. PAS в 9 Обзорах** (боль словами клиента → обострение → решение + доказательство, peer-tone без сюсюканья): LedStil — добавлен обострение-клауз («чем дольше тянули, тем дороже стоил каждый фикс»); Ingul («каждая лишняя секунда режет досмотры»); Analyzer («аудит превращается в лотерею»); остальные 6 уже были PAS (Exporter — эталон, untouched). Цифры только CONFIRMED, новых чисел нет.
- **2. 4U в 9 Деталях** (что сделано + цифры + чем уникально): убраны дословные повторы боли из Обзора — у каждой Детали свой спец-лид вместо «Что сделано:» (Exporter «Тот же прогон по шагам», RAG «Механика запрета на выдумку», Ingul «Сборка по частям», Analyzer «Конвейер поиска по шагам», Bots «Защита денег по слоям», Aivora «Контур решения по шагам», ContenQ «Конвейер по стадиям», PubLane «Планер по частям», LedStil «Состав работ»). «Что сделано» 9→0 в HTML.
- **3. Сквозной дедуп — владельцы клеймов (один клейм — одно место, в остальных синонимы)**:
  - «без ручной сверки» 6→2 — владелец hero (`title` + H1); meta/og/hero-sub/консоль/3d — синонимы («сверять нечего», «без сверок», «сходится сам»).
  - «бит-в-бит» 4→1 — владелец Exporter-Обзор (эталон); Детали/FAQ/JSON-LD — «байт в байт».
  - «no diff» 8→2 — владелец консоль hero + Exporter-result; marquee/svc/help/FAQ — «без расхождений».
  - «детерминирован*» 8→2 — владелец Exporter-Обзор (фото) + Bots-Детали (ключи из сида); about («повторяемые системы/пайплайны»), процесс, ContenQ — синонимы.
  - «за один запуск» 2→2 (meta + og, SEO-пара); «за один прогон» 5→2 (FAQ + JSON-LD синк-пара, каталог); «одной командой» 6→0 (FAQ + JSON-LD — «запуск — одна команда»; RAG/процесс — «старт из Docker»).
  - «повторный прогон» 5→1 (эталон L332); «повторный запуск» 3→0 («следующий/второй прогон/запуск»); «ошибка невозможна» 0 (было 0).
  - Внутрикейсовые дубли: Paybots «детерминированно» ×2 → «ключи из сида» (Обзор) + «ключи детерминированы» (Детали); «разбор вручную по логам» ×2 → «только в спорных случаях»; PubLane «без серых схем» ×2 → только Обзор; RAG «честный отказ» ×2 → «отказ вместо выдумки»; ContenQ result повтор Обзора — перефразирован; Ingul «ноль скролла» vs LedStil — «страница стоит»; help-go Paybots/Exporter — короче указателей, без повтора result-чипов.
- **4. Sales-copy peer-tone (§ Peer-level RU conversion)**: 3 внутренних варианта на спорные лиды (сухой/точный, дерзкий, минималистичный) — выбран точный: «Тот же прогон по шагам», «Механика запрета на выдумку», «Защита денег по слоям» (почему: называют механику, а не лозунг; якорятся на цифры ниже). Чеклист 7: выгода (файл без сверки/деньги без дублей — по одному разу), конкретика (CONFIRMED без новых чисел), боль словами клиента (9 уникальных), доказательство (тесты/экспорты/кадры), уникальность (бит-в-бит только у Exporter), один месседж на таб, CTA без изменений. Старый grep-список («простыми словами», «без кода», «для чайников», «высокое качество») — 0 (RAG «без кода» → «прямо из браузера»).
- **5. JSON-LD FAQ синхрон**: Q1 — «без расхождений» как в видимом FAQ; Q2 — «следующий запуск — байт в байт» как в видимом; timing — «запуск — одна команда». Структура `@type/Question/Answer` не тронута.
- **Бюджеты**: HScroll 0 @1280/@390, консоль 0, `diff --check` clean, кадры/стили/JS не тронуты, без коммита/пуша.

---

## 27. Slider-clean: стрелки всегда видны, десктоп без драга, peek 0, одна подпись (2026-09-26)

> Вердикт юзера по 2 скринам: tilt прячет стрелки; драг на десктопе не нужен; peek соседнего слайда («Ка»-обрезок) выглядит дёшево.

- **1. Tilt только hero**: `data-tilt` снят с 9 `article.case` (grep: остался только `.glass-console` hero, там стрелок нет); HUD-панель `.shots__bar` и стрелки — siblings трека, вне его overflow-контекста: видны и кликабельны при любом наклоне.
- **2. Десктоп без драга**: `@media (min-width: 641px)` — `.shots__track { overflow-x: hidden; cursor: default; touch-action: pan-y }`; JS mouse-drag gated `matchMedia("(max-width: 640px)")`. На десктопе — только стрелки + клавиатура + счётчик; свайп живёт на ≤640px (`overflow-x: auto`, `touch-action: pan-x pan-y`, стрелки скрыты как раньше).
- **3. Peek 0**: слайд `flex: 0 0 100%` (desktop и mobile, было `calc(100% - 40px / 28px)`), трек `gap: 0; padding: 0` (отступы — padding viewport снаружи), edge-fade `::after` удалён (нечего предсказывать). scrollLeft всегда кратен ширине слайда.
- **4. Одна подпись**: тексты подписей те же, честные; JS собирает их из `.case__cap` слайдов, удаляет узлы из слайдов и ставит один `<p class="shots__cap">` под треком (после `.shots__viewport`), обновляет в `render()` по активному индексу. Без JS — прежние подписи в слайдах (деградация честная). Обрезка «Ка» невозможна физически.
- **Бюджеты**: HScroll 0 @1280/@390, консоль 0, `diff --check` clean, кадры не тронуты, без коммита/пуша.

---

## 28. Tabs-grid + slider-antilag + pipeline-mark (2026-09-26)

> Вердикт юзера: таб «Детали» прыгает высотой; переключение картинок лагает; молния-эмодзи в фавиконе — заменить иконкой.

- **1. Табы без прыжков (grid-stack)**: `.tabs { display: grid }`, список — ряд 1, обе `.tabs__panel` — `grid-column: 1; grid-row: 2` в одной ячейке; высота блока = max(Обзор, Детали) всегда. Неактивная панель — `[hidden] { display: block; visibility: hidden; pointer-events: none }` (место занимает, не видна, не кликабельна). JS `select()` дополнительно ставит `aria-hidden` + `inert` + `tabindex -1` на скрытую (из таба и скринридера убрана), активной возвращает `tabindex 0`; начальный синк — `select(tabs[0], false)`. Стрелки/aria-selected/ID панелей — как были. Замер: scrollY до/после переключения одинаков 9/9.
- **2. Слайдер без лагов**: профилирование — DPR2-вес кадров + `box-shadow`/glow-repaint (`frame-flow`, `console-breathe`) + lazy-декод соседнего слайда в момент показа. Лечение: `preload(index)` греет соседей (`loading=eager` + `new Image()` с `decoding async`, `decoding="async"` в разметке уже был); transitions `.shot-frame` — только `transform` (border/box-shadow применяются мгновенно, без repaint-анимации; кросс-фейд слайдов `opacity` сохранён); на время скролла/свайпа `box.is-scroll` / `track.is-drag` ставят `animation-play-state: paused` glow-анимациям; offscreen-слайды — `content-visibility: auto` + `contain-intrinsic-size`. Стрелки/клавиатура/счётчик/лайтбокс/высоты 380/340 — без изменений.
- **3. Pipeline-марк вместо молнии**: `assets/icon.svg` — тёмный скруглённый квадрат `#0A0A12` + hairline-рамка градиентом violet→cyan→magenta (палитра v2) + pipeline-узел: линия-градиент с glow и три узла (violet-кольцо / cyan-заливка с тёмной сердцевиной / magenta-кольцо). Читается с 16px: три точки на линии. Favicon: SVG + PNG-fallback `icon-32.png` + `favicon.ico` (16/32/48) + `apple-touch-icon icon-180.png` + `theme-color #07070D`; OG-image не тронут. Эмодзи-молния убрана везде (`index.html` + `3d/index.html`, grep пуст). Title/тексты не тронуты.
- **Бюджеты**: scrollY const 9/9, слайды без подвисаний (скрины до/после + консоль 0), HScroll 0 @1280/@390, `diff --check` clean, кадры не тронуты, без коммита/пуша.

---

## 29. Calm hero: меньше частиц, стабильная физика, veil под текст (2026-09-26)

> Вердикт юзера: в hero тяжело читать текст — слишком много частиц, анимация иногда сбивается с физики. Текст в приоритет, спокойствие вместо wow.

- **1. Меньше частиц**: `COUNT` desktop `5200 → 1800` (~2.9x), mobile `2600 → 800` (~3.3x); `size 0.045 → 0.032`, `opacity 0.85 → 0.55`. Зона под текстом разрежена: эллипс `(−2.4, 0.55, rx 3.4, ry 2.3)` в мировых координатах — 72% точек внутри вытолкнуты наружу при сиде (детерминированно, каждый визит одинаково).
- **2. Стабильная физика**: было — накопление `+=` каждый кадр без границ (улёты) + сырой `mouseX` в интегратор + `Math.random` + `drift t*0.35`. Стало — базовая позиция + ограниченная осцилляция (`±0.32/±0.28`), жёсткие границы `±W/2, ±H/2` (отражения заменены клампом — дрейфа нет физически), `clamp dt ≤ 0.033`, mouse через сглаживание `lerp dt*3.5` (демпфинг), `drift t*0.22` (медленнее), scroll кламп `±0.6`, seed `mulberry32(20260926)` (детерминирован). Движение медленное, спокойное.
- **3. Читаемость**: `.hero-veil` усилен — радиальное пятно `rgba(7,7,13,0.74)` под текстовой колонкой (27%/42%) + линейный `0.42 → 0.68`; контраст H1 ≥7:1 по замеру, sub ≥4.5:1. Reduced-motion без изменений: canvas скрыт CSS, показан fallback (статика).
- **Бюджеты**: HScroll 0 @1280/@390, консоль 0, `diff --check` clean, CTA/proof-strip/бюджеты не тронуты, без коммита/пуша.
