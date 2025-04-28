import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle, ArrowLeft, Cloud, Database, Lock } from "lucide-react";
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";

// Get environment variables if available (for production deployment)
const envFirebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Check if we have environment variables configured
const hasEnvConfig = envFirebaseConfig.apiKey && envFirebaseConfig.projectId;

export function FirebaseConfig() {
  const [config, setConfig] = useState({
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: "",
  });
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Load config from environment variables or localStorage on component mount
  useEffect(() => {
    // First try to load from environment variables
    if (hasEnvConfig) {
      setConfig(envFirebaseConfig);
      // Optionally auto-connect with environment variables
      // handleConnect();
    } else {
      // If no env variables, try to load from localStorage
      handleLoadConfig();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig((prev) => ({ ...prev, [name]: value }));
  };

  const handleConnect = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Initialize Firebase with the provided configuration
      const firebaseConfig = {
        apiKey: config.apiKey,
        authDomain: config.authDomain,
        projectId: config.projectId,
        storageBucket: config.storageBucket,
        messagingSenderId: config.messagingSenderId,
        appId: config.appId,
        measurementId: config.measurementId,
      };
      
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      const auth = getAuth(app);
      
      // Store the configuration in localStorage for future use
      localStorage.setItem("firebaseConfig", JSON.stringify(firebaseConfig));
      
      setIsConnected(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect to Firebase");
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadConfig = () => {
    const savedConfig = localStorage.getItem("firebaseConfig");
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setConfig(parsedConfig);
      } catch (err) {
        setError("Failed to load saved configuration");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Firebase Configuration</h1>
      </div>

      {hasEnvConfig && (
        <Alert>
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Environment Configuration Available</AlertTitle>
          <AlertDescription>
            Firebase configuration is available from environment variables. You can use the pre-configured settings or override them below.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-primary/10">
              <Cloud className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Connect to Firebase</CardTitle>
              <CardDescription>
                Enter your Firebase project configuration to connect to your Firebase store
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isConnected && (
            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Connected</AlertTitle>
              <AlertDescription>
                Successfully connected to Firebase. You can now proceed to configure your PLC.
              </AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="manual" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="manual">Manual Configuration</TabsTrigger>
              <TabsTrigger value="import">Import Configuration</TabsTrigger>
            </TabsList>
            <TabsContent value="manual" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <Input
                    id="apiKey"
                    name="apiKey"
                    value={config.apiKey}
                    onChange={handleInputChange}
                    placeholder="Enter your Firebase API key"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="authDomain">Auth Domain</Label>
                  <Input
                    id="authDomain"
                    name="authDomain"
                    value={config.authDomain}
                    onChange={handleInputChange}
                    placeholder="your-project.firebaseapp.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectId">Project ID</Label>
                  <Input
                    id="projectId"
                    name="projectId"
                    value={config.projectId}
                    onChange={handleInputChange}
                    placeholder="your-project-id"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storageBucket">Storage Bucket</Label>
                  <Input
                    id="storageBucket"
                    name="storageBucket"
                    value={config.storageBucket}
                    onChange={handleInputChange}
                    placeholder="your-project.appspot.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="messagingSenderId">Messaging Sender ID</Label>
                  <Input
                    id="messagingSenderId"
                    name="messagingSenderId"
                    value={config.messagingSenderId}
                    onChange={handleInputChange}
                    placeholder="123456789"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="appId">App ID</Label>
                  <Input
                    id="appId"
                    name="appId"
                    value={config.appId}
                    onChange={handleInputChange}
                    placeholder="1:123456789:web:abcdef123456"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="measurementId">Measurement ID (Optional)</Label>
                  <Input
                    id="measurementId"
                    name="measurementId"
                    value={config.measurementId}
                    onChange={handleInputChange}
                    placeholder="G-XXXXXXXXXX"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="import" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="configJson">Firebase Configuration JSON</Label>
                <textarea
                  id="configJson"
                  className="w-full min-h-[200px] p-3 rounded-md border border-input bg-background"
                  placeholder='{"apiKey": "your-api-key", "authDomain": "your-project.firebaseapp.com", ...}'
                  onChange={(e) => {
                    try {
                      const jsonConfig = JSON.parse(e.target.value);
                      setConfig(jsonConfig);
                    } catch (err) {
                      // Don't update config if JSON is invalid
                    }
                  }}
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={handleLoadConfig}>
              Load Saved Config
            </Button>
            <Button onClick={handleConnect} disabled={isLoading}>
              {isLoading ? "Connecting..." : "Connect to Firebase"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {isConnected && (
        <div className="flex justify-end">
          <Button asChild>
            <Link to="/connections">Continue to PLC Configuration</Link>
          </Button>
        </div>
      )}
    </div>
  );
} 