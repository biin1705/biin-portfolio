import { profileInfo } from "./portfolio-data";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="bg-zinc-950 px-5 py-16 text-white sm:px-8 lg:px-10"
    >
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold uppercase text-amber-300">
            Available for selective work
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold sm:text-5xl">
            Need a front-end partner for your next launch?
          </h2>
        </div>
        <a
          className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-zinc-950 transition hover:bg-amber-200"
          href={`mailto:${profileInfo.email}`}
        >
          {profileInfo.email}
        </a>
      </div>
    </section>
  );
}
