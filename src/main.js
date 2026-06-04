import './style.css';

import { groups, matches, predictionRules, tournamentOptions } from './data/matches.js';
import andriiAvatar from './assets/icons/andrii.png';
import eugineAvatar from './assets/icons/eugine.png';
import iliaAvatar from './assets/icons/ilia.png';
import yuriiAvatar from './assets/icons/yurii.png';

const app = document.querySelector('#app');

const playerLeftGlow = document.querySelector('#player-left-glow');
const playerRightGlow = document.querySelector('#player-right-glow');
const playerLeftImage = document.querySelector('#player-left-image');
const playerRightImage = document.querySelector('#player-right-image');

const siteHeader = document.querySelector('#site-header');
const headerLogo = document.querySelector('#header-logo');
const headerNavLinks = document.querySelectorAll('[data-header-nav-link]');
const themeToggleButton = document.querySelector('#theme-toggle-button');
const headerLoginButton = document.querySelector('#header-login-button');
const mobileMenuOpenButton = document.querySelector('#mobile-menu-open-button');

const mobileMenu = document.querySelector('#mobile-menu');
const mobileMenuPanel = document.querySelector('#mobile-menu-panel');
const mobileMenuHeader = document.querySelector('#mobile-menu-header');
const mobileMenuLogo = document.querySelector('#mobile-menu-logo');
const mobileMenuCloseButton = document.querySelector('#mobile-menu-close-button');
const mobileAuthActions = document.querySelector('#mobile-auth-actions');
const mobileLoginButton = document.querySelector('#mobile-login-button');
const mobileNavLinks = document.querySelectorAll('[data-mobile-nav-link]');
const pageSections = document.querySelectorAll('[data-page]');
const predictionFilters = document.querySelector('#prediction-filters');
const featuredMatch = document.querySelector('#featured-match');
const upcomingMatchesSection = document.querySelector('#upcoming-matches-section');
const standingsSection = document.querySelector('#standings-section');

const topPredictorsSection = document.querySelector('#top-predictors-section');

const calendarPage = document.querySelector('#page-calendar');

const ratingsPage = document.querySelector('#page-ratings');

const rulesPage = document.querySelector('#page-rules');

const siteFooter = document.querySelector('#site-footer');
const footerLogo = document.querySelector('#footer-logo');
const footerDescription = document.querySelector('#footer-description');
const footerCopyright = document.querySelector('#footer-copyright');

const authModalRoot = document.querySelector('#auth-modal-root');
const filterModalRoot = document.querySelector('#filter-modal-root');

const footerRoot = siteFooter;

const publicAsset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

const state = {
  theme: localStorage.getItem('theme') || 'dark',
  activePage: localStorage.getItem('activePage') || 'predictions',
  activeModal: null,
  isMobileMenuOpen: false,
  isFilterOpen: false,
  isTournamentOpen: false,
  selectedScheduleDate: null,
  scoreDrafts: {},
  standingsGroupIndex: 0,
  openCalendarGroups: ['Group A'],
  filters: {
    group: 'All groups',
    team: '',
    status: 'All matches'
  },
  filterDraft: {
    group: 'All groups',
    team: '',
    status: 'All matches'
  }
};

const sportTabs = [
  { name: 'Football', icon: '⚽', active: true },
  { name: 'Basketball', icon: '🏀', active: false },
  { name: 'Tennis', icon: '🎾', active: false }
];

const players = [
  { name: 'Ilia', avatar: iliaAvatar, initials: 'I', points: 18 },
  { name: 'Andrii', avatar: andriiAvatar, initials: 'A', points: 15 },
  { name: 'Евгений', avatar: eugineAvatar, initials: 'E', points: 12 },
  { name: 'Yuri', avatar: yuriiAvatar, initials: 'Y', points: 11 },
  { name: 'AI', avatar: null, initials: 'AI', points: 9 },
  { name: 'Саша', avatar: null, initials: 'C', points: 7 }
];

const ratingStats = {
  Ilia: { exactScores: 5, correctOutcomes: 3, missed: 1, level: 'Gold' },
  Andrii: { exactScores: 4, correctOutcomes: 3, missed: 2, level: 'Silver' },
  Евгений: { exactScores: 3, correctOutcomes: 3, missed: 3, level: 'Bronze' },
  Yuri: { exactScores: 3, correctOutcomes: 2, missed: 3, level: 'Expert' },
  AI: { exactScores: 2, correctOutcomes: 3, missed: 4, level: 'Analyst' },
  Саша: { exactScores: 2, correctOutcomes: 1, missed: 5, level: 'Starter' }
};

const basePredictions = ['2:1', '1:1', '2:0', '1:1', '2:1', '1:0'];

const getTheme = () => {
  const isDark = state.theme === 'dark';

  return {
    isDark,
    page: isDark ? 'bg-[#0b1220] text-slate-100' : 'bg-slate-50 text-slate-950',
    header: isDark ? 'border-slate-700/80 bg-[#111827]/90' : 'border-slate-200 bg-white/90',
    card: isDark
      ? 'border-slate-700/80 bg-slate-800/80 shadow-black/25'
      : 'border-slate-200 bg-white shadow-slate-200/80',
    softCard: isDark ? 'border-slate-700/80 bg-slate-900/65' : 'border-slate-200 bg-slate-50/90',
    input: isDark
      ? 'border-slate-600 bg-slate-900 text-white'
      : 'border-slate-200 bg-white text-slate-950',
    mutedText: isDark ? 'text-slate-300' : 'text-slate-500',
    strongText: isDark ? 'text-white' : 'text-slate-950',
    footer: isDark ? 'border-slate-700/80 bg-[#111827]' : 'border-slate-200 bg-white',
    logo: publicAsset('logo.png'),
    stadium: publicAsset(
      isDark ? 'img/stadium/stadium-dark.webp' : 'img/stadium/stadium-light.webp'
    ),
    playerOpacity: isDark ? 'opacity-90' : 'opacity-95',
    playerImageFx: isDark
      ? 'brightness-105 contrast-105 saturate-105'
      : 'brightness-100 contrast-100 saturate-100 drop-shadow-[0_10px_24px_rgba(15,23,42,0.10)]',
    playerGlowLeft: isDark
      ? 'bg-gradient-to-r from-[#0b1220] via-[#0b1220]/22 to-transparent'
      : 'bg-gradient-to-r from-slate-200/55 via-slate-100/20 to-transparent',
    playerGlowRight: isDark
      ? 'bg-gradient-to-l from-[#0b1220] via-[#0b1220]/22 to-transparent'
      : 'bg-gradient-to-l from-slate-200/55 via-slate-100/20 to-transparent'
  };
};

const getScheduleDates = () => [...new Set(matches.map((match) => match.dateValue))].sort();

const getDefaultScheduleDate = () => getScheduleDates()[0] || matches[0].dateValue;

const getScheduleDate = () => state.selectedScheduleDate || getDefaultScheduleDate();

const getVisibleScheduleMatches = () => {
  const activeDate = getScheduleDate();

  return matches.filter((match) => match.dateValue === activeDate);
};

const getNextScheduleDate = (direction) => {
  const dates = getScheduleDates();
  const currentDate = getScheduleDate();
  const currentIndex = dates.indexOf(currentDate);

  if (!dates.length) {
    return currentDate;
  }

  if (currentIndex === -1) {
    return direction > 0 ? dates[0] : dates[dates.length - 1];
  }

  const nextIndex = Math.min(Math.max(currentIndex + direction, 0), dates.length - 1);

  return dates[nextIndex];
};

const formatScheduleDate = (dateValue) => {
  const date = new Date(`${dateValue}T00:00:00`);

  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const getCalendarGroups = () => {
  const filteredMatches = matches.filter((match) => {
    const groupMatch = state.filters.group === 'All groups' || match.group === state.filters.group;
    const statusMatch =
      state.filters.status === 'All matches' || match.status === state.filters.status;
    const teamQuery = state.filters.team.trim().toLowerCase();
    const teamMatch =
      !teamQuery ||
      match.home.toLowerCase().includes(teamQuery) ||
      match.away.toLowerCase().includes(teamQuery);

    return groupMatch && statusMatch && teamMatch;
  });

  return groups
    .map((group) => ({
      group: group.id,
      matches: filteredMatches
        .filter((match) => match.group === group.id)
        .sort((a, b) => `${a.dateValue} ${a.time}`.localeCompare(`${b.dateValue} ${b.time}`))
    }))
    .filter((group) => group.matches.length > 0);
};

const getStandingsRows = (group) =>
  group.teams.map((team, index) => ({
    position: index + 1,
    ...team,
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalDifference: 0,
    points: 0
  }));

const isCalendarGroupOpen = (group) => state.openCalendarGroups.includes(group);

const toggleCalendarGroup = (group) => {
  if (isCalendarGroupOpen(group)) {
    state.openCalendarGroups = state.openCalendarGroups.filter((item) => item !== group);
    return;
  }

  state.openCalendarGroups = [...state.openCalendarGroups, group];
};

const renderIcon = (name) => {
  const icons = {
    menu: `
      <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `,
    close: `
      <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `,
    filter: `
      <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 6h16M7 12h10M10 18h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `,
    user: `
      <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M20 21a8 8 0 0 0-16 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" stroke="currentColor" stroke-width="1.8"/>
      </svg>
    `,
    mail: `
      <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 6h16v12H4V6Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
        <path d="m4 7 8 6 8-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,
    lock: `
      <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7 10V8a5 5 0 0 1 10 0v2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M6 10h12v10H6V10Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
        <path d="M12 14v2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      </svg>
    `,
    eye: `
      <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" stroke-width="1.8"/>
      </svg>
    `,
    calendar: `
      <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7 3v3M17 3v3M4 9h16M6 5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      </svg>
    `
  };

  return icons[name];
};

const renderPlayerAvatar = (player, size = 'sm') => {
  const sizeClass = size === 'md' ? 'h-9 w-9' : 'h-8 w-8';

  if (player.avatar) {
    return `
      <span class="${sizeClass} inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-violet-500/15 ring-2 ring-violet-500/20 [backface-visibility:hidden] [transform:translateZ(0)]">
        <img
          src="${player.avatar}"
          alt="${player.name} avatar"
          class="h-full w-full rounded-full object-cover"
        >
      </span>
    `;
  }

  return `
    <span class="${sizeClass} inline-flex shrink-0 items-center justify-center rounded-full bg-violet-500/15 text-xs font-black text-violet-400 ring-2 ring-violet-500/20 [backface-visibility:hidden] [transform:translateZ(0)]">
      ${player.initials}
    </span>
  `;
};

const renderTeamFlag = (src, alt, size = 'sm') => {
  const sizeClass =
    size === 'lg' ? 'h-14 w-14 min-[540px]:h-16 min-[540px]:w-16 md:h-20 md:w-20' : 'h-7 w-7';

  const ringClass = size === 'lg' ? 'ring-4 ring-white/15' : '';

  return `
    <span class="${sizeClass} inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-violet-500/10 ${ringClass} [backface-visibility:hidden] [transform:translateZ(0)]">
      <img
        src="${src}"
        alt="${alt}"
        class="h-full w-full rounded-full object-cover"
      >
    </span>
  `;
};

const renderTournamentDropdown = (theme) => {
  const activeTournament = tournamentOptions.find((option) => !option.disabled);

  return `
    <div class="relative" data-tournament-dropdown>
<button
  class="inline-flex min-h-12 w-full items-center justify-between gap-3 rounded-2xl border ${theme.isDark ? 'border-slate-700 bg-slate-900/70 text-white' : 'border-slate-200 bg-white text-slate-950'} px-5 text-left text-sm font-semibold leading-none transition hover:border-violet-400 focus-visible:outline-2 focus-visible:outline-violet-400 sm:text-base"
  type="button"
  data-tournament-toggle
  aria-expanded="${state.isTournamentOpen}"
  aria-haspopup="listbox"
>
  <span class="min-w-0 truncate">
    🏆 ${activeTournament.label}
  </span>

<span
  class="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-violet-300 transition ${state.isTournamentOpen ? 'rotate-180' : ''}"
  aria-hidden="true"
>
  <svg
    class="h-4 w-4"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M5 7.5L10 12.5L15 7.5"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</span>
</button>

      ${
        state.isTournamentOpen
          ? `
            <div
              class="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-40 overflow-hidden rounded-2xl border shadow-2xl ${
                theme.isDark
                  ? 'border-slate-700 bg-slate-900 text-white shadow-black/30'
                  : 'border-slate-200 bg-white text-slate-950 shadow-slate-300/60'
              }"
              role="listbox"
            >
              ${tournamentOptions
                .map(
                  (option) => `
                    <button
                      class="flex min-h-11 w-full items-center gap-3 px-4 text-left text-sm font-semibold transition ${
                        option.disabled
                          ? `${theme.mutedText} cursor-not-allowed opacity-50`
                          : theme.isDark
                            ? 'bg-violet-500/15 text-violet-200 hover:bg-violet-500/25'
                            : 'bg-violet-50 text-violet-700 hover:bg-violet-100'
                      }"
                      type="button"
                      ${option.disabled ? 'disabled aria-disabled="true"' : 'data-tournament-option'}
                    >
                      <span aria-hidden="true">🏆</span>

                      <span class="min-w-0 truncate">
                        ${option.label}${option.disabled ? ' — coming soon' : ''}
                      </span>

                      ${option.disabled ? '' : '<span class="ml-auto text-violet-400">✓</span>'}
                    </button>
                  `
                )
                .join('')}
            </div>
          `
          : ''
      }
    </div>
  `;
};

const renderFilters = (theme) => `
  <section class="rounded-3xl border p-4 ${theme.card}" aria-label="Prediction filters">
    <div class="grid gap-3 sm:grid-cols-3">
      ${sportTabs
        .map(
          (sport) => `
            <button
              class="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                sport.active
                  ? 'border-violet-500/70 bg-violet-500/15 text-violet-300 shadow-lg shadow-violet-950/20'
                  : `cursor-not-allowed border-transparent ${theme.mutedText} opacity-55`
              }"
              type="button"
              ${sport.active ? '' : 'disabled aria-disabled="true"'}
              aria-label="${sport.name}${sport.active ? '' : ' is coming soon'}"
            >
              <span aria-hidden="true">${sport.icon}</span>
              <span>${sport.name}</span>
              ${sport.active ? '' : '<span class="sr-only">Coming soon</span>'}
            </button>
          `
        )
        .join('')}
    </div>

    <div class="mt-4">
      ${renderTournamentDropdown(theme)}
    </div>
  </section>
`;

const renderScoreInputs = (match, theme, size = 'default', scope = 'match') => {
  const inputClass =
    size === 'large'
      ? 'h-12 w-12 text-xl min-[380px]:w-16 min-[540px]:h-14 min-[540px]:w-20 min-[540px]:text-2xl'
      : 'h-11 w-12 text-base sm:w-16';

  const controlClass = size === 'large' ? 'h-12 w-8 min-[540px]:h-14' : 'h-11 w-7 text-sm';

  const renderInput = (side, team, value) => {
    const inputId = `${scope}-match-${match.id}-${side}-score`;
    const draftValue = state.scoreDrafts[inputId] ?? value;

    return `
      <div class="grid grid-cols-[auto_1fr_auto] overflow-hidden rounded-xl border ${theme.isDark ? 'border-slate-600 bg-slate-900' : 'border-slate-200 bg-white'}">
        <button
          class="${controlClass} inline-flex items-center justify-center ${theme.mutedText} transition hover:bg-violet-600 hover:text-white focus-visible:outline-2 focus-visible:outline-violet-400"
          type="button"
          data-score-step
          data-input-id="${inputId}"
          data-step="-1"
          aria-label="Decrease ${team} score"
        >
          −
        </button>

        <label class="sr-only" for="${inputId}">
          ${team} predicted score
        </label>

        <input
  id="${inputId}"
  name="${side === 'home' ? 'home_score' : 'away_score'}"
  class="${inputClass} border-x ${theme.isDark ? 'border-slate-600 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-950'} text-center font-bold focus:outline-none"
  type="text"
  inputmode="numeric"
  pattern="[0-9]*"
  value="${draftValue}"
  data-score-input
>

        <button
          class="${controlClass} inline-flex items-center justify-center ${theme.mutedText} transition hover:bg-violet-600 hover:text-white focus-visible:outline-2 focus-visible:outline-violet-400"
          type="button"
          data-score-step
          data-input-id="${inputId}"
          data-step="1"
          aria-label="Increase ${team} score"
        >
          +
        </button>
      </div>
    `;
  };

  return `
    <div class="flex items-center justify-center gap-2 min-[380px]:gap-3">
      ${renderInput('home', match.home, match.prediction.homeScore)}
      <span class="text-xl font-bold ${theme.strongText}">:</span>
      ${renderInput('away', match.away, match.prediction.awayScore)}
    </div>
  `;
};

const renderMatchPlayers = (match, theme) => {
  const predictions = basePredictions.map((score, index) => {
    if (index === 0) {
      return `${match.prediction.homeScore}:${match.prediction.awayScore}`;
    }

    return score;
  });

  return `
    <div class="border-t ${theme.isDark ? 'border-slate-700' : 'border-slate-200'} px-4 py-3">
      <div class="grid grid-cols-3 gap-3 sm:grid-cols-6">
        ${players
          .map(
            (player, index) => `
              <div class="flex flex-col items-center gap-1 text-center">
                <span class="text-xs font-semibold ${theme.mutedText}">
                  ${player.name}
                </span>

                ${renderPlayerAvatar(player)}

                <strong class="text-sm ${theme.strongText}">
                  ${predictions[index] || '—'}
                </strong>
              </div>
            `
          )
          .join('')}
      </div>
    </div>
  `;
};

const renderCalendarPlayerPredictions = (match, theme) => {
  const predictions = basePredictions.map((score, index) => {
    if (index === 0) {
      return `${match.prediction.homeScore}:${match.prediction.awayScore}`;
    }

    return score;
  });

  return `
    <div class="grid grid-cols-6 gap-2">
      ${players
        .map(
          (player, index) => `
            <div class="flex flex-col items-center gap-1 text-center">
              <span class="hidden text-[10px] font-semibold ${theme.mutedText} xl:block">
                ${player.name}
              </span>

              ${renderPlayerAvatar(player)}

              <strong class="text-xs ${theme.strongText}">
                ${predictions[index] || '—'}
              </strong>
            </div>
          `
        )
        .join('')}
    </div>
  `;
};

const renderScheduleDatePicker = (theme) => `
  <div class="grid gap-3 sm:grid-cols-[1fr_auto]">
    <div class="grid grid-cols-[44px_minmax(0,180px)_44px] gap-2 sm:grid-cols-[44px_170px_44px]">
      <button
        class="inline-flex min-h-12 items-center justify-center rounded-2xl border border-violet-500/30 text-violet-300 transition hover:bg-violet-500/15 focus-visible:outline-2 focus-visible:outline-violet-400"
        type="button"
        data-schedule-prev
        aria-label="Previous available schedule date"
      >
        ‹
      </button>

      <label class="block min-w-0">
        <span class="sr-only">Choose schedule date</span>

        <input
          class="min-h-12 w-full rounded-2xl border ${theme.input} ${theme.isDark ? '[color-scheme:dark]' : '[color-scheme:light]'} px-3 text-sm font-bold transition focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
          type="date"
          value="${getScheduleDate()}"
          data-schedule-date
          aria-label="Choose schedule date"
        >
      </label>

      <button
        class="inline-flex min-h-12 items-center justify-center rounded-2xl border border-violet-500/30 text-violet-300 transition hover:bg-violet-500/15 focus-visible:outline-2 focus-visible:outline-violet-400"
        type="button"
        data-schedule-next
        aria-label="Next available schedule date"
      >
        ›
      </button>
    </div>

    <button
      class="inline-flex min-h-12 items-center justify-center rounded-2xl border border-violet-500/30 px-5 text-sm font-bold text-violet-300 transition hover:bg-violet-500/15 focus-visible:outline-2 focus-visible:outline-violet-400"
      type="button"
      data-schedule-reset
    >
      Reset
    </button>
  </div>
`;

const renderPredictionHiddenFields = (match) => `
  <input type="hidden" name="match_id" value="${match.id}">
  <input type="hidden" name="tournament" value="FIFA World Cup 2026">
  <input type="hidden" name="group" value="${match.group}">
  <input type="hidden" name="stage" value="${match.stage}">
  <input type="hidden" name="date" value="${match.date}">
  <input type="hidden" name="time" value="${match.time}">
  <input type="hidden" name="venue" value="${match.venue}">
  <input type="hidden" name="city" value="${match.city}">
  <input type="hidden" name="home_team" value="${match.home}">
  <input type="hidden" name="away_team" value="${match.away}">
`;

const renderFeaturedMatch = (theme) => {
  const match = matches[0];

  return `
    <section
  class="relative mt-5 overflow-hidden rounded-3xl border border-violet-500/30 shadow-2xl shadow-violet-950/20 sm:mt-6"
  aria-labelledby="featured-match-title"
>
      <img src="${theme.stadium}" alt="" class="absolute inset-0 h-full w-full object-cover">

      <div class="absolute inset-0 ${theme.isDark ? 'bg-slate-950/55' : 'bg-white/70'}"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-violet-950/35 via-transparent to-blue-950/25"></div>

      <div class="relative grid gap-5 p-4 min-[540px]:p-6 md:grid-cols-[1fr_auto_1fr] md:gap-8 lg:p-10">
        <div class="grid grid-cols-2 gap-3 md:contents">
          <div class="flex min-w-0 flex-col items-center text-center">
            <div class="mb-3">
  ${renderTeamFlag(match.homeFlag, `${match.home} flag`, 'lg')}
</div>

            <h1 id="featured-match-title" class="max-w-full truncate text-2xl font-bold ${theme.strongText} min-[540px]:text-3xl md:text-2xl">
              ${match.home}
            </h1>

            <p class="mt-1 text-sm ${theme.mutedText} min-[540px]:text-base">
              Host Nation
            </p>
          </div>

          <div class="flex min-w-0 flex-col items-center text-center md:order-3">
            <div class="mb-3">
  ${renderTeamFlag(match.awayFlag, `${match.away} flag`, 'lg')}
</div>

            <h2 class="max-w-full truncate text-2xl font-bold ${theme.strongText} min-[540px]:text-3xl md:text-2xl">
              ${match.away}
            </h2>

            <p class="mt-1 text-sm ${theme.mutedText} min-[540px]:text-base">
              Opening Rival
            </p>
          </div>
        </div>

        <div class="mx-auto flex w-full max-w-[560px] flex-col items-center justify-center rounded-3xl border border-white/10 bg-slate-900/55 px-4 py-6 text-center backdrop-blur min-[540px]:px-5 md:min-w-72">
          <span class="rounded-full border border-violet-400/40 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-violet-300">
            ${match.stage}
          </span>

          <p class="mt-5 text-sm font-semibold text-amber-100/95">
            ${match.date} · ${match.time}
          </p>

          <p class="mt-1 max-w-full truncate text-sm font-semibold text-white/90" title="${match.venue}, ${match.city}">
            ${match.venue}, ${match.city}
          </p>

          <p class="mt-5 text-sm font-semibold uppercase tracking-widest text-violet-300">
            Your prediction
          </p>

 <form
  class="mt-4 w-full"
  action="https://tests.fomenko.top/echo/index.php"
  method="POST"
  target="_blank"
>
  ${renderPredictionHiddenFields(match)}

  <div class="w-full overflow-hidden">
    ${renderScoreInputs(match, theme, 'large', 'featured')}
  </div>

  <button
    class="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 font-bold text-white transition hover:-translate-y-0.5 hover:from-violet-500 hover:to-blue-500 focus-visible:outline-2 focus-visible:outline-violet-300"
    type="submit"
  >
    Save Prediction
  </button>
</form>
        </div>
      </div>

      <div class="relative border-t ${theme.isDark ? 'border-white/10 bg-slate-900/45' : 'border-slate-200 bg-white/70'} px-5 py-4 text-center text-xs ${theme.mutedText} sm:text-sm">
        Exact score = <strong class="${theme.strongText}">3 pts</strong> · Correct outcome = <strong class="${theme.strongText}">1 pt</strong> · Wrong prediction = <strong class="${theme.strongText}">0 pts</strong>
      </div>
    </section>
  `;
};

const renderUpcomingMatches = (theme) => {
  const upcomingMatches = getVisibleScheduleMatches();

  return `
    <section class="mt-5 rounded-3xl border p-5 ${theme.card} sm:mt-6" aria-labelledby="calendar-title">
      <div class="mb-5 grid gap-4 xl:grid-cols-[1fr_auto] xl:items-center">
        <div>
          <p class="text-sm font-semibold uppercase tracking-widest text-violet-400">
            Calendar
          </p>

          <h2 id="calendar-title" class="mt-1 text-xl font-bold ${theme.strongText}">
            ${formatScheduleDate(getScheduleDate())}
          </h2>
        </div>

        <div class="w-full xl:w-[430px]">
          ${renderScheduleDatePicker(theme)}
        </div>
      </div>

      ${
        upcomingMatches.length === 0
          ? `
            <div class="rounded-2xl border border-dashed ${theme.isDark ? 'border-slate-600 bg-slate-900/55' : 'border-slate-200 bg-slate-50'} p-6 text-center">
              <p class="font-semibold ${theme.strongText}">
                No matches for this date
              </p>

              <p class="mt-2 text-sm ${theme.mutedText}">
                Choose another date or reset the schedule filter.
              </p>
            </div>
          `
          : `
            <div class="grid gap-4">
              ${upcomingMatches
                .map(
                  (match) => `
                    <article class="overflow-hidden rounded-2xl border ${theme.softCard}">
                      <div class="grid gap-4 p-4 lg:grid-cols-[150px_minmax(0,1fr)_auto_auto] lg:items-center">
                        <div>
                          <p class="font-bold ${theme.strongText}">
                            ${match.date}
                          </p>

                          <p class="text-sm ${theme.mutedText}">
                            ${match.time}
                          </p>

                          <span class="mt-2 inline-flex rounded-full bg-violet-500/15 px-3 py-1 text-xs font-bold text-violet-400">
                            ${match.group}
                          </span>
                        </div>

                        <div class="min-w-0">
                          <div class="grid gap-2">
                            <span class="grid grid-cols-[28px_minmax(0,1fr)] items-center gap-2 font-bold ${theme.strongText}">
                              ${renderTeamFlag(match.homeFlag, `${match.home} flag`)}

                              <span class="min-w-0 break-words">
                                ${match.home}
                              </span>
                            </span>

                            <span class="ml-9 text-xs font-bold uppercase ${theme.mutedText}">
                              vs
                            </span>

                            <span class="grid grid-cols-[28px_minmax(0,1fr)] items-center gap-2 font-bold ${theme.strongText}">
                              ${renderTeamFlag(match.awayFlag, `${match.away} flag`)}

                              <span class="min-w-0 break-words">
                                ${match.away}
                              </span>
                            </span>
                          </div>

                          <p
                            class="mt-2 truncate text-sm ${theme.mutedText}"
                            title="${match.venue}, ${match.city}"
                          >
                            ${match.venue}, ${match.city}
                          </p>
                        </div>

<form
  class="contents"
  action="https://tests.fomenko.top/echo/index.php"
  method="POST"
  target="_blank"
>
  ${renderPredictionHiddenFields(match)}

  <div class="justify-self-start lg:justify-self-center">
    ${renderScoreInputs(match, theme, 'default', 'calendar')}
  </div>

  <button
    class="inline-flex min-h-11 items-center justify-center rounded-xl bg-violet-600 px-5 text-sm font-bold text-white transition hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-violet-300"
    type="submit"
  >
    Save
  </button>
</form>
                      </div>

                      ${renderMatchPlayers(match, theme)}
                    </article>
                  `
                )
                .join('')}
            </div>
          `
      }
    </section>
  `;
};

const renderStandings = (theme) => {
  const activeGroup = groups[state.standingsGroupIndex];
  const standingsRows = getStandingsRows(activeGroup);

  return `
    <section class="h-full rounded-3xl border p-5 ${theme.card}" aria-labelledby="standings-title">
      <div class="mb-5 flex items-start justify-between gap-4">
        <div>
          <p class="text-sm font-semibold uppercase tracking-widest text-violet-400">
            ${activeGroup.id}
          </p>

          <h2 id="standings-title" class="mt-1 text-xl font-bold ${theme.strongText}">
            Standings
          </h2>
        </div>

        <div class="flex items-center gap-2">
          <button
            class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/30 text-violet-300 transition hover:bg-violet-500/15 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-violet-400"
            type="button"
            data-standings-prev
            aria-label="Previous standings group"
            ${state.standingsGroupIndex === 0 ? 'disabled' : ''}
          >
            ‹
          </button>

          <button
            class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/30 text-violet-300 transition hover:bg-violet-500/15 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-violet-400"
            type="button"
            data-standings-next
            aria-label="Next standings group"
            ${state.standingsGroupIndex === groups.length - 1 ? 'disabled' : ''}
          >
            ›
          </button>
        </div>
      </div>

 <table class="w-full table-fixed text-left text-xs sm:text-sm">
  <colgroup>
    <col class="w-10 sm:w-12">
    <col>
    <col class="w-10 sm:w-12">
    <col class="w-10 sm:w-12">
    <col class="w-10 sm:w-12">
    <col class="w-10 sm:w-12">
    <col class="hidden sm:table-column sm:w-12">
    <col class="w-12 sm:w-14">
  </colgroup>

  <thead class="border-b ${theme.isDark ? 'border-slate-700' : 'border-slate-200'} ${theme.mutedText}">
    <tr>
      <th class="px-2 py-3 font-semibold">#</th>
      <th class="px-2 py-3 font-semibold">Team</th>
      <th class="px-2 py-3 text-center font-semibold">P</th>
      <th class="px-2 py-3 text-center font-semibold">W</th>
      <th class="px-2 py-3 text-center font-semibold">D</th>
      <th class="px-2 py-3 text-center font-semibold">L</th>
      <th class="hidden px-2 py-3 text-center font-semibold sm:table-cell">GD</th>
      <th class="px-2 py-3 text-center font-semibold">Pts</th>
    </tr>
  </thead>

  <tbody>
    ${standingsRows
      .map(
        (team) => `
          <tr class="border-b ${theme.isDark ? 'border-slate-700/70' : 'border-slate-200/80'}">
            <td class="px-2 py-3 ${theme.mutedText}">
              ${team.position}
            </td>

            <td class="px-2 py-3">
              <div class="grid min-w-0 grid-cols-[24px_minmax(0,1fr)] items-center gap-2 sm:grid-cols-[28px_minmax(0,1fr)]">
                <img
                  src="${team.flag}"
                  alt="${team.name} flag"
                  class="h-6 w-6 rounded-full object-cover sm:h-7 sm:w-7"
                >

                <span class="min-w-0 truncate font-semibold leading-tight ${theme.strongText}" title="${team.name}">
                  ${team.name}
                </span>
              </div>
            </td>

            <td class="px-2 py-3 text-center">${team.played}</td>
            <td class="px-2 py-3 text-center">${team.won}</td>
            <td class="px-2 py-3 text-center">${team.drawn}</td>
            <td class="px-2 py-3 text-center">${team.lost}</td>
            <td class="hidden px-2 py-3 text-center sm:table-cell">${team.goalDifference}</td>
            <td class="px-2 py-3 text-center font-bold text-violet-400">${team.points}</td>
          </tr>
        `
      )
      .join('')}
  </tbody>
</table>

      <div class="mt-5 flex flex-wrap justify-center gap-1.5" aria-label="Standings groups pagination">
        ${groups
          .map(
            (group, index) => `
              <button
                class="h-2.5 rounded-full transition ${
                  index === state.standingsGroupIndex
                    ? 'w-8 bg-violet-500'
                    : theme.isDark
                      ? 'w-2.5 bg-slate-600 hover:bg-violet-400'
                      : 'w-2.5 bg-slate-300 hover:bg-violet-400'
                }"
                type="button"
                data-standings-dot="${index}"
                aria-label="Show ${group.id}"
              ></button>
            `
          )
          .join('')}
      </div>
    </section>
  `;
};

const renderTopPredictors = (theme) => `
  <section class="h-full rounded-3xl border p-5 ${theme.card}" aria-labelledby="top-predictors-title">
    <div class="mb-4 flex items-center gap-3">
      <span class="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-400">
        ☆
      </span>

      <div>
        <p class="text-sm font-semibold uppercase tracking-widest text-violet-400">
          Ratings
        </p>

        <h2 id="top-predictors-title" class="text-xl font-bold ${theme.strongText}">
          Leaderboard
        </h2>
      </div>
    </div>

    <table class="w-full table-auto text-left text-xs sm:text-sm">
      <thead class="border-b ${theme.isDark ? 'border-slate-700' : 'border-slate-200'} ${theme.mutedText}">
        <tr>
          <th class="px-2 py-3 font-semibold">#</th>
          <th class="px-2 py-3 font-semibold">Player</th>
          <th class="px-2 py-3 text-right font-semibold">Pts</th>
        </tr>
      </thead>

      <tbody>
        ${players
          .map(
            (player, index) => `
              <tr class="border-b ${theme.isDark ? 'border-slate-700/70' : 'border-slate-200/80'}">
                <td class="px-2 py-2.5 ${theme.mutedText}">
                  ${index + 1}
                </td>

                <td class="px-2 py-2.5">
                  <div class="flex min-w-0 items-center gap-2">
                    ${renderPlayerAvatar(player)}
                    <span class="truncate font-semibold ${theme.strongText}">
                      ${player.name}
                    </span>
                  </div>
                </td>

                <td class="px-2 py-2.5 text-right font-bold text-violet-400">
                  ${player.points}
                </td>
              </tr>
            `
          )
          .join('')}
      </tbody>
    </table>
  </section>
`;

const renderRatingMedal = (index) => {
  const medals = [
    {
      label: 'Gold',
      icon: '🏆',
      className: 'border-amber-300/70 bg-amber-400/15 text-amber-500'
    },
    {
      label: 'Silver',
      icon: '🥈',
      className: 'border-slate-300 bg-slate-400/15 text-slate-400'
    },
    {
      label: 'Bronze',
      icon: '🥉',
      className: 'border-orange-300/70 bg-orange-400/15 text-orange-500'
    }
  ];

  const medal = medals[index];

  if (!medal) {
    return `
      <span class="inline-flex items-center rounded-full border border-violet-500/25 bg-violet-500/10 px-3 py-1 text-xs font-bold text-violet-400">
        Top ${index + 1}
      </span>
    `;
  }

  return `
    <span class="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-bold ${medal.className}">
      <span aria-hidden="true">${medal.icon}</span>
      <span>${medal.label}</span>
    </span>
  `;
};

const renderRatingsPage = (theme) => `
  <section class="rounded-3xl border p-5 ${theme.card}" aria-labelledby="ratings-page-title">
    <div class="mb-6 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
      <div>
        <p class="text-sm font-semibold uppercase tracking-widest text-violet-400">
          Ratings
        </p>

        <h1 id="ratings-page-title" class="mt-2 text-3xl font-black ${theme.strongText}">
          Player leaderboard
        </h1>

        <p class="mt-2 max-w-2xl text-sm ${theme.mutedText}">
          Compare exact score predictions, correct outcomes and total points across all players.
        </p>
      </div>

      <div class="grid grid-cols-3 gap-3 rounded-2xl border p-3 ${theme.isDark ? 'border-slate-700 bg-slate-900/60' : 'border-slate-200 bg-slate-50'}">
        <div class="text-center">
          <p class="text-2xl font-black text-violet-400">6</p>
          <p class="text-xs font-semibold ${theme.mutedText}">Players</p>
        </div>

        <div class="text-center">
          <p class="text-2xl font-black text-violet-400">72</p>
          <p class="text-xs font-semibold ${theme.mutedText}">Total pts</p>
        </div>

        <div class="text-center">
          <p class="text-2xl font-black text-violet-400">19</p>
          <p class="text-xs font-semibold ${theme.mutedText}">Exact</p>
        </div>
      </div>
    </div>

    <div class="grid gap-4 lg:hidden">
      ${players
        .map((player, index) => {
          const stats = ratingStats[player.name];

          return `
            <article class="rounded-2xl border p-4 ${theme.softCard}">
              <div class="flex items-center justify-between gap-4">
                <div class="flex min-w-0 items-center gap-3">
                  <span class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-violet-500/15 text-sm font-black text-violet-400">
                    ${index + 1}
                  </span>

                  ${renderPlayerAvatar(player, 'md')}

                  <div class="min-w-0">
                    <h2 class="truncate font-bold ${theme.strongText}">
                      ${player.name}
                    </h2>

                    <p class="text-sm ${theme.mutedText}">
                      ${stats.level}
                    </p>
                  </div>
                </div>

                <div class="text-right">
                  ${renderRatingMedal(index)}

                  <p class="mt-2 text-xl font-black text-violet-400">
                    ${player.points} pts
                  </p>
                </div>
              </div>

              <div class="mt-4 grid grid-cols-3 gap-3 text-center">
                <div class="rounded-2xl ${theme.isDark ? 'bg-slate-900/70' : 'bg-white'} p-3">
                  <p class="text-lg font-black ${theme.strongText}">${stats.exactScores}</p>
                  <p class="text-xs ${theme.mutedText}">Exact</p>
                </div>

                <div class="rounded-2xl ${theme.isDark ? 'bg-slate-900/70' : 'bg-white'} p-3">
                  <p class="text-lg font-black ${theme.strongText}">${stats.correctOutcomes}</p>
                  <p class="text-xs ${theme.mutedText}">Outcome</p>
                </div>

                <div class="rounded-2xl ${theme.isDark ? 'bg-slate-900/70' : 'bg-white'} p-3">
                  <p class="text-lg font-black ${theme.strongText}">${stats.missed}</p>
                  <p class="text-xs ${theme.mutedText}">Missed</p>
                </div>
              </div>
            </article>
          `;
        })
        .join('')}
    </div>

    <div class="hidden overflow-hidden rounded-2xl border lg:block ${theme.isDark ? 'border-slate-700' : 'border-slate-200'}">
      <table class="w-full table-auto text-left text-sm">
        <thead class="${theme.isDark ? 'bg-slate-900/70 text-slate-300' : 'bg-slate-50 text-slate-500'}">
          <tr>
            <th class="px-5 py-4 font-semibold">Rank</th>
            <th class="px-5 py-4 font-semibold">Player</th>
            <th class="px-5 py-4 font-semibold">Award</th>
            <th class="px-5 py-4 text-center font-semibold">Exact scores</th>
            <th class="px-5 py-4 text-center font-semibold">Correct outcomes</th>
            <th class="px-5 py-4 text-center font-semibold">Missed</th>
            <th class="px-5 py-4 text-right font-semibold">Points</th>
          </tr>
        </thead>

        <tbody>
          ${players
            .map((player, index) => {
              const stats = ratingStats[player.name];

              return `
                <tr class="border-t ${theme.isDark ? 'border-slate-700/80' : 'border-slate-200'}">
                  <td class="px-5 py-4">
                    <span class="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-500/15 text-sm font-black text-violet-400">
                      ${index + 1}
                    </span>
                  </td>

                  <td class="px-5 py-4">
                    <div class="flex items-center gap-3">
                      ${renderPlayerAvatar(player, 'md')}

                      <div>
                        <p class="font-bold ${theme.strongText}">
                          ${player.name}
                        </p>

                        <p class="text-xs ${theme.mutedText}">
                          ${stats.level} predictor
                        </p>
                      </div>
                    </div>
                  </td>

                  <td class="px-5 py-4">
                    ${renderRatingMedal(index)}
                  </td>

                  <td class="px-5 py-4 text-center font-bold ${theme.strongText}">
                    ${stats.exactScores}
                  </td>

                  <td class="px-5 py-4 text-center font-bold ${theme.strongText}">
                    ${stats.correctOutcomes}
                  </td>

                  <td class="px-5 py-4 text-center font-bold ${theme.mutedText}">
                    ${stats.missed}
                  </td>

                  <td class="px-5 py-4 text-right text-lg font-black text-violet-400">
                    ${player.points} pts
                  </td>
                </tr>
              `;
            })
            .join('')}
        </tbody>
      </table>
    </div>
  </section>
`;

const renderRulesPage = (theme) => `
  <section class="rounded-3xl border p-5 ${theme.card}" aria-labelledby="rules-page-title">
    <p class="text-sm font-semibold uppercase tracking-widest text-violet-400">
      Rules
    </p>

    <h1 id="rules-page-title" class="mt-2 text-3xl font-black ${theme.strongText}">
      Scoring rules
    </h1>

    <p class="mt-2 max-w-2xl text-sm ${theme.mutedText}">
      Predictions are for score-based competition only. No real-money betting is used.
    </p>

    <div class="mt-6 grid gap-4 md:grid-cols-3">
      ${predictionRules
        .map(
          (rule) => `
            <article class="rounded-2xl border p-5 ${theme.softCard}">
              <div class="mb-4 inline-flex min-h-10 min-w-16 items-center justify-center rounded-full bg-violet-600 px-4 text-sm font-black text-white">
                ${rule.points} pts
              </div>

              <h2 class="text-lg font-bold ${theme.strongText}">
                ${rule.title}
              </h2>

              <p class="mt-2 text-sm ${theme.mutedText}">
                ${rule.description}
              </p>
            </article>
          `
        )
        .join('')}
    </div>
  </section>
`;

const renderCalendarPage = (theme) => {
  const calendarGroups = getCalendarGroups();
  const hasActiveFilters =
    state.filters.group !== 'All groups' ||
    state.filters.team.trim() ||
    state.filters.status !== 'All matches';

  return `
    <section class="rounded-3xl border p-5 ${theme.card}" aria-labelledby="calendar-page-title">
      <div class="mb-6 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p class="text-sm font-semibold uppercase tracking-widest text-violet-400">
            Calendar
          </p>

          <h1 id="calendar-page-title" class="mt-2 text-3xl font-black ${theme.strongText}">
            FIFA World Cup 2026 match schedule
          </h1>

          <p class="mt-2 max-w-2xl text-sm ${theme.mutedText}">
            Browse group stage matches, compare player predictions and follow upcoming fixtures.
          </p>
        </div>

        <button
          class="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-violet-600 px-7 text-sm font-bold text-white shadow-lg shadow-violet-950/25 transition hover:-translate-y-0.5 hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-violet-300"
          type="button"
          data-filter-open
        >
          ${renderIcon('filter')}
          <span>Filters</span>
        </button>
      </div>

      ${
        hasActiveFilters
          ? `
            <div class="mb-5 flex flex-wrap items-center gap-2">
              <span class="rounded-full bg-violet-500/15 px-3 py-1 text-xs font-bold text-violet-400">
                ${state.filters.group}
              </span>

              ${
                state.filters.team.trim()
                  ? `
                    <span class="rounded-full bg-violet-500/15 px-3 py-1 text-xs font-bold text-violet-400">
                      Team: ${state.filters.team}
                    </span>
                  `
                  : ''
              }

              <span class="rounded-full bg-violet-500/15 px-3 py-1 text-xs font-bold text-violet-400">
                ${state.filters.status}
              </span>

              <button
                class="rounded-full border border-violet-500/30 px-3 py-1 text-xs font-bold text-violet-300 transition hover:bg-violet-500/15 focus-visible:outline-2 focus-visible:outline-violet-400"
                type="button"
                data-filter-reset-inline
              >
                Clear filters
              </button>
            </div>
          `
          : ''
      }

      ${
        calendarGroups.length === 0
          ? `
            <div class="rounded-2xl border border-dashed ${theme.isDark ? 'border-slate-600 bg-slate-900/55' : 'border-slate-200 bg-slate-50'} p-8 text-center">
              <p class="text-lg font-bold ${theme.strongText}">
                No matches found
              </p>

              <p class="mt-2 text-sm ${theme.mutedText}">
                Try another group, team name or status.
              </p>
            </div>
          `
          : `
            <div class="grid gap-3">
              ${calendarGroups
                .map(({ group, matches: groupMatches }) => {
                  const isOpen = isCalendarGroupOpen(group);

                  return `
                    <article class="overflow-hidden rounded-2xl border ${theme.softCard}">
                      <button
                        class="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition hover:bg-violet-500/10 focus-visible:outline-2 focus-visible:outline-violet-400"
                        type="button"
                        data-calendar-group="${group}"
                        aria-expanded="${isOpen}"
                      >
                        <span class="font-bold text-violet-300">
                          ${group}
                        </span>

                        <span class="text-lg ${theme.mutedText}" aria-hidden="true">
                          ${isOpen ? '⌃' : '⌄'}
                        </span>
                      </button>

                      ${
                        isOpen
                          ? `
                            <div class="border-t ${theme.isDark ? 'border-slate-700' : 'border-slate-200'}">
                              <div class="hidden xl:block">
                                <table class="w-full table-fixed text-left text-sm">
                                  <colgroup>
                                    <col class="w-[86px]">
                                    <col class="w-[70px]">
                                    <col class="w-[150px]">
                                    <col class="w-[64px]">
                                    <col class="w-[150px]">
                                    <col class="w-[190px]">
                                    <col>
                                  </colgroup>

                                  <thead class="${theme.mutedText}">
                                    <tr class="border-b ${theme.isDark ? 'border-slate-700' : 'border-slate-200'}">
                                      <th class="px-4 py-3 font-semibold">Date</th>
                                      <th class="px-4 py-3 font-semibold">Time</th>
                                      <th class="px-4 py-3 font-semibold">Team 1</th>
                                      <th class="px-4 py-3 text-center font-semibold">Score</th>
                                      <th class="px-4 py-3 font-semibold">Team 2</th>
                                      <th class="px-4 py-3 font-semibold">Venue</th>
                                      <th class="px-4 py-3 text-center font-semibold">Player Predictions</th>
                                    </tr>
                                  </thead>

                                  <tbody>
                                    ${groupMatches
                                      .map(
                                        (match) => `
                                          <tr class="border-b ${theme.isDark ? 'border-slate-700/70' : 'border-slate-200/80'}">
                                            <td class="px-4 py-4 align-middle ${theme.mutedText}">
                                              ${match.date}
                                            </td>

                                            <td class="px-4 py-4 align-middle ${theme.mutedText}">
                                              ${match.time}
                                            </td>

                                            <td class="px-4 py-4 align-middle">
                                              <div class="grid min-w-0 grid-cols-[24px_minmax(0,1fr)] items-center gap-2">
                                                <img
                                                  src="${match.homeFlag}"
                                                  alt="${match.home} flag"
                                                  class="h-6 w-6 rounded-full object-cover"
                                                >

                                                <span class="min-w-0 break-words font-semibold leading-tight ${theme.strongText}">
                                                  ${match.home}
                                                </span>
                                              </div>
                                            </td>

                                            <td class="px-4 py-4 text-center align-middle font-bold ${theme.strongText}">
                                              - : -
                                            </td>

                                            <td class="px-4 py-4 align-middle">
                                              <div class="grid min-w-0 grid-cols-[24px_minmax(0,1fr)] items-center gap-2">
                                                <img
                                                  src="${match.awayFlag}"
                                                  alt="${match.away} flag"
                                                  class="h-6 w-6 rounded-full object-cover"
                                                >

                                                <span class="min-w-0 break-words font-semibold leading-tight ${theme.strongText}">
                                                  ${match.away}
                                                </span>
                                              </div>
                                            </td>

                                            <td class="px-4 py-4 align-middle">
                                              <p
                                                class="truncate ${theme.mutedText}"
                                                title="${match.venue}, ${match.city}"
                                              >
                                                ${match.venue}, ${match.city}
                                              </p>
                                            </td>

                                            <td class="px-4 py-4 align-middle">
                                              ${renderCalendarPlayerPredictions(match, theme)}
                                            </td>
                                          </tr>
                                        `
                                      )
                                      .join('')}
                                  </tbody>
                                </table>
                              </div>

                              <div class="grid gap-3 p-3 xl:hidden">
                                ${groupMatches
                                  .map(
                                    (match) => `
                                      <article class="rounded-2xl border p-4 ${theme.isDark ? 'border-slate-700 bg-slate-900/65' : 'border-slate-200 bg-white'}">
                                        <div class="flex items-start justify-between gap-4">
                                          <div>
                                            <p class="font-bold ${theme.strongText}">
                                              ${match.date}
                                            </p>

                                            <p class="text-sm ${theme.mutedText}">
                                              ${match.time}
                                            </p>
                                          </div>

                                          <span class="rounded-full bg-violet-500/15 px-3 py-1 text-xs font-bold text-violet-400">
                                            ${match.group}
                                          </span>
                                        </div>

                                        <div class="mt-4 grid gap-2">
                                          <div class="grid grid-cols-[28px_minmax(0,1fr)] items-center gap-2">
                                            <img
                                              src="${match.homeFlag}"
                                              alt="${match.home} flag"
                                              class="h-7 w-7 rounded-full object-cover"
                                            >

                                            <span class="font-bold ${theme.strongText}">
                                              ${match.home}
                                            </span>
                                          </div>

                                          <div class="pl-9 text-sm font-bold uppercase ${theme.mutedText}">
                                            - : -
                                          </div>

                                          <div class="grid grid-cols-[28px_minmax(0,1fr)] items-center gap-2">
                                            <img
                                              src="${match.awayFlag}"
                                              alt="${match.away} flag"
                                              class="h-7 w-7 rounded-full object-cover"
                                            >

                                            <span class="font-bold ${theme.strongText}">
                                              ${match.away}
                                            </span>
                                          </div>
                                        </div>

                                        <p
                                          class="mt-3 truncate text-sm ${theme.mutedText}"
                                          title="${match.venue}, ${match.city}"
                                        >
                                          ${match.venue}, ${match.city}
                                        </p>

                                        <div class="mt-4 border-t pt-4 ${theme.isDark ? 'border-slate-700' : 'border-slate-200'}">
                                          ${renderCalendarPlayerPredictions(match, theme)}
                                        </div>
                                      </article>
                                    `
                                  )
                                  .join('')}
                              </div>
                            </div>
                          `
                          : ''
                      }
                    </article>
                  `;
                })
                .join('')}
            </div>
          `
      }
    </section>
  `;
};

const renderModalField = ({ id, label, type, placeholder, icon, hasEye = false }, theme) => `
  <div>
    <label class="mb-2 block text-sm font-semibold ${theme.strongText}" for="${id}">
      ${label}
    </label>

    <div class="relative">
      <span class="absolute left-4 top-1/2 -translate-y-1/2 ${theme.mutedText}">
        ${renderIcon(icon)}
      </span>

      <input
        id="${id}"
        class="min-h-12 w-full rounded-xl border ${theme.input} px-12 text-sm font-medium transition placeholder:text-slate-500 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
        type="${type}"
        placeholder="${placeholder}"
        autocomplete="${type === 'password' ? 'current-password' : 'on'}"
      >

      ${
        hasEye
          ? `
            <button
              class="absolute right-4 top-1/2 -translate-y-1/2 ${theme.mutedText} transition hover:text-violet-300 focus-visible:outline-2 focus-visible:outline-violet-400"
              type="button"
              aria-label="Show password"
            >
              ${renderIcon('eye')}
            </button>
          `
          : ''
      }
    </div>
  </div>
`;

const renderAuthModal = (theme) => {
  if (!state.activeModal) {
    return '';
  }

  const isRegister = state.activeModal === 'register';

  return `
    <div class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/75 px-4 py-6 backdrop-blur-md" data-modal-overlay role="presentation">
      <section class="relative max-h-[calc(100vh-3rem)] w-full max-w-lg overflow-y-auto rounded-3xl border p-6 shadow-2xl sm:p-8 ${theme.isDark ? 'border-violet-500/30 bg-[#111827]' : 'border-slate-200 bg-white'}" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title">
        <button
          class="absolute right-5 top-5 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border ${theme.isDark ? 'border-slate-600 text-white hover:border-violet-400' : 'border-slate-200 text-slate-700 hover:border-violet-400'} transition focus-visible:outline-2 focus-visible:outline-violet-400"
          type="button"
          data-modal-close
          aria-label="Close modal"
        >
          ${renderIcon('close')}
        </button>

        <div class="mb-8 flex items-center gap-4 pr-14">
          <span class="h-12 w-1.5 rounded-full bg-violet-500"></span>

          <h2 id="auth-modal-title" class="text-3xl font-black ${theme.strongText}">
            ${isRegister ? 'Register' : 'Log In'}
          </h2>
        </div>

        <form class="grid gap-5" data-auth-form>
          ${
            isRegister
              ? renderModalField(
                  {
                    id: 'register-username',
                    label: 'Username',
                    type: 'text',
                    placeholder: 'Choose a username',
                    icon: 'user'
                  },
                  theme
                )
              : renderModalField(
                  {
                    id: 'login-username',
                    label: 'Username or e-mail',
                    type: 'text',
                    placeholder: 'Enter your username or e-mail',
                    icon: 'user'
                  },
                  theme
                )
          }

          ${
            isRegister
              ? renderModalField(
                  {
                    id: 'register-email',
                    label: 'E-mail',
                    type: 'email',
                    placeholder: 'Enter your e-mail',
                    icon: 'mail'
                  },
                  theme
                )
              : ''
          }

          ${renderModalField(
            {
              id: isRegister ? 'register-password' : 'login-password',
              label: 'Password',
              type: 'password',
              placeholder: isRegister ? 'Create a password' : 'Enter your password',
              icon: 'lock',
              hasEye: true
            },
            theme
          )}

          ${
            isRegister
              ? renderModalField(
                  {
                    id: 'register-confirm-password',
                    label: 'Confirm password',
                    type: 'password',
                    placeholder: 'Confirm your password',
                    icon: 'lock',
                    hasEye: true
                  },
                  theme
                )
              : ''
          }

          ${
            !isRegister
              ? `
                <a class="justify-self-center text-sm font-semibold text-violet-400 transition hover:text-violet-300 focus-visible:outline-2 focus-visible:outline-violet-400" href="#">
                  Forgot password?
                </a>
              `
              : ''
          }

          <button
            class="mt-2 inline-flex min-h-13 items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 text-base font-bold text-white shadow-lg shadow-violet-950/30 transition hover:-translate-y-0.5 hover:from-violet-500 hover:to-blue-500 focus-visible:outline-2 focus-visible:outline-violet-300"
            type="submit"
          >
            ${isRegister ? 'Register' : 'Log In'}
          </button>

          <div class="grid gap-4 pt-2">
            <div class="flex items-center gap-4">
              <span class="h-px flex-1 ${theme.isDark ? 'bg-slate-700' : 'bg-slate-200'}"></span>
              <span class="text-sm ${theme.mutedText}">Or continue with</span>
              <span class="h-px flex-1 ${theme.isDark ? 'bg-slate-700' : 'bg-slate-200'}"></span>
            </div>

            <div class="flex justify-center gap-4">
              <button
                class="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#1877F2] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#166FE5] focus-visible:outline-2 focus-visible:outline-blue-400"
                type="button"
                data-modal-close
                aria-label="Continue with Facebook"
              >
                <span class="text-3xl font-bold leading-none text-white" aria-hidden="true">f</span>
              </button>

              <button
                class="inline-flex h-12 w-12 items-center justify-center rounded-full border ${theme.isDark ? 'border-slate-600 bg-white hover:border-violet-400' : 'border-slate-200 bg-white hover:border-violet-400'} shadow-sm transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-violet-400"
                type="button"
                data-modal-close
                aria-label="Continue with Google"
              >
                <img src="${publicAsset('img/icons/google.svg')}" alt="" class="h-6 w-6">
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  `;
};

const renderFilterModal = (theme) => {
  if (!state.isFilterOpen) {
    return '';
  }

  return `
    <div class="fixed inset-0 z-[95] flex items-center justify-center bg-slate-950/75 px-4 py-6 backdrop-blur-md" data-filter-overlay role="presentation">
      <section class="relative max-h-[calc(100vh-3rem)] w-full max-w-2xl overflow-y-auto rounded-3xl border p-6 shadow-2xl sm:p-8 ${theme.isDark ? 'border-violet-500/30 bg-[#111827]' : 'border-slate-200 bg-white'}" role="dialog" aria-modal="true" aria-labelledby="filter-modal-title">
        <button
          class="absolute right-5 top-5 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border ${theme.isDark ? 'border-slate-600 text-white hover:border-violet-400' : 'border-slate-200 text-slate-700 hover:border-violet-400'} transition focus-visible:outline-2 focus-visible:outline-violet-400"
          type="button"
          data-filter-close
          aria-label="Close filters"
        >
          ${renderIcon('close')}
        </button>

        <div class="mb-8 flex items-center gap-4 pr-14">
          <span class="h-12 w-1.5 rounded-full bg-violet-500"></span>
          <h2 id="filter-modal-title" class="text-3xl font-black ${theme.strongText}">Filters</h2>
        </div>

        <form class="grid gap-7" data-filter-form>
          <div>
            <label class="mb-2 block text-sm font-semibold ${theme.strongText}" for="filter-group">
              Group
            </label>

            <div class="relative">
              <select
                id="filter-group"
                class="min-h-12 w-full appearance-none rounded-xl border ${theme.input} px-4 py-3 pr-12 text-sm font-semibold transition focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
                data-filter-group-input
              >
                <option ${state.filterDraft.group === 'All groups' ? 'selected' : ''}>All groups</option>
                ${groups
                  .map(
                    (group) => `
                      <option ${state.filterDraft.group === group.id ? 'selected' : ''}>
                        ${group.id}
                      </option>
                    `
                  )
                  .join('')}
              </select>

              <span class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 ${theme.mutedText}">
                ⌄
              </span>
            </div>
          </div>

          <div>
            <label class="mb-2 block text-sm font-semibold ${theme.strongText}" for="filter-team">
              Team
            </label>

            <input
              id="filter-team"
              class="min-h-12 w-full rounded-xl border ${theme.input} px-4 text-sm font-semibold transition placeholder:text-slate-500 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
              type="text"
              value="${state.filterDraft.team}"
              placeholder="Search by team name"
              data-filter-team-input
            >
          </div>

          <fieldset>
            <legend class="mb-3 text-sm font-semibold ${theme.strongText}">
              Status
            </legend>

            <div class="grid gap-3">
              ${['All matches', 'Upcoming', 'Completed']
                .map(
                  (item) => `
                    <label class="flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition ${theme.isDark ? 'border-slate-700 bg-slate-900/70 hover:border-violet-500/50' : 'border-slate-200 bg-slate-50 hover:border-violet-300'}">
                      <input
                        class="h-5 w-5 accent-violet-600"
                        type="radio"
                        name="match-status"
                        value="${item}"
                        ${state.filterDraft.status === item ? 'checked' : ''}
                        data-filter-status-input
                      >

                      <span class="font-semibold ${theme.strongText}">
                        ${item}
                      </span>
                    </label>
                  `
                )
                .join('')}
            </div>
          </fieldset>

          <div class="grid gap-3 pt-2 sm:grid-cols-[auto_1fr_1fr]">
            <button
              class="inline-flex min-h-12 items-center justify-center rounded-2xl border px-5 text-sm font-bold transition ${theme.isDark ? 'border-slate-600 text-white hover:border-violet-400' : 'border-slate-200 text-slate-950 hover:border-violet-400'} focus-visible:outline-2 focus-visible:outline-violet-400"
              type="button"
              data-filter-reset
            >
              Reset
            </button>

            <button
              class="inline-flex min-h-12 items-center justify-center rounded-2xl border px-5 text-sm font-bold transition ${theme.isDark ? 'border-slate-600 text-white hover:border-violet-400' : 'border-slate-200 text-slate-950 hover:border-violet-400'} focus-visible:outline-2 focus-visible:outline-violet-400"
              type="button"
              data-filter-close
            >
              Cancel
            </button>

            <button
              class="inline-flex min-h-12 items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 text-sm font-bold text-white shadow-lg shadow-violet-950/25 transition hover:-translate-y-0.5 hover:from-violet-500 hover:to-blue-500 focus-visible:outline-2 focus-visible:outline-violet-300"
              type="submit"
            >
              Apply
            </button>
          </div>
        </form>
      </section>
    </div>
  `;
};

const updateFooter = (theme) => {
  footerRoot.className = `relative z-10 mt-8 border-t ${theme.footer}`;
  footerLogo.src = theme.logo;

  footerDescription.className = `mt-3 max-w-md text-sm ${theme.mutedText}`;

  footerCopyright.className = `border-t ${
    theme.isDark ? 'border-slate-700' : 'border-slate-200'
  } px-4 py-5 text-center text-sm ${theme.mutedText}`;
};

const closeAuthModal = () => {
  state.activeModal = null;
  renderApp();
};

const resetFilters = () => {
  state.filters = {
    group: 'All groups',
    team: '',
    status: 'All matches'
  };

  state.filterDraft = {
    group: 'All groups',
    team: '',
    status: 'All matches'
  };

  state.openCalendarGroups = ['Group A'];
};

const applyFilters = () => {
  state.filters = {
    ...state.filterDraft
  };

  const filteredGroups = getCalendarGroups();

  state.openCalendarGroups = filteredGroups.length > 0 ? [filteredGroups[0].group] : [];
};

const updateDecorativePlayers = (theme) => {
  playerLeftGlow.className = `fixed left-0 top-0 z-0 h-full w-[400px] ${theme.playerGlowLeft}`;
  playerRightGlow.className = `fixed right-0 top-0 z-0 h-full w-[400px] ${theme.playerGlowRight}`;

  playerLeftImage.src = publicAsset('player-right-blue.webp');
  playerLeftImage.className = `fixed left-8 top-24 z-10 h-[calc(100vh-8rem)] max-h-[800px] object-contain object-left-bottom ${theme.playerImageFx} ${theme.playerOpacity}`;

  playerRightImage.src = publicAsset('player-left-yellow.webp');
  playerRightImage.className = `fixed right-8 top-24 z-10 h-[calc(100vh-8rem)] max-h-[800px] object-contain object-right-bottom ${theme.playerImageFx} ${theme.playerOpacity}`;
};

const updateHeader = (theme) => {
  siteHeader.className = `sticky top-0 z-50 border-b backdrop-blur-xl ${theme.header}`;
  headerLogo.src = theme.logo;

  headerNavLinks.forEach((link) => {
    const isActive = state.activePage === link.dataset.pageLink;

    link.className = isActive
      ? 'text-violet-300'
      : `${theme.mutedText} transition hover:text-violet-300`;
  });

  themeToggleButton.className = `inline-flex min-h-10 min-w-10 items-center justify-center rounded-xl border text-sm font-semibold sm:min-h-11 sm:min-w-11 ${
    theme.isDark
      ? 'border-slate-600 bg-slate-800 text-white'
      : 'border-slate-200 bg-white text-slate-900'
  } hover:border-violet-400 focus-visible:outline-2 focus-visible:outline-violet-400`;

  themeToggleButton.textContent = theme.isDark ? '☾' : '☀';
  themeToggleButton.setAttribute(
    'aria-label',
    `Switch to ${theme.isDark ? 'light' : 'dark'} theme`
  );

  headerLoginButton.className = `hidden min-h-11 items-center justify-center rounded-xl border px-5 text-sm font-bold sm:inline-flex ${
    theme.isDark ? 'border-slate-600 text-white' : 'border-slate-200 text-slate-950'
  } hover:border-violet-400 focus-visible:outline-2 focus-visible:outline-violet-400`;

  mobileMenuOpenButton.className = `inline-flex min-h-10 min-w-10 items-center justify-center rounded-xl border lg:hidden ${
    theme.isDark
      ? 'border-slate-600 bg-slate-800 text-white'
      : 'border-slate-200 bg-white text-slate-900'
  } hover:border-violet-400 focus-visible:outline-2 focus-visible:outline-violet-400`;

  mobileMenuOpenButton.setAttribute('aria-expanded', String(state.isMobileMenuOpen));
};

const updateMobileMenu = (theme) => {
  mobileMenu.className = state.isMobileMenuOpen
    ? 'fixed inset-0 z-[90] bg-slate-950/70 backdrop-blur-md lg:hidden'
    : 'hidden fixed inset-0 z-[90] bg-slate-950/70 backdrop-blur-md lg:hidden';

  mobileMenuPanel.className = `ml-auto flex h-full w-full max-w-sm flex-col border-l shadow-2xl ${
    theme.isDark ? 'border-slate-700 bg-[#111827]' : 'border-slate-200 bg-white'
  }`;

  mobileMenuHeader.className = `flex items-center justify-between gap-4 border-b px-5 py-4 ${
    theme.isDark ? 'border-slate-700' : 'border-slate-200'
  }`;

  mobileMenuLogo.src = theme.logo;

  mobileMenuCloseButton.className = `inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border transition ${
    theme.isDark
      ? 'border-slate-600 text-white hover:border-violet-400'
      : 'border-slate-200 text-slate-700 hover:border-violet-400'
  } focus-visible:outline-2 focus-visible:outline-violet-400`;

  mobileAuthActions.className = `mt-6 grid gap-3 border-t pt-5 ${
    theme.isDark ? 'border-slate-700' : 'border-slate-200'
  }`;

  mobileLoginButton.className = `inline-flex min-h-12 items-center justify-center rounded-2xl border px-5 text-sm font-bold transition ${
    theme.isDark
      ? 'border-slate-600 text-white hover:border-violet-400'
      : 'border-slate-200 text-slate-950 hover:border-violet-400'
  } focus-visible:outline-2 focus-visible:outline-violet-400`;

  mobileNavLinks.forEach((link) => {
    const page = link.dataset.mobileNavLink;
    const isActive = state.activePage === page;
    const [icon, content] = link.children;
    const [title, subtitle] = content.children;

    link.className = `group flex items-center gap-4 rounded-2xl border p-4 transition ${
      theme.isDark
        ? 'border-slate-700 bg-slate-900/70 hover:border-violet-500/60 hover:bg-violet-500/10'
        : 'border-slate-200 bg-slate-50 hover:border-violet-300 hover:bg-violet-50'
    }`;

    icon.className =
      'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-lg text-violet-300';

    title.className = `block font-bold ${isActive ? 'text-violet-300' : theme.strongText}`;
    subtitle.className = `mt-1 block text-sm ${theme.mutedText}`;
  });
};

const syncSectionFromMarkup = (targetElement, markup) => {
  const template = document.createElement('template');

  template.innerHTML = markup.trim();

  const nextElement = template.content.firstElementChild;

  if (!targetElement || !nextElement) {
    return;
  }

  targetElement.className = nextElement.className;
  targetElement.innerHTML = nextElement.innerHTML;
};

const togglePages = () => {
  pageSections.forEach((section) => {
    const isActive = section.dataset.page === state.activePage;

    section.classList.toggle('hidden', !isActive);
  });
};

const renderPredictionsContent = (theme) => {
  syncSectionFromMarkup(predictionFilters, renderFilters(theme));
  syncSectionFromMarkup(featuredMatch, renderFeaturedMatch(theme));
  syncSectionFromMarkup(upcomingMatchesSection, renderUpcomingMatches(theme));
  syncSectionFromMarkup(standingsSection, renderStandings(theme));
  syncSectionFromMarkup(topPredictorsSection, renderTopPredictors(theme));
};

const renderPageContent = (theme) => {
  renderPredictionsContent(theme);
  syncSectionFromMarkup(calendarPage, renderCalendarPage(theme));
  syncSectionFromMarkup(ratingsPage, renderRatingsPage(theme));
  syncSectionFromMarkup(rulesPage, renderRulesPage(theme));

  togglePages();
};

const renderApp = () => {
  const theme = getTheme();

  document.documentElement.dataset.theme = state.theme;
  document.body.className = theme.isDark ? 'bg-[#0b1220]' : 'bg-slate-50';

  app.className = `flex min-h-screen flex-col ${theme.page}`;

  updateDecorativePlayers(theme);
  updateHeader(theme);
  updateMobileMenu(theme);
  updateFooter(theme);
  renderPageContent(theme);

  authModalRoot.innerHTML = renderAuthModal(theme);
  filterModalRoot.innerHTML = renderFilterModal(theme);

  bindEvents();

  document.documentElement.classList.add('app-ready');
};

const bindEvents = () => {
  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    if (button.dataset.bound === 'true') {
      return;
    }

    button.dataset.bound = 'true';

    button.addEventListener('click', () => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', state.theme);
      renderApp();
    });
  });

  document.querySelectorAll('[data-tournament-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      state.isTournamentOpen = !state.isTournamentOpen;
      renderApp();
    });
  });

  document.querySelectorAll('[data-tournament-option]').forEach((button) => {
    button.addEventListener('click', () => {
      state.isTournamentOpen = false;
      renderApp();
    });
  });

  document.querySelectorAll('[data-page-link]').forEach((link) => {
    if (link.dataset.bound === 'true') {
      return;
    }

    link.dataset.bound = 'true';

    link.addEventListener('click', (event) => {
      event.preventDefault();

      const nextPage = link.dataset.pageLink;

      state.activePage = nextPage;
      localStorage.setItem('activePage', state.activePage);

      if (nextPage === 'calendar') {
        state.openCalendarGroups = ['Group A'];
      }

      state.isTournamentOpen = false;
      state.isMobileMenuOpen = false;
      renderApp();
    });
  });

  document.querySelectorAll('[data-calendar-group]').forEach((button) => {
    button.addEventListener('click', () => {
      toggleCalendarGroup(button.dataset.calendarGroup);
      renderApp();
    });
  });

  document.querySelectorAll('[data-modal-open]').forEach((button) => {
    if (button.dataset.bound === 'true') {
      return;
    }

    button.dataset.bound = 'true';

    button.addEventListener('click', () => {
      state.activeModal = button.dataset.modalOpen;
      state.isMobileMenuOpen = false;
      renderApp();
    });
  });

  document.querySelectorAll('[data-modal-close]').forEach((button) => {
    button.addEventListener('click', () => {
      closeAuthModal();
    });
  });

  document.querySelectorAll('[data-auth-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      closeAuthModal();
    });
  });

  document.querySelectorAll('[data-modal-overlay]').forEach((overlay) => {
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) {
        closeAuthModal();
      }
    });
  });

  document.querySelectorAll('[data-menu-open]').forEach((button) => {
    if (button.dataset.bound === 'true') {
      return;
    }

    button.dataset.bound = 'true';

    button.addEventListener('click', () => {
      state.isMobileMenuOpen = true;
      renderApp();
    });
  });

  document.querySelectorAll('[data-menu-close]').forEach((button) => {
    if (button.dataset.bound === 'true') {
      return;
    }

    button.dataset.bound = 'true';

    button.addEventListener('click', () => {
      state.isMobileMenuOpen = false;
      renderApp();
    });
  });

  document.querySelectorAll('[data-menu-overlay]').forEach((overlay) => {
    if (overlay.dataset.bound === 'true') {
      return;
    }

    overlay.dataset.bound = 'true';

    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) {
        state.isMobileMenuOpen = false;
        renderApp();
      }
    });
  });

  document.querySelectorAll('[data-menu-link]').forEach((link) => {
    if (link.dataset.bound === 'true') {
      return;
    }

    link.dataset.bound = 'true';

    link.addEventListener('click', () => {
      state.isMobileMenuOpen = false;
      renderApp();
    });
  });

  document.querySelectorAll('[data-filter-open]').forEach((button) => {
    button.addEventListener('click', () => {
      state.filterDraft = {
        ...state.filters
      };

      state.isFilterOpen = true;
      renderApp();
    });
  });

  document.querySelectorAll('[data-filter-close]').forEach((button) => {
    button.addEventListener('click', () => {
      state.isFilterOpen = false;
      renderApp();
    });
  });

  document.querySelectorAll('[data-filter-overlay]').forEach((overlay) => {
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) {
        state.isFilterOpen = false;
        renderApp();
      }
    });
  });

  document.querySelectorAll('[data-filter-group-input]').forEach((select) => {
    select.addEventListener('change', () => {
      state.filterDraft.group = select.value;
    });
  });

  document.querySelectorAll('[data-filter-team-input]').forEach((input) => {
    input.addEventListener('input', () => {
      state.filterDraft.team = input.value;
    });
  });

  document.querySelectorAll('[data-filter-status-input]').forEach((input) => {
    input.addEventListener('change', () => {
      state.filterDraft.status = input.value;
    });
  });

  document.querySelectorAll('[data-filter-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      applyFilters();
      state.isFilterOpen = false;
      renderApp();
    });
  });

  document.querySelectorAll('[data-filter-reset]').forEach((button) => {
    button.addEventListener('click', () => {
      resetFilters();
      state.isFilterOpen = false;
      renderApp();
    });
  });

  document.querySelectorAll('[data-filter-reset-inline]').forEach((button) => {
    button.addEventListener('click', () => {
      resetFilters();
      renderApp();
    });
  });

  document.querySelectorAll('[data-schedule-date]').forEach((input) => {
    input.addEventListener('change', () => {
      state.selectedScheduleDate = input.value;
      renderApp();
    });
  });

  document.querySelectorAll('[data-schedule-reset]').forEach((button) => {
    button.addEventListener('click', () => {
      state.selectedScheduleDate = null;
      renderApp();
    });
  });

  document.querySelectorAll('[data-schedule-prev]').forEach((button) => {
    button.addEventListener('click', () => {
      state.selectedScheduleDate = getNextScheduleDate(-1);
      renderApp();
    });
  });

  document.querySelectorAll('[data-schedule-next]').forEach((button) => {
    button.addEventListener('click', () => {
      state.selectedScheduleDate = getNextScheduleDate(1);
      renderApp();
    });
  });

  document.querySelectorAll('[data-standings-prev]').forEach((button) => {
    button.addEventListener('click', () => {
      state.standingsGroupIndex = Math.max(0, state.standingsGroupIndex - 1);
      renderApp();
    });
  });

  document.querySelectorAll('[data-standings-next]').forEach((button) => {
    button.addEventListener('click', () => {
      state.standingsGroupIndex = Math.min(groups.length - 1, state.standingsGroupIndex + 1);
      renderApp();
    });
  });

  document.querySelectorAll('[data-standings-dot]').forEach((button) => {
    button.addEventListener('click', () => {
      state.standingsGroupIndex = Number(button.dataset.standingsDot);
      renderApp();
    });
  });

  document.querySelectorAll('[data-score-input]').forEach((input) => {
    input.addEventListener('input', () => {
      const cleanValue = input.value.replace(/\D/g, '').slice(0, 2);

      input.value = cleanValue;
      state.scoreDrafts[input.id] = cleanValue;
    });
  });

  document.querySelectorAll('[data-score-step]').forEach((button) => {
    button.addEventListener('click', () => {
      const input = document.getElementById(button.dataset.inputId);

      if (!input) {
        return;
      }

      const step = Number(button.dataset.step);
      const currentValue = Number(input.value) || 0;
      const nextValue = Math.min(20, Math.max(0, currentValue + step));

      input.value = nextValue;
      state.scoreDrafts[input.id] = String(nextValue);
    });
  });
};

renderApp();
