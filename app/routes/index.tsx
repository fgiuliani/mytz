import { Form } from "@remix-run/react";
import { type ActionArgs, redirect } from "@remix-run/node";

import { type Timezone, timezones } from "../timezones";
import moment from "moment-timezone";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const dateString = formData.get("date") as string;
  const timezone = formData.get("timezone") as string;

  let date = moment.tz(dateString, timezone);

  console.log(dateString);
  console.log(date);

  return redirect(`/${date.utc().format("YYYY-MM-DDTHH:mm")}`);
}

export default function Index() {
  return (
    <div className="bg-cyan-900 min-h-screen flex items-center">
      <div className="w-full">
        <h1 className="text-center text-white font-bold text-4xl mb-10">
          Convert to other timezones
        </h1>
        <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
          <Form method="post">
            <div className="mb-5">
              <label
                htmlFor="date"
                className="block mb-2 font-bold text-gray-600"
              >
                Date and Time
              </label>
              <input
                type="datetime-local"
                id="date"
                name="date"
                defaultValue={moment().format("YYYY-MM-DDTHH:mm")}
                className="border border-gray-300 shadow p-3 w-full rounded mb-"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="timezone"
                className="block mb-2 font-bold text-gray-600"
              >
                Timezone
              </label>

              <select
                id="timezone"
                name="timezone"
                defaultValue={moment.tz.guess()}
                className="border border-red-300 shadow p-3 w-full rounded mb-"
              >
                {timezones.map((t: Timezone) => (
                  <option key={t.timezone} value={t.timezone}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            <button className="block w-full bg-teal-500 text-white font-bold p-4 rounded-lg">
              Generate
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
