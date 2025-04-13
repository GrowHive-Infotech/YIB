import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaDownload, FaCheck } from 'react-icons/fa';
import Template1 from './Template1';
import Template2 from './Template2';
import Template3 from './Template3';
import Template4 from './Template4';
import Template5 from './Template5';
import './TemplateStyles.css';

const TemplateSelector = ({ resumeData, resumeId, onBack }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [copied, setCopied] = useState(false);

  const templates = [
    { 
      id: 'modern-professional', 
      name: 'Modern Professional', 
      component: Template1,
      description: 'Clean, corporate design with balanced sections',
      previewImage: '/template-previews/modern-professional.jpg'
    },
    { 
      id: 'creative-minimalist', 
      name: 'Creative Minimalist', 
      component: Template2,
      description: 'Modern layout with creative typography',
      previewImage: '/template-previews/creative-minimalist.jpg'
    },
    { 
      id: 'elegant-dark', 
      name: 'Elegant Dark', 
      component: Template3,
      description: 'Sophisticated dark theme with accent colors',
      previewImage: '/template-previews/elegant-dark.jpg'
    },
    { 
      id: 'two-column', 
      name: 'Two-Column', 
      component: Template4,
      description: 'Efficient use of space with sidebar layout',
      previewImage: '/template-previews/two-column.jpg'
    },
    { 
      id: 'photo-profile', 
      name: 'Photo Profile', 
      component: Template5,
      description: 'Professional design with photo placeholder',
      previewImage: '/template-previews/photo-profile.jpg'
    }
  ];

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
    setDownloadUrl(null);
  };

  const generateResume = async () => {
    setIsGenerating(true);
    try {
      // In a real app, you would call your API to generate PDF
      console.log('Generating resume with template:', selectedTemplate);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock download URL - replace with actual PDF generation
      const mockUrl = URL.createObjectURL(new Blob(['Mock PDF content'], { type: 'application/pdf' }));
      setDownloadUrl(mockUrl);
    } catch (error) {
      console.error('Error generating resume:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyResumeLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/resume/${resumeId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const PreviewComponent = selectedTemplate 
    ? templates.find(t => t.id === selectedTemplate).component
    : null;

  return (
    <div className="template-selector-container">
      {!selectedTemplate ? (
        <div className="template-selection">
          <div className="template-header">
            <button onClick={onBack} className="btn-back">
              <FaArrowLeft /> Back to Form
            </button>
            <h2>Choose a Resume Template</h2>
            <p>Select a design that matches your professional style</p>
          </div>
          
          <div className="template-grid">
            {templates.map(template => (
              <div 
                key={template.id}
                className="template-card"
                onClick={() => handleTemplateSelect(template.id)}
              >
                <div className="template-preview">
                  <img 
                    src={template.previewImage} 
                    alt={template.name} 
                    onError={(e) => {
                      e.target.src = '/template-previews/default.jpg';
                    }}
                  />
                </div>
                <div className="template-info">
                  <h3>{template.name}</h3>
                  <p>{template.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="template-preview-container">
          <div className="preview-header">
            <button 
              onClick={() => setSelectedTemplate(null)} 
              className="btn-back"
            >
              <FaArrowLeft /> Back to Templates
            </button>
            
            <div className="preview-actions">
              {downloadUrl ? (
                <>
                  <a 
                    href={downloadUrl} 
                    download={`${resumeData.personalInfo.firstName}-${resumeData.personalInfo.lastName}-Resume.pdf`}
                    className="btn-download"
                  >
                    <FaDownload /> Download PDF
                  </a>
                  <button 
                    onClick={copyResumeLink}
                    className="btn-copy-link"
                    disabled={copied}
                  >
                    {copied ? <><FaCheck /> Copied!</> : 'Copy Shareable Link'}
                  </button>
                </>
              ) : (
                <button 
                  onClick={generateResume}
                  className="btn-generate"
                  disabled={isGenerating}
                >
                  {isGenerating ? 'Generating...' : 'Generate Resume'}
                </button>
              )}
            </div>
          </div>
          
          <div className="resume-preview">
            {PreviewComponent && <PreviewComponent resumeData={resumeData} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;