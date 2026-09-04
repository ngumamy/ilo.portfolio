import Pagination from "@/components/pagination";
import { SectionViewport } from "@/components/section-pager";

export default function Home() {
  return (
    <main className="relative flex min-h-0 flex-1 flex-col">
      <SectionViewport />
      <Pagination />
    </main>
  );
}
