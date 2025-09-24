import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileImage, Stethoscope, AlertCircle, CheckCircle, Activity } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AnalysisResult {
  label: string;
  confidence: number;
}

export const KidneyScanAnalyzer = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelection = (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (JPG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 10MB",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    setResult(null);
    toast({
      title: "File uploaded successfully",
      description: `${file.name} is ready for analysis`,
    });
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    
    try {
      // Simulate API call - replace with actual API integration
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock result - replace with actual API response
      const mockResults = [
        { label: 'Normal', confidence: 0.92 },
        { label: 'Cyst', confidence: 0.78 },
        { label: 'Stone', confidence: 0.85 },
        { label: 'Tumor', confidence: 0.67 },
      ];
      
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setResult(randomResult);
      
      toast({
        title: "Analysis completed",
        description: `Kidney scan analysis finished with ${(randomResult.confidence * 100).toFixed(1)}% confidence`,
      });
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "An error occurred during analysis. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getResultColor = (label: string) => {
    switch (label.toLowerCase()) {
      case 'normal':
        return 'text-medical-success';
      case 'cyst':
      case 'stone':
      case 'tumor':
        return 'text-medical-warning';
      default:
        return 'text-foreground';
    }
  };

  const getResultIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case 'normal':
        return <CheckCircle className="h-5 w-5 text-medical-success" />;
      case 'cyst':
      case 'stone':
      case 'tumor':
        return <AlertCircle className="h-5 w-5 text-medical-warning" />;
      default:
        return <Activity className="h-5 w-5 text-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-blue-light to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Stethoscope className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold text-medical-blue-dark">
              AI-Powered Kidney Scan Analyzer
            </h1>
            <span className="text-4xl">🩺</span>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload a patient's axial CT scan to classify the kidney's condition using advanced AI technology.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Upload Section */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload CT Scan
              </CardTitle>
              <CardDescription>
                Select or drag and drop a CT scan image for analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`
                  relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
                  ${dragActive ? 'border-primary bg-medical-blue-light' : 'border-border'}
                  ${selectedFile ? 'border-medical-success bg-medical-success/5' : ''}
                  hover:border-primary hover:bg-medical-blue-light/50
                `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                />
                
                {selectedFile ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center">
                      <FileImage className="h-16 w-16 text-medical-success" />
                    </div>
                    <div>
                      <p className="font-medium text-medical-success">File Selected</p>
                      <p className="text-sm text-muted-foreground">{selectedFile.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center">
                      <Upload className="h-16 w-16 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-lg font-medium">Drag & Drop CT Scan Image Here</p>
                      <p className="text-sm text-muted-foreground">
                        Supports JPG, PNG, and other image formats (max 10MB)
                      </p>
                    </div>
                  </div>
                )}
                
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-4"
                >
                  Browse Files
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Action Button */}
          <div className="flex justify-center">
            <Button
              variant="medical"
              size="lg"
              onClick={handleAnalyze}
              disabled={!selectedFile || isAnalyzing}
              className="px-8 py-3 text-lg"
            >
              {isAnalyzing ? (
                <>
                  <Activity className="h-5 w-5 animate-spin mr-2" />
                  Analyzing Scan...
                </>
              ) : (
                <>
                  <Stethoscope className="h-5 w-5 mr-2" />
                  Analyze Scan
                </>
              )}
            </Button>
          </div>

          {/* Result Display Section */}
          {result && (
            <Card className="shadow-card animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getResultIcon(result.label)}
                  Analysis Result
                </CardTitle>
                <CardDescription>
                  AI-powered diagnosis based on the uploaded CT scan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      Diagnosis
                    </label>
                    <div className={`text-2xl font-bold ${getResultColor(result.label)}`}>
                      {result.label}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      Confidence Score
                    </label>
                    <div className="text-2xl font-bold text-foreground">
                      {(result.confidence * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Disclaimer:</strong> This AI analysis is for educational and research purposes only. 
                    Always consult with a qualified healthcare professional for medical diagnosis and treatment decisions.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};