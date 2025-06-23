import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Calendar, Clock, Trophy, Loader2, AlertCircle } from 'lucide-react';
import CountdownTimer from '@/components/CountdownTimer';
import ThemeToggle from "@/components/ThemeToggle";

const platformMap = {
  leetcode: 'leetcode.com',
  codeforces: 'codeforces.com',
  atcoder: 'atcoder.jp',
  codechef: 'codechef.com',
  geeksforgeeks: 'geeksforgeeks.org',
  topcoder: 'topcoder.com'
};

const platformInfo = {
  leetcode: {
    name: 'LeetCode',
    color: 'from-rose-500 to-pink-700',
    icon: '/images/l.png'
  },
  codeforces: {
    name: 'Codeforces',
    color: 'from-sky-500 to-blue-700',
    icon: '/images/f.png'
  },
  atcoder: {
    name: 'AtCoder',
    color: 'from-lime-500 to-emerald-700',
    icon: '/images/atcoder.jpg'
  },
  codechef: {
    name: 'CodeChef',
    color: 'from-fuchsia-500 to-purple-700',
    icon: '/images/cc.png'
  },
  geeksforgeeks: {
    name: 'GeeksForGeeks',
    color: 'from-emerald-500 to-teal-700',
    icon: '/images/g.png'
  },
  topcoder: {
    name: 'TopCoder',
    color: 'from-yellow-500 to-orange-600',
    icon: '/images/t.png'
  }
};

const formatIST = (dateStr) => {
  const utcDate = new Date(dateStr);
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istDate = new Date(utcDate.getTime() + istOffset);
  return istDate.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZoneName: 'short'
  });
};

const getISTDateObject = (dateStr) => {
  const utcDate = new Date(dateStr);
  const istOffset = 5.5 * 60 * 60 * 1000;
  return new Date(utcDate.getTime() + istOffset);
};

const Platform = () => {
  const { platformId } = useParams();
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const platform = platformId && platformInfo[platformId];
  const resourceName = platformId && platformMap[platformId];

  useEffect(() => {
    const fetchContests = async () => {
      if (!resourceName) {
        setError('Platform not found');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const username = 'harshit0910';
        const apiKey = '9352db8f1927c428dd680a76b78b1e7485bc6905';
        const response = await fetch(
          `https://clist.by/api/v4/contest/?upcoming=true&resource=${resourceName}&username=${username}&api_key=${apiKey}`
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        const sortedContests = (data.objects || []).sort((a, b) => new Date(a.start) - new Date(b.start));
        setContests(sortedContests);
      } catch (err) {
        setError('Failed to fetch contests. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchContests();
  }, [resourceName]);

  if (!platform) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mb-4 mx-auto" />
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Platform Not Found</h1>
          <p className="text-slate-600 mb-4">The requested platform does not exist.</p>
          <Link to="/">
            <Button variant="ghost" size="m" className="text-xl font-bold bg-gradient-to-r from-emerald-300 to-pink-300 bg-clip-text text-transparent">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-slate-100"
    >
      <div className="bg-white/80 dark:bg-slate-600/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <Link to="/">
            <Button variant="ghost" size="m" className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-pink-600 bg-clip-text text-transparent">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          </Link>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden border-black/30 border-2 shadow-lg">
              <img src={platform.icon} alt={`${platform.name} logo`} className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{platform.name}</h1>
              <p className="text-slate-900">Upcoming Contests</p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
          </div>
        ) : error ? (
          <div className="text-center text-red-600 py-16">
            <AlertCircle className="h-10 w-10 mx-auto mb-4" />
            <p className="text-lg font-semibold">{error}</p>
            <Button onClick={() => window.location.reload()} className="mt-4">Try Again</Button>
          </div>
        ) : contests.length === 0 ? (
          <div className="text-center text-slate-600 py-16">
            <Calendar className="h-10 w-10 mx-auto mb-4" />
            <p className="text-lg font-semibold">No Upcoming Contests</p>
            <p>There are no contests scheduled currently for {platform.name}.</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {contests.map((contest) => (
              <motion.div
                key={contest.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <Card className="hover:shadow-lg border-0 shadow-md">
                  <CardHeader className={`bg-gradient-to-r ${platform.color} text-white rounded-t-lg`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg font-bold mb-2 line-clamp-2">{contest.event}</CardTitle>
                        <div className="flex space-x-4 text-sm">
                          <span className="flex items-center"><Calendar className="h-4 w-4 mr-1" />{formatIST(contest.start).split(',')[0]}</span>
                          <span className="flex items-center"><Clock className="h-4 w-4 mr-1" />{Math.floor(contest.duration / 3600)}h {Math.floor((contest.duration % 3600) / 60)}m</span>
                        </div>
                      </div>
                      <Badge className="bg-white/20 text-white border-white/30 flex items-center"><Trophy className="h-3 w-3 mr-1" />Live</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4 bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-800">
                    <div className="grid grid-cols-2 gap-4 text-sm ">
                      <div>
                        <p className="text-slate-900/80 dark:text-white/80 mb-1">Start Time</p>
                        <p className="font-semibold text-slate-900/80 dark:text-white/80">{formatIST(contest.start)}</p>
                      </div>
                      <div>
                        <p className="text-slate-900/80 dark:text-white/80 mb-1">End Time</p>
                        <p className="font-semibold text-slate-900/80 dark:text-white/80">{formatIST(contest.end)}</p>
                      </div>
                    </div>
                    <div className="bg-white/80 dark:bg-slate-900/80 rounded-lg p-4">
                      <p className="text-slate-500 text-sm mb-2">Time Remaining</p>
                      <CountdownTimer targetDate={getISTDateObject(contest.start)} />
                    </div>
                    <div className="flex space-x-3">
                      <Button asChild className="flex-1 ">
                        <a href={contest.href} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />Register
                        </a>
                      </Button>
                      <Button variant="outline" asChild>
                        <a href={contest.href} target="_blank" rel="noopener noreferrer">View Details</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Platform;
