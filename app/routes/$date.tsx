import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import moment from "moment-timezone";

import { type Timezone, timezones } from "../timezones";

export const loader = async ({ params }: LoaderArgs) => {
  const date = params.date ?? moment.utc().format("YYYY-MM-DD HH:mm");

  return json({ date });
};

export default function CalculateDate() {
  const { date } = useLoaderData<typeof loader>();

  let localDate = moment
    .utc(date)
    .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
    .format("MMMM Do YYYY, HH:mm");

  let localTimezone = timezones.find(
    (t: Timezone) =>
      t.timezone == Intl.DateTimeFormat().resolvedOptions().timeZone
  )?.name;

  return (
    <div className="bg-cyan-900 min-h-screen flex items-center">
      <div className="w-full">
        <h1 className="text-center text-white font-bold text-4xl mb-10"></h1>
        <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
          <div className="mb-5">
            <label
              htmlFor="date"
              className="block mb-2 font-bold text-gray-600"
            >
              Date and Time
            </label>
            <p className="border border-gray-300 shadow p-3 w-full rounded mb-">
              {localDate}
            </p>
          </div>

          <div className="mb-5">
            <label
              htmlFor="timezone"
              className="block mb-2 font-bold text-gray-600"
            >
              Your Timezone
            </label>

            <p className="border border-red-300 shadow p-3 w-full rounded mb-">
              {localTimezone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
