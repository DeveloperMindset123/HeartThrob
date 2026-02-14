import { verifyToken } from "@/lib/token";
import { notFound } from "next/navigation";
import ResponseFlow from "@/components/ResponseFlow";
import HeartParticles from "@/components/HeartParticles";

interface PageProps {
  params: { token: string };
}

export default async function ValentinePage({ params }: PageProps) {
  const payload = await verifyToken(params.token);

  if (!payload) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-4 text-center">
        <span className="text-7xl">😿</span>
        <h1 className="text-3xl font-bold text-valentine-800">
          This valentine has expired or is invalid
        </h1>
        <p className="text-lg text-valentine-600">
          The link may have expired after 7 days, or might be incorrect.
        </p>
        <a
          href="/"
          className="mt-4 rounded-full bg-valentine-500 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-valentine-600"
        >
          Send a new Valentine 💌
        </a>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <HeartParticles count={15} />
      <ResponseFlow
        senderName={payload.senderName}
        message={payload.message}
        token={params.token}
      />
    </main>
  );
}
