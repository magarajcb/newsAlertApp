import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import toast, { Toaster } from "react-hot-toast";

const CHANNELS = [
  "FOX NEWS",
  "BBC NEWS",
  "CNN NEWS",
  "NDTV",
  "AL JZEERA",
  "ABC NEWS",
];

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
  const navigate = useNavigate();

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

  const handleChannelClick = (channel) => {
    const routes = {
      "BBC NEWS": "/channel/bbc",
      "CNN NEWS": "/channel/cnn",
      "FOX NEWS": "/channel/fox",
      "NDTV": "/channel/ndtv",
      "AL JZEERA": "/channel/aljazeera",
      "ABC NEWS": "/channel/abc",
    };

    navigate(routes[channel]);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <Sidebar />

      <div className="ml-64 flex-1 p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Explore Channels
        </h2>

        <div className="grid grid-cols-3 gap-3 mb-8">
          {CHANNELS.map((channel) => (
            <button
              key={channel}
              onClick={() => handleChannelClick(channel)}
              className="border border-gray-200 rounded-xl py-4 text-sm font-semibold text-gray-700 hover:border-purple-400 hover:text-purple-600 hover:bg-purple-50 transition bg-white cursor-pointer"
            >
              {channel}
            </button>
          ))}
        </div>

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
                {article.image ? (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-40 object-cover"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-100"></div>
                )}

                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-purple-600 transition">
                    {article.title}
                  </h3>

                  <p className="text-xs text-gray-400 mt-2">
                    Updated • {new Date(article.publishedAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
