import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  MapPin,
  Calendar,
  RefreshCw,
  BarChart3,
  DollarSign
} from 'lucide-react';

const Market = () => {
  const navigate = useNavigate();
  const [selectedMarket, setSelectedMarket] = useState('Alappuzha');
  const [selectedCategory, setSelectedCategory] = useState('vegetables');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock market data
  const marketData = {
    vegetables: [
      {
        crop: 'വഴുതന',
        english: 'Brinjal',
        currentPrice: 35,
        previousPrice: 30,
        change: 16.7,
        trend: 'up',
        unit: 'kg',
        quality: 'Grade A',
        stock: 'High'
      },
      {
        crop: 'തക്കാളി',
        english: 'Tomato',
        currentPrice: 25,
        previousPrice: 28,
        change: -10.7,
        trend: 'down',
        unit: 'kg',
        quality: 'Grade A',
        stock: 'Medium'
      },
      {
        crop: 'മുളക്',
        english: 'Chilli',
        currentPrice: 45,
        previousPrice: 40,
        change: 12.5,
        trend: 'up',
        unit: 'kg',
        quality: 'Grade A',
        stock: 'Low'
      },
      {
        crop: 'വെണ്ടക്ക',
        english: 'Okra',
        currentPrice: 30,
        previousPrice: 32,
        change: -6.3,
        trend: 'down',
        unit: 'kg',
        quality: 'Grade A',
        stock: 'High'
      },
      {
        crop: 'കാരറ്റ്',
        english: 'Carrot',
        currentPrice: 40,
        previousPrice: 38,
        change: 5.3,
        trend: 'up',
        unit: 'kg',
        quality: 'Grade A',
        stock: 'Medium'
      }
    ],
    fruits: [
      {
        crop: 'കപ്പ',
        english: 'Tapioca',
        currentPrice: 15,
        previousPrice: 14,
        change: 7.1,
        trend: 'up',
        unit: 'kg',
        quality: 'Grade A',
        stock: 'High'
      },
      {
        crop: 'പൈനാപ്പിൾ',
        english: 'Pineapple',
        currentPrice: 25,
        previousPrice: 22,
        change: 13.6,
        trend: 'up',
        unit: 'piece',
        quality: 'Grade A',
        stock: 'Medium'
      }
    ]
  };

  const markets = [
    'Alappuzha',
    'Kottayam',
    'Thiruvananthapuram',
    'Kollam',
    'Pathanamthitta'
  ];

  const categories = [
    { value: 'vegetables', label: 'പച്ചക്കറികൾ (Vegetables)' },
    { value: 'fruits', label: 'പഴങ്ങൾ (Fruits)' },
    { value: 'grains', label: 'ധാന്യങ്ങൾ (Grains)' },
    { value: 'spices', label: 'സുഗന്ധവ്യഞ്ജനങ്ങൾ (Spices)' }
  ];

  const currentData = marketData[selectedCategory as keyof typeof marketData] || [];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  const getStockColor = (stock: string) => {
    switch (stock.toLowerCase()) {
      case 'high': return 'bg-success-green';
      case 'medium': return 'bg-weather-blue';
      case 'low': return 'bg-pest-red';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
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
                <h1 className="text-xl font-bold">മാർക്കറ്റ് വില</h1>
                <p className="text-sm opacity-90">Market Prices</p>
              </div>
            </div>
            <Button 
              variant="secondary"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="bg-white/20 hover:bg-white/30"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="space-y-6">
          {/* Market Info & Filters */}
          <Card className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <h2 className="font-semibold">Current Market: {selectedMarket}</h2>
                  <p className="text-sm text-muted-foreground">
                    Last updated: {new Date().toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={selectedMarket} onValueChange={setSelectedMarket}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {markets.map((market) => (
                      <SelectItem key={market} value={market}>
                        {market}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-success-green">
                  {currentData.filter(item => item.trend === 'up').length}
                </div>
                <div className="text-sm text-muted-foreground">Price Rising</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pest-red">
                  {currentData.filter(item => item.trend === 'down').length}
                </div>
                <div className="text-sm text-muted-foreground">Price Falling</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  ₹{currentData.length ? Math.round(currentData.reduce((acc, item) => acc + item.currentPrice, 0) / currentData.length) : 0}
                </div>
                <div className="text-sm text-muted-foreground">Avg Price</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-weather-blue">
                  {currentData.filter(item => item.crop === 'വഴുതന')[0]?.currentPrice || 0}
                </div>
                <div className="text-sm text-muted-foreground">Your Crop (₹/kg)</div>
              </div>
            </div>
          </Card>

          {/* Price List */}
          <div className="grid gap-4">
            {currentData.map((item, index) => (
              <Card key={index} className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <DollarSign className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{item.crop}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {item.english}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Quality: {item.quality}</span>
                        <Badge 
                          variant="secondary" 
                          className={`text-white ${getStockColor(item.stock)}`}
                        >
                          {item.stock} Stock
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary mb-1">
                      ₹{item.currentPrice}
                      <span className="text-sm font-normal text-muted-foreground">/{item.unit}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {item.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-success-green" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-pest-red" />
                      )}
                      <span className={`text-sm font-medium ${
                        item.trend === 'up' ? 'text-success-green' : 'text-pest-red'
                      }`}>
                        {item.change > 0 ? '+' : ''}{item.change.toFixed(1)}%
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Previous: ₹{item.previousPrice}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Price Trends */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Price Trends (വില ട്രെൻഡുകൾ)</h3>
            </div>
            
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-sm mb-3 text-success-green">
                    Rising Prices (വില വർധനവ്)
                  </h4>
                  <div className="space-y-2">
                    {currentData
                      .filter(item => item.trend === 'up')
                      .sort((a, b) => b.change - a.change)
                      .slice(0, 3)
                      .map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-success-green/5 rounded">
                          <span className="text-sm">{item.crop}</span>
                          <span className="text-sm font-medium text-success-green">
                            +{item.change.toFixed(1)}%
                          </span>
                        </div>
                      ))
                    }
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm mb-3 text-pest-red">
                    Falling Prices (വില കുറവ്)
                  </h4>
                  <div className="space-y-2">
                    {currentData
                      .filter(item => item.trend === 'down')
                      .sort((a, b) => a.change - b.change)
                      .slice(0, 3)
                      .map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-pest-red/5 rounded">
                          <span className="text-sm">{item.crop}</span>
                          <span className="text-sm font-medium text-pest-red">
                            {item.change.toFixed(1)}%
                          </span>
                        </div>
                      ))
                    }
                  </div>
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
              Ask About Market Trends
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/dashboard')}
              className="flex-1"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Market;