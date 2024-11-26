import type { User, UserStatus } from "~/types";

const users: User[] = [
  {
    id: 1,
    name: "Alpha Mohamed",
    email: "alpha.m@sentiair.io",
    avatar: {
      src: "https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/delta",
    },
    status: "authorized",
    location: "Kigali, Rwanda",
  },
  {
    id: 2,
    name: "Amanya Brian",
    email: "amanya.b@sentiair.io",
    avatar: {
      src: "https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/delta",
    },
    status: "unsubscribed",
    location: "Kigali, Rwanda",
  },
  {
    id: 3,
    name: "Mukama Francois",
    email: "francois.m@sentiair.io",
    avatar: {
      src: "https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/delta",
    },
    status: "bounced",
    location: "Kigali, Rwanda",
  },
  {
    id: 4,
    name: "Baimam Boukar",
    email: "baimam.b@sentiair.io",
    avatar: {
      src: "https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/delta",
    },
    status: "subscribed",
    location: "Kigali, Rwanda",
  },
  {
    id: 5,
    name: "Marie Michealla",
    email: "marie.m@sentiair.io",
    avatar: {
      src: "https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/delta",
    },
    status: "subscribed",
    location: "Kigali, Rwanda",
  },
];

export default eventHandler(async (event) => {
  const { q, statuses, locations, sort, order } = getQuery(event) as {
    q?: string;
    statuses?: UserStatus[];
    locations?: string[];
    sort?: "name" | "email";
    order?: "asc" | "desc";
  };

  return users
    .filter((user) => {
      if (!q) return true;

      return (
        user.name.search(new RegExp(q, "i")) !== -1 ||
        user.email.search(new RegExp(q, "i")) !== -1
      );
    })
    .filter((user) => {
      if (!statuses?.length) return true;

      return statuses.includes(user.status);
    })
    .filter((user) => {
      if (!locations?.length) return true;

      return locations.includes(user.location);
    })
    .sort((a, b) => {
      if (!sort) return 0;

      const aValue = a[sort];
      const bValue = b[sort];

      if (aValue < bValue) return order === "asc" ? -1 : 1;
      if (aValue > bValue) return order === "asc" ? 1 : -1;
      return 0;
    });
});
