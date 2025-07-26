"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, GitFork, Code, Calendar, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
  topics: string[];
}

interface GitHubUser {
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

interface GitHubStatsProps {
  username: string;
  showRepos?: boolean;
  maxRepos?: number;
}

export function GitHubStats({ username, showRepos = true, maxRepos = 6 }: GitHubStatsProps) {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        
        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        if (!userResponse.ok) throw new Error('Failed to fetch user data');
        const userData = await userResponse.json();
        setUser(userData);

        // Fetch repositories
        if (showRepos) {
          const reposResponse = await fetch(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=${maxRepos}&type=owner`
          );
          if (!reposResponse.ok) throw new Error('Failed to fetch repositories');
          const reposData = await reposResponse.json();
          
          // Filter out forks and sort by stars
                     const filteredRepos = reposData
             .filter((repo: GitHubRepo) => !repo.fork)
             .sort((a: GitHubRepo, b: GitHubRepo) => b.stargazers_count - a.stargazers_count)
            .slice(0, maxRepos);
          
          setRepos(filteredRepos);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, [username, showRepos, maxRepos]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-8 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">Unable to load GitHub stats</p>
        <p className="text-sm text-muted-foreground mt-2">{error}</p>
      </div>
    );
  }

  if (!user) return null;

  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

  const stats = [
    { label: "Public Repos", value: user.public_repos, icon: <Code className="w-5 h-5" />, color: "text-blue-400" },
    { label: "Total Stars", value: totalStars, icon: <Star className="w-5 h-5" />, color: "text-yellow-400" },
    { label: "Total Forks", value: totalForks, icon: <GitFork className="w-5 h-5" />, color: "text-green-400" },
    { label: "Followers", value: user.followers, icon: <TrendingUp className="w-5 h-5" />, color: "text-purple-400" }
  ];

  return (
    <div className="space-y-8">
      {/* GitHub Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="border-white/10 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300">
              <CardContent className="p-4 text-center">
                <div className={`flex justify-center mb-2 ${stat.color}`}>
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Top Repositories */}
      {showRepos && repos.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Featured Repositories</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {repos.map((repo, index) => (
              <motion.div
                key={repo.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-white/10 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 h-full">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-primary hover:underline">
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                          {repo.name}
                        </a>
                      </h4>
                      {repo.language && (
                        <Badge variant="secondary" className="text-xs">
                          {repo.language}
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {repo.description || "No description available"}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {repo.stargazers_count}
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="w-3 h-3" />
                        {repo.forks_count}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(repo.updated_at).toLocaleDateString()}
                      </div>
                    </div>

                    {repo.topics && repo.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {repo.topics.slice(0, 3).map((topic: string) => (
                          <Badge key={topic} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 