
import React from "react";
import Layout from "@/components/layout/Layout";
import NewsCard from "@/components/news/NewsCard";
import CommunityPost from "@/components/community/CommunityPost";
import CrimeMap from "@/components/map/CrimeMap";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AlertCircle, TrendingUp, Users, Newspaper, ArrowRight } from "lucide-react";

// Sample data - in a real app this would come from an API
const featuredNews = [
  {
    id: "1",
    title: "Major Drug Bust in Vesu Area: 5 Arrested",
    summary: "Police conducted a raid in a residential complex in Vesu and arrested 5 individuals involved in drug trafficking operations.",
    date: "April 5, 2025",
    location: "Vesu, Surat",
    category: "Breaking",
    imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "2",
    title: "Cyber Crime Unit Warns About New Online Scam",
    summary: "The Surat Cyber Crime Unit has issued warnings about a new phishing scam targeting bank customers through fake SMS messages.",
    date: "April 4, 2025",
    location: "Surat",
    category: "Alert",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "3",
    title: "Vehicle Theft Ring Busted in Adajan",
    summary: "Police have dismantled a vehicle theft ring operating in Adajan area, recovering 12 stolen motorcycles and arresting 3 suspects.",
    date: "April 3, 2025",
    location: "Adajan, Surat",
    category: "News",
    imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  }
];

const recentPosts = [
  {
    id: "1",
    author: {
      name: "Raj Patel",
      initials: "RP"
    },
    title: "Suspicious activity near City Light",
    content: "I noticed some suspicious individuals loitering around City Light Road after midnight. Anyone else seen this? Should we report to local police?",
    date: "April 5, 2025",
    likes: 15,
    comments: 7,
    tags: ["suspicious", "citylight", "safety"]
  },
  {
    id: "2",
    author: {
      name: "Priya Shah",
      initials: "PS"
    },
    title: "Increased phone snatching incidents in Vesu",
    content: "There have been several phone snatching incidents near Vesu in the past week. Please be careful when using your phone in public. I've reported this to the police.",
    date: "April 4, 2025",
    likes: 32,
    comments: 12,
    tags: ["vesu", "phonesnatching", "alert"]
  }
];

const Index = () => {
  return (
    <Layout>
      <div className="container py-8">
        {/* Emergency Alert */}
        <Alert className="mb-8 border-alert/50 bg-alert/10 animate-pulse-alert">
          <AlertCircle className="h-4 w-4 text-alert" />
          <AlertTitle className="text-alert">Emergency Alert</AlertTitle>
          <AlertDescription>
            Heavy traffic congestion reported on Udhna-Magdalla Road due to an accident. Emergency services are on site.
          </AlertDescription>
        </Alert>

        {/* Hero Section */}
        <section className="mb-12 relative overflow-hidden rounded-xl bg-police text-white p-8">
          <div className="relative z-10 max-w-2xl">
            <Badge className="bg-white/20 hover:bg-white/30 mb-4">Surat, Gujarat</Badge>
            <h1 className="text-4xl font-bold mb-4">Surat Crime Connect</h1>
            <p className="text-lg mb-6">
              Stay informed about crime incidents, community safety updates, and connect with others
              to make Surat a safer place for everyone.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-white text-police hover:bg-white/90">
                <Link to="/news">Latest News</Link>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/community">Join Community</Link>
              </Button>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-police to-police-dark mix-blend-multiply" />
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card rounded-lg p-6 shadow-sm border">
            <div className="flex items-center gap-4">
              <div className="bg-police/10 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-police" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">215</h3>
                <p className="text-muted-foreground">Recent Reports</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-sm border">
            <div className="flex items-center gap-4">
              <div className="bg-police/10 p-3 rounded-full">
                <Users className="h-6 w-6 text-police" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">1,254</h3>
                <p className="text-muted-foreground">Community Members</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-sm border">
            <div className="flex items-center gap-4">
              <div className="bg-police/10 p-3 rounded-full">
                <Newspaper className="h-6 w-6 text-police" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">73</h3>
                <p className="text-muted-foreground">News Articles</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured News */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured News</h2>
            <Button asChild variant="link" className="gap-1">
              <Link to="/news">
                View all <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredNews.map((news) => (
              <NewsCard key={news.id} {...news} />
            ))}
          </div>
        </section>

        {/* Community + Map Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Community Updates</h2>
              <Button asChild variant="link" className="gap-1">
                <Link to="/community">
                  View all <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
            
            <div className="space-y-6">
              {recentPosts.map((post) => (
                <CommunityPost key={post.id} {...post} />
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6">Crime Map</h2>
            <CrimeMap />
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
