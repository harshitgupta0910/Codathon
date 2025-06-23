import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  ExternalLink,
  Loader2,
  AlertCircle,
  Trophy,
  Users,
  MapPin
} from 'lucide-react';
import CountdownTimer from '@/components/CountdownTimer';
import ThemeToggle from '@/components/ThemeToggle';

interface Hackathon {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  registrationStartDate?: string;
  registrationEndDate?: string;
  platform: 'devfolio' | 'unstop';
  url: string;
  location?: string;
  teamSize?: string;
  prizePool?: string;
  status: 'upcoming' | 'registration_open' | 'ongoing' | 'ended';
}

const platformInfo = {
  devfolio: { name: 'Devfolio', color: 'from-blue-500 to-purple-600', icon: '🚀' },
  unstop: { name: 'Unstop', color: 'from-green-500 to-teal-600', icon: '🎯' }
};

const Hackathons = () => {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        setLoading(true);
        const response = await fetch('/hackathons.json');
        if (!response.ok) throw new Error('Failed to load hackathon data');
        const data = await response.json();
        setHackathons(data);
      } catch (err) {
        console.error('Error fetching hackathons:', err);
        setError('Failed to fetch hackathons. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchHackathons();
  }, []);

  const filteredHackathons = selectedPlatform === 'all'
    ? hackathons
    : hackathons.filter(h => h.platform === selectedPlatform);

  const getStatusBadge = (status: Hackathon['status']) => {
    const statusColors: Record<Hackathon['status'], string> = {
      upcoming: 'bg-blue-100 text-blue-800',
      registration_open: 'bg-green-100 text-green-800',
      ongoing: 'bg-orange-100 text-orange-800',
      ended: 'bg-gray-100 text-gray-800'
    };
    const statusLabels: Record<Hackathon['status'], string> = {
      upcoming: 'Upcoming',
      registration_open: 'Registration Open',
      ongoing: 'Ongoing',
      ended: 'Ended'
    };
    return <Badge className={statusColors[status]}>{statusLabels[status]}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="bg-white/80 dark:bg-slate-600/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6 w-full flex justify-between items-center">
          <Link to="/">
            <Button variant="ghost" size="m" className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-pink-600 bg-clip-text text-transparent">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          </Link>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-xl transition-transform duration-300 hover:rotate-6">
              🏆
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Hackathon</h1>
              <p className="text-slate-900 dark:text-slate-300">Upcoming hackathons</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
        <div className="flex items-center justify-center mt-4 space-x-4">
          <Button variant={selectedPlatform === 'all' ? 'default' : 'outline'} onClick={() => setSelectedPlatform('all')} size="sm">All Platforms</Button>
          <Button variant={selectedPlatform === 'devfolio' ? 'default' : 'outline'} onClick={() => setSelectedPlatform('devfolio')} size="sm">🚀 Devfolio</Button>
          <Button variant={selectedPlatform === 'unstop' ? 'default' : 'outline'} onClick={() => setSelectedPlatform('unstop')} size="sm">🎯 Unstop</Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading && (
          <div className="flex justify-center py-16">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-purple-600 mx-auto mb-4" />
              <p className="text-slate-600">Loading hackathons...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex justify-center py-16">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Error</h3>
              <p className="text-slate-600 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          </div>
        )}

        {!loading && !error && filteredHackathons.length === 0 && (
          <div className="flex justify-center py-16">
            <div className="text-center">
              <Trophy className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No Hackathons Found</h3>
              <p className="text-slate-600">No hackathons match your current filter.</p>
            </div>
          </div>
        )}

        {!loading && !error && filteredHackathons.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredHackathons.map(hackathon => {
              const platform = platformInfo[hackathon.platform];
              return (
                <motion.div
                  key={hackathon.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <Card
                    className={`hover:shadow-xl transition-transform duration-200 transform hover:scale-[1.02] border-0 shadow-md ${
                      hackathon.status === 'registration_open' ? 'ring-2 ring-orange-400' : ''
                    }`}
                  >
                    <CardHeader className={`bg-gradient-to-r ${platform.color} text-white rounded-t-lg`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-xl">{platform.icon}</span>
                            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">{platform.name}</Badge>
                          </div>
                          <CardTitle className="text-lg font-bold mb-2 line-clamp-2">{hackathon.title}</CardTitle>
                          <p className="text-sm text-white/90 line-clamp-2">{hackathon.description}</p>
                        </div>
                        {getStatusBadge(hackathon.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4 bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-800">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-slate-500 mb-1">Start Date</p>
                          <p className="font-semibold text-slate-900/80 dark:text-white/80">{new Date(hackathon.startDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-slate-500 mb-1">End Date</p>
                          <p className="font-semibold text-slate-900/80 dark:text-white/80">{new Date(hackathon.endDate).toLocaleDateString()}</p>
                        </div>
                      </div>

                      {hackathon.location && (
                        <div className="flex items-center space-x-2 text-sm text-slate-600">
                          <MapPin className="h-4 w-4" />
                          <span>{hackathon.location}</span>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        {hackathon.teamSize && (
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-slate-500" />
                            <span>{hackathon.teamSize}</span>
                          </div>
                        )}
                        {hackathon.prizePool && (
                          <div className="flex items-center space-x-2">
                            <Trophy className="h-4 w-4 text-slate-500" />
                            <span>{hackathon.prizePool}</span>
                          </div>
                        )}
                      </div>

                      {(hackathon.status === 'registration_open' || hackathon.status === 'upcoming') && (
                        <div className="bg-white/80 dark:bg-slate-900/80 rounded-lg p-4 transition-shadow duration-300 hover:shadow-md">
                          <p className="text-slate-500 text-sm mb-2">
                            {hackathon.status === 'registration_open' ? 'Registration' : 'Starts In'}
                          </p>
                          {hackathon.status === 'registration_open' &&
                          hackathon.registrationStartDate &&
                          new Date(hackathon.registrationStartDate) < new Date() ? (
                            <p className="text-lg font-semibold text-orange-600">Ongoing</p>
                          ) : (
                            <CountdownTimer
                              targetDate={
                                hackathon.status === 'registration_open'
                                  ? hackathon.registrationEndDate!
                                  : hackathon.startDate
                              }
                            />
                          )}
                        </div>
                      )}

                      <div className="flex space-x-3">
                        <Button
                          asChild
                          className="flex-1 transition-all duration-200 hover:scale-105"
                        >
                          <a href={hackathon.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            {hackathon.status === 'registration_open' ? 'Register' : 'View Details'}
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hackathons;
