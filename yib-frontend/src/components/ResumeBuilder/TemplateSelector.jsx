import React, { useState } from 'react';
import { FaArrowLeft, FaDownload, FaCheck } from 'react-icons/fa';
import Template1 from './Template1';
import Template2 from './Template2';
import Template3 from './Template3';
import Template4 from './Template4';
import Template5 from './Template5';
import { useDispatch, useSelector } from 'react-redux';
import { updateResume } from '../../store/resumeSlice';
import MultiStepForm from './MultiStepForm';
import { login } from '../../store/authSlice';
import { toggleForm } from '../../store/modalSlice';
import { toast,ToastContainer

 } from "react-toastify";
const TemplateSelector = () => {
  const resumeData = useSelector((state) => state.resume.resume);
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
      previewImage: '/template-previews/modern-professional.jpg',
    },
    {
      id: 'creative-minimalist',
      name: 'Creative Minimalist',
      component: Template2,
      description: 'Modern layout with creative typography',
      previewImage: '/template-previews/creative-minimalist.jpg',
    },
    {
      id: 'elegant-dark',
      name: 'Elegant Dark',
      component: Template3,
      description: 'Sophisticated dark theme with accent colors',
      previewImage: '/template-previews/elegant-dark.jpg',
    },
    {
      id: 'two-column',
      name: 'Two-Column',
      component: Template4,
      description: 'Efficient use of space with sidebar layout',
      previewImage: '/template-previews/two-column.jpg',
    },
    {
      id: 'photo-profile',
      name: 'Photo Profile',
      component: Template5,
      description: 'Professional design with photo placeholder',
      previewImage: '/template-previews/photo-profile.jpg',
    },
  ];

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
    setDownloadUrl(null);
  };

  const dispatch = useDispatch();
  const isSubmitted = useSelector((state) => state.resume.resume.submitted);
  const [submitted, setSubmitted] = useState(isSubmitted);
  const backtoform = () => {
    setSelectedTemplate(null);
    setDownloadUrl(null);
    setSubmitted(false);
    dispatch(updateResume(['submitted', false]));
  };
  const currentUser=useSelector((state)=>state.auth.currentUser);

  const generateResume = async () => {
    if(!currentUser)
    {
      toast.dismiss();
            setTimeout(()=>{
              toast.error("Please login to download Resume");
            },300)
      dispatch(toggleForm(['login',true]));
    }
    else
    {
    setIsGenerating(true);
    try {
      console.log('Generating resume with template:', selectedTemplate);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const mockUrl = URL.createObjectURL(
        new Blob(['Mock PDF content'], { type: 'application/pdf' })
      );
      setDownloadUrl(mockUrl);
    } catch (error) {
      console.error('Error generating resume:', error);
    } finally {
      setIsGenerating(false);
    }
  }
  };

  const copyResumeLink = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/resume/${resumeData.resumeId}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const PreviewComponent = selectedTemplate
    ? templates.find((t) => t.id === selectedTemplate).component
    : null;

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <ToastContainer />
      {!isSubmitted ? (
        <MultiStepForm />
      ) : !selectedTemplate ? (
        <div>
          <div className="text-center mb-10">
            <button
              onClick={backtoform}
              className="text-white bg-slate-700 hover:bg-slate-800 inline-flex items-center mb-4"
            >
              <FaArrowLeft className="mr-2" />
              Back to Form
            </button>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Choose a Resume Template
            </h2>
            <p className="text-gray-500 text-lg">
              Select a design that matches your professional style
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {templates.map((template) => (
              <div
                key={template.id}
                className="cursor-pointer border border-gray-200 rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                onClick={() => handleTemplateSelect(template.id)}
              >
                <div className="h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={template.previewImage}
                    alt={template.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/template-previews/default.jpg';
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {template.name}
                  </h3>
                  <p className="text-sm text-gray-500">{template.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex justify-between items-center p-6 bg-gray-50 border-b border-gray-200">
            <button
              onClick={() => setSelectedTemplate(null)}
              className="text-white bg-slate-700 hover:bg-slate-800 inline-flex items-center m-1 p-2"
            >
              <FaArrowLeft className="mr-2" />
              Back to Templates
            </button>
            <div className="space-x-4">
              {downloadUrl ? (
                <>
                  <a
                    href={downloadUrl}
                    download={`${resumeData.personalInfo.firstName}-${resumeData.personalInfo.lastName}-Resume.pdf`}
                    className="inline-flex items-center px-4 py-2 text-white no-underline bg-green-500 rounded-lg hover:bg-green-600"
                  >
                    <FaDownload className="mr-2" />
                    Download PDF
                  </a>
                  <button
                    onClick={copyResumeLink}
                    className="inline-flex items-center px-4 py-2 text-white no-underline bg-yellow-500 rounded-lg hover:bg-yellow-600"
                    disabled={copied}
                  >
                    {copied ? (
                      <>
                        <FaCheck className="mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        
                        Copy Shareable Link
                      </>
                    )}
                  </button>
                </>
              ) : (
                <button
                  onClick={generateResume}
                  className="inline-flex items-center   rounded-lg text-white bg-slate-700 hover:bg-slate-800 m-1 p-2"
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <span>Generating...</span>
                  ) : (
                    <>
                      
                      Generate Resume
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          <div className="p-6">
            {PreviewComponent && <PreviewComponent resumeData={resumeData} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
