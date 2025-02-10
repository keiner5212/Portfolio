import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Experience = ({ t }: { t: any }) => {
  const experiences = [
    {
      title: t.helloApp.title,
      company: t.helloApp.company,
      period: t.helloApp.period,
      description: t.helloApp.description,
      link: t.helloApp.link,
    },
    {
      title: t.notiexpress.title,
      company: t.notiexpress.company,
      period: t.notiexpress.period,
      description: t.notiexpress.description,
      link: t.notiexpress.link,
    },
    {
      title: t.freelance.title,
      company: t.freelance.company,
      period: t.freelance.period,
      description: t.freelance.description,
      link: t.freelance.link,
    },
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
                <CardDescription>
                  {exp.link ? (
                    <a href={exp.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {exp.company}
                    </a>
                  ) : (
                    exp.company
                  )} | {exp.period}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p style={{ whiteSpace: "pre-line" }}>{exp.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;