import moment from "moment";

export function toDateTime(secs) {
  const t = new Date(1970, 0, 1); // Epoch
  t.setSeconds(secs);
  return moment(t).format("MMM DD, YYYY").toString();
}
