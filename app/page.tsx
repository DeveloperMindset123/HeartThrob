import CatKissAnimation from "@/components/CatKissAnimation";
import ValentineForm from "@/components/ValentineForm";
import HeartParticles from "@/components/HeartParticles";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <HeartParticles count={18} />

      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-rose-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-1/3 h-80 w-80 rounded-full bg-rose-100/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-1/4 h-72 w-72 rounded-full bg-gold-light/30 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-lg px-5 py-10 sm:py-16">
        {/* Header */}
        <header className="mb-4 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-gold-dark">
            A Valentine&apos;s Day Experience
          </p>
          <h1 className="font-display text-5xl font-bold tracking-tight text-rose-900 sm:text-6xl">
            Heart<span className="text-gradient italic">Throb</span>
          </h1>
          <p className="mt-3 font-body text-lg text-rose-700/70">
            Send a purr-fect message to someone special
          </p>
          {/* Decorative line */}
          <div className="mx-auto mt-5 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-light" />
            <svg width="12" height="11" viewBox="0 0 40 36" fill="none" className="text-gold">
              <path
                d="M20 36 C20 36 0 22 0 10 C0 4 4 0 10 0 C14 0 18 3 20 6 C22 3 26 0 30 0 C36 0 40 4 40 10 C40 22 20 36 20 36Z"
                fill="currentColor"
              />
            </svg>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-light" />
          </div>
        </header>

        {/* Cat Kiss Animation */}
        <CatKissAnimation />

        {/* Form */}
        <ValentineForm />

        {/* Footer */}
        <footer className="mt-10 text-center">
          <p className="font-body text-xs tracking-wide text-rose-300">
            Crafted with care &amp; whiskers
          </p>
        </footer>
      </div>
    </main>
  );
}
