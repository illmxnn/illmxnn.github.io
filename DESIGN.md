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
- Контакты: Telegram @illia_dev, GitHub illmxnn, email, Киев/Remote/B2/DUICT
- Footer: Kyiv • Remote • B2 English • © 2026 Illia Druzhenko

Все тексты проектов — по формуле PAS/JTBD, без «Advanced/Lead/выручка/пользователи». Только CONFIRMED.
