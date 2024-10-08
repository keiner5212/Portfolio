import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Database, Globe } from 'lucide-react';

const About = ({ t }: { t: any }) => {
  return (
    <section id="about" className="bg-muted py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold">{t.title}</h2>
        <div className="mb-12">
          <p className="text-center text-lg">{t.content}</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="mr-2 h-6 w-6" /> Frontend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                React, React Native, Tauri, Tailwind, JavaScript, TypeScript, CSS, SCSS, HTML
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-6 w-6" /> Backend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Express, Laravel, Spring Boot, Gin, JavaScript, TypeScript, Java, Go, MongoDB, Redis, PostgreSQL, MySQL
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-6 w-6" /> Cloud & DevOps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                AWS, Docker, CI/CD, Bash, Python
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;