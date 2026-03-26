import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function Welcome() {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    // Welcome 是首页，清除所有导航标记
    sessionStorage.removeItem("pageAccessAllowed");
  }, []);

  const handleCustomInstall = () => {
    if (!agreed) return;
    // 直接进入自定义安装页面
    sessionStorage.setItem("pageAccessAllowed", "true");
    navigate("/install-path");
  };

  const handleQuickInstall = () => {
    if (!agreed) return;
    sessionStorage.setItem("pageAccessAllowed", "true");
    navigate("/installing");
  };

  const handleViewAgreement = (e: React.MouseEvent) => {
    e.preventDefault();
    const html = buildAgreementHTML();
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className="h-screen w-screen bg-white flex items-center justify-center overflow-hidden">
      <div className="w-[920px] h-[580px] bg-gradient-to-b from-gray-900 to-black relative shadow-2xl border border-purple-500/30 overflow-hidden">
        {/* 窗口控制按钮 */}
        <div className="absolute top-4 right-4 flex items-center gap-3 z-10">
          <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-purple-500/20 transition-colors group">
            <div className="w-4 h-0.5 bg-purple-400/60 group-hover:bg-purple-300 transition-colors"></div>
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-red-500/20 transition-colors group">
            <div className="text-purple-400/60 group-hover:text-red-400 text-2xl leading-none transition-colors">
              ×
            </div>
          </button>
        </div>

        <div className="h-full flex flex-col">
          {/* 上半部分 - 铺满图片 */}
          <div className="relative flex-1 overflow-hidden">
            <motion.div
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="w-full h-full"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1753998943413-8cba1b923c0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Welcome"
                className="w-full h-full object-cover"
              />
              {/* 渐变覆盖层 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              {/* 紫色光晕效果 */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-pink-600/20"></div>
            </motion.div>
          </div>

          {/* 下半部分 - 操作区域 */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-sm py-6 px-8 border-t border-purple-500/30"
          >
            {/* 顶部装饰线 */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
            
            <div className="flex items-center justify-between">
              {/* 协议勾选 */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setAgreed(!agreed)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                    agreed
                      ? "bg-gradient-to-br from-purple-600 to-pink-600 border-purple-500 shadow-lg shadow-purple-500/50"
                      : "bg-gray-800/50 border-purple-500/50 hover:border-purple-400"
                  }`}
                >
                  {agreed && (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="3"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </motion.svg>
                  )}
                </button>
                <span className="text-gray-300 text-sm">
                  已阅读并同意{" "}
                  <a 
                    href="#" 
                    onClick={handleViewAgreement}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-300 hover:to-pink-300 transition-all"
                  >
                    《用户协议》
                  </a>
                </span>
              </div>

              {/* 按钮组 */}
              <div className="flex items-center gap-3">
                <Button
                  onClick={handleCustomInstall}
                  disabled={!agreed}
                  className={`px-8 py-5 border-2 transition-all duration-300 ${
                    agreed
                      ? "bg-gray-800/50 border-purple-500/70 text-purple-300 hover:bg-purple-900/30 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/30"
                      : "bg-gray-800/60 border-gray-500/50 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  自定义安装
                </Button>
                <Button
                  onClick={handleQuickInstall}
                  disabled={!agreed}
                  className={`px-8 py-5 transition-all duration-300 relative overflow-hidden ${
                    agreed
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 hover:scale-105"
                      : "bg-gray-700/80 border border-gray-500/50 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {agreed && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                  )}
                  <span className="relative">立即安装</span>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function buildAgreementHTML() {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>RX 编辑器 — 用户协议</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #0a0a12; color: #9ca3af; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.7; }
  .top-bar { height: 4px; background: linear-gradient(to right, #9333ea, #ec4899, #9333ea); }
  header { background: #0e0e1a; border-bottom: 1px solid rgba(168,85,247,0.15); padding: 2rem 0; }
  .container { max-width: 720px; margin: 0 auto; padding: 0 2rem; }
  .logo-row { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
  .logo { width: 40px; height: 40px; border-radius: 10px; background: linear-gradient(135deg, #9333ea, #ec4899); display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 700; font-size: 15px; box-shadow: 0 4px 20px rgba(147,51,234,0.3); }
  .title { color: #e9d5ff; font-size: 1.25rem; }
  .subtitle { color: #6b7280; font-size: 0.75rem; margin-top: 2px; }
  .meta { display: flex; gap: 16px; font-size: 0.75rem; color: #6b7280; align-items: center; }
  .meta .dot { width: 4px; height: 4px; border-radius: 50%; background: #4b5563; }
  main { padding: 2.5rem 0 3rem; }
  .intro { border-left: 2px solid rgba(168,85,247,0.4); padding-left: 1rem; color: #9ca3af; margin-bottom: 2rem; font-size: 0.875rem; }
  section { margin-bottom: 2rem; }
  h2 { color: #d8b4fe; font-size: 1rem; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 8px; }
  h2 .bar { display: inline-block; width: 5px; height: 18px; border-radius: 3px; background: linear-gradient(to bottom, #9333ea, #ec4899); }
  .content { padding-left: 1rem; font-size: 0.875rem; }
  .content p { margin-bottom: 0.6rem; color: #9ca3af; }
  .content ul { list-style: disc; padding-left: 1.5rem; color: #9ca3af; }
  .content li { margin-bottom: 0.4rem; }
  footer { background: #0e0e1a; border-top: 1px solid rgba(168,85,247,0.1); padding: 1.5rem 0; }
  .footer-inner { display: flex; justify-content: space-between; align-items: center; }
  .footer-inner span { font-size: 0.75rem; color: #4b5563; }
  .footer-logo { display: flex; align-items: center; gap: 8px; }
  .footer-logo .mini { width: 24px; height: 24px; border-radius: 4px; background: linear-gradient(135deg, #9333ea, #ec4899); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 9px; font-weight: 700; }
</style>
</head>
<body>
<div class="top-bar"></div>
<header>
  <div class="container">
    <div class="logo-row">
      <div class="logo">RX</div>
      <div>
        <div class="title">RX 编辑器 用户协议</div>
        <div class="subtitle">RX Editor — End User License Agreement</div>
      </div>
    </div>
    <div class="meta">
      <span>版本：v1.0</span><span class="dot"></span>
      <span>最后更新：2026年3月1日</span><span class="dot"></span>
      <span>生效日期：2026年3月1日</span>
    </div>
  </div>
</header>
<main>
  <div class="container">
    <p class="intro">欢迎使用 RX 编辑器（以下简称"本软件"）。本软件由 RX Studio（以下简称"我们"）开发并运营。在您安装、使用本软件之前，请您仔细阅读并充分理解本《用户协议》（以下简称"本协议"）的全部内容。</p>

    <section><h2><span class="bar"></span>一、协议的接受与修改</h2><div class="content">
      <p>1.1 您点击"同意"或安装、使用本软件即表示您已阅读、理解并同意接受本协议的全部条款。如果您不同意本协议的任何内容，请勿安装或使用本软件。</p>
      <p>1.2 我们保留随时修改本协议的权利。修改后的协议将通过软件内通知或官方网站公示，修改后的条款自公示之日起生效。您继续使用本软件即表示同意接受修改后的协议。</p>
    </div></section>

    <section><h2><span class="bar"></span>二、软件授权与使用范围</h2><div class="content">
      <p>2.1 我们授予您一项非独占、不可转让、可撤销的许可，允许您在个人设备上安装和使用本软件，仅限于创建、编辑和发布游戏内容。</p>
      <p>2.2 您不得对本软件进行反编译、反汇编、逆向工程或以其他方式尝试获取本软件的源代码。</p>
      <p>2.3 您不得以任何方式修改、复制、分发、出租、出借、出售本软件或基于本软件创建衍生作品，除非事先获得我们的书面许可。</p>
      <p>2.4 您不得移除或修改本软件中的任何版权声明、商标或其他所有权标识。</p>
    </div></section>

    <section><h2><span class="bar"></span>三、用户账号</h2><div class="content">
      <p>3.1 使用本软件的部分功能可能需要注册用户账号。您应当提供真实、准确、完整的注册信息，并及时更新。</p>
      <p>3.2 您应妥善保管您的账号和密码，因您保管不善导致的任何损失由您自行承担。</p>
      <p>3.3 如您发现账号存在异常使用情况，应立即通知我们。我们有权在调查期间暂停该账号的使用。</p>
    </div></section>

    <section><h2><span class="bar"></span>四、用户内容与知识产权</h2><div class="content">
      <p>4.1 您通过本软件创建的原创内容（包括但不限于地图、脚本、美术素材、音效等）的知识产权归您所有。</p>
      <p>4.2 您在使用本软件发布内容时，授予我们在全球范围内免费、非独占的许可，以用于展示、推广和改进本软件服务。</p>
      <p>4.3 您保证您发布的内容不侵犯任何第三方的知识产权或其他合法权益。若因内容侵权引发争议，您将承担全部法律责任。</p>
    </div></section>

    <section><h2><span class="bar"></span>五、用户行为规范</h2><div class="content">
      <p>您在使用本软件时不得：</p>
      <ul>
        <li>发布违反法律法规、公序良俗的内容；</li>
        <li>传播恶意代码、病毒或以任何方式干扰本软件的正常运行；</li>
        <li>利用本软件从事任何非法活动；</li>
        <li>未经授权访问或尝试访问本软件的服务器或系统；</li>
        <li>干扰其他用户正常使用本软件；</li>
        <li>冒充他人身份或误导他人关于内容来源。</li>
      </ul>
    </div></section>

    <section><h2><span class="bar"></span>六、隐私保护</h2><div class="content">
      <p>6.1 我们重视您的个人信息保护。我们将按照《隐私政策》收集、存储和使用您的个人信息。</p>
      <p>6.2 本软件可能会收集必要的设备信息、使用数据和崩溃日志，用于改善软件质量和用户体验。</p>
      <p>6.3 未经您的同意，我们不会向第三方披露您的个人信息，法律法规另有规定的除外。</p>
    </div></section>

    <section><h2><span class="bar"></span>七、免责声明</h2><div class="content">
      <p>7.1 本软件按"现状"提供，我们不对本软件的适用性、可靠性、准确性作出任何明示或暗示的保证。</p>
      <p>7.2 因不可抗力、网络状况、系统维护等原因导致的服务中断或数据丢失，我们不承担任何责任。</p>
      <p>7.3 我们不对您使用本软件创建或发布的内容承担任何法律责任。</p>
    </div></section>

    <section><h2><span class="bar"></span>八、协议终止</h2><div class="content">
      <p>8.1 您可以随时卸载本软件以终止本协议。</p>
      <p>8.2 如您违反本协议任何条款，我们有权立即终止您对本软件的使用权，且无需承担任何赔偿责任。</p>
      <p>8.3 协议终止后，您应停止使用本软件并删除所有副本。本协议中关于知识产权、免责声明和争议解决的条款在协议终止后继续有效。</p>
    </div></section>

    <section><h2><span class="bar"></span>九、争议解决与法律适用</h2><div class="content">
      <p>9.1 本协议的订立、效力、解释、履行和争议解决均适用中华人民共和国法律。</p>
      <p>9.2 因本协议引起或与本协议有关的任何争议，双方应首先通过友好协商解决。协商不成的，任何一方均可向我们所在地有管辖权的人民法院提起诉讼。</p>
    </div></section>

    <section><h2><span class="bar"></span>十、其他</h2><div class="content">
      <p>10.1 本协议构成您与我们之间关于使用本软件的完整协议，取代之前的所有口头或书面协议。</p>
      <p>10.2 本协议任何条款被认定为无效或不可执行，不影响其余条款的效力。</p>
      <p>10.3 我们未能行使或执行本协议的任何权利或条款，不构成对该权利或条款的放弃。</p>
    </div></section>
  </div>
</main>
<footer>
  <div class="container footer-inner">
    <span>&copy; 2026 RX Studio. 保留所有权利。</span>
    <div class="footer-logo">
      <div class="mini">RX</div>
      <span>RX Editor</span>
    </div>
  </div>
</footer>
</body>
</html>`;
}