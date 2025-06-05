import React from "react";

interface DashboardHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  description,
  actions,
}) => {
  return (
    <div className="flex items-center justify-between py-4 border-b border-border dark:border-neutral-700 mb-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100">{title}</h1>
        {description && (
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center">{actions}</div>}
    </div>
  );
};

export default DashboardHeader;