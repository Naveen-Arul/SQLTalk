import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  Brain,
  Code2,
  Shield,
  Database,
  BarChart3,
  FileSpreadsheet,
  Lock,
  Zap,
  ArrowRight,
  Users,
  Briefcase,
  Code,
  User,
  XCircle,
  CheckCircle,
  Sparkles,
  Play,
} from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Typewriter } from '@/components/Typewriter';
import { FeatureCard } from '@/components/FeatureCard';
import { StepCard } from '@/components/StepCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const HomePage = () => {
  const typingTexts = [
    'Show total revenue by category',
    'Monthly sales trend for 2025',
    'Top 5 products by revenue',
    'Average order value by region',
  ];

  const features = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'Natural Language Analytics',
      description: 'Ask questions in plain English. No SQL knowledge required.',
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      title: 'Transparent SQL Generation',
      description: 'See exactly what SQL the AI generates. Full transparency.',
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Secure Read-Only Execution',
      description: 'All queries are read-only. Your data is always safe.',
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Real-Time Dashboards',
      description: 'Instant visualizations that adapt to your data.',
    },
    {
      icon: <FileSpreadsheet className="w-6 h-6" />,
      title: 'Export Anywhere',
      description: 'Download as CSV, Excel, or PDF with one click.',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Lightning Fast',
      description: 'Powered by optimized AI for instant responses.',
    },
  ];

  const steps = [
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: 'User Question',
      description: 'Enter your business question in plain English',
    },
    {
      icon: <Brain className="w-5 h-5" />,
      title: 'NLP Understanding',
      description: 'Groq LLaMA 3.1 interprets your intent',
    },
    {
      icon: <Code2 className="w-5 h-5" />,
      title: 'SQL Generation',
      description: 'AI builds an optimized SQL query',
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Validation Layer',
      description: 'Safety checks ensure read-only operations',
    },
    {
      icon: <Database className="w-5 h-5" />,
      title: 'PostgreSQL Execution',
      description: 'Query runs against your analytics database',
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: 'Insights Output',
      description: 'Results displayed as tables, charts & exports',
    },
  ];

  const problems = [
    { icon: <XCircle className="w-5 h-5" />, text: 'Writing complex SQL queries' },
    { icon: <XCircle className="w-5 h-5" />, text: 'Understanding database schemas' },
    { icon: <XCircle className="w-5 h-5" />, text: 'Switching between tools for charts' },
  ];

  const solutions = [
    { icon: <CheckCircle className="w-5 h-5" />, text: 'Ask in plain English' },
    { icon: <CheckCircle className="w-5 h-5" />, text: 'AI generates SQL automatically' },
    { icon: <CheckCircle className="w-5 h-5" />, text: 'Instant dashboards & reports' },
  ];

  const personas = [
    {
      id: 'analyst',
      icon: <BarChart3 className="w-4 h-4" />,
      title: 'Business Analyst',
      description:
        'Stop writing SQL for every ad-hoc request. Get instant answers to stakeholder questions and create reports in seconds.',
    },
    {
      id: 'pm',
      icon: <Briefcase className="w-4 h-4" />,
      title: 'Product Manager',
      description:
        'Understand user behavior and product metrics without waiting for engineering. Make data-driven decisions faster.',
    },
    {
      id: 'user',
      icon: <User className="w-4 h-4" />,
      title: 'Non-Technical User',
      description:
        'No coding required. Just describe what you want to know and get clear, visual answers immediately.',
    },
    {
      id: 'dev',
      icon: <Code className="w-4 h-4" />,
      title: 'Developer',
      description:
        'Validate queries before implementation. Use generated SQL as a starting point for complex analytics features.',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-36">
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8"
            >
              <Sparkles className="w-4 h-4" />
              AI-Powered Analytics
            </motion.div>

            <h1 className="text-5xl lg:text-7xl font-display font-bold mb-6 leading-tight text-foreground">
              Talk to your database.
              <br />
              <span className="gradient-text">Get answers, not queries.</span>
            </h1>

            <div className="text-xl lg:text-2xl text-muted-foreground mb-10 h-16 font-medium">
              <Typewriter texts={typingTexts} />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="text-lg px-8 py-7 gradient-bg text-primary-foreground shadow-medium hover:shadow-glow transition-all duration-300 rounded-xl"
              >
                <Link to="/analyze">
                  <Play className="w-5 h-5 mr-2" />
                  Try SQLTalk
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-7 bg-card border-border hover:bg-secondary hover:border-primary/20 transition-all duration-300 rounded-xl"
                onClick={() =>
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                See How It Works
              </Button>
            </div>
          </motion.div>

          {/* Floating decorative elements */}
          <motion.div 
            animate={{ y: [-8, 8, -8], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-[10%] w-16 h-16 rounded-2xl gradient-bg opacity-20 blur-sm"
          />
          <motion.div 
            animate={{ y: [8, -8, 8], rotate: [0, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-20 right-[10%] w-24 h-24 rounded-full bg-accent/20 blur-md"
          />
        </div>
      </section>

      {/* Problem → Solution Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-display font-bold mb-4 text-foreground">
              From <span className="text-destructive">Frustration</span> to{' '}
              <span className="gradient-text">Insight</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              SQLTalk eliminates the barriers between you and your data
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Problems */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">The Old Way</h3>
              {problems.map((problem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-destructive/20 shadow-soft"
                >
                  <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                    <div className="text-destructive">{problem.icon}</div>
                  </div>
                  <span className="text-foreground font-medium">{problem.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Solutions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-6">The SQLTalk Way</h3>
              {solutions.map((solution, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-primary/20 shadow-soft"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <div className="text-primary">{solution.icon}</div>
                  </div>
                  <span className="text-foreground font-medium">{solution.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Architecture Flow */}
      <section id="how-it-works" className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">Architecture</span>
            <h2 className="text-3xl lg:text-5xl font-display font-bold mb-4 text-foreground">
              How <span className="gradient-text">SQLTalk</span> Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A powerful pipeline that transforms natural language into actionable insights
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            {steps.map((step, index) => (
              <StepCard
                key={index}
                step={index + 1}
                icon={step.icon}
                title={step.title}
                description={step.description}
                isLast={index === steps.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-semibold text-accent uppercase tracking-wider mb-4 block">Features</span>
            <h2 className="text-3xl lg:text-5xl font-display font-bold mb-4 text-foreground">
              Powerful <span className="gradient-text">Features</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to unlock insights from your data
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Personas */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">Use Cases</span>
            <h2 className="text-3xl lg:text-5xl font-display font-bold mb-4 text-foreground">
              Built for <span className="gradient-text">Everyone</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              SQLTalk empowers every team member to make data-driven decisions
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Tabs defaultValue="analyst" className="w-full">
              <TabsList className="grid grid-cols-4 mb-8 bg-secondary/50 p-1.5 rounded-xl h-auto">
                {personas.map((persona) => (
                  <TabsTrigger
                    key={persona.id}
                    value={persona.id}
                    className="flex items-center gap-2 py-3 px-4 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-soft data-[state=active]:text-foreground text-muted-foreground transition-all duration-200"
                  >
                    {persona.icon}
                    <span className="hidden sm:inline font-medium">{persona.title}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              {personas.map((persona) => (
                <TabsContent key={persona.id} value={persona.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-8 rounded-2xl bg-card border border-border shadow-soft"
                  >
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center shadow-soft text-primary-foreground">
                        {persona.icon}
                      </div>
                      <h3 className="text-2xl font-display font-semibold text-foreground">{persona.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-lg leading-relaxed">{persona.description}</p>
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-5" />
        <div className="absolute inset-0 pattern-dots opacity-30" />
        
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl gradient-bg shadow-glow mb-8"
            >
              <Database className="w-10 h-10 text-primary-foreground" />
            </motion.div>
            
            <h2 className="text-3xl lg:text-5xl font-display font-bold mb-6 text-foreground">
              Ready to explore your data using{' '}
              <span className="gradient-text">natural language</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Start asking questions and get instant insights from your database
            </p>
            <Button
              asChild
              size="lg"
              className="text-xl px-12 py-8 gradient-bg text-primary-foreground shadow-medium hover:shadow-glow transition-all duration-300 rounded-xl"
            >
              <Link to="/analyze">
                Start Querying
                <ArrowRight className="w-6 h-6 ml-3" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-border bg-card/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                <Database className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-foreground">SQLTalk</span>
            </div>
            <p className="text-muted-foreground text-sm">
              AI-Powered Analytics • Built for Modern Teams
            </p>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default HomePage;
