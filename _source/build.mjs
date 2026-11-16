import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { languages, locales } from './locales.mjs';

const origin = 'https://illmxnn.github.io';
const template = (await readFile(new URL('template.html', import.meta.url), 'utf8')).replace(/\r\n/g, '\n');
const check = process.argv.includes('--check');
const escapeMap = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };
const escape = text => text.replace(/[&<>"]/g, character => escapeMap[character]);

for (const [lang, language] of Object.entries(languages)) {
  const { topics, cases, ...copy } = locales[lang];
  const values = {
    ...Object.fromEntries(Object.entries(copy).map(([key, text]) => [key, escape(text)])),
    lang,
    ogLocale: language.ogLocale,
    url: origin + language.path,
    alternates: [...Object.entries(languages), ['x-default', languages.ru]]
      .map(([code, { path }]) => `  <link rel="alternate" hreflang="${code}" href="${origin}${path}">`).join('\n'),
    navLinks: [['about', copy.about], ['automations', copy.automations], ['contact', copy.contact]]
      .map(([id, text]) => `        <a href="#${id}">${escape(text)}</a>`).join('\n'),
    languageLinks: Object.entries(languages).map(([code, { path, name, label }]) => {
      const current = code === lang ? ' aria-current="page"' : '';
      return `        <a href="${path}" hreflang="${code}" lang="${code}" aria-label="${name}"${current}>${label}</a>`;
    }).join('\n'),
    topicLinks: Object.entries(topics).map(([id, label]) => {
      const text = escape(label);
      return `              <li data-reveal><a href="#${id}"><span class="roll"><span data-copy="${text}">${text}</span></span><span aria-hidden="true">↘</span></a></li>`;
    }).join('\n'),
    cases: Object.entries(cases).map(([id, item], index) => {
      const title = escape(item.title);
      const result = item.result ? `\n                <p>${escape(item.result)}</p>` : '';
      const previewClass = id === 'iphone' ? 'preview phone-preview' : 'preview';
      return `          <details class="work-item" data-reveal>
            <summary id="${id}">
              <span class="work-index" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
              <span class="work-title glitch" data-glitch="${title}">${title}</span>
              <span class="work-note">${escape(item.note)}</span>
              <span class="work-category">${escape(item.category)}</span>
              <span class="expand" aria-hidden="true"></span>
            </summary>
            <div class="work-body">
              <div class="work-copy">
                <p>${escape(item.body)}</p>${result}
              </div>
              <figure><div class="placeholder ${previewClass}" aria-hidden="true"><span class="screen-axis"></span></div><figcaption>${escape(copy.screenshot)}</figcaption></figure>
            </div>
          </details>`;
    }).join('\n'),
  };

  const html = template.replace(/\{\{([A-Za-z]+)\}\}/g, (_, key) => {
    if (!(key in values)) throw new Error(`Missing ${key} for ${lang}`);
    return values[key];
  });
  const directory = new URL(`..${language.path}`, import.meta.url);
  const output = new URL('index.html', directory);
  if (check) {
    const published = (await readFile(output, 'utf8')).replace(/\r\n/g, '\n');
    if (published !== html) throw new Error(`${language.path} is out of date`);
  } else {
    await mkdir(directory, { recursive: true });
    await writeFile(output, html);
  }
}
