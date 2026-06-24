interface ToolHowToStep {
  title: string;
  description: string;
}

interface ToolHowToStepsProps {
  steps: ToolHowToStep[];
}

export const ToolHowToSteps = ({ steps }: ToolHowToStepsProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
    {steps.map((step, index) => (
      <div key={step.title} className="text-center">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <span className="text-primary font-bold">{index + 1}</span>
        </div>
        <h4 className="font-semibold text-foreground mb-2">{step.title}</h4>
        <p className="text-sm">{step.description}</p>
      </div>
    ))}
  </div>
);
