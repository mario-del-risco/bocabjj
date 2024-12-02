"use client";
import React, { useState } from "react";
import { ChevronDown, Info } from "lucide-react";

const BJJTechniqueFlowchart = () => {
  const [expandedStep, setExpandedStep] = useState(null);

  const techniqueSteps = [
    {
      id: "Start",
      title: "Initial Stance",
      icon: "🥋",
      description:
        "Establish a balanced, athletic stance with core engagement. Feet shoulder-width apart, knees slightly bent, weight centered.",
      tips: [
        "Keep your back straight",
        "Maintain a low center of gravity",
        "Be ready to move in any direction",
      ],
    },
    {
      id: "Grip",
      title: "Grip Control",
      icon: "✋",
      description:
        "Secure a collar tie or wrist control to manipulate opponent's balance and create openings.",
      tips: [
        "Use inside or outside collar tie",
        "Control opponent's head movement",
        "Create angle for penetration step",
      ],
    },
    {
      id: "Penetration",
      title: "Penetration Step",
      icon: "🦵",
      description:
        "Execute a explosive, angled step to break opponent's balance and create takedown opportunity.",
      anatomyFocus: "Quadriceps and Hamstring Tension",
      tips: [
        "Step at a 45-degree angle",
        "Shoot your lead leg forward",
        "Keep your head up and chest forward",
      ],
    },
    {
      id: "Leverage",
      title: "Balance Disruption",
      icon: "💪",
      description:
        "Control opponent's balance point by attacking their base and creating mechanical advantage.",
      anatomyFocus: "Knee and Ankle Joint Mechanics",
      tips: [
        "Lower your level below opponent",
        "Drive with your legs",
        "Use angular pressure",
      ],
    },
    {
      id: "Takedown",
      title: "Takedown Execution",
      icon: "🏆",
      description:
        "Complete the takedown by driving through the opponent or using precise lifting mechanics.",
      tips: [
        "Commit to the movement",
        "Keep your head position tight",
        "Control opponent's center of mass",
      ],
    },
    {
      id: "Control",
      title: "Position Securing",
      icon: "🛡️",
      description:
        "Maintain dominant position after takedown, focusing on weight distribution and pressure.",
      anatomyFocus: "Pelvis Pressure Control",
      tips: [
        "Flatten opponent",
        "Control hips and shoulders",
        "Minimize space for escape",
      ],
    },
    {
      id: "Transition",
      title: "Follow-Up Options",
      icon: "↪️",
      description:
        "Explore secondary techniques like submission, guard pass, or positional advancement.",
      anatomyFocus: "Hip Torque Dynamics",
      tips: [
        "Read opponent's reaction",
        "Maintain consistent pressure",
        "Be ready to flow to next technique",
      ],
    },
  ];

  const toggleStep = (stepId) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  return (
    <div className="max-w-full md:max-w-none bg-gradient-to-br from-slate-900 to-blue-800 rounded-2xl shadow-lg p-4 m-2">
      <h2 className="text-2xl font-bold text-center text-white mb-6">
        Single Leg Takedown Flow
      </h2>

      <div className="space-y-4">
        {techniqueSteps.map((step, index) => (
          <div
            key={step.id}
            className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300"
          >
            <div
              onClick={() => toggleStep(step.id)}
              className="flex items-center p-4 cursor-pointer hover:bg-blue-50 transition"
            >
              <div className="text-4xl mr-4">{step.icon}</div>
              <div className="flex-grow">
                <h3 className="font-bold text-lg text-slate-900">
                  {step.title}
                </h3>
              </div>
              <ChevronDown
                className={`transform transition-transform ${
                  expandedStep === step.id ? "rotate-180" : ""
                }`}
              />
            </div>

            {expandedStep === step.id && (
              <div className="p-4 bg-blue-50 space-y-3">
                <p className="text-gray-700">{step.description}</p>

                {step.anatomyFocus && (
                  <div className="bg-blue-100 p-2 rounded-md">
                    <div className="flex items-center">
                      <Info className="mr-2 text-blue-600" size={20} />
                      <span className="font-semibold text-blue-800">
                        Anatomy Focus
                      </span>
                    </div>
                    <p className="text-gray-700 mt-1">{step.anatomyFocus}</p>
                  </div>
                )}

                <div className="bg-white p-3 rounded-md">
                  <h4 className="font-semibold mb-2 text-blue-700">
                    Key Tips:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {step.tips.map((tip, tipIndex) => (
                      <li key={tipIndex}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BJJTechniqueFlowchart;
