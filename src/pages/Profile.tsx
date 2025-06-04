import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../lib/auth';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { User, Mail, Calendar, Briefcase, Settings, LogOut } from 'lucide-react';

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await authService.getProfile();
        setProfile(userData);
        setFormData({
          email: userData.email,
        });
      } catch (err) {
        setError('Failed to load profile');
        console.error('Error fetching profile:', err);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedProfile = await authService.updateProfile(formData);
      setProfile(updatedProfile);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (err) {
      setError('Failed to update profile');
      console.error('Error updating profile:', err);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <Card className="border-none shadow-none">
          <CardContent className="p-6">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center">
                <User className="w-12 h-12 text-purple-600" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-2">{profile.email.split('@')[0]}</h1>
                <p className="text-gray-600 mb-4">{profile.email}</p>
                <div className="flex gap-4">
                  <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                  <Button variant="outline" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="flex gap-4">
                      <Button type="submit">Save Changes</Button>
                      <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Mail className="w-4 h-4" />
                          <span className="text-sm font-medium">Email</span>
                        </div>
                        <p>{profile.email}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Briefcase className="w-4 h-4" />
                          <span className="text-sm font-medium">Role</span>
                        </div>
                        <p className="capitalize">{profile.role}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm font-medium">Member Since</span>
                        </div>
                        <p>{new Date(profile.created_at).toLocaleDateString()}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Settings className="w-4 h-4" />
                          <span className="text-sm font-medium">Last Updated</span>
                        </div>
                        <p>{new Date(profile.updated_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>My Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.projects?.map((project: any) => (
                    <div
                      key={project.id}
                      className="border rounded-lg p-4 hover:border-purple-500 transition-colors cursor-pointer"
                      onClick={() => navigate(`/canvas/${project.id}`)}
                    >
                      <h3 className="font-medium mb-2">{project.name}</h3>
                      <p className="text-sm text-gray-500">
                        Last updated: {new Date(project.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                  {(!profile.projects || profile.projects.length === 0) && (
                    <p className="text-gray-500 col-span-2">No projects yet. Create your first project!</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-medium">Account Type</h3>
                    <p className="text-gray-500">Free Account</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-gray-500">Receive updates about your projects and account activity</p>
                  </div>
                  <div className="pt-4">
                    <Button variant="destructive" onClick={handleLogout}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 