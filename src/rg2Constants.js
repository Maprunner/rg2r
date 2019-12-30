const RG2 = {
  PURPLE: '#b300ff',
  // values of event format
  NORMAL_EVENT: 1,
  EVENT_WITHOUT_RESULTS: 2,
  SCORE_EVENT: 3,
  TAB_EVENTS: "events",
  TAB_COURSES: "courses",
  TAB_RESULTS: "results",
  TAB_DRAW: "draw",
  TAB_LOGIN: "login",
  TAB_CREATE: "create",
  TAB_EDIT: "edit",
  TAB_MAP: "map",
  GPS_RESULT_OFFSET: 50000,
  ALL_COURSES: 99999,
  ALL_ROUTES: 99998,
  TIME_NOT_FOUND: 9999,
  ONE_DAY_IN_SECONDS: 86400,
  COLOURS: ["#ff0000", "#00ff00", "#0000ff", "#800000", "#008000", "#000080", "#ffff00", "#ff00ff", "#00ffff", "#808000", "#800080", "#008080"],
  TOOLBAR_HEIGHT: 34,
  INFO_BAR_WIDTH: 400,
  ROTATION_STEP_IN_DEGREES: 15,
  //number of drawn routes that can be saved for possible later deletion
  MAX_DRAWN_ROUTES: 10,
  FINISHOUTERSCALE: 7 / 6,
  FINISHINNERSCALE: 5 / 6,
  STARTSCALE: 7 / 6,
  LANGUAGES: [
    { language: "Deutsch", code: "de" },
    { language: "English", code: "en" },
    { language: "Suomi", code: "fi" },
    { language: "Français", code: "fr" },
    { language: "Italiano", code: "it" },
    { language: "日本語", code: "ja" },
    { language: "Norsk", code: "no" },
    { language: "Português - Brasil", code: "pt" },
    { language: "Русский", code: "ru" }]

  /*
  INVALID_MAP_ID: 9999,
  // translated when output so leave as English here
  DEFAULT_NEW_COMMENT : "Type your comment",
  DEFAULT_EVENT_COMMENT : "Comments (optional)",
  // added to resultid when saving a GPS track
   MASS_START_REPLAY : 1,
  REAL_TIME_REPLAY : 2,
  // dropdown selection value
  MASS_START_BY_CONTROL : 99999,
  VERY_HIGH_TIME_IN_SECS : 99999,
  // screen sizes for different layouts
  BIG_SCREEN_BREAK_POINT : 800,
  SMALL_SCREEN_BREAK_POINT : 500,
  
  RED : '#ff0000',
  GREEN : '#00ff00',
  GREY : '#e0e0e0',
  RED_30 : 'rgba(255,0,0,0.3)',
  GREEN_30 : 'rgba(0,255,0,0.3)',
  WHITE : '#ffffff',
  BLACK : '#000000',
  RUNNER_DOT_RADIUS : 6,
  HANDLE_DOT_RADIUS : 7,
  HANDLE_COLOUR: '#ff0000',
  // parameters for call to draw courses
  DIM : 0.75,
  FULL_INTENSITY : 1.0,
  // version gets set automatically by grunt file during build process
  RG2VERSION: '1.5.4',
  // values for evt.which
  RIGHT_CLICK : 3,
  DO_NOT_SAVE_COURSE: 9999,

  */
}

export default RG2