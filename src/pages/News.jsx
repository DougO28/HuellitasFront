import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import NewsCard from "../components/NewsCard";
import Pagination from "../components/Pagination";
import { fetchNews } from "../services/newsApi";

const PAGE_SIZE = 6;

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetchNews();
      setNews(res.data);
      setLoading(false);
      setPage(1);
    })();
  }, []);

  const totalPages = Math.max(1, Math.ceil(news.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const paginatedNews = news.slice(start, start + PAGE_SIZE);

  return (
    <>
      <Hero message="¡Infórmate de nuestras actividades!" />

      <section className="mx-auto max-w-6xl px-6 py-12">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-neutral-900">Noticias</h1>
        </header>

        {loading ? (
          <div className="mt-10 text-center">Cargando…</div>
        ) : (
          <>
            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
              {paginatedNews.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>

            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
          </>
        )}
      </section>
    </>
  );
}
