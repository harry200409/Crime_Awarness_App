
import React from "react";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface NewsCardProps {
  id: string;
  title: string;
  summary: string;
  date: string;
  location: string;
  category: string;
  imageUrl?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  id,
  title,
  summary,
  date,
  location,
  category,
  imageUrl
}) => {
  return (
    <Card className="news-card h-full flex flex-col">
      {imageUrl && (
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
          <Badge
            className={
              category === "Breaking" 
                ? "absolute top-2 left-2 bg-alert hover:bg-alert/90" 
                : "absolute top-2 left-2 bg-police hover:bg-police/90"
            }
          >
            {category}
          </Badge>
        </div>
      )}
      
      <CardHeader className="flex-grow">
        <CardTitle className="line-clamp-2">{title}</CardTitle>
        <CardDescription className="flex items-center text-xs gap-1 mt-2">
          <Calendar size={14} />
          <span>{date}</span>
          <span className="mx-1">•</span>
          <MapPin size={14} />
          <span>{location}</span>
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">{summary}</p>
      </CardContent>
      
      <CardFooter>
        <Button asChild variant="outline" size="sm" className="w-full">
          <Link to={`/news/${id}`}>
            Read More
            <ExternalLink size={14} className="ml-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewsCard;
