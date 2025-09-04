import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Sprout, 
  MessageCircle, 
  Upload, 
  TrendingUp, 
  Shield, 
  Brain,
  Users,
  CheckCircle,
  ArrowRight,
  Leaf,
  CloudRain,
  Bug
} from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Brain className="h-8 w-8 text-primary" />,
      title: "AI-Powered Advisory",
      malayalam: "AI പ്രതിസന്ധി നിർദ്ദേശങ്ങൾ",
      description: "Get personalized farming advice powered by advanced AI"
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-primary" />,
      title: "Voice Assistant",
      malayalam: "വോയ്സ് അസിസ്റ്റന്റ്",
      description: "Ask questions in Malayalam using voice commands"
    },
    {
      icon: <Bug className="h-8 w-8 text-pest-red" />,
      title: "Pest Detection",
      malayalam: "കീട രോഗ കണ്ടെത്തൽ",
      description: "Upload crop images for instant pest and disease detection"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-success-green" />,
      title: "Market Prices",
      malayalam: "മാർക്കറ്റ് വില",
      description: "Real-time local market prices and trends"
    }
  ];

  const successStories = [
    {
      name: "രാജു കെ.",
      location: "കോട്ടയം",
      crop: "നെൽ",
      improvement: "30% yield increase",
      story: "AI advisory helped optimize fertilizer usage"
    },
    {
      name: "സുനിത ആർ.",
      location: "തിരുവനന്തപുരം", 
      crop: "വഴുതന",
      improvement: "₹15,000 saved",
      story: "Early pest detection prevented major crop loss"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sprout className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">ഡിജിറ്റൽ കൃഷി ഓഫീസർ</h1>
                <p className="text-sm opacity-90">Digital Krishi Officer</p>
              </div>
            </div>
            <Button 
              variant="secondary" 
              onClick={() => navigate('/dashboard')}
              className="bg-white/20 hover:bg-white/30"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            എന്റെ കൃഷി സഹായി
          </h2>
          <p className="text-xl text-muted-foreground mb-2">
            Your Personal AI Farming Assistant
          </p>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            കൃത്രിമ ബുദ്ധി ഉപയോഗിച്ച് നിങ്ങളുടെ കൃഷിയെ കൂടുതൽ ലാഭകരമാക്കുക
            <br />
            Make your farming more profitable with AI assistance
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={() => navigate('/dashboard')}
              className="text-lg px-8 py-4"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Start Farming Journey
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/chat')}
              className="text-lg px-8 py-4"
            >
              <Upload className="mr-2 h-5 w-5" />
              Upload Crop Image
            </Button>
          </div>

          {/* Quick Action Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Card 
              className="p-6 cursor-pointer hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20"
              onClick={() => navigate('/chat')}
            >
              <MessageCircle className="h-8 w-8 text-primary mx-auto mb-3" />
              <p className="font-semibold text-sm">Ask Question</p>
              <p className="text-xs text-muted-foreground">ചോദ്യം ചോദിക്കുക</p>
            </Card>
            <Card 
              className="p-6 cursor-pointer hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-success-green/5 to-success-green/10 border-success-green/20"
              onClick={() => navigate('/upload')}
            >
              <Upload className="h-8 w-8 text-success-green mx-auto mb-3" />
              <p className="font-semibold text-sm">Upload Soil Report</p>
              <p className="text-xs text-muted-foreground">മണ്ണ് റിപ്പോർട്ട്</p>
            </Card>
            <Card 
              className="p-6 cursor-pointer hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-pest-red/5 to-pest-red/10 border-pest-red/20"
              onClick={() => navigate('/pest-detection')}
            >
              <Bug className="h-8 w-8 text-pest-red mx-auto mb-3" />
              <p className="font-semibold text-sm">Crop Image</p>
              <p className="text-xs text-muted-foreground">വിള ചിത്രം</p>
            </Card>
            <Card 
              className="p-6 cursor-pointer hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-weather-blue/5 to-weather-blue/10 border-weather-blue/20"
              onClick={() => navigate('/market')}
            >
              <TrendingUp className="h-8 w-8 text-weather-blue mx-auto mb-3" />
              <p className="font-semibold text-sm">Market Prices</p>
              <p className="text-xs text-muted-foreground">മാർക്കറ്റ് വില</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              എങ്ങനെ സഹായിക്കുന്നു
            </h3>
            <p className="text-muted-foreground">How Digital Krishi Officer Helps You</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300">
                <div className="mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h4 className="font-semibold text-lg mb-2">{feature.title}</h4>
                <p className="text-sm text-primary mb-2">{feature.malayalam}</p>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              വിജയ കഥകൾ
            </h3>
            <p className="text-muted-foreground">Success Stories from Fellow Farmers</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {successStories.map((story, index) => (
              <Card key={index} className="p-6 bg-gradient-to-br from-primary/5 to-success-green/5">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{story.name}</h4>
                      <span className="text-sm text-muted-foreground">• {story.location}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      <Leaf className="inline h-4 w-4 mr-1" />
                      {story.crop}
                    </p>
                    <div className="bg-success-green/10 text-success-green px-3 py-1 rounded-full text-sm font-medium mb-3 inline-block">
                      {story.improvement}
                    </div>
                    <p className="text-sm text-foreground">{story.story}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Workflow Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-success-green/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              AI വർക്ക്ഫ്ലോ
            </h3>
            <p className="text-muted-foreground">Our Multi-Layer AI System</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-4xl mx-auto">
            <Card className="p-6 text-center flex-1">
              <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Machine Learning</h4>
              <p className="text-sm text-muted-foreground">Soil analysis & crop recognition</p>
            </Card>
            
            <ArrowRight className="h-6 w-6 text-muted-foreground hidden md:block" />
            
            <Card className="p-6 text-center flex-1">
              <MessageCircle className="h-12 w-12 text-success-green mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Language Model</h4>
              <p className="text-sm text-muted-foreground">Advisory generation in Malayalam</p>
            </Card>
            
            <ArrowRight className="h-6 w-6 text-muted-foreground hidden md:block" />
            
            <Card className="p-6 text-center flex-1">
              <Shield className="h-12 w-12 text-weather-blue mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Human Validation</h4>
              <p className="text-sm text-muted-foreground">Expert review & quality control</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">
            ഇന്നേ തുടങ്ങുക
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Start Your Smart Farming Journey Today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate('/profile')}
              className="text-lg px-8 py-4"
            >
              Create Farm Profile
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/chat')}
              className="text-lg px-8 py-4 border-white/20 text-white hover:bg-white/10"
            >
              Ask Your First Question
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <Sprout className="h-6 w-6" />
              <div>
                <p className="font-semibold">Digital Krishi Officer</p>
                <p className="text-sm opacity-80">Empowering Indian Farmers</p>
              </div>
            </div>
            <div className="text-sm opacity-80">
              <p>Made with ❤️ for Indian Farmers</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;