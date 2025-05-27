
import React from "react";
import { User, ThumbsUp, MessageSquare, Share2, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface CommunityPostProps {
  id: string;
  author: {
    name: string;
    avatar?: string;
    initials: string;
  };
  title: string;
  content: string;
  date: string;
  likes: number;
  comments: number;
  tags: string[];
}

const CommunityPost: React.FC<CommunityPostProps> = ({
  id,
  author,
  title,
  content,
  date,
  likes,
  comments,
  tags
}) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={author.avatar} />
            <AvatarFallback>{author.initials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{author.name}</div>
            <div className="flex items-center text-xs text-muted-foreground gap-1">
              <Calendar size={12} />
              <span>{date}</span>
            </div>
          </div>
        </div>
        <CardTitle className="mt-4 text-xl">{title}</CardTitle>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{content}</p>
        
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="border-t pt-4 flex justify-between">
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <ThumbsUp size={16} className="mr-1" />
          <span>{likes}</span>
        </Button>
        
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <MessageSquare size={16} className="mr-1" />
          <span>{comments}</span>
        </Button>
        
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <Share2 size={16} className="mr-1" />
          <span>Share</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CommunityPost;
