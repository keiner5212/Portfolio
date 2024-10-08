import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Experience = ({ t }: { t: any }) => {
  const experiences = [
    {
      title: t.helloApp.title,
      company: t.helloApp.company,
      period: t.helloApp.period,
      description: t.helloApp.description
    },
    {
      title: t.freelance.title,
      company: t.freelance.company,
      period: t.freelance.period,
      description: t.freelance.description
    }
  ];

  return (
    <section id="experience" className="bg-background py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold">{t.title}</h2>
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{exp.title}</CardTitle>
                <CardDescription>{exp.company} | {exp.period}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{exp.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;