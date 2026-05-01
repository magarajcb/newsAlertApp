import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import toast, { Toaster } from "react-hot-toast";

const CATEGORIES = [
  "technology",
  "sports",
  "politics",
  "business",
  "health",
  "entertainment",
  "science",
];

const Dashboard = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("technology");

  const fetchNews = async (category) => {
    setLoading(true);

    try {
      const res = await API.get(`/api/news?category=${category}`);
      setNews(res.data.articles || []);
    } catch (error) {
      toast.error("Failed to fetch news");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <Sidebar />

      <div className="ml-64 flex-1 p-8">

        {/* 🔥 Trending Section */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          🔥 Trending News
        </h2>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {news.slice(0, 3).map((article, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
            >
              <img
                src={
                  article.urlToImage ||
                  article.image ||
                  "https://via.placeholder.com/300"
                }
                alt={article.title}
                className="w-full h-40 object-cover"
              />

              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                  {article.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* 🎯 Categories */}
        <div className="flex gap-2 flex-wrap mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition ${
                selectedCategory === cat
                  ? "bg-purple-600 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-purple-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 📰 Headlines */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Today's Headlines
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {news.map((article, i) => (
              <a
                key={i}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition group"
              >
                <img
                  src={
                    article.urlToImage ||
                    article.image ||
                    "https://via.placeholder.com/300"
                  }
                  alt={article.title}
                  className="w-full h-40 object-cover"
                />

                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-purple-600 transition">
                    {article.title}
                  </h3>

                  {/* ✅ Description added */}
                  <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                    {article.description || "No description available"}
                  </p>

                  <p className="text-xs text-gray-400 mt-2">
                    Updated •{" "}
                    {new Date(article.publishedAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && news.length === 0 && (
          <p className="text-gray-500 mt-6 text-center">
            No news available.
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;