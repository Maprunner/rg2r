export default class {
  static processEvents(originalEvents) {
    let events = originalEvents;
    for (let i = 0; i < events.length; i += 1) {
      switch (events[i].type) {
        case "I":
          events[i].type = "International event";
          break;
        case "N":
          events[i].type = "National event";
          break;
        case "R":
          events[i].type = "Regional event";
          break;
        case "L":
          events[i].type = "Local event";
          break;
        case "T":
          events[i].type = "Training event";
          break;
        default:
          events[i].type = "Unknown";
          break;
      }
      if (events[i].suffix === undefined) {
        events[i].mapfilename = events[i].mapid + '.jpg';
      } else {
        events[i].mapfilename = events[i].mapid + '.' + events[i].suffix;
        delete events[i].suffix;
      }
      //events[i].worldfile = new rg2.Worldfile(data);
    }
    events.sort(function (a, b) {
      return b.id - a.id;
    });

    return events;
  }
}