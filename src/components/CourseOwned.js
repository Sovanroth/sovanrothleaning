import { Progress } from "@material-tailwind/react";

const posts = [
  {
    id: 1,
    title: "Node JS",
    href: "#",
    status: "30%",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Web Developement", href: "#" },
  },
  {
    id: 1,
    title: "Node JS",
    href: "#",
    status: "3%",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Web Developement", href: "#" },
  },
  {
    id: 1,
    title: "Node JS",
    href: "#",
    // description:
    //   "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    status: "30%",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Web Developement", href: "#" },
  },
  {
    id: 1,
    title: "Node JS",
    href: "#",
    status: "90%",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Web Developement", href: "#" },
  },
];

export default function CourseOwned() {
  return (
    <div className="bg-white ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-4 md:grid-cols-2">
          {posts.map((post, index) => (
            <article
              key={post.id + index}
              className="flex flex-col items-start justify-between"
            >
              <div className="relative w-full">
                <img
                  key={post.imageUrl}
                  src={post.imageUrl}
                  alt=""
                  className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="max-w-xl">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                  <time
                    key={post.date}
                    dateTime={post.datetime}
                    className="text-gray-500"
                  >
                    {post.date}
                  </time>
                  <a
                    href={post.category.href}
                    key={post.category.title}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {post.category.title}
                  </a>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a href={post.href} key={post.title}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  {/* <Progress value={post.status}/> */}
                  {/* {post.status} */}
                  <div className="mt-5" aria-hidden="true">
                    <div className="overflow-hidden rounded-full bg-gray-200">
                      <div
                        key={post.status}
                        className="h-2 rounded-full bg-green-600"
                        style={{ width: post.status }}
                      />
                    </div>
                    <div className="mt-6 hidden text-xs font-medium text-gray-600 sm:grid text-center">
                      <div className="text-green-600">{post.status}</div>
                    </div>
                  </div>
                  {/* <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                    {post.description}
                  </p> */}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
