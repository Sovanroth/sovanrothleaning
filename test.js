/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function Example() {
    return (
      <fieldset>
        <legend className="sr-only">Notifications</legend>
        <div className="space-y-5">
          <div className="relative flex items-start">
            <div className="flex h-6 items-center">
              <input
                id="comments"
                aria-describedby="comments-description"
                name="comments"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
            </div>
            <div className="ml-3 text-sm leading-6">
              <label htmlFor="comments" className="font-medium text-gray-900">
                New comments
              </label>{' '}
              <span id="comments-description" className="text-gray-500">
                <span className="sr-only">New comments </span>so you always know what's happening.
              </span>
            </div>
          </div>
          <div className="relative flex items-start">
            <div className="flex h-6 items-center">
              <input
                id="candidates"
                aria-describedby="candidates-description"
                name="candidates"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
            </div>
            <div className="ml-3 text-sm leading-6">
              <label htmlFor="candidates" className="font-medium text-gray-900">
                New candidates
              </label>{' '}
              <span id="candidates-description" className="text-gray-500">
                <span className="sr-only">New candidates </span>who apply for any open postings.
              </span>
            </div>
          </div>
          <div className="relative flex items-start">
            <div className="flex h-6 items-center">
              <input
                id="offers"
                aria-describedby="offers-description"
                name="offers"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
            </div>
            <div className="ml-3 text-sm leading-6">
              <label htmlFor="offers" className="font-medium text-gray-900">
                Offers
              </label>{' '}
              <span id="offers-description" className="text-gray-500">
                <span className="sr-only">Offers </span>when they are accepted or rejected by candidates.
              </span>
            </div>
          </div>
        </div>
      </fieldset>
    )
  }
  


///recourse

  <div class="mt-6 border bg-slate-100 rounded-md p-4">
  <div class="font-medium text-sm flex items-center justify-between">
    Resource and Attatchments
  </div>
  {/* <p className=" text-sm pt-5 italic">No Attatchments</p> */}
  <a
    className=" text-sm pt-10 italic text-blue-400 underline"
    href={`resource/{oneData?.course?.courseResource}`}
    target="_blank"
  >
    {oneData?.data?.courseResource}
  </a>
</div>