import { useRouteError, useNavigate } from "react-router";
import { Button } from "./ui/button";
import { AlertCircle } from "lucide-react";

export function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600/20 rounded-full mb-4">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">出错了</h1>
        <p className="text-gray-400 mb-8">
          抱歉，安装过程中遇到了问题
        </p>
        <div className="bg-[#252525] rounded-xl p-6 border border-gray-800 mb-8">
          <p className="text-sm text-gray-400">
            {error instanceof Error ? error.message : "未知错误"}
          </p>
        </div>
        <Button
          onClick={() => navigate("/")}
          className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white px-8 py-6"
        >
          返回首页
        </Button>
      </div>
    </div>
  );
}
