import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Clock, Users, Calendar, Code, Zap } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { motion } from "framer-motion";

const platforms = [
  {
    id: "codeforces",
    name: "Codeforces",
    description: "World's most popular competitive programming platform",
    stats: { contests: "2000+", users: "1M+" },
  },
  {
    id: "leetcode",
    name: "LeetCode",
    description: "Premier platform for technical interview preparation",
    stats: { contests: "500+", users: "10M+" },
  },
  {
    id: "atcoder",
    name: "AtCoder",
    description: "Japan's leading competitive programming platform",
    stats: { contests: "300+", users: "500K+" },
  },
  {
    id: "codechef",
    name: "CodeChef",
    description: "Global programming community with monthly challenges",
    stats: { contests: "400+", users: "3M+" },
  },
  {
    id: "geeksforgeeks",
    name: "GeeksForGeeks",
    description: "A platform for CS students to learn and practice",
    stats: { contests: "100+", users: "15M+" },
  },
  {
    id: "topcoder",
    name: "TopCoder",
    description: "Pioneer in competitive programming since 2001",
    stats: { contests: "1000+", users: "1.5M+" },
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Index = () => {
  return (
    <motion.div initial="hidden" animate="show" variants={fadeUp} className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-slate-100">
      <header className="bg-white/80 dark:bg-slate-600/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 shadow-sm  top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Trophy className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">Codathon</h1>
            </div>
            <ThemeToggle />
          </div>
          <motion.h1 variants={fadeUp} className="text-center text-slate-900 dark:text-slate-300 mt-6 text-4xl font-semibold">
            Track upcoming contests across all major competitive programming platforms
          </motion.h1>
          <div className="flex justify-center mt-6 space-x-4">
            <Link to="/calendar">
              <Button variant="outline" className="border-pink-600 text-pink-600 hover:bg-pink-50 dark:hover:bg-slate-700">
                <Calendar className="h-4 w-4 mr-2" />
                View Calendar
              </Button>
            </Link>
            <Link to="/hackathons">
              <Button variant="outline" className="border-pink-600 text-pink-600 hover:bg-pink-50 dark:hover:bg-slate-700">
                <Zap className="h-4 w-4 mr-2" />
                Hackathons
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[{ Icon: Calendar, title: "24/7", subtitle: "Live Tracking", color: "blue" },
            { Icon: Trophy, title: "6+", subtitle: "Platforms", color: "red" },
            { Icon: Clock, title: "Real-time", subtitle: "Countdowns", color: "purple" },
            { Icon: Users, title: "100+", subtitle: "Global Users", color: "pink" },
          ].map((item, i) => (
            <motion.div variants={fadeUp} key={i} className="group transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.03] border-0 overflow-hidden hover:shadow-2xl">
              <StatBox {...item} />
            </motion.div>
          ))}
        </motion.div>

        <Section title="Competitive Programming" icon={<Code className="h-6 w-6 text-blue-600" />}>
          <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {platforms.map((platform) => (
              <motion.div variants={fadeUp} key={platform.id}>
                <Link to={`/platform/${platform.id}`}>
                  <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 overflow-hidden bg-white dark:bg-slate-800">
                    <div className="h-32 relative bg-cover bg-center" style={{ backgroundImage: `url('/images/${platform.id}.jpg')` }}>
                      <div className="absolute inset-0 bg-black/10 dark:bg-black/30" />
                      <div className="absolute bottom-4 right-4">
                        <Badge variant="secondary" className="bg-white/30 text-black border-white/50 dark:text-white">Live</Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors">{platform.name}</h3>
                      <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-2">{platform.description}</p>
                      <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                        <StatInfo icon={<Trophy className="h-3 w-3" />} text={platform.stats.contests} />
                        <StatInfo icon={<Users className="h-3 w-3" />} text={platform.stats.users} />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        <Section title="Hackathons" icon={<Zap className="h-6 w-6 text-pink-600" />}>
          <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[{
              id: "devfolio",
              title: "Devfolio Hackathons",
              desc: "Discover and participate in exciting hackathons from Devfolio",
              img: "/images/dev.jpg",
              badge: "Devfolio",
              stats: ["50+ Active", "100K+ Participants"],
            },
            {
              id: "unstop",
              title: "Unstop Hackathons",
              desc: "Join hackathons and coding competitions on Unstop platform",
              img: "/images/un.jpg",
              badge: "Unstop",
              stats: ["30+ Active", "500K+ Users"],
            }].map((hack) => (
              <motion.div variants={fadeUp} key={hack.id}>
                <Link to="/hackathons">
                  <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 overflow-hidden bg-white dark:bg-slate-800">
                    <div className="h-32 relative bg-cover bg-center" style={{ backgroundImage: `url('${hack.img}')` }}>
                      <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />
                      <div className="absolute bottom-4 right-4">
                        <Badge variant="secondary" className="bg-white/20 text-white border-white/30">{hack.badge}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors">{hack.title}</h3>
                      <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-2">{hack.desc}</p>
                      <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                        <StatInfo icon={<Trophy className="h-3 w-3" />} text={hack.stats[0]} />
                        <StatInfo icon={<Users className="h-3 w-3" />} text={hack.stats[1]} />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        <div className="text-center mt-16 py-8 border-t border-slate-200 dark:border-slate-700">
         <a
  href="https://github.com/harshitgupta0910" // Replace with your actual URL
  target="_blank"
  rel="noopener noreferrer"
>
  <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent hover:underline transition">
    Harshit Gupta
  </h3>
</a>

          <p className="text-teal-600 dark:text-slate-300">Built for competitive programmers and hackathon enthusiasts 🌍</p>
        </div>
      </main>
    </motion.div>
  );
};

const StatBox = ({ Icon, title, subtitle, color }) => (
  <div className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center shadow-lg border border-slate-200 dark:border-slate-700">
    <Icon className={`h-8 w-8 text-${color}-600 mx-auto mb-2`} />
    <div className="text-2xl font-bold">{title}</div>
    <div className="text-sm text-slate-600 dark:text-slate-400">{subtitle}</div>
  </div>
);

const StatInfo = ({ icon, text }) => (
  <div className="flex items-center space-x-1">
    {icon}
    <span>{text}</span>
  </div>
);

const Section = ({ title, icon, children }) => (
  <section className="mb-12">
    <motion.div variants={fadeUp} className="flex items-center space-x-3 mb-6">
      {icon}
      <h2 className="text-2xl font-bold">{title}</h2>
    </motion.div>
    {children}
  </section>
);

export default Index;
