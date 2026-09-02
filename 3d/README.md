# 3D Immersive — /3d route · Pastel Paper

Immersive portfolio-мир для Illia Druzhenko. Отдельный маршрут `https://illmxnn.github.io/3d/` — vanilla Three.js без React, scroll-driven камера, пастельная бумага #FDF8F0 / #FBFBF9.

## Stack
- `three@0.160` CDN + `OrbitControls` (`enableZoom false` `enablePan false` `enableDamping true`) + `GLTFLoader` via `three/addons/`
- `gsap@3.12` + `ScrollTrigger` via `importmap` + `es-module-shims`
- No build, standalone HTML. DPR capped `isMobile?1:Math.min(2,devicePixelRatio)`, fallback WebGL, `<30K tris` (~18K bg + mini canvases).

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

Карточки не статичны: `.card__3d-wrap` `transition transform 220ms cubic-bezier(0.2,0.8,0.2,1)` `hover scale 1.08`, JS `rotateY = t*0.55 + scrollProgress*0.4 + mouseX*0.10`, `rotateX = sin(t)*0.08 + mouseY*0.05`, `IntersectionObserver 0.3` `gsap 0→1.06 yoyo`.

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
- Canvas fixed `z-index:0`, контент `z-index:1`, mini 120×120 `z-index:3` `pointer-events:none`
- Fallback `detectWebGL()` → скрыть canvas, показать `div.fallback` + ссылка на `../`
- Loader `#loader` с `%`, DPR capped, `paused` on `visibilitychange` (bg + mini)
- `prefers-reduced-motion` → static render, pause loop, IO pop не анимируется (scale 1), mini rotation остановлен
- `prefers-reduced-transparency` → solid `#FFFFFF` `backdrop-filter:none`
- `prefers-contrast: more` → solid + border `var(--text)`, bg opacity 0.35
- OrbitControls `enableZoom false` не блокирует скролл, `enableDamping`
- Mini canvas `aria-hidden="true"` + label 10px mono `#6E6E73` информативна, `will-change:transform`
- Focus-visible, 44px tap targets, AA 18:1 `#0F1115` на `#FDF8F0` · 6× renderer `low-power` `alpha:true` ~1K tris each, bg ~18K, total <30K

## Проверка
- `has_pages built` ожидается (папка `3d/` деплоится GitHub Pages)
- Навигация `../` и `../Illia_Druzhenko_CV.pdf`
- Скриншоты 1280 / 390 через Playwright/Chrome MCP, `https://illmxnn.github.io/3d/` 200, foreground 3D виден на карточках (mini 120×120), debug `Plane 14×14` отсутствует в DOM
