"use client";
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, PlayCircle, Headphones, ExternalLink, Play, Pause, ZoomIn, Sparkles } from 'lucide-react';
import { motion, useInView, animate } from 'framer-motion';

// --- 高级平滑磁吸悬停组件 (Magnetic Hover) ---
const Magnetic = ({ children, strength = 0.3 }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const mouseMove = (e) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * strength;
    const y = (clientY - (top + height / 2)) * strength;
    setPosition({ x, y });
  };

  const mouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      onMouseMove={mouseMove}
      onMouseLeave={mouseLeave}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};

// --- 数字滚屏动效组件 (Data Counter) ---
const Counter = ({ from = 0, to, duration = 2 }) => {
  const nodeRef = useRef();
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(from, to, {
        duration: duration,
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.floor(value);
          }
        },
        ease: "easeOut"
      });
      return () => controls.stop();
    }
  }, [from, to, duration, inView]);

  return <span ref={nodeRef}>{from}</span>;
};

// --- 动画组件：实现滑动到视口才渐变显示 (Scroll Reveal) ---
const FadeIn = ({ children, delay = 0, className = "", direction = "up" }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setVisible(true);
        observer.unobserve(domRef.current);
      }
    }, { threshold: 0.15 });
    
    if (domRef.current) observer.observe(domRef.current);
    return () => {
      if (domRef.current) observer.disconnect();
    };
  }, []);

  const getTranslate = () => {
    if (direction === "up") return "translate-y-16";
    if (direction === "left") return "translate-x-16";
    if (direction === "right") return "-translate-x-16";
    return "translate-y-16";
  };

  return (
    <div 
      ref={domRef} 
      className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0 translate-x-0' : `opacity-0 ${getTranslate()}`} ${className}`} 
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- 数据配置区 ---
const TIMELINE_DATA = [
  { period: "2019.09 — 至今", company: "字节跳动", role: "资深内容运营 / 项目负责人", width: "w-[32%]", highlights: ["S级全案操盘", "亿级ROI突破"], isEdu: false },
  { period: "2017.08 — 2019.08", company: "网易传媒", role: "项目运营", width: "w-[18%]", highlights: ["头部媒体引入", "直播商业变现"], isEdu: false },
  { period: "2015.04 — 2017.08", company: "微影时代", role: "内容运营", width: "w-[16%]", highlights: ["娱乐资源拓荒", "高转化大促"], isEdu: false },
  { period: "2013.07 — 2015.01", company: "谢菲尔德大学", role: "国际政治传播 | 硕士", width: "w-[17%]", highlights: [], isEdu: true },
  { period: "2009.09 — 2013.06", company: "浙江传媒学院", role: "广告学 | 本科", width: "w-[17%]", highlights: [], isEdu: true }
];

const JIANG_ZHEN_DE_DATA = {
  'SEASON I': { desc: "第一季：洞察全网谣言重灾区，联动权威专家共同科普，登《中国食品报》。", items: [{ title: "海报 1", img: "/images/讲真的2023-1.png" }, { title: "海报 2", img: "/images/讲真的2023-2.png" }, { title: "海报 3", img: "/images/讲真的2023-3.png" }, { title: "海报 4", img: "/images/讲真的2023-4.png" }, { title: "海报 5", img: "/images/讲真的2023-5.png" }] },
  'SEASON II': { desc: "第二季：公安、消防携手共创，“不止315，我和头条一起讲真的”！", items: [{ title: "海报 1", img: "/images/讲真的315-1.jpg" }, { title: "海报 2", img: "/images/讲真的315-2.jpg" }, { title: "海报 3", img: "/images/讲真的315-3.jpg" }, { title: "海报 4", img: "/images/讲真的315-4.jpg" }, { title: "海报 5", img: "/images/讲真的315-5.jpg" }] },
  'SEASON III': { desc: "第三季：六一特别季，一起“守护小童心”。", items: [{ title: "海报 1", img: "/images/讲真的61-1.png" }, { title: "海报 2", img: "/images/讲真的61-2.png" }, { title: "海报 3", img: "/images/讲真的61-3.png" }, { title: "海报 4", img: "/images/讲真的61-4.png" }, { title: "海报 5", img: "/images/讲真的61-5.png" }] },
  'SEASON IV': { desc: "第四季：奥运冷知识趣味科普，有邓亚萍也有熊大熊二！", items: [{ title: "海报 1", img: "/images/讲真的奥运-1.jpeg" }, { title: "海报 2", img: "/images/讲真的奥运-2.jpeg" }, { title: "海报 3", img: "/images/讲真的奥运-3.jpeg" }, { title: "海报 4", img: "/images/讲真的奥运-4.jpeg" }, { title: "海报 5", img: "/images/讲真的奥运-5.jpeg" }] },
};

// 头条见一面 已修改为 9:16
const JIAN_YI_MIAN_POSTERS = [
  { id: 0, title: "奥运特别企划", tag: "奥运访谈", desc: "与《人物》杂志等6家媒体合作，独家访问孙杨、全红婵家人等7位奥运冠军及背后人物，单条内容破亿。", link: "https://www.douyin.com/video/7399459930832407871", posterFallback: "孙杨访谈海报", img: "/images/孙杨.jpg" },
  { id: 1, title: "母亲节专题", tag: "情感纪实", desc: "联合红星新闻、中国蓝新闻等上线4期母亲节纪录片，霸榜抖音Top1，引发强烈社会情感共振。", link: "https://www.douyin.com/video/7367264641413631259", posterFallback: "母亲节群像海报", img: "/images/母亲节.png" },
  { id: 2, title: "高考热点追踪", tag: "社会大考", desc: "上线杨孟衡×红星新闻、梁实×极目新闻。以“20岁用脚考上985大学的男生”等核心议题强势突围，斩获微博热搜Top21。", link: "https://www.douyin.com/video/7376922844850064692", posterFallback: "杨孟衡海报", img: "/images/杨孟衡.jpeg" },
  { id: 3, title: "年终热点人物", tag: "年度收官", desc: "5期人物纪录片及1期央视频合作主题片，突破刘国梁、真香哥、王暖暖等话题人物。「王暖暖对谈小谢」单期曝光破亿。", link: "https://www.douyin.com/video/7452142541383683387", posterFallback: "王暖暖海报", img: "/images/王暖暖.jpg" }
];

const BUBBLE_KEYWORDS = [
  { text: "每日经济新闻", offset: "-translate-y-2", margin: "ml-2" }, { text: "凤凰网财经", offset: "translate-y-4", margin: "ml-8" }, { text: "财经杂志", offset: "-translate-y-4", margin: "mr-4" },
  { text: "李玲", offset: "translate-y-2", margin: "ml-4" }, { text: "陆震", offset: "-translate-y-1", margin: "mr-6" }, { text: "倪鹏飞", offset: "translate-y-5", margin: "ml-2" },
  { text: "贾康", offset: "-translate-y-3", margin: "mr-8" }, { text: "丁克养老", offset: "translate-y-3", margin: "ml-6" }, { text: "新能源", offset: "-translate-y-5", margin: "mr-2" },
  { text: "医疗保险", offset: "translate-y-1", margin: "ml-4" }
];

const AI_KNOWLEDGE = [
  {
    keys: ["商业", "售卖", "客户", "非标", "买单", "变现", "赚钱", "营收", "赞助"],
    text: "【商业化破局】这次能打破商业化纪录，核心在于完成了「从售卖标准硬广到售卖全场景定制方案」的思维转变。\n\n我们在引入食品饮料类客户时做过深度背景拆解，发现他们曾赞助过《十三邀》，说明有为高知文化内容买单的基因。因此沟通时没拼硬广流量，而是主打”高调性内容溢价+性价比”，直接为客户深度定制了线下活动的交互场景，填补了纯线上节目的体验空白，成功打动了客户。"
  },
  {
    keys: ["流量", "曝光", "热搜", "复用", "流量打法", "如何传播", "传播策略", "热度"],
    text: "【流量操盘】我们没有把它当成一档传统综艺，而是当作一个长生命周期的 IP 在操盘。\n\n传播上采用‘前置预埋+全网矩阵发酵’的打法。最让我自豪的是，这次巨大的传播声量几乎都是我们 in-house (团队内部) 完成的。我们将团队以往在全网渠道运营中沉淀的跨平台策划能力最大化发挥，用极低的成本撬动了百亿级的自然流量。"
  },
  {
    keys: ["统筹", "困难", "协调", "资源", "阿那亚", "挑战", "压力", "最难"],
    text: "【资源统筹】最大的挑战是「极限施压下的全局重构」。我在项目开启前不到一个月临危受命接下 owner。\n\n面对复杂的盘子，我做了三件事定军心：\n一、向上向外破局，极速梳理上下游利益点建立信任；\n二、向下重组，火速重构SOP把大项目拆解为细颗粒度分工，各司其职；\n三、敏捷决策，不到一个月强效推进阿那亚线下场地的落地。"
  },
  {
    keys: ["角色", "边界", "0到1", "决定性", "贡献", "主要工作", "你做了什么", "负责什么"],
    text: "【角色边界】分享一宏观、一微观两件事。\n\n宏观上，我作为大 Owner 全盘主导了阿那亚线下「岛屿书声日」，从政企谈判、全案策划、商业植入到舞美视觉全链路把控，最终实现口碑、数据和商业的三丰收。\n\n微观上，我从0到1顶住压力推动了线上售票机制。在1周内拉通法务、财务等极其复杂的内部流程，票务上线2天即告售罄，为活动建立了高价值的门槛。"
  },
  {
    keys: ["联名", "旺旺", "标准", "跨界", "怎么选", "选择品牌", "合作品牌"],
    text: "【联名策略】我的底层逻辑可以用三个词概括：基因契合度、人群辐射力、内容可玩性。\n\n以旺旺为例，同为“国民级品牌”有强背书；旺旺年轻粉丝及家庭受众精准契合头条高考项目破圈诉求；且旺旺品牌性格开放，能顺畅玩出职业罐、盲盒等强社交货币。这也是我后来为《岛屿》选择阿那亚等合作伙伴时的通用标尺。"
  },
  {
    keys: ["严肃", "娱乐", "科普", "反诈", "枯燥", "出圈", "破壁", "趣味"],
    text: "【严肃与泛娱乐】主要靠两招打破次元壁：\n\n一是‘反差感人设’的打造，挖掘自带网感的 @二喜警官、@深圳卫健委，用最接地气的方式讲硬核内容；\n\n二是‘内容形态的降维打击’，将枯燥防骗知识转化为 @刘大悦er 的趣味短剧（并引入央视网背书），甚至让 @音乐人王博 改编成洗脑神曲。降低门槛，放大势能。"
  },
  {
    keys: ["roi", "增长", "转化", "拉新", "听个响", "数据", "留存", "坑", "效果", "复盘", "反思"],
    text: "【ROI与增长复盘】这是一个非常犀利的痛点。\n\n作为跨界联名，首要核心指标是站外曝光和品牌破圈，这部分我们拿到1亿+曝光超额完成。同时在链路最后埋了“扫码端内抽盲盒”，没花买量预算，最终给端内带来了破万的拉新拉活。\n\n但在复盘时，我深刻反思了没掀起更大量级转化的真实“坑”：旺旺是商业品牌，以往做纯内容宣发很容易用极低成本撬动 KOL。但在这个项目里，带着商业Logo，KOL 就会将其判定为商业广告，导致我们在 Seeding时遇到了极高的溢价壁垒，杠杆失效了。\n\n这给了我极大启发，以后操盘类似联名，破局点有两个：\n1. 宣发费用前置，要求品牌方共同出资建立资金池；\n2. 必须将传播重心从 KOL驱动转移到 C端 UGC 驱动（如利用盲盒做用户级裂变），绕开大V高昂溢价。\n这种避坑能力和闭环思维是我最宝贵的财富。"
  },
  {
    keys: ["团队", "管理", "风格", "带人", "下属", "带团队"],
    text: "【团队管理】我带的是10人以内的精锐团队，风格是「目标强对齐，执行高授权，节点严把控」。\n\n初期把目标拆解到最细颗粒度，确立清晰SOP和Milestone。我不会微操具体执行以保留团队创造力；但对于像渠道拓展这种从0到1的新业务，我会在关键节点严格 Review，跑通模型后再转入常态化复盘与迭代。"
  },
  {
    keys: ["壁垒", "护城河", "竞争力", "核心", "优势", "强项", "特长", "长处", "为什么录用你", "特点", "价值"],
    text: "【个人壁垒】我认为我的核心护城河是“极强的业务自驱力”叠加“T型复合能力”。\n\n第一，业务拓荒能力极强，从0到1搭建渠道分发体系，到临危受命扛起 S 级综艺大旗，不仅能守成更善于破局创新。\n\n第二，我是“懂内容的营销人，懂营销的内容人”。知道怎么做好内容，更知道怎么通过顶级跨界资源把它包装出去，放大商业价值，形成真正的生态闭环。"
  },
  {
    keys: ["驱动", "机会", "看重", "选择", "目标", "规划", "未来", "职业发展", "期望", "跳槽原因", "离职"],
    text: "【职业驱动力】我已经积累了 10 年的大厂全案操盘经验，时间是我最宝贵的杠杆。所以我最看重的是：平台是否能让我现有的“内容生态+创意营销”复合优势产生最大的乘数效应。\n\n我希望能加入一个具备创新活力和战斗力的团队，在核心业务里持续拿结果，同时也能在新趋势下（比如 AI x Content）共同探索新增长边界。"
  },
  {
    keys: ["ai", "赋能", "大模型", "人工智能", "工具", "gpt", "效率", "降本增效"],
    text: "【AI 赋能】在实际业务中，我主要利用大模型（如 GPT/Gemini）进行复杂信息处理，比如梳理海量娱乐专栏的选题库、提炼高频话题等，大幅提升了案头效率。\n\n但更重要的一点是，我正在用 AI 拓展我作为内容运营的能力边界。比如，您现在看到的这个极具设计感和 3D 动效的在线 Portfolio 网站，其实就是我亲手通过与 AI 结结编程写代码做出来的。它证明了即使我不是前端开发，只要具备极强的产品审美和逻辑拆解能力，AI 就能成为我最强大的外脑和执行手。"
  },
  {
    keys: ["趋势", "短视频", "长视频", "出路", "商业化出路", "行业看法", "大环境", "直播"],
    text: "【行业趋势】我认为长视频与短视频不是绝对的零和博弈，而是“长短共生、相互反哺”。\n\n短视频冲击下，平庸的长内容确实会被淘汰，但金字塔尖的精品 OGC 依然是不可替代的品牌高地。未来的出路在于“长内容做质感立心智，短内容/直播做宣发收流量”。我们在操盘《岛屿3》时就是以长综艺为基石，同步运用抖音短视频切片、主创直播等短平快体裁进行全网扩圈，用短带长。"
  }
];

const DEFAULT_AI_GREETING = "你好！我是姗姗的 AI 分身（本网页也是我用 AI 辅助开发的成果哦）。我脑子里装着她 10 年大厂项目操盘的深度复盘。你想了解哪方面？\n\n🎯 【岛屿读书】商业化破局、流量操盘、资源统筹\n🎯 【跨界营销】联名策略、ROI与增长复盘、科普泛娱乐化\n🎯 【综合能力】团队管理、核心壁垒、AI探索与行业趋势\n\n（可以直接回复关键词，比如“商业化”、“ROI”、“壁垒”、“优势”等）";

const FALLBACK_RESPONSES = [
  "这个问题很有趣！不过我目前的大脑里主要装着姗姗关于【跨界营销】和【大项目操盘】的硬核复盘。您可以试着问我：“做项目遇到最大困难是什么？”或者“你的核心优势是？”",
  "这个问题超纲啦~ 毕竟我只是个 AI 助理。关于这个问题，期待您在面试中直接和姗姗本人探讨！不过，您可以随时向我查阅关于【岛屿读书】和【旺旺联名】的操盘细节哦。",
  "收到您的提问！我的数据库正在努力检索中... 哎呀，没找到完美匹配的答案。要不您换个姿势，问问我关于【商业化变现】或者【团队管理风格】的问题？"
];

export default function Portfolio() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: DEFAULT_AI_GREETING, isBot: true }]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);
  
  const [activeTimelineIdx, setActiveTimelineIdx] = useState(0); 
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [lightboxData, setLightboxData] = useState(null);
  const [showAudioText, setShowAudioText] = useState(false);

  const seasons = ['SEASON I', 'SEASON II', 'SEASON III', 'SEASON IV'];
  const [jiangZhenDeSeason, setJiangZhenDeSeason] = useState('SEASON I');
  const [playKeynote, setPlayKeynote] = useState(false); 

  const [activeJymIndex, setActiveJymIndex] = useState(0);

  const [playingStates, setPlayingStates] = useState({ podcast: false });
  const togglePlay = (key) => setPlayingStates(prev => ({ ...prev, [key]: !prev[key] }));

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => scrollToBottom(), [messages, isChatOpen]);

  const handleMouseMove = (e) => {
    const x = (e.clientX - window.innerWidth / 2) / 25;
    const y = (e.clientY - window.innerHeight / 2) / 25;
    setMousePos({ x, y });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const userMsg = inputText.trim();
    setMessages(prev => [...prev, { text: userMsg, isBot: false }]);
    setInputText("");

    setTimeout(() => {
      let botReply = null;
      const lowerInput = userMsg.toLowerCase();
      
      for (const entry of AI_KNOWLEDGE) {
        if (entry.keys.some(k => lowerInput.includes(k))) {
          botReply = entry.text;
          break;
        }
      }
      
      if (!botReply) {
        botReply = FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
      }
      
      setMessages(prev => [...prev, { text: botReply, isBot: true }]);
    }, 800);
  };

  const ZoomableImage = ({ src, textFallback, className, imgClass = "object-cover", bg = "bg-[#D9E2E8]" }) => (
    <div 
      className={`relative group cursor-zoom-in overflow-hidden shadow-md ${bg} ${className}`}
      onClick={() => setLightboxData({ src, text: textFallback })}
    >
      {src ? (
        <img src={src} alt="Portfolio Asset" className={`absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-[1.03] ${imgClass}`} />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-[#3F57A6]/40 text-xs transition-transform duration-700 group-hover:scale-105 p-4 text-center leading-relaxed">
          {textFallback && `[Image: ${textFallback}]`}
        </div>
      )}
      <div className="absolute inset-0 bg-[#3F57A6]/0 group-hover:bg-[#3F57A6]/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
        <div className="bg-white/80 p-3 rounded-full backdrop-blur-sm shadow-lg">
          <ZoomIn className="text-[#3F57A6] w-5 h-5" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#2C3E50] font-sans selection:bg-[#E3E8F8] selection:text-[#3F57A6] overflow-x-hidden relative">
      
      {lightboxData && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 cursor-zoom-out animate-in fade-in duration-300" onClick={() => setLightboxData(null)}>
          <button className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"><X size={32} /></button>
          {lightboxData.src ? (
            <img src={lightboxData.src} alt="Enlarged view" className="max-w-full max-h-full object-contain shadow-2xl rounded-sm" />
          ) : (
            <div className="w-full max-w-lg aspect-video bg-[#F4F1EA] rounded-sm flex items-center justify-center text-[#3F57A6] font-serif text-xl">
              [Image placeholder]
            </div>
          )}
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
        .animate-marquee { display: flex; width: max-content; animation: marquee 30s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-5px); } }
        .animate-float { animation: float 4s ease-in-out infinite; }
      `}} />

      {/* --- 导航栏 --- */}
      <nav className="fixed top-0 w-full p-6 md:px-12 flex justify-between items-center z-50 bg-[#F4F1EA]/80 backdrop-blur-md border-b border-[#3F57A6]/5">
        <div className="font-serif text-xl md:text-2xl font-bold tracking-tighter text-[#3F57A6]">刘姗姗.</div>
        <div className="hidden md:flex gap-6 lg:gap-8 text-[11px] lg:text-xs tracking-widest uppercase font-bold text-[#3F57A6]">
          <Magnetic><a href="#about" className="hover:opacity-60 transition-opacity block py-2">关于我 About</a></Magnetic>
          <Magnetic><a href="#timeline" className="hover:opacity-60 transition-opacity block py-2">履历 Timeline</a></Magnetic>
          <Magnetic><a href="#ogc-cases" className="hover:opacity-60 transition-opacity block py-2">内容 Content</a></Magnetic>
          <Magnetic><a href="#channel-coop" className="hover:opacity-60 transition-opacity block py-2">渠道 Channel</a></Magnetic>
          <Magnetic><a href="#co-branding" className="hover:opacity-60 transition-opacity block py-2">创意营销 Marketing</a></Magnetic>
          <Magnetic><a href="#entertainment" className="hover:opacity-60 transition-opacity block py-2">娱乐合作 Ent.</a></Magnetic>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section id="about" onMouseMove={handleMouseMove} className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto min-h-[95vh] flex flex-col items-center relative overflow-hidden">
        <div className="hidden md:block absolute top-32 lg:top-40 left-[2%] lg:left-[10%] w-36 lg:w-44 aspect-[3/4] z-10 transition-transform duration-200 ease-out" style={{ transform: `translate(${mousePos.x * -1.5}px, ${mousePos.y * -1.5}px)` }}>
          <ZoomableImage src="/images/首图左1.jpg" textFallback="左侧悬浮大图" className="w-full h-full rounded-sm shadow-md" bg="bg-[#EAE5DB]" />
          <div className="absolute -bottom-8 -left-6 w-24 lg:w-28 aspect-[3/4] shadow-xl border-4 border-[#F4F1EA] z-20">
             <ZoomableImage src="/images/首图左2.jpg" textFallback="细节图" className="w-full h-full" bg="bg-neutral-800" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-serif text-[#3F57A6] z-20 mt-16 md:mt-10 mb-6 italic tracking-wide">Content Expert</h1>

        <div className="relative w-full max-w-[320px] md:max-w-[360px] z-20">
          <div className="aspect-[4/5] bg-[#EAE5DB] w-full shadow-lg relative overflow-hidden group rounded-sm cursor-zoom-in" onClick={() => setLightboxData({ src: "/images/首页主图.jpeg", text: "主照" })}>
            <img src="/images/首页主图.jpeg" alt="主照" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-[#3F57A6]/5 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0"></div>
          </div>
          <h2 className="absolute -bottom-6 md:-bottom-10 left-1/2 -translate-x-1/2 text-[3.5rem] md:text-[5.5rem] font-serif text-[#3F57A6] z-30 whitespace-nowrap italic font-bold tracking-tight mix-blend-multiply opacity-95 transition-transform duration-100 ease-out pointer-events-none" style={{ transform: `translate(calc(-50% + ${mousePos.x * 0.8}px), ${mousePos.y * 0.3}px)` }}>
             LIU SHANSHAN
          </h2>
        </div>

        <div className="hidden md:block absolute top-52 lg:top-64 right-[5%] lg:right-[12%] z-10 transition-transform duration-200 ease-out" style={{ transform: `translate(${mousePos.x * 1.2}px, ${mousePos.y * 1.2}px)` }}>
           <div className="absolute -top-12 -right-12 lg:-top-16 lg:-right-16 w-[90px] lg:w-[110px] h-[90px] lg:h-[110px] z-20 opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-500 pointer-events-auto">
              <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_20s_linear_infinite]">
                <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
                <text className="text-[10px] font-serif font-bold fill-[#3F57A6] tracking-widest uppercase">
                  <textPath href="#circlePath" startOffset="0%">CONTENT × AI · OGC EXPERT · </textPath>
                </text>
              </svg>
           </div>
           <div className="w-40 lg:w-48 aspect-[3/4]">
             <ZoomableImage src="/images/首图右.jpeg" textFallback="右侧悬浮图" className="w-full h-full rounded-sm shadow-md" bg="bg-[#E3DFD5]" />
           </div>
        </div>

        <div className="mt-20 md:mt-28 max-w-[420px] text-center z-20 relative">
          <p className="text-[#3F57A6] text-xs md:text-sm leading-loose font-medium px-4">
            字节跳动/网易 | 10年+ 互联网内容运营经验。深耕头部平台，具备从 0 到 1 搭建业务、亿级项目全案管理及团队管理经验。致力于拓展运营人的能力边界，探索 AI 赋能新范式。
          </p>
          <div className="mt-8 flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-center text-[#3F57A6] text-xs font-serif tracking-widest">
            <Magnetic><a href="tel:13696796363" className="hover:opacity-50 transition-opacity flex items-center gap-2">📱 13696796363</a></Magnetic>
            <span className="hidden md:inline opacity-30">|</span>
            <Magnetic><a href="mailto:nolitaliu@126.com" className="hover:opacity-50 transition-opacity flex items-center gap-2">📮 nolitaliu@126.com</a></Magnetic>
          </div>
        </div>
      </section>

      {/* --- 时间线 Timeline --- */}
      <section id="timeline" className="py-24 px-6 md:px-12 bg-[#EAE5DB] border-y border-[#3F57A6]/10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-serif mb-2 text-[#3F57A6]">我的职业履历</h2>
              <p className="text-sm tracking-widest text-[#3F57A6]/70 uppercase font-serif italic">Career Path</p>
            </div>
          </FadeIn>

          <div className="hidden md:flex flex-row w-full relative pt-4">
            <div className="absolute top-[6.5rem] left-0 w-full h-px bg-[#3F57A6]/20"></div>
            {TIMELINE_DATA.map((item, idx) => {
              const isActive = activeTimelineIdx === idx;
              return (
                <div key={idx} onClick={() => setActiveTimelineIdx(idx)} className={`${item.width} relative pr-6 group cursor-pointer transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}>
                  <div className={`absolute top-[6.5rem] left-0 rounded-full z-10 shadow-[0_0_0_4px_#EAE5DB] transition-all duration-500 ${isActive ? 'bg-[#3F57A6] scale-150' : 'bg-[#3F57A6]/60'} ${item.isEdu ? 'w-2 h-2 -mt-[3px]' : 'w-2.5 h-2.5 -mt-[4.5px]'}`}></div>
                  <div className="mb-10 h-20">
                    <p className={`text-[10px] font-bold tracking-widest mb-2 font-serif uppercase transition-colors duration-300 ${isActive ? 'text-[#3F57A6]' : 'text-[#3F57A6]/70'}`}>{item.period}</p>
                    <h3 className={`text-lg font-serif font-medium mb-1 whitespace-nowrap transition-colors duration-300 ${isActive ? 'text-[#2C3E50]' : 'text-[#2C3E50]/80'}`}>{item.company}</h3>
                    <p className={`text-[11px] font-medium whitespace-nowrap transition-colors duration-300 ${isActive ? 'text-[#3F57A6]/90' : 'text-[#3F57A6]/60'}`}>{item.role}</p>
                  </div>
                  {!item.isEdu && (
                    <div className="pt-4 pr-2">
                      <ul className="space-y-3">
                        {item.highlights.map((desc, i) => (
                          <li key={i} className={`text-xs font-medium tracking-wide flex items-start gap-2 transition-colors duration-300 ${isActive ? 'text-[#2C3E50]/90' : 'text-[#2C3E50]/60'}`}>
                            <span className={`mt-[2px] text-[10px] ${isActive ? 'text-[#3F57A6]' : 'text-[#3F57A6]/40'}`}>■</span>
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex md:hidden flex-col gap-10 relative">
             <div className="absolute top-2 bottom-2 left-[5px] w-px bg-[#3F57A6]/20"></div>
             {TIMELINE_DATA.map((item, idx) => {
               const isActive = activeTimelineIdx === idx;
               return (
                 <FadeIn key={idx} delay={idx * 100}>
                   <div onClick={() => setActiveTimelineIdx(idx)} className={`relative pl-6 group cursor-pointer transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
                     <div className={`absolute left-0 rounded-full z-10 shadow-[0_0_0_4px_#EAE5DB] transition-all duration-500 ${isActive ? 'bg-[#3F57A6] scale-125' : 'bg-[#3F57A6]/60'} ${item.isEdu ? 'top-2 w-1.5 h-1.5 translate-x-[0.5px]' : 'top-1.5 w-2.5 h-2.5'}`}></div>
                     <p className={`text-[10px] font-bold tracking-widest mb-1 font-serif uppercase ${isActive ? 'text-[#3F57A6]' : 'text-[#3F57A6]/70'}`}>{item.period}</p>
                     <h3 className={`text-lg font-serif font-medium mb-1 ${isActive ? 'text-[#2C3E50]' : 'text-[#2C3E50]/80'}`}>{item.company}</h3>
                     <p className={`text-xs font-medium ${item.isEdu ? 'mb-0' : 'mb-4'} ${isActive ? 'text-[#3F57A6]' : 'text-[#3F57A6]/70'}`}>{item.role}</p>
                     {!item.isEdu && (
                       <ul className="space-y-2">
                         {item.highlights.map((desc, i) => (
                           <li key={i} className={`text-xs font-medium tracking-wide flex items-start gap-2 ${isActive ? 'text-[#2C3E50]/90' : 'text-[#2C3E50]/60'}`}>
                             <span className={`mt-[2px] text-[10px] ${isActive ? 'text-[#3F57A6]' : 'text-[#3F57A6]/40'}`}>■</span>
                             <span>{desc}</span>
                           </li>
                         ))}
                       </ul>
                     )}
                   </div>
                 </FadeIn>
               );
             })}
          </div>
        </div>
      </section>

      {/* ==========================================
          CHAPTER 1: 内容 IP 操盘 (包含岛屿读书) 
      ========================================== */}
      <section id="ogc-cases" className="py-24 md:py-32 bg-[#F4F1EA] relative overflow-hidden">
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 mb-16 md:mb-24">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-serif mb-2 text-[#3F57A6]">内容 IP 操盘</h2>
            <p className="text-sm tracking-widest text-[#3F57A6]/70 uppercase font-serif italic">OGC & IP Operation</p>
          </FadeIn>
        </div>

        {/* --- 岛屿读书 专题 --- */}
        <div className="bg-[#E4EAEF] pt-16 pb-16 md:pt-20 md:pb-20 w-full relative">
          
          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            <div className="flex flex-col md:flex-row gap-10 lg:gap-16 items-center">
              <FadeIn className="w-full md:w-5/12 lg:w-4/12 flex-shrink-0" direction="right">
                <ZoomableImage 
                  src="/images/岛屿主视觉.jpg" 
                  textFallback="我在岛屿读书 主视觉" 
                  className="w-full max-w-[320px] md:max-w-none mx-auto aspect-[9/16] rounded-sm shadow-2xl"
                />
              </FadeIn>
              
              <FadeIn className="w-full md:w-7/12 lg:w-8/12 flex flex-col justify-center" direction="left" delay={200}>
                <p className="text-xs tracking-[0.3em] text-[#3F57A6]/60 uppercase font-serif mb-6 lg:mb-8 flex items-center gap-4">
                  <span className="w-12 lg:w-16 h-px bg-[#3F57A6]/30"></span>
                  Featured Masterpiece · OGC
                </p>
                <h2 className="text-5xl md:text-5xl lg:text-[5.5rem] font-serif text-[#3F57A6] leading-[1.05] mb-6 lg:mb-8 italic tracking-tight">
                  我在岛屿读书<br/>
                  <span className="text-4xl md:text-4xl lg:text-6xl not-italic font-bold mt-2 lg:mt-4 block">第三季</span>
                </h2>
                <p className="text-[#2C3E50]/90 text-sm md:text-base lg:text-lg leading-loose max-w-lg mb-8 lg:mb-12 font-medium">
                  全案操盘《岛屿读书3》，从线下实体售票到全渠道霸榜，用营销的锐度打破内容次元壁，将小众的严肃文化，打造为百亿曝光的全网爆款。
                </p>
                
                <div className="flex flex-wrap gap-8 lg:gap-16 pt-8 lg:pt-10 border-t border-[#3F57A6]/10">
                  <div className="flex flex-col">
                    <span className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#3F57A6]"><Counter to={100} duration={2} /><span className="text-xl lg:text-3xl text-[#3F57A6]/70">亿+</span></span>
                    <span className="text-[10px] tracking-widest text-[#3F57A6]/60 uppercase mt-2 lg:mt-3 font-bold">全网累计曝光</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#3F57A6]"><Counter to={100} duration={2.5} /><span className="text-xl lg:text-3xl text-[#3F57A6]/70">+</span></span>
                    <span className="text-[10px] tracking-widest text-[#3F57A6]/60 uppercase mt-2 lg:mt-3 font-bold">全网热搜</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#3F57A6]">Top 1</span>
                    <span className="text-[10px] tracking-widest text-[#3F57A6]/60 uppercase mt-2 lg:mt-3 font-bold">收视率稳居同时段</span>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>

          <FadeIn delay={100}>
            <div className="relative w-full py-16 md:py-24 mt-16 mb-8 group cursor-pointer" onClick={() => setLightboxData({ src: "/images/阿那亚现场.jpg", text: "阿那亚全景" })}>
              <div className="animate-marquee flex gap-4 md:gap-6 px-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="shrink-0 w-[65vw] md:w-[40vw] lg:w-[30vw] aspect-[4/3] rounded-sm overflow-hidden shadow-md bg-[#D9E2E8]">
                    <img src="/images/阿那亚现场.jpg" alt="阿那亚现场" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 left-6 md:left-12 lg:left-[10%] bg-[#F4F1EA]/95 backdrop-blur-md p-6 md:p-10 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.1)] w-[85%] md:max-w-xl lg:max-w-2xl border-l-4 border-[#3F57A6]">
                <h3 className="text-2xl md:text-4xl lg:text-5xl font-serif mb-4 md:mb-6 text-[#3F57A6] tracking-tight leading-tight">
                  岛屿书声日 <span className="text-xl md:text-3xl mx-2 font-light text-[#3F57A6]/50">×</span> 三亚阿那亚
                </h3>
                <p className="text-sm md:text-base lg:text-lg text-[#2C3E50]/90 leading-relaxed font-medium">
                  首次线下售票活动，将文化综艺落地为实体文化盛会，余华、刘擎、戴建业等14位头部名人齐聚。
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#3F57A6]/60 uppercase">
                  <ZoomIn size={14} /> 点击图片区域放大查看现场
                </div>
              </div>
            </div>
          </FadeIn>

          <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 pt-6">
            
            <div className="mb-16 md:mb-20 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 relative z-[60]">
              <FadeIn>
                <h3 className="text-3xl md:text-4xl font-serif text-[#3F57A6] mb-4 relative inline-block">
                  多维破圈 · 现象级营销矩阵
                  <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-[#3F57A6]/20"></div>
                </h3>
                <p className="text-sm md:text-base text-[#2C3E50]/80 font-medium leading-relaxed max-w-lg mt-6">
                  不仅仅是一场线下活动——创意营销突破常规，以线下事件为支点，延展出跨界联动、实体出版、深度互动等极具厚度的内容生态网。
                </p>
              </FadeIn>
              
              {/* --- 音频彩蛋区域开始 --- */}
               <FadeIn delay={100} className="relative flex flex-col items-start md:items-end mt-4 md:mt-0 z-[100]">
                 <button
                   onClick={() => {
                     if (showAudioText) {
                       setShowAudioText(false);
                       // 停止播放
                       if (window.easterEggAudio) {
                         window.easterEggAudio.pause();
                         window.easterEggAudio.currentTime = 0;
                       }
                     } else {
                       setShowAudioText(true);
                       // 开始播放
                       if (!window.easterEggAudio) {
                         window.easterEggAudio = new Audio('/audio/yuhua.m4a'); // 确保这里的路径和您的文件名一致
                       }
                       window.easterEggAudio.play();
                     }
                   }}
                   className="flex items-center gap-2 bg-[#3F57A6] text-[#F4F1EA] px-6 py-3.5 rounded-full hover:bg-[#2C3E80] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                 >
                   {showAudioText ? <Pause size={16} /> : <Play size={16} fill="currentColor" />}
                   <span className="text-xs font-bold tracking-widest uppercase">点击收听余华原声</span>
                 </button>
                 {showAudioText && (
                   <div className="absolute top-full mt-4 right-0 p-5 bg-[#F4F1EA] shadow-[0_30px_60px_rgba(0,0,0,0.15)] rounded-sm w-[300px] md:w-[360px] text-sm text-[#2C3E50] border-t-4 border-[#3F57A6] animate-in fade-in slide-in-from-top-2 origin-top-right">
                       <div className="absolute -top-[10px] right-10 w-4 h-4 bg-[#F4F1EA] rotate-45 border-t border-l border-[#3F57A6]"></div>
                       <div className="mb-3 flex items-center justify-between border-b border-[#3F57A6]/10 pb-2">
                         <span className="text-xs font-bold text-[#3F57A6] tracking-widest">正在播放实录...</span>
                         <div className="flex gap-1">
                           <span className="w-1 h-3 bg-[#3F57A6] animate-pulse"></span>
                           <span className="w-1 h-4 bg-[#3F57A6] animate-pulse delay-75"></span>
                           <span className="w-1 h-2 bg-[#3F57A6] animate-pulse delay-150"></span>
                         </div>
                       </div>
                       <div className="italic font-serif text-[#2C3E50]/90 leading-relaxed mb-3 text-xs">
                         <p className="mb-2">“前几天在阿那亚做《岛屿读书》宣传，多方合作，<strong className="font-bold text-[#3F57A6]">那个活动做得很成功。</strong>”</p>
                         <p>“除了我说的话受欢迎外，最热的是哪条你知道吗？就是今日头条的两个人，<span className="bg-yellow-200/60 font-bold px-1 not-italic text-[#3F57A6]">一个叫姗姗</span>，和唐羊设计的。让我测 MBTI，结果我是 INFP。一直以为我是个E人……（笑）”</p>
                       </div>
                       <p className="text-[10px] text-[#3F57A6]/60 font-bold tracking-wider text-right">— 余华 现场分享</p>
                   </div>
                 )}
               </FadeIn>
               {/* --- 音频彩蛋区域结束 --- */}
            </div>

            {/* 1. 笙笙 (Left Video 9:16) */}
            <FadeIn delay={100} className="relative z-10 mb-12 md:mb-16">
              <div className="flex flex-col md:flex-row items-center relative group justify-center md:justify-start">
                <div 
                  className="w-full md:w-5/12 max-w-[280px] aspect-[9/16] bg-[#D9E2E8] rounded-sm shadow-xl overflow-hidden relative cursor-pointer flex-shrink-0" 
                  onClick={() => window.open('https://www.douyin.com/video/7449319839836933439', '_blank')}
                >
                   <img src="/images/笙笙.jpeg" alt="笙笙 Vlog 封面" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10"></div>
                   <div className="absolute inset-0 flex items-center justify-center z-20">
                     <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center group-hover:bg-[#3F57A6] transition-all duration-300 shadow-lg group-hover:shadow-xl scale-95 group-hover:scale-110">
                       <Play className="text-white ml-1 w-6 h-6" fill="currentColor" />
                     </div>
                   </div>
                   <div className="absolute bottom-4 left-0 right-0 text-center z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <span className="text-white text-[10px] font-bold tracking-widest uppercase bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm">
                       点击前往观看原片 <ExternalLink size={10} className="inline ml-1 -mt-0.5" />
                     </span>
                   </div>
                </div>
                <div className="w-full md:w-7/12 pt-8 md:pt-0 md:-ml-8 z-20">
                  <div className="bg-[#E4EAEF]/90 md:bg-transparent p-6 md:p-0 backdrop-blur-sm md:backdrop-blur-none">
                    <p className="text-[10px] font-bold tracking-widest text-[#3F57A6]/60 mb-2 uppercase">Cross-Generation</p>
                    <h4 className="text-3xl md:text-5xl font-serif text-[#3F57A6] mb-4">× 笙笙</h4>
                    <p className="text-sm md:text-base text-[#2C3E50]/80 leading-relaxed max-w-md">“文坛顶流”余华与10岁天才摄影师笙笙的跨世代创新联动，反差感引爆社交话题传播。</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* 2. 张大碗子 (Right Video 9:16) */}
            <FadeIn delay={200} className="relative z-20 mb-12 md:mb-16">
              <div className="flex flex-col md:flex-row-reverse items-center relative group mt-16 md:-mt-8 justify-center md:justify-start">
                <div 
                  className="w-full md:w-5/12 max-w-[280px] aspect-[9/16] bg-[#C5D3DD] rounded-sm shadow-xl overflow-hidden relative cursor-pointer flex-shrink-0" 
                  onClick={() => window.open('https://www.douyin.com/video/7448946888084163859', '_blank')}
                >
                   <img src="/images/碗子.jpeg" alt="张大碗子 Vlog 封面" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10"></div>
                   <div className="absolute inset-0 flex items-center justify-center z-20">
                     <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center group-hover:bg-[#3F57A6] transition-all duration-300 shadow-lg group-hover:shadow-xl scale-95 group-hover:scale-110">
                       <Play className="text-white ml-1 w-6 h-6" fill="currentColor" />
                     </div>
                   </div>
                   <div className="absolute bottom-4 left-0 right-0 text-center z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <span className="text-white text-[10px] font-bold tracking-widest uppercase bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm">
                       点击前往观看原片 <ExternalLink size={10} className="inline ml-1 -mt-0.5" />
                     </span>
                   </div>
                </div>
                <div className="w-full md:w-7/12 pt-8 md:pt-0 md:-mr-8 z-30 text-left md:text-right flex flex-col items-start md:items-end">
                  <div className="bg-[#E4EAEF]/90 md:bg-transparent p-6 md:p-0 backdrop-blur-sm md:backdrop-blur-none">
                    <p className="text-[10px] font-bold tracking-widest text-[#3F57A6]/60 mb-2 uppercase">Youth Engagement</p>
                    <h4 className="text-3xl md:text-5xl font-serif text-[#3F57A6] mb-4">× 张大碗子</h4>
                    <p className="text-sm md:text-base text-[#2C3E50]/80 leading-relaxed max-w-sm md:ml-auto">策划并发布对话余华深度 Vlog，以年轻视角消解严肃文学壁垒，内容持续长尾发酵。</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* 3. 小宇宙播客 (Left) */}
            <FadeIn delay={300} className="relative z-30 mb-12 md:mb-16">
              <div className="flex flex-col md:flex-row items-center relative group mt-16 md:mt-4 justify-center md:justify-start">
                <div className="w-full md:w-5/12 max-w-[280px] aspect-square bg-white rounded-2xl shadow-xl overflow-hidden relative flex-shrink-0 border border-[#3F57A6]/5 flex flex-col justify-between p-6 md:p-8 cursor-pointer" onClick={() => window.open('https://www.xiaoyuzhoufm.com/episode/67590f79d461a2cd6bb407f8', '_blank')}>
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-full bg-[#F4F1EA] text-[#3F57A6] flex items-center justify-center shadow-inner"><Headphones size={20} /></div>
                  </div>
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-3"><span className="text-xs font-bold text-[#2C3E50]">Vol.102 对话余华</span></div>
                    <div className="flex justify-center gap-6 items-center text-[#3F57A6]">
                      <div className="w-12 h-12 rounded-full bg-[#3F57A6] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer" onClick={(e) => { e.stopPropagation(); togglePlay('podcast'); }}>
                        {playingStates.podcast ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1" />}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-7/12 pt-8 md:pt-0 md:-ml-8 z-40">
                  <div className="bg-[#E4EAEF]/90 md:bg-transparent p-6 md:p-0 backdrop-blur-sm md:backdrop-blur-none">
                    <p className="text-[10px] font-bold tracking-widest text-[#3F57A6]/60 mb-2 uppercase">Podcast Ecosystem</p>
                    <h4 className="text-3xl md:text-5xl font-serif text-[#3F57A6] mb-4">× 小宇宙播客</h4>
                    <p className="text-sm md:text-base text-[#2C3E50]/80 leading-relaxed max-w-md">联动《随机波动》等头部播客，以声音媒介精准击穿高净值文化圈层人群。</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* 4. 风尚志 (Right) */}
            <FadeIn delay={400} className="relative z-40 mb-12 md:mb-16">
              <div className="flex flex-col md:flex-row-reverse items-center relative group mt-16 md:mt-4 justify-center md:justify-start">
                <div className="w-full md:w-6/12 relative flex gap-3 md:gap-5 justify-end pl-4 md:pl-0">
                   <ZoomableImage src="/images/风尚志1.png" className="w-1/3 aspect-[3/4] rounded-sm mt-8 shadow-md" textFallback="大片1" bg="bg-[#D9E2E8]" />
                   <ZoomableImage src="/images/风尚志2.png" className="w-1/3 aspect-[3/4] rounded-sm z-10 transform -translate-y-4 shadow-xl" textFallback="大片2" bg="bg-[#C5D3DD]" />
                   <ZoomableImage src="/images/风尚志3.png" className="w-1/3 aspect-[3/4] rounded-sm mt-12 shadow-md" textFallback="大片3" bg="bg-[#D9E2E8]" />
                </div>
                <div className="w-full md:w-6/12 pt-8 md:pt-0 md:-mr-8 z-50 text-left md:text-right flex flex-col items-start md:items-end">
                  <div className="bg-[#E4EAEF]/90 md:bg-transparent p-6 md:p-0 backdrop-blur-sm md:backdrop-blur-none">
                    <p className="text-[10px] font-bold tracking-[0.2em] text-[#3F57A6]/60 mb-2 uppercase">Print Media</p>
                    <h4 className="text-3xl md:text-5xl font-serif text-[#3F57A6] mb-4">×《风尚志》</h4>
                    <p className="text-sm md:text-base text-[#2C3E50]/80 leading-relaxed max-w-sm md:ml-auto">文化名家首次集体登上时尚杂志实体封面，完成年度最具突破性的高规格拍摄企划。</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* 5. 新世相 (Left) */}
            <FadeIn delay={500} className="relative z-50">
              <div className="flex flex-col md:flex-row items-center relative group mt-16 md:mt-12 justify-center md:justify-start">
                 <div className="w-full md:w-5/12 max-w-[280px] md:max-w-[320px] relative flex-shrink-0">
                    <ZoomableImage src="/images/岛屿来信.png" className="w-full aspect-[4/3] rounded-sm shadow-lg hover:z-50" textFallback="新世相岛屿来信" bg="bg-[#D9E2E8]" />
                 </div>
                 <div className="w-full md:w-7/12 pt-8 md:pt-0 md:-ml-8 z-50">
                    <div className="bg-[#E4EAEF]/90 md:bg-transparent p-6 md:p-0 backdrop-blur-sm md:backdrop-blur-none">
                      <p className="text-[10px] font-bold tracking-widest text-[#3F57A6]/60 mb-2 uppercase">Interactive PR</p>
                      <h4 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#3F57A6] mb-4">× 新世相互动营销</h4>
                      <p className="text-sm md:text-base text-[#2C3E50]/80 leading-relaxed max-w-md">活动现场特设「岛屿来信角」，以极低成本撬动线上线下的高流量 UGC 情感传播。</p>
                    </div>
                 </div>
              </div>
            </FadeIn>
          </div>

          {/* --- IP 价值赋能 --- */}
          <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 pt-20 pb-12">
            <FadeIn>
              <div className="mb-10 text-center md:text-left">
                <h3 className="text-3xl md:text-4xl font-serif text-[#3F57A6] mb-2">IP 价值赋能</h3>
                <p className="text-sm text-[#3F57A6]/70 uppercase tracking-widest font-serif italic">PR Events & Ecosystem</p>
              </div>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto md:mx-0">
              <FadeIn delay={100} className="col-span-1 flex h-full">
                <div className="w-full group flex flex-col h-full bg-[#F4F1EA] p-6 md:p-8 rounded-sm shadow-sm border border-white/50 hover:shadow-xl transition-shadow cursor-zoom-in" onClick={() => setLightboxData({ src: "/images/希腊使馆.png", text: "希腊使馆大图" })}>
                  <div className="aspect-[4/3] bg-[#D9E2E8] mb-6 relative overflow-hidden rounded-sm flex items-center justify-center text-[#3F57A6]/40 text-xs">
                     <img src="/images/希腊使馆.png" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="希腊使馆" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <p className="text-[10px] font-bold tracking-widest text-[#3F57A6] mb-2 uppercase">Authority Endorsement</p>
                    <h4 className="text-xl font-serif text-[#3F57A6] mb-3">开播媒体见面会 <span className="text-base text-[#3F57A6]/50 mx-1">×</span> 希腊驻华使馆</h4>
                    <p className="text-sm text-[#2C3E50]/70 leading-relaxed mt-auto">联合落地高规格媒体见面会，大使亲自出席致辞，登央视《晚间新闻》。</p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={200} className="col-span-1 flex h-full">
                <div className="w-full group flex flex-col h-full bg-[#F4F1EA] p-6 md:p-8 rounded-sm shadow-sm border border-white/50 hover:shadow-xl transition-shadow cursor-zoom-in" onClick={() => setLightboxData({ src: "/images/北大沙龙.png", text: "北大沙龙大图" })}>
                  <div className="aspect-[4/3] bg-[#C5D3DD] mb-6 relative overflow-hidden rounded-sm flex items-center justify-center text-[#3F57A6]/40 text-xs">
                    <img src="/images/北大沙龙.png" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="北大沙龙" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <p className="text-[10px] font-bold tracking-widest text-[#3F57A6] mb-2 uppercase">Academic Depth</p>
                    <h4 className="text-xl font-serif text-[#3F57A6] mb-3">节目主题沙龙 <span className="text-base text-[#3F57A6]/50 mx-1">×</span> 北京大学</h4>
                    <p className="text-sm text-[#2C3E50]/70 leading-relaxed mt-auto">与北大影视戏剧研究中心共建“批评家周末”文艺沙龙活动，拔高项目学术与文艺调性。</p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={300} className="col-span-1 md:col-span-2 flex h-full">
                <div className="w-full group flex flex-col bg-[#F4F1EA] p-6 md:p-8 rounded-sm shadow-sm border border-white/50 hover:shadow-xl transition-shadow">
                  <div className="grid grid-cols-4 gap-3 md:gap-6 mb-6">
                    <ZoomableImage src="/images/岛屿周边1.jpg" className="w-full aspect-[3/4] rounded-sm" textFallback="周边图 1" bg="bg-[#D9E2E8]" />
                    <ZoomableImage src="/images/岛屿周边2.jpg" className="w-full aspect-[3/4] rounded-sm" textFallback="周边图 2" bg="bg-[#C5D3DD]" />
                    <ZoomableImage src="/images/岛屿周边3.jpg" className="w-full aspect-[3/4] rounded-sm" textFallback="周边图 3" bg="bg-[#D9E2E8]" />
                    <ZoomableImage src="/images/岛屿周边4.jpg" className="w-full aspect-[3/4] rounded-sm" textFallback="周边图 4" bg="bg-[#C5D3DD]" />
                  </div>
                  <div className="flex-1 flex flex-col text-left">
                    <p className="text-[10px] font-bold tracking-widest text-[#3F57A6] mb-2 uppercase">IP Merchandise</p>
                    <h4 className="text-xl font-serif text-[#3F57A6] mb-3">官方周边文创开发 <span className="text-base text-[#3F57A6]/50 mx-1">×</span> IP 衍生品</h4>
                    <p className="text-sm text-[#2C3E50]/70 leading-relaxed max-w-3xl">自主主导开发帆布袋、冰箱贴等 4 款官方 SKU，不仅丰富了 IP 生态，更成为营销期间的强力社交抓手。</p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>

        {/* --- 多品类内容IP策划 --- */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 pt-32 pb-10">
          <FadeIn>
            <div className="flex items-end gap-4 mb-12">
              <div>
                <h3 className="text-3xl font-serif text-[#3F57A6] mb-1">多品类内容IP策划</h3>
                <p className="text-[10px] tracking-[0.2em] text-[#3F57A6]/60 uppercase font-serif italic">Content IP Strategy</p>
              </div>
              <div className="flex-1 h-px bg-[#3F57A6]/10 mb-3"></div>
            </div>
          </FadeIn>
          
          {/* ==========================================
              展示模块一：《头条讲真的》
          ========================================== */}
          <FadeIn delay={100}>
            <div className="border-t-2 border-[#3F57A6] pt-12 mb-24 flex flex-col gap-12 relative">
              <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-start">
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="flex items-center bg-white/60 border border-[#3F57A6]/20 rounded-full pl-1 pr-4 py-1 shadow-sm">
                       <div className="w-6 h-6 rounded-full bg-[#3F57A6] text-[#F4F1EA] flex items-center justify-center mr-2 shadow-md">
                          <span className="text-[10px] font-serif italic pr-0.5">I</span>
                       </div>
                       <span className="text-[11px] tracking-[0.2em] text-[#3F57A6] font-bold">创意科普</span>
                    </div>
                    <div className="w-8 h-px bg-[#3F57A6]/20"></div>
                    <span className="text-[10px] tracking-[0.25em] text-[#3F57A6]/60 font-serif uppercase font-bold">Creative Science</span>
                  </div>
                  
                  <h4 className="text-4xl md:text-5xl font-serif text-[#3F57A6] mb-4 tracking-tight">《头条讲真的》</h4>
                  <p className="text-sm md:text-base text-[#2C3E50]/80 leading-relaxed mb-8">
                    通过短剧、创意歌曲等形式覆盖反诈、医疗、财经等领域，打造“硬核科普+正向治理”标杆，迭代四季。
                  </p>
                  <div className="flex flex-wrap gap-x-6 gap-y-6 border-l-2 border-[#3F57A6]/20 pl-5">
                     <div><div className="text-2xl md:text-3xl font-serif text-[#3F57A6] font-bold">36<span className="text-sm md:text-lg text-[#3F57A6]/70">亿+</span></div><div className="text-[10px] tracking-widest text-[#3F57A6]/60 uppercase mt-1">话题讨论量</div></div>
                     <div><div className="text-2xl md:text-3xl font-serif text-[#3F57A6] font-bold">20<span className="text-sm md:text-lg text-[#3F57A6]/70">+</span></div><div className="text-[10px] tracking-widest text-[#3F57A6]/60 uppercase mt-1">站外热搜上榜</div></div>
                     <div><div className="text-2xl md:text-3xl font-serif text-[#3F57A6] font-bold">30<span className="text-sm md:text-lg text-[#3F57A6]/70">+</span></div><div className="text-[10px] tracking-widest text-[#3F57A6]/60 uppercase mt-1">权威机构</div></div>
                     <div><div className="text-2xl md:text-3xl font-serif text-[#3F57A6] font-bold">20<span className="text-sm md:text-lg text-[#3F57A6]/70">+</span></div><div className="text-[10px] tracking-widest text-[#3F57A6]/60 uppercase mt-1">头部创作者</div></div>
                     <div><div className="text-2xl md:text-3xl font-serif text-[#3F57A6] font-bold">50<span className="text-sm md:text-lg text-[#3F57A6]/70">+</span></div><div className="text-[10px] tracking-widest text-[#3F57A6]/60 uppercase mt-1">条共创内容</div></div>
                  </div>
                </div>

                {/* 演讲视频直接内嵌播放 */}
                <div className="w-40 md:w-56 lg:w-64 shrink-0 aspect-[9/16] bg-gray-900 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden relative group md:mt-2">
                  {!playKeynote ? (
                    <div className="absolute inset-0 cursor-pointer" onClick={() => setPlayKeynote(true)}>
                      <img src="/images/讲真的2023-1.png" alt="演讲高光封面" className="absolute inset-0 w-full h-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors z-10"></div>
                      <div className="absolute inset-0 flex items-center justify-center z-20">
                        <div className="w-14 h-14 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center group-hover:bg-[#3F57A6] transition-colors shadow-sm scale-90 group-hover:scale-100">
                          <Play size={20} fill="currentColor" className="text-white ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-4 w-full text-center z-20">
                        <span className="text-[11px] text-white/90 tracking-widest font-medium drop-shadow-md border-b border-white/40 pb-1 uppercase">负责人宣讲实录</span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-black relative">
                      <video src="/images/演讲视频.mp4" autoPlay controls playsInline className="w-full h-full object-cover" />
                      <button className="absolute top-2 right-2 z-30 bg-black/50 p-2 rounded-full cursor-pointer hover:bg-[#3F57A6] text-white" onClick={(e) => { e.stopPropagation(); setPlayKeynote(false); }}>
                         <X size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full overflow-hidden mt-4">
                <div className="flex gap-8 mb-4 border-b border-[#3F57A6]/10 pb-4 overflow-x-auto scrollbar-hide">
                  {seasons.map(s => (
                    <button key={s} onClick={() => setJiangZhenDeSeason(s)} className={`text-xs font-serif tracking-widest uppercase whitespace-nowrap transition-colors ${jiangZhenDeSeason === s ? 'text-[#3F57A6] font-bold' : 'text-[#2C3E50]/40 hover:text-[#3F57A6]/70'}`}>{s}</button>
                  ))}
                </div>
                <p className="text-sm font-serif text-[#3F57A6] italic mb-8 border-l-2 border-[#3F57A6]/30 pl-4 transition-all duration-300">
                  {JIANG_ZHEN_DE_DATA[jiangZhenDeSeason].desc}
                </p>
                <div className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide pt-4 px-2 -mx-2">
                  {JIANG_ZHEN_DE_DATA[jiangZhenDeSeason].items.map((item, idx) => (
                     <div key={idx} className="w-[240px] md:w-[260px] aspect-[3/4] shrink-0 snap-center shadow-md rounded-xl overflow-hidden group cursor-zoom-in relative bg-[#EAE5DB] border border-[#3F57A6]/5" onClick={() => setLightboxData({ src: item.img, text: item.title })}>
                         {item.img ? (
                           <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         ) : (
                           <div className="absolute inset-0 flex items-center justify-center text-[#3F57A6]/40 text-xs text-center p-4">
                             [Image: {item.title}]
                           </div>
                         )}
                         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
                           <div className="bg-white/80 p-3 rounded-full backdrop-blur-sm shadow-lg">
                             <ZoomIn className="text-[#3F57A6] w-5 h-5" />
                           </div>
                         </div>
                     </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* ==========================================
              展示模块二：《头条见一面》
          ========================================== */}
          <FadeIn delay={200}>
            <div className="border-t-2 border-slate-700 pt-12 mb-24 flex flex-col md:flex-row gap-8 md:gap-12 items-start">
              
              <div className="w-full md:w-[45%] shrink-0 flex flex-col justify-start pr-0 md:pr-6">
                <div className="flex items-center gap-4 mb-5">
                  <div className="flex items-center bg-white/60 border border-slate-800/20 rounded-full pl-1 pr-4 py-1 shadow-sm">
                     <div className="w-6 h-6 rounded-full bg-slate-800 text-[#F4F1EA] flex items-center justify-center mr-2 shadow-md"><span className="text-[10px] font-serif italic pr-0.5">II</span></div>
                     <span className="text-[11px] tracking-[0.2em] text-slate-800 font-bold">人文纪实</span>
                  </div>
                  <div className="w-8 h-px bg-slate-800/20"></div>
                  <span className="text-[10px] tracking-[0.25em] text-slate-500 font-serif uppercase font-bold">Human Documentary</span>
                </div>

                <h4 className="text-4xl md:text-5xl font-serif text-slate-800 mb-6 tracking-tight">《头条见一面》</h4>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed font-medium mb-10">联动22家顶级媒体，在对话中看见真实，用人文纪实刻画时代面孔。</p>

                <div className="flex flex-wrap gap-x-10 gap-y-6 pt-2 pb-10 border-b border-slate-200 w-full mb-8">
                   <div><div className="text-3xl font-serif text-slate-800 font-bold">20<span className="text-xl text-slate-600">亿+</span></div><div className="text-[10px] tracking-widest text-slate-500 uppercase mt-1">全网总曝光</div></div>
                   <div><div className="text-3xl font-serif text-slate-800 font-bold">50<span className="text-xl text-slate-600">+</span></div><div className="text-[10px] tracking-widest text-slate-500 uppercase mt-1">站外热搜霸榜</div></div>
                   <div><div className="text-3xl font-serif text-slate-800 font-bold">40<span className="text-xl text-slate-600">期+</span></div><div className="text-[10px] tracking-widest text-slate-500 uppercase mt-1">全年上线内容</div></div>
                </div>

                <div className="relative min-h-[100px]">
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#3F57A6] rounded-full opacity-80"></div>
                  <div key={activeJymIndex} className="animate-in fade-in slide-in-from-left-2 duration-500 pl-5 py-1">
                    <h5 className="text-[15px] font-bold text-slate-800 mb-2 uppercase tracking-widest">{JIAN_YI_MIAN_POSTERS[activeJymIndex].title}</h5>
                    <p className="text-[13px] text-slate-500 leading-relaxed max-w-sm">{JIAN_YI_MIAN_POSTERS[activeJymIndex].desc}</p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-[55%] flex items-center justify-center md:justify-end min-h-[450px] md:min-h-[500px] relative perspective-1000 mt-12 md:mt-0 z-10 overflow-visible">
                 <div className="relative w-[260px] aspect-[9/16] transform-style-3d md:mr-16">
                    {JIAN_YI_MIAN_POSTERS.map((item, index) => {
                       let offset = (index - activeJymIndex) % JIAN_YI_MIAN_POSTERS.length;
                       if (offset < 0) offset += JIAN_YI_MIAN_POSTERS.length;
                       let zIndex = 50 - offset;
                       let translateX = offset * 85; 
                       let translateZ = offset * -120; 
                       let opacity = offset > 2 ? 0 : 1 - (offset * 0.2);

                       return (
                         <div key={item.id} onClick={() => setActiveJymIndex(index)} className={`absolute top-0 left-0 w-full h-full rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group ${offset === 0 ? 'hover:scale-[1.02]' : ''}`} style={{ transform: `translateX(${translateX}px) translateZ(${translateZ}px)`, zIndex: zIndex, opacity: opacity }}>
                            <div className="w-full h-full bg-[#EAE5DB] flex flex-col items-center justify-center relative border border-white/20">
                               {item.img ? (
                                 <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
                               ) : (
                                 <div className="absolute inset-0 bg-slate-800 flex flex-col items-center justify-center text-white/30 text-sm">
                                   <span className="mb-2">[{item.title}]</span><span className="text-[10px]">[Image: {item.posterFallback}]</span>
                                 </div>
                               )}
                               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none"></div>
                               <div className="absolute bottom-6 left-6 z-20"><span className="bg-white/95 text-slate-800 text-[10px] font-bold px-4 py-2 rounded-sm tracking-widest shadow-lg uppercase">{item.tag}</span></div>
                               {offset === 0 && (
                                 <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 flex flex-col items-center justify-center backdrop-blur-sm" onClick={(e) => { e.stopPropagation(); window.open(item.link, '_blank'); }}>
                                   <div className="w-14 h-14 rounded-full bg-white text-slate-900 flex items-center justify-center mb-4 transform scale-75 group-hover:scale-100 transition-transform duration-500 shadow-xl"><ExternalLink size={20} className="-mr-0.5" /></div>
                                   <span className="text-white text-[11px] font-bold tracking-widest uppercase border-b border-white/40 pb-1">前往抖音观看正片</span>
                                 </div>
                               )}
                            </div>
                         </div>
                       )
                    })}
                 </div>
                 <div className="absolute -bottom-10 left-1/2 md:left-auto md:right-32 -translate-x-1/2 md:translate-x-0 flex items-center gap-2 text-slate-400 text-[10px] tracking-widest font-bold uppercase mt-8 md:mt-0"><PlayCircle size={14} /> 点击后方海报进行切换</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ==========================================
          CHAPTER 2: 跨平台渠道共建
      ========================================== */}
      <section id="channel-coop" className="py-24 px-6 md:px-12 bg-[#EAE5DB] border-t border-[#3F57A6]/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-serif mb-2 text-[#3F57A6]">跨平台渠道共建</h2>
              <p className="text-sm tracking-widest text-[#3F57A6]/70 uppercase font-serif italic">Cross-Platform Synergy</p>
            </div>
          </FadeIn>

          <FadeIn delay={100} className="mb-16">
            <div className="bg-[#3F57A6] rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden flex flex-col lg:flex-row gap-12 items-center">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
              <div className="flex-1 relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-white/20 text-white text-[11px] px-3 py-1 rounded-full tracking-widest font-bold backdrop-blur-sm border border-white/10">全网分发</span>
                  <span className="text-white/50 text-[10px] font-bold tracking-widest uppercase">Cross-Platform</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-serif text-white mb-6 tracking-tight">构建「头条出品-全网分发」渠道建设</h3>
                <p className="text-sm md:text-[15px] text-white/80 leading-relaxed font-medium max-w-xl">
                  让好内容自己长脚。重塑头条的全网分发机制，建立超 <span className="text-white font-bold bg-white/20 px-1 rounded">30+ 超头部 KOL</span> 的定制共创池，撬动 40 亿+ 跨平台流量。
                </p>
              </div>
              <div className="shrink-0 flex gap-8 relative z-10 lg:pl-12 lg:border-l border-white/20 w-full lg:w-auto">
                 <div><div className="text-4xl md:text-5xl font-serif text-orange-400 font-bold mb-1">40<span className="text-2xl text-orange-300">亿+</span></div><div className="text-[11px] tracking-widest text-white/60 uppercase mt-2 font-bold">累计站外曝光</div></div>
                 <div><div className="text-4xl md:text-5xl font-serif text-orange-400 font-bold mb-1">30<span className="text-2xl text-orange-300">+</span></div><div className="text-[11px] tracking-widest text-white/60 uppercase mt-2 font-bold">头部博主共创</div></div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="bg-[#FFFDF8] rounded-3xl p-8 md:p-12 shadow-sm border border-[#3F57A6]/5">
               <div className="flex flex-col lg:flex-row gap-8 mb-10 lg:items-end justify-between">
                 <div className="flex-1 max-w-2xl">
                    <div className="flex items-center gap-3 mb-4"><span className="text-[#3F57A6] text-[10px] tracking-[0.3em] font-bold uppercase border-b border-[#3F57A6]/30 pb-1">TV & Network</span></div>
                    <h3 className="text-3xl md:text-4xl font-serif text-[#2C3E50] mb-4 tracking-tight">台网联动体系搭建</h3>
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed font-medium">从 0 到 1 拓展广东卫视、深圳卫视等 20+ 省级卫视合作，推动 69 档节目内容与 100+ 创作者上屏，提升台端用户美誉度。</p>
                 </div>
                 <div className="flex gap-6 shrink-0 lg:border-l-2 border-[#3F57A6]/10 lg:pl-8">
                     <div><div className="text-2xl font-serif text-[#3F57A6] font-bold">20<span className="text-lg text-[#3F57A6]/70">+</span></div><div className="text-[10px] tracking-widest text-slate-500 uppercase mt-1">省级卫视合作</div></div>
                     <div><div className="text-2xl font-serif text-[#3F57A6] font-bold">69<span className="text-lg text-[#3F57A6]/70">档</span></div><div className="text-[10px] tracking-widest text-slate-500 uppercase mt-1">节目内容上屏</div></div>
                     <div><div className="text-2xl font-serif text-[#3F57A6] font-bold">100<span className="text-lg text-[#3F57A6]/70">+</span></div><div className="text-[10px] tracking-widest text-slate-500 uppercase mt-1">创作者上屏</div></div>
                 </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-6 gap-3 md:gap-4">
                 <div className="md:col-span-3 aspect-video rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"><ZoomableImage src="/images/台网合作1.png" textFallback="台网联动案例 1" className="w-full h-full transform group-hover:scale-[1.02] transition-transform duration-500" bg="bg-[#D9E2E8]" /></div>
                 <div className="md:col-span-3 aspect-video rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"><ZoomableImage src="/images/台网合作2.png" textFallback="台网联动案例 2" className="w-full h-full transform group-hover:scale-[1.02] transition-transform duration-500" bg="bg-[#C5D3DD]" /></div>
                 <div className="md:col-span-2 aspect-video rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"><ZoomableImage src="/images/台网合作3.png" textFallback="台网联动案例 3" className="w-full h-full transform group-hover:scale-[1.02] transition-transform duration-500" bg="bg-[#EAE5DB]" /></div>
                 <div className="md:col-span-2 aspect-video rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"><ZoomableImage src="/images/台网合作4.png" textFallback="台网联动案例 4" className="w-full h-full transform group-hover:scale-[1.02] transition-transform duration-500" bg="bg-[#D9E2E8]" /></div>
                 <div className="md:col-span-2 aspect-video rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"><ZoomableImage src="/images/台网合作5.png" textFallback="台网联动案例 5" className="w-full h-full transform group-hover:scale-[1.02] transition-transform duration-500" bg="bg-[#C5D3DD]" /></div>
               </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ==========================================
          CHAPTER 3: 跨界与联名营销
      ========================================== */}
      <section id="co-branding" className="py-24 px-6 md:px-12 bg-[#F9F6F0] border-y border-[#3F57A6]/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-serif mb-2 text-[#3F57A6]">跨界与联名营销</h2>
              <p className="text-sm tracking-widest text-[#3F57A6]/70 uppercase font-serif italic">Co-Branding & Campaigns</p>
            </div>
          </FadeIn>

          {/* 旺旺 */}
          <FadeIn delay={100} className="mb-12">
            <div className="bg-[#FFFDF8] rounded-3xl p-8 md:p-10 shadow-xl border border-red-100 overflow-hidden relative">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-red-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-orange-50 rounded-full blur-3xl opacity-40 pointer-events-none"></div>

              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative z-10 items-center">
                <div className="w-full lg:w-[45%] flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="bg-red-500 text-white text-[11px] px-3 py-1 rounded-full tracking-widest font-bold shadow-md">头等旺事</span>
                    <span className="text-red-400 text-[10px] font-bold tracking-widest uppercase">Toutiao × Hotkid</span>
                  </div>
                  <h3 className="text-4xl font-serif text-slate-800 mb-6 tracking-tight">今日头条 <span className="text-red-500 mx-2">×</span> 旺旺</h3>
                  <div className="flex flex-col md:flex-row gap-6 items-start bg-white/50 p-6 rounded-2xl border border-red-50 shadow-sm backdrop-blur-sm">
                     <div className="flex-1">
                        <p className="text-sm md:text-[15px] text-slate-800 leading-relaxed font-serif font-bold mb-3">今日头条首次联名活动，携手国民品牌旺旺推出高考季限定款牛奶及“头等旺事福袋”周边。</p>
                        <p className="text-xs text-slate-500 leading-loose">推出 8 款限定职业罐 / 利乐包、5 款周边，将礼盒外包装设计成 “录取通知书” 的样式。通过官号、博主、MCN 等多渠道传播，线上线下全面联动，扩大活动的影响力。</p>
                     </div>
                     <div className="shrink-0 flex flex-row md:flex-col gap-5 md:pl-6 md:border-l border-red-100/80 w-full md:w-auto">
                         <div><div className="text-xl font-serif text-slate-800 font-bold">1万<span className="text-sm text-red-500">+</span></div><div className="text-[9px] tracking-widest text-slate-500 uppercase mt-0.5">知名KA商超</div></div>
                         <div><div className="text-xl font-serif text-slate-800 font-bold">100<span className="text-sm text-red-500">+</span></div><div className="text-[9px] tracking-widest text-slate-500 uppercase mt-0.5">KOL共创传播</div></div>
                         <div><div className="text-xl font-serif text-slate-800 font-bold">1亿<span className="text-sm text-red-500">+</span></div><div className="text-[9px] tracking-widest text-slate-500 uppercase mt-0.5">累计互动量</div></div>
                     </div>
                  </div>
                </div>

                {/* --- Bento Grid 便当盒排版开始 --- */}
                <div className="w-full lg:w-[55%] h-[400px] md:h-[480px] flex gap-3 md:gap-4 relative z-10 mt-8 lg:mt-0">
                  {/* 左侧大竖条：视频 1 (周边开箱) */}
                  <div className="w-[45%] h-full rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(220,38,38,0.15)] relative border-2 border-white group bg-red-50">
                    <video src="/images/旺仔周边视频.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1.5 rounded-lg text-[9px] text-red-600 font-bold tracking-widest shadow-sm border border-red-100">实体周边大赏</div>
                  </div>
                  
                  {/* 右侧堆叠区域 */}
                  <div className="w-[55%] h-full flex flex-col gap-3 md:gap-4">
                     {/* 右上横版：视频 2 (旺仔动画) */}
                     <div className="h-[55%] w-full rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(220,38,38,0.1)] relative border-2 border-white group bg-yellow-50">
                       <video src="/images/旺仔牛奶.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                       <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1.5 rounded-lg text-[9px] text-yellow-600 font-bold tracking-widest shadow-sm border border-yellow-200">联名概念动画</div>
                     </div>
                     
                     {/* 右下双格：静态素材图 */}
                     <div className="h-[45%] w-full flex gap-3 md:gap-4">
                       {/* 图 A: 互动包装盒 */}
                       <div className="w-1/2 h-full rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(220,38,38,0.1)] relative border-2 border-white group cursor-zoom-in bg-orange-50" onClick={() => setLightboxData({ src: '/images/旺仔展示.gif', text: '互动包装盒' })}>
                         <img src="/images/旺仔展示.gif" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="包装盒" />
                         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                           <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity w-5 h-5" />
                         </div>
                       </div>
                       {/* 图 B: 联名海报 */}
                       <div className="w-1/2 h-full rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(220,38,38,0.1)] relative border-2 border-white group cursor-zoom-in bg-red-100" onClick={() => setLightboxData({ src: '/images/旺仔主题海报.jpeg', text: '联名海报' })}>
                         <img src="/images/旺仔主题海报.jpeg" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="联名海报" />
                         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                           <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity w-5 h-5" />
                         </div>
                       </div>
                     </div>
                  </div>
                </div>
                {/* --- Bento Grid 结束 --- */}
              </div>

              {/* 跑马灯保持不变 */}
              <div className="mt-8 pt-6 border-t border-red-100/50 overflow-hidden relative z-10 group/marquee">
                <p className="text-[9px] tracking-[0.2em] text-red-400/80 font-bold uppercase mb-4 flex items-center gap-4">
                  <span className="w-8 h-px bg-red-200"></span>8款限定职业罐<span className="w-8 h-px bg-red-200"></span>
                </p>
                <div className="flex gap-4 md:gap-6 px-2 items-center w-max animate-marquee hover:[animation-play-state:paused] cursor-pointer">
                   {[...Array(16)].map((_, i) => (
                      <div key={i} className="shrink-0 w-16 h-24 md:w-20 md:h-28 bg-white rounded-xl border border-red-100 shadow-sm flex items-center justify-center hover:scale-110 hover:border-red-400 hover:shadow-md transition-all duration-300 overflow-hidden p-1">
                         <img src={`/images/旺仔包装${i % 8 + 1}.png`} alt={`罐 ${i % 8 + 1}`} className="w-full h-full object-contain" />
                      </div>
                   ))}
                </div>
              </div>

            </div>
          </FadeIn>

          {/* 红山 */}
          <FadeIn delay={200} className="mb-12">
            <div className="bg-[#F2F6F3] rounded-3xl p-8 md:p-12 lg:p-16 shadow-sm border border-green-900/5 overflow-hidden relative flex flex-col justify-center min-h-[380px] md:min-h-[460px]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-serif text-green-900/[0.03] whitespace-nowrap select-none font-bold tracking-tighter pointer-events-none z-0">HONGSHAN</div>
              <div className="relative z-10 w-full md:w-1/2 max-w-lg flex flex-col">
                <div className="flex items-center gap-3 mb-4"><span className="text-green-800 text-[10px] tracking-[0.3em] font-bold uppercase border-b border-green-800/50 pb-1">Cross-over</span></div>
                <h3 className="text-4xl md:text-5xl font-serif text-slate-800 mb-5 tracking-tight leading-tight">
                  <span className="block text-2xl md:text-3xl text-slate-500 mb-2 font-light tracking-normal">今日头条</span><span className="italic text-green-700 font-medium mr-2">×</span>红山动物园
                </h3>
                <p className="text-sm md:text-[15px] text-slate-600 leading-loose font-medium max-w-sm">联动动物园届顶流——红山动物园，共创趣味解读科普视频，动物园园区大屏内滚动播放，覆盖75万人次。</p>
              </div>

              <div className="hidden md:block absolute inset-0 pointer-events-none z-20">
                 <div className="absolute right-[8%] top-[15%] w-32 lg:w-40 aspect-square rounded-xl shadow-md transform rotate-3 overflow-hidden pointer-events-auto hover:z-50 hover:scale-105 transition-all duration-500 border border-white/50"><ZoomableImage src="/images/红山动物园1.jpg" textFallback="红山打卡照" className="w-full h-full" bg="bg-green-100" /></div>
                 <div className="absolute right-[25%] bottom-[12%] w-40 lg:w-48 aspect-[3/4] rounded-xl shadow-xl transform -rotate-6 overflow-hidden pointer-events-auto hover:z-50 hover:scale-105 transition-all duration-500 border-4 border-white"><ZoomableImage src="/images/红山动物园2.jpg" textFallback="考拉大屏" className="w-full h-full" bg="bg-green-200" /></div>
                 <div className="absolute right-[-2%] top-[45%] w-36 lg:w-44 aspect-video rounded-xl shadow-lg transform -rotate-2 overflow-hidden pointer-events-auto hover:z-50 hover:scale-105 transition-all duration-500 border-2 border-white"><ZoomableImage src="/images/红山动物园3.png" textFallback="园区实况" className="w-full h-full" bg="bg-emerald-100" /></div>
              </div>

              <div className="flex md:hidden w-full overflow-x-auto snap-x snap-mandatory gap-4 pt-12 pb-4 scrollbar-hide relative z-20">
                <div className="shrink-0 w-48 aspect-[3/4] rounded-xl shadow-lg snap-center overflow-hidden border-2 border-white"><ZoomableImage src="/images/红山动物园2.jpg" textFallback="考拉大屏" className="w-full h-full" bg="bg-green-200" /></div>
                <div className="shrink-0 w-40 aspect-square rounded-xl shadow-md snap-center overflow-hidden border border-white"><ZoomableImage src="/images/红山动物园1.jpg" textFallback="红山打卡照" className="w-full h-full" bg="bg-green-100" /></div>
                <div className="shrink-0 w-48 aspect-video rounded-xl shadow-md snap-center overflow-hidden border border-white"><ZoomableImage src="/images/红山动物园3.png" textFallback="园区实况" className="w-full h-full" bg="bg-emerald-100" /></div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ==========================================
          CHAPTER 4: 娱乐生态整合
      ========================================== */}
      <section id="entertainment" className="py-24 px-6 md:px-12 bg-[#F4F1EA] relative border-t border-[#3F57A6]/10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-serif mb-2 text-[#3F57A6]">娱乐生态整合</h2>
              <p className="text-sm tracking-widest text-[#3F57A6]/70 uppercase font-serif italic mb-6">Entertainment Ecology</p>
              <p className="text-sm md:text-base text-[#2C3E50]/80 font-medium border-l-2 border-[#3F57A6]/30 pl-4 max-w-xl">
                完成从单点项目合作到娱乐领域全生态合作的个人成长迭代。
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="mb-24">
               <div className="flex items-center gap-3 mb-6"><span className="text-[#3F57A6] text-[10px] tracking-[0.2em] font-bold uppercase border-b border-[#3F57A6]/30 pb-1">01 / 影视合作</span></div>
               <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-sm border border-[#3F57A6]/5 flex flex-col md:flex-row gap-12 items-center">
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-serif text-[#2C3E50] mb-4">影视生态合作深化</h3>
                    <p className="text-sm md:text-[15px] text-slate-600 leading-relaxed mb-6">与优爱腾芒达成深度平台合作，全面提升剧综项目引入效率。同时探索出用行业宣发费用反哺作者创作的新模式，形成良性闭环。</p>
                  </div>
                  <div className="shrink-0 flex flex-col sm:flex-row gap-8 md:pl-12 md:border-l border-[#3F57A6]/10 w-full md:w-auto">
                     <div className="flex flex-col"><span className="text-4xl md:text-5xl font-serif text-[#3F57A6] font-bold mb-1">90<span className="text-2xl md:text-3xl">%+</span></span><span className="text-[11px] tracking-widest text-slate-500 font-bold mt-2">项目合作率维稳</span></div>
                     <div className="flex flex-col"><span className="text-4xl md:text-5xl font-serif text-[#3F57A6] font-bold mb-1">1500<span className="text-2xl md:text-3xl">万+</span></span><span className="text-[11px] tracking-widest text-slate-500 font-bold mt-2">带来创作者收入</span></div>
                  </div>
               </div>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="mb-24">
               <div className="flex items-center gap-3 mb-8"><span className="text-[#A73C33] text-[10px] tracking-[0.2em] font-bold uppercase border-b border-[#A73C33]/30 pb-1">02 / 行业大事件</span></div>
               <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 h-auto">
                 <div className="bg-[#A73C33] rounded-3xl p-6 flex flex-col justify-between overflow-hidden relative group shadow-sm">
                    <div className="relative z-10 mb-6"><h4 className="text-[#F4F1EA] text-xl font-serif mb-1">FIRST 电影节</h4><p className="text-[#F4F1EA]/80 text-[11px] tracking-wider">合作超短片计划</p></div>
                    <div className="w-full aspect-[9/16] bg-black/20 rounded-2xl overflow-hidden shadow-inner transform group-hover:scale-105 transition-transform duration-500"><ZoomableImage src="/images/first.jpeg" textFallback="FIRST现场" className="w-full h-full opacity-90 mix-blend-overlay" /></div>
                 </div>
                 <div className="bg-[#FFFDF8] rounded-3xl p-6 flex flex-col justify-between overflow-hidden relative group border border-[#A73C33]/15 shadow-sm">
                    <div className="relative z-10 mb-6"><h4 className="text-[#A73C33] text-xl font-serif mb-1">金鸡电影节</h4><p className="text-slate-600 text-[11px] tracking-wider">开、闭幕式植入宣传片</p></div>
                    <div className="w-full aspect-[9/16] bg-[#F4F1EA] rounded-2xl overflow-hidden shadow-inner transform group-hover:scale-105 transition-transform duration-500"><ZoomableImage src="/images/金鸡.jpg" textFallback="金鸡宣传片" className="w-full h-full mix-blend-multiply opacity-80" /></div>
                 </div>
                 <div className="bg-[#A73C33] rounded-3xl p-6 flex flex-col justify-between overflow-hidden relative group shadow-sm">
                    <div className="relative z-10 mb-6"><h4 className="text-[#F4F1EA] text-xl font-serif mb-1">海南岛电影节</h4><p className="text-[#F4F1EA]/80 text-[11px] tracking-wider">官方影评团合作</p></div>
                    <div className="w-full aspect-[9/16] bg-black/20 rounded-2xl overflow-hidden shadow-inner transform group-hover:scale-105 transition-transform duration-500"><ZoomableImage src="/images/海南电影节.jpg" textFallback="海南影评团" className="w-full h-full opacity-90 mix-blend-overlay" /></div>
                 </div>
                 <div className="bg-[#FFFDF8] rounded-3xl p-6 flex flex-col justify-between overflow-hidden relative group border border-[#A73C33]/15 shadow-sm">
                    <div className="relative z-10 mb-6"><h4 className="text-[#A73C33] text-xl font-serif mb-1">上海电影节</h4><p className="text-slate-600 text-[11px] tracking-wider">平台作者参与官方刊物</p></div>
                    <div className="w-full aspect-[9/16] bg-[#F4F1EA] rounded-2xl overflow-hidden shadow-inner transform group-hover:scale-105 transition-transform duration-500"><ZoomableImage src="/images/上影节.jpg" textFallback="上影节刊物" className="w-full h-full mix-blend-multiply opacity-80" /></div>
                 </div>
               </div>
            </div>
          </FadeIn>

          <FadeIn delay={300}>
            <div>
               <div className="flex items-center gap-3 mb-8"><span className="text-[#C5A059] text-[10px] tracking-[0.2em] font-bold uppercase border-b border-[#C5A059]/30 pb-1">03 / 明星合作</span></div>
               <div className="flex flex-col gap-8">
                 <div className="w-full bg-[#1A110E] rounded-3xl overflow-hidden shadow-xl relative flex items-center min-h-[350px] md:min-h-[400px] group">
                    <div className="absolute inset-0 z-0"><img src="/images/实力派.png" alt="实力派群像" className="w-full h-full object-cover object-right transform group-hover:scale-[1.02] transition-transform duration-1000 ease-out" /></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1A110E] via-[#1A110E]/80 to-transparent z-10 w-full md:w-[75%]"></div>
                    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative z-20">
                       <span className="text-[#C5A059] border border-[#C5A059]/50 px-3 py-1 rounded-sm text-[10px] tracking-widest uppercase w-max mb-6">Phase 1</span>
                       <h4 className="text-3xl md:text-4xl font-serif text-[#F9F6F0] mb-4">实力派阶段</h4>
                       <p className="text-[#F9F6F0]/90 text-sm leading-relaxed mb-6">撕掉明星营业的套路化标签。用《实力派》内容IP撬动明星高频互动，并以‘极轻成本’实现上星台网同播，与巨量算数联合发布行业权威标杆。</p>
                       <p className="text-[#C5A059] text-[11px] md:text-xs font-bold tracking-widest border-l-2 border-[#C5A059] pl-3">《2023中国电视剧报告——国剧新时代》</p>
                    </div>
                 </div>

                 <div className="w-full bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-12 items-center">
                    <div className="w-full md:w-5/12">
                       <span className="text-[#3F57A6] border border-[#3F57A6]/30 px-3 py-1 rounded-sm text-[10px] tracking-widest uppercase w-max mb-6 inline-block">Phase 2</span>
                       <h4 className="text-3xl md:text-4xl font-serif text-slate-800 mb-4">明星名人专栏</h4>
                       <p className="text-slate-600 text-sm leading-relaxed">深耕独家内容生态，邀请郭德纲、蔡明、冯骥才等 20+ 位国民级明星名人入驻，独家发布深度专栏内容，打造稀缺内容壁垒。</p>
                    </div>
                    {/* 调整为上下堆叠的宽幅横幅比例（21:9） */}
                    <div className="w-full md:w-7/12 flex flex-col gap-4 md:gap-6">
                       <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden shadow-md border-2 border-white transform hover:-translate-y-2 transition-transform duration-300">
                          <ZoomableImage src="/images/郭德纲.jpeg" textFallback="郭德纲专栏" className="w-full h-full" imgClass="object-cover object-top" bg="bg-[#D9E2E8]" />
                       </div>
                       <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden shadow-md border-2 border-white transform hover:-translate-y-2 transition-transform duration-300">
                          <ZoomableImage src="/images/蔡明.jpeg" textFallback="蔡明专栏" className="w-full h-full" imgClass="object-cover object-top" bg="bg-[#EAE5DB]" />
                       </div>
                    </div>
                 </div>
               </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-12 px-6 border-t border-[#3F57A6]/20 flex flex-col items-center justify-center text-center bg-[#EAE5DB]">
        <p className="text-sm text-[#3F57A6] font-serif">© 2026 LIU SHANSHAN. All Rights Reserved.</p>
        <p className="text-xs text-[#3F57A6]/70 mt-2 mb-6 tracking-widest uppercase font-serif italic">Content x AI x Marketing</p>
        <div className="flex gap-6 text-[#3F57A6] text-xs font-serif tracking-widest">
            <Magnetic><a href="tel:13696796363" className="hover:opacity-50 transition-opacity block p-2">📱 13696796363</a></Magnetic>
            <Magnetic><a href="mailto:nolitaliu@126.com" className="hover:opacity-50 transition-opacity block p-2">📮 nolitaliu@126.com</a></Magnetic>
        </div>
      </footer>

      {/* --- AI 助手 --- */}
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-10 z-50 flex flex-col items-end pointer-events-none">
        {isChatOpen && (
          <div className="mb-6 w-[85vw] md:w-[420px] bg-[#F4F1EA] shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-[#3F57A6]/20 rounded-sm overflow-hidden flex flex-col h-[500px] animate-in slide-in-from-bottom-5 fade-in duration-500 pointer-events-auto origin-bottom-right">
            <div className="bg-[#EAE5DB] border-b border-[#3F57A6]/10 p-6 flex justify-between items-start relative overflow-hidden">
              <div className="absolute -right-4 -top-4 opacity-5 pointer-events-none"><MessageSquare size={120} /></div>
              <div className="relative z-10">
                <p className="text-[10px] tracking-[0.2em] text-[#3F57A6]/60 font-bold uppercase mb-2">Digital Avatar</p>
                <h4 className="text-2xl font-serif text-[#3F57A6] leading-tight mb-1">对话 AI 姗姗</h4>
                <p className="text-xs text-[#2C3E50]/70 font-medium">深入了解我的操盘策略与思考</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#F4F1EA]">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.isBot ? 'items-start' : 'items-end'}`}>
                  {msg.isBot ? (
                    <div className="flex items-start gap-3 max-w-[90%]">
                       <div className="w-8 h-8 rounded-full bg-[#3F57A6] flex-shrink-0 flex items-center justify-center text-[#F4F1EA] mt-4 shadow-md overflow-hidden border border-[#3F57A6]/20">
                          <img src="/images/头像.png" alt="AI Shanshan" className="w-full h-full object-cover" />
                       </div>
                       <div>
                         <p className="text-[10px] font-bold tracking-widest text-[#3F57A6]/50 mb-1 uppercase ml-2">AI Shanshan</p>
                         <div className="p-4 bg-white border border-[#3F57A6]/10 text-[#2C3E50] text-sm leading-relaxed rounded-2xl rounded-tl-sm shadow-sm font-serif whitespace-pre-wrap">{msg.text}</div>
                       </div>
                    </div>
                  ) : (
                    <div className="max-w-[85%]">
                       <p className="text-[10px] font-bold tracking-widest text-[#2C3E50]/40 mb-1 uppercase text-right mr-2">You</p>
                       <div className="p-4 bg-[#3F57A6] text-[#F4F1EA] text-sm leading-relaxed rounded-2xl rounded-tr-sm shadow-md">{msg.text}</div>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-[#3F57A6]/10 flex gap-3">
              <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="输入你想了解的内容..." className="flex-1 px-4 py-3 text-sm bg-[#F4F1EA] border border-transparent hover:border-[#3F57A6]/20 focus:border-[#3F57A6]/50 outline-none rounded-sm text-[#2C3E50] transition-colors" />
              <button type="submit" disabled={!inputText.trim()} className="bg-[#3F57A6] text-white p-3 rounded-sm hover:bg-[#2c3e80] transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"><Send size={18} /></button>
            </form>
          </div>
        )}

        <div className="pointer-events-auto">
          <Magnetic strength={0.4}>
            <button onClick={() => setIsChatOpen(!isChatOpen)} className={`relative flex items-center gap-3 px-6 py-4 rounded-full shadow-[0_10px_40px_rgba(63,87,166,0.3)] hover:shadow-[0_15px_50px_rgba(63,87,166,0.4)] transition-all duration-500 group ${isChatOpen ? 'bg-[#EAE5DB] text-[#3F57A6]' : 'bg-[#3F57A6] text-[#F4F1EA]'}`}>
              {isChatOpen ? (
                <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
              ) : (
                <>
                  <div className="relative flex items-center justify-center">
                     <div className="w-7 h-7 rounded-full overflow-hidden border border-white/50 shadow-sm"><img src="/images/头像.png" alt="AI Shanshan" className="w-full h-full object-cover" /></div>
                     <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5 z-10"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span></span>
                  </div>
                  <span className="font-serif font-bold tracking-widest text-xs uppercase whitespace-nowrap">Ask AI 姗姗</span>
                </>
              )}
            </button>
          </Magnetic>
        </div>
      </div>

    </div>
  );
}