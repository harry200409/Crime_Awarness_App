import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/hooks/use-debounce";

interface NewsItem {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

interface NewsResponse {
  articles: NewsItem[];
  totalResults: number;
  status: string;
}

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const ITEMS_PER_PAGE = 10;

const News = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("crime");
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  
  const debouncedSearch = useDebounce(searchQuery, 500);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      // Base query for crime and safety news in Surat
      let query = "crime OR safety OR police Surat Gujarat";
      
      // Add category if selected
      if (category && category !== "all") {
        query += ` AND ${category}`;
      }
      
      // Add search query if provided
      if (debouncedSearch) {
        query += ` AND ${debouncedSearch}`;
      }

      const response = await fetch(
        `https://newsapi.org/v2/everything?` +
        `q=${encodeURIComponent(query)}&` +
        `pageSize=${ITEMS_PER_PAGE}&` +
        `page=${page}&` +
        `sortBy=publishedAt&` +
        `language=en&` +
        `apiKey=${NEWS_API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }

      const data: NewsResponse = await response.json();
      
      if (data.status === 'error') {
        throw new Error(data.status || 'Failed to fetch news');
      }

      setNews(data.articles);
      setTotalResults(data.totalResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch news. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch news when search query, category, or page changes
  useEffect(() => {
    fetchNews();
  }, [debouncedSearch, category, page]);

  const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE);

  const handlePreviousPage = () => {
    setPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setPage((prev) => Math.min(totalPages, prev + 1));
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Latest Crime & Safety News</h1>
          <p className="text-muted-foreground">
            Stay informed about crime and safety news in Surat and surrounding areas
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="relative">
            <Input
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All News</SelectItem>
              <SelectItem value="crime">Crime News</SelectItem>
              <SelectItem value="safety">Safety Updates</SelectItem>
              <SelectItem value="police">Police News</SelectItem>
              <SelectItem value="community">Community Safety</SelectItem>
            </SelectContent>
          </Select>

          <Button 
            className="bg-primary-red hover:bg-dark-blue text-white"
            onClick={() => {
              setPage(1); // Reset page when manually refreshing
              fetchNews();
            }}
          >
            Refresh News
          </Button>
        </div>

        {/* News Content */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/4 mt-2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-muted rounded w-full mb-2"></div>
                  <div className="h-4 bg-muted rounded w-5/6"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <Card className="bg-destructive/10">
            <CardContent className="py-4">
              <p className="text-center text-destructive">{error}</p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {news.map((item, index) => (
                <Card key={index} className="overflow-hidden">
                  {item.urlToImage && (
                    <img
                      src={item.urlToImage}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        // Replace broken images with a placeholder
                        (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=No+Image';
                      }}
                    />
                  )}
                  <CardHeader>
                    <CardTitle className="line-clamp-2 hover:text-primary-red">
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        {item.title}
                      </a>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(item.publishedAt).toLocaleDateString()}
                      <MapPin className="h-4 w-4 ml-2" />
                      {item.source.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <Button
                  variant="outline"
                  onClick={handlePreviousPage}
                  disabled={page === 1}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={handleNextPage}
                  disabled={page === totalPages}
                  className="flex items-center gap-2"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}

        {/* No Results */}
        {!loading && !error && news.length === 0 && (
          <Card>
            <CardContent className="py-8">
              <p className="text-center text-muted-foreground">
                No news articles found. Try adjusting your search criteria.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default News;
