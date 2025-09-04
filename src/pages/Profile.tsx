import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft,
  User,
  MapPin,
  Sprout,
  Droplets,
  Upload,
  Save,
  Camera
} from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: 'ബാബു കെ.',
    englishName: 'Babu K.',
    phone: '+91 9876543210',
    location: 'ആലപ്പുഴ',
    district: 'Alappuzha',
    farmSize: '2.5',
    farmSizeUnit: 'acres',
    primaryCrop: 'വഴുതന',
    secondaryCrops: 'തക്കാളി, മുളക്',
    soilType: 'കളിമണ്ണ്',
    irrigationType: 'Drip Irrigation',
    farmingExperience: '15',
    organicFarming: 'yes'
  });

  const [soilReport, setSoilReport] = useState<File | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSoilReportUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSoilReport(file);
      toast({
        title: "Soil Report Uploaded",
        description: "We'll analyze your soil report and provide personalized recommendations.",
      });
    }
  };

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your farm profile has been saved successfully.",
    });
    navigate('/dashboard');
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
              <h1 className="text-xl font-bold">കർഷക പ്രൊഫൈൽ</h1>
              <p className="text-sm opacity-90">Farmer Profile</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="space-y-6">
          {/* Personal Information */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">വ്യക്തിഗത വിവരങ്ങൾ (Personal Information)</h2>
            </div>
            
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name (Malayalam)</Label>
                  <Input 
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="നാമം"
                  />
                </div>
                <div>
                  <Label htmlFor="englishName">Name (English)</Label>
                  <Input 
                    id="englishName"
                    value={formData.englishName}
                    onChange={(e) => handleInputChange('englishName', e.target.value)}
                    placeholder="English Name"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+91 XXXXXXXXXX"
                />
              </div>
            </div>
          </Card>

          {/* Location Information */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">സ്ഥല വിവരങ്ങൾ (Location Details)</h2>
            </div>
            
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location (Malayalam)</Label>
                  <Input 
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="സ്ഥലം"
                  />
                </div>
                <div>
                  <Label htmlFor="district">District</Label>
                  <Select value={formData.district} onValueChange={(value) => handleInputChange('district', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Alappuzha">Alappuzha (ആലപ്പുഴ)</SelectItem>
                      <SelectItem value="Kottayam">Kottayam (കോട്ടയം)</SelectItem>
                      <SelectItem value="Thiruvananthapuram">Thiruvananthapuram (തിരുവനന്തപുരം)</SelectItem>
                      <SelectItem value="Kollam">Kollam (കൊള്ളം)</SelectItem>
                      <SelectItem value="Pathanamthitta">Pathanamthitta (പത്തനംതിട്ട)</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Card>

          {/* Farm Information */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sprout className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">കൃഷി വിവരങ്ങൾ (Farm Details)</h2>
            </div>
            
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="farmSize">Farm Size</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="farmSize"
                      type="number"
                      value={formData.farmSize}
                      onChange={(e) => handleInputChange('farmSize', e.target.value)}
                      placeholder="2.5"
                      className="flex-1"
                    />
                    <Select value={formData.farmSizeUnit} onValueChange={(value) => handleInputChange('farmSizeUnit', value)}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="acres">Acres</SelectItem>
                        <SelectItem value="hectares">Hectares</SelectItem>
                        <SelectItem value="cents">Cents</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="farmingExperience">Farming Experience (Years)</Label>
                  <Input 
                    id="farmingExperience"
                    type="number"
                    value={formData.farmingExperience}
                    onChange={(e) => handleInputChange('farmingExperience', e.target.value)}
                    placeholder="15"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="primaryCrop">Primary Crop (Malayalam)</Label>
                <Input 
                  id="primaryCrop"
                  value={formData.primaryCrop}
                  onChange={(e) => handleInputChange('primaryCrop', e.target.value)}
                  placeholder="വഴുതന"
                />
              </div>
              
              <div>
                <Label htmlFor="secondaryCrops">Secondary Crops (Optional)</Label>
                <Input 
                  id="secondaryCrops"
                  value={formData.secondaryCrops}
                  onChange={(e) => handleInputChange('secondaryCrops', e.target.value)}
                  placeholder="തക്കാളി, മുളക്"
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="soilType">Soil Type</Label>
                  <Select value={formData.soilType} onValueChange={(value) => handleInputChange('soilType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="കളിമണ്ണ്">കളിമണ്ണ് (Clay Soil)</SelectItem>
                      <SelectItem value="മണൽമണ്ണ്">മണൽമണ്ണ് (Sandy Soil)</SelectItem>
                      <SelectItem value="പശിമണ്ണ്">പശിമണ്ണ് (Loamy Soil)</SelectItem>
                      <SelectItem value="ചെങ്കരിമണ്ണ്">ചെങ്കരിമണ്ണ് (Red Soil)</SelectItem>
                      <SelectItem value="കരിമണ്ണ്">കരിമണ്ണ് (Black Soil)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="irrigationType">Irrigation System</Label>
                  <Select value={formData.irrigationType} onValueChange={(value) => handleInputChange('irrigationType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Drip Irrigation">Drip Irrigation</SelectItem>
                      <SelectItem value="Sprinkler">Sprinkler System</SelectItem>
                      <SelectItem value="Flood Irrigation">Flood Irrigation</SelectItem>
                      <SelectItem value="Rain Fed">Rain Fed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="organicFarming">Organic Farming Practice</Label>
                <Select value={formData.organicFarming} onValueChange={(value) => handleInputChange('organicFarming', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes (ആം)</SelectItem>
                    <SelectItem value="no">No (ഇല്ല)</SelectItem>
                    <SelectItem value="partially">Partially (ഭാഗികമായി)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Soil Report Upload */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Droplets className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">മണ്ണ് പരിശോധന (Soil Test Report)</h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Upload your soil test report for personalized fertilizer recommendations
                <br />
                വ്യക്തിഗതമാക്കിയ വള നിർദ്ദേശങ്ങൾക്കായി നിങ്ങളുടെ മണ്ണ് പരിശോധന റിപ്പോർട്ട് അപ്ലോഡ് ചെയ്യുക
              </p>
              
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="soilReport"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleSoilReportUpload}
                  className="hidden"
                />
                <label 
                  htmlFor="soilReport" 
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm font-medium">
                    {soilReport ? soilReport.name : 'Click to upload soil report'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PDF, JPG, PNG up to 10MB
                  </p>
                </label>
              </div>
              
              {soilReport && (
                <div className="flex items-center gap-2 p-3 bg-success-green/10 rounded-lg">
                  <Camera className="h-4 w-4 text-success-green" />
                  <span className="text-sm text-success-green">
                    Soil report uploaded successfully! We'll analyze it and provide recommendations.
                  </span>
                </div>
              )}
            </div>
          </Card>

          {/* Save Button */}
          <div className="flex gap-4">
            <Button onClick={handleSave} className="flex-1">
              <Save className="mr-2 h-4 w-4" />
              Save Profile
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;