# 3D Immersive — /3d route

Immersive portfolio-мир для Illia Druzhenko. Отдельный маршрут `https://illmxnn.github.io/3d/` — vanilla Three.js без React, scroll-driven камера, glassmorphism.

## Stack
- `three@0.160` CDN + `OrbitControls` (`enableZoom false` `enablePan false` `enableDamping true`)
- `gsap@3.12` + `ScrollTrigger` via `importmap` + `es-module-shims`
- No build, standalone HTML. DPR capped `isMobile?1:Math.min(2,devicePixelRatio)`, `performance:{min:0.5}` эмуляция, `<15K tris`.

## Сцена
- Icosahedron wireframe (DocAnalyzer) + Points stars (neurrochmat style)
- NeuralNetwork BufferGeometry линии + пульсация `sin(time)`
- PlaneGeometry 64×64 terrain с noise-деформацией вершин, scroll → camera dolly `z 5→2`, `y 0.4→1.95`
- Свет: ambient 0.7 + directional 0.8 + point 0.5 (ровно 3)
- Камера: Perspective 60, near 0.1 far 100

## Секции 5
1. Hero — Погружение (AIDA: 170→CRM за один запуск, CTA Выйти в портфолио / CV)
2. DocumentAnalyzer — wireframe + Points, scroll→rotate
3. RAG Demo — NeuralNetwork pulsation
4. Ingul + JustCars — Wave terrain + dolly
5. Contact — WaveTerrain + CTA

## Sales-copy (выбрано)
- **AIDA (герой):** Внимание "Погружение. От идеи — к CRM за один запуск." Интерес 170/4844, Желание "без ручной сверки", Действие "Выйти в портфолио →"
- **Альтернатива PAS (блок боли):** "Документы разбросаны по форматам, поиск тонет... теряешь часы. Решение — FTS+OCR, локально."
- **Альтернатива 4U (экспорт):** "От идеи до экспорта 170 авто за 1.8 сек — детерминированно, 24/24 заголовка, no diff."

Чеклист: выгода вместо фичи, конкретика 170/4844/12/656+, боль ручной сверки, доказательство PASS/репозиторий, срочность за один запуск, один месседж на блок, CTA глагол+выгода.

## Performance & a11y
- Canvas fixed `z-index:0`, контент `z-index:1`
- Fallback `detectWebGL()` → скрыть canvas, показать `div.fallback` + ссылка на `../`
- Loader `#loader` с `%`
- `prefers-reduced-motion` → pause loop, static render
- `prefers-reduced-transparency` → solid glass
- OrbitControls не блокирует скролл (enableZoom false)
- Focus-visible, 44px tap targets, AA contrast white on #0A0A0F (21:1)

## Проверка
- `has_pages built` ожидается (папка `3d/` деплоится GitHub Pages автоматом)
- Навигация `../` и `../Illia_Druzhenko_CV.pdf` 
- Скриншоты 1280 / 390 через Playwright/Chrome MCP

