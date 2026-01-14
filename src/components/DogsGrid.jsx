import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchDogs } from "../services/dogsApi";
import DogCard from "./DogCard";
import Pagination from "./Pagination";

const PAGE_SIZE = 9;

export default function DogsGrid({ size }) {
  const [params, setParams] = useSearchParams();

  const pageFromURL = useMemo(() => {
    const p = parseInt(params.get("page") || "1", 10);
    return Number.isNaN(p) || p < 1 ? 1 : p;
  }, [params]);

  const [page, setPage] = useState(pageFromURL);
  const [dogs, setDogs] = useState([]);
  const [meta, setMeta] = useState({ totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPage(1);
    const next = new URLSearchParams(params);
    next.delete("page");
    setParams(next, { replace: true });
  }, [size]);

  useEffect(() => {
    if (page !== pageFromURL) {
      const next = new URLSearchParams(params);
      next.set("page", String(page));
      setParams(next, { replace: true });
    }
  }, [page, pageFromURL, params, setParams]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetchDogs({
        disponible: true,
        tamanio: size || undefined,
        page,
        pageSize: PAGE_SIZE,
      });
      setDogs(res.data);
      setMeta({ total: res.total, totalPages: res.totalPages });
      setLoading(false);
    })();
  }, [size, page]);

  return (
    <div className="mt-10">
      <p aria-live="polite" className="sr-only">
        {loading ? "Cargando resultados" : `${dogs.length} resultados de ${meta.total}`}
      </p>

      {loading ? (
        <div className="text-center py-10">Cargando…</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dogs.map((d) => (
              <DogCard key={d.id} d={d} />
            ))}
          </div>

          <Pagination
            page={page}
            totalPages={meta.totalPages}
            onChange={(p) => setPage(p)}
          />
        </>
      )}
    </div>
  );
}