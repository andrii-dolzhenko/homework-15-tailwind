const publicAsset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

export const tournamentOptions = [
  { label: 'FIFA World Cup 2026', value: 'world-cup-2026', disabled: false },
  {
    label: 'UEFA Super Cup 2026',
    value: 'uefa-super-cup-2026',
    disabled: true
  },
  {
    label: 'UEFA Nations League 2026/27',
    value: 'uefa-nations-league-2026-27',
    disabled: true
  }
];

export const groups = [
  {
    id: 'Group A',
    teams: [
      { name: 'Mexico', flag: '/img/flags/mexico.png' },
      { name: 'South Africa', flag: '/img/flags/south-africa.png' },
      { name: 'South Korea', flag: '/img/flags/south-korea.png' },
      { name: 'Czech Republic', flag: '/img/flags/czech-republic.png' }
    ]
  },
  {
    id: 'Group B',
    teams: [
      { name: 'Canada', flag: '/img/flags/canada.png' },
      { name: 'Switzerland', flag: '/img/flags/switzerland.png' },
      { name: 'Qatar', flag: '/img/flags/qatar.png' },
      {
        name: 'Bosnia and Herzegovina',
        flag: '/img/flags/bosnia-and-herzegovina.png'
      }
    ]
  },
  {
    id: 'Group C',
    teams: [
      { name: 'Brazil', flag: '/img/flags/brazil.png' },
      { name: 'Morocco', flag: '/img/flags/morocco.png' },
      { name: 'Haiti', flag: '/img/flags/haiti.png' },
      { name: 'Scotland', flag: '/img/flags/scotland.png' }
    ]
  },
  {
    id: 'Group D',
    teams: [
      { name: 'United States', flag: '/img/flags/united-states.png' },
      { name: 'Paraguay', flag: '/img/flags/paraguay.png' },
      { name: 'Australia', flag: '/img/flags/australia.png' },
      { name: 'Turkey', flag: '/img/flags/turkey.png' }
    ]
  },
  {
    id: 'Group E',
    teams: [
      { name: 'Germany', flag: '/img/flags/germany.png' },
      { name: 'Curacao', flag: '/img/flags/curacao.png' },
      { name: 'Ivory Coast', flag: '/img/flags/ivory-coast.png' },
      { name: 'Ecuador', flag: '/img/flags/ecuador.png' }
    ]
  },
  {
    id: 'Group F',
    teams: [
      { name: 'Netherlands', flag: '/img/flags/netherlands.png' },
      { name: 'Japan', flag: '/img/flags/japan.png' },
      { name: 'Tunisia', flag: '/img/flags/tunisia.png' },
      { name: 'Sweden', flag: '/img/flags/sweden.png' }
    ]
  },
  {
    id: 'Group G',
    teams: [
      { name: 'Belgium', flag: '/img/flags/belgium.png' },
      { name: 'Egypt', flag: '/img/flags/egypt.png' },
      { name: 'Iran', flag: '/img/flags/iran.png' },
      { name: 'New Zealand', flag: '/img/flags/new-zealand.png' }
    ]
  },
  {
    id: 'Group H',
    teams: [
      { name: 'Spain', flag: '/img/flags/spain.png' },
      { name: 'Cabo Verde', flag: '/img/flags/cabo-verde.png' },
      { name: 'Saudi Arabia', flag: '/img/flags/saudi-arabia.png' },
      { name: 'Uruguay', flag: '/img/flags/uruguay.png' }
    ]
  },
  {
    id: 'Group I',
    teams: [
      { name: 'France', flag: '/img/flags/france.png' },
      { name: 'Senegal', flag: '/img/flags/senegal.png' },
      { name: 'Norway', flag: '/img/flags/norway.png' },
      { name: 'Iraq', flag: '/img/flags/iraq.png' }
    ]
  },
  {
    id: 'Group J',
    teams: [
      { name: 'Argentina', flag: '/img/flags/argentina.png' },
      { name: 'Algeria', flag: '/img/flags/algeria.png' },
      { name: 'Austria', flag: '/img/flags/austria.png' },
      { name: 'Jordan', flag: '/img/flags/jordan.png' }
    ]
  },
  {
    id: 'Group K',
    teams: [
      { name: 'Portugal', flag: '/img/flags/portugal.png' },
      { name: 'Colombia', flag: '/img/flags/colombia.png' },
      { name: 'Uzbekistan', flag: '/img/flags/uzbekistan.png' },
      { name: 'DR Congo', flag: '/img/flags/democratic-republic-of-congo.png' }
    ]
  },
  {
    id: 'Group L',
    teams: [
      { name: 'England', flag: '/img/flags/england.png' },
      { name: 'Croatia', flag: '/img/flags/croatia.png' },
      { name: 'Ghana', flag: '/img/flags/ghana.png' },
      { name: 'Panama', flag: '/img/flags/panama.png' }
    ]
  }
];

groups.forEach((group) => {
  group.teams.forEach((team) => {
    team.flag = publicAsset(team.flag);
  });
});

const teamByName = groups
  .flatMap((group) => group.teams)
  .reduce((acc, team) => ({ ...acc, [team.name]: team }), {});

const createMatch = ({
  id,
  group,
  date,
  dateValue,
  time,
  venue,
  city,
  home,
  away,
  prediction
}) => ({
  id,
  date,
  dateValue,
  time,
  stage: 'Group Stage',
  group,
  venue,
  city,
  home,
  away,
  homeFlag: teamByName[home].flag,
  awayFlag: teamByName[away].flag,
  prediction,
  status: 'Upcoming'
});

export const matches = [
  createMatch({
    id: 1,
    group: 'Group A',
    date: 'Jun 11, 2026',
    dateValue: '2026-06-11',
    time: '21:00',
    venue: 'Estadio Azteca',
    city: 'Mexico City',
    home: 'Mexico',
    away: 'South Africa',
    prediction: { homeScore: 2, awayScore: 1 }
  }),
  createMatch({
    id: 2,
    group: 'Group A',
    date: 'Jun 11, 2026',
    dateValue: '2026-06-11',
    time: '23:00',
    venue: 'Estadio Akron',
    city: 'Guadalajara',
    home: 'South Korea',
    away: 'Czech Republic',
    prediction: { homeScore: 1, awayScore: 1 }
  }),

  createMatch({
    id: 3,
    group: 'Group B',
    date: 'Jun 12, 2026',
    dateValue: '2026-06-12',
    time: '19:00',
    venue: 'BMO Field',
    city: 'Toronto',
    home: 'Canada',
    away: 'Bosnia and Herzegovina',
    prediction: { homeScore: 1, awayScore: 1 }
  }),
  createMatch({
    id: 4,
    group: 'Group D',
    date: 'Jun 12, 2026',
    dateValue: '2026-06-12',
    time: '21:00',
    venue: 'SoFi Stadium',
    city: 'Los Angeles',
    home: 'United States',
    away: 'Paraguay',
    prediction: { homeScore: 2, awayScore: 0 }
  }),

  createMatch({
    id: 5,
    group: 'Group B',
    date: 'Jun 13, 2026',
    dateValue: '2026-06-13',
    time: '21:00',
    venue: 'Levi’s Stadium',
    city: 'San Francisco Bay Area',
    home: 'Qatar',
    away: 'Switzerland',
    prediction: { homeScore: 0, awayScore: 2 }
  }),
  createMatch({
    id: 6,
    group: 'Group D',
    date: 'Jun 13, 2026',
    dateValue: '2026-06-13',
    time: '18:00',
    venue: 'BC Place',
    city: 'Vancouver',
    home: 'Australia',
    away: 'Turkey',
    prediction: { homeScore: 1, awayScore: 2 }
  }),

  createMatch({
    id: 7,
    group: 'Group C',
    date: 'Jun 14, 2026',
    dateValue: '2026-06-14',
    time: '01:00',
    venue: 'Hard Rock Stadium',
    city: 'Miami',
    home: 'Brazil',
    away: 'Morocco',
    prediction: { homeScore: 2, awayScore: 1 }
  }),
  createMatch({
    id: 8,
    group: 'Group C',
    date: 'Jun 14, 2026',
    dateValue: '2026-06-14',
    time: '04:00',
    venue: 'Gillette Stadium',
    city: 'Boston',
    home: 'Haiti',
    away: 'Scotland',
    prediction: { homeScore: 0, awayScore: 1 }
  }),
  createMatch({
    id: 9,
    group: 'Group E',
    date: 'Jun 14, 2026',
    dateValue: '2026-06-14',
    time: '20:00',
    venue: 'NRG Stadium',
    city: 'Houston',
    home: 'Germany',
    away: 'Curacao',
    prediction: { homeScore: 3, awayScore: 0 }
  }),
  createMatch({
    id: 10,
    group: 'Group F',
    date: 'Jun 14, 2026',
    dateValue: '2026-06-14',
    time: '23:00',
    venue: 'AT&T Stadium',
    city: 'Dallas',
    home: 'Netherlands',
    away: 'Japan',
    prediction: { homeScore: 2, awayScore: 1 }
  }),

  createMatch({
    id: 11,
    group: 'Group H',
    date: 'Jun 15, 2026',
    dateValue: '2026-06-15',
    time: '19:00',
    venue: 'Mercedes-Benz Stadium',
    city: 'Atlanta',
    home: 'Spain',
    away: 'Cabo Verde',
    prediction: { homeScore: 3, awayScore: 0 }
  }),
  createMatch({
    id: 12,
    group: 'Group G',
    date: 'Jun 15, 2026',
    dateValue: '2026-06-15',
    time: '22:00',
    venue: 'Lincoln Financial Field',
    city: 'Philadelphia',
    home: 'Belgium',
    away: 'Egypt',
    prediction: { homeScore: 2, awayScore: 0 }
  }),
  createMatch({
    id: 13,
    group: 'Group E',
    date: 'Jun 15, 2026',
    dateValue: '2026-06-15',
    time: '02:00',
    venue: 'MetLife Stadium',
    city: 'New York/New Jersey',
    home: 'Ivory Coast',
    away: 'Ecuador',
    prediction: { homeScore: 1, awayScore: 1 }
  }),
  createMatch({
    id: 14,
    group: 'Group H',
    date: 'Jun 15, 2026',
    dateValue: '2026-06-15',
    time: '01:00',
    venue: 'Hard Rock Stadium',
    city: 'Miami',
    home: 'Saudi Arabia',
    away: 'Uruguay',
    prediction: { homeScore: 1, awayScore: 2 }
  }),

  createMatch({
    id: 15,
    group: 'Group F',
    date: 'Jun 16, 2026',
    dateValue: '2026-06-16',
    time: '05:00',
    venue: 'Lumen Field',
    city: 'Seattle',
    home: 'Sweden',
    away: 'Tunisia',
    prediction: { homeScore: 2, awayScore: 1 }
  }),
  createMatch({
    id: 16,
    group: 'Group G',
    date: 'Jun 16, 2026',
    dateValue: '2026-06-16',
    time: '04:00',
    venue: 'MetLife Stadium',
    city: 'New York/New Jersey',
    home: 'Iran',
    away: 'New Zealand',
    prediction: { homeScore: 1, awayScore: 0 }
  }),
  createMatch({
    id: 17,
    group: 'Group I',
    date: 'Jun 16, 2026',
    dateValue: '2026-06-16',
    time: '22:00',
    venue: 'MetLife Stadium',
    city: 'New York/New Jersey',
    home: 'France',
    away: 'Senegal',
    prediction: { homeScore: 2, awayScore: 0 }
  }),

  createMatch({
    id: 18,
    group: 'Group J',
    date: 'Jun 17, 2026',
    dateValue: '2026-06-17',
    time: '04:00',
    venue: 'Arrowhead Stadium',
    city: 'Kansas City',
    home: 'Argentina',
    away: 'Algeria',
    prediction: { homeScore: 2, awayScore: 1 }
  }),
  createMatch({
    id: 19,
    group: 'Group I',
    date: 'Jun 17, 2026',
    dateValue: '2026-06-17',
    time: '01:00',
    venue: 'AT&T Stadium',
    city: 'Dallas',
    home: 'Iraq',
    away: 'Norway',
    prediction: { homeScore: 1, awayScore: 2 }
  }),
  createMatch({
    id: 20,
    group: 'Group K',
    date: 'Jun 17, 2026',
    dateValue: '2026-06-17',
    time: '20:00',
    venue: 'Mercedes-Benz Stadium',
    city: 'Atlanta',
    home: 'Portugal',
    away: 'DR Congo',
    prediction: { homeScore: 3, awayScore: 0 }
  }),
  createMatch({
    id: 21,
    group: 'Group L',
    date: 'Jun 17, 2026',
    dateValue: '2026-06-17',
    time: '23:00',
    venue: 'Gillette Stadium',
    city: 'Boston',
    home: 'England',
    away: 'Croatia',
    prediction: { homeScore: 2, awayScore: 1 }
  }),
  createMatch({
    id: 22,
    group: 'Group J',
    date: 'Jun 17, 2026',
    dateValue: '2026-06-17',
    time: '07:00',
    venue: 'Lumen Field',
    city: 'Seattle',
    home: 'Austria',
    away: 'Jordan',
    prediction: { homeScore: 2, awayScore: 0 }
  }),

  createMatch({
    id: 23,
    group: 'Group K',
    date: 'Jun 18, 2026',
    dateValue: '2026-06-18',
    time: '05:00',
    venue: 'Levi’s Stadium',
    city: 'San Francisco Bay Area',
    home: 'Uzbekistan',
    away: 'Colombia',
    prediction: { homeScore: 1, awayScore: 2 }
  }),
  createMatch({
    id: 24,
    group: 'Group L',
    date: 'Jun 18, 2026',
    dateValue: '2026-06-18',
    time: '02:00',
    venue: 'BMO Field',
    city: 'Toronto',
    home: 'Ghana',
    away: 'Panama',
    prediction: { homeScore: 1, awayScore: 1 }
  }),
  createMatch({
    id: 25,
    group: 'Group A',
    date: 'Jun 18, 2026',
    dateValue: '2026-06-18',
    time: '19:00',
    venue: 'Estadio Azteca',
    city: 'Mexico City',
    home: 'Czech Republic',
    away: 'South Africa',
    prediction: { homeScore: 1, awayScore: 1 }
  }),
  createMatch({
    id: 26,
    group: 'Group B',
    date: 'Jun 18, 2026',
    dateValue: '2026-06-18',
    time: '22:00',
    venue: 'BC Place',
    city: 'Vancouver',
    home: 'Switzerland',
    away: 'Bosnia and Herzegovina',
    prediction: { homeScore: 2, awayScore: 1 }
  }),

  createMatch({
    id: 27,
    group: 'Group A',
    date: 'Jun 19, 2026',
    dateValue: '2026-06-19',
    time: '04:00',
    venue: 'Estadio Akron',
    city: 'Guadalajara',
    home: 'Mexico',
    away: 'Czech Republic',
    prediction: { homeScore: 2, awayScore: 1 }
  }),
  createMatch({
    id: 28,
    group: 'Group B',
    date: 'Jun 19, 2026',
    dateValue: '2026-06-19',
    time: '01:00',
    venue: 'BMO Field',
    city: 'Toronto',
    home: 'Canada',
    away: 'Qatar',
    prediction: { homeScore: 2, awayScore: 0 }
  }),

  createMatch({
    id: 29,
    group: 'Group C',
    date: 'Jun 20, 2026',
    dateValue: '2026-06-20',
    time: '01:00',
    venue: 'Hard Rock Stadium',
    city: 'Miami',
    home: 'Brazil',
    away: 'Haiti',
    prediction: { homeScore: 3, awayScore: 0 }
  }),
  createMatch({
    id: 30,
    group: 'Group C',
    date: 'Jun 20, 2026',
    dateValue: '2026-06-20',
    time: '03:30',
    venue: 'Lincoln Financial Field',
    city: 'Philadelphia',
    home: 'Scotland',
    away: 'Morocco',
    prediction: { homeScore: 1, awayScore: 2 }
  }),
  createMatch({
    id: 31,
    group: 'Group D',
    date: 'Jun 20, 2026',
    dateValue: '2026-06-20',
    time: '22:00',
    venue: 'SoFi Stadium',
    city: 'Los Angeles',
    home: 'United States',
    away: 'Australia',
    prediction: { homeScore: 2, awayScore: 1 }
  }),
  createMatch({
    id: 32,
    group: 'Group E',
    date: 'Jun 20, 2026',
    dateValue: '2026-06-20',
    time: '03:00',
    venue: 'NRG Stadium',
    city: 'Houston',
    home: 'Curacao',
    away: 'Ivory Coast',
    prediction: { homeScore: 0, awayScore: 2 }
  }),
  createMatch({
    id: 33,
    group: 'Group F',
    date: 'Jun 20, 2026',
    dateValue: '2026-06-20',
    time: '20:00',
    venue: 'AT&T Stadium',
    city: 'Dallas',
    home: 'Netherlands',
    away: 'Sweden',
    prediction: { homeScore: 2, awayScore: 1 }
  }),
  createMatch({
    id: 34,
    group: 'Group D',
    date: 'Jun 20, 2026',
    dateValue: '2026-06-20',
    time: '06:00',
    venue: 'Arrowhead Stadium',
    city: 'Kansas City',
    home: 'Turkey',
    away: 'Paraguay',
    prediction: { homeScore: 1, awayScore: 1 }
  }),
  createMatch({
    id: 35,
    group: 'Group E',
    date: 'Jun 20, 2026',
    dateValue: '2026-06-20',
    time: '23:00',
    venue: 'Lumen Field',
    city: 'Seattle',
    home: 'Ecuador',
    away: 'Germany',
    prediction: { homeScore: 1, awayScore: 2 }
  }),

  createMatch({
    id: 36,
    group: 'Group F',
    date: 'Jun 21, 2026',
    dateValue: '2026-06-21',
    time: '07:00',
    venue: 'BC Place',
    city: 'Vancouver',
    home: 'Tunisia',
    away: 'Japan',
    prediction: { homeScore: 0, awayScore: 1 }
  }),
  createMatch({
    id: 37,
    group: 'Group G',
    date: 'Jun 21, 2026',
    dateValue: '2026-06-21',
    time: '22:00',
    venue: 'Lincoln Financial Field',
    city: 'Philadelphia',
    home: 'Belgium',
    away: 'Iran',
    prediction: { homeScore: 2, awayScore: 0 }
  }),
  createMatch({
    id: 38,
    group: 'Group H',
    date: 'Jun 21, 2026',
    dateValue: '2026-06-21',
    time: '19:00',
    venue: 'Hard Rock Stadium',
    city: 'Miami',
    home: 'Spain',
    away: 'Saudi Arabia',
    prediction: { homeScore: 3, awayScore: 1 }
  }),

  createMatch({
    id: 39,
    group: 'Group G',
    date: 'Jun 22, 2026',
    dateValue: '2026-06-22',
    time: '04:00',
    venue: 'MetLife Stadium',
    city: 'New York/New Jersey',
    home: 'New Zealand',
    away: 'Egypt',
    prediction: { homeScore: 1, awayScore: 1 }
  }),
  createMatch({
    id: 40,
    group: 'Group H',
    date: 'Jun 22, 2026',
    dateValue: '2026-06-22',
    time: '01:00',
    venue: 'Mercedes-Benz Stadium',
    city: 'Atlanta',
    home: 'Uruguay',
    away: 'Cabo Verde',
    prediction: { homeScore: 2, awayScore: 0 }
  }),

  createMatch({
    id: 41,
    group: 'Group I',
    date: 'Jun 23, 2026',
    dateValue: '2026-06-23',
    time: '00:00',
    venue: 'Gillette Stadium',
    city: 'Boston',
    home: 'France',
    away: 'Iraq',
    prediction: { homeScore: 3, awayScore: 0 }
  }),
  createMatch({
    id: 42,
    group: 'Group J',
    date: 'Jun 23, 2026',
    dateValue: '2026-06-23',
    time: '20:00',
    venue: 'Arrowhead Stadium',
    city: 'Kansas City',
    home: 'Argentina',
    away: 'Austria',
    prediction: { homeScore: 2, awayScore: 1 }
  }),
  createMatch({
    id: 43,
    group: 'Group I',
    date: 'Jun 23, 2026',
    dateValue: '2026-06-23',
    time: '03:00',
    venue: 'AT&T Stadium',
    city: 'Dallas',
    home: 'Norway',
    away: 'Senegal',
    prediction: { homeScore: 1, awayScore: 1 }
  }),
  createMatch({
    id: 44,
    group: 'Group J',
    date: 'Jun 23, 2026',
    dateValue: '2026-06-23',
    time: '06:00',
    venue: 'Lumen Field',
    city: 'Seattle',
    home: 'Jordan',
    away: 'Algeria',
    prediction: { homeScore: 0, awayScore: 1 }
  }),
  createMatch({
    id: 45,
    group: 'Group K',
    date: 'Jun 23, 2026',
    dateValue: '2026-06-23',
    time: '20:00',
    venue: 'Mercedes-Benz Stadium',
    city: 'Atlanta',
    home: 'Portugal',
    away: 'Uzbekistan',
    prediction: { homeScore: 2, awayScore: 0 }
  }),
  createMatch({
    id: 46,
    group: 'Group L',
    date: 'Jun 23, 2026',
    dateValue: '2026-06-23',
    time: '23:00',
    venue: 'Gillette Stadium',
    city: 'Boston',
    home: 'England',
    away: 'Ghana',
    prediction: { homeScore: 2, awayScore: 0 }
  }),

  createMatch({
    id: 47,
    group: 'Group K',
    date: 'Jun 24, 2026',
    dateValue: '2026-06-24',
    time: '02:30',
    venue: 'Levi’s Stadium',
    city: 'San Francisco Bay Area',
    home: 'DR Congo',
    away: 'Colombia',
    prediction: { homeScore: 1, awayScore: 2 }
  }),
  createMatch({
    id: 48,
    group: 'Group L',
    date: 'Jun 24, 2026',
    dateValue: '2026-06-24',
    time: '02:00',
    venue: 'BMO Field',
    city: 'Toronto',
    home: 'Panama',
    away: 'Croatia',
    prediction: { homeScore: 0, awayScore: 2 }
  }),
  createMatch({
    id: 51,
    group: 'Group B',
    date: 'Jun 24, 2026',
    dateValue: '2026-06-24',
    time: '22:00',
    venue: 'BMO Field',
    city: 'Toronto',
    home: 'Bosnia and Herzegovina',
    away: 'Qatar',
    prediction: { homeScore: 2, awayScore: 1 }
  }),
  createMatch({
    id: 52,
    group: 'Group B',
    date: 'Jun 24, 2026',
    dateValue: '2026-06-24',
    time: '22:00',
    venue: 'BC Place',
    city: 'Vancouver',
    home: 'Switzerland',
    away: 'Canada',
    prediction: { homeScore: 1, awayScore: 1 }
  }),

  createMatch({
    id: 49,
    group: 'Group A',
    date: 'Jun 25, 2026',
    dateValue: '2026-06-25',
    time: '04:00',
    venue: 'Estadio Azteca',
    city: 'Mexico City',
    home: 'Mexico',
    away: 'South Korea',
    prediction: { homeScore: 2, awayScore: 1 }
  }),
  createMatch({
    id: 50,
    group: 'Group A',
    date: 'Jun 25, 2026',
    dateValue: '2026-06-25',
    time: '04:00',
    venue: 'Estadio Akron',
    city: 'Guadalajara',
    home: 'South Africa',
    away: 'Czech Republic',
    prediction: { homeScore: 1, awayScore: 2 }
  }),
  createMatch({
    id: 53,
    group: 'Group C',
    date: 'Jun 25, 2026',
    dateValue: '2026-06-25',
    time: '01:00',
    venue: 'Hard Rock Stadium',
    city: 'Miami',
    home: 'Morocco',
    away: 'Haiti',
    prediction: { homeScore: 2, awayScore: 0 }
  }),
  createMatch({
    id: 54,
    group: 'Group C',
    date: 'Jun 25, 2026',
    dateValue: '2026-06-25',
    time: '01:00',
    venue: 'Lincoln Financial Field',
    city: 'Philadelphia',
    home: 'Scotland',
    away: 'Brazil',
    prediction: { homeScore: 0, awayScore: 2 }
  }),

  createMatch({
    id: 55,
    group: 'Group D',
    date: 'Jun 26, 2026',
    dateValue: '2026-06-26',
    time: '05:00',
    venue: 'SoFi Stadium',
    city: 'Los Angeles',
    home: 'Paraguay',
    away: 'Australia',
    prediction: { homeScore: 1, awayScore: 1 }
  }),
  createMatch({
    id: 56,
    group: 'Group D',
    date: 'Jun 26, 2026',
    dateValue: '2026-06-26',
    time: '05:00',
    venue: 'Arrowhead Stadium',
    city: 'Kansas City',
    home: 'Turkey',
    away: 'United States',
    prediction: { homeScore: 1, awayScore: 2 }
  }),
  createMatch({
    id: 57,
    group: 'Group E',
    date: 'Jun 26, 2026',
    dateValue: '2026-06-26',
    time: '23:00',
    venue: 'NRG Stadium',
    city: 'Houston',
    home: 'Ivory Coast',
    away: 'Germany',
    prediction: { homeScore: 0, awayScore: 2 }
  }),
  createMatch({
    id: 58,
    group: 'Group E',
    date: 'Jun 26, 2026',
    dateValue: '2026-06-26',
    time: '23:00',
    venue: 'Lumen Field',
    city: 'Seattle',
    home: 'Ecuador',
    away: 'Curacao',
    prediction: { homeScore: 2, awayScore: 0 }
  }),
  createMatch({
    id: 59,
    group: 'Group F',
    date: 'Jun 26, 2026',
    dateValue: '2026-06-26',
    time: '02:00',
    venue: 'AT&T Stadium',
    city: 'Dallas',
    home: 'Japan',
    away: 'Sweden',
    prediction: { homeScore: 1, awayScore: 1 }
  }),
  createMatch({
    id: 60,
    group: 'Group F',
    date: 'Jun 26, 2026',
    dateValue: '2026-06-26',
    time: '02:00',
    venue: 'BC Place',
    city: 'Vancouver',
    home: 'Tunisia',
    away: 'Netherlands',
    prediction: { homeScore: 0, awayScore: 2 }
  }),

  createMatch({
    id: 61,
    group: 'Group G',
    date: 'Jun 27, 2026',
    dateValue: '2026-06-27',
    time: '06:00',
    venue: 'Lincoln Financial Field',
    city: 'Philadelphia',
    home: 'New Zealand',
    away: 'Belgium',
    prediction: { homeScore: 0, awayScore: 2 }
  }),
  createMatch({
    id: 62,
    group: 'Group G',
    date: 'Jun 27, 2026',
    dateValue: '2026-06-27',
    time: '06:00',
    venue: 'MetLife Stadium',
    city: 'New York/New Jersey',
    home: 'Egypt',
    away: 'Iran',
    prediction: { homeScore: 1, awayScore: 1 }
  }),
  createMatch({
    id: 63,
    group: 'Group H',
    date: 'Jun 27, 2026',
    dateValue: '2026-06-27',
    time: '01:00',
    venue: 'Hard Rock Stadium',
    city: 'Miami',
    home: 'Cabo Verde',
    away: 'Saudi Arabia',
    prediction: { homeScore: 0, awayScore: 1 }
  }),
  createMatch({
    id: 64,
    group: 'Group H',
    date: 'Jun 27, 2026',
    dateValue: '2026-06-27',
    time: '03:00',
    venue: 'Mercedes-Benz Stadium',
    city: 'Atlanta',
    home: 'Uruguay',
    away: 'Spain',
    prediction: { homeScore: 1, awayScore: 2 }
  }),

  createMatch({
    id: 65,
    group: 'Group I',
    date: 'Jun 28, 2026',
    dateValue: '2026-06-28',
    time: '22:00',
    venue: 'Gillette Stadium',
    city: 'Boston',
    home: 'Senegal',
    away: 'Iraq',
    prediction: { homeScore: 2, awayScore: 0 }
  }),
  createMatch({
    id: 66,
    group: 'Group I',
    date: 'Jun 28, 2026',
    dateValue: '2026-06-28',
    time: '22:00',
    venue: 'AT&T Stadium',
    city: 'Dallas',
    home: 'Norway',
    away: 'France',
    prediction: { homeScore: 1, awayScore: 2 }
  }),
  createMatch({
    id: 67,
    group: 'Group J',
    date: 'Jun 28, 2026',
    dateValue: '2026-06-28',
    time: '05:00',
    venue: 'Arrowhead Stadium',
    city: 'Kansas City',
    home: 'Algeria',
    away: 'Austria',
    prediction: { homeScore: 1, awayScore: 1 }
  }),
  createMatch({
    id: 68,
    group: 'Group J',
    date: 'Jun 28, 2026',
    dateValue: '2026-06-28',
    time: '05:00',
    venue: 'Lumen Field',
    city: 'Seattle',
    home: 'Jordan',
    away: 'Argentina',
    prediction: { homeScore: 0, awayScore: 3 }
  }),
  createMatch({
    id: 69,
    group: 'Group K',
    date: 'Jun 28, 2026',
    dateValue: '2026-06-28',
    time: '02:30',
    venue: 'Levi’s Stadium',
    city: 'San Francisco Bay Area',
    home: 'DR Congo',
    away: 'Uzbekistan',
    prediction: { homeScore: 1, awayScore: 1 }
  }),
  createMatch({
    id: 70,
    group: 'Group K',
    date: 'Jun 28, 2026',
    dateValue: '2026-06-28',
    time: '02:30',
    venue: 'Mercedes-Benz Stadium',
    city: 'Atlanta',
    home: 'Colombia',
    away: 'Portugal',
    prediction: { homeScore: 1, awayScore: 2 }
  }),
  createMatch({
    id: 71,
    group: 'Group L',
    date: 'Jun 28, 2026',
    dateValue: '2026-06-28',
    time: '00:00',
    venue: 'BMO Field',
    city: 'Toronto',
    home: 'Croatia',
    away: 'Ghana',
    prediction: { homeScore: 2, awayScore: 1 }
  }),
  createMatch({
    id: 72,
    group: 'Group L',
    date: 'Jun 28, 2026',
    dateValue: '2026-06-28',
    time: '00:00',
    venue: 'Gillette Stadium',
    city: 'Boston',
    home: 'Panama',
    away: 'England',
    prediction: { homeScore: 0, awayScore: 3 }
  })
];

export const predictionRules = [
  {
    title: 'Exact score',
    description: 'Predict both teams’ score correctly.',
    points: 3
  },
  {
    title: 'Correct outcome',
    description: 'Predict the correct win, draw or loss.',
    points: 1
  },
  {
    title: 'Wrong prediction',
    description: 'All other predictions.',
    points: 0
  }
];
