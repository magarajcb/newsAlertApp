import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const ChannelPage = () => {
  const { name } = useParams();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="ml-64 flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 capitalize">
          {name} News
        </h1>

        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <p className="text-gray-600">
            Visit official website:{" "}
            <a
              href={`https://www.${name}.com`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 font-semibold hover:underline"
            >
              www.{name}.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChannelPage;