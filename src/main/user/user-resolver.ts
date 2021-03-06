import { get } from "config";
import { fetch } from "../util/fetch";

export const getTokenDetails = (jwt) => {
  const BEARER_JWT = jwt.startsWith("Bearer ") ? jwt : "Bearer " + jwt;

  return fetch(`${get("idam.base_url")}/details`, {
    headers: {
      Authorization: BEARER_JWT,
    },
  })
  .then((res) => res.json());
};
