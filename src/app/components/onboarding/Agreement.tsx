export function Agreement() {
  return (
    <div className="min-h-screen bg-[#0a0a12] text-gray-300">
      {/* 顶部装饰条 */}
      <div className="h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600"></div>

      {/* 头部 */}
      <header className="border-b border-purple-500/15 bg-[#0e0e1a]">
        <div className="max-w-3xl mx-auto px-8 py-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white text-lg shadow-lg shadow-purple-500/30">
              Y3
            </div>
            <div>
              <h1 className="text-purple-100 text-xl">Y3 编辑器 用户协议</h1>
              <p className="text-gray-500 text-xs mt-0.5">Y3 Editor — End User License Agreement</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>版本：v1.0</span>
            <span className="w-1 h-1 rounded-full bg-gray-600"></span>
            <span>最后更新：2026年3月1日</span>
            <span className="w-1 h-1 rounded-full bg-gray-600"></span>
            <span>生效日期：2026年3月1日</span>
          </div>
        </div>
      </header>

      {/* 正文 */}
      <main className="max-w-3xl mx-auto px-8 py-10">
        <div className="space-y-8 text-sm leading-relaxed">
          <p className="text-gray-400 border-l-2 border-purple-500/40 pl-4">
            欢迎使用 Y3 编辑器（以下简称"本软件"）。本软件由 Y3 Studio（以下简称"我们"）开发并运营。在您安装、使用本软件之前，请您仔细阅读并充分理解本《用户协议》（以下简称"本协议"）的全部内容。
          </p>

          <Section num="一" title="协议的接受与修改">
            <p>
              1.1 您点击"同意"或安装、使用本软件即表示您已阅读、理解并同意接受本协议的全部条款。如果您不同意本协议的任何内容，请勿安装或使用本软件。
            </p>
            <p>
              1.2 我们保留随时修改本协议的权利。修改后的协议将通过软件内通知或官方网站公示，修改后的条款自公示之日起生效。您继续使用本软件即表示同意接受修改后的协议。
            </p>
          </Section>

          <Section num="二" title="软件授权与使用范围">
            <p>
              2.1 我们授予您一项非独占、不可转让、可撤销的许可，允许您在个人设备上安装和使用本软件，仅限于创建、编辑和发布游戏内容。
            </p>
            <p>
              2.2 您不得对本软件进行反编译、反汇编、逆向工程或以其他方式尝试获取本软件的源代码。
            </p>
            <p>
              2.3 您不得以任何方式修改、复制、分发、出租、出借、出售本软件或基于本软件创建衍生作品，除非事先获得我们的书面许可。
            </p>
            <p>
              2.4 您不得移除或修改本软件中的任何版权声明、商标或其他所有权标识。
            </p>
          </Section>

          <Section num="三" title="用户账号">
            <p>
              3.1 使用本软件的部分功能可能需要注册用户账号。您应当提供真实、准确、完整的注册信息，并及时更新。
            </p>
            <p>
              3.2 您应妥善保管您的账号和密码，因您保管不善导致的任何损失由您自行承担。
            </p>
            <p>
              3.3 如您发现账号存在异常使用情况，应立即通知我们。我们有权在调查期间暂停该账号的使用。
            </p>
          </Section>

          <Section num="四" title="用户内容与知识产权">
            <p>
              4.1 您通过本软件创建的原创内容（包括但不限于地图、脚本、美术素材、音效等）的知识产权归您所有。
            </p>
            <p>
              4.2 您在使用本软件发布内容时，授予我们在全球范围内免费、非独占的许可，以用于展示、推广和改进本软件服务。
            </p>
            <p>
              4.3 您保证您发布的内容不侵犯任何第三方的知识产权或其他合法权益。若因内容侵权引发争议，您将承担全部法律责任。
            </p>
          </Section>

          <Section num="五" title="用户行为规范">
            <p>您在使用本软件时不得：</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 mt-2 text-gray-400">
              <li>发布违反法律法规、公序良俗的内容；</li>
              <li>传播恶意代码、病毒或以任何方式干扰本软件的正常运行；</li>
              <li>利用本软件从事任何非法活动；</li>
              <li>未经授权访问或尝试访问本软件的服务器或系统；</li>
              <li>干扰其他用户正常使用本软件；</li>
              <li>冒充他人身份或误导他人关于内容来源。</li>
            </ul>
          </Section>

          <Section num="六" title="隐私保护">
            <p>
              6.1 我们重视您的个人信息保护。我们将按照《隐私政策》收集、存储和使用您的个人信息。
            </p>
            <p>
              6.2 本软件可能会收集必要的设备信息、使用数据和崩溃日志，用于改善软件质量和用户体验。
            </p>
            <p>
              6.3 未经您的同意，我们不会向第三方披露您的个人信息，法律法规另有规定的除外。
            </p>
          </Section>

          <Section num="七" title="免责声明">
            <p>
              7.1 本软件按"现状"提供，我们不对本软件的适用性、可靠性、准确性作出任何明示或暗示的保证。
            </p>
            <p>
              7.2 因不可抗力、网络状况、系统维护等原因导致的服务中断或数据丢失，我们不承担任何责任。
            </p>
            <p>
              7.3 我们不对您使用本软件创建或发布的内容承担任何法律责任。
            </p>
          </Section>

          <Section num="八" title="协议终止">
            <p>
              8.1 您可以随时卸载本软件以终止本协议。
            </p>
            <p>
              8.2 如您违反本协议任何条款，我们有权立即终止您对本软件的使用权，且无需承担任何赔偿责任。
            </p>
            <p>
              8.3 协议终止后，您应停止使用本软件并删除所有副本。本协议中关于知识产权、免责声明和争议解决的条款在协议终止后继续有效。
            </p>
          </Section>

          <Section num="九" title="争议解决与法律适用">
            <p>
              9.1 本协议的订立、效力、解释、履行和争议解决均适用中华人民共和国法律。
            </p>
            <p>
              9.2 因本协议引起或与本协议有关的任何争议，双方应首先通过友好协商解决。协商不成的，任何一方均可向我们所在地有管辖权的人民法院提起诉讼。
            </p>
          </Section>

          <Section num="十" title="其他">
            <p>
              10.1 本协议构成您与我们之间关于使用本软件的完整协议，取代之前的所有口头或书面协议。
            </p>
            <p>
              10.2 本协议任何条款被认定为无效或不可执行，不影响其余条款的效力。
            </p>
            <p>
              10.3 我们未能行使或执行本协议的��何权利或条款，不构成对该权利或条款的放弃。
            </p>
          </Section>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="border-t border-purple-500/10 bg-[#0e0e1a]">
        <div className="max-w-3xl mx-auto px-8 py-6 flex items-center justify-between">
          <p className="text-gray-600 text-xs">© 2026 Y3 Studio. 保留所有权利。</p>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white text-[10px]">
              Y3
            </div>
            <span className="text-gray-600 text-xs">Y3 Editor</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Section({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="flex items-center gap-2 text-purple-300 mb-3">
        <span className="inline-block w-1.5 h-5 rounded-full bg-gradient-to-b from-purple-500 to-pink-500"></span>
        {num}、{title}
      </h2>
      <div className="space-y-2.5 text-gray-400 pl-4">{children}</div>
    </section>
  );
}
