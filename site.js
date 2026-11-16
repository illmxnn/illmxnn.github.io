const root = document.documentElement;
const themeButton = document.querySelector('.theme');
const progress = document.querySelector('.progress');

function updateThemeLabel() {
  const label = root.dataset.theme === 'light' ? 'Включить тёмную тему' : 'Включить светлую тему';
  themeButton.setAttribute('aria-label', label);
  themeButton.title = label;
}

updateThemeLabel();
themeButton.hidden = false;
themeButton.addEventListener('click', () => {
  const theme = root.dataset.theme === 'light' ? 'dark' : 'light';
  root.dataset.theme = theme;
  try {
    localStorage.setItem('illmxnn-theme', theme);
  } catch {}
  updateThemeLabel();
});

function updateProgress() {
  const scrollableHeight = root.scrollHeight - root.clientHeight;
  const fraction = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
  progress.style.transform = `scaleX(${Math.min(1, Math.max(0, fraction))})`;
}

function openLinkedAutomation() {
  const target = document.getElementById(window.location.hash.slice(1));
  if (target?.matches('.work-item summary')) target.parentElement.open = true;
}

openLinkedAutomation();
updateProgress();
window.addEventListener('hashchange', openLinkedAutomation);
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);
document.addEventListener('toggle', updateProgress, true);
