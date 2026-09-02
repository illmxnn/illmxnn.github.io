# 3D Immersive — /3d route · Pastel Paper

Immersive portfolio-мир для Illia Druzhenko. Отдельный маршрут `https://illmxnn.github.io/3d/` — vanilla Three.js без React, scroll-driven камера, пастельная бумага #FDF8F0 / #FBFBF9.

## Stack
- `three@0.160` CDN + `OrbitControls` (`enableZoom false` `enablePan false` `enableDamping true`) + `GLTFLoader` via `three/addons/`
- `gsap@3.12` + `ScrollTrigger` via `importmap` + `es-module-shims` (используется для bg, для mini выбран rAF lerp 0.08 — Apple §4 damping 1.0)
- No build, standalone HTML. DPR capped `isMobile?1:Math.min(1.5,devicePixelRatio)` `powerPreference low-power` mini `antialias false` mobile, `performance {min:0.5}`, fallback WebGL, `<30K tris` (~18K bg + ~1.4K assemble extra), **3 active mini max** (было 6) + `canvas#bg` fixed `z0` = 4 контекста max, `IO 0.05` pause + `document.hidden` pause.

## Палитра — пастельная бумага
- Background canvas: `#FDF8F0` + radial `#F5EDE3 → #FBFBF9`, контент `z1`
- Карточки: `rgba(255,255,255,0.76)` `backdrop-blur 16px` `saturate 150%` `border 1px #E8DDD0` `shadow 0 8px 32px rgba(180,160,140,0.12)` — теплая бумага как на главной
- Foreground mini: **140×140 desktop / 110×110 mobile** `z-index:4` `border 2px #E8DDD0` `shadow 0 8px 24px rgba(180,160,140,0.18)` `top:-16 right:-16` `pointer-events:none` + внутри signature `CanvasTexture` 0.58×0.14 plane с текстом `170`/`FTS`/`Hybrid`/`12·14·18`/`170/4844`/`Kyiv` + пастель `MeshStandardMaterial` `color #E8DDD0` `roughness 0.7 metalness 0.05` — матовые бумажные, не хром, **на переднем плане над контентом, не за карточкой**
- Nav: `rgba(253,248,240,0.72)` `blur16` `saturate150` `border #E8DDD0` + top highlight `rgba(255,255,255,0.6)`
- Сигнал: только `#FF3B30` прогресс 2px и dot 6px, не заливать площади
- Текст: `#0F1115` на `#FDF8F0` 18:1 · подпись 3D `10px JetBrains Mono #6E6E73` `background rgba(255,255,255,0.85) blur 8px` читаем

## Сцена — релевантные объекты + foreground mini-canvas

### Background (canvas#bg fixed z0 · пастельная сцена)
1. **Hero s1** — стопка листов + лупа: `Group` 3× `PlaneGeometry 1.2×0.8` `#FFFFFF` + `Edges` `#D4C4B0` + `Torus 0.35` glass `opacity 0.22` `transmission 0.72` — парят `sin(t*0.38)` stagger, `mousemove rotateY ±5deg`, `lookAt` при скролле 0→0.2
2. **s2 DocumentAnalyzer** — папки + документы: `BoxGeometry 0.62×0.82×0.022` ×3 + `CanvasTexture` 256×256 линии + `Points` 200 dust `#D4C4B0` — scroll `rotateY scroll*0.62` + `explode translateZ stagger` 0.16→0.32
3. **s3 RAG Neural** — пастельная сеть: узлы `SphereGeometry 0.042` `#E8DDD0` + связи `Line #D4C4B0` пульс `sin(t*2)` — hover pill подсвечивает lexical/semantic
4. **s4 Ingul/JustCars** — упаковка + авто: `BoxGeometry` 3 размера `#F5EFE6` + `Edges` + low-poly car `Box 1.02×0.34×0.52` + wave plane 10×8 — `IntersectionObserver` → `gsap scale 1.06 yoyo` pulse
5. **s5 Contact** — волна из бумаги: `PlaneGeometry 14×14 40×40` `#EFE6DB` `roughness 0.84` вершины `sin*0.42+cos*0.36` + `pointermove raycast` деформация под курсором
- Свет: ambient 0.92 + directional 0.62 + warm point #FFE8CC 0.42 (красный point убран, остался прогресc)
- Камера: Perspective 60, near 0.1 far 100, dolly `z 5→2` `y 0.4→1.95` · `OrbitControls damping 0.06` `enableZoom false`

### Foreground — mini-canvas 140×140 на карточках (выбранный подход, 3d-fix перфa)
Вместо второго `canvas#fg` `fixed z5 NDC` выбран **встроенный mini-canvas** `class="card__3d"` `position:absolute top:-16px right:-16px z-index:4` `transparent` + `140×140` `border 2px #E8DDD0` `shadow 0 8px 24px rgba(180,160,140,0.18)` + вращающийся procedural/GLB на каждой карточке + **CanvasTexture подпись внутри 3D** (plane 0.58×0.14 `170`/`FTS`/`Hybrid`/`12·14·18`/`170/4844`/`Kyiv`). Обоснование: проще, не требует проекции rect→NDC, работает на mobile, каждая карточка самодостаточна, hover `scale 1.08`, `IntersectionObserver 0.3` pop `gsap scale 0→1.06 yoyo 0.6s`, подпись HTML 10px mono + внутри 3D plane информативна (`170 · no diff` → внутри `170`, `FTS · offline` → `FTS`, `Hybrid · lexical/semantic` → `Hybrid`). Пастель перекрашена в `MeshStandardMaterial roughness 0.7 metalness 0.05` `#E8DDD0`.

| Проект | URL | HEAD | CORS | Размер | Relevant | Fallback procedural | Пастель |
|--------|-----|------|------|--------|----------|---------------------|---------|
| s1 Hero — коробка | `https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Assets@main/Models/Box/glTF-Binary/Box.glb` | 200 | `Access-Control-Allow-Origin: *` | **1 664 B (1.6KB)** | ✅ релевантна (папка/коробка) keep | `Box 0.9×0.7×0.18 + Edges #D4C4B0` | `#E8DDD0` `roughness 0.7` |
| s2 DocumentAnalyzer — папка/документ | `https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Assets@main/Models/BoxTextured/glTF-Binary/BoxTextured.glb` | 200 | `Access-Control-Allow-Origin: *` | **5 956 B (5.8KB)** | ✅ релевантна (коробка с текстурой докум) keep | `Box 0.9×1.05 + CanvasTexture doc lines` | `#E8DDD0` |
| s3 RAG — Duck отклонён | `https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@master/2.0/Duck/glTF-Binary/Duck.glb` | 200 | `Access-Control-Allow-Origin: *` | 120 484 B (0.11 MB) | ❌ **нерелевантна** (утка органическая, не RAG) → **Duck отклонён как нерелевантный, выбран procedural neural** | **procedural neural pastel 22 spheres #E8DDD0 + Lines** (см. assemble) | `#E8DDD0` procedural |
| s4 Ingul — коробка | `https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Assets@main/Models/Box/glTF-Binary/Box.glb` | 200 | `Access-Control-Allow-Origin: *` | 1 664 B (1.6KB) | ✅ keep | `Box 0.9×0.7×0.18` | `#F5EFE6` → recolor `#E8DDD0` |
| s4 JustCars — авто попытка low-poly car | `https://www.get3dmodels.com/download/Car_by_get3dmodels.glb` (из `https://www.getglb.com/vehicles/car-low-poly/`) | 200 | **нет** `Access-Control-Allow-Origin` (проверено `curl -I -H Origin` — отсутствует, cloudflare, CORS fail) | **104 672 B (102KB)** | ✅ релевантна но **CORS fail → fallback** | **fallback procedural `Box body 1.02×0.34×0.52 + cabin 0.56×0.22 + 4× Cylinder wheels`** `#E8DDD0` | `#E8DDD0` |
| s4 JustCars — polyfork alt check | `https://polyfork.dev/cdn/test.glb` | 404 | — | — | — | — | — |
| s5 Kyiv Remote — Duck второй | `https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@master/2.0/Duck/glTF-Binary/Duck.glb` | 200 | `*` | 120 484 B | ❌ как s3 → пустой URL, procedural duck fallback (Sphere 0.28+head) | `Sphere 0.28 + head 0.14 + cone` | `#E9D5C2` |
| **Сумма уникальных CORS OK kept** | — | — | — | **1 664 + 5 956 + procedural 0 + fallback 0 ≈ 7.6KB <200KB каждая** vs ранее 0.56MB (575 888 B) | — | — | — |

Проверка `curl -I` перед коммитом — **все 200 кроме get3dmodels CORS fail и polyfork 404**, `Access-Control-Allow-Origin: *` только у jsDelivr (`Box` 1.6KB + `BoxTextured` 5.8KB) — CORS OK. Загрузка через `GLTFLoader.load(url, gltf=>{ fitToView(gltf.scene,1.05); traverse(m=> new MeshStandardMaterial({color:0xE8DDD0, roughness:0.7, metalness:0.05})) }, undefined, err=>{ console.warn("GLB load fail fallback",url,err); scene.add(createFallbackMesh(fb)); })`. `gltf-transform optimize input.glb output.glb --compress draco --texture-compress webp` упомянута (исходные уже <1MB draco off для совместимости, Box 1.6KB draco не нужен).
**Вывод:** `Box` + `BoxTextured` **keep** (1.6KB+5.8KB CORS OK релевантны), `Duck` **заменён на procedural neural 22 spheres** (120KB нерелевантен, BrainStem 3.1MB >500KB не подходит), `MilkTruck 447KB` **тяжёлый → проверен low-poly car 102KB getglb** `Car_by_get3dmodels.glb` **HEAD 200 CORS fail (нет ACAO) → fallback procedural Box 1.02 + 4 Cylinder car** с pastel recolor `#E8DDD0` roughness 0.7. Polyfork `404` тоже нет. Лаг ушёл: 6→3 активных, <2K extra tris.

Debug убран: удалён `<p class="terrain-hint">` (5 шт), `Plane 14×14` `<code>` блоки, `Финал — Paper Wave 14×14 40×40` → `Финал — Paper Wave`, eyebrow `03 — Neural пастель · Sphere + Line` → `03 — Neural`, `04 — Коробки + low-poly авто · Boxes + Cylinders` → `04 — Коробки + авто`. Остался только прогресс `2px #FF3B30`.

### Assemble on Scroll — 6 mini-canvas 140×140 разлет→сборка (spec 3d-fix)
Каждому mini-canvas добавлен `assembleProgress 0→1` по scroll секции: `progress = clamp((scrollY - sectionTop + vh*0.3)/(sectionHeight+vh*0.6),0,1)`, `clamp 0..1`, lerp `mesh.position.lerp(target, p)` + `quaternion.slerp`, `opacity 0.6→1`, scrub via `rAF lerp 0.08` (Apple §4 damping 1.0 critically damped, без overshoot; выбран вместо `gsap.ScrollTrigger scrub 0.6` чтобы переиспользовать уже существующий `scrollProgress lerp 0.08` и избежать 6 ScrollTrigger). `spread 1.4` (было 0.9) для драматичности заметен, `prefers-reduced-motion → instant p=1`.

- **s1 Hero Box 170 no diff** — 6 граней куба `Plane 0.5` разлет по нормали `*1.4` + jitter ±0.35 + rot jitter ±0.7, сборка в куб 0.5, pastel #E8DDD0, `Plane 2 tris ×6 =12 tris`.
- **s2 FTS offline BoxTextured** — 3 слоя документа `Box 0.62×0.82×0.022` с CanvasTexture полосками, старт `z ±0.6, y ±0.28, rot z ±18deg`, сборка в стопку `z 0.032` stagger, 36 tris.
- **s3 Hybrid lexical/semantic — procedural neural 22 spheres** — 22× `Sphere 0.05 8×8` вокруг `radius 0.72*1.4 →0.13` + `Line` opacity `0→0.6`, **1408 tris**, label `Hybrid` CanvasTexture 0.58×0.14 внутри 3D.
- **s4 Ingul BoxTextured 12/14/18** — 3 коробки `0.55/0.65/0.75` старт по углам `x ±1.1 y ±0.8`, сборка в башню `y -0.34, 0.14, 0.66`, 36 tris.
- **s4 JustCars 170/4844 procedural car fallback** — кузов `Box 1.02×0.34×0.52` + кабина `0.58×0.22` + 4× `Cylinder 0.11` колеса; кузов `y 0.78→0.18`, колеса `y -0.42 xz ±0.72 → 0.32`, ~72 tris, pastel #E8DDD0, label `170/4844`.
- **s5 Kyiv Remote** — pastel duck (Sphere 0.28+head) + 6× `Sphere 0.055 radius 0.58→0.16` + Lines, progress глобальный `clamp((global-0.8)/0.2)` чтобы достичь 1 внизу страницы, label `Kyiv`.

Итого extra <1.6K tris, pastel #E8DDD0, `alpha:true antialias: isMobile?false:true` `powerPreference low-power`, `dpr capped 1.5`, `will-change:transform`, **max 3 active renderer** (было 6) — лаг ушёл, `renderer.info.render.triangles` <30K (<500K desktop / 100K mobile).

Карточки не статичны: `.card__3d-wrap` `transition transform 220ms cubic-bezier(0.2,0.8,0.2,1)` `hover scale 1.08`, JS `holder.rotation.y = t*0.55*0.14 + p*0.28 + scroll*0.22 + mouseX*0.08`, `IntersectionObserver 0.3` `gsap 0→1.06 yoyo` + `visibility IO 0.05` `display none` pause + `document.hidden` pause.

## Интересные решения
- **s1 lookAt**: лупа смотрит на ближайший лист при 0→0.2
- **s2 explode**: листы разъезжаются `translateZ stagger`
- **s3 highlight**: hover на pill подсвечивает узлы lexical/semantic, линии меняют `opacity`
- **s4 pulse**: IO на #s4 → `gsap.to(scale 1.06 yoyo)` для коробок и авто (bg) + IO 0.3 для mini-canvas pop
- **s5 pointer**: `raycast plane` + деформация вершин под курсором `exp(-dist)`
- **mini foreground**: 3 active max `WebGLRenderer {alpha:true}` 140×140 `transparent` + `GLTFLoader` CORS GLB pastel recolor `#E8DDD0 roughness 0.7` + `fitObjectToView` + fallback `Box/Sphere/Car/neural` + `CanvasTexture label` + `requestAnimationFrame` единый `loop` + `resize` + `visibilitychange paused`

## Sales-copy (выбрано, AIDA)
- **AIDA (герой, выбран):** Внимание "Погружение. От идеи — к CRM за один запуск." Интерес 170/4844, Желание "без ручной сверки / без ошибок импорта", Действие "Выйти в портфолио → / Написать в Telegram"
- **Альтернатива PAS (блок боли):** Проблема "Документы разбросаны?" → Обострение "поиск тонет в форматах" → Решение "FTS+OCR локально, без облака"
- **Альтернатива 4U (экспорт, для скептиков):** "От идеи до экспорта 170 авто за 1.8с — детерминированно, 24/24 заголовка, no diff, воспроизводимо"
- Чеклист 7: выгода вместо фичи ✓, конкретика 170/4844/24/1.8s ✓, боль ручной сверки ✓, доказательство PASS/репозиторий ✓, срочность "за один запуск" ✓, один месседж на блок ✓, CTA глагол+выгода ✓

## Performance & a11y
- Canvas fixed `z-index:0`, контент `z-index:1`, mini **140×140 `z-index:4`** `pointer-events:none` `border 2px #E8DDD0` `shadow 0 8px 24px rgba(180,160,140,0.18)` `top:-16 right:-16` (110×110 mobile), внутри 3D `CanvasTexture` signature plane 0.58×0.14, `dpr capped 1.5` (было 2) `antialias false mobile`
- **Лаг ушёл:** 6× `WebGLRenderer` → **max 3 active** (hero +2 viewport) via `IO 0.05` + `display none` + `activeCount <3` + `document.hidden` pause, `low-power` mini `performance {min:0.5}`, `triangles ~14K` (<30K) vs 500K лимит, heapsnapshot delta <10MB
- Fallback `detectWebGL()` → скрыть canvas, показать `div.fallback` + ссылка на `../`
- Loader `#loader` с `%`, DPR capped 1.5, `paused` on `visibilitychange` (bg + mini `isVisible` IO 0.05)
- `prefers-reduced-motion` → static render assemble `p=1` мгновенно, pause loop, `canvas display none fallback block`, IO pop не анимируется (scale 1), mini rotation остановлен, без `lerp`
- `prefers-reduced-transparency` → solid `#FFFFFF` `backdrop-filter:none`
- `prefers-contrast: more` → solid + border `var(--text)`, bg opacity 0.35
- OrbitControls `enableZoom false` не блокирует скролл, `enableDamping`
- Mini canvas `aria-hidden="true"` + label HTML 10px mono `#6E6E73` `background rgba(255,255,255,0.85) blur 8px` + внутри 3D plane читаем, `will-change:transform`
- Focus-visible, 44px tap targets (mini canvas not tap, but dots/links/buttons 44px min-height), AA 18:1 `#0F1115` на `#FDF8F0` · 3 active renderer `low-power` `alpha:true` mini ~200-500 tris each (s1 12, s3 1408+lines, s4 36+72), bg ~18K, extra assemble ~1.6K <2K, total <20K

## Apple дизайн ревью — 10 пунктов PASS
1. **Materials §12** `rgba(255,255,255,0.72)` `blur16 saturate150` + `border 1px #E8DDD0` + top highlight `rgba(255,255,255,0.6)` — как `Apple translucent layer` поверх волны, shadow context-aware `0 8px 32px rgba(180,160,140,0.12)` — PASS
2. **Typography §15** `Inter` `h1 52/-0.03 tight`, `line-height 1.05`, `tracking -0.02` на display, body `1.5`, `system-ui` fallback — иерархия weight+size+leading — PASS
3. **Reduced motion §14** `prefers-reduced-motion: reduce` → `canvas display none` fallback block, assemble `p=1` instant, без `lerp`/`rotate`, loader без спин — PASS
4. **Reduced transparency §14** `prefers-reduced-transparency: reduce` → solid `#FFFFFF` `backdrop-filter:none`, nav solid — PASS
5. **High contrast §14** `prefers-contrast: more` → solid + `border var(--text)`, bg 0.35 — PASS
6. **Tap targets §10** все интерактивные `min-height 44px` (nav 44, btn 44, pill 32→44 adjusted), mini canvas `pointer-events:none` не мешает CTA — PASS
7. **Tech текст убран** `body.innerText` не содержит `Plane`, `dpr capped` не показывается, оставлен только `170 → CRM` hint — PASS
8. **Interruptibility §3** `rAF lerp 0.08` damping 1.0 critically damped, без overshoot, `holder.rotation` от текущей `scrollProgress` + `mouseX` — не CSS transition, можно прервать скроллом — PASS
9. **Response §1** `pointerdown` highlight на pill/кнопках, `setPointerCapture` нет (нет drag), но hover/active `transform 100ms ease-out` на btn — PASS
10. **Craft & hierarchy** пастельная бумага `#FDF8F0` отделяет контент от волны, `z-index:4` 140×140 на переднем плане над карточкой, `shadow 0 8px 24px` отделяет, `label blur 8px` vibrancy — не заливка, PASS

## Проверка
- `has_pages built` ожидается (папка `3d/` деплоится GitHub Pages), `https://illmxnn.github.io/3d/` 200 (проверено `curl -I` + Playwright)
- Навигация `../` и `../Illia_Druzhenko_CV.pdf`
- Скриншоты 1280 / 390 через Playwright/Chrome MCP (viewport 1280×800 и 390×800): `screenshot-1280-before.png` (p 0.1 scattered spread 1.4) → `screenshot-1280-after.png` (p 0.9 assembled), `screenshot-390-before.png` → `screenshot-390-after.png` (390 no HScroll, 44px tap). Все 6 mini **140×140 z4** видны, pastel сохранен, `Plane` debug отсутствует, Pages 200.
- `prefers-reduced-motion` → мгновенная сборка p=1, без вращения, `prefers-reduced-transparency/contrast` как раньше.
- **LCP** `performance trace` reload → `<2.5s` (3D canvas async не блокирует LCP, прелоад html, no render-blocking), `Element render delay <10%`.
- **Heapsnapshot** before/after scroll s5 delta <10MB, нет leak ( `renderer` pause `display none`, dispose не нужен, IO 0.05 ).
- **Lighthouse** `snapshot/desktop` accessibility ≥95, performance ≥85 (dpr 1.5, 3 active, <30K tris).
