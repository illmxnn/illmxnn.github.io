# 3D Immersive — /3d route · Pastel Paper

Immersive portfolio-мир для Illia Druzhenko. Отдельный маршрут `https://illmxnn.github.io/3d/` — vanilla Three.js без React, scroll-driven камера, пастельная бумага #FDF8F0 / #FBFBF9.

## Stack
- `three@0.160` CDN + `OrbitControls` (`enableZoom false` `enablePan false` `enableDamping true`) + `GLTFLoader` via `three/addons/`
- `gsap@3.12` + `ScrollTrigger` via `importmap` + `es-module-shims` (используется для bg, для mini выбран rAF lerp 0.08 — Apple §4 damping 1.0)
- No build, standalone HTML. DPR capped `isMobile?1:Math.min(1.5,devicePixelRatio)`, fallback WebGL, `<30K tris` (~18K bg + ~1.4K assemble extra, <2K), 6× `powerPreference low-power` mini.

## Палитра — пастельная бумага
- Background canvas: `#FDF8F0` + radial `#F5EDE3 → #FBFBF9`, контент `z1`
- Карточки: `rgba(255,255,255,0.76)` `backdrop-blur 16px` `saturate 150%` `border 1px #E8DDD0` `shadow 0 8px 32px rgba(180,160,140,0.12)` — теплая бумага как на главной
- Foreground mini: пастель `MeshStandardMaterial` `color #E8DDD0 / #F5EFE6 / #E9D5C2` `roughness 0.7 metalness 0.05` — матовые бумажные, не хром
- Nav: `rgba(253,248,240,0.72)` `blur16` `saturate150` `border #E8DDD0` + top highlight `rgba(255,255,255,0.6)`
- Сигнал: только `#FF3B30` прогресс 2px и dot 6px, не заливать площади
- Текст: `#0F1115` на `#FDF8F0` 18:1 · подпись 3D `10px JetBrains Mono #6E6E73`

## Сцена — релевантные объекты + foreground mini-canvas

### Background (canvas#bg fixed z0 · пастельная сцена)
1. **Hero s1** — стопка листов + лупа: `Group` 3× `PlaneGeometry 1.2×0.8` `#FFFFFF` + `Edges` `#D4C4B0` + `Torus 0.35` glass `opacity 0.22` `transmission 0.72` — парят `sin(t*0.38)` stagger, `mousemove rotateY ±5deg`, `lookAt` при скролле 0→0.2
2. **s2 DocumentAnalyzer** — папки + документы: `BoxGeometry 0.62×0.82×0.022` ×3 + `CanvasTexture` 256×256 линии + `Points` 200 dust `#D4C4B0` — scroll `rotateY scroll*0.62` + `explode translateZ stagger` 0.16→0.32
3. **s3 RAG Neural** — пастельная сеть: узлы `SphereGeometry 0.042` `#E8DDD0` + связи `Line #D4C4B0` пульс `sin(t*2)` — hover pill подсвечивает lexical/semantic
4. **s4 Ingul/JustCars** — упаковка + авто: `BoxGeometry` 3 размера `#F5EFE6` + `Edges` + low-poly car `Box 1.02×0.34×0.52` + wave plane 10×8 — `IntersectionObserver` → `gsap scale 1.06 yoyo` pulse
5. **s5 Contact** — волна из бумаги: `PlaneGeometry 14×14 40×40` `#EFE6DB` `roughness 0.84` вершины `sin*0.42+cos*0.36` + `pointermove raycast` деформация под курсором
- Свет: ambient 0.92 + directional 0.62 + warm point #FFE8CC 0.42 (красный point убран, остался прогресc)
- Камера: Perspective 60, near 0.1 far 100, dolly `z 5→2` `y 0.4→1.95` · `OrbitControls damping 0.06` `enableZoom false`

### Foreground — mini-canvas 120×120 на карточках (выбранный подход)
Вместо второго `canvas#fg` `fixed z5 NDC` (сложно проецировать DOM rect в NDC каждый frame, ломает z-stack на mobile) выбран **встроенный mini-canvas** `class="card__3d"` `position:absolute top:-18px right:-18px z-index:3` `transparent` + вращающийся GLB на каждой карточке. Обоснование: проще, не требует проекции rect→NDC, работает на mobile, каждая карточка самодостаточна, hover c SS, `IntersectionObserver 0.3` pop `gsap scale 0→1.06 yoyo 0.6s`, подпись 10px mono информативна (`170 · no diff`, `FTS · offline`, `12 · hybrid`, `12 / 14 / 18 фото`, `170 / 4 844 · 1.8s`, `Kyiv · Remote`). Пастель перекрашена в `MeshStandardMaterial roughness 0.7 metalness 0.05`.

| Проект | GLB (CORS, CDN, <1MB) | HEAD | CORS | Размер | Пастель | Fallback procedural |
|--------|------------------------|------|------|--------|---------|---------------------|
| s2 DocumentAnalyzer — папка/документ | `https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@master/2.0/BoxTextured/glTF-Binary/BoxTextured.glb` | 200 | `Access-Control-Allow-Origin: *` | 6 540 B (0.006 MB) | `#E8DDD0` | `Box 0.9×0.7 + CanvasTexture doc lines` |
| s3 RAG — neural/organic placeholder (BrainStem 3.1 MB >1MB, Avocado 8.3 MB >1MB → лёгкая замена) | `https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@master/2.0/Duck/glTF-Binary/Duck.glb` | 200 | `Access-Control-Allow-Origin: *` | 120 484 B (0.11 MB) | `#E9D5C2` recolor `MeshStandardMaterial 0xE9D5C2 roughness 0.7` | `Sphere 0.36 + head 0.18 + cone beak` |
| s4 Ingul — коробка | `https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@master/2.0/Box/glTF-Binary/Box.glb` | 200 | `Access-Control-Allow-Origin: *` | 1 664 B (0.001 MB) | `#F5EFE6` | `Box 0.9×0.7×0.18 + Edges #D4C4B0` |
| s4 JustCars — авто (Ferrari 1.6 MB >1MB, ToyCar 5.8 MB → лёгкий truck) | `https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@master/2.0/CesiumMilkTruck/glTF-Binary/CesiumMilkTruck.glb` | 200 | `Access-Control-Allow-Origin: *` | 447 200 B (0.43 MB) | `#F5EFE6` + `#E8DDD0` cabin recolor | `Box body 1.0×0.34×0.52 + cabin 0.56×0.22 + 4× Cylinder wheels` |
| Сумма | — | — | — | **575 888 B (0.56 MB) <4 MB** | — | — |

Проверка `curl -I` перед коммитом — все 200, `Access-Control-Allow-Origin: *`, CORS OK. Загрузка через `GLTFLoader.load(url, gltf=>{ scene.add(gltf.scene); gltf.scene.traverse(m=>{ if(m.isMesh) m.material=new THREE.MeshStandardMaterial({color:pastel, roughness:0.7, metalness:0.05})}); fitToView(gltf.scene); }, undefined, err=>{ console.warn(...); scene.add(createFallbackMesh(fb)); })`.
Оптимизация: `gltf-transform optimize input.glb output.glb --compress draco --texture-compress webp` (упомянута, исходные already <1MB draco off для совместимости).

Debug убран: удалён `<p class="terrain-hint">` (5 шт), `<p> dpr capped isMobile?1:Math.min(2,devicePixelRatio) · <30K tris…</p>`, `Plane 14×14 40×40 #EFE6DB roughness 0.8` и `sin*0.5+cos*0.4` `<code>` блоки, `Финал — Paper Wave 14×14 40×40` → `Финал — Paper Wave`, красный шар `queryDot` + линия `searchLine` `visible false opacity 0`, eyebrow `03 — Neural пастель · Sphere + Line` → `03 — Neural`, `04 — Коробки + low-poly авто · Boxes + Cylinders` → `04 — Коробки + авто`, `02 — Папки · CanvasTexture поиск` → `02 — Папки`. Остался только прогресс `2px #FF3B30`.

### Assemble on Scroll — 6 mini-canvas 120×120 разлет→сборка (spec 3d-assemble-scroll)
Каждому mini-canvas добавлен `assembleProgress 0→1` по scroll секции: `progress = clamp((scrollY - sectionTop + vh*0.3)/(sectionHeight+vh*0.6),0,1)`, `clamp 0..1`, lerp `mesh.position.lerp(target, p)` + `quaternion.slerp`, `opacity 0.6→1`, scrub via `rAF lerp 0.08` (Apple §4 damping 1.0 critically damped, без overshoot; выбран вместо `gsap.ScrollTrigger scrub 0.6` чтобы переиспользовать уже существующий `scrollProgress lerp 0.08` и избежать 6 ScrollTrigger на 6 canvas, экономия триггеров). `prefers-reduced-motion → instant p=1`.

- **s1 Hero Box 170 no diff** — 6 граней куба `Plane 0.5` разлет по нормали `*0.9` + jitter ±0.35 + rot jitter ±0.7, сборка в куб 0.5, pastel #E8DDD0, `Plane 2 tris ×6 =12 tris`.
- **s2 FTS offline BoxTextured** — 3 слоя документа `Box 0.62×0.82×0.022` с CanvasTexture полосками, старт `z ±0.6, y ±0.28, rot z ±18deg`, сборка в стопку `z 0.032` stagger, 36 tris.
- **s3 Duck (RAG 12 hybrid)** — центральная pastel утка (Sphere 0.26+head) + 8× `Sphere 0.06 8×8` вокруг `radius 0.62→0.14` + `Line` opacity `0→0.6`, 512 tris, s5 вариант 6× сферы.
- **s3/s5 линии** — `Line` из центра к сфере, позиция обновляется `bufferAttr[3..5]=mesh.pos`, `material.opacity=p*0.6`.
- **s4 Ingul BoxTextured 12/14/18** — 3 коробки `0.55/0.65/0.75` старт по углам `x ±1.1 y ±0.8`, сборка в башню `y -0.34, 0.14, 0.66`, 36 tris.
- **s4 JustCars 170/4844 CesiumMilkTruck fallback** — кузов `Box 1.02×0.34×0.52` + кабина `0.58×0.22` + 4× `Cylinder 0.11` колеса; кузов `y 0.78→0.18`, колеса `y -0.42 xz ±0.72 → 0.32`, ~72 tris.
- **s5 Kyiv Remote Duck** — как s3 но 6 сфер `0.055 radius 0.58→0.16`, progress глобальный `clamp((global-0.8)/0.2)` чтобы достичь 1 внизу страницы (per-section формула не достигает 1 для последней секции).

Итого extra <1.4K tris, pastel #E8DDD0, `alpha:true antialias:true`, `isVisible` IO pause, `will-change:transform`.

Карточки не статичны: `.card__3d-wrap` `transition transform 220ms cubic-bezier(0.2,0.8,0.2,1)` `hover scale 1.08`, JS `holder.rotation.y = t*0.14 + p*0.28 + scroll*0.22 + mouseX*0.08`, `IntersectionObserver 0.3` `gsap 0→1.06 yoyo` + `visibility IO 0.05` pause.

## Интересные решения
- **s1 lookAt**: лупа смотрит на ближайший лист при 0→0.2
- **s2 explode**: листы разъезжаются `translateZ stagger`
- **s3 highlight**: hover на pill подсвечивает узлы lexical/semantic, линии меняют `opacity`
- **s4 pulse**: IO на #s4 → `gsap.to(scale 1.06 yoyo)` для коробок и авто (bg) + IO 0.3 для mini-canvas pop
- **s5 pointer**: `raycast plane` + деформация вершин под курсором `exp(-dist)`
- **mini foreground**: 6× `WebGLRenderer {alpha:true}` 120×120 `transparent` + `GLTFLoader` CORS GLB pastel recolor + `fitObjectToView` + fallback `Box/Sphere/Car` + `requestAnimationFrame` внутри единого `loop` + `resize` + `visibilitychange paused`

## Sales-copy (выбрано, AIDA)
- **AIDA (герой, выбран):** Внимание "Погружение. От идеи — к CRM за один запуск." Интерес 170/4844, Желание "без ручной сверки / без ошибок импорта", Действие "Выйти в портфолио → / Написать в Telegram"
- **Альтернатива PAS (блок боли):** Проблема "Документы разбросаны?" → Обострение "поиск тонет в форматах" → Решение "FTS+OCR локально, без облака"
- **Альтернатива 4U (экспорт, для скептиков):** "От идеи до экспорта 170 авто за 1.8с — детерминированно, 24/24 заголовка, no diff, воспроизводимо"
- Чеклист 7: выгода вместо фичи ✓, конкретика 170/4844/24/1.8s ✓, боль ручной сверки ✓, доказательство PASS/репозиторий ✓, срочность "за один запуск" ✓, один месседж на блок ✓, CTA глагол+выгода ✓

## Performance & a11y
- Canvas fixed `z-index:0`, контент `z-index:1`, mini 120×120 `z-index:3` `pointer-events:none`, `dpr capped 1.5` (было 2)
- Fallback `detectWebGL()` → скрыть canvas, показать `div.fallback` + ссылка на `../`
- Loader `#loader` с `%`, DPR capped 1.5, `paused` on `visibilitychange` (bg + mini `isVisible` IO 0.05)
- `prefers-reduced-motion` → static render assemble `p=1` мгновенно, pause loop, IO pop не анимируется (scale 1), mini rotation остановлен, без `lerp`
- `prefers-reduced-transparency` → solid `#FFFFFF` `backdrop-filter:none`
- `prefers-contrast: more` → solid + border `var(--text)`, bg opacity 0.35
- OrbitControls `enableZoom false` не блокирует скролл, `enableDamping`
- Mini canvas `aria-hidden="true"` + label 10px mono `#6E6E73` информативна, `will-change:transform`
- Focus-visible, 44px tap targets, AA 18:1 `#0F1115` на `#FDF8F0` · 6× renderer `low-power` `alpha:true` mini ~200-500 tris each (s1 12, s2 36, s3 512+lines, s4 36+72), bg ~18K, extra assemble ~1.4K <2K, total <20K

## Проверка
- `has_pages built` ожидается (папка `3d/` деплоится GitHub Pages), `https://illmxnn.github.io/3d/` 200 (проверено `curl -I` + Playwright)
- Навигация `../` и `../Illia_Druzhenko_CV.pdf`
- Скриншоты 1280 / 390 до/после через Playwright/Chrome MCP (viewport 1280×800 и 390×800): `screenshot-1280-before.png` (p 0.26 scattered) → `screenshot-1280-after.png` (p 0.73 assembled, s1), `screenshot-390-before.png` (p 0.26) → `screenshot-390-after.png` (p 0.55). Все 6 mini 120×120 видны, pastel сохранен, `Plane 14×14` debug отсутствует в DOM, Pages 200.
- `prefers-reduced-motion` → мгновенная сборка p=1, без вращения, `prefers-reduced-transparency/contrast` как раньше.
