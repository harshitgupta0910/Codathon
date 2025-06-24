import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import ThemeToggle from "@/components/ThemeToggle";
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import {
  Calendar as CalendarIcon,
  Clock,
  ExternalLink,
  Filter,
  ArrowLeft
} from 'lucide-react';

import { format, isSameDay, addDays } from 'date-fns';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card';

const platformMap = {
  codeforces: 'codeforces.com',
  leetcode: 'leetcode.com',
  atcoder: 'atcoder.jp',
  codechef: 'codechef.com',
  geeksforgeeks: 'geeksforgeeks.org',
  topcoder: 'topcoder.com'
};

const platformColors = {
  'codeforces.com': 'bg-blue-500',
  'leetcode.com': 'bg-orange-500',
  'atcoder.jp': 'bg-green-500',
  'codechef.com': 'bg-purple-500',
  'geeksforgeeks.org': 'bg-teal-500',
  'topcoder.com': 'bg-pink-500'
};

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [viewFilter, setViewFilter] = useState<string>('month');

  const username = 'harshit0910';
  const apiKey = '9352db8f1927c428dd680a76b78b1e7485bc6905';

  const fetchContestsForPlatform = async (platform: string) => {
    const response = await fetch(
      `https://clist.by/api/v4/contest/?upcoming=true&resource=${platform}&username=${username}&api_key=${apiKey}`
    );
    if (!response.ok) throw new Error(`Failed to fetch ${platform} contests`);
    const data = await response.json();
    return data.objects.map((contest: any) => ({
      ...contest,
      platform: platform
    }));
  };

  const { data: allContests = [], isLoading, error } = useQuery({
    queryKey: ['all-contests'],
    queryFn: async () => {
      const platforms = Object.values(platformMap);
      const contestPromises = platforms.map(platform => 
        fetchContestsForPlatform(platform).catch(() => [])
      );
      const results = await Promise.all(contestPromises);
      return results.flat();
    },
    refetchInterval: 300000,
  });

  const filteredContests = allContests.filter((contest) => {
    if (selectedPlatform !== 'all' && contest.resource !== platformMap[selectedPlatform as keyof typeof platformMap]) {
      return false;
    }
    const contestDate = new Date(contest.start);
    const today = new Date();
    if (viewFilter === 'today') {
      return isSameDay(contestDate, today);
    } else if (viewFilter === 'week') {
      const weekFromNow = addDays(today, 7);
      return contestDate >= today && contestDate <= weekFromNow;
    }
    return true;
  });

  const getContestsForDate = (date: Date) => {
    return filteredContests.filter((contest) => 
      isSameDay(new Date(contest.start), date)
    );
  };

  const getSelectedDateContests = () => getContestsForDate(selectedDate);

  const getPlatformName = (resource: string) => {
    const entry = Object.entries(platformMap).find(([_, value]) => value === resource);
    return entry ? entry[0].charAt(0).toUpperCase() + entry[0].slice(1) : resource;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading contests...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-red-600 mb-4">Failed to load contests</p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-slate-100">
      <div className="bg-white/80 dark:bg-slate-600/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <Link to="/">
            <Button variant="ghost" size="m" className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-pink-600 bg-clip-text text-transparent">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          </Link>
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-blue-600" />
              <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Platforms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  {Object.keys(platformMap).map((platform) => (
                    <SelectItem key={platform} value={platform}>
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-2">
              {['month', 'week', 'today'].map((filter) => (
                <Button
                  key={filter}
                  variant={viewFilter === filter ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewFilter(filter)}
                >
                  {filter === 'month' ? 'Month' : filter === 'week' ? 'Next 7 Days' : 'Today'}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center space-x-3 mb-4">
            <CalendarIcon className="h-10 w-10 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Calendar</h1>
              <p className="text-slate-900">Upcoming Contests</p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="transition-all duration-300 hover:shadow-2xl">
              <CardHeader>
                <CardTitle>Contest Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="w-full"
                  components={{
                    Day: ({ date, ...props }) => {
                      const dayContests = getContestsForDate(date);
                      const hasContests = dayContests.length > 0;
                      return (
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <div
                              {...props}
                              className={`relative cursor-pointer p-2 text-center text-sm transition-all duration-200 ease-in-out hover:bg-blue-200/50 hover:scale-105 rounded-lg ${
                                hasContests ? 'bg-blue-100 text-blue-900 font-semibold shadow-sm' : ''
                              }`}
                            >
                              {format(date, 'd')}
                              {hasContests && (
                                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                              )}
                            </div>
                          </HoverCardTrigger>
                          {hasContests && (
                            <HoverCardContent className="w-80">
                              <div className="space-y-2">
                                <h4 className="font-semibold">Contests on {format(date, 'MMM d, yyyy')}</h4>
                                {dayContests.map((contest) => (
                                  <div key={contest.id} className="p-2 border rounded-md">
                                    <div className="flex items-center justify-between mb-1">
                                      <h5 className="font-medium text-sm line-clamp-1">{contest.event}</h5>
                                      <Badge className={platformColors[contest.resource]}> {getPlatformName(contest.resource)} </Badge>
                                    </div>
                                    <div className="flex items-center text-xs text-slate-600 mb-2">
                                      <Clock className="h-3 w-3 mr-1" />
                                      {format(new Date(contest.start), 'HH:mm')} - {format(new Date(contest.end), 'HH:mm')}
                                    </div>
                                    <a
                                      href={contest.href}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800"
                                    >
                                      Register <ExternalLink className="h-3 w-3 ml-1" />
                                    </a>
                                  </div>
                                ))}
                              </div>
                            </HoverCardContent>
                          )}
                        </HoverCard>
                      );
                    }
                  }}
                />
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="transition duration-300 ease-in-out hover:shadow-xl">
              <CardHeader>
                <CardTitle>
                  {viewFilter === 'today' ? "Today's Contests" : 
                   viewFilter === 'week' ? 'Next 7 Days' :
                   `Contests on ${format(selectedDate, 'MMM d, yyyy')}`}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(viewFilter === 'today' || viewFilter === 'week' ? filteredContests : getSelectedDateContests()).length === 0 ? (
                    <p className="text-slate-500 text-center py-8">No contests scheduled</p>
                  ) : (
                    (viewFilter === 'today' || viewFilter === 'week' ? filteredContests : getSelectedDateContests()).map((contest) => (
                      <div key={contest.id} className="p-4 border rounded-lg hover:shadow-md transition-all duration-200 ease-in-out">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-sm line-clamp-1">{contest.event}</h3>
                          <Badge className={platformColors[contest.resource]}>
                            {getPlatformName(contest.resource)}
                          </Badge>
                        </div>
                        <div className="flex items-center text-sm text-slate-600 mb-2">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{format(new Date(contest.start), 'MMM d, HH:mm')} - {format(new Date(contest.end), 'HH:mm')}</span>
                        </div>
                        <a
                          href={contest.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Register <ExternalLink className="h-4 w-4 ml-1" />
                        </a>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;