import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import API from '../services/api';
import toast, { Toaster } from 'react-hot-toast';

const CATEGORIES = ['technology', 'sports', 'politics', 'business', 'health', 'entertainment', 'science'];

const Explore = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState('');
    const [searched, setSearched] = useState(false);

    const fetchNews = async (category) => {
        setLoading(true);
        setSelected(category);
        setSearched(true);
        try {
            const res = await API.get(`/api/news?category=${category}`);
                     setNews(res.data.articles || []);
        } catch (error) {
            toast.error('Failed to fetch news');
            console.error("Fetch Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Toaster position="top-right" />
            <Sidebar />
                                   <div className="ml-64 flex-1 p-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Explore</h1>
                <p className="text-gray-400 mb-6">Browse news by category</p>

                              <div className="flex gap-3 flex-wrap mb-8">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => fetchNews(cat)}
                            className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                                selected === cat
                                    ? 'bg-purple-600 text-white shadow-md'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:border-purple-400'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
              
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : searched && news.length === 0 ? (
                    <div className="text-center text-gray-400 py-20 bg-white rounded-xl border border-dashed border-gray-200">
                        No news found for this category.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {news.map((article, i) => (
                            <a
                                key={article.url || i}
                                href={article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 group block"
                            >
                                <div className="relative h-44 w-full overflow-hidden">
                                    {article.image || article.urlToImage ? (
                                        <img 
                                            src={article.image || article.urlToImage} 
                                            alt={article.title} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300 text-xs">
                                            No Image Available
                                        </div>
                                    )}
                                </div>
                                
                                <div className="p-4">
                                    <span className="text-[10px] uppercase tracking-wider text-purple-600 font-bold">
                                        {selected}
                                    </span>
                                    <h3 className="text-sm font-semibold text-gray-800 mt-1 line-clamp-2 group-hover:text-purple-600 transition">
                                        {article.title}
                                    </h3>
                                    <div className="flex justify-between items-center mt-4">
                                        <p className="text-[11px] text-gray-400">
                                            {article.publishedAt 
                                                ? new Date(article.publishedAt).toLocaleDateString(undefined, { dateStyle: 'medium' }) 
                                                : 'Recently'}
                                        </p>
                                        <span className="text-purple-500 text-xs font-semibold opacity-0 group-hover:opacity-100 transition">
                                            Read More →
                                        </span>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Explore;