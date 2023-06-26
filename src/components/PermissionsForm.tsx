"use client";

import { requestPermissions } from "@/actions/requestPermissions";
import { browserSupportsNotifications } from "@/lib/browserSupportsNotifications";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const PermissionsForm = () => {
  const [browserCapable, setBrowserCapable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const capable = browserSupportsNotifications();
    if (capable) {
      navigator.serviceWorker.register("/service-worker.js");
    }
    setBrowserCapable(capable);
    setLoading(false);
  }, []);
  if (loading) <div>Loading...</div>;
  if (!browserCapable && !loading)
    return <span>Push notifications are not supported on this browser</span>;
  return (
    <>
      <h2 className="underline"> Sign up for push notifications </h2>
      <form
        action={async (formData) => {
          await requestPermissions(formData);
        }}
      >
        <div className="py-2">
          <label htmlFor="userName">User identifier: </label>
          <input
            type="text"
            id="userName"
            name="userName"
            className="border shadow-inner "
          ></input>
        </div>
        <div className="py-2">
          <label htmlFor="pushDescription">
            Description for this pushSubscription:
          </label>
          <input
            type="text"
            id="pushDescription"
            name="pushDescription"
            className="border shadow-inner"
          ></input>
        </div>
        <div className="py-2">
          <label htmlFor="permissionsCheck">Opt in to notifications? : </label>
          <input
            id="permissionsCheck"
            type="checkbox"
            name="permissionsCheckbox"
            className="border p-4 rounded "
            onChange={() => setChecked(true)}
            disabled={checked}
          />
        </div>
        <button
          type="submit"
          className="border px-2 rounded-lg shadow-lg ml-2 w-48"
          disabled={!checked}
        >
          Submit
        </button>
      </form>
    </>
  );
};
