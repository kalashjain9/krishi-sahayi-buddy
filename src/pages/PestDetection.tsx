import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft,
  Camera,
  Upload,
  AlertTriangle,
  CheckCircle,
  Bug,
  Leaf,
  FileImage,
  Zap
} from 'lucide-react';
import diseasedLeaf1 from '@/assets/diseased-leaf-1.jpg';
import diseasedLeaf2 from '@/assets/diseased-leaf-2.jpg';

const PestDetection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageSelect = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setAnalysisResult(null);
    
    // Simulate AI analysis
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult({
        disease: 'Cercospora Leaf Spot',
        malayalam: 'സെർക്കോസ്പോറ ഇലപ്പുള്ളി രോഗം',
        confidence: 92,
        severity: 'Medium',
        affected_area: '25%',
        treatment: {
          immediate: [
            'Remove affected leaves immediately',
            'Spray Mancozeb 2g/liter of water',
            'Ensure proper air circulation'
          ],
          malayalam_immediate: [
            'ബാധിച്ച ഇലകൾ ഉടനെ നീക്കം ചെയ്യുക',
            'മാൻകോസെബ് 2 ഗ്രാം ഒരു ലിറ്റർ വെള്ളത്തിൽ കലക്കി തളിക്കുക',
            'നല്ല വായു സഞ്ചാരം ഉറപ്പാക്കുക'
          ],
          prevention: [
            'Spray preventive fungicide every 15 days',
            'Avoid overhead watering',
            'Maintain plant spacing'
          ],
          malayalam_prevention: [
            '15 ദിവസത്തെ ഇടവേളയിൽ പ്രതിരോധ കുമിൾനാശിനി തളിക്കുക',
            'മുകളിൽ നിന്ന് വെള്ളം ഒഴിക്കുന്നത് ഒഴിവാക്കുക',
            'ചെടികൾ തമ്മിലുള്ള അകലം പാലിക്കുക'
          ]
        }
      });
      
      toast({
        title: "Analysis Complete",
        description: "Pest/disease detection completed successfully.",
      });
    }, 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleImageSelect(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="text-primary-foreground hover:bg-white/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">കീട രോഗ കണ്ടെത്തൽ</h1>
              <p className="text-sm opacity-90">Pest & Disease Detection</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="space-y-6">
          {/* Upload Section */}
          <Card className="p-6">
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-4">
                വിള ചിത്രം അപ്ലോഡ് ചെയ്യുക
              </h2>
              <p className="text-muted-foreground mb-6">
                Upload a clear image of your crop for AI-powered pest and disease detection
              </p>
              
              {!selectedImage ? (
                <div className="space-y-4">
                  {/* File Upload */}
                  <div className="border-2 border-dashed border-border rounded-lg p-8">
                    <input
                      type="file"
                      id="cropImage"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label 
                      htmlFor="cropImage" 
                      className="cursor-pointer flex flex-col items-center gap-3"
                    >
                      <div className="bg-primary/10 p-4 rounded-full">
                        <Camera className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Click to upload image</p>
                        <p className="text-sm text-muted-foreground">
                          Or drag and drop your crop photo here
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Sample Images */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Or try with sample images:
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div 
                        className="cursor-pointer group"
                        onClick={() => handleImageSelect(diseasedLeaf1)}
                      >
                        <img
                          src={diseasedLeaf1}
                          alt="Sample diseased leaf 1"
                          className="w-full h-32 object-cover rounded-lg border-2 border-transparent group-hover:border-primary transition-all"
                        />
                        <p className="text-xs text-center mt-1">Sample 1</p>
                      </div>
                      <div 
                        className="cursor-pointer group"
                        onClick={() => handleImageSelect(diseasedLeaf2)}
                      >
                        <img
                          src={diseasedLeaf2}
                          alt="Sample diseased leaf 2"
                          className="w-full h-32 object-cover rounded-lg border-2 border-transparent group-hover:border-primary transition-all"
                        />
                        <p className="text-xs text-center mt-1">Sample 2</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <img
                    src={selectedImage}
                    alt="Selected crop"
                    className="max-w-full h-64 object-cover rounded-lg mx-auto"
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSelectedImage(null);
                      setAnalysisResult(null);
                    }}
                  >
                    Select Different Image
                  </Button>
                </div>
              )}
            </div>
          </Card>

          {/* Analysis Progress */}
          {isAnalyzing && (
            <Card className="p-6">
              <div className="text-center">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Zap className="h-8 w-8 text-primary animate-pulse" />
                </div>
                <h3 className="font-semibold mb-2">Analyzing Image...</h3>
                <p className="text-sm text-muted-foreground">
                  AI is detecting pests and diseases in your crop image
                </p>
                <div className="mt-4 space-y-2 text-left max-w-sm mx-auto">
                  <div className="flex justify-between text-xs">
                    <span>Image Processing</span>
                    <span className="text-success-green">✓</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Disease Detection</span>
                    <span className="text-primary animate-pulse">...</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Treatment Recommendations</span>
                    <span>⏳</span>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Analysis Results */}
          {analysisResult && !isAnalyzing && (
            <div className="space-y-4">
              {/* Detection Results */}
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-pest-red/10 p-3 rounded-full">
                    <Bug className="h-6 w-6 text-pest-red" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{analysisResult.disease}</h3>
                      <Badge variant="destructive">
                        {analysisResult.confidence}% Confident
                      </Badge>
                    </div>
                    <p className="text-primary font-medium mb-2">
                      {analysisResult.malayalam}
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Severity:</span>
                        <Badge variant="secondary" className="ml-2">
                          {analysisResult.severity}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Affected Area:</span>
                        <span className="ml-2 font-medium">{analysisResult.affected_area}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Treatment Recommendations */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Leaf className="h-5 w-5 text-success-green" />
                  <h3 className="font-semibold">Treatment Recommendations</h3>
                </div>
                
                <div className="space-y-4">
                  {/* Immediate Actions */}
                  <div>
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-pest-red" />
                      Immediate Actions (ഉടനടി നടപടികൾ)
                    </h4>
                    <div className="space-y-2">
                      {analysisResult.treatment.immediate.map((action: string, index: number) => (
                        <div key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-success-green mt-0.5 flex-shrink-0" />
                          <div>
                            <p>{action}</p>
                            <p className="text-primary text-xs">
                              {analysisResult.treatment.malayalam_immediate[index]}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Prevention */}
                  <div>
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success-green" />
                      Prevention (പ്രതിരോധം)
                    </h4>
                    <div className="space-y-2">
                      {analysisResult.treatment.prevention.map((action: string, index: number) => (
                        <div key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-success-green mt-0.5 flex-shrink-0" />
                          <div>
                            <p>{action}</p>
                            <p className="text-primary text-xs">
                              {analysisResult.treatment.malayalam_prevention[index]}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={() => navigate('/chat')}
                  className="flex-1"
                >
                  Ask More Questions
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate('/activities')}
                  className="flex-1"
                >
                  Log Treatment Activity
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PestDetection;