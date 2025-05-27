
import React from "react";
import Layout from "@/components/layout/Layout";
import CommunityPost from "@/components/community/CommunityPost";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, TrendingUp, MessageSquare, Tag, Plus, Search } from "lucide-react";

// Sample data - in a real app this would come from an API
const communityPosts = [
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
  },
  {
    id: "3",
    author: {
      name: "Amit Desai",
      initials: "AD"
    },
    title: "Safety meeting in Adajan area",
    content: "We're organizing a community safety meeting next Sunday at Adajan Community Hall to discuss recent incidents and ways to improve neighborhood safety. Everyone is welcome to join and share their concerns.",
    date: "April 3, 2025",
    likes: 45,
    comments: 23,
    tags: ["adajan", "community", "meeting", "safety"]
  },
  {
    id: "4",
    author: {
      name: "Neha Sharma",
      initials: "NS"
    },
    title: "Lost wallet around Dumas Road",
    content: "I lost my wallet around Dumas Road yesterday evening. If anyone found a black leather wallet with ID cards, please contact me. I've already reported to the police station.",
    date: "April 2, 2025",
    likes: 8,
    comments: 15,
    tags: ["dumas", "lostfound", "help"]
  },
  {
    id: "5",
    author: {
      name: "Jay Panchal",
      initials: "JP"
    },
    title: "Scam alert: Fake electricity workers",
    content: "Be aware of individuals posing as electricity board workers in Varachha area. They ask to enter homes for meter checking but are looking to steal valuables. Always ask for proper ID and verify with the electricity board.",
    date: "April 1, 2025",
    likes: 67,
    comments: 31,
    tags: ["scamalert", "varachha", "warning"]
  }
];

const trendingTags = [
  { name: "safety", count: 42 },
  { name: "alert", count: 36 },
  { name: "vesu", count: 29 },
  { name: "suspicious", count: 24 },
  { name: "theft", count: 21 },
  { name: "scamalert", count: 18 },
  { name: "community", count: 17 },
  { name: "citylight", count: 15 }
];

const Community = () => {
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Community Forum</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Share with the Community</CardTitle>
                <CardDescription>
                  Post updates, ask for help, or share important information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input placeholder="Post title" />
                  <Textarea placeholder="What's on your mind? Share your experience or information..." />
                  <Input placeholder="Add tags (separated by commas)" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>
                  <Plus size={16} className="mr-2" />
                  Create Post
                </Button>
              </CardFooter>
            </Card>
            
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Community Posts</h2>
              <div className="relative w-60">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search posts..." className="pl-9" />
              </div>
            </div>
            
            <Tabs defaultValue="recent">
              <TabsList>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="alerts">Alerts</TabsTrigger>
              </TabsList>
              
              <TabsContent value="recent" className="mt-6">
                <div className="space-y-6">
                  {communityPosts.map((post) => (
                    <CommunityPost key={post.id} {...post} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="popular" className="mt-6">
                <div className="space-y-6">
                  {[...communityPosts]
                    .sort((a, b) => b.likes - a.likes)
                    .map((post) => (
                      <CommunityPost key={post.id} {...post} />
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="alerts" className="mt-6">
                <div className="space-y-6">
                  {communityPosts
                    .filter((post) => post.tags.includes("alert") || post.tags.includes("warning") || post.tags.includes("scamalert"))
                    .map((post) => (
                      <CommunityPost key={post.id} {...post} />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users size={20} />
                  Community Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Members</span>
                    <span className="font-medium">1,254</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Posts</span>
                    <span className="font-medium">328</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Comments</span>
                    <span className="font-medium">1,876</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Active Users</span>
                    <span className="font-medium">87</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag size={20} />
                  Trending Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {trendingTags.map((tag) => (
                    <Button key={tag.name} variant="outline" size="sm" className="flex items-center gap-2">
                      #{tag.name}
                      <span className="bg-muted text-muted-foreground rounded-full px-2 text-xs">
                        {tag.count}
                      </span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Community;
