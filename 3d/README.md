# 3D Immersive — /3d route · Pastel Paper

Immersive portfolio-мир для Illia Druzhenko. Отдельный маршрут `https://illmxnn.github.io/3d/` — vanilla Three.js без React, scroll-driven камера, пастельная бумага #FDF8F0 / #FBFBF9.

## Stack
- `three@0.160` CDN + `OrbitControls` (`enableZoom false` `enablePan false` `enableDamping true`)
- `gsap@3.12` + `ScrollTrigger` via `importmap` + `es-module-shims`
- No build, standalone HTML. DPR capped `isMobile?1:Math.min(2,devicePixelRatio)`, fallback WebGL, `<30K tris` (~18K).

## Палитра — пастельная бумага
- Background canvas: `#FDF8F0` + radial `#F5EDE3 → #FBFBF9`, контент `z1`
- Карточки: `rgba(255,255,255,0.76)` `backdrop-blur 16px` `saturate 150%` `border 1px #E8DDD0` `shadow 0 8px 32px rgba(180,160,140,0.12)` — теплая бумага как на главной
- Nav: `rgba(253,248,240,0.72)` `blur16` `saturate150` `border #E8DDD0` + top highlight `rgba(255,255,255,0.6)`
- Сигнал: только `#FF3B30` прогресс 2px и dot 6px, не заливать площади
- Текст: `#0F1115` на `#FDF8F0` 18:1

## Сцена — релевантные объекты по 1 на секцию
1. **Hero s1** — стопка листов + лупа: `Group` 3× `PlaneGeometry 1.2×0.8` `#FFFFFF` + `Edges` `#D4C4B0` + `Torus 0.35` glass `opacity 0.22` `transmission 0.72` + handle `Cylinder` — парят `sin(t*0.38)` stagger, `mousemove rotateY ±5deg`, `lookAt` на ближайший лист при скролле 0→0.2
2. **s2 DocumentAnalyzer** — папки + документы: `BoxGeometry 0.62×0.82×0.022` ×3 `z 0.038` + `Plane` `CanvasTexture` 256×256 линии текста + `Points` 200 dust `#D4C4B0` + `Line` query→doc `#FF3B30` — scroll `rotateY scroll*0.62` + `explode translateZ stagger` 0.16→0.32
3. **s3 RAG Neural** — пастельная сеть: узлы `SphereGeometry 0.042 10×10` `#E8DDD0` + связи `Line #D4C4B0` `opacity 0.58` пульс `sin(t*2)` `opacity 0.5→1` — hover pill `Лексический` → `#FF3B30` nodes, `Семантический` → `#0A84FF`, `Hybrid` → микс
4. **s4 Ingul/JustCars** — упаковка + авто: `BoxGeometry` 3 размера `#F5EFE6` + `Edges #D4C4B0` + low-poly car `Box 1.02×0.34×0.52 #FFF` + cabin `0.58×0.22×0.34 #E8DDD0` + 4× `Cylinder 0.12 #0F1115` — `IntersectionObserver` → `gsap scale 1.06 yoyo` pulse, wave plane 10×8 32×32 под ними
5. **s5 Contact** — волна из бумаги: `PlaneGeometry 14×14 40×40` `#EFE6DB` `roughness 0.84` вершины `sin*0.42+cos*0.36` + `pointermove raycast` деформирует вершину под курсором
- Все объекты < 30K tris (факт ~18K `data-tris`), `castShadow false`, `DRACO off`
- Свет: ambient 0.92 + directional 0.62 + point #FF3B30 0.28 + warm point #FFE8CC 0.42
- Камера: Perspective 60, near 0.1 far 100, dolly `z 5→2` `y 0.4→1.95`

## Интересные решения
- **s1 lookAt**: лупа смотрит на ближайший лист при 0→0.2
- **s2 explode**: листы разъезжаются `translateZ stagger`, линия поиска `Line` меняет `opacity`
- **s3 highlight**: hover на pill подсвечивает узлы lexical/semantic, линии меняют `opacity`
- **s4 pulse**: IO на #s4 → `gsap.to(scale 1.06 yoyo)` для коробок и авто
- **s5 pointer**: `raycast plane` + деформация вершин под курсором `exp(-dist)`

## Sales-copy (выбрано, AIDA)
- **AIDA (герой, выбран):** Внимание "Погружение. От идеи — к CRM за один запуск." Интерес 170/4844, Желание "без ручной сверки / без ошибок импорта", Действие "Выйти в портфолио → / Написать в Telegram"
- **Альтернатива PAS (блок боли):** Проблема "Документы разбросаны?" → Обострение "поиск тонет в форматах" → Решение "FTS+OCR локально, без облака"
- **Альтернатива 4U (экспорт, для скептиков):** "От идеи до экспорта 170 авто за 1.8с — детерминированно, 24/24 заголовка, no diff, воспроизводимо"
- Чеклист 7: выгода вместо фичи ✓, конкретика 170/4844/24/1.8s ✓, боль ручной сверки ✓, доказательство PASS/репозиторий ✓, срочность "за один запуск" ✓, один месседж на блок ✓, CTA глагол+выгода ✓

## Performance & a11y
- Canvas fixed `z-index:0`, контент `z-index:1`
- Fallback `detectWebGL()` → скрыть canvas, показать `div.fallback` + ссылка на `../`
- Loader `#loader` с `%`, DPR capped, `paused` on `visibilitychange`
- `prefers-reduced-motion` → static render, pause loop
- `prefers-reduced-transparency` → solid `#FFFFFF`
- `prefers-contrast: more` → solid + border `var(--text)`, bg opacity 0.35
- OrbitControls `enableZoom false` не блокирует скролл, `enableDamping`
- Focus-visible, 44px tap targets, AA 18:1 `#0F1115` на `#FDF8F0`

## Проверка
- `has_pages built` ожидается (папка `3d/` деплоится GitHub Pages)
- Навигация `../` и `../Illia_Druzhenko_CV.pdf`
- Скриншоты 1280 / 390 через Playwright/Chrome MCP, `https://illmxnn.github.io/3d/` 200, `dpr capped`, fallback

