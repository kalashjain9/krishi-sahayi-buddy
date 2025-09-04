import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { 
  ArrowLeft,
  Calendar as CalendarIcon,
  Plus,
  Sprout,
  Droplets,
  Bug,
  Scissors,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const Activities = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showAddActivity, setShowAddActivity] = useState(false);
  
  const [newActivity, setNewActivity] = useState({
    type: '',
    description: '',
    quantity: '',
    cost: '',
    notes: ''
  });

  // Mock data for existing activities
  const activities = [
    {
      id: 1,
      date: '2024-01-15',
      type: 'വളം പ്രയോഗം',
      englishType: 'Fertilizer Application',
      description: 'NPK 19:19:19 വളം പ്രയോഗിച്ചു',
      quantity: '50 kg',
      cost: '₹2,500',
      status: 'completed',
      icon: <Sprout className="h-4 w-4" />
    },
    {
      id: 2,
      date: '2024-01-14',
      type: 'നനയ്ക്കൽ',
      englishType: 'Irrigation',
      description: 'Drip irrigation for 2 hours',
      quantity: '500 L',
      cost: '₹50',
      status: 'completed',
      icon: <Droplets className="h-4 w-4" />
    },
    {
      id: 3,
      date: '2024-01-13',
      type: 'കീടനാശിനി',
      englishType: 'Pesticide Spray',
      description: 'Mancozeb spray for leaf spot',
      quantity: '2 L solution',
      cost: '₹300',
      status: 'completed',
      icon: <Bug className="h-4 w-4" />
    },
    {
      id: 4,
      date: '2024-01-16',
      type: 'വെട്ടിമാറ്റൽ',
      englishType: 'Pruning',
      description: 'Remove diseased branches',
      quantity: '',
      cost: '',
      status: 'pending',
      icon: <Scissors className="h-4 w-4" />
    }
  ];

  const upcomingActivities = [
    {
      date: 'Tomorrow',
      activity: 'Fertilizer Application',
      malayalam: 'വളം പ്രയോഗം',
      time: '6:00 AM',
      priority: 'high'
    },
    {
      date: 'Day after tomorrow',
      activity: 'Pest Monitoring',
      malayalam: 'കീട നിരീക്ഷണം',
      time: '7:00 AM',
      priority: 'medium'
    },
    {
      date: 'In 3 days',
      activity: 'Irrigation',
      malayalam: 'നനയ്ക്കൽ',
      time: '5:30 AM',
      priority: 'medium'
    }
  ];

  const handleAddActivity = () => {
    if (newActivity.type && newActivity.description) {
      toast({
        title: "Activity Added",
        description: "Your farming activity has been logged successfully.",
      });
      setNewActivity({
        type: '',
        description: '',
        quantity: '',
        cost: '',
        notes: ''
      });
      setShowAddActivity(false);
    }
  };

  const activityTypes = [
    { value: 'fertilizer', label: 'വളം പ്രയോഗം (Fertilizer Application)' },
    { value: 'irrigation', label: 'നനയ്ക്കൽ (Irrigation)' },
    { value: 'pesticide', label: 'കീടനാശിനി (Pesticide Spray)' },
    { value: 'weeding', label: 'കളപ്പെടൽ (Weeding)' },
    { value: 'pruning', label: 'വെട്ടിമാറ്റൽ (Pruning)' },
    { value: 'harvesting', label: 'വിളവെടുപ്പ് (Harvesting)' },
    { value: 'planting', label: 'നടൽ (Planting)' },
    { value: 'other', label: 'മറ്റുള്ളവ (Other)' }
  ];

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
                <h1 className="text-xl font-bold">കൃഷി പ്രവർത്തനങ്ങൾ</h1>
                <p className="text-sm opacity-90">Farm Activity Tracking</p>
              </div>
            </div>
            <Button 
              variant="secondary"
              size="sm"
              onClick={() => setShowAddActivity(true)}
              className="bg-white/20 hover:bg-white/30"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">24</div>
                <div className="text-sm text-muted-foreground">Activities This Month</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-success-green">₹12,450</div>
                <div className="text-sm text-muted-foreground">Total Spent</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-weather-blue">3</div>
                <div className="text-sm text-muted-foreground">Pending Tasks</div>
              </Card>
            </div>

            {/* Recent Activities */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Recent Activities</h2>
                <Badge variant="secondary">
                  Last 7 days
                </Badge>
              </div>
              
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                    <div className={`p-2 rounded-full ${
                      activity.status === 'completed' ? 'bg-success-green/10' : 'bg-weather-blue/10'
                    }`}>
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-sm">{activity.type}</p>
                        <Badge 
                          variant={activity.status === 'completed' ? 'default' : 'secondary'}
                          className={activity.status === 'completed' ? 'bg-success-green' : 'bg-weather-blue'}
                        >
                          {activity.status === 'completed' ? 'Completed' : 'Pending'}
                        </Badge>
                      </div>
                      <p className="text-xs text-primary mb-1">{activity.englishType}</p>
                      <p className="text-sm text-foreground mb-2">{activity.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>📅 {activity.date}</span>
                        {activity.quantity && <span>📊 {activity.quantity}</span>}
                        {activity.cost && <span>💰 {activity.cost}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Calendar */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Calendar</h3>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border-0"
              />
            </Card>

            {/* Upcoming Activities */}
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-4 w-4 text-primary" />
                <h3 className="font-semibold">Upcoming</h3>
              </div>
              <div className="space-y-3">
                {upcomingActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                    <div className={`p-1 rounded-full ${
                      activity.priority === 'high' ? 'bg-pest-red/10' : 'bg-weather-blue/10'
                    }`}>
                      {activity.priority === 'high' ? 
                        <AlertCircle className="h-3 w-3 text-pest-red" /> :
                        <Clock className="h-3 w-3 text-weather-blue" />
                      }
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-xs">{activity.activity}</p>
                      <p className="text-xs text-primary">{activity.malayalam}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <span>{activity.date}</span>
                        <span>•</span>
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Add Activity Modal */}
      {showAddActivity && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">പുതിയ പ്രവർത്തനം (Add Activity)</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddActivity(false)}
                className="p-1"
              >
                ✕
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="activityType">Activity Type</Label>
                <Select value={newActivity.type} onValueChange={(value) => setNewActivity(prev => ({...prev, type: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select activity type" />
                  </SelectTrigger>
                  <SelectContent>
                    {activityTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description"
                  value={newActivity.description}
                  onChange={(e) => setNewActivity(prev => ({...prev, description: e.target.value}))}
                  placeholder="Describe the activity..."
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input 
                    id="quantity"
                    value={newActivity.quantity}
                    onChange={(e) => setNewActivity(prev => ({...prev, quantity: e.target.value}))}
                    placeholder="e.g., 50 kg"
                  />
                </div>
                <div>
                  <Label htmlFor="cost">Cost</Label>
                  <Input 
                    id="cost"
                    value={newActivity.cost}
                    onChange={(e) => setNewActivity(prev => ({...prev, cost: e.target.value}))}
                    placeholder="e.g., ₹2,500"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea 
                  id="notes"
                  value={newActivity.notes}
                  onChange={(e) => setNewActivity(prev => ({...prev, notes: e.target.value}))}
                  placeholder="Additional notes..."
                  rows={2}
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <Button onClick={handleAddActivity} className="flex-1">
                Add Activity
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowAddActivity(false)}
              >
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Activities;