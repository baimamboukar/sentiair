import { sub } from "date-fns";

const mails = [
  {
    id: 5,
    from: {
      name: "Kigali",
      email: "",
    },
    subject: "Air Quality",
    body: "Air Quality Forecast...",
    date: sub(new Date(), { days: 1 }).toISOString(),
  },
  {
    id: 4,
    from: {
      name: "Gisenyi",
      email: "",
    },
    subject: "Air Quality",
    body: "Air Quality Forecast...",
    date: sub(new Date(), { days: 4 }).toISOString(),
  },
  {
    id: 5,
    from: {
      name: "Bugesera",
      email: "",
    },
    subject: "Air Quality",
    body: "Air Quality Forecast...",
    date: sub(new Date(), { days: 4 }).toISOString(),
  },
  {
    id: 1,
    from: {
      name: "Musanze",
      email: "",
    },
    subject: "Air Quality",
    body: "Air Quality Forecast...",
    date: sub(new Date(), { days: 3 }).toISOString(),
  },
];

export default eventHandler(async () => {
  return mails;
});
